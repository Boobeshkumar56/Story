'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GalleryImage {
  src: string;
  title: string;
  date: string;
  folderName: string;
  category?: string;
}

export default function LibraryModal({ isOpen, onClose }: LibraryModalProps) {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<string | null>(null);

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      setGalleryImages([]);
      setLightbox(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const fetchLibraryImages = async () => {
      try {
        setLoading(true);

        const foldersRes = await fetch('/api/folders');
        const foldersData = await foldersRes.json();
        const folders: string[] = foldersData.success ? foldersData.folders : [];

        if (folders.length === 0) {
          setGalleryImages([]);
          setLoading(false);
          return;
        }

        const allImages: GalleryImage[] = [];

        await Promise.all(
          folders.map(async (folderName: string) => {
            try {
              const metadataRes = await fetch(`/api/metadata?folder=${encodeURIComponent(folderName)}`);
              if (!metadataRes.ok) return;
              const response = await metadataRes.json();
              const metadata = response.metadata;

              if (!metadata.addToLibrary) return;

              const imagesRes = await fetch(`/api/folder-images?folder=${encodeURIComponent(folderName)}`);
              if (!imagesRes.ok) return;
              const imagesData = await imagesRes.json();

              if (imagesData.images && imagesData.images.length > 0) {
                imagesData.images.forEach((imageObj: any) => {
                  const imageUrl = imageObj.url || imageObj.secure_url || imageObj;
                  if (imageUrl && typeof imageUrl === 'string' && imageUrl.trim()) {
                    allImages.push({
                      src: imageUrl,
                      title: metadata.title,
                      date: metadata.date,
                      folderName,
                      category: metadata.category || 'Event',
                    });
                  }
                });
              }
            } catch (error) {
              console.error(`Error fetching library images for ${folderName}:`, error);
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
  }, [isOpen]);

  // Close lightbox on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightbox) setLightbox(null);
        else onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white z-50 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between px-6 md:px-12 py-5 border-b border-gray-100">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col"
            >
              <span className="font-playfair text-black text-3xl md:text-4xl leading-none font-light tracking-widest">
                LIBRARY
              </span>
              {!loading && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-400 text-xs tracking-[0.25em] uppercase mt-1"
                >
                  {galleryImages.length} {galleryImages.length === 1 ? 'moment' : 'moments'} captured
                </motion.span>
              )}
            </motion.div>

            <motion.button
              onClick={onClose}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 rounded-full text-xs tracking-[0.2em] hover:bg-black hover:text-white hover:border-black transition-all duration-300"
            >
              <X size={14} />
              CLOSE
            </motion.button>
          </div>

          {/* Scrollable masonry gallery */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
            {loading ? (
              <div className="flex flex-col justify-center items-center h-full gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                  className="w-10 h-10 border-2 border-gray-200 border-t-black rounded-full"
                />
                <p className="text-gray-400 text-xs tracking-[0.3em] uppercase">Loading moments</p>
              </div>
            ) : galleryImages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-full gap-3"
              >
                <p className="text-gray-500 tracking-[0.2em] text-lg">THE LIBRARY IS EMPTY</p>
                <p className="text-sm text-gray-400 tracking-widest">Check back soon</p>
              </motion.div>
            ) : (
              /* Tight 4-column masonry — images at natural aspect ratio */
              <div
                className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5"
                style={{ columnGap: '6px' }}
              >
                {galleryImages.map((image, index) => (
                  <motion.div
                    key={`${image.folderName}-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.02, 0.8) }}
                    className="group cursor-pointer break-inside-avoid"
                    style={{ marginBottom: '6px' }}
                    onClick={() => setLightbox(image.src)}
                  >
                    <div className="relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300" />
                      <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-xs font-light tracking-wide drop-shadow truncate">
                          {image.title}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {lightbox && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4"
                onClick={() => setLightbox(null)}
              >
                <motion.div
                  initial={{ scale: 0.88, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.88, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={lightbox}
                    alt="Full size"
                    className="max-w-[92vw] max-h-[92vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                  />
                  <button
                    onClick={() => setLightbox(null)}
                    className="absolute -top-12 right-0 text-white/80 hover:text-white text-xs tracking-[0.3em] transition-colors"
                  >
                    CLOSE
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
