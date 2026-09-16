import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 text-xs text-gray-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-800">Capabl</span>
          <span>•</span>
          <span>AI SAT Assessment Portal</span>
        </div>
        <div>
          © {new Date().getFullYear()} Capabl. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
