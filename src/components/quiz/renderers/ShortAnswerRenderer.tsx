'use client';

import React from 'react';
import { QuizQuestion } from '@/types/aisat';
import { FileText } from 'lucide-react';

interface ShortAnswerRendererProps {
  question: QuizQuestion;
  value: string | null;
  onChange: (text: string) => void;
}

export const ShortAnswerRenderer: React.FC<ShortAnswerRendererProps> = ({ question, value, onChange }) => {
  const currentText = value || '';
  const wordCount = currentText.trim() ? currentText.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5 font-semibold">
          <FileText className="w-4 h-4 text-amber-400" />
          Type your descriptive technical answer:
        </span>
        <span className="font-mono text-slate-500">{wordCount} words</span>
      </div>

      <textarea
        rows={6}
        placeholder="Structure your answer clearly covering core principles, operational flow, and trade-offs..."
        value={currentText}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 rounded-xl bg-black/40 border border-white/[0.12] text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 leading-relaxed font-sans"
      />
    </div>
  );
};
