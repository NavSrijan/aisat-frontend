'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, RefreshCw, KeyRound, CheckCircle2 } from 'lucide-react';
import { CandidateLead } from '@/types/aisat';
import { aisatApi } from '@/lib/api';

interface HeroSectionProps {
  onOpenRegister: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenRegister }) => {
  const router = useRouter();
  const [step, setStep] = useState<'DETAILS' | 'OTP'>('DETAILS');
  const [formData, setFormData] = useState<CandidateLead>({
    name: '',
    email: '',
    phoneNumber: '',
    college: '',
    rollNumber: '',
    branch: 'Computer Science / IT',
    graduationYear: '2026',
    targetDomain: 'General Engineering & Aptitude',
  });

  const [reqId, setReqId] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!formData.name.trim() || !formData.email.trim() || !formData.phoneNumber.trim() || !formData.college.trim()) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await aisatApi.sendOtp(formData.phoneNumber);
      setReqId(res.data.reqId);
      setStep('OTP');
      setResendTimer(30);
    } catch (err: any) {
      console.error('Failed to send OTP:', err);
      setError(err?.message || 'Failed to send OTP. Please check your number.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0 || loading) return;
    setError(null);
    setLoading(true);
    try {
      const res = await aisatApi.sendOtp(formData.phoneNumber);
      setReqId(res.data.reqId);
      setResendTimer(30);
    } catch (err: any) {
      setError(err?.message || 'Failed to resend OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!otp.trim() || otp.trim().length < 4) {
      setError('Please enter a valid OTP.');
      return;
    }

    setLoading(true);
    try {
      const response = await aisatApi.registerCandidate({
        ...formData,
        reqId,
        otp: otp.trim(),
        quizId: 'a15a7000-0000-4000-8000-000000000001',
      });
      aisatApi.setToken(response.data.token);
      sessionStorage.setItem('aisat_candidate', JSON.stringify(response.data.candidate));

      const targetQuizId = response.data.quizId || 'a15a7000-0000-4000-8000-000000000001';
      router.push(`/test/${targetQuizId}`);
    } catch (err: any) {
      console.error('Registration/OTP failed:', err);
      setError(err?.message || 'Invalid OTP. Please check the code and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    setFormData({
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phoneNumber: '9876543210',
      college: 'Delhi Technological University (DTU)',
      rollNumber: '21CS042',
      branch: 'Computer Science / IT',
      graduationYear: '2026',
      targetDomain: 'General Engineering & Aptitude',
    });
    setOtp('123456');
    setError(null);
  };

  return (
    <section className="bg-white pt-8 pb-16 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Hero: Left Headline/Copy, Right Quick Registration Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-14">
          
          {/* Left Column: Heading, Subtitle, Key Value Props */}
          <div className="lg:col-span-7 space-y-6 pt-2">
            
            {/* Main Headline with doodle */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#011C40] text-xs font-bold mb-4">
                <span className="w-2 h-2 rounded-full bg-[#FFCC00]" />
                AISAT 2026 • Live All India Assessment
              </div>
              
              <h1 className="capabl-hero-heading relative">
                <span className="relative inline-block">
                  Be Capabl
                  <img
                    src="https://cdn.prod.website-files.com/66c33148d7db732dc0f5cb7d/66d04e567e2b3bd49fa8848d_line.png"
                    alt=""
                    className="absolute -bottom-2.5 left-0 w-full h-3 object-contain pointer-events-none"
                  />
                </span>{' '}
                - Make. Build.
                <br />
                Get things done!
              </h1>
            </div>

            {/* Subtext */}
            <p className="capabl-subtext max-w-xl text-base text-gray-600 leading-relaxed">
              Hands-on offline workshops &amp; real-world projects. Evaluate your engineering problem solving, system design, and agentic AI readiness today.
            </p>

            {/* Quick Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-5 h-5 rounded-md bg-[#FFCC00] text-black font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">40 High-Yield Questions</div>
                  <div className="text-[11px] text-gray-500">Aptitude, Core CS &amp; Agentic AI</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-5 h-5 rounded-md bg-[#011C40] text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  ⚡
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Instant Benchmark Report</div>
                  <div className="text-[11px] text-gray-500">Real-time evaluation &amp; score</div>
                </div>
              </div>
            </div>

            {/* Secondary Link */}
            <div className="pt-2 flex items-center gap-4">
              <a
                href="#test-details"
                className="text-xs font-bold text-[#011C40] hover:text-black flex items-center gap-1.5 transition-colors"
              >
                <span>View Test Structure &amp; Syllabus</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Right Column: Direct Embedded Registration Form */}
          <div className="lg:col-span-5">
            <div className="bg-[#F8FAFC] rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-lg relative overflow-hidden">
              
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-[#FFCC00] via-[#011C40] to-[#EB353A]" />

              <div className="border-b border-gray-200 pb-3 mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-950">
                    {step === 'DETAILS' ? 'Take Assessment' : 'Verify Mobile OTP'}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {step === 'DETAILS'
                      ? 'Fill your details to enter the proctored test arena.'
                      : `Code sent to +91 ${formData.phoneNumber}`}
                  </p>
                </div>
                {step === 'DETAILS' && (
                  <button
                    type="button"
                    onClick={handleFillDemo}
                    className="px-2.5 py-1 text-xs font-bold text-[#011C40] bg-amber-100/70 hover:bg-amber-200 border border-amber-300 rounded-md transition-colors cursor-pointer"
                    title="Autofill sample candidate details"
                  >
                    Demo Details
                  </button>
                )}
              </div>

              {step === 'DETAILS' ? (
                <form onSubmit={handleSendOtp} className="space-y-3.5">
                  {error && (
                    <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-lg bg-white border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#fc0] focus:ring-1 focus:ring-[#fc0]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="student@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg bg-white border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#fc0] focus:ring-1 focus:ring-[#fc0]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit number"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg bg-white border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#fc0] focus:ring-1 focus:ring-[#fc0]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        College / University <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. IIT Delhi"
                        value={formData.college}
                        onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg bg-white border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#fc0] focus:ring-1 focus:ring-[#fc0]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Roll / Student ID Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 21CS042"
                        value={formData.rollNumber || ''}
                        onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg bg-white border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#fc0] focus:ring-1 focus:ring-[#fc0]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Branch
                      </label>
                      <select
                        value={formData.branch}
                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 text-xs text-gray-900 focus:outline-none focus:border-[#fc0] cursor-pointer"
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
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Graduation Year
                      </label>
                      <select
                        value={formData.graduationYear}
                        onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 text-xs text-gray-900 focus:outline-none focus:border-[#fc0] cursor-pointer"
                      >
                        <option value="2025">2025 (Final Year)</option>
                        <option value="2026">2026 (3rd Year)</option>
                        <option value="2027">2027 (2nd Year)</option>
                        <option value="2028">2028 (1st Year)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-capabl-yellow py-3 rounded-lg font-bold text-sm text-black flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                    >
                      <span>{loading ? 'Sending OTP...' : 'Send OTP & Continue'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerifyAndRegister} className="space-y-4 pt-1">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        setStep('DETAILS');
                        setError(null);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Edit Info</span>
                    </button>
                    <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      OTP Sent
                    </span>
                  </div>

                  <div className="text-center py-2">
                    <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 text-[#011C40] flex items-center justify-center mx-auto mb-2">
                      <KeyRound className="w-5 h-5 text-[#011C40]" />
                    </div>
                    <p className="text-xs text-gray-600">
                      Enter 6-digit OTP sent to <span className="font-bold text-gray-900">+91 {formData.phoneNumber}</span>
                    </p>
                  </div>

                  {error && (
                    <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium text-center">
                      {error}
                    </div>
                  )}

                  <div>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="• • • • • •"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="w-full text-center tracking-[0.6em] text-2xl font-mono font-bold py-2.5 rounded-lg bg-white border-2 border-gray-300 focus:border-[#fc0] focus:outline-none transition-colors"
                      autoFocus
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <button
                      type="button"
                      onClick={() => setOtp('123456')}
                      className="font-bold text-amber-800 hover:text-amber-950 underline underline-offset-2 cursor-pointer"
                    >
                      Use Dev OTP (123456)
                    </button>

                    <button
                      type="button"
                      disabled={resendTimer > 0 || loading}
                      onClick={handleResendOtp}
                      className="font-semibold text-gray-500 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                      {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                    </button>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading || otp.length < 4}
                      className="w-full btn-capabl-yellow py-3 rounded-lg font-bold text-sm text-black flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                    >
                      <span>{loading ? 'Entering Test Arena...' : 'Verify & Enter Arena'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Exact Capabl Stats Box Spanning Full Row */}
        <div className="capabl-stats-box p-6 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
            <div>
              <div className="capabl-stat-number">1.5 Lakhs+</div>
              <div className="capabl-stat-label">Careers<br />Transformed</div>
            </div>
            <div>
              <div className="capabl-stat-number">600+</div>
              <div className="capabl-stat-label">Industry<br />Experts</div>
            </div>
            <div>
              <div className="capabl-stat-number">12+</div>
              <div className="capabl-stat-label">Years in<br />Education</div>
            </div>
            <div>
              <div className="capabl-stat-number">800+</div>
              <div className="capabl-stat-label">Partnered<br />Colleges</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
