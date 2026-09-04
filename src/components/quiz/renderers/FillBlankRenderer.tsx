'use client';

import React from 'react';
import { QuizQuestion } from '@/types/aisat';
import { Edit3 } from 'lucide-react';

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
    <div className="space-y-6">
      <div className="text-xs font-semibold text-slate-400">
        Type the exact term or code fragment for each blank:
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: blankCount }).map((_, idx) => {
          const blankKey = `blank_${idx + 1}`;
          const currentVal = blanks[blankKey] || '';
          return (
            <div key={blankKey} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
              <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Edit3 className="w-3.5 h-3.5" />
                Blank [{idx + 1}]
              </label>
              <input
                type="text"
                placeholder={`Enter answer for [blank_${idx + 1}]`}
                value={currentVal}
                onChange={(e) => handleBlankChange(blankKey, e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/[0.12] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-mono"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
