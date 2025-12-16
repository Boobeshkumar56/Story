'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Eye, Calendar, Award, MapPin, MessageCircle } from 'lucide-react';

export default function Blogs() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      
      // Get list of folders from localStorage (tracking which folders exist)
      const eventFolders = JSON.parse(localStorage.getItem('eventFolders') || '[]');
      
      if (eventFolders.length === 0) {
        // Show demo data if no events exist
        setBlogPosts([
          {
            id: '1',
            folderName: 'demo-wedding',
            title: 'Demo Wedding Event',
            excerpt: 'Upload your first event from the admin panel',
            coverImage: 'https://picsum.photos/800/600?random=101',
            category: 'Wedding',
            date: '2024-01-15',
            likes: 0,
            views: 0
          }
        ]);
        setLoading(false);
        return;
      }

      // Fetch metadata for each folder
      const blogsData = await Promise.all(
        eventFolders.map(async (folderName: string) => {
          try {
            const response = await fetch(`/api/metadata?folder=${folderName}`);
            const result = await response.json();
            
            if (result.success && result.metadata.addToBlogs) {
              return {
                id: folderName,
                folderName: folderName,
                ...result.metadata
              };
            }
            return null;
          } catch (error) {
            console.error(`Error loading folder ${folderName}:`, error);
            return null;
          }
        })
      );

      // Filter out null values and set blogs
      const validBlogs = blogsData.filter(blog => blog !== null);
      setBlogPosts(validBlogs);
    } catch (error) {
      console.error('Error loading blogs:', error);
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white pt-20">
      {/* Header with elegant design */}
      <section className="pt-20 pb-16 px-8 md:px-12 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 opacity-60"></div>
          <motion.div 
            className="absolute inset-0 opacity-5"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{
              backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="font-dancing text-5xl md:text-6xl mb-6 text-black">
                Our Stories
              </h1>
              <motion.div 
                className="w-32 h-px bg-black mx-auto"
                initial={{ width: 0 }}
                animate={{ width: 128 }}
                transition={{ duration: 1, delay: 0.5 }}
              ></motion.div>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed tracking-wide"
            >
              Moments of love, laughter, and happily ever after captured forever
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid with masonry-style layout */}
      <section className="pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
              <p className="mt-4 text-gray-600">Loading events...</p>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No events uploaded yet.</p>
              <p className="text-gray-500 mt-2">Upload your first event from the admin panel.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => {
              
              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.7, 
                    delay: index * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="bg-white rounded-lg overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-lg"
                >
                  <Link href={`/blogs/${post.id}`} className="block relative">
                    <div className="aspect-[4/5] relative overflow-hidden bg-gray-100">
                      <Image
                        src={post.coverImage || post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      
                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                        <span className="text-xs tracking-[0.3em] text-gray-200 mb-2 block font-medium">
                          {post.category.toUpperCase()}
                        </span>
                        
                        <h3 className="font-dancing text-2xl md:text-3xl mb-2 leading-tight">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-200 text-sm mb-3 line-clamp-2 font-light leading-relaxed">
                          {post.excerpt}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-xs text-gray-300">
                          <span className="flex items-center gap-2">
                            <Heart size={16} />
                            {post.likes || 0}
                          </span>
                          <span className="flex items-center gap-2">
                            <Eye size={16} />
                            {post.views || 0}
                          </span>
                          <span className="flex items-center gap-2">
                            <Calendar size={16} />
                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
          )}
        </div>
      </section>

      {/* About the Author Section - Creative Design */}
      <section className="relative py-20 px-4 md:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-extralight tracking-[0.2em] text-black mb-3">
              THE MAN BEHIND THE CAMERA - MITHU
            </h2>
          </motion.div>

          {/* Photo and About Text Layout - 2 Overlapped Images */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12 items-start">
            {/* Two Overlapped Diagonal Photos - Takes 2 columns */}
            <div className="lg:col-span-2 relative h-80">
              <motion.div
                initial={{ opacity: 0, rotate: -5 }}
                whileInView={{ opacity: 1, rotate: -5 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="absolute top-0 left-0 bg-white p-2 shadow-xl w-60 z-10"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=600&fit=crop"
                    alt="Mithu Ashwin"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, rotate: 5 }}
                whileInView={{ opacity: 1, rotate: 5 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="absolute top-10 left-48 bg-white p-2 shadow-xl w-60"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400&h=600&fit=crop"
                    alt="Photography"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>

            {/* About Text with Icons - Takes 3 columns */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-3 space-y-4"
            >
              <div>
                <h3 className="text-3xl mb-4 text-gray-800" style={{ fontFamily: 'var(--font-dancing), cursive', fontWeight: '400' }}>Hello everyone, this is Mithu</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  I&apos;m a passionate photographer based in the beautiful hills of Coonoor, Nilgiris. 
                  My journey with photography began in 2013, and since then, I&apos;ve been capturing 
                  life&apos;s most precious moments.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  I believe every moment has a story to tell, and through my lens, I try to preserve 
                  those fleeting emotions and memories that make life beautiful. From intimate weddings 
                  to candid portraits, each shoot is a new adventure.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">
                  When I&apos;m not behind the camera, you&apos;ll find me exploring the misty hills of 
                  Nilgiris, always searching for that perfect light and moment to capture.
                </p>

                {/* Icons Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
                    <div>
                      <p className="text-lg font-light text-black">2013</p>
                      <p className="text-[10px] text-gray-600 uppercase tracking-wider">Journey Started</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
                    <div>
                      <p className="text-lg font-light text-black">150+</p>
                      <p className="text-[10px] text-gray-600 uppercase tracking-wider">Events Captured</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
                    <div>
                      <p className="text-lg font-light text-black">Coonoor</p>
                      <p className="text-[10px] text-gray-600 uppercase tracking-wider">Based In</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" strokeWidth={1.5} />
                    <div>
                      <p className="text-3xl font-normal text-black">∞</p>
                      <p className="text-[10px] text-gray-600 uppercase tracking-wider">Memories Created</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Modern Separator */}
          <div className="flex items-center justify-center my-16">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div className="mx-6">
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          {/* One Way Art Studio Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 p-8"
          >
            {/* One Way Logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="/logo.png"
                alt="One Way Art Studio Logo"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
            
            <h3 className="text-2xl mb-3 text-black" style={{ fontFamily: 'var(--font-dancing), cursive', fontWeight: '400' }}>One Way Art Studio</h3>
            <p className="text-base text-gray-600 mb-3">Est. 2018</p>
            <p className="text-sm text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Dedicated to capturing the essence of your special moments through exceptional photography and videography. 
              Every frame tells a story, every moment becomes a cherished memory.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-gray-600 mb-8 text-lg font-light max-w-2xl mx-auto">
              Ready to capture your story? Let&apos;s create something beautiful together
            </p>
            <Link
              href="/book-us"
              className="inline-flex items-center gap-3 bg-black text-white border-2 border-black px-12 py-4 text-sm tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              BOOK A SESSION
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

