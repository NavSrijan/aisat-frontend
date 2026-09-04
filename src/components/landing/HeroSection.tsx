'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
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

  const handleStartTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phoneNumber.trim() || !formData.college.trim()) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    setLoading(true);
    sessionStorage.setItem('aisat_candidate', JSON.stringify(formData));
    router.push('/test/aisat-2026-general');
  };

  return (
    <section className="bg-white pt-8 pb-16 border-b border-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Hero Layout: Text & Actual Capabl Hero Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-12">
          
          {/* Left: Headline & Subtext */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-tight leading-tight">
                Be Capabl – Make. Build.
                <br />
                <span className="relative inline-block">
                  Test your skills!
                  <img
                    src="https://cdn.prod.website-files.com/66c33148d7db732dc0f5cb7d/66d04e567e2b3bd49fa8848d_line.png"
                    alt=""
                    className="absolute -bottom-2.5 left-0 w-full h-3 object-contain pointer-events-none"
                  />
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
              All India Scholarship & Assessment Test (AISAT 2026) for engineering students. Benchmark your technical concepts, aptitude, and practical coding.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-700 font-medium pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FFC700] fill-black" />
                <span>45 Mins Online Test</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FFC700] fill-black" />
                <span>800+ Engineering Colleges</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FFC700] fill-black" />
                <span>No Login Needed</span>
              </div>
            </div>
          </div>

          {/* Right: Official Capabl Student Hero Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <img
              src="https://cdn.prod.website-files.com/66af61f906e2326d3e3183a1/67971c84a7fa275459ad66d5_Home%20Page%20v2.avif"
              alt="Capabl Student"
              className="w-full max-w-md h-auto object-contain"
            />
          </div>

        </div>

        {/* Lead Capture Registration Box */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm max-w-4xl mx-auto">
          <div className="border-b border-gray-100 pb-4 mb-6">
            <h2 className="text-xl font-extrabold text-gray-950">
              Enter Your Details to Start Assessment
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Fill in your details below and immediately launch the test arena.
            </p>
          </div>

          <form onSubmit={handleStartTest} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="student@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit number"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  College Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your college or university"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Branch
                </label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-[#FFC700] bg-white cursor-pointer"
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
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Graduation Year
                </label>
                <select
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-[#FFC700] bg-white cursor-pointer"
                >
                  <option value="2025">2025 (Final Year)</option>
                  <option value="2026">2026 (3rd Year)</option>
                  <option value="2027">2027 (2nd Year)</option>
                  <option value="2028">2028 (1st Year)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto btn-capabl px-8 py-3.5 rounded-lg font-bold text-sm text-black flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
              >
                <span>{loading ? 'Launching Quiz...' : 'Start Assessment'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};
