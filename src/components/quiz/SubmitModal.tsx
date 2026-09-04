'use client';

import React from 'react';
import { QuizQuestion, UserResponse } from '@/types/aisat';
import { AlertCircle, ArrowRight, CheckCircle2, X } from 'lucide-react';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSubmit: () => void;
  questions: QuizQuestion[];
  responses: Record<string, UserResponse>;
  isSubmitting: boolean;
}

export const SubmitModal: React.FC<SubmitModalProps> = ({
  isOpen,
  onClose,
  onConfirmSubmit,
  questions,
  responses,
  isSubmitting,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md bg-[#0E131F] border border-amber-500/30 rounded-2xl shadow-2xl shadow-amber-500/10 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-b border-white/[0.08] p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Submit Assessment?</h3>
              <p className="text-xs text-slate-400">Review your attempt summary before final submission.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Summary */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-xl font-black text-white">{questions.length}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Total</div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="text-xl font-black text-emerald-400">{answeredCount}</div>
              <div className="text-[11px] text-emerald-300 mt-0.5">Answered</div>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="text-xl font-black text-amber-400">{unansweredCount}</div>
              <div className="text-[11px] text-amber-300 mt-0.5">Left</div>
            </div>
          </div>

          {markedCount > 0 && (
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              <span>You have <strong>{markedCount} question(s)</strong> marked for review.</span>
            </div>
          )}

          <p className="text-xs text-slate-400 leading-relaxed text-center">
            Once submitted, your responses will be locked and sent for algorithmic grading.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs font-bold text-slate-300 hover:bg-white/[0.08] transition-colors cursor-pointer"
            >
              Back to Test
            </button>
            <button
              type="button"
              onClick={onConfirmSubmit}
              disabled={isSubmitting}
              className="w-1/2 btn-primary-gradient py-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/25 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <span>Confirm Submit</span>
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
