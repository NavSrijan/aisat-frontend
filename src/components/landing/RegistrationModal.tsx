'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, ArrowRight, ArrowLeft, RefreshCw, KeyRound, CheckCircle2 } from 'lucide-react';
import { CandidateLead } from '@/types/aisat';
import { aisatApi } from '@/lib/api';

const IS_DEV = process.env.NODE_ENV !== 'production';

interface CandidateDetailsStepProps {
  formData: CandidateLead;
  setFormData: React.Dispatch<React.SetStateAction<CandidateLead>>;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string | null;
}

export const CandidateDetailsStep: React.FC<CandidateDetailsStepProps> = ({
  formData,
  setFormData,
  onSubmit,
  loading,
  error,
}) => {
  return (
    <form onSubmit={onSubmit} className="p-6 space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FFC700] transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="student@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FFC700] transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="10-digit number"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FFC700] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            College / Institute Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="College Name"
            value={formData.college}
            onChange={(e) => setFormData({ ...formData, college: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FFC700] transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Roll / Student ID Number
          </label>
          <input
            type="text"
            placeholder="e.g. 21CS042"
            value={formData.rollNumber || ''}
            onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#FFC700] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Branch
          </label>
          <select
            value={formData.branch}
            onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-xs text-gray-900 focus:outline-none focus:border-[#FFC700] bg-white cursor-pointer"
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
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Graduation Year
          </label>
          <select
            value={formData.graduationYear}
            onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-xs text-gray-900 focus:outline-none focus:border-[#FFC700] bg-white cursor-pointer"
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
        className="w-full btn-capabl py-3 rounded-lg font-bold text-sm text-black flex items-center justify-center gap-2 cursor-pointer shadow-xs mt-2 disabled:opacity-50"
      >
        <span>{loading ? 'Sending OTP...' : 'Send OTP & Continue'}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
};

interface OtpVerificationStepProps {
  phoneNumber: string;
  otp: string;
  setOtp: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  onResendOtp: () => void;
  resendTimer: number;
  loading: boolean;
  error: string | null;
}

export const OtpVerificationStep: React.FC<OtpVerificationStepProps> = ({
  phoneNumber,
  otp,
  setOtp,
  onSubmit,
  onBack,
  onResendOtp,
  resendTimer,
  loading,
  error,
}) => {
  return (
    <form onSubmit={onSubmit} className="p-6 space-y-5">
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Edit Details</span>
        </button>
        <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          OTP Sent
        </span>
      </div>

      <div className="text-center space-y-1">
        <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-[#011C40] flex items-center justify-center mx-auto">
          <KeyRound className="w-6 h-6 text-[#011C40]" />
        </div>
        <h3 className="text-base font-bold text-gray-900 pt-1">Enter Verification Code</h3>
        <p className="text-xs text-gray-500 max-w-xs mx-auto">
          We sent a 6-digit OTP code to <span className="font-bold text-gray-900">+91 {phoneNumber}</span>
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
          className="w-full text-center tracking-[0.6em] text-2xl font-mono font-bold py-3 rounded-lg border-2 border-gray-300 focus:border-[#FFC700] focus:outline-none transition-colors"
          autoFocus
        />
      </div>

      <div className="flex items-center justify-between text-xs">
        {IS_DEV ? (
          <button
            type="button"
            onClick={() => setOtp('123456')}
            className="font-bold text-amber-700 hover:text-amber-900 underline underline-offset-2 cursor-pointer"
          >
            Use Dev OTP (123456)
          </button>
        ) : (
          <span />
        )}

        <button
          type="button"
          disabled={resendTimer > 0 || loading}
          onClick={onResendOtp}
          className="font-semibold text-gray-500 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
        </button>
      </div>

      <button
        type="submit"
        disabled={loading || otp.length < 4}
        className="w-full btn-capabl py-3 rounded-lg font-bold text-sm text-black flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
      >
        <span>{loading ? 'Verifying & Entering Test...' : 'Verify & Start Assessment'}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
};

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizId?: string;
  onSuccess?: (token: string, candidate: any) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, quizId, onSuccess }) => {
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

  if (!isOpen) return null;

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
        quizId: quizId || '03afd2a8-2294-4e37-b81b-722300f66d81',
      });
      aisatApi.setToken(response.data.token);
      sessionStorage.setItem('aisat_candidate', JSON.stringify(response.data.candidate));
      
      if (onSuccess) {
        onSuccess(response.data.token, response.data.candidate);
        onClose();
      } else {
        const targetQuizId = response.data.quizId || quizId || '03afd2a8-2294-4e37-b81b-722300f66d81';
        router.push(`/test/${targetQuizId}`);
      }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-gray-950">Capa</span>
            <span className="text-xl font-black tracking-tight bg-[#FFC700] text-gray-950 px-1 py-0.5 rounded-sm ml-0.5">bl.</span>
            <span className="text-xs font-bold text-gray-500 ml-2">AISAT 2026</span>
          </div>
          <div className="flex items-center gap-2">
            {IS_DEV && (
              <button
                type="button"
                onClick={handleFillDemo}
                className="px-2.5 py-1 text-xs font-bold text-[#011C40] bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-md transition-colors cursor-pointer"
                title="Autofill sample candidate details"
              >
                Demo Details
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modular Steps */}
        {step === 'DETAILS' ? (
          <CandidateDetailsStep
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSendOtp}
            loading={loading}
            error={error}
          />
        ) : (
          <OtpVerificationStep
            phoneNumber={formData.phoneNumber}
            otp={otp}
            setOtp={setOtp}
            onSubmit={handleVerifyAndRegister}
            onBack={() => {
              setStep('DETAILS');
              setError(null);
            }}
            onResendOtp={handleResendOtp}
            resendTimer={resendTimer}
            loading={loading}
            error={error}
          />
        )}

      </div>
    </div>
  );
};
