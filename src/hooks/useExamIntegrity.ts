'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { aisatApi } from '@/lib/api';

interface UseExamIntegrityOptions {
  attemptId: string | null;
  enabled?: boolean;
  maxViolations?: number;
  onLimitExceeded?: () => void;
}

export function useExamIntegrity({
  attemptId,
  enabled = true,
  maxViolations = 3,
  onLimitExceeded,
}: UseExamIntegrityOptions) {
  const [violationCount, setViolationCount] = useState<number>(0);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [lastAwayDurationMs, setLastAwayDurationMs] = useState(0);
  const [isLimitExceeded, setIsLimitExceeded] = useState(false);

  const violationCountRef = useRef<number>(0);
  const hiddenTimeRef = useRef<number | null>(null);
  const hiddenSourceRef = useRef<'TAB_SWITCH' | 'WINDOW_BLUR'>('TAB_SWITCH');
  const lastProcessedTimeRef = useRef<number>(0);
  const limitExceededTriggeredRef = useRef<boolean>(false);
  const onLimitExceededRef = useRef(onLimitExceeded);

  useEffect(() => {
    onLimitExceededRef.current = onLimitExceeded;
  }, [onLimitExceeded]);

  // Restore saved violation count from session storage for this attempt
  useEffect(() => {
    if (!attemptId) return;
    try {
      const saved = sessionStorage.getItem(`aisat_violations_${attemptId}`);
      if (saved) {
        const count = parseInt(saved, 10);
        if (!isNaN(count) && count > 0) {
          violationCountRef.current = count;
          setViolationCount(count);
          if (count >= maxViolations) {
            setIsLimitExceeded(true);
            setIsWarningOpen(true);
            if (onLimitExceededRef.current && !limitExceededTriggeredRef.current) {
              limitExceededTriggeredRef.current = true;
              onLimitExceededRef.current();
            }
          }
        }
      }
    } catch (e) {
      console.warn('Failed to read saved violations from sessionStorage', e);
    }
  }, [attemptId, maxViolations]);

  const recordViolation = useCallback((eventType: 'TAB_SWITCH' | 'WINDOW_BLUR', durationMs: number) => {
    if (!enabled) return;

    const next = violationCountRef.current + 1;
    violationCountRef.current = next;
    setViolationCount(next);
    setLastAwayDurationMs(durationMs);
    setIsWarningOpen(true);

    if (attemptId) {
      try {
        sessionStorage.setItem(`aisat_violations_${attemptId}`, String(next));
        // Report to backend append-only integrity log
        aisatApi.logIntegrityEvent(attemptId, eventType, {
          violationNumber: next,
          durationAwayMs: durationMs,
          maxAllowed: maxViolations,
          clientTimestamp: new Date().toISOString(),
        }).catch((err) => {
          console.warn('Failed to log integrity event to server', err);
        });
      } catch (e) {
        console.warn('Failed to persist violation state', e);
      }
    }

    if (next >= maxViolations) {
      setIsLimitExceeded(true);
      if (onLimitExceededRef.current && !limitExceededTriggeredRef.current) {
        limitExceededTriggeredRef.current = true;
        onLimitExceededRef.current();
      }
    }
  }, [attemptId, enabled, maxViolations]);

  useEffect(() => {
    if (!enabled) return;

    const handleVisibilityChange = () => {
      const now = Date.now();
      if (document.hidden) {
        hiddenTimeRef.current = now;
        hiddenSourceRef.current = 'TAB_SWITCH';
      } else {
        if (hiddenTimeRef.current) {
          const duration = now - hiddenTimeRef.current;
          hiddenTimeRef.current = null;
          // Ignore ultra-short blurs < 600ms (like system notifications or OS micro-jitters)
          if (duration > 600 && now - lastProcessedTimeRef.current > 1500) {
            lastProcessedTimeRef.current = now;
            recordViolation('TAB_SWITCH', duration);
          }
        }
      }
    };

    const handleWindowBlur = () => {
      if (!hiddenTimeRef.current) {
        hiddenTimeRef.current = Date.now();
        hiddenSourceRef.current = 'WINDOW_BLUR';
      }
    };

    const handleWindowFocus = () => {
      const now = Date.now();
      if (hiddenTimeRef.current) {
        const duration = now - hiddenTimeRef.current;
        const source = hiddenSourceRef.current;
        hiddenTimeRef.current = null;
        if (duration > 600 && now - lastProcessedTimeRef.current > 1500) {
          lastProcessedTimeRef.current = now;
          recordViolation(source || 'WINDOW_BLUR', duration);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [enabled, recordViolation]);

  const closeWarning = useCallback(() => {
    setIsWarningOpen(false);
  }, []);

  return {
    violationCount,
    isWarningOpen,
    lastAwayDurationMs,
    isLimitExceeded,
    closeWarning,
    maxViolations,
  };
}
