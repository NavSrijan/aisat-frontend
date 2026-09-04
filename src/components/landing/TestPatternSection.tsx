import React from 'react';
import { BrainCircuit, Cpu, Code2, CheckCircle, FileText, Hash, Layers, Terminal } from 'lucide-react';

export const TestPatternSection: React.FC = () => {
  const sections = [
    {
      title: 'Section 1: Logical & Quantitative Aptitude',
      duration: '15 Mins',
      marks: '30 Marks',
      questions: '10 Questions',
      description: 'Pattern recognition, data interpretation, probability, numerical reasoning, and verbal logic.',
      icon: BrainCircuit,
      badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
      topics: ['Numerical Aptitude', 'Deductive Logic', 'Data Sufficiency', 'Spatial Reasoning'],
    },
    {
      title: 'Section 2: Core Engineering & CS Fundamentals',
      duration: '20 Mins',
      marks: '40 Marks',
      questions: '12 Questions',
      description: 'Data structures, algorithms, operating systems, DBMS, computer networks, and system architecture.',
      icon: Cpu,
      badgeColor: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
      topics: ['Data Structures & Complexity', 'DBMS & SQL Queries', 'OS & Concurrency', 'Object Oriented Design'],
    },
    {
      title: 'Section 3: Algorithmic Logic & Coding Challenge',
      duration: '25 Mins',
      marks: '50 Marks',
      questions: '3 Questions',
      description: 'Live algorithmic implementation, debugging edge test cases, and time/space optimization.',
      icon: Code2,
      badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      topics: ['Array & String Manipulation', 'HashMaps & Pointers', 'Edge-case Validation', 'Execution Sandbox'],
    },
  ];

  const interactionTypes = [
    { name: 'Single Choice MCQ', icon: CheckCircle, desc: 'Classic single correct answer with conceptual distractors' },
    { name: 'Multi-Select Checkboxes', icon: Layers, desc: 'Partial marking for complex multi-concept evaluation' },
    { name: 'Match the Columns', icon: Layers, desc: 'Pair technical concepts, protocols, and architectural patterns' },
    { name: 'Fill in the Blanks', icon: FileText, desc: 'Precision code & syntax completion without guesswork' },
    { name: 'Numeric Input', icon: Hash, desc: 'Exact values with mathematical tolerance bounds' },
    { name: 'Coding Sandbox', icon: Terminal, desc: 'Live code editor with instant test-case execution' },
  ];

  return (
    <section id="test-pattern" className="py-20 lg:py-28 bg-[#090D16] relative border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            ⚡ Assessment Structure
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed to Benchmark Real Engineering Competence
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            AISAT combines conceptual speed with in-depth problem-solving across 3 calibrated test modules.
          </p>
        </div>

        {/* 3 Test Stages Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 flex flex-col justify-between relative group glass-card-hover"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-amber-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${section.badgeColor}`}>
                      {section.duration}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {section.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {section.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs font-bold text-slate-300 py-2 border-y border-white/[0.06] mb-4">
                    <span>{section.questions}</span>
                    <span>•</span>
                    <span className="text-amber-400">{section.marks}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Key Focus Areas:
                    </div>
                    {section.topics.map((topic, tIdx) => (
                      <div key={tIdx} className="text-xs text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                  <span>Stage 0{idx + 1}</span>
                  <span className="text-amber-400 font-semibold">Adaptive Difficulty</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Engine Capabilities Strip */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 lg:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="font-extrabold text-base sm:text-lg text-white">
                Powered by Next-Gen Multi-Interaction Quiz Engine V2
              </h4>
              <p className="text-xs text-slate-400">
                Evaluating cognitive clarity, practical coding, and exact mathematical precision.
              </p>
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold self-start md:self-auto">
              Real-time Autosave & State Resumption
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {interactionTypes.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex flex-col gap-2">
                  <Icon className="w-4 h-4 text-amber-400" />
                  <div className="font-bold text-xs text-slate-200">{item.name}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-2">{item.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
