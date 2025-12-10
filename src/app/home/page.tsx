'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Camera, Image as ImageIcon, Aperture, Focus } from 'lucide-react';
import LibraryModal from '@/components/LibraryModal';

interface RecentWork {
  src: string;
  title: string;
  location: string;
}

export default function Home() {
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [recentWorks, setRecentWorks] = useState<RecentWork[]>([]);
  
  // Mock data as fallback
  const mockWorks: RecentWork[] = [
    { src: 'https://picsum.photos/1200/800?random=1', title: 'PORTRAIT SESSION', location: 'Coonoor, 2024' },
    { src: 'https://picsum.photos/800/1200?random=2', title: 'WEDDING DAY', location: 'Ooty, 2024' },
    { src: 'https://picsum.photos/800/600?random=3', title: 'PRE-WEDDING SHOOT', location: 'Nilgiris, 2024' },
    { src: 'https://picsum.photos/800/600?random=4', title: 'ENGAGEMENT', location: 'Coimbatore, 2024' },
    { src: 'https://picsum.photos/800/1200?random=5', title: 'RECEPTION', location: 'Kerala, 2024' },
    { src: 'https://picsum.photos/1200/800?random=6', title: 'CANDID MOMENTS', location: 'Chennai, 2024' },
    { src: 'https://picsum.photos/1200/800?random=7', title: 'FAMILY PORTRAITS', location: 'Bangalore, 2024' },
  ];

  useEffect(() => {
    const fetchRecentWorks = async () => {
      try {
        // Get all event folders from localStorage
        const folders = JSON.parse(localStorage.getItem('eventFolders') || '[]');
        console.log('Recent Works - Folders from localStorage:', folders);
        
        if (folders.length === 0) {
          // No Cloudinary data, use mock data
          console.log('Recent Works - No folders, using mock data');
          setRecentWorks(mockWorks);
          return;
        }
        
        // Fetch metadata for each folder
        const worksData = await Promise.all(
          folders.map(async (folderName: string) => {
            try {
              const metadataRes = await fetch(`/api/metadata?folder=${encodeURIComponent(folderName)}`);
              if (!metadataRes.ok) {
                console.log(`Recent Works - Failed to fetch metadata for ${folderName}`);
                return null;
              }
              
              const response = await metadataRes.json();
              const metadata = response.metadata; // Extract metadata from response
              console.log(`Recent Works - Metadata for ${folderName}:`, metadata);
              console.log(`Recent Works - addToRecentWorks flag:`, metadata.addToRecentWorks);
              
              // Only include if addToRecentWorks is true
              if (!metadata.addToRecentWorks) {
                console.log(`Recent Works - Skipping ${folderName} (addToRecentWorks is false)`);
                return null;
              }
              
              return {
                src: metadata.coverImage, // Use coverImage from metadata
                title: metadata.title.toUpperCase(),
                location: metadata.date
              };
            } catch (error) {
              console.error(`Error fetching work ${folderName}:`, error);
              return null;
            }
          })
        );
        
        // Filter out null values
        const validWorks = worksData.filter((w): w is RecentWork => w !== null);
        console.log('Recent Works - Valid Cloudinary works:', validWorks);
        
        // If we have Cloudinary works, pad with mock data if needed to reach 7 items
        if (validWorks.length > 0) {
          const totalNeeded = 7;
          const remaining = totalNeeded - validWorks.length;
          if (remaining > 0) {
            // Add mock data to fill up to 7 items
            const finalWorks = [...validWorks, ...mockWorks.slice(0, remaining)];
            console.log('Recent Works - Padded with mock data:', finalWorks);
            setRecentWorks(finalWorks);
          } else {
            // Use only Cloudinary data (take first 7 if more)
            const finalWorks = validWorks.slice(0, 7);
            console.log('Recent Works - Using Cloudinary data only:', finalWorks);
            setRecentWorks(finalWorks);
          }
        } else {
          // No valid Cloudinary works, use all mock
          console.log('Recent Works - No valid works, using all mock data');
          setRecentWorks(mockWorks);
        }
      } catch (error) {
        console.error('Error fetching recent works:', error);
        setRecentWorks(mockWorks); // Fallback to mock on error
      }
    };

    fetchRecentWorks();
  }, []);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="py-20 px-8 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          {/* Featured Recognition */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-6 tracking-wide">
              Stories of Love, Laughter & Happily Ever After
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 max-w-3xl mx-auto">
              Creating exquisite visual stories rooted in heart, emotion, and the beauty of every moment.
            </p>
          </motion.div>

          {/* Travel Illustration Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-20"
          >
            <div className="relative w-full max-w-2xl mx-auto">
              <Image
                src="/image3.webp"
                alt="Travel & Photography - Capturing Moments Around the World"
                width={800}
                height={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mb-20"
          >
              <h3 className="text-2xl md:text-3xl font-light mb-3">
              Over 150+ Brides &amp; Grooms
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              In 5 States Around India
            </p>
            <p className="text-base text-gray-700 max-w-2xl mx-auto leading-relaxed">
              From the hills of Nilgiris to destinations across South India, 
              we capture your unique story wherever it unfolds.
            </p>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Link
              href="/book-us"
              className="inline-block bg-black text-white px-12 py-4 text-sm tracking-[0.3em] hover:bg-gray-800 transition-all duration-300"
            >
              BOOK US NOW
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Recent Works Section */}
      <section className="py-20 px-8 md:px-12 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-extralight mb-6 tracking-widest leading-tight">
              RECENT WORK
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light tracking-wide">
              A curated selection of our latest photography sessions
            </p>
          </motion.div>

          {/* Recent Works Grid - Asymmetric Layout with 6 images */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[200px] gap-1">
              {recentWorks.map((work, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative overflow-hidden cursor-pointer group
                    ${index === 0 ? 'md:col-span-4 md:row-span-2' : ''} 
                    ${index === 1 ? 'md:col-span-2 md:row-span-2' : ''}
                    ${index === 2 ? 'md:col-span-2 md:row-span-1' : ''}
                    ${index === 3 ? 'md:col-span-2 md:row-span-1' : ''}
                    ${index === 4 ? 'md:col-span-2 md:row-span-2' : ''}
                    ${index === 5 ? 'md:col-span-3 md:row-span-2' : ''}
                    ${index === 6 ? 'md:col-span-3 md:row-span-2' : ''}
                  `}
                >
                  <Image
                    src={work.src}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500" />
                  <div className="absolute bottom-6 left-6 text-white z-10">
                    <h4 className="text-xl font-light tracking-wide mb-2">{work.title}</h4>
                    <p className="text-gray-300 font-light">{work.location}</p>
                  </div>
                </motion.div>
              ))}




            </div>

            {/* Floating Camera Icons */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-10 right-10 text-gray-600 opacity-20 pointer-events-none hidden md:block"
            >
              <Camera size={48} />
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, 15, 0],
                rotate: [0, -8, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute bottom-20 left-10 text-gray-600 opacity-15 pointer-events-none hidden md:block"
            >
              <ImageIcon size={40} />
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, -12, 0],
                x: [0, 10, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute top-1/2 left-1/4 text-gray-600 opacity-10 pointer-events-none hidden md:block"
            >
              <Aperture size={36} />
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, 18, 0],
                rotate: [0, 10, 0]
              }}
              transition={{ 
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute top-1/3 right-1/4 text-gray-600 opacity-12 pointer-events-none hidden md:block"
            >
              <Focus size={44} />
            </motion.div>
          </motion.div>

          {/* Show Library Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <button
              onClick={() => setIsLibraryOpen(true)}
              className="inline-block px-12 py-4 border border-gray-600 text-white font-light tracking-widest hover:bg-white hover:text-black transition-all duration-500"
            >
              SHOW LIBRARY
            </button>
          </motion.div>
        </div>
      </section>

      {/* Library Modal */}
      <LibraryModal isOpen={isLibraryOpen} onClose={() => setIsLibraryOpen(false)} />

      {/* Contact Section */}
      <section className="py-16 px-8 md:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Let&apos;s Create Together
            </h2>
            <p className="text-base text-gray-600 mb-8 max-w-2xl mx-auto">
              Ready to capture your precious moments? Get in touch.
            </p>
            <Link
              href="/book-us"
              className="inline-block border border-black px-12 py-4 text-sm tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300"
            >
              GET IN TOUCH
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 md:px-12 bg-white border-t border-gray-200">
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