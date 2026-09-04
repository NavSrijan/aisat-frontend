import React from 'react';
import { Users, GraduationCap, Trophy, Building2 } from 'lucide-react';

export const StatsBanner: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: '1,50,000+',
      label: 'Students Evaluated',
      sublabel: 'Across 28 Indian States',
      accent: 'text-amber-400',
    },
    {
      icon: GraduationCap,
      value: '800+',
      label: 'Partner Engineering Colleges',
      sublabel: 'IITs, NITs & Premier Institutes',
      accent: 'text-yellow-400',
    },
    {
      icon: Trophy,
      value: '₹10 Crore+',
      label: 'Scholarship Grants',
      sublabel: 'Up to 100% Fee Waiver',
      accent: 'text-orange-400',
    },
    {
      icon: Building2,
      value: '100+',
      label: 'Hiring & Tech Partners',
      sublabel: 'Direct Fast-track Interviews',
      accent: 'text-emerald-400',
    },
  ];

  return (
    <div className="w-full border-y border-white/[0.08] bg-[#0c101a]/80 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                    <Icon className={`w-5 h-5 ${stat.accent}`} />
                  </div>
                  <span className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight ${stat.accent}`}>
                    {stat.value}
                  </span>
                </div>
                <div className="font-bold text-sm text-slate-100">{stat.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{stat.sublabel}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
