'use client';

import React from 'react';
import { QuizQuestion } from '@/types/aisat';
import { ArrowRight, Link2 } from 'lucide-react';

interface MatchColumnsRendererProps {
  question: QuizQuestion;
  value: Record<string, string> | null;
  onChange: (pairs: Record<string, string>) => void;
}

export const MatchColumnsRenderer: React.FC<MatchColumnsRendererProps> = ({ question, value, onChange }) => {
  const currentPairs = value || {};
  const leftItems = question.matchPairs?.leftItems || [];
  const rightItems = question.matchPairs?.rightItems || [];

  const handleSelectPair = (leftId: string, rightId: string) => {
    if (!rightId) {
      const updated = { ...currentPairs };
      delete updated[leftId];
      onChange(updated);
    } else {
      onChange({
        ...currentPairs,
        [leftId]: rightId,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-xs font-semibold text-slate-400 flex items-center gap-2">
        <Link2 className="w-4 h-4 text-amber-400" />
        <span>Match each item in Column A with its corresponding pair in Column B:</span>
      </div>

      <div className="space-y-3">
        {leftItems.map((left) => {
          const selectedRightId = currentPairs[left.id] || '';
          return (
            <div
              key={left.id}
              className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-white/[0.05]"
            >
              <div className="font-medium text-sm text-slate-100 md:w-1/2">
                {left.text}
              </div>

              <div className="flex items-center gap-3 md:w-1/2">
                <ArrowRight className="w-4 h-4 text-amber-400 shrink-0 hidden md:block" />
                <select
                  value={selectedRightId}
                  onChange={(e) => handleSelectPair(left.id, e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    selectedRightId
                      ? 'bg-amber-500/10 border-amber-500/50 text-amber-200'
                      : 'bg-[#131A2B] border-white/[0.12] text-slate-400'
                  }`}
                >
                  <option value="">-- Select Matching Pair --</option>
                  {rightItems.map((right) => (
                    <option key={right.id} value={right.id} className="bg-[#0E131F] text-white">
                      {right.text}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
