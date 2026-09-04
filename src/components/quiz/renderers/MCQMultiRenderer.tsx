'use client';

import React from 'react';
import { QuizQuestion } from '@/types/aisat';
import { Check } from 'lucide-react';

interface MCQMultiRendererProps {
  question: QuizQuestion;
  value: string[] | null;
  onChange: (optionIds: string[]) => void;
}

export const MCQMultiRenderer: React.FC<MCQMultiRendererProps> = ({ question, value, onChange }) => {
  const selectedIds = value || [];

  const handleToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((item) => item !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold text-amber-400/90 mb-2 flex items-center gap-1.5">
        <span>Multiple correct options possible (Check all that apply):</span>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {question.options?.map((opt, idx) => {
          const isChecked = selectedIds.includes(opt.id);
          const letter = String.fromCharCode(65 + idx);
          return (
            <button
              key={opt.id}
              onClick={() => handleToggle(opt.id)}
              className={`w-full p-4 rounded-xl border text-left flex items-center gap-4 transition-all cursor-pointer ${
                isChecked
                  ? 'bg-amber-500/10 border-amber-500 text-white shadow-md shadow-amber-500/10'
                  : 'bg-white/[0.03] border-white/[0.08] text-slate-200 hover:bg-white/[0.06] hover:border-white/[0.15]'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                  isChecked
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
                className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                  isChecked
                    ? 'border-amber-500 bg-amber-500 text-black'
                    : 'border-slate-600 bg-transparent'
                }`}
              >
                {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
