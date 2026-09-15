'use client';

import React from 'react';
import { QuizQuestion, UserResponse } from '@/types/aisat';
import { AlertCircle, X, ArrowRight } from 'lucide-react';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSubmit: () => void;
  questions: QuizQuestion[];
  responses: Record<string, UserResponse>;
  isSubmitting: boolean;
  submitError?: string | null;
}

export const SubmitModal: React.FC<SubmitModalProps> = ({
  isOpen,
  onClose,
  onConfirmSubmit,
  questions,
  responses,
  isSubmitting,
  submitError,
}) => {
  if (!isOpen) return null;

  let answeredCount = 0;
  let markedCount = 0;
  let unansweredCount = 0;

  questions.forEach((q) => {
    const res = responses[q.id];
    if (res?.isMarkedForReview) {
      markedCount++;
    }
    if (res?.answer !== undefined && res?.answer !== null && res?.answer !== '') {
      answeredCount++;
    } else {
      unansweredCount++;
    }
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-100 p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-gray-900" />
            <h3 className="font-extrabold text-base text-gray-950">Submit Assessment?</h3>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-900 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
              <div className="text-xl font-black text-gray-950">{questions.length}</div>
              <div className="text-[11px] text-gray-500 mt-0.5">Total</div>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="text-xl font-black text-emerald-800">{answeredCount}</div>
              <div className="text-[11px] text-emerald-700 mt-0.5">Answered</div>
            </div>
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
              <div className="text-xl font-black text-amber-900">{unansweredCount}</div>
              <div className="text-[11px] text-amber-700 mt-0.5">Unanswered</div>
            </div>
          </div>

          {markedCount > 0 && (
            <div className="p-3 rounded-lg bg-purple-50 border border-purple-200 text-purple-900 text-xs">
              You have <strong>{markedCount} question(s)</strong> marked for review.
            </div>
          )}

          {submitError && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Submission error:</span> {submitError}
                <div className="mt-1 text-[11px] text-red-600">Please check your connection and click Retry below.</div>
              </div>
            </div>
          )}

          <p className="text-xs text-gray-500 text-center">
            Are you sure you want to end this test session? Your answers will be submitted.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 rounded-lg bg-gray-100 text-xs font-bold text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Back to Test
            </button>
            <button
              type="button"
              onClick={() => onConfirmSubmit()}
              disabled={isSubmitting}
              className="w-1/2 btn-capabl py-2.5 rounded-lg text-xs font-bold text-black flex items-center justify-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : submitError ? (
                <>
                  <span>Retry Submission</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <span>Submit Test</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
