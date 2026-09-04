import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#05070B] py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center font-black text-black text-sm">
            ⚡
          </div>
          <div>
            <span className="font-extrabold text-sm text-white tracking-tight">CAPABL AISAT 2026</span>
            <p className="text-[11px] text-slate-400">All India Scholarship & Assessment Test</p>
          </div>
        </div>

        {/* Quick Nav */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
          <a href="#test-pattern" className="hover:text-amber-400 transition-colors">Test Pattern</a>
          <a href="#domains" className="hover:text-amber-400 transition-colors">Domains</a>
          <a href="#scholarships" className="hover:text-amber-400 transition-colors">Scholarships</a>
          <a href="#faqs" className="hover:text-amber-400 transition-colors">FAQs</a>
          <a href="https://www.capabl.in" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
            Main Capabl Website ↗
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right text-[11px] text-slate-400">
          © {new Date().getFullYear()} Capabl. All rights reserved.
        </div>

      </div>
    </footer>
  );
};
