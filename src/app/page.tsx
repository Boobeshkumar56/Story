'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Welcome() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const carouselImages = [
    'https://picsum.photos/1920/1080?random=1',
    'https://picsum.photos/1920/1080?random=2',
    'https://picsum.photos/1920/1080?random=3',
    'https://picsum.photos/1920/1080?random=4',
    'https://picsum.photos/1920/1080?random=5',
  ];

  // Triple the images for smoother infinite loop
  const infiniteImages = [...carouselImages, ...carouselImages, ...carouselImages];

  // Auto-advance carousel smoothly
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Seamless loop reset
  useEffect(() => {
    if (currentIndex === carouselImages.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 800);
      
      setTimeout(() => {
        setIsTransitioning(true);
      }, 850);
    }
  }, [currentIndex, carouselImages.length]);

  return (
    <div className="h-screen w-full relative overflow-hidden bg-white">
      {/* White border/padding - 10px on all sides */}
      <div className="absolute inset-0 p-[10px]">
        <div className="relative w-full h-full overflow-hidden">
          {/* Sliding Carousel */}
          <div className="absolute inset-0 overflow-hidden bg-black">
            <motion.div
              className="flex h-full will-change-transform"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ 
                type: "tween",
                ease: [0.4, 0.0, 0.2, 1],
                duration: isTransitioning ? 0.8 : 0
              }}
            >
              {infiniteImages.map((image, index) => (
                <div key={index} className="relative w-full h-full flex-shrink-0">
                  <Image
                    src={image}
                    alt={`Portfolio image ${(index % carouselImages.length) + 1}`}
                    fill
                    className="object-cover"
                    priority={index < 2}
                    quality={90}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Content Overlay - Centered */}
            {/* Content Overlay - Centered */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center px-6">
        {/* Main Tagline - Now in cursive */}
        <h2 className="font-['Dancing_Script'] text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight max-w-4xl font-normal">
          Finding beauty in every moment,
          <br />
          connecting through the lens.
        </h2>

        {/* Brand Title - Now below tagline */}
        <h1 className="text-base md:text-lg mb-10 font-light flex items-center gap-2">
          <span className="tracking-[0.3em]">STORIES</span>
          <span className="font-['Dancing_Script'] text-2xl md:text-3xl">♡</span>
          <span className="tracking-[0.3em]">BY MITHU ASHWIN</span>
        </h1>

        {/* Welcome Button */}
        <Link 
          href="/home"
          className="border-2 border-white text-white bg-transparent px-12 py-3 text-sm tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-300 font-light"
        >
          WELCOME
        </Link>
      </div>

      {/* Social Media Icons - Bottom Center */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-6 z-20">
        <a
          href="https://instagram.com/mithuashwin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors duration-300"
        >
          <Instagram size={20} />
        </a>
        <a
          href="https://facebook.com/mithuashwin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors duration-300"
        >
          <Facebook size={20} />
        </a>
        <a
          href="https://twitter.com/mithuashwin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors duration-300"
        >
          <Twitter size={20} />
        </a>
      </div>
        </div>
      </div>
    </div>
  );
}