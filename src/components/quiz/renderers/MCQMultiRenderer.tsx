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
      <div className="text-xs font-semibold text-gray-500 mb-2">
        Select all options that apply (multiple choice):
      </div>
      <div className="grid grid-cols-1 gap-2.5">
        {question.options?.map((opt, idx) => {
          const isChecked = selectedIds.includes(opt.id);
          const letter = String.fromCharCode(65 + idx);
          return (
            <button
              key={opt.id}
              onClick={() => handleToggle(opt.id)}
              className={`w-full p-4 rounded-xl border text-left flex items-center gap-3.5 transition-all cursor-pointer ${
                isChecked
                  ? 'bg-amber-50/60 border-[#FFC700] text-gray-950 font-semibold ring-1 ring-[#FFC700]'
                  : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                  isChecked
                    ? 'bg-[#FFC700] text-black'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {letter}
              </div>
              <span className="text-sm font-medium flex-1">
                {opt.text}
              </span>
              <div
                className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                  isChecked
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-300 bg-white'
                }`}
              >
                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
