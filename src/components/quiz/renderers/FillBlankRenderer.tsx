'use client';

import React from 'react';
import { QuizQuestion } from '@/types/aisat';

interface FillBlankRendererProps {
  question: QuizQuestion;
  value: Record<string, string> | null;
  onChange: (blanks: Record<string, string>) => void;
}

export const FillBlankRenderer: React.FC<FillBlankRendererProps> = ({ question, value, onChange }) => {
  const blanks = value || {};
  const blankCount = question.blanksCount || 2;

  const handleBlankChange = (blankKey: string, text: string) => {
    onChange({
      ...blanks,
      [blankKey]: text,
    });
  };

  return (
    <div className="space-y-4">
      <div className="text-xs font-semibold text-gray-500">
        Type the exact term for each blank:
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: blankCount }).map((_, idx) => {
          const blankKey = `blank_${idx + 1}`;
          const currentVal = blanks[blankKey] || '';
          return (
            <div key={blankKey} className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Blank [{idx + 1}]
              </label>
              <input
                type="text"
                placeholder={`Answer for blank ${idx + 1}`}
                value={currentVal}
                onChange={(e) => handleBlankChange(blankKey, e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-white border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700] font-mono"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
