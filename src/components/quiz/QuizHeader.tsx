'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { QuizSection, CandidateLead } from '@/types/aisat';
import {
  Clock,
  CheckCircle2,
  Layers,
} from 'lucide-react';

interface QuizHeaderProps {
  title: string;
  sections: QuizSection[];
  activeSectionId: string;
  onSelectSection: (sectionId: string) => void;
  durationMinutes: number;
  onTimeExpired: () => void;
  onSubmitClick: () => void;
  isSaving: boolean;
  candidate?: CandidateLead | null;
  answeredCount?: number;
  totalQuestions?: number;
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
  candidate,
  answeredCount = 0,
  totalQuestions = 40,
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
    const hours = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = secondsRemaining < 300; // Under 5 minutes
  const isCriticalTime = secondsRemaining < 60; // Under 1 minute

  return (
    <header className="sticky top-0 z-40 w-full bg-white text-gray-900 border-b border-gray-200 shadow-xs select-none">
      {/* Top Primary Test Strip */}
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Capabl Brand Logo + Test Title */}
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/" className="shrink-0 flex items-center">
              <img
                src="https://cdn.prod.website-files.com/66af61f906e2326d3e3183a1/66afee391f29c527ad2c2ada_Capabl%20TM%20logo-p-500.avif"
                alt="Capabl Logo"
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </Link>

            <div className="h-5 w-px bg-gray-200 hidden sm:block" />

            <div className="min-w-0">
              <h1 className="font-extrabold text-xs sm:text-sm text-[#011C40] truncate">
                {title || 'AISAT Assessment'}
              </h1>
            </div>
          </div>

          {/* Right: Autosave, Candidate Info, Timer & Submit */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            
            {/* Autosave Status */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800">
              {isSaving ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <span className="text-amber-700 font-medium">Syncing...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-semibold">Saved</span>
                </>
              )}
            </div>

            {/* Candidate Info Pill */}
            {candidate && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-md bg-gray-50 border border-gray-200 text-xs">
                <div className="w-5 h-5 rounded-full bg-[#011C40] text-amber-300 flex items-center justify-center font-bold text-[10px]">
                  {candidate.name ? candidate.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="text-left leading-tight">
                  <div className="font-bold text-gray-900 text-[11px] truncate max-w-[120px]">
                    {candidate.name}
                  </div>
                  <div className="text-[9px] text-gray-500 truncate max-w-[120px]">
                    {candidate.rollNumber ? `Roll: ${candidate.rollNumber}` : (candidate.college || 'Candidate')}
                  </div>
                </div>
              </div>
            )}

            {/* High-Contrast Test Timer */}
            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono font-bold text-sm sm:text-base tracking-wider transition-all border ${
                isCriticalTime
                  ? 'bg-red-600 text-white border-red-700 animate-pulse shadow-xs'
                  : isLowTime
                  ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                  : 'bg-[#011C40] text-[#FFCC00] border-[#011C40]'
              }`}
              title="Time Remaining"
            >
              <Clock className="w-4 h-4 text-[#FFCC00]" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>

            {/* Submit Action */}
            <button
              onClick={onSubmitClick}
              className="btn-capabl-yellow px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold text-black cursor-pointer shadow-xs hover:shadow-md transition-all"
            >
              Finish Test
            </button>
          </div>

        </div>
      </div>

      {/* Secondary Navigation & Section Ribbon */}
      <div className="bg-[#F8FAFC] px-4 sm:px-6 lg:px-8 py-2 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          
          {/* Section Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <div className="flex items-center gap-1 text-[11px] font-bold text-gray-500 mr-1.5 shrink-0 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Sections:</span>
            </div>

            {sections.map((sec, idx) => {
              const isActive = sec.id === activeSectionId;
              const sectionLabel = sec.title.replace(/^Section\s*/i, '');
              return (
                <button
                  key={sec.id}
                  onClick={() => onSelectSection(sec.id)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer border ${
                    isActive
                      ? 'bg-[#FFCC00] text-black border-[#FFCC00] font-bold shadow-xs'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-black'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-black ${
                    isActive ? 'bg-black text-amber-300' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{sectionLabel.split('·')[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Progress Indicator */}
          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-gray-600 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium">
                Answered: <strong className="text-gray-900 font-bold">{answeredCount}</strong> / {totalQuestions}
              </span>
              <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.round((answeredCount / (totalQuestions || 1)) * 100))}%` }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
