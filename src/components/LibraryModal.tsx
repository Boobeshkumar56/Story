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

interface GalleryImageExtended extends GalleryImage {
  category?: string;
}

export default function LibraryModal({ isOpen, onClose }: LibraryModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImageExtended[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImageExtended[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = ['All', 'Wedding', 'Pre-Wedding', 'Portrait', 'Event', 'Birthday'];

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
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all cursor-pointer hover:border-gray-400 [&>option]:py-2 [&>option]:px-4 [&>option]:bg-white [&>option]:text-black [&>option]:hover:bg-gray-100"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat} className="py-2 px-4 hover:bg-gray-100">{cat}</option>
                        ))}
                      </select>
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
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
                    className="text-center py-20"
                  >
                    <p className="text-gray-600 tracking-[0.2em] text-lg mb-2">NO IMAGES FOUND</p>
                    <p className="text-sm text-gray-400">Try adjusting your search or filter</p>
                  </motion.div>
                ) : (
                  <motion.div
                    layout
                    className="columns-1 sm:columns-2 gap-6"
                  >
                    <AnimatePresence mode="popLayout">
                      {filteredImages.map((image, index) => (
                        <motion.div
                          key={`${image.folderName}-${index}`}
                          layout
                          initial={{ opacity: 0, scale: 0.8, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: -20 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: index * 0.05,
                            layout: { duration: 0.3 }
                          }}
                          whileHover={{ scale: 1.02, y: -4 }}
                          className="group cursor-pointer mb-6 break-inside-avoid rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500"
                          onClick={() => setSelectedImage(image.src)}
                        >
                          <div className="relative overflow-hidden bg-gray-100">
                            <Image
                              src={image.src}
                              alt={image.title}
                              width={400}
                              height={600}
                              className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                            />
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                            <motion.div 
                              className="absolute inset-0 flex flex-col justify-end p-6"
                              initial={{ opacity: 0, y: 20 }}
                              whileHover={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="text-white">
                                <h3 className="font-allura text-2xl mb-1">{image.title}</h3>
                                <div className="flex items-center gap-3 text-xs">
                                  {image.category && (
                                    <span className="px-2 py-1 bg-white/20 rounded tracking-wide">{image.category}</span>
                                  )}
                                  <span className="tracking-[0.2em] opacity-80">{image.date}</span>
                                </div>
                              </div>
                            </motion.div>
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
