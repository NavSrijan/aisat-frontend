'use client';

import React from 'react';
import { QuizQuestion, UserResponse } from '@/types/aisat';
import { Sparkles } from 'lucide-react';

interface QuestionPaletteProps {
  questions: QuizQuestion[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  responses: Record<string, UserResponse>;
  onAutofillAll?: () => void;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  questions,
  currentIndex,
  onSelectIndex,
  responses,
  onAutofillAll,
}) => {
  let answeredCount = 0;
  let markedCount = 0;

  questions.forEach((q) => {
    const res = responses[q.id];
    if (res?.isMarkedForReview) {
      markedCount++;
    } else if (res?.answer !== undefined && res?.answer !== null && res?.answer !== '' && (!Array.isArray(res?.answer) || res?.answer.length > 0)) {
      answeredCount++;
    }
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs space-y-4">
      {/* Header & Counts */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h4 className="font-extrabold text-sm text-gray-950">
              Question Palette
            </h4>
            {onAutofillAll && (
              <button
                type="button"
                onClick={onAutofillAll}
                className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 transition-colors cursor-pointer flex items-center gap-1"
                title="Fill all answers with sample demo data"
              >
                <Sparkles className="w-3 h-3 text-amber-700" />
                <span>Demo Fill</span>
              </button>
            )}
          </div>
          <span className="text-xs text-gray-500 font-bold font-mono">
            {currentIndex + 1} of {questions.length}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between font-semibold">
            <span>Answered</span>
            <span className="font-bold">{answeredCount}</span>
          </div>
          <div className="p-2 rounded-lg bg-purple-50 border border-purple-200 text-purple-800 flex items-center justify-between font-semibold">
            <span>Marked</span>
            <span className="font-bold">{markedCount}</span>
          </div>
        </div>
      </div>

      {/* Grid of numbers - clean layout without clipping */}
      <div className="p-1">
        <div className="grid grid-cols-6 gap-2">
          {questions.map((q, idx) => {
            const isCurrent = currentIndex === idx;
            const res = responses[q.id];
            const isAnswered = res?.answer !== undefined && res?.answer !== null && res?.answer !== '' && (!Array.isArray(res?.answer) || res?.answer.length > 0);
            const isMarked = res?.isMarkedForReview;

            let badgeStyle = 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300';
            if (isMarked) {
              badgeStyle = 'bg-purple-100 text-purple-950 border-purple-400 font-bold';
            } else if (isAnswered) {
              badgeStyle = 'bg-emerald-100 text-emerald-950 border-emerald-400 font-bold';
            }

            return (
              <button
                key={q.id}
                onClick={() => onSelectIndex(idx)}
                className={`h-9 w-full rounded-lg text-xs font-bold flex items-center justify-center border transition-all cursor-pointer relative ${badgeStyle} ${
                  isCurrent
                    ? 'ring-2 ring-[#011C40] ring-offset-1 font-black bg-gray-900 text-white border-gray-900 z-10'
                    : ''
                }`}
              >
                <span>{idx + 1}</span>
                {isMarked && (
                  <span className="w-2 h-2 rounded-full bg-purple-600 absolute top-1 right-1 border border-white" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="pt-3 border-t border-gray-100 space-y-1.5 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded bg-emerald-100 border border-emerald-400 shrink-0" />
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded bg-purple-100 border border-purple-400 shrink-0" />
          <span>Marked for Review</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded bg-gray-50 border border-gray-300 shrink-0" />
          <span>Not Answered</span>
        </div>
      </div>
    </div>
  );
};
