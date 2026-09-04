'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Who can take the AISAT assessment?',
      a: 'All engineering and STEM students (B.Tech, BE, BCA, MCA) across 1st, 2nd, 3rd, and 4th year are eligible.',
    },
    {
      q: 'Is there any registration or exam fee?',
      a: 'No. AISAT is completely free of cost.',
    },
    {
      q: 'Do I need a password or login account?',
      a: 'No login credentials required. Just provide your basic details on this page and you can start taking the test immediately.',
    },
    {
      q: 'Can I navigate between questions and sections?',
      a: 'Yes, you can jump between questions, mark questions for review, and change your answers anytime before the final submission.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">
            Frequently Asked <span className="yellow-underline">Questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-gray-200 overflow-hidden bg-white"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/70 transition-colors"
                >
                  <span className="font-bold text-sm text-gray-900">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
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
