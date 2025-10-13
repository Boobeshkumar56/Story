'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook } from 'lucide-react';

export default function Library() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = ['All', 'Weddings', 'Portraits', 'Events', 'Fashion'];

  const galleryImages = [
    { src: 'https://picsum.photos/800/1200?random=20', category: 'Weddings', title: 'Sacred Vows', year: '2024' },
    { src: 'https://picsum.photos/600/800?random=21', category: 'Portraits', title: 'Inner Light', year: '2024' },
    { src: 'https://picsum.photos/900/600?random=22', category: 'Fashion', title: 'Modern Grace', year: '2023' },
    { src: 'https://picsum.photos/700/1000?random=23', category: 'Weddings', title: 'First Dance', year: '2024' },
    { src: 'https://picsum.photos/800/800?random=24', category: 'Portraits', title: 'Authentic Self', year: '2023' },
    { src: 'https://picsum.photos/600/900?random=25', category: 'Events', title: 'Celebration', year: '2024' },
    { src: 'https://picsum.photos/1000/700?random=26', category: 'Fashion', title: 'Elegance', year: '2023' },
    { src: 'https://picsum.photos/800/1100?random=27', category: 'Weddings', title: 'Golden Hour', year: '2024' },
    { src: 'https://picsum.photos/700/800?random=28', category: 'Portraits', title: 'Silent Stories', year: '2023' },
    { src: 'https://picsum.photos/900/1200?random=29', category: 'Events', title: 'Milestone', year: '2024' },
    { src: 'https://picsum.photos/600/700?random=30', category: 'Fashion', title: 'Style Statement', year: '2023' },
    { src: 'https://picsum.photos/800/900?random=31', category: 'Weddings', title: 'Eternal Love', year: '2024' },
    { src: 'https://picsum.photos/750/1000?random=32', category: 'Portraits', title: 'Depth of Soul', year: '2023' },
    { src: 'https://picsum.photos/850/600?random=33', category: 'Events', title: 'Joyful Gathering', year: '2024' },
    { src: 'https://picsum.photos/700/900?random=34', category: 'Fashion', title: 'Contemporary', year: '2023' },
    { src: 'https://picsum.photos/600/800?random=35', category: 'Weddings', title: 'Promise', year: '2024' },
  ];

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
        <div className="px-8 md:px-12 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-light tracking-[0.2em]">
              MITHU ASHWIN
            </Link>
            <div className="flex space-x-8 text-sm tracking-[0.2em]">
              <Link href="/home" className="hover:opacity-60 transition-opacity">
                PORTFOLIO
              </Link>
              <Link href="/blogs" className="hover:opacity-60 transition-opacity">
                JOURNAL
              </Link>
              <Link href="/book-us" className="hover:opacity-60 transition-opacity">
                CONTACT
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-16 px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-light tracking-[0.1em] mb-6">
              LIBRARY
            </h1>
            <p className="text-lg tracking-[0.2em] text-gray-600 mb-8">
              A CURATED COLLECTION OF FINEST WORK
            </p>
            <div className="w-24 h-px bg-black mx-auto"></div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center space-x-8"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-sm tracking-[0.2em] transition-opacity duration-300 ${
                  selectedCategory === category
                    ? 'opacity-100 border-b border-black pb-1'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-20 px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8"
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={`${selectedCategory}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group cursor-pointer mb-8 break-inside-avoid"
                  onClick={() => setSelectedImage(image.src)}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.title}
                      width={400}
                      height={600}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                    <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-white">
                        <p className="text-sm font-light tracking-wide">{image.title}</p>
                        <p className="text-xs tracking-[0.2em] opacity-80">{image.category.toUpperCase()} • {image.year}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Full size image"
                width={1200}
                height={800}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors text-sm tracking-[0.2em]"
              >
                CLOSE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-16 px-8 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm tracking-[0.2em] text-gray-600 mb-2">
                MITHU ASHWIN PHOTOGRAPHY
              </p>
              <p className="text-xs tracking-[0.2em] text-gray-400">
                COONOOR, NILGIRIS • EST. 2018
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://instagram.com/mithuashwin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com/mithuashwin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}