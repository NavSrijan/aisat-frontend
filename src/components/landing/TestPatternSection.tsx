import React from 'react';
import { Brain, Cpu, Code2, CheckSquare } from 'lucide-react';

export const TestPatternSection: React.FC = () => {
  const sections = [
    {
      title: 'Quantitative & Analytical Aptitude',
      duration: '15 Mins',
      marks: '30 Marks',
      questions: '3 Questions',
      desc: 'Probability, numerical reasoning, series patterns, and data interpretation.',
      types: ['Single Choice MCQ', 'Numeric Input', 'Match the Columns'],
      icon: Brain,
    },
    {
      title: 'Core Engineering & Computing',
      duration: '15 Mins',
      marks: '40 Marks',
      questions: '4 Questions',
      desc: 'Data structures, operating systems, database ACID properties, and caching.',
      types: ['Multi-Select Checkboxes', 'Fill in Blanks', 'Short Answer', 'Match Columns'],
      icon: Cpu,
    },
    {
      title: 'Algorithmic Problem Solving',
      duration: '15 Mins',
      marks: '30 Marks',
      questions: '1 Challenge',
      desc: 'Live code implementation with test case verification (Python / JS / C++).',
      types: ['Live Code Editor', 'Test Case Runner'],
      icon: Code2,
    },
  ];

  return (
    <section id="test-details" className="py-16 bg-gray-50/60 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
            Test <span className="yellow-underline">Format</span> & Structure
          </h2>
          <p className="text-sm text-gray-600 mt-3">
            The assessment is divided into 3 timed sections covering quantitative speed, technical knowledge, and coding logic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-between shadow-xs hover:border-gray-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-800">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#FFC700]/20 text-gray-900">
                      {sec.duration}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-gray-950 mb-1">
                    Section {idx + 1}: {sec.title}
                  </h3>
                  
                  <div className="text-xs font-semibold text-gray-500 mb-3">
                    {sec.questions} • {sec.marks}
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {sec.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Question Formats:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {sec.types.map((type, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-700"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
