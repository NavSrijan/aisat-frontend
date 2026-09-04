'use client';

import React from 'react';
import { QuizQuestion } from '@/types/aisat';

interface ShortAnswerRendererProps {
  question: QuizQuestion;
  value: string | null;
  onChange: (text: string) => void;
}

export const ShortAnswerRenderer: React.FC<ShortAnswerRendererProps> = ({ question, value, onChange }) => {
  const currentText = value || '';
  const wordCount = currentText.trim() ? currentText.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="font-semibold">Type your answer:</span>
        <span className="font-mono">{wordCount} words</span>
      </div>

      <textarea
        rows={5}
        placeholder="Type your explanation clearly..."
        value={currentText}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3.5 rounded-xl bg-white border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700] leading-relaxed"
      />
    </div>
  );
};
