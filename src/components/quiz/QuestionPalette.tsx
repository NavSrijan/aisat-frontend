'use client';

import React from 'react';
import { QuizQuestion, UserResponse } from '@/types/aisat';

interface QuestionPaletteProps {
  questions: QuizQuestion[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  responses: Record<string, UserResponse>;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  questions,
  currentIndex,
  onSelectIndex,
  responses,
}) => {
  let answeredCount = 0;
  let markedCount = 0;

  questions.forEach((q) => {
    const res = responses[q.id];
    if (res?.isMarkedForReview) {
      markedCount++;
    } else if (res?.answer !== undefined && res?.answer !== null && res?.answer !== '') {
      answeredCount++;
    }
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs space-y-5">
      {/* Header & Counts */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-extrabold text-sm text-gray-950">
            Question Palette
          </h4>
          <span className="text-xs text-gray-500 font-bold font-mono">
            {currentIndex + 1} of {questions.length}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between font-medium">
            <span>Answered</span>
            <span className="font-bold">{answeredCount}</span>
          </div>
          <div className="p-2 rounded-lg bg-purple-50 border border-purple-200 text-purple-800 flex items-center justify-between font-medium">
            <span>Marked</span>
            <span className="font-bold">{markedCount}</span>
          </div>
        </div>
      </div>

      {/* Grid of numbers */}
      <div>
        <div className="grid grid-cols-5 gap-2">
          {questions.map((q, idx) => {
            const isCurrent = currentIndex === idx;
            const res = responses[q.id];
            const isAnswered = res?.answer !== undefined && res?.answer !== null && res?.answer !== '';
            const isMarked = res?.isMarkedForReview;

            let badgeStyle = 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100';
            if (isMarked) {
              badgeStyle = 'bg-purple-100 text-purple-900 border-purple-300 font-bold';
            } else if (isAnswered) {
              badgeStyle = 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';
            }

            return (
              <button
                key={q.id}
                onClick={() => onSelectIndex(idx)}
                className={`w-full aspect-square rounded-lg text-xs font-bold flex items-center justify-center border transition-all cursor-pointer relative ${badgeStyle} ${
                  isCurrent ? 'ring-2 ring-black font-black scale-105 z-10' : ''
                }`}
              >
                <span>{idx + 1}</span>
                {isMarked && (
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 absolute top-1 right-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="pt-3 border-t border-gray-100 space-y-1.5 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-emerald-100 border border-emerald-400" />
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-purple-100 border border-purple-400" />
          <span>Marked for Review</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gray-50 border border-gray-300" />
          <span>Not Answered</span>
        </div>
      </div>
    </div>
  );
};
