'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { QuizSection } from '@/types/aisat';
import { Clock, CheckCircle2 } from 'lucide-react';

interface QuizHeaderProps {
  title: string;
  sections: QuizSection[];
  activeSectionId: string;
  onSelectSection: (sectionId: string) => void;
  durationMinutes: number;
  onTimeExpired: () => void;
  onSubmitClick: () => void;
  isSaving: boolean;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  title,
  sections,
  activeSectionId,
  onSelectSection,
  durationMinutes,
  onTimeExpired,
  onSubmitClick,
  isSaving,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(durationMinutes * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [durationMinutes, onTimeExpired]);

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = secondsRemaining < 300; // Under 5 minutes

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Capabl Logo & Test Title */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center">
            <span className="text-xl font-black tracking-tight text-gray-950">
              Capa
            </span>
            <span className="text-xl font-black tracking-tight bg-[#FFC700] text-gray-950 px-1 py-0.5 rounded-sm ml-0.5">
              bl.
            </span>
            <span className="ml-2 text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
              AISAT
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200">
            {isSaving ? (
              <span className="text-amber-600 font-semibold text-[11px] animate-pulse">Saving...</span>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[11px] text-gray-600">Saved</span>
              </>
            )}
          </div>
        </div>

        {/* Center: Section Switcher Pills */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 md:pb-0">
          {sections.map((sec, idx) => {
            const isActive = sec.id === activeSectionId;
            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection(sec.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gray-900 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>Sec {idx + 1}: {sec.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Timer & Submit Button */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono font-bold text-sm border ${
              isLowTime
                ? 'bg-red-50 border-red-300 text-red-700 animate-pulse'
                : 'bg-gray-50 border-gray-200 text-gray-900'
            }`}
          >
            <Clock className="w-4 h-4 text-gray-500" />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          <button
            onClick={onSubmitClick}
            className="btn-capabl px-4 py-2 rounded-lg text-xs sm:text-sm font-bold text-black cursor-pointer shadow-xs"
          >
            Submit Test
          </button>
        </div>

      </div>
    </header>
  );
};
