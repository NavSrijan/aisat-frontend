import React from 'react';

export const StatsBanner: React.FC = () => {
  const stats = [
    { value: '1.5 Lakhs+', label: 'Careers Transformed' },
    { value: '600+', label: 'Industry Experts' },
    { value: '12+', label: 'Years in Education' },
    { value: '800+', label: 'Partnered Colleges' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm py-6 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center pt-3 md:pt-0">
              <span className="text-2xl sm:text-3xl font-black text-gray-950">
                {stat.value}
              </span>
              <span className="text-xs font-semibold text-gray-500 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
