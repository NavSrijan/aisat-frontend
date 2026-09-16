'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';
import { CandidateLead } from '@/types/aisat';
import { aisatApi } from '@/lib/api';

const IS_DEV = process.env.NODE_ENV !== 'production';

interface HeroSectionProps {
  quizId?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ quizId }) => {
  const router = useRouter();
  const effectiveQuizId = quizId || '03afd2a8-2294-4e37-b81b-722300f66d81';

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
      setError('Please fill in all required fields.');
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
      setError(err?.message || 'Failed to send OTP. Please check your phone number.');
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
        quizId: effectiveQuizId,
      });
      aisatApi.setToken(response.data.token);
      sessionStorage.setItem('aisat_candidate', JSON.stringify(response.data.candidate));

      const targetQuizId = response.data.quizId || effectiveQuizId;
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
    if (!IS_DEV) return;
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
    <section className="py-10 sm:py-16 bg-gray-50/50 min-h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
          <div className="border-b border-gray-100 pb-4 mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                {step === 'DETAILS' ? 'Candidate Registration' : 'Verify Mobile OTP'}
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                {step === 'DETAILS'
                  ? 'Enter your details to start the assessment.'
                  : `Enter the 6-digit code sent to +91 ${formData.phoneNumber}`}
              </p>
            </div>

            {IS_DEV && step === 'DETAILS' && (
              <button
                type="button"
                onClick={handleFillDemo}
                className="px-2.5 py-1 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors cursor-pointer"
                title="Autofill sample candidate details"
              >
                Demo Fill
              </button>
            )}
          </div>

          {step === 'DETAILS' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    College / University <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DTU / IIT / NIT"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Roll / Student ID Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 21CS042"
                    value={formData.rollNumber || ''}
                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Branch
                  </label>
                  <select
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-gray-300 text-xs text-gray-900 focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="Computer Science / IT">Computer Science / IT</option>
                    <option value="AI & Data Science">AI & Data Science</option>
                    <option value="Electronics & Comm (ECE)">Electronics & Comm (ECE)</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Graduation Year
                  </label>
                  <select
                    value={formData.graduationYear}
                    onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-gray-300 text-xs text-gray-900 focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="2025">2025 (Final Year)</option>
                    <option value="2026">2026 (3rd Year)</option>
                    <option value="2027">2027 (2nd Year)</option>
                    <option value="2028">2028 (1st Year)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-capabl-yellow py-3 rounded-lg font-bold text-sm text-black flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <span>{loading ? 'Sending OTP...' : 'Send OTP & Proceed'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyAndRegister} className="space-y-4 pt-1">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setStep('DETAILS');
                    setError(null);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>
                <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  OTP Sent
                </span>
              </div>

              <div className="text-center py-2">
                <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-center mx-auto mb-2">
                  <KeyRound className="w-5 h-5 text-amber-700" />
                </div>
                <p className="text-xs text-gray-600">
                  Enter the 6-digit OTP sent to <strong className="text-gray-900">+91 {formData.phoneNumber}</strong>
                </p>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium text-center">
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
                  className="w-full text-center tracking-[0.5em] text-2xl font-mono font-bold py-2.5 rounded-lg bg-white border-2 border-gray-300 focus:border-amber-400 focus:outline-none transition-colors"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                {IS_DEV ? (
                  <button
                    type="button"
                    onClick={() => setOtp('123456')}
                    className="font-medium text-amber-700 hover:text-amber-900 underline underline-offset-2 cursor-pointer"
                  >
                    Use Dev OTP (123456)
                  </button>
                ) : (
                  <span />
                )}

                <button
                  type="button"
                  disabled={resendTimer > 0 || loading}
                  onClick={handleResendOtp}
                  className="font-medium text-gray-500 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                </button>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading || otp.length < 4}
                  className="w-full btn-capabl-yellow py-3 rounded-lg font-bold text-sm text-black flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <span>{loading ? 'Entering Test Arena...' : 'Verify & Start Test'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
