import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#060B1A] text-gray-400 text-xs py-14 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Description */}
        <div className="space-y-4 max-w-4xl">
          <div className="font-bold text-sm text-white">Capabl!</div>
          <p className="text-gray-400 leading-relaxed text-xs">
            Capabl is the best engineering ecosystem that allows engineering students, companies, and colleges to collaborate on jobs, upskilling, hands-on training online or offline, mentorship, research and networking to build future engineers.
          </p>
          <div className="text-gray-400 leading-relaxed text-xs">
            <span className="font-semibold text-gray-300">Capabl Ecosystem:</span> You can opt for one training program or join multiple to upskill yourself to be a multi-domain expert. Each program comes up with 1:1 personal support, live sessions both online and offline, offline events, hackathons, design competitions, internship/job opportunities, peer connect, events, industry connect, industrial projects, resume making, interviews, and more!
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Logo */}
          <div className="space-y-1">
            <div className="flex items-center">
              <span className="text-xl font-black tracking-tight text-white">
                Capa
              </span>
              <span className="text-xl font-black tracking-tight bg-[#FFC700] text-gray-950 px-1 py-0.5 rounded-sm ml-0.5">
                bl.
              </span>
            </div>
            <div className="text-[11px] text-gray-500">
              Engineered with <span className="text-red-500">❤️</span> by Capabl
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-400">
            <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Refund Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Careers</span>
            <span className="hover:text-white transition-colors cursor-pointer">About Us</span>
            <span className="hover:text-white transition-colors cursor-pointer">Contact Us</span>
          </div>

          {/* Address */}
          <div className="text-[11px] text-gray-500 text-left md:text-right">
            15/1, 4th Cross, 80 Feet Rd, AVS Layout,<br />
            Bengaluru, Karnataka 560037
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-[11px] text-gray-600 border-t border-gray-800/60 pt-6">
          copyright © {new Date().getFullYear()} ETG GROUP
        </div>

      </div>
    </footer>
  );
};
