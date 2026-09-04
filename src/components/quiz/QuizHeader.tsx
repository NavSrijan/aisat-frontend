'use client';

import React, { useEffect, useState } from 'react';
import { QuizSection } from '@/types/aisat';
import { Clock, CheckCircle, AlertCircle, Save } from 'lucide-react';

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
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#07090E]/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Test Info & Save State */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center font-black text-black text-sm">
              ⚡
            </div>
            <div>
              <div className="font-extrabold text-sm text-white flex items-center gap-2">
                <span>AISAT 2026</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/30">
                  LIVE TEST
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-medium truncate max-w-[200px] sm:max-w-xs">
                {title}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/[0.03] px-2.5 py-1 rounded-lg border border-white/[0.06]">
            {isSaving ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                <span className="text-amber-400 text-[11px]">Saving...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] text-slate-400">Autosaved</span>
              </>
            )}
          </div>
        </div>

        {/* Center: Section Selectors */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 md:pb-0">
          {sections.map((sec, idx) => {
            const isActive = sec.id === activeSectionId;
            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection(sec.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                    : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white border border-white/[0.06]'
                }`}
              >
                <span>Sec {idx + 1}: {sec.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Timer & Submit Action */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono font-bold text-sm border transition-colors ${
              isLowTime
                ? 'bg-red-500/10 border-red-500/40 text-red-400 animate-pulse'
                : 'bg-white/[0.04] border-white/[0.1] text-amber-400'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          <button
            onClick={onSubmitClick}
            className="btn-primary-gradient px-4 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer shadow-md shadow-amber-500/20"
          >
            Submit Test
          </button>
        </div>

      </div>
    </header>
  );
};
