'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Who is eligible to attempt the AISAT 2026 test?',
      a: 'All engineering students pursuing B.Tech, B.E., BCA, MCA, or related STEM degree programs across any year of study (1st, 2nd, 3rd, and 4th year) are eligible to attempt AISAT for free.',
    },
    {
      q: 'Is there any registration fee for taking the test?',
      a: 'No. AISAT 2026 is 100% free of cost. There are no hidden charges or application fees at any stage.',
    },
    {
      q: 'Do I need to create a password or log in before taking the test?',
      a: 'No prior login credentials or password setup is required. Simply enter your basic details (Name, College, Branch, Graduation Year) and you can immediately begin your assessment.',
    },
    {
      q: 'What kind of questions are included in the test?',
      a: 'The test consists of Logical Reasoning & Quantitative Aptitude, Core Engineering Fundamentals, and Practical Problem Solving / Coding challenges. Question types include Single/Multi MCQs, Match Columns, Fill in the Blanks, and Live Code submission.',
    },
    {
      q: 'Can I attempt the test from my mobile phone or laptop?',
      a: 'Yes, the AISAT assessment engine is fully responsive and works smoothly on modern web browsers across laptops, desktops, tablets, and smartphones. For the coding section, a laptop/desktop is recommended.',
    },
    {
      q: 'When do I get my test results and scholarship status?',
      a: 'Our test engine instantly records and evaluates your submission. Your detailed score report, domain strengths, and scholarship tier are processed right after submission.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-20 lg:py-28 bg-[#07090E] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            💡 Common Queries
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Everything you need to know about AISAT 2026 and our evaluation engine.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-white/[0.08] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-100">
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-white/[0.04] text-amber-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/[0.04] pt-4 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
