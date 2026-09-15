'use client';

import React from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface TabSwitchWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  violationCount: number;
  maxViolations: number;
  awayDurationMs?: number;
  violationType?: 'TAB_SWITCH' | 'WINDOW_BLUR' | 'FULLSCREEN_EXIT';
  isSubmitting?: boolean;
  submitError?: string | null;
  onRetrySubmit?: () => void;
}

export const TabSwitchWarningModal: React.FC<TabSwitchWarningModalProps> = ({
  isOpen,
  onClose,
  violationCount,
  maxViolations,
  awayDurationMs,
  violationType = 'TAB_SWITCH',
  isSubmitting = false,
  submitError = null,
  onRetrySubmit,
}) => {
  if (!isOpen) return null;

  const isLastWarning = violationCount === maxViolations - 1;
  const isLimitReached = violationCount >= maxViolations;
  const secondsAway = awayDurationMs ? Math.ceil(awayDurationMs / 1000) : null;

  const getTitle = () => {
    if (isLimitReached) return 'Violation Limit Exceeded!';
    if (violationType === 'FULLSCREEN_EXIT') return 'Warning: Fullscreen Exited';
    if (violationType === 'WINDOW_BLUR') return 'Warning: Window Focus Lost';
    return 'Warning: Tab Switch Detected';
  };

  const getDescription = () => {
    if (isLimitReached) {
      return 'You have exceeded the maximum allowed integrity violations. Your assessment is being submitted automatically.';
    }
    if (violationType === 'FULLSCREEN_EXIT') {
      return 'You have exited fullscreen mode. Staying in fullscreen throughout the assessment is required and monitored.';
    }
    return 'You have navigated away from the assessment window. Leaving the active test tab is strictly recorded as an integrity violation.';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-amber-200 text-center relative overflow-hidden">
        {/* Top Accent Stripe */}
        <div className={`absolute top-0 left-0 right-0 h-2 ${isLimitReached ? 'bg-red-600' : isLastWarning ? 'bg-orange-500' : 'bg-amber-500'}`} />

        {/* Warning Icon */}
        <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
          isLimitReached
            ? 'bg-red-100 text-red-600'
            : isLastWarning
            ? 'bg-orange-100 text-orange-600'
            : 'bg-amber-100 text-amber-600'
        }`}>
          {isLimitReached ? (
            <ShieldAlert className="w-8 h-8 animate-pulse" />
          ) : (
            <AlertTriangle className="w-8 h-8" />
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {getTitle()}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {getDescription()}
        </p>

        {secondsAway && secondsAway > 0 && !isLimitReached && (
          <p className="text-xs text-gray-500 mb-3">
            Away duration: <span className="font-semibold text-gray-700">{secondsAway}s</span>
          </p>
        )}

        {/* Violation Count Badge / Pills */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-5 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-600">Integrity Violation:</span>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: maxViolations }).map((_, idx) => {
              const isFilled = idx < violationCount;
              return (
                <div
                  key={idx}
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    isFilled
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {idx + 1}
                </div>
              );
            })}
            <span className="text-xs font-bold text-gray-800 ml-1">
              ({violationCount} / {maxViolations})
            </span>
          </div>
        </div>

        {!isLimitReached && (
          <p className="text-xs text-amber-700 font-medium mb-5 bg-amber-50 py-2 px-3 rounded-lg border border-amber-200">
            {isLastWarning
              ? '🚨 Final Warning: Next tab switch will automatically submit and end your test!'
              : `Remaining allowed warnings: ${maxViolations - violationCount}`}
          </p>
        )}

        {/* Action Button & Status */}
        {isLimitReached ? (
          <div className="space-y-3">
            {isSubmitting ? (
              <div className="py-3 px-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center gap-2 text-sm text-gray-700">
                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                <span className="font-medium">Submitting assessment securely...</span>
              </div>
            ) : submitError ? (
              <div className="space-y-2">
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 text-left">
                  <p className="font-semibold mb-0.5">Submission Encountered an Issue</p>
                  <p>{submitError}</p>
                </div>
                {onRetrySubmit && (
                  <button
                    onClick={onRetrySubmit}
                    className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Retry Submission
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="py-2.5 px-4 bg-red-50 text-red-800 rounded-xl border border-red-200 text-xs font-medium">
                  Test session concluded due to integrity violations.
                </div>
                {onRetrySubmit && (
                  <button
                    onClick={onRetrySubmit}
                    className="w-full py-2.5 px-4 bg-gray-900 hover:bg-black text-white font-medium text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Complete Submission
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-gray-900 hover:bg-black text-white font-medium text-sm rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            I Understand, Resume Test
          </button>
        )}
      </div>
    </div>
  );
};
