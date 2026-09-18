'use client';

import React, { useState, useEffect } from 'react';
import { Clock, ShieldCheck, User, Calendar, CheckCircle2, RefreshCw, LogOut, Sparkles } from 'lucide-react';
import { CandidateLead } from '@/types/aisat';

interface QuizWaitingRoomProps {
  quizTitle?: string;
  availableFrom: string;
  availableUntil?: string;
  durationMinutes?: number;
  candidate: CandidateLead | null;
  onEnter: () => void;
  onSwitchAccount: () => void;
}

export function QuizWaitingRoom({
  quizTitle = 'Pre AI SAT MBA Assessment',
  availableFrom,
  availableUntil,
  durationMinutes = 45,
  candidate,
  onEnter,
  onSwitchAccount,
}: QuizWaitingRoomProps) {
  const targetDate = new Date(availableFrom);
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    totalSeconds: number;
  }>({ hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 });

  const [isReady, setIsReady] = useState(false);
  const [isAutoEntering, setIsAutoEntering] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const diffMs = targetDate.getTime() - now;
      const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));

      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({ hours, minutes, seconds, totalSeconds });

      if (totalSeconds <= 0) {
        setIsReady(true);
      } else {
        setIsReady(false);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [availableFrom]);

  // When ready, automatically trigger onEnter after a tiny grace pause
  useEffect(() => {
    if (isReady && !isAutoEntering) {
      setIsAutoEntering(true);
      const timeout = setTimeout(() => {
        onEnter();
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [isReady, isAutoEntering, onEnter]);

  // Format scheduled time in IST (Asia/Kolkata)
  const formattedStartTime = React.useMemo(() => {
    try {
      return new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(targetDate);
    } catch {
      return targetDate.toLocaleString();
    }
  }, [targetDate]);

  return (
    <div className="min-h-screen bg-[#F4F6F9] py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="max-w-2xl w-full space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-300/60 text-xs font-semibold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-ping" />
            Waiting Room Live
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {quizTitle}
          </h1>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            You are registered and admitted into the virtual holding room. The test will automatically unlock at the scheduled start time.
          </p>
        </div>

        {/* Live Countdown Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6 sm:p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#FACC15_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
            
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-widest">
                <Clock className="w-4 h-4 animate-pulse" />
                {isReady ? 'Assessment Open' : 'Time Remaining Until Start'}
              </div>

              {isReady ? (
                <div className="py-4 space-y-3">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold text-lg animate-bounce">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    Opening Assessment Session...
                  </div>
                  <p className="text-xs text-gray-300">
                    Entering test room now. Please do not refresh.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto py-2">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/10">
                    <div className="text-3xl sm:text-5xl font-extrabold tracking-tight font-mono text-yellow-400">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <div className="text-[11px] font-medium text-gray-300 uppercase mt-1">Hours</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/10">
                    <div className="text-3xl sm:text-5xl font-extrabold tracking-tight font-mono text-yellow-400">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <div className="text-[11px] font-medium text-gray-300 uppercase mt-1">Minutes</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/10">
                    <div className="text-3xl sm:text-5xl font-extrabold tracking-tight font-mono text-yellow-400">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <div className="text-[11px] font-medium text-gray-300 uppercase mt-1">Seconds</div>
                  </div>
                </div>
              )}

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                <Calendar className="w-3.5 h-3.5 text-yellow-400" />
                <span>Starts: <strong className="text-white">{formattedStartTime} IST</strong></span>
              </div>
            </div>
          </div>

          {/* Details & Integrity Overview */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Candidate & Test Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <User className="w-3.5 h-3.5 text-gray-700" />
                  Candidate Profile
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {candidate?.name || 'Registered Candidate'}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {candidate?.email || 'Logged in via verified session'}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-gray-700" />
                  Test Format
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  {durationMinutes} Minutes Window
                </div>
                <div className="text-xs text-gray-500">
                  Global synchronized timer
                </div>
              </div>
            </div>

            {/* Checklist / Instructions */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Exam Day Guidelines
              </h3>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Automatic Launch:</strong> Stay on this page. When the clock strikes 12:00 PM IST, the assessment starts automatically.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Full-Screen Required:</strong> The proctoring system will ask you to enter full-screen mode upon entry.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Zero Tab Switching:</strong> Switching tabs or minimizing the window will trigger security warnings and auto-submission.</span>
                </li>
              </ul>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-100">
              <button
                type="button"
                onClick={onSwitchAccount}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 text-xs font-medium transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Switch Account
              </button>

              <button
                type="button"
                onClick={onEnter}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer shadow-sm ${
                  isReady
                    ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-950 ring-4 ring-yellow-400/30'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${isReady ? 'animate-spin' : ''}`} />
                {isReady ? 'Enter Assessment Now' : 'Check Access Status'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-[11px] text-gray-400">
          AISAT Assessment Engine · Server Clock Synchronized (IST)
        </p>
      </div>
    </div>
  );
}
