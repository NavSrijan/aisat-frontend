import React from 'react';

export const CollegesSection: React.FC = () => {
  const colleges = [
    { name: 'Osmania Uni', src: 'https://cdn.prod.website-files.com/66af61f906e2326d3e3183a1/673c546e0f325d428ca7bef5_osmania_uni_logo%20(1).avif' },
    { name: 'BITS', src: 'https://cdn.prod.website-files.com/66af61f906e2326d3e3183a1/673c546e0f325d428ca7bef3_bits_logo.avif' },
    { name: 'Andhra Uni', src: 'https://cdn.prod.website-files.com/66af61f906e2326d3e3183a1/673c546e0f325d428ca7befb_andhra_uni_logo.avif' },
    { name: 'JNTU', src: 'https://cdn.prod.website-files.com/66af61f906e2326d3e3183a1/673c546e0f325d428ca7bef7_jntu_logo.avif' },
    { name: 'IIT Madras', src: 'https://cdn.prod.website-files.com/66af61f906e2326d3e3183a1/673c546e0f325d428ca7beff_iit_madras_logo.avif' },
    { name: 'IIT Kanpur', src: 'https://cdn.prod.website-files.com/66af61f906e2326d3e3183a1/699818493036b79ea9738ecf_IIT%20Kanpur.avif' },
    { name: 'VTU', src: 'https://cdn.prod.website-files.com/66af61f906e2326d3e3183a1/673c546e0f325d428ca7bef9_vtu_logo.avif' },
  ];

  return (
    <section id="colleges" className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-2xl font-extrabold text-gray-950 tracking-tight">
                Present across 400+ <span className="yellow-underline">Colleges</span> & Universities
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Students from premier technological institutions across India participate in the AISAT benchmark.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {colleges.map((c, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center justify-center gap-2 shadow-2xs hover:border-gray-300 transition-all text-center"
                  >
                    <img
                      src={c.src}
                      alt={c.name}
                      className="h-12 w-auto max-w-[80px] object-contain"
                    />
                    <span className="text-[11px] font-bold text-gray-700">{c.name}</span>
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
