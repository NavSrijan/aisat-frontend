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
        <span className="font-semibold">Type your response:</span>
        <span className="font-mono text-gray-400">{wordCount} words</span>
      </div>

      <textarea
        rows={5}
        placeholder="Write your explanation or diagnosis here..."
        value={currentText}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 rounded-xl bg-white border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700] leading-relaxed resize-y"
      />
      <div className="text-xs text-gray-500 italic">
        Blank or "N/A" is a valid answer. Two to three sentences is enough.
      </div>
    </div>
  );
};
