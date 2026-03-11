'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8 text-center">
      <p className="text-sm tracking-[0.4em] text-gray-400 mb-6">ERROR</p>
      <h1 className="text-4xl md:text-6xl font-light tracking-widest mb-4">SOMETHING WENT WRONG</h1>
      <div className="w-16 h-px bg-black mx-auto mb-8" />
      <p className="text-gray-500 font-light leading-relaxed max-w-md mb-10">
        An unexpected error occurred. Please try again or return to the home page.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <button
          onClick={reset}
          className="border border-black text-black px-12 py-4 text-sm tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300"
        >
          TRY AGAIN
        </button>
        <Link
          href="/home"
          className="border border-gray-400 text-gray-600 px-12 py-4 text-sm tracking-[0.3em] hover:border-black hover:text-black transition-all duration-300"
        >
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
}
