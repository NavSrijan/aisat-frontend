'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { Footer } from '@/components/landing/Footer';

function LandingPageContent() {
  const searchParams = useSearchParams();
  const quizIdParam = searchParams.get('quizId') || undefined;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/30 text-gray-900 font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center">
        <HeroSection quizId={quizIdParam} />
      </main>
      <Footer />
    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-gray-500">Loading Assessment Portal...</div>}>
      <LandingPageContent />
    </Suspense>
  );
}
