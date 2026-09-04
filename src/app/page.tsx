'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { StatsBanner } from '@/components/landing/StatsBanner';
import { TestPatternSection } from '@/components/landing/TestPatternSection';
import { DomainOverviewSection } from '@/components/landing/DomainOverviewSection';
import { WhyTakeAisatSection } from '@/components/landing/WhyTakeAisatSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { Footer } from '@/components/landing/Footer';
import { RegistrationModal } from '@/components/landing/RegistrationModal';

export default function LandingPage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<string>('Software Engineering & Full Stack');

  const handleOpenRegister = (domain?: string) => {
    if (domain) {
      setSelectedDomain(domain);
    }
    setIsRegisterOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07090E] text-slate-100 selection:bg-amber-500 selection:text-black">
      {/* Navigation */}
      <Navbar onOpenRegister={() => handleOpenRegister()} />

      {/* Main Content */}
      <main className="flex-1">
        <HeroSection onOpenRegister={() => handleOpenRegister()} />
        <StatsBanner />
        <TestPatternSection />
        <DomainOverviewSection onSelectDomain={(domain) => handleOpenRegister(domain)} />
        <WhyTakeAisatSection />
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Registration & Launch Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        defaultDomain={selectedDomain}
      />
    </div>
  );
}
