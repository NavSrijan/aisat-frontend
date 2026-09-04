'use client';

import React from 'react';
import { QuizQuestion } from '@/types/aisat';
import { ArrowRight } from 'lucide-react';

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
    <div className="space-y-4">
      <div className="text-xs font-semibold text-gray-500">
        Match each item in Column A with its pair in Column B:
      </div>

      <div className="space-y-2.5">
        {leftItems.map((left) => {
          const selectedRightId = currentPairs[left.id] || '';
          return (
            <div
              key={left.id}
              className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div className="font-medium text-sm text-gray-900 md:w-1/2">
                {left.text}
              </div>

              <div className="flex items-center gap-2 md:w-1/2">
                <ArrowRight className="w-4 h-4 text-gray-400 shrink-0 hidden md:block" />
                <select
                  value={selectedRightId}
                  onChange={(e) => handleSelectPair(left.id, e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border text-xs sm:text-sm font-medium transition-all cursor-pointer bg-white ${
                    selectedRightId
                      ? 'border-[#FFC700] text-gray-950 font-bold ring-1 ring-[#FFC700]'
                      : 'border-gray-300 text-gray-500'
                  }`}
                >
                  <option value="">-- Select Match --</option>
                  {rightItems.map((right) => (
                    <option key={right.id} value={right.id}>
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
