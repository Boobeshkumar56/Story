'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Don't show navbar on the root/welcome page
  if (pathname === '/') {
    return null;
  }
  
  return <Navbar />;
}