'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Camera, Instagram, Facebook, Phone, Mail, MapPin, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [showFullPortfolio, setShowFullPortfolio] = useState(false);
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Extended gallery for full portfolio
  const fullPortfolioImages = [
    { id: 1, src: 'https://picsum.photos/400/600?random=11', alt: 'Portrait 1', size: 'tall' },
    { id: 2, src: 'https://picsum.photos/600/400?random=12', alt: 'Landscape 1', size: 'wide' },
    { id: 3, src: 'https://picsum.photos/400/500?random=13', alt: 'Portrait 2', size: 'medium' },
    { id: 4, src: 'https://picsum.photos/500/400?random=14', alt: 'Landscape 2', size: 'medium' },
    { id: 5, src: 'https://picsum.photos/400/700?random=15', alt: 'Portrait 3', size: 'tall' },
    { id: 6, src: 'https://picsum.photos/700/400?random=16', alt: 'Landscape 3', size: 'wide' },
    { id: 7, src: 'https://picsum.photos/350/350?random=17', alt: 'Square 1', size: 'square' },
    { id: 8, src: 'https://picsum.photos/450/650?random=18', alt: 'Portrait 4', size: 'tall' },
    { id: 9, src: 'https://picsum.photos/550/350?random=19', alt: 'Landscape 4', size: 'medium' },
    { id: 10, src: 'https://picsum.photos/350/350?random=20', alt: 'Square 2', size: 'square' },
    { id: 11, src: 'https://picsum.photos/400/600?random=21', alt: 'Portrait 5', size: 'tall' },
    { id: 12, src: 'https://picsum.photos/650/400?random=22', alt: 'Landscape 5', size: 'wide' },
    { id: 13, src: 'https://picsum.photos/350/450?random=23', alt: 'Portrait 6', size: 'medium' },
    { id: 14, src: 'https://picsum.photos/350/350?random=24', alt: 'Square 3', size: 'square' },
    { id: 15, src: 'https://picsum.photos/500/700?random=25', alt: 'Portrait 7', size: 'tall' },
    { id: 16, src: 'https://picsum.photos/600/350?random=26', alt: 'Landscape 6', size: 'wide' },
    { id: 17, src: 'https://picsum.photos/400/400?random=27', alt: 'Square 4', size: 'square' },
    { id: 18, src: 'https://picsum.photos/450/550?random=28', alt: 'Portrait 8', size: 'medium' },
    { id: 19, src: 'https://picsum.photos/550/400?random=29', alt: 'Landscape 7', size: 'medium' },
    { id: 20, src: 'https://picsum.photos/350/350?random=30', alt: 'Square 5', size: 'square' },
    { id: 21, src: 'https://picsum.photos/400/650?random=31', alt: 'Portrait 9', size: 'tall' },
    { id: 22, src: 'https://picsum.photos/700/450?random=32', alt: 'Landscape 8', size: 'wide' },
    { id: 23, src: 'https://picsum.photos/350/450?random=33', alt: 'Portrait 10', size: 'medium' },
    { id: 24, src: 'https://picsum.photos/450/350?random=34', alt: 'Landscape 9', size: 'medium' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with parallax effect */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
        >
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-6xl md:text-8xl lg:text-9xl font-light mb-8 leading-tight tracking-wide"
          >
            <motion.span
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="block text-white font-extralight"
            >
              CAPTURING
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="block text-gray-300 font-thin mt-2"
            >
              STORIES
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-lg md:text-xl mb-12 text-gray-400 max-w-2xl mx-auto font-light tracking-wide leading-relaxed"
          >
            Through the lens of creativity, we transform fleeting moments into eternal narratives
          </motion.p>

          <motion.div
            variants={fadeInUp}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="group bg-white text-black px-10 py-4 font-light text-lg tracking-wide flex items-center gap-3 transition-all duration-500 hover:bg-gray-100"
            >
              VIEW PORTFOLIO
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              >
                <ArrowRight size={20} />
              </motion.div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="border border-gray-400 text-white px-10 py-4 font-light text-lg tracking-wide hover:bg-white hover:text-black transition-all duration-500"
            >
              INQUIRE NOW
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-extralight mb-8 text-gray-900 tracking-wide leading-tight"
              >
                EVERY FRAME
                <span className="block text-gray-600 font-thin mt-2">TELLS A STORY</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg text-gray-500 mb-12 leading-relaxed font-light tracking-wide max-w-lg"
              >
                We believe in the power of visual storytelling. Each photograph is carefully crafted to capture not just images, but emotions, memories, and moments that transcend time.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex gap-12"
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className="text-4xl font-thin text-black mb-2">500+</div>
                  <div className="text-sm text-gray-500 font-light tracking-wide">STORIES CAPTURED</div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className="text-4xl font-thin text-black mb-2">5+</div>
                  <div className="text-sm text-gray-500 font-light tracking-wide">YEARS EXPERIENCE</div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className="text-4xl font-thin text-black mb-2">100%</div>
                  <div className="text-sm text-gray-500 font-light tracking-wide">SATISFACTION</div>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 flex items-center justify-center">
                <Camera size={120} className="text-blue-600" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Portfolio Album with Magnetic Effect */}
      <section className="py-32 px-4 bg-black text-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-extralight mb-6 text-white tracking-widest leading-tight"
            >
              RECENT WORK
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-gray-400 max-w-2xl mx-auto font-light tracking-wide"
            >
              A curated selection of our latest photography sessions
            </motion.p>
          </div>

          {/* Magnetic Grid */}
          <div className="relative">
            <motion.div
              className="grid grid-cols-12 grid-rows-8 gap-4 h-[800px]"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {/* Large Featured Image */}
              <motion.div
                variants={{
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 }
                }}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                className="col-span-7 row-span-5 bg-gray-800 relative overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gray-700" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="text-2xl font-light tracking-wide mb-2">PORTRAIT SESSION</h4>
                  <p className="text-gray-300 font-light">New York, 2024</p>
                </div>
              </motion.div>

              {/* Vertical Image */}
              <motion.div
                variants={{
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 }
                }}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                className="col-span-5 row-span-8 bg-gray-800 relative overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gray-600" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="text-xl font-light tracking-wide mb-2">WEDDING DAY</h4>
                  <p className="text-gray-300 font-light">Brooklyn, 2024</p>
                </div>
              </motion.div>

              {/* Medium Horizontal */}
              <motion.div
                variants={{
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 }
                }}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                className="col-span-7 row-span-3 bg-gray-800 relative overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gray-500" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-lg font-light tracking-wide mb-1">STREET PHOTOGRAPHY</h4>
                  <p className="text-gray-300 font-light text-sm">Manhattan, 2024</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ 
                y: [0, -30, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 8,
                ease: "easeInOut"
              }}
              className="absolute -top-10 -left-10 w-20 h-20 border border-gray-600 opacity-30"
            />
            
            <motion.div
              animate={{ 
                y: [0, 20, 0],
                rotate: [0, -3, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 6,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute -bottom-10 -right-10 w-16 h-16 border border-gray-600 opacity-20"
            />
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFullPortfolio(true)}
              className="px-12 py-4 border border-gray-600 text-white font-light tracking-widest hover:bg-white hover:text-black transition-all duration-500"
            >
              SHOW LIBRARY
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to Create Your Story?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-8 text-gray-300"
          >
            Let&apos;s capture your special moments and transform them into lasting memories
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-8 py-4 font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-xl"
            >
              Book a Session
            </motion.button>

            <motion.div
              className="flex gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="p-3 border border-gray-600 hover:border-white transition-all duration-300"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="p-3 border border-gray-600 hover:border-white transition-all duration-300"
              >
                <Facebook size={20} />
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Full Portfolio Modal */}
      {showFullPortfolio && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-95 z-50 overflow-y-auto"
        >
          <div className="min-h-screen py-20 px-4">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-12">
              <div className="flex justify-between items-center mb-8">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-6xl font-light text-white tracking-widest"
                >
                  FULL LIBRARY
                </motion.h2>
                
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowFullPortfolio(false)}
                  className="text-white hover:text-gray-300 transition-colors p-2"
                >
                  <X size={32} strokeWidth={1} />
                </motion.button>
              </div>

              {/* Masonry Grid Layout */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 space-y-6"
              >
                {fullPortfolioImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className={`break-inside-avoid mb-6 bg-gray-900 overflow-hidden ${
                      image.size === 'tall' ? 'aspect-[3/4]' :
                      image.size === 'wide' ? 'aspect-[4/3]' :
                      image.size === 'square' ? 'aspect-square' :
                      'aspect-[3/4]'
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={400}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Close Button at Bottom */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center mt-16"
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowFullPortfolio(false)}
                  className="px-12 py-4 border border-white text-white font-light tracking-widest hover:bg-white hover:text-black transition-all duration-500"
                >
                  CLOSE LIBRARY
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Enhanced Footer */}
      <footer className="bg-black text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8 mb-12"
          >
            {/* Brand */}
            <div className="md:col-span-2">
              <h3 className="text-3xl font-light mb-4 tracking-widest">STORIES</h3>
              <p className="text-gray-400 font-light leading-relaxed mb-6 max-w-md">
                Capturing life&apos;s most precious moments through the art of photography. 
                Creating timeless memories that tell your unique story.
              </p>
              <div className="flex gap-4">
                <Camera className="text-gray-400 hover:text-white transition-colors cursor-pointer" size={20} />
                <Instagram className="text-gray-400 hover:text-white transition-colors cursor-pointer" size={20} />
                <Facebook className="text-gray-400 hover:text-white transition-colors cursor-pointer" size={20} />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-light mb-4 tracking-wide">QUICK LINKS</h4>
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors font-light">Home</Link></li>
                <li><Link href="/blogs" className="text-gray-400 hover:text-white transition-colors font-light">Blogs</Link></li>
                <li><Link href="/book-us" className="text-gray-400 hover:text-white transition-colors font-light">Book Us</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-light mb-4 tracking-wide">CONTACT</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-gray-400" />
                  <span className="text-gray-400 font-light">0000000000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-gray-400 font-light">hello@stories.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-gray-400" />
                  <span className="text-gray-400 font-light">Tamil Nadu,TN</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="border-t border-gray-800 pt-8 text-center"
          >
            <p className="text-gray-500 font-light tracking-wide">
              © 2024 Stories. All rights reserved. | Crafted with passion for photography
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
