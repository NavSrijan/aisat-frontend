import React from 'react';
import { School, Award } from 'lucide-react';

export const CollegesSection: React.FC = () => {
  const colleges = [
    'IIT Madras',
    'IIT Kanpur',
    'BITS Pilani',
    'NIT Trichy',
    'DTU Delhi',
    'VIT Vellore',
    'Manipal Institute of Tech',
    'JNTU Hyderabad',
    'Osmania University',
    'VTU Karnataka',
  ];

  return (
    <section id="colleges" className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-2xl font-extrabold text-gray-950 tracking-tight">
                Present across 800+ <span className="yellow-underline">Colleges</span> & Universities
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Students and teams from premier technological institutions across India participate in the AISAT benchmark.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {colleges.map((college, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg border border-gray-200 px-3.5 py-3 text-center shadow-2xs hover:border-gray-300 transition-all"
                  >
                    <span className="text-xs font-bold text-gray-800">{college}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
