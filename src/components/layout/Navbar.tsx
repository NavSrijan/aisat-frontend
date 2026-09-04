'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenRegister?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Real Capabl Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="https://cdn.prod.website-files.com/66af61f906e2326d3e3183a1/66afee391f29c527ad2c2ada_Capabl%20TM%20logo-p-500.avif"
            alt="Capabl Logo"
            className="h-9 w-auto object-contain"
          />
          <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-bold text-gray-700 bg-gray-100 rounded-md">
            AISAT 2026
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <a href="#test-details" className="hover:text-black transition-colors">
            Test Format
          </a>
          <a href="#colleges" className="hover:text-black transition-colors">
            Partner Colleges
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
