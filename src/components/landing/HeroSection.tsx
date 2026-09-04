'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2, Clock, Award, Shield } from 'lucide-react';
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
    <section className="bg-white pt-10 pb-16 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading & Simple Overview */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-2">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                All India Scholarship & Assessment Test
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-tight leading-tight">
                Be <span className="yellow-underline">Capabl</span> – Test your engineering skills!
              </h1>
            </div>

            <p className="text-base text-gray-600 leading-relaxed">
              Benchmark your aptitude, core technical concepts, and problem-solving skills across 800+ engineering colleges in India. No prior login or password required.
            </p>

            {/* Quick Test Key Points */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                <div className="text-2xl font-black text-gray-950">45 Mins</div>
                <div className="text-xs font-semibold text-gray-500 mt-1">Total Duration</div>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                <div className="text-2xl font-black text-gray-950">3 Sections</div>
                <div className="text-xs font-semibold text-gray-500 mt-1">Aptitude, Core CS & Coding</div>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                <div className="text-2xl font-black text-gray-950">100% Free</div>
                <div className="text-xs font-semibold text-gray-500 mt-1">No Registration Fee</div>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                <div className="text-2xl font-black text-gray-950">Instant</div>
                <div className="text-xs font-semibold text-gray-500 mt-1">Direct Online Attempt</div>
              </div>
            </div>

            <div className="space-y-2.5 pt-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FFC700] shrink-0" />
                <span>Open for all B.Tech / BE / STEM students (1st to 4th year)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FFC700] shrink-0" />
                <span>Multiple interaction types: MCQs, Match Columns, Fill Blanks & Code</span>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Student Details Form */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
              
              <div className="border-b border-gray-100 pb-4 mb-6">
                <h3 className="text-xl font-extrabold text-gray-950">
                  Enter Your Details to Begin
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Fill in your details below and immediately start your assessment.
                </p>
              </div>

              <form onSubmit={handleStartTest} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    College / Institute Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your college name"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Branch
                    </label>
                    <select
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-[#FFC700] transition-colors bg-white cursor-pointer"
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
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-[#FFC700] transition-colors bg-white cursor-pointer"
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
                  className="w-full btn-capabl py-3.5 rounded-lg font-bold text-sm text-black flex items-center justify-center gap-2 cursor-pointer shadow-xs mt-2 disabled:opacity-50"
                >
                  <span>{loading ? 'Starting Assessment...' : 'Start Assessment'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
