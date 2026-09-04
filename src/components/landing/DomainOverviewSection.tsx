'use client';

import React from 'react';
import { Code, Database, Car, Cpu, ArrowUpRight } from 'lucide-react';

interface DomainOverviewSectionProps {
  onSelectDomain: (domain: string) => void;
}

export const DomainOverviewSection: React.FC<DomainOverviewSectionProps> = ({ onSelectDomain }) => {
  const domains = [
    {
      title: 'Full Stack & Software Engineering',
      tag: 'Most Popular',
      desc: 'Master frontend architectures, scalable backend services, REST/GraphQL APIs, database indexing, and async systems.',
      icon: Code,
      salary: '₹8 - 24 LPA Range',
      skills: ['React / Next.js', 'Node.js / Express', 'PostgreSQL / Redis', 'System Design'],
    },
    {
      title: 'Applied AI & Data Engineering',
      tag: 'High Demand',
      desc: 'Predictive modeling, data pipelines, PyTorch/TensorFlow, prompt engineering, and production ML pipelines.',
      icon: Database,
      salary: '₹10 - 28 LPA Range',
      skills: ['Python', 'PyTorch / Scikit', 'ETL Pipelines', 'Vector DBs / RAG'],
    },
    {
      title: 'Electric Vehicles & Mechanical Design',
      tag: 'Core Engineering',
      desc: 'Battery pack modeling, BMS control logic, powertrain simulations, CAD design, and thermal analysis.',
      icon: Car,
      salary: '₹7 - 18 LPA Range',
      skills: ['MATLAB / Simulink', 'BMS Control', 'SolidWorks / ANSYS', 'EV Powertrains'],
    },
    {
      title: 'Embedded Systems & IoT Hardware',
      tag: 'Hardware + Firmware',
      desc: 'Firmware programming in C/C++, ARM Cortex microcontrollers, RTOS kernels, SPI/I2C/CAN communication protocols.',
      icon: Cpu,
      salary: '₹8 - 20 LPA Range',
      skills: ['Embedded C', 'ARM Cortex / FreeRTOS', 'CAN / UART / I2C', 'PCB Schematic'],
    },
  ];

  return (
    <section id="domains" className="py-20 lg:py-28 bg-[#07090E] relative border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
              🎯 Career Tracks
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Pick Your Domain of Excellence
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Your AISAT score qualifies you for tailored mentorship, scholarship grants, and placement shortlists in your chosen specialization.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {domains.map((domain, idx) => {
            const Icon = domain.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between group glass-card-hover cursor-pointer"
                onClick={() => onSelectDomain(domain.title)}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-semibold text-slate-300">
                      {domain.tag}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-xl text-white mb-2 group-hover:text-amber-400 transition-colors flex items-center justify-between">
                    <span>{domain.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {domain.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {domain.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs font-medium text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="text-xs text-amber-400 font-bold">
                    {domain.salary}
                  </div>
                  <button className="text-xs font-bold text-white group-hover:text-amber-400 flex items-center gap-1 transition-colors">
                    <span>Start Track Test</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
