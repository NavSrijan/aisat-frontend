'use client';

import React from 'react';
import { QuizQuestion, UserResponse } from '@/types/aisat';

interface QuestionPaletteProps {
  questions: QuizQuestion[];
  currentIndex: number;
  responses: Record<string, UserResponse>;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  questions,
  currentIndex,
  responses,
}) => {
  let answeredCount = 0;

  questions.forEach((q) => {
    const res = responses[q.id];
    if (res?.answer !== undefined && res?.answer !== null && res?.answer !== '' && (!Array.isArray(res?.answer) || res?.answer.length > 0)) {
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
              Assessment Progress
            </h4>
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
          <div className="p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 flex items-center justify-between font-semibold">
            <span>Remaining</span>
            <span className="font-bold">{questions.length - answeredCount}</span>
          </div>
        </div>
      </div>

      {/* Grid of numbers - read-only linear progression indicators */}
      <div className="p-1">
        <div className="grid grid-cols-6 gap-2">
          {questions.map((q, idx) => {
            const isCurrent = currentIndex === idx;
            const res = responses[q.id];
            const isAnswered = res?.answer !== undefined && res?.answer !== null && res?.answer !== '' && (!Array.isArray(res?.answer) || res?.answer.length > 0);
            const isPast = idx < currentIndex;

            let badgeStyle = 'bg-gray-50 text-gray-400 border-gray-200 opacity-60';
            if (isCurrent) {
              badgeStyle = 'ring-2 ring-[#011C40] ring-offset-1 font-black bg-gray-900 text-white border-gray-900 z-10 opacity-100';
            } else if (isAnswered) {
              badgeStyle = 'bg-emerald-100 text-emerald-950 border-emerald-400 font-bold opacity-100';
            } else if (isPast) {
              badgeStyle = 'bg-gray-100 text-gray-600 border-gray-300 opacity-90';
            }

            return (
              <div
                key={q.id}
                className={`h-9 w-full rounded-lg text-xs font-bold flex items-center justify-center border transition-all select-none relative ${badgeStyle}`}
              >
                <span>{idx + 1}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="pt-3 border-t border-gray-100 space-y-1.5 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded bg-emerald-100 border border-emerald-400 shrink-0" />
          <span>Answered & Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded bg-gray-900 border border-gray-900 shrink-0" />
          <span>Current Question</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded bg-gray-50 border border-gray-300 shrink-0 opacity-60" />
          <span>Upcoming</span>
        </div>
      </div>
    </div>
  );
};
