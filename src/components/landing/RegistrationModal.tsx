'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Sparkles, ArrowRight, User, Mail, Phone, School, BookOpen, Calendar, CheckCircle2 } from 'lucide-react';
import { CandidateLead } from '@/types/aisat';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDomain?: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  defaultDomain = 'Software Engineering & CS',
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<CandidateLead>({
    name: '',
    email: '',
    phoneNumber: '',
    college: '',
    branch: 'Computer Science / IT',
    graduationYear: '2026',
    targetDomain: defaultDomain,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phoneNumber.trim() || !formData.college.trim()) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (formData.phoneNumber.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);

    try {
      // Save lead details into browser session
      sessionStorage.setItem('aisat_candidate', JSON.stringify(formData));
      
      // Target assessment slug
      const quizSlug = 'aisat-2026-general';
      
      // Transition directly to quiz arena
      router.push(`/test/${quizSlug}`);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0E131F] border border-amber-500/30 rounded-2xl shadow-2xl shadow-amber-500/10 overflow-hidden my-8">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-orange-500/20 border-b border-white/[0.08] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
              ⚡
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">Register for AISAT 2026</h3>
              <p className="text-xs text-amber-400/90 font-medium">Free Entry • Instant Test Access • 100% Online</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Full Name <span className="text-amber-400">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.12] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
              />
            </div>
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Address <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.12] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Mobile Number <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  placeholder="9876543210"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.12] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* College Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              College / University Name <span className="text-amber-400">*</span>
            </label>
            <div className="relative">
              <School className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="e.g. SRM Institute / VIT Vellore / IIT Delhi"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.12] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
              />
            </div>
          </div>

          {/* Branch & Graduation Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Degree & Branch
              </label>
              <div className="relative">
                <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#131A2B] border border-white/[0.12] text-sm text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                >
                  <option value="Computer Science / IT">Computer Science / IT</option>
                  <option value="Artificial Intelligence & Data Science">AI & Data Science</option>
                  <option value="Electronics & Communication (ECE)">Electronics & Comm (ECE)</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Electrical Engineering (EEE)">Electrical Engineering (EEE)</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Other Engineering">Other Engineering Specialization</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Graduation Year
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#131A2B] border border-white/[0.12] text-sm text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                >
                  <option value="2025">2025 (Final Year)</option>
                  <option value="2026">2026 (3rd Year)</option>
                  <option value="2027">2027 (2nd Year)</option>
                  <option value="2028">2028 (1st Year)</option>
                  <option value="Graduated">Already Graduated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Assessment Target Domain */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Target Career Track / Test Domain
            </label>
            <select
              value={formData.targetDomain}
              onChange={(e) => setFormData({ ...formData, targetDomain: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-[#131A2B] border border-white/[0.12] text-sm text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
            >
              <option value="Software Engineering & Full Stack">Software Engineering & Full Stack</option>
              <option value="Data Science & Machine Learning">Data Science & Machine Learning</option>
              <option value="Automotive, EV & Mechanical Design">Automotive, EV & Mechanical Design</option>
              <option value="Embedded Systems & VLSI Core">Embedded Systems & VLSI Core</option>
              <option value="General Engineering & Aptitude Benchmark">General Engineering & Aptitude Benchmark</option>
            </select>
          </div>

          {/* Trust points */}
          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/[0.06]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              No login or password needed
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              Instant Quiz Launch
            </span>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary-gradient py-3 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/25 mt-4 disabled:opacity-50"
          >
            {loading ? (
              <span>Preparing Your Test Arena...</span>
            ) : (
              <>
                <span>Enter Test Arena Now</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
