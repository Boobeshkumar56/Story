'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import LibraryModal from '@/components/LibraryModal';
import ImageCarousel from '@/components/ImageCarousel';

interface RecentWork {
  src: string;
  title: string;
  location: string;
}

export default function Home() {
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  
  // Static carousel images from public/carousel directory
  const staticCarouselImages: RecentWork[] = [
    { src: '/carousel/image1.jpg', title: 'CAPTURING MOMENTS', location: 'Coonoor, 2024' },
    { src: '/carousel/image2.jpg', title: 'TIMELESS MEMORIES', location: 'Nilgiris, 2024' },
    { src: '/carousel/image3.jpg', title: 'PURE EMOTIONS', location: 'Ooty, 2024' },
    { src: '/carousel/image4.jpg', title: 'LOVE STORIES', location: 'Kerala, 2024' },
    { src: '/carousel/image5.jpg', title: 'SPECIAL MOMENTS', location: 'Coimbatore, 2024' },
  ];



  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white pt-20 overflow-hidden">
      {/* Hero Section */}
      <section className="py-20 px-8 md:px-12 relative">
        {/* Elegant background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="elegant-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1.5" fill="#000" opacity="0.2"/>
                <circle cx="40" cy="40" r="1" fill="#000" opacity="0.15"/>
                <circle cx="70" cy="70" r="1.5" fill="#000" opacity="0.2"/>
                <path d="M 0 40 Q 20 35 40 40 T 80 40" stroke="#000" strokeWidth="0.5" fill="none" opacity="0.1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#elegant-pattern)" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Featured Recognition */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-20"
          >
            <motion.h2 
              className="font-dancing text-3xl md:text-5xl mb-6 text-black leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Stories of Love, Laughter & <br className="hidden md:block" />Happily Ever After
            </motion.h2>
            <motion.div
              className="w-32 h-px bg-black mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
            <motion.p 
              className="text-xl leading-relaxed text-gray-700 max-w-3xl mx-auto font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Creating exquisite visual stories rooted in heart, emotion, and the beauty of every moment.
            </motion.p>
          </motion.div>

          {/* Travel Illustration Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-20"
          >
            <div className="relative w-full max-w-2xl mx-auto">
              <Image
                src="/image3.webp"
                alt="Travel & Photography - Capturing Moments Around the World"
                width={800}
                height={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </motion.div>

          {/* Statistics with counter animations */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-20"
          >
            <motion.h3 
              className="font-allura text-4xl md:text-5xl mb-4 text-black"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Over 150+ Brides & Grooms
            </motion.h3>
            <motion.p 
              className="text-xl text-gray-600 mb-6 tracking-wide"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              In 5 States Around India
            </motion.p>
            <motion.p 
              className="text-base text-gray-700 max-w-2xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              From the hills of Nilgiris to destinations across South India, 
              we capture your unique story wherever it unfolds.
            </motion.p>
          </motion.div>

          {/* Call to Action with hover effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/book-us">
              <motion.div
                className="inline-block bg-black text-white px-16 py-5 text-sm tracking-[0.3em] hover:bg-gray-800 transition-all duration-300 rounded-full shadow-lg hover:shadow-2xl cursor-pointer"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                BOOK US NOW
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Image Carousel Section */}
      <section className="py-20 bg-white relative overflow-hidden">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12 px-8 relative z-10"
        >
          <motion.h2 
            className="font-allura text-6xl md:text-7xl mb-6 text-black"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Our Work
          </motion.h2>
          <motion.div
            className="w-32 h-px bg-black mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            A curated selection of our latest photography sessions
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ImageCarousel images={staticCarouselImages} />
        </motion.div>
      </section>

      {/* Library Section */}
      <section className="py-20 px-8 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide text-black">
              Library
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light mb-8">
              Explore our curated collection of finest work
            </p>
            <button
              onClick={() => setIsLibraryOpen(true)}
              className="inline-block border border-black text-black px-12 py-4 text-sm tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300"
            >
              VIEW LIBRARY
            </button>
          </motion.div>
        </div>
      </section>

      {/* Library Modal */}
      <LibraryModal isOpen={isLibraryOpen} onClose={() => setIsLibraryOpen(false)} />

      {/* Contact Section */}
      <section className="py-20 px-8 md:px-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-wide">
              Let&apos;s Create Together
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Ready to capture your precious moments? Reach out and let&apos;s start planning your perfect photography experience.
            </p>
            
            {/* Simple Arrow Link */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/book-us"
                className="inline-flex items-center justify-center group"
              >
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-black transition-all duration-300"
                >
                  <svg 
                    className="w-8 h-8 text-black group-hover:text-white transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 md:px-12 bg-white border-t border-gray-200 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg tracking-[0.2em] text-gray-600 mb-3 font-medium">
                MITHU ASHWIN PHOTOGRAPHY
              </p>
              <p className="text-base tracking-[0.2em] text-gray-400">
                COONOOR, NILGIRIS • EST. 2018
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/mithu_ashwin?igsh=eGF1cHFkbThndmxy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors inline-block"
              >
                <Instagram size={28} />
              </a>

              {/* Developer Signature */}
              <motion.a
                href="https://www.linkedin.com/in/boobesh-kumar-b99b90281?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer relative"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-20 h-20">
                  <img
                    src="/SIGN.png"
                    alt="Boobesh Kumar"
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full mb-3 right-0 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-xl"
                >
                  <span className="font-dancing">Made by Boobesh Kumar</span>
                  <div className="absolute bottom-0 right-4 translate-y-1/2 rotate-45 w-2 h-2 bg-black"></div>
                </motion.div>
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}