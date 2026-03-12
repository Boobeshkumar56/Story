'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import dynamic from 'next/dynamic';

const InfiniteGallery = dynamic(() => import('./InfiniteGallery'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center">Loading gallery...</div>
});

// Key to force remount of gallery when modal opens/closes
let galleryKey = 0;

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
  const [currentGalleryKey, setCurrentGalleryKey] = useState(0);

  // Increment gallery key when modal opens to force fresh WebGL context
  useEffect(() => {
    if (isOpen) {
      galleryKey++;
      setCurrentGalleryKey(galleryKey);
    } else {
      // Reset states when modal closes to free memory
      setGalleryImages([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return; // Only fetch when modal is opened
    
    const fetchLibraryImages = async () => {
      try {
        setLoading(true);
        
        // Get all event folders from Cloudinary (works on all devices)
        const foldersRes = await fetch('/api/folders');
        const foldersData = await foldersRes.json();
        const folders: string[] = foldersData.success ? foldersData.folders : [];
        
        if (folders.length === 0) {
          // No folders, show empty state
          setGalleryImages([]);
          setLoading(false);
          return;
        }
        
        // Fetch metadata and images for each folder
        const allImages: GalleryImage[] = [];
        
        await Promise.all(
          folders.map(async (folderName: string) => {
            try {
              const metadataRes = await fetch(`/api/metadata?folder=${encodeURIComponent(folderName)}`);
              if (!metadataRes.ok) {
                console.log(`Library - Failed to fetch metadata for ${folderName}`);
                return;
              }
              
              const response = await metadataRes.json();
              const metadata = response.metadata; // Extract metadata from response
              console.log(`Library - Metadata for ${folderName}:`, metadata);
              console.log(`Library - addToLibrary flag:`, metadata.addToLibrary);
              
              // Only include if addToLibrary is true
              if (!metadata.addToLibrary) {
                console.log(`Library - Skipping ${folderName} (addToLibrary is false)`);
                return;
              }
              
              // Fetch all images from the folder
              const imagesRes = await fetch(`/api/folder-images?folder=${encodeURIComponent(folderName)}`);
              if (!imagesRes.ok) {
                console.log(`Library - Failed to fetch images for ${folderName}`);
                return;
              }
              
              const imagesData = await imagesRes.json();
              console.log(`Library - Raw images response for ${folderName}:`, imagesData);
              console.log(`Library - Images array:`, imagesData.images);
              
              // Add all images from this folder to the gallery (only real Cloudinary images)
              // The API returns an array of objects with 'url' property
              if (imagesData.images && imagesData.images.length > 0) {
                imagesData.images.forEach((imageObj: any, idx: number) => {
                  console.log(`Library - Image ${idx}:`, imageObj);
                  // Extract URL from the image object
                  const imageUrl = imageObj.url || imageObj.secure_url || imageObj;
                  console.log(`Library - Extracted URL ${idx}:`, imageUrl);
                  if (imageUrl && typeof imageUrl === 'string' && imageUrl.trim()) {
                    allImages.push({
                      src: imageUrl,
                      title: metadata.title,
                      date: metadata.date,
                      folderName: folderName,
                      category: metadata.category || 'Event'
                    });
                  } else {
                    console.warn(`Library - Skipped invalid image URL at index ${idx}`);
                  }
                });
              }
            } catch (error) {
              console.error(`Error fetching library images for ${folderName}:`, error);
            }
          })
        );
        
        console.log('Library - All images collected:', allImages);
        // Only set real Cloudinary images, no mock data
        setGalleryImages(allImages);
      } catch (error) {
        console.error('Error fetching library images:', error);
        setGalleryImages([]); // Show empty state on error
      } finally {
        setLoading(false);
      }
    };

    fetchLibraryImages();
  }, [isOpen]); // Re-fetch when modal opens

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white z-50 overflow-hidden"
        >
          <div className="h-screen flex flex-col">
            {/* Header */}
            <div className="relative z-50 flex items-center justify-between px-6 md:px-12 py-5 border-b border-gray-100">
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col"
              >
                <span className="font-dancing text-black text-4xl md:text-5xl leading-none">
                  Library
                </span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="block h-px bg-black/20 mt-1"
                />
                {!loading && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-gray-400 text-xs tracking-[0.25em] uppercase mt-1"
                  >
                    {galleryImages.length} {galleryImages.length === 1 ? 'moment' : 'moments'} captured
                  </motion.span>
                )}
              </motion.div>

              {/* Close button */}
              <motion.button
                onClick={onClose}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 rounded-full text-xs tracking-[0.2em] hover:bg-black hover:text-white hover:border-black transition-all duration-300"
              >
                <X size={14} />
                CLOSE
              </motion.button>
            </div>

            {/* 3D Gallery Section — fill remaining height */}
            <section className="flex-1 w-full min-h-0">
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
                <InfiniteGallery
                  key={currentGalleryKey}
                  images={galleryImages.slice(0, 30).map(img => img.src)}
                  className="w-full h-full"
                  speed={1}
                  visibleCount={10}
                  fadeSettings={{
                    fadeIn: { start: 0.05, end: 0.25 },
                    fadeOut: { start: 0.4, end: 0.43 }
                  }}
                  blurSettings={{
                    blurIn: { start: 0.0, end: 0.1 },
                    blurOut: { start: 0.4, end: 0.43 },
                    maxBlur: 8.0
                  }}
                />
              )}
            </section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
