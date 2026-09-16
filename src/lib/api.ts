/**
 * AISAT Backend API Client
 * Connects directly to learning-service for candidate registration, attempt lifecycle, autosave, and submission.
 */

const RAW_URL = (process.env.NEXT_PUBLIC_LEARNING_SERVICE_URL || 'http://localhost:3003').replace(/\/+$/, '');
const BACKEND_URL =
  RAW_URL.includes('sharda.live') && !RAW_URL.endsWith('/learning')
    ? `${RAW_URL}/learning`
    : RAW_URL;

// In browser, use same-origin relative path (handled by Next.js rewrites in next.config.ts)
// to completely eliminate browser CORS / OPTIONS preflight issues.
const API_BASE_URL = typeof window !== 'undefined' ? '' : BACKEND_URL;



export interface RegisterCandidatePayload {
  name: string;
  email: string;
  phoneNumber: string;
  college: string;
  rollNumber?: string;
  branch: string;
  graduationYear: string;
  targetDomain?: string;
  quizId?: string;
  reqId?: string;
  otp?: string;
}

export interface SendOtpResponse {
  success: boolean;
  data: {
    reqId: string;
    message: string;
  };
  message?: string;
}

export interface RegisterResponse {
  success: boolean;
  data: {
    token: string;
    candidate: {
      userId: string;
      name: string;
      email: string;
      phoneNumber: string;
      college: string;
      rollNumber?: string;
      branch: string;
      graduationYear: string;
      targetDomain: string;
    };
    quizId: string | null;
  };
  message?: string;
}

export interface AttemptViewItem {
  referenceId: string;
  itemVersionId: string;
  points: number;
  isUnscored?: boolean;
  stem: {
    text: string;
    imageUrl?: string | null;
    code?: string | null;
    latex?: string | null;
    sectionId?: string;
    comp?: string;
    tier?: string;
    context?: string;
    transcript?: string;
    language?: string;
  } | string;
  interactionType: string;
  options?: any;
  hint?: string;
  savedAnswer?: any;
  timeLimitSec?: number | null;
}

export interface AttemptViewResponse {
  success: boolean;
  data: {
    attempt: {
      attemptId: string;
      status: string;
      startedAt: string;
      deadlineAt: string | null;
      remainingSec: number | null;
      attemptNumber: number;
    };
    quiz: {
      assessmentId: string;
      title: string;
      instructions: string | string[];
      stakes: string;
      maxAttempts: number;
      feedbackTiming: string;
      timerType?: 'PER_STUDENT' | 'GLOBAL';
      maxViolations?: number;
    };
    items: AttemptViewItem[];
  };
}

export interface SubmitAnswerPayload {
  itemVersionId: string;
  answer: any;
  timeSpentSec?: number;
}

export const aisatApi = {
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return sessionStorage.getItem('aisat_token');
  },

  setToken(token: string) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('aisat_token', token);
    }
  },

  async sendOtp(phoneNumber: string): Promise<SendOtpResponse> {
    const res = await fetch(`${API_BASE_URL}/api/quiz-delivery/otp/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || data.error || 'Failed to send OTP');
    }
    return data;
  },

  async registerCandidate(payload: RegisterCandidatePayload): Promise<RegisterResponse> {
    const res = await fetch(`${API_BASE_URL}/api/quiz-delivery/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || data.error || 'Registration failed');
    }
    return data;
  },

  async startAttempt(quizId: string): Promise<AttemptViewResponse> {
    const token = this.getToken();
    if (!token) throw new Error('Not authenticated: No candidate token found');

    const res = await fetch(`${API_BASE_URL}/api/quiz-delivery/quizzes/${quizId}/attempts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || data.error || 'Failed to start quiz attempt');
    }
    return data;
  },

  async getAttempt(attemptId: string): Promise<AttemptViewResponse> {
    const token = this.getToken();
    if (!token) throw new Error('Not authenticated: No candidate token found');

    const res = await fetch(`${API_BASE_URL}/api/quiz-delivery/attempts/${attemptId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || data.error || 'Failed to load attempt');
    }
    return data;
  },

  async saveResponse(attemptId: string, itemVersionId: string, answer: any, timeSpentSec: number = 0) {
    const token = this.getToken();
    if (!token) throw new Error('Not authenticated');

    const res = await fetch(`${API_BASE_URL}/api/quiz-delivery/attempts/${attemptId}/responses`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        itemVersionId,
        answer,
        timeSpentSec,
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || data.error || 'Failed to save response');
    }
    return data;
  },

  async submitAttempt(attemptId: string, answers: SubmitAnswerPayload[], submitReason?: string) {
    const token = this.getToken();
    if (!token) throw new Error('Not authenticated');

    const res = await fetch(`${API_BASE_URL}/api/quiz-delivery/attempts/${attemptId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ answers, submitReason }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || data.error || 'Failed to submit attempt');
    }
    return data;
  },

  async getResult(attemptId: string) {
    const token = this.getToken();
    if (!token) throw new Error('Not authenticated');

    const res = await fetch(`${API_BASE_URL}/api/quiz-delivery/attempts/${attemptId}/result`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || data.error || 'Failed to fetch result');
    }
    return data;
  },

  async flushPendingIntegrityEvents(attemptId: string) {
    if (typeof window === 'undefined') return;
    const token = this.getToken();
    if (!token) return;

    const storageKey = `aisat_pending_events_${attemptId}`;
    const raw = sessionStorage.getItem(storageKey);
    if (!raw) return;

    let pending: Array<{ eventType: string; metadata?: Record<string, any>; timestamp?: number }> = [];
    try {
      pending = JSON.parse(raw);
    } catch {
      sessionStorage.removeItem(storageKey);
      return;
    }

    if (!Array.isArray(pending) || pending.length === 0) return;

    const remaining: typeof pending = [];
    for (const item of pending) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/quiz-delivery/attempts/${attemptId}/integrity-events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ eventType: item.eventType, metadata: item.metadata }),
        });
        if (!res.ok) {
          remaining.push(item);
        }
      } catch {
        remaining.push(item);
      }
    }

    if (remaining.length === 0) {
      sessionStorage.removeItem(storageKey);
    } else {
      sessionStorage.setItem(storageKey, JSON.stringify(remaining));
    }
  },

  async logIntegrityEvent(attemptId: string, eventType: string, metadata?: Record<string, any>) {
    const token = this.getToken();
    if (!token) return null;

    // Attempt to flush any previously failed events first
    await this.flushPendingIntegrityEvents(attemptId);

    try {
      const res = await fetch(`${API_BASE_URL}/api/quiz-delivery/attempts/${attemptId}/integrity-events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventType, metadata }),
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      console.warn('Failed to log integrity event, saving to retry queue:', err);
      if (typeof window !== 'undefined') {
        const storageKey = `aisat_pending_events_${attemptId}`;
        const raw = sessionStorage.getItem(storageKey);
        let list: any[] = [];
        try {
          list = raw ? JSON.parse(raw) : [];
        } catch {}
        list.push({ eventType, metadata, timestamp: Date.now() });
        sessionStorage.setItem(storageKey, JSON.stringify(list));
      }
      return null;
    }
  },
};
