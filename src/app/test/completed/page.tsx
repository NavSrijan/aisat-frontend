'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Award, ArrowRight, ShieldCheck, Mail, Phone, School, Sparkles, Home } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TestCompletedPage() {
  const [submission, setSubmission] = useState<any>(null);

  useEffect(() => {
    // Fire confetti on load
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#FBBF24', '#10B981', '#FFFFFF'],
    });

    const raw = sessionStorage.getItem('aisat_final_submission');
    if (raw) {
      try {
        setSubmission(JSON.parse(raw));
      } catch (e) {
        console.error('Failed to parse final submission data', e);
      }
    }
  }, []);

  const candidate = submission?.candidate;

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      {/* Header Bar */}
      <header className="border-b border-white/[0.08] bg-[#0A0E18] py-4">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center font-black text-black text-sm">
              ⚡
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white">CAPABL AISAT 2026</span>
          </div>
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 font-medium transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl w-full mx-auto px-4 py-12 flex-1 flex flex-col items-center justify-center text-center">
        
        {/* Animated Check Icon */}
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-amber-500/20 to-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6 shadow-2xl shadow-emerald-500/10 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        {/* Headline */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Test Response Recorded
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
          Assessment Submitted Successfully!
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed mb-8">
          Thank you for taking the <strong>All India Scholarship & Assessment Test (AISAT 2026)</strong>. Your answers and performance metrics have been captured.
        </p>

        {/* Candidate & Attempt Summary Card */}
        {candidate && (
          <div className="w-full glass-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] text-left mb-8 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
              <div>
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Registration Details
                </div>
                <div className="text-lg font-extrabold text-white mt-0.5">{candidate.name}</div>
              </div>
              <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                {candidate.graduationYear} Batch
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{candidate.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{candidate.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300 sm:col-span-2">
                <School className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{candidate.college} ({candidate.branch})</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
              <span>Target Track: <strong className="text-white">{candidate.targetDomain}</strong></span>
              <span>Submission Time: <strong className="text-white">{new Date().toLocaleTimeString()}</strong></span>
            </div>
          </div>
        )}

        {/* Next Steps Box */}
        <div className="w-full rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 text-left mb-8 space-y-3">
          <div className="font-extrabold text-sm text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>What Happens Next?</span>
          </div>
          <div className="text-xs text-slate-400 space-y-2 leading-relaxed">
            <p>1. <strong>Scorecard Generation</strong>: Our automated grading system is calculating your domain percentiles and problem-solving benchmarks.</p>
            <p>2. <strong>Scholarship Evaluation</strong>: Your rank will be mapped against Capabl&apos;s ₹10 Cr scholarship allocation pool.</p>
            <p>3. <strong>Admissions Intimation</strong>: You will receive an official performance scorecard and counseling invite on your registered email and WhatsApp number.</p>
          </div>
        </div>

        {/* Return Button */}
        <Link
          href="/"
          className="btn-primary-gradient px-8 py-3.5 rounded-xl font-black text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
        >
          <span>Return to AISAT Home</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Capabl. All rights reserved.
      </footer>
    </div>
  );
}
