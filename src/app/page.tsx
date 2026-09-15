'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { IndustrySection } from '@/components/landing/IndustrySection';
import { TestPatternSection } from '@/components/landing/TestPatternSection';
import { CollegesSection } from '@/components/landing/CollegesSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { Footer } from '@/components/landing/Footer';
import { RegistrationModal } from '@/components/landing/RegistrationModal';

function LandingPageContent() {
  const searchParams = useSearchParams();
  const quizIdParam = searchParams.get('quizId') || undefined;
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    if (quizIdParam) {
      setIsRegisterOpen(true);
    }
  }, [quizIdParam]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      {/* Navigation */}
      <Navbar onOpenRegister={() => setIsRegisterOpen(true)} />

      {/* Main Content */}
      <main className="flex-1">
        <HeroSection onOpenRegister={() => setIsRegisterOpen(true)} />
        <IndustrySection />
        <TestPatternSection />
        <CollegesSection />
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick Launch Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        quizId={quizIdParam}
      />
    </div>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LandingPageContent />
    </Suspense>
  );
}
