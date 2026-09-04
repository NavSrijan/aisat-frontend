'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, ShieldCheck, Clock, Award, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { CandidateLead } from '@/types/aisat';

interface HeroSectionProps {
  onOpenRegister: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenRegister }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<CandidateLead>({
    name: '',
    email: '',
    phoneNumber: '',
    college: '',
    branch: 'Computer Science / IT',
    graduationYear: '2026',
    targetDomain: 'Software Engineering & Full Stack',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phoneNumber.trim() || !formData.college.trim()) {
      setError('Please fill in all details to proceed.');
      return;
    }
    setLoading(true);
    sessionStorage.setItem('aisat_candidate', JSON.stringify(formData));
    router.push('/test/aisat-2026-general');
  };

  return (
    <section className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-mesh-dark">
      {/* Radiant glow spots */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & Highlights */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-amber-500/30 backdrop-blur-md shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-xs font-bold text-amber-400 tracking-wide uppercase">
                AISAT 2026 • Live All India Assessment
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Benchmark Your Tech Skills.{' '}
              <span className="gradient-text-gold">
                Win 100% Scholarships.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              India&apos;s definitive technical & aptitude assessment for engineering students. Test your logical problem-solving, core engineering concepts, and practical coding with instant AI-driven analytics.
            </p>

            {/* Highlight Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full pt-2">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">45 Mins Online Test</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-2.5">
                <Award className="w-4 h-4 text-yellow-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">₹10 Cr+ Pool</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-200">Zero Registration Fee</span>
              </div>
            </div>

            {/* Fast Track Points */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Valid for B.Tech / BE students (1st, 2nd, 3rd, and Final Year) across India</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Multi-interaction questions: MCQs, Match Columns, Fill Blanks, and Coding</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Get detailed national rank & domain benchmark certificate instantly</span>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Quick Start Registration Card */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-3xl bg-[#0E131F]/90 border border-amber-500/30 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-amber-500/10 glow-amber-box">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
                <div>
                  <h3 className="font-extrabold text-lg sm:text-xl text-white">Take AISAT Assessment</h3>
                  <p className="text-xs text-amber-400 font-medium mt-0.5">No password required • Begin in 30 seconds</p>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
                  Free
                </div>
              </div>

              <form onSubmit={handleInlineSubmit} className="space-y-3.5">
                {error && (
                  <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyanshu Jain"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.12] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="priyanshu@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.12] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="9876543210"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.12] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1">
                    College / University
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Manipal Institute / RV College / DTU"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.12] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1">
                      Branch
                    </label>
                    <select
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#131A2B] border border-white/[0.12] text-xs text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                    >
                      <option value="Computer Science / IT">Computer Science / IT</option>
                      <option value="AI & Data Science">AI & Data Science</option>
                      <option value="Electronics & Comm (ECE)">Electronics & Comm (ECE)</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                      <option value="Electrical Engineering">Electrical Engineering</option>
                      <option value="Civil Engineering">Civil Engineering</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1">
                      Graduation Year
                    </label>
                    <select
                      value={formData.graduationYear}
                      onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#131A2B] border border-white/[0.12] text-xs text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                    >
                      <option value="2025">2025 (Final Year)</option>
                      <option value="2026">2026 (3rd Year)</option>
                      <option value="2027">2027 (2nd Year)</option>
                      <option value="2028">2028 (1st Year)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary-gradient py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/25 mt-2 transition-transform active:scale-[0.99]"
                >
                  <span>Start Assessment Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-slate-400 pt-1">
                  By clicking Start, you agree to the test integrity guidelines.
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
