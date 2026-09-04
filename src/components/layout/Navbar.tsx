'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenRegister?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Capabl Logo matching real site */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center">
            <span className="text-2xl font-black tracking-tight text-gray-950">
              Capa
            </span>
            <span className="text-2xl font-black tracking-tight bg-[#FFC700] text-gray-950 px-1 py-0.5 rounded-sm ml-0.5">
              bl.
            </span>
          </div>
          <span className="hidden sm:inline-block ml-3 px-2 py-0.5 text-xs font-bold text-gray-600 bg-gray-100 rounded-md">
            AISAT
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <a href="#test-details" className="hover:text-black transition-colors">
            Test Format
          </a>
          <a href="#syllabus" className="hover:text-black transition-colors">
            Syllabus
          </a>
          <a href="#colleges" className="hover:text-black transition-colors">
            Colleges
          </a>
          <a href="#faqs" className="hover:text-black transition-colors">
            FAQs
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenRegister}
            className="btn-capabl px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Start Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
