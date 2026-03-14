'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselImage {
  src: string;
  title: string;
  location: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const total = images.length;

  // Triple the images for seamless infinite loop (same as welcome page)
  const loopImages = [...images, ...images, ...images];
  // Start in the middle set
  const offset = total;
  const [stripIndex, setStripIndex] = useState(offset);

  const handleNext = () => {
    setIsTransitioning(true);
    setStripIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setIsTransitioning(true);
    setStripIndex((prev) => prev - 1);
  };

  const handleDotClick = (index: number) => {
    setIsTransitioning(true);
    setStripIndex(offset + index);
  };

  // Keep logical currentIndex in sync
  useEffect(() => {
    setCurrentIndex(((stripIndex - offset) % total + total) % total);
  }, [stripIndex, offset, total]);

  // Seamless loop reset — same technique as welcome page
  useEffect(() => {
    if (stripIndex >= offset + total) {
      const next = stripIndex - total;
      setTimeout(() => {
        setIsTransitioning(false);
        setStripIndex(next);
      }, 800);
      setTimeout(() => setIsTransitioning(true), 850);
    } else if (stripIndex < offset) {
      const next = stripIndex + total;
      setTimeout(() => {
        setIsTransitioning(false);
        setStripIndex(next);
      }, 800);
      setTimeout(() => setIsTransitioning(true), 850);
    }
  }, [stripIndex, offset, total]);

  // Auto-advance every 4 seconds
  useEffect(() => {
    if (total <= 1) return;
    const interval = setInterval(handleNext, 4000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">No images to display</p>
      </div>
    );
  }

  return (
    <motion.div
      className="relative w-full px-6 md:px-12 lg:px-16"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Main Carousel — sharp edges, horizontal strip slide */}
      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-black">
        {/* Sliding strip */}
        <motion.div
          className="flex h-full will-change-transform"
          animate={{ x: `-${stripIndex * 100}%` }}
          transition={{
            type: 'tween',
            ease: [0.4, 0.0, 0.2, 1],
            duration: isTransitioning ? 0.8 : 0,
          }}
        >
          {loopImages.map((image, index) => (
            <div key={index} className="relative w-full h-full flex-shrink-0">
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover"
                priority={index === stripIndex}
                quality={90}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          ))}
        </motion.div>

        {/* Navigation Arrows */}
        <motion.button
          onClick={handlePrevious}
          whileHover={{ scale: 1.2, x: -4 }}
          whileTap={{ scale: 0.9 }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 text-white drop-shadow-lg hover:drop-shadow-2xl transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-10 h-10 md:w-12 md:h-12" strokeWidth={2.5} />
        </motion.button>

        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.2, x: 4 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 text-white drop-shadow-lg hover:drop-shadow-2xl transition-all"
          aria-label="Next image"
        >
          <ChevronRight className="w-10 h-10 md:w-12 md:h-12" strokeWidth={2.5} />
        </motion.button>

        {/* Title / location overlay at the bottom */}
        <motion.div
          key={`info-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
          className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10 bg-gradient-to-t from-black/80 to-transparent"
        >
          <div className="max-w-7xl mx-auto">
            <h3 className="font-playfair text-3xl md:text-4xl text-white mb-2 font-light tracking-wide">
              {images[currentIndex].title}
            </h3>
            <p className="text-white/90 text-base md:text-lg font-light tracking-wider">
              {images[currentIndex].location}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Thumbnail Strip */}
      <div className="relative bg-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 md:gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 justify-center">
            {images.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`relative flex-shrink-0 w-24 h-16 md:w-32 md:h-20 overflow-hidden snap-center transition-all duration-300 ${index === currentIndex
                  ? 'ring-2 ring-black scale-105'
                  : 'opacity-60 hover:opacity-100'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={image.src}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 96px, 128px"
                />
                {index === currentIndex && (
                  <div className="absolute inset-0 border-2 border-black" />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 py-4 bg-white">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-1 transition-all duration-300 ${index === currentIndex
              ? 'w-8 bg-black'
              : 'w-1 bg-gray-300 hover:bg-gray-400'
              }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
