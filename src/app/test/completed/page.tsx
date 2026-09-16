'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Home } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TestCompletedPage() {
  const [submission, setSubmission] = useState<any>(null);

  useEffect(() => {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FFC700', '#10B981', '#0F172A'],
    });

    const raw = sessionStorage.getItem('aisat_final_submission');
    if (raw) {
      try {
        setSubmission(JSON.parse(raw));
      } catch (e) {
        console.error('Failed to parse final submission data', e);
      }
    }
  }, []);

  const candidate = submission?.candidate;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 flex flex-col justify-between">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 shadow-2xs">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img
              src="https://cdn.prod.website-files.com/66af61f906e2326d3e3183a1/66afee391f29c527ad2c2ada_Capabl%20TM%20logo-p-500.avif"
              alt="Capabl Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-bold text-gray-700 bg-gray-100 rounded-md">
              AISAT 2026
            </span>
          </Link>
          <Link
            href="/"
            className="text-xs text-gray-600 hover:text-black flex items-center gap-1 font-medium transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-xl w-full mx-auto px-4 py-12 flex-1 flex flex-col items-center justify-center text-center">
        
        <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight mb-2">
          Assessment Submitted Successfully
        </h1>
        <p className="text-sm text-gray-600 mb-8">
          Your result has been stored.
        </p>

        {candidate && (
          <div className="w-full bg-white rounded-xl p-6 border border-gray-200 shadow-xs text-left mb-8">
            <div className="border-b border-gray-100 pb-3 mb-4 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Candidate</div>
                <div className="text-base font-extrabold text-gray-950">{candidate.name}</div>
              </div>
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-gray-100 text-gray-700">
                Class of {candidate.graduationYear}
              </span>
            </div>

            <div className="space-y-2 text-xs text-gray-600">
              <div><span className="font-semibold text-gray-700">Email:</span> {candidate.email}</div>
              <div><span className="font-semibold text-gray-700">Phone:</span> {candidate.phoneNumber}</div>
              <div><span className="font-semibold text-gray-700">College:</span> {candidate.college} ({candidate.branch})</div>
              {candidate.rollNumber && (
                <div><span className="font-semibold text-gray-700">Roll Number:</span> {candidate.rollNumber}</div>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
          {submission?.quizId && (
            <Link
              href={`/test/${submission.quizId}`}
              className="w-full sm:w-auto btn-capabl px-6 py-3 rounded-lg font-bold text-sm text-black flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span>Resume / Re-enter Test</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          <Link
            href="/"
            onClick={() => {
              sessionStorage.removeItem('aisat_final_submission');
              sessionStorage.removeItem('aisat_token');
              sessionStorage.removeItem('aisat_candidate');
              sessionStorage.removeItem('aisat_responses');
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-lg font-bold text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>Return to Home</span>
          </Link>
        </div>

      </main>

      <footer className="border-t border-gray-200 py-6 text-center text-xs text-gray-500 bg-white">
        © {new Date().getFullYear()} Capabl. All rights reserved.
      </footer>
    </div>
  );
}
