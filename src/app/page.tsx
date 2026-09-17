'use client';

import React, { Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function HomePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const quizIdParam = searchParams.get('quizId');

  useEffect(() => {
    // If a specific quizId is provided in URL params, redirect directly to its test arena
    if (quizIdParam) {
      router.push(`/test/${quizIdParam}`);
    }
  }, [quizIdParam, router]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between items-center select-none">
      <div className="w-full flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="flex flex-col items-center gap-6 animate-fade-in">
          {/* Official Capabl Logo */}
          <img
            src="https://cdn.prod.website-files.com/66af61f906e2326d3e3183a1/66afee391f29c527ad2c2ada_Capabl%20TM%20logo-p-500.avif"
            alt="Capabl Logo"
            className="h-16 sm:h-20 w-auto object-contain transition-transform hover:scale-105 duration-300"
          />
        </div>
      </div>

      <footer className="py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Capabl. All rights reserved.
      </footer>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
          <img
            src="https://cdn.prod.website-files.com/66af61f906e2326d3e3183a1/66afee391f29c527ad2c2ada_Capabl%20TM%20logo-p-500.avif"
            alt="Capabl Logo"
            className="h-14 w-auto object-contain animate-pulse"
          />
        </div>
      }
    >
      <HomePageContent />
    </Suspense>
  );
}
