import React from 'react';
import { Gift, LineChart, Award, Briefcase, Zap, Shield } from 'lucide-react';

export const WhyTakeAisatSection: React.FC = () => {
  const perks = [
    {
      icon: Gift,
      title: 'Up to 100% Fee Scholarships',
      desc: 'Top performers in each engineering domain receive full and partial tuition waivers on all advanced Capabl programs.',
      accent: 'from-amber-500/20 to-yellow-500/10 text-amber-400',
    },
    {
      icon: LineChart,
      title: 'National Percentile Benchmarking',
      desc: 'Understand exactly where your problem-solving and technical acumen stands among 1.5 Lakh+ engineering peers across India.',
      accent: 'from-orange-500/20 to-amber-500/10 text-orange-400',
    },
    {
      icon: Award,
      title: 'Verified Competence Certificate',
      desc: 'Receive an official, tamper-proof skill scorecard verified by Capabl and shareable directly on LinkedIn and your resume.',
      accent: 'from-emerald-500/20 to-teal-500/10 text-emerald-400',
    },
    {
      icon: Briefcase,
      title: 'Fast-Track Placement Opportunities',
      desc: 'Top 10% scorers are directly presented to 100+ high-growth tech firms, automotive OEMs, and product startups.',
      accent: 'from-blue-500/20 to-cyan-500/10 text-blue-400',
    },
  ];

  return (
    <section id="scholarships" className="py-20 lg:py-28 bg-[#090D16] relative border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            🏆 Scholarships & Rewards
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Every Engineering Student Should Take AISAT
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            More than just an exam — AISAT is your launchpad to elite tech training and career acceleration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 flex flex-col justify-between group glass-card-hover"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${perk.accent} border border-white/[0.08] flex items-center justify-center mb-5`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-lg text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {perk.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {perk.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-semibold text-slate-500 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Merit-Based Guarantee</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
