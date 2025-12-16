'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    hiddenRight: {
      x: '100%',
      opacity: 0,
    },
    hiddenLeft: {
      x: '-100%',
      opacity: 0,
    },
    visible: {
      x: '0',
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (images.length <= 1) return; // Don't auto-advance if only one or no images
    
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 === images.length ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  // Safety check for empty images array - must be after all hooks
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
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Main Carousel */}
      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-2xl">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial={direction > 0 ? 'hiddenRight' : 'hiddenLeft'}
            animate="visible"
            exit="exit"
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].title}
              fill
              className="object-cover"
              priority
              quality={90}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows - Simple icons only */}
        <motion.button
          onClick={handlePrevious}
          whileHover={{ scale: 1.2, x: -5 }}
          whileTap={{ scale: 0.9 }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 text-white drop-shadow-lg hover:drop-shadow-2xl transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-10 h-10 md:w-12 md:h-12" strokeWidth={2.5} />
        </motion.button>
        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.2, x: 5 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 text-white drop-shadow-lg hover:drop-shadow-2xl transition-all"
          aria-label="Next image"
        >
          <ChevronRight className="w-10 h-10 md:w-12 md:h-12" strokeWidth={2.5} />
        </motion.button>

        {/* Image Info Overlay with enhanced animations */}
        <motion.div
          key={`info-${currentIndex}`}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10 bg-gradient-to-t from-black/80 to-transparent"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h3 
              className="font-allura text-4xl md:text-5xl text-white mb-3"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {images[currentIndex].title}
            </motion.h3>
            <motion.p 
              className="text-white/90 text-base md:text-lg font-light tracking-wider"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {images[currentIndex].location}
            </motion.p>
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
                className={`relative flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded overflow-hidden snap-center transition-all duration-300 ${
                  index === currentIndex
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

      {/* Progress Indicators */}
      <div className="flex justify-center gap-2 py-4 bg-white">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex
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
