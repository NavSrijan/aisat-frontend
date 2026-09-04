import React from 'react';

export const IndustrySection: React.FC = () => {
  const logos = [
    { name: 'Tata', src: 'https://cdn.prod.website-files.com/66af61f906e2326d3e3183a1/673c54053fa6d6d39e9500ed_tata_logo.avif' },
    { name: 'Kia', src: 'https://cdn.prod.website-files.com/66af61f906e2326d3e3183a1/673c54053fa6d6d39e9500eb_kn_logo.avif' },
    { name: 'Ather', src: 'https://cdn.prod.website-files.com/66af61f906e2326d3e3183a1/673c54053fa6d6d39e9500f5_ather_logo.avif' },
    { name: 'Amazon', src: 'https://cdn.prod.website-files.com/66af61f906e2326d3e3183a1/673c54053fa6d6d39e9500ef_amazon_logo.avif' },
    { name: 'Mercedes-Benz', src: 'https://cdn.prod.website-files.com/66af61f906e2326d3e3183a1/673c54053fa6d6d39e9500f3_benz_logo.avif' },
  ];

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-8">
          Assessments & Learning Designed by Experts from
        </p>

        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 opacity-80 grayscale hover:grayscale-0 transition-all">
          {logos.map((logo, idx) => (
            <img
              key={idx}
              src={logo.src}
              alt={logo.name}
              className="h-8 sm:h-10 w-auto object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
