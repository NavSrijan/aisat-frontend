'use client';

import React from 'react';
import { QuizQuestion, UserResponse } from '@/types/aisat';
import { Bookmark, CheckCircle2, Circle, Eye } from 'lucide-react';

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
  // Count statuses
  let answeredCount = 0;
  let markedCount = 0;
  let unvisitedCount = 0;

  questions.forEach((q) => {
    const res = responses[q.id];
    if (res?.isMarkedForReview) {
      markedCount++;
    } else if (res?.answer !== undefined && res?.answer !== null && res?.answer !== '') {
      answeredCount++;
    } else {
      unvisitedCount++;
    }
  });

  return (
    <div className="glass-card rounded-2xl p-5 border border-white/[0.08] space-y-6">
      {/* Header & Status Summary */}
      <div>
        <h4 className="font-extrabold text-sm text-white mb-3 flex items-center justify-between">
          <span>Question Palette</span>
          <span className="text-xs text-amber-400 font-mono font-bold">
            {currentIndex + 1} / {questions.length}
          </span>
        </h4>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-between font-medium">
            <span>Answered</span>
            <span className="font-bold">{answeredCount}</span>
          </div>
          <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-between font-medium">
            <span>Review</span>
            <span className="font-bold">{markedCount}</span>
          </div>
        </div>
      </div>

      {/* Grid of Question Buttons */}
      <div>
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
          Select Question
        </div>
        <div className="grid grid-cols-5 gap-2">
          {questions.map((q, idx) => {
            const isCurrent = currentIndex === idx;
            const res = responses[q.id];
            const isAnswered = res?.answer !== undefined && res?.answer !== null && res?.answer !== '';
            const isMarked = res?.isMarkedForReview;

            let badgeStyle = 'bg-white/[0.04] text-slate-400 border-white/[0.08] hover:bg-white/[0.08]';
            if (isMarked) {
              badgeStyle = 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-sm shadow-purple-500/20';
            } else if (isAnswered) {
              badgeStyle = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm shadow-emerald-500/20';
            }

            return (
              <button
                key={q.id}
                onClick={() => onSelectIndex(idx)}
                className={`w-full aspect-square rounded-xl text-xs font-bold flex items-center justify-center border transition-all cursor-pointer relative ${badgeStyle} ${
                  isCurrent ? 'ring-2 ring-amber-400 font-black scale-105 z-10' : ''
                }`}
              >
                <span>{idx + 1}</span>
                {isMarked && (
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 absolute top-1 right-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="pt-4 border-t border-white/[0.06] space-y-2 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500" />
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-purple-500/30 border border-purple-500" />
          <span>Marked for Review</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-white/[0.06] border border-white/[0.12]" />
          <span>Not Answered</span>
        </div>
      </div>
    </div>
  );
};
