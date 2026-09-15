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
  const [lastViolationType, setLastViolationType] = useState<'TAB_SWITCH' | 'WINDOW_BLUR' | 'FULLSCREEN_EXIT'>('TAB_SWITCH');
  const [isLimitExceeded, setIsLimitExceeded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const violationCountRef = useRef<number>(0);
  const hiddenTimeRef = useRef<number | null>(null);
  const hiddenSourceRef = useRef<'TAB_SWITCH' | 'WINDOW_BLUR' | 'FULLSCREEN_EXIT'>('TAB_SWITCH');
  const lastProcessedTimeRef = useRef<number>(0);
  const limitExceededTriggeredRef = useRef<boolean>(false);
  const onLimitExceededRef = useRef(onLimitExceeded);
  const hasEnteredFullscreenRef = useRef<boolean>(false);

  const enterFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        hasEnteredFullscreenRef.current = true;
        setIsFullscreen(true);
      }
    } catch (err) {
      console.warn('Fullscreen request blocked or not permitted without user gesture:', err);
    }
  }, []);

  useEffect(() => {
    onLimitExceededRef.current = onLimitExceeded;
  }, [onLimitExceeded]);

  // Restore saved violation count from session storage for this attempt
  useEffect(() => {
    if (!attemptId) return;
    try {
      const isAlreadySubmitted = sessionStorage.getItem(`aisat_submitted_${attemptId}`) === 'true';
      const saved = sessionStorage.getItem(`aisat_violations_${attemptId}`);
      if (saved) {
        const count = parseInt(saved, 10);
        if (!isNaN(count) && count > 0) {
          violationCountRef.current = count;
          setViolationCount(count);
          if (count >= maxViolations) {
            setIsLimitExceeded(true);
            limitExceededTriggeredRef.current = true;
            // Only re-open warning modal if attempt was not already submitted
            if (!isAlreadySubmitted) {
              setIsWarningOpen(true);
              if (onLimitExceededRef.current) {
                onLimitExceededRef.current();
              }
            }
          }
        }
      }
    } catch (e) {
      console.warn('Failed to read saved violations from sessionStorage', e);
    }
  }, [attemptId, maxViolations]);

  const recordViolation = useCallback((eventType: 'TAB_SWITCH' | 'WINDOW_BLUR' | 'FULLSCREEN_EXIT', durationMs: number) => {
    if (!enabled) return;

    const next = violationCountRef.current + 1;
    violationCountRef.current = next;
    setViolationCount(next);
    setLastAwayDurationMs(durationMs);
    setLastViolationType(eventType);
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
        if (attemptId) {
          try {
            sessionStorage.setItem(`aisat_submitted_${attemptId}`, 'true');
          } catch (_) {}
        }
        onLimitExceededRef.current();
      }
    }
  }, [attemptId, enabled, maxViolations]);

  // Handle Visibility and Window Blur/Focus
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

    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = Boolean(document.fullscreenElement);
      setIsFullscreen(isCurrentlyFullscreen);

      if (isCurrentlyFullscreen) {
        hasEnteredFullscreenRef.current = true;
      } else {
        // Exited fullscreen after having entered it
        if (hasEnteredFullscreenRef.current && !isLimitExceeded) {
          const now = Date.now();
          if (now - lastProcessedTimeRef.current > 1500) {
            lastProcessedTimeRef.current = now;
            recordViolation('FULLSCREEN_EXIT', 0);
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [enabled, isLimitExceeded, recordViolation]);

  const closeWarning = useCallback(() => {
    setIsWarningOpen(false);
    // Re-enter fullscreen when resuming from warning
    enterFullscreen();
  }, [enterFullscreen]);

  return {
    violationCount,
    isWarningOpen,
    lastAwayDurationMs,
    lastViolationType,
    isLimitExceeded,
    isFullscreen,
    enterFullscreen,
    closeWarning,
    maxViolations,
  };
}
