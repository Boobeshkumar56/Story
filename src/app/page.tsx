'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

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

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col text-white text-center px-6">
        {/* Brand Title - At Top */}
        <div className="pt-15 md:pt-35">
          <h1 className="text-sm md:text-base font-bold flex items-center justify-center gap-2">
            <span className="tracking-[0.3em]">STORIES</span>
            <span className="font-dancing text-xl md:text-2xl">♡</span>
            <span className="tracking-[0.3em]">BY MITHU ASHWIN</span>
          </h1>
        </div>

        {/* Main Content - Centered */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Main Tagline - in cursive */}
          <h2 className="font-dancing text-2xl md:text-3xl lg:text-4xl mb-8 leading-tight max-w-4xl">
            Finding beauty in every moment,
            <br />
            connecting through the lens.
          </h2>

          {/* Welcome Button */}
          <Link 
            href="/home"
            className="border-2 border-white text-white bg-transparent px-12 py-3 text-sm tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-300 font-light"
          >
            WELCOME
          </Link>
        </div>

        {/* Social Media Icons - Bottom Center */}
        <div className="pb-8">
          <a
            href="https://www.instagram.com/one_way_art_studio?igsh=aGR1b3lsNTNjc3Ay"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors duration-300 inline-block"
          >
            <Instagram size={30} />
          </a>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}