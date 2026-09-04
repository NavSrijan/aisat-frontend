'use client';

import React from 'react';
import { QuizQuestion } from '@/types/aisat';
import { Hash } from 'lucide-react';

interface NumericRendererProps {
  question: QuizQuestion;
  value: string | number | null;
  onChange: (val: string) => void;
}

export const NumericRenderer: React.FC<NumericRendererProps> = ({ question, value, onChange }) => {
  const currentVal = value !== null && value !== undefined ? String(value) : '';

  return (
    <div className="space-y-4 max-w-lg">
      <div className="text-xs font-semibold text-slate-400">
        Enter numerical value (decimals allowed):
      </div>

      <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Hash className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-300">Exact Answer Input</div>
            {question.numericTolerance && (
              <div className="text-[11px] text-amber-400/90 font-medium">
                Tolerance margin: ±{question.numericTolerance}
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <input
            type="number"
            step="any"
            placeholder="e.g. 10.29"
            value={currentVal}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.12] text-lg font-bold text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 font-mono"
          />
          {question.numericUnit && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 uppercase tracking-wider bg-white/[0.06] px-2.5 py-1 rounded-md">
              {question.numericUnit}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
