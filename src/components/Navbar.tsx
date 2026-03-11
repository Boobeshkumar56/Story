'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useCallback, useRef } from 'react';

function LogoWithDoubleClick() {
  const router = useRouter();
  const clickTimer = useRef<NodeJS.Timeout | null>(null);
  const [clicks, setClicks] = useState(0);

  const handleClick = useCallback(() => {
    if (clicks === 0) {
      // First click
      setClicks(1);
      clickTimer.current = setTimeout(() => {
        setClicks(0);
        // Single click action - navigate home
        router.push('/');
      }, 250);
    } else {
      // Second click
      clearTimeout(clickTimer.current!);
      setClicks(0);
      // Double click action - navigate to admin
      router.push('/admin/blogs');
    }
  }, [clicks, router]);

  return (
    <div onClick={handleClick} className="cursor-pointer flex items-center">
      <div className="w-16 h-16 relative">
        <Image
          src="/logo.png"
          alt="One Way Art Studio"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/home' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Book Us', href: '/book-us' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Left */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center w-1/3"
          >
            <LogoWithDoubleClick />
          </motion.div>

          {/* Center Text - "by Mithu Ashwin" in cursive */}
          <div className="hidden md:flex justify-center w-1/3">
            <span className="font-dancing text-xl text-black" style={{ fontWeight: 700 }}>by Mithu Ashwin</span>
          </div>

          {/* Desktop Navigation - Right */}
          <div className="hidden md:flex items-center justify-end space-x-8 w-1/3">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Link
                  href={item.href}
                  className={`relative px-4 py-2 text-xs font-light tracking-widest transition-colors duration-300 ${
                    pathname === item.href
                      ? 'text-black'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {item.name.toUpperCase()}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-px bg-black"
                      initial={false}
                      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <span className="font-dancing text-base text-black">by Mithu Ashwin</span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-black hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-light tracking-widest transition-colors duration-200 ${
                    pathname === item.href
                      ? 'text-black bg-gray-100 rounded-md'
                      : 'text-gray-600 hover:text-black hover:bg-gray-50 rounded-md'
                  }`}
                >
                  {item.name.toUpperCase()}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
