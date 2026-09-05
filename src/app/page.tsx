'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { IndustrySection } from '@/components/landing/IndustrySection';
import { TestPatternSection } from '@/components/landing/TestPatternSection';
import { CollegesSection } from '@/components/landing/CollegesSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { Footer } from '@/components/landing/Footer';
import { RegistrationModal } from '@/components/landing/RegistrationModal';

export default function LandingPage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

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
      />
    </div>
  );
}
