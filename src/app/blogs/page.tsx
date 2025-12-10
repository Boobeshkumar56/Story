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
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <section className="pt-12 pb-16 px-8 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-extralight tracking-[0.2em] mb-6">
              CAPTURED MOMENTS
            </h1>
            <p className="text-lg text-gray-600 font-light">
              Explore our latest photography projects and client celebrations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid - Uniform Grid System */}
      {/* Blog Grid */}
      <section className="pb-20 px-4 md:px-6">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {blogPosts.map((post, index) => {
              
              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredId(post.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="aspect-[4/5] bg-gray-800 relative overflow-hidden cursor-pointer group"
                >
                  <Link href={`/blogs/${post.id}`}>
                    <Image
                      src={post.coverImage || post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Corner Borders on Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      {/* Top Left Corner */}
                      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white"></div>
                      {/* Top Right Corner */}
                      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white"></div>
                      {/* Bottom Left Corner */}
                      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white"></div>
                      {/* Bottom Right Corner */}
                      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white"></div>
                    </div>

                    {/* Overlay Content */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                      <span className="text-xs tracking-[0.2em] text-gray-300 mb-2 block">
                        {post.category.toUpperCase()}
                      </span>
                      
                      <h3 className="font-light tracking-wide mb-2 text-lg md:text-xl">
                        {post.title}
                      </h3>
                      
                      <p
                        className={`text-gray-300 text-sm mb-3 transition-all duration-500 ${
                          hoveredId === post.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                      >
                        {post.excerpt}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Heart size={12} />
                          {post.likes || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={12} />
                          {post.views || 0}
                        </span>
                      </div>
                    </div>

                    {/* Read More Indicator */}
                    <div
                      className={`absolute top-6 right-6 w-10 h-10 border-2 border-white rounded-full flex items-center justify-center text-white transition-all duration-500 ${
                        hoveredId === post.id ? 'opacity-100 scale-100 rotate-90' : 'opacity-0 scale-0 rotate-0'
                      }`}
                    >
                      →
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

