'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
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
}

export default function LibraryModal({ isOpen, onClose }: LibraryModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return; // Only fetch when modal is opened
    
    const fetchLibraryImages = async () => {
      try {
        setLoading(true);
        
        // Get all event folders from localStorage
        const folders = JSON.parse(localStorage.getItem('eventFolders') || '[]');
        console.log('Library - Folders from localStorage:', folders);
        
        if (folders.length === 0) {
          // No folders, show empty state
          console.log('Library - No folders found');
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
                      folderName: folderName
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
          className="fixed inset-0 bg-white z-50 overflow-y-auto"
        >
          <div className="min-h-screen">
            {/* Close Button - Fixed at top */}
            <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
              <div className="px-8 md:px-12 py-6 flex justify-between items-center">
                <h2 className="text-2xl font-light tracking-[0.2em]">LIBRARY</h2>
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 text-sm tracking-[0.2em] hover:opacity-60 transition-opacity"
                >
                  <X size={20} />
                  CLOSE
                </button>
              </div>
            </div>

            {/* Header */}
            <section className="pt-16 pb-12 px-8 md:px-12">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="text-center mb-12"
                >
                  <p className="text-lg tracking-[0.2em] text-gray-600 mb-8">
                    A CURATED COLLECTION OF FINEST WORK
                  </p>
                  <div className="w-24 h-px bg-black mx-auto"></div>
                </motion.div>
              </div>
            </section>

            {/* Gallery Grid */}
            <section className="pb-20 px-8 md:px-12">
              <div className="max-w-7xl mx-auto">
                {loading ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="text-gray-600">Loading library...</div>
                  </div>
                ) : galleryImages.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-gray-600 tracking-[0.2em]">NO IMAGES IN LIBRARY YET</p>
                    <p className="text-sm text-gray-400 mt-4">Upload images through the admin panel and check "Add to Library"</p>
                  </div>
                ) : (
                  <motion.div
                    layout
                    className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6"
                  >
                    <AnimatePresence>
                      {galleryImages.map((image, index) => (
                        <motion.div
                          key={`${image.folderName}-${index}`}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          className="group cursor-pointer mb-6 break-inside-avoid"
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
                                <p className="text-xs tracking-[0.2em] opacity-80">{image.date}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>
            </section>

            {/* Lightbox for enlarged images */}
            <AnimatePresence>
              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-8"
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
                      className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors text-sm tracking-[0.2em] flex items-center gap-2"
                    >
                      <X size={16} />
                      CLOSE
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
