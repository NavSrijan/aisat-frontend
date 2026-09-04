'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenRegister?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#07090e]/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-orange-500 flex items-center justify-center font-black text-black text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            ⚡
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                CAPABL
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-widest bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded uppercase">
                AISAT 2026
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              All India Scholarship & Assessment Test
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#test-pattern" className="hover:text-amber-400 transition-colors">
            Test Pattern
          </a>
          <a href="#domains" className="hover:text-amber-400 transition-colors">
            Domain Tracks
          </a>
          <a href="#scholarships" className="hover:text-amber-400 transition-colors">
            Scholarship Perks
          </a>
          <a href="#faqs" className="hover:text-amber-400 transition-colors">
            FAQs
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            100% Free Entry
          </div>

          <button
            onClick={onOpenRegister}
            className="btn-primary-gradient px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 group cursor-pointer shadow-lg shadow-amber-500/20"
          >
            <span>Start Assessment</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
};
