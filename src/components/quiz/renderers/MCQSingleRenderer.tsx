'use client';

import React from 'react';
import { QuizQuestion } from '@/types/aisat';

interface MCQSingleRendererProps {
  question: QuizQuestion;
  value: string | null;
  onChange: (optionId: string) => void;
}

export const MCQSingleRenderer: React.FC<MCQSingleRendererProps> = ({ question, value, onChange }) => {
  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-slate-400 mb-2">
        Select one correct option:
      </div>
      <div className="grid grid-cols-1 gap-3">
        {question.options?.map((opt, idx) => {
          const isSelected = value === opt.id;
          const letter = String.fromCharCode(65 + idx);
          return (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              className={`w-full p-4 rounded-xl border text-left flex items-center gap-4 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500 text-white shadow-md shadow-amber-500/10'
                  : 'bg-white/[0.03] border-white/[0.08] text-slate-200 hover:bg-white/[0.06] hover:border-white/[0.15]'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-amber-500 text-black'
                    : 'bg-white/[0.06] text-slate-400'
                }`}
              >
                {letter}
              </div>
              <span className="text-sm sm:text-base font-medium flex-1">
                {opt.text}
              </span>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  isSelected
                    ? 'border-amber-500 bg-amber-500'
                    : 'border-slate-600 bg-transparent'
                }`}
              >
                {isSelected && <div className="w-2 h-2 rounded-full bg-black" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
