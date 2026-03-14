'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook } from 'lucide-react';

interface GalleryImage {
  src: string;
  title: string;
  date: string;
  folderName: string;
}

export default function Library() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLibraryImages = async () => {
      try {
        setLoading(true);

        const summaryRes = await fetch('/api/event-summaries');
        const summaryData = await summaryRes.json();

        if (!summaryData.success) {
          setGalleryImages([]);
          return;
        }

        const libraryFolders = summaryData.events.filter((e: any) => e.metadata.addToLibrary);

        if (libraryFolders.length === 0) {
          setGalleryImages([]);
          return;
        }

        const allImages: GalleryImage[] = [];

        await Promise.all(
          libraryFolders.map(async (e: any) => {
            try {
              const imagesRes = await fetch(`/api/folder-images?folder=${encodeURIComponent(e.folderName)}`);
              if (!imagesRes.ok) return;
              const imagesData = await imagesRes.json();
              if (imagesData.success && imagesData.images.length > 0) {
                imagesData.images
                  .filter((img: any) => !img.publicId.includes('metadata'))
                  .forEach((img: any) => {
                    allImages.push({
                      src: img.url,
                      title: e.metadata.title,
                      date: e.metadata.date,
                      folderName: e.folderName,
                    });
                  });
              }
            } catch (error) {
              console.error(`Error fetching library images for ${e.folderName}:`, error);
            }
          })
        );

        setGalleryImages(allImages);
      } catch (error) {
        console.error('Error fetching library images:', error);
        setGalleryImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLibraryImages();
  }, []);

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
      <section className="pt-32 pb-10 px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-10"
          >
            <h1 className="font-playfair text-4xl md:text-6xl font-light tracking-wide mb-6">
              Library
            </h1>
            <p className="text-lg tracking-[0.2em] text-gray-600 mb-8">
              A CURATED COLLECTION OF FINEST WORK
            </p>
            <div className="w-24 h-px bg-black mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-20 px-4 md:px-8">
        <div className="max-w-screen-2xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-gray-600">Loading library...</div>
            </div>
          ) : galleryImages.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600">No images in library yet.</p>
            </div>
          ) : (
            /* True masonry: CSS columns with tight gap, images stack at natural height */
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4" style={{ columnGap: '6px' }}>
              {galleryImages.map((image, index) => (
                <motion.div
                  key={`${image.folderName}-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.03, 1) }}
                  className="group cursor-pointer break-inside-avoid"
                  style={{ marginBottom: '6px' }}
                  onClick={() => setSelectedImage(image.src)}
                >
                  <div className="relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-white">
                        <p className="text-sm font-light tracking-wide drop-shadow">{image.title}</p>
                        {image.date && (
                          <p className="text-xs tracking-[0.2em] opacity-80 drop-shadow">{image.date}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-6xl max-h-[95vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage}
                alt="Full size image"
                className="max-w-full max-h-[95vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
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