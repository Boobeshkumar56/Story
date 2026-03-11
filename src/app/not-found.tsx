import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8 text-center">
      <p className="text-sm tracking-[0.4em] text-gray-400 mb-6">404</p>
      <h1 className="text-4xl md:text-6xl font-light tracking-widest mb-4">PAGE NOT FOUND</h1>
      <div className="w-16 h-px bg-black mx-auto mb-8" />
      <p className="text-gray-500 font-light leading-relaxed max-w-md mb-10">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/home"
        className="border border-black text-black px-12 py-4 text-sm tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300"
      >
        BACK TO HOME
      </Link>
    </div>
  );
}
