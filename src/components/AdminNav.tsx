'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Edit, LogOut, Camera } from 'lucide-react';

interface AdminNavProps {
  onLogout: () => void;
}

export default function AdminNav({ onLogout }: AdminNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: 'Home', href: '/admin/blogs', icon: Home },
    { name: 'Edit Blogs', href: '/admin/edit-blogs', icon: Edit },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/admin/blogs" className="flex items-center gap-3 group">
            <div className="bg-black p-2 rounded-lg group-hover:scale-105 transition-transform">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-light text-lg tracking-wide text-black">Admin Panel</h1>
              <p className="text-xs text-gray-500 tracking-wider">MITHU ASHWIN</p>
            </div>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative group"
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'text-black'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-light tracking-wide">{item.name}</span>
                  </motion.div>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
            >
              <LogOut size={18} />
              <span className="text-sm font-light tracking-wide">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
