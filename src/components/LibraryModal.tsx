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
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [currentGalleryKey, setCurrentGalleryKey] = useState(0);
  
  const categories = ['All', 'Wedding', 'Pre-Wedding', 'Portrait', 'Event', 'Birthday'];

  // Increment gallery key when modal opens to force fresh WebGL context
  useEffect(() => {
    if (isOpen) {
      galleryKey++;
      setCurrentGalleryKey(galleryKey);
    } else {
      // Reset states when modal closes to free memory
      setGalleryImages([]);
      setFilteredImages([]);
      setSearchQuery('');
      setSelectedCategory('All');
    }
  }, [isOpen]);

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
        setFilteredImages(allImages);
      } catch (error) {
        console.error('Error fetching library images:', error);
        setGalleryImages([]); // Show empty state on error
        setFilteredImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLibraryImages();
  }, [isOpen]); // Re-fetch when modal opens

  // Filter images based on search and category
  useEffect(() => {
    let filtered = [...galleryImages];

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(img => img.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(img => 
        img.title.toLowerCase().includes(query) ||
        img.folderName.toLowerCase().includes(query) ||
        img.category?.toLowerCase().includes(query)
      );
    }

    setFilteredImages(filtered);
  }, [searchQuery, selectedCategory, galleryImages]);

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
            {/* Header - Fixed at top with filters */}
            <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
              <div className="px-6 md:px-12 py-4">
                {/* Single row: Close, Dropdown, and Search */}
                <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                  {/* Left side: Close button and Category Dropdown */}
                  <div className="flex items-center gap-4">
                    <motion.button
                      onClick={onClose}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm tracking-wide hover:bg-gray-800 transition-all"
                    >
                      <X size={18} />
                      CLOSE
                    </motion.button>

                    {/* Category Dropdown */}
                    <motion.div 
                      className="relative"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <button
                        type="button"
                        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                        className="inline-flex items-center justify-between min-w-[140px] text-gray-900 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none transition-all whitespace-nowrap"
                      >
                        {selectedCategory}
                        <svg className="w-4 h-4 ms-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isCategoryOpen && (
                        <div className="absolute z-50 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg min-w-[140px]">
                          <ul className="p-2 text-sm text-gray-700 font-medium">
                            {categories.map(cat => (
                              <li key={cat}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedCategory(cat);
                                    setIsCategoryOpen(false);
                                  }}
                                  className="inline-flex items-center w-full p-2 hover:bg-gray-100 hover:text-gray-900 rounded transition-colors text-left whitespace-nowrap"
                                >
                                  {cat}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Right side: Search Input */}
                  <motion.div 
                    className="relative w-full md:w-80"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 pl-10 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all"
                    />
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {searchQuery && (
                      <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                      >
                        <X size={16} />
                      </motion.button>
                    )}
                  </motion.div>
                </div>

                {/* Results count */}
                <motion.p 
                  className="text-sm text-gray-500 mt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {filteredImages.length} {filteredImages.length === 1 ? 'image' : 'images'} found
                </motion.p>
              </div>
            </div>

            {/* 3D Gallery Section */}
            <section className="h-[calc(100vh-140px)] w-full bg-white">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full"
                  />
                </div>
              ) : filteredImages.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full"
                >
                  <p className="text-gray-600 tracking-[0.2em] text-lg mb-2">NO IMAGES FOUND</p>
                  <p className="text-sm text-gray-400">Try adjusting your search or filter</p>
                </motion.div>
              ) : (
                <InfiniteGallery 
                  key={currentGalleryKey}
                  images={filteredImages.map(img => img.src)}
                  className="w-full h-full"
                  speed={1}
                  visibleCount={Math.min(filteredImages.length, 8)}
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
