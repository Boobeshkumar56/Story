'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Eye } from 'lucide-react';

export default function Blogs() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const blogPosts = [
    {
      id: 1,
      title: 'Sarah & John&apos;s Magical Wedding',
      excerpt: 'A beautiful celebration of love in the misty hills of Ooty',
      image: 'https://picsum.photos/800/600?random=101',
      category: 'Wedding',
      date: '2024-01-15',
      likes: 234,
      comments: 45,
      views: 1200
    },
    {
      id: 2,
      title: 'Priya & Raj - A Love Story',
      excerpt: 'Traditional elegance meets modern romance',
      image: 'https://picsum.photos/800/600?random=102',
      category: 'Wedding',
      date: '2024-01-10',
      likes: 189,
      comments: 32,
      views: 980
    },
    {
      id: 3,
      title: 'Monsoon Magic in Nilgiris',
      excerpt: 'Capturing the ethereal beauty of pre-wedding moments',
      image: 'https://picsum.photos/800/600?random=103',
      category: 'Pre-Wedding',
      date: '2024-01-05',
      likes: 312,
      comments: 56,
      views: 1450
    },
    {
      id: 4,
      title: 'Portraits in Nature',
      excerpt: 'When personality meets the wilderness',
      image: 'https://picsum.photos/800/600?random=104',
      category: 'Portrait',
      date: '2023-12-28',
      likes: 156,
      comments: 28,
      views: 750
    },
    {
      id: 5,
      title: 'Destination Wedding Chronicles',
      excerpt: 'A three-day celebration across Kerala backwaters',
      image: 'https://picsum.photos/800/600?random=105',
      category: 'Wedding',
      date: '2023-12-20',
      likes: 421,
      comments: 78,
      views: 2100
    },
    {
      id: 6,
      title: 'Golden Hour Sessions',
      excerpt: 'Chasing light and creating memories',
      image: 'https://picsum.photos/800/600?random=106',
      category: 'Pre-Wedding',
      date: '2023-12-15',
      likes: 267,
      comments: 41,
      views: 1350
    }
  ];

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
      <section className="py-20 px-8 md:px-12 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      src={post.image}
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
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle size={12} />
                          {post.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={12} />
                          {post.views}
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
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-8 md:px-12 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-extralight tracking-[0.15em] mb-6 text-black">
              CLIENT TESTIMONIALS
            </h2>
            <p className="text-lg text-gray-600 font-light">
              What our clients say about their experience
            </p>
            <div className="w-24 h-px bg-black mx-auto mt-8"></div>
          </motion.div>

          <TestimonialCamera />
        </div>
      </section>
    </div>
  );
}

// Testimonial Camera Lens Component
function TestimonialCamera() {
  const [selectedId, setSelectedId] = useState<number>(1);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Bride",
      image: "https://picsum.photos/seed/face1/200/200",
      comment: "Mithu captured every precious moment of our wedding day with such artistry and professionalism.",
      galleryImages: [
        "https://picsum.photos/seed/wedding1a/800/1000",
        "https://picsum.photos/seed/wedding1b/800/1000",
        "https://picsum.photos/seed/wedding1c/800/1000",
        "https://picsum.photos/seed/wedding1d/800/1000"
      ]
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Groom",
      image: "https://picsum.photos/seed/face2/200/200",
      comment: "The attention to detail and creative composition exceeded our expectations completely.",
      galleryImages: [
        "https://picsum.photos/seed/wedding2a/800/1000",
        "https://picsum.photos/seed/wedding2b/800/1000",
        "https://picsum.photos/seed/wedding2c/800/1000",
        "https://picsum.photos/seed/wedding2d/800/1000"
      ]
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Bride",
      image: "https://picsum.photos/seed/face3/200/200",
      comment: "Professional, patient, and incredibly talented. An absolutely memorable experience.",
      galleryImages: [
        "https://picsum.photos/seed/prewedding3a/800/1000",
        "https://picsum.photos/seed/prewedding3b/800/1000",
        "https://picsum.photos/seed/prewedding3c/800/1000",
        "https://picsum.photos/seed/prewedding3d/800/1000"
      ]
    },
    {
      id: 4,
      name: "Michael Chen",
      role: "Corporate Client",
      image: "https://picsum.photos/seed/face4/200/200",
      comment: "Outstanding work on our corporate event. Perfectly captured our brand energy.",
      galleryImages: [
        "https://picsum.photos/seed/corporate4a/800/1000",
        "https://picsum.photos/seed/corporate4b/800/1000",
        "https://picsum.photos/seed/corporate4c/800/1000",
        "https://picsum.photos/seed/corporate4d/800/1000"
      ]
    },
    {
      id: 5,
      name: "Ananya Patel",
      role: "Portrait Client",
      image: "https://picsum.photos/seed/face5/200/200",
      comment: "Truly exceptional artistic vision and technical skill revealed in every frame.",
      galleryImages: [
        "https://picsum.photos/seed/portrait5a/800/1000",
        "https://picsum.photos/seed/portrait5b/800/1000",
        "https://picsum.photos/seed/portrait5c/800/1000",
        "https://picsum.photos/seed/portrait5d/800/1000"
      ]
    },
    {
      id: 6,
      name: "David Wilson",
      role: "Groom",
      image: "https://picsum.photos/seed/face6/200/200",
      comment: "Seamless process from consultation to final delivery. Unmatched quality throughout.",
      galleryImages: [
        "https://picsum.photos/seed/wedding6a/800/1000",
        "https://picsum.photos/seed/wedding6b/800/1000",
        "https://picsum.photos/seed/wedding6c/800/1000",
        "https://picsum.photos/seed/wedding6d/800/1000"
      ]
    },
    {
      id: 7,
      name: "Meera Iyer",
      role: "Bride",
      image: "https://picsum.photos/seed/face7/200/200",
      comment: "Captured emotions and candid moments that made our album truly special.",
      galleryImages: [
        "https://picsum.photos/seed/wedding7a/800/1000",
        "https://picsum.photos/seed/wedding7b/800/1000",
        "https://picsum.photos/seed/wedding7c/800/1000",
        "https://picsum.photos/seed/wedding7d/800/1000"
      ]
    },
    {
      id: 8,
      name: "James Anderson",
      role: "Event Coordinator",
      image: "https://picsum.photos/seed/face8/200/200",
      comment: "Exceptional professionalism and creative vision. Every shot perfectly composed.",
      galleryImages: [
        "https://picsum.photos/seed/event8a/800/1000",
        "https://picsum.photos/seed/event8b/800/1000",
        "https://picsum.photos/seed/event8c/800/1000",
        "https://picsum.photos/seed/event8d/800/1000"
      ]
    }
  ];

  const handleTestimonialClick = (id: number) => {
    if (selectedId !== id) {
      setSelectedId(id);
    }
  };

  const selectedTestimonial = testimonials.find(t => t.id === selectedId);
  const selectedIndex = testimonials.findIndex(t => t.id === selectedId);

  // Calculate rotation angle to bring selected item to top
  const rotationAngle = -(selectedIndex * (360 / testimonials.length));

  return (
    <div className="relative w-full min-h-screen py-16 bg-gray-100">
      {/* Background Gallery - 4 Images Crystal Clear */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <div className="grid grid-cols-4 h-full gap-0">
          {selectedTestimonial?.galleryImages.map((img, index) => (
            <motion.div
              key={`${selectedId}-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeInOut"
              }}
              className="relative h-full bg-gray-200"
            >
              <Image
                src={img}
                alt={`Gallery ${index + 1}`}
                width={800}
                height={1000}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-white/20"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Camera Lens - Classic Design */}
      <div className="relative w-[600px] h-[600px] mx-auto z-10">
        
        {/* Single Clean Circle with Border */}
        <div className="absolute inset-16 rounded-full border-2 border-black bg-white shadow-2xl">
          
          {/* Content Display Area - Text Only */}
          <div className="absolute inset-0 flex items-center justify-center p-16 pointer-events-none z-20">
            {selectedTestimonial && (
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center max-w-sm"
              >
                <motion.blockquote 
                  className="text-base font-light text-gray-800 leading-relaxed mb-8 px-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  &quot;{selectedTestimonial.comment}&quot;
                </motion.blockquote>
                
                <motion.div 
                  className="text-center pt-4 border-t border-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <p className="font-medium text-black text-base tracking-wide mb-1">
                    {selectedTestimonial.name}
                  </p>
                  <p className="text-xs text-gray-600 tracking-[0.25em] font-light">
                    {selectedTestimonial.role.toUpperCase()}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Rotating Circle with Testimonial Images */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ rotate: rotationAngle }}
            transition={{ 
              duration: 0.9, 
              ease: [0.4, 0.0, 0.2, 1]
            }}
          >
            {testimonials.map((testimonial, index) => {
              const angle = (index * (360 / testimonials.length)) * (Math.PI / 180);
              const radius = 284; // Exact radius to center on the border (half of container minus inset)
              const imageSize = 80;
              const x = Math.cos(angle - Math.PI / 2) * radius;
              const y = Math.sin(angle - Math.PI / 2) * radius;

              const isSelected = selectedId === testimonial.id;

              return (
                <motion.div
                  key={testimonial.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: `${imageSize}px`,
                    height: `${imageSize}px`,
                    zIndex: isSelected ? 15 : 10
                  }}
                  animate={{
                    x: x - imageSize / 2,
                    y: y - imageSize / 2,
                    rotate: -rotationAngle,
                    scale: isSelected ? 1.1 : 1
                  }}
                  transition={{ 
                    duration: 0.9, 
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTestimonialClick(testimonial.id);
                  }}
                  whileHover={{ scale: isSelected ? 1.15 : 1.05 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <div className="relative w-full h-full">
                    {/* Selection Ring */}
                    {isSelected && (
                      <motion.div
                        className="absolute -inset-2 rounded-full border-2 border-black"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    
                    {/* Image with White Border */}
                    <div className="w-full h-full rounded-full border-4 border-white shadow-xl overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Additional Ring for Selected */}
                    {isSelected && (
                      <div className="absolute inset-0 rounded-full ring-2 ring-black ring-offset-2 ring-offset-white"></div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>


      </div>

      {/* Instructions */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center">
        <p className="text-gray-400 text-xs font-light tracking-[0.15em]">
          SELECT TO VIEW TESTIMONIAL
        </p>
      </div>
    </div>
  );
}