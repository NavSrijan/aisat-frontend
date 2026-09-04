'use client';

import React from 'react';
import { QuizQuestion } from '@/types/aisat';

interface NumericRendererProps {
  question: QuizQuestion;
  value: string | number | null;
  onChange: (val: string) => void;
}

export const NumericRenderer: React.FC<NumericRendererProps> = ({ question, value, onChange }) => {
  const currentVal = value !== null && value !== undefined ? String(value) : '';

  return (
    <div className="space-y-3 max-w-md">
      <div className="text-xs font-semibold text-gray-500">
        Enter numeric answer:
      </div>

      <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
        <div className="relative">
          <input
            type="number"
            step="any"
            placeholder="e.g. 10.29"
            value={currentVal}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-300 text-base font-bold text-gray-950 placeholder:text-gray-400 focus:outline-none focus:border-[#FFC700] focus:ring-2 focus:ring-[#FFC700]/20 font-mono"
          />
          {question.numericUnit && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {question.numericUnit}
            </span>
          )}
        </div>

        {question.numericTolerance && (
          <div className="text-xs text-gray-500">
            Acceptable tolerance: ±{question.numericTolerance}
          </div>
        )}
      </div>
    </div>
  );
};
