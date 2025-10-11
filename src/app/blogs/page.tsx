'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Mail, Phone, MapPin, Camera, Instagram, Facebook } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Blogs() {
  const [selectedFilter, setSelectedFilter] = useState('All Time');
  const [email, setEmail] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Apply hide-all-scrollbars class when component mounts
  useEffect(() => {
    // Add class to hide all scrollbars on the page
    document.documentElement.classList.add('hide-all-scrollbars');
    
    return () => {
      // Remove class when component unmounts
      document.documentElement.classList.remove('hide-all-scrollbars');
    };
  }, []);
  
  // Smooth scroll locking mechanism with spring physics
  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;
    
    let isLocked = false;
    let lockPosition = 0;
    let scrollVelocity = 0;
    let lastTimestamp = 0;
    let animationFrame: number;
    
    // Spring physics constants
    const springStrength = 0.12;
    const friction = 0.85;
    let targetProgress = scrollProgress;
    
    const lockScroll = () => {
      if (isLocked) return;
      isLocked = true;
      lockPosition = window.scrollY;
      
      // Add a class to html element to handle scrollbar consistently
      document.documentElement.classList.add('scroll-locked');
      
      // Position the body to simulate scrolling without actually scrolling
      document.body.style.position = 'fixed';
      document.body.style.top = `-${lockPosition}px`;
      document.body.style.width = '100%';
    };
    
    const unlockScroll = () => {
      if (!isLocked) return;
      isLocked = false;
      
      // Remove the class from html element
      document.documentElement.classList.remove('scroll-locked');
      
      // Restore body positioning
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Restore scroll position
      window.scrollTo(0, lockPosition);
    };
    
    // Smooth animation loop using spring physics
    const animateScroll = () => {
      // Calculate spring force
      const progressDiff = targetProgress - scrollProgress;
      const springForce = progressDiff * springStrength;
      
      // Apply spring force to velocity with friction
      scrollVelocity += springForce;
      scrollVelocity *= friction;
      
      // Check if animation is still needed
      if (Math.abs(progressDiff) < 0.001 && Math.abs(scrollVelocity) < 0.001) {
        if (targetProgress >= 0.98) {
          unlockScroll();
        }
        cancelAnimationFrame(animationFrame);
        return;
      }
      
      // Update scroll position
      setScrollProgress(prev => Math.max(0, Math.min(0.98, prev + scrollVelocity)));
      
      // Continue animation
      animationFrame = requestAnimationFrame(animateScroll);
    };
    
    const handleWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const now = performance.now();
      const deltaTime = now - lastTimestamp;
      
      // Calculate smooth velocity
      if (deltaTime > 0) {
        // Normalize wheel delta across browsers
        const normalizedDelta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 60);
        
        // Calculate instantaneous velocity
        const instantVelocity = normalizedDelta / deltaTime;
        
        // Smooth velocity with exponential moving average
        scrollVelocity = scrollVelocity * 0.8 + instantVelocity * 0.002;
      }
      
      lastTimestamp = now;
      
      // Check if we're in the horizontal scrolling section
      if (rect.top <= 100 && rect.bottom >= 100) {
        if (!isLocked && scrollProgress < 0.98) {
          lockScroll();
          cancelAnimationFrame(animationFrame);
        }
        
        if (isLocked) {
          // Update target position for spring physics
          targetProgress = Math.max(0, Math.min(0.98, targetProgress + e.deltaY * 0.0008));
          
          // Start animation if not running
          if (!animationFrame) {
            animationFrame = requestAnimationFrame(animateScroll);
          }
          
          e.preventDefault();
        }
      } else if (isLocked) {
        unlockScroll();
      }
    };
    
    // Use scroll event to handle entering/exiting the section
    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      
      // If we scrolled past the section, make sure horizontal scroll is complete
      if (rect.bottom < 0) {
        targetProgress = 1;
        setScrollProgress(1);
      }
      // If we're above the section, reset horizontal scroll
      else if (rect.top > window.innerHeight) {
        targetProgress = 0;
        setScrollProgress(0);
      }
    };
    
    // Touch support for mobile devices
    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      const rect = section.getBoundingClientRect();
      
      if (rect.top <= 100 && rect.bottom >= 100) {
        touchStartY = e.touches[0].clientY;
        
        if (!isLocked && scrollProgress < 0.98) {
          lockScroll();
        }
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      const rect = section.getBoundingClientRect();
      
      if (rect.top <= 100 && rect.bottom >= 100 && isLocked) {
        const touchY = e.touches[0].clientY;
        const touchDiff = touchStartY - touchY;
        
        // Update target position for spring physics
        targetProgress = Math.max(0, Math.min(0.98, targetProgress + touchDiff * 0.002));
        touchStartY = touchY;
        
        // Start animation if not running
        if (!animationFrame) {
          animationFrame = requestAnimationFrame(animateScroll);
        }
        
        e.preventDefault();
      }
    };
    
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrame);
      unlockScroll();
    };
  }, [scrollProgress]);
  
  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Golden Hour Magic",
      image: "https://picsum.photos/600/400?random=101",
      category: "Portrait"
    },
    {
      id: 2,
      title: "Urban Stories",
      image: "https://picsum.photos/600/400?random=102",
      category: "Street"
    },
    {
      id: 3,
      title: "Wedding Bliss",
      image: "https://picsum.photos/600/400?random=103",
      category: "Wedding"
    },
    {
      id: 4,
      title: "Nature's Canvas",
      image: "https://picsum.photos/600/400?random=104",
      category: "Landscape"
    },
    {
      id: 5,
      title: "Intimate Moments",
      image: "https://picsum.photos/600/400?random=105",
      category: "Couple"
    },
    {
      id: 6,
      title: "Fashion Forward",
      image: "https://picsum.photos/600/400?random=106",
      category: "Fashion"
    },
    {
      id: 7,
      title: "Artistic Vision",
      image: "https://picsum.photos/600/400?random=107",
      category: "Art"
    },
    {
      id: 8,
      title: "Cultural Heritage",
      image: "https://picsum.photos/600/400?random=108",
      category: "Culture"
    }
  ];

  const timeFilters = ['All Time', 'This Week', 'This Month', 'This Year'];

  // Define highlighted images for horizontal scrolling gallery
  const highlightedImages = blogPosts;
  
  const blogs = [
    {
      id: 1,
      title: "Capturing Golden Hour Portraits",
      excerpt: "Discover the magic of golden hour photography and how it transforms ordinary portraits into extraordinary art pieces.",
      image: "https://picsum.photos/400/300?random=201",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Portraits"
    },
    {
      id: 2,
      title: "Wedding Photography Essentials",
      excerpt: "Essential tips and techniques for capturing perfect wedding moments that couples will treasure forever.",
      image: "https://picsum.photos/400/300?random=202",
      date: "2024-01-10",
      readTime: "8 min read",
      category: "Weddings"
    },
    {
      id: 3,
      title: "Street Photography Storytelling",
      excerpt: "Learn how to tell compelling stories through street photography and capture authentic human emotions.",
      image: "https://picsum.photos/400/300?random=203",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Street"
    },
    {
      id: 4,
      title: "Color Theory in Photography",
      excerpt: "Understanding color theory and how to use it effectively to create mood and atmosphere in your photographs.",
      image: "https://picsum.photos/400/300?random=204",
      date: "2023-12-28",
      readTime: "7 min read",
      category: "Theory"
    },
    {
      id: 5,
      title: "Natural Light Techniques",
      excerpt: "Master the art of working with natural light to create stunning photographs in any environment.",
      image: "https://picsum.photos/400/300?random=205",
      date: "2023-12-20",
      readTime: "9 min read",
      category: "Lighting"
    },
    {
      id: 6,
      title: "Behind the Scenes Stories",
      excerpt: "Personal stories and experiences from memorable photo shoots that shaped our creative journey.",
      image: "https://picsum.photos/400/300?random=206",
      date: "2023-12-15",
      readTime: "4 min read",
      category: "Stories"
    },
    {
      id: 7,
      title: "Advanced Portrait Lighting",
      excerpt: "Professional lighting techniques for creating dramatic and compelling portrait photography.",
      image: "https://picsum.photos/400/300?random=207",
      date: "2023-12-10",
      readTime: "6 min read",
      category: "Portraits"
    },
    {
      id: 8,
      title: "Photography Business Tips",
      excerpt: "Essential business advice for photographers looking to turn their passion into a successful career.",
      image: "https://picsum.photos/400/300?random=208",
      date: "2023-12-05",
      readTime: "8 min read",
      category: "Business"
    }
  ];

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center relative z-10"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-extralight mb-8 tracking-wide leading-tight"
          >
            <span className="block text-white font-thin">PHOTOGRAPHY</span>
            <span className="block text-gray-300 font-extralight mt-2">INSIGHTS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto font-light tracking-wide leading-relaxed"
          >
            Explore our collection of photography tips, techniques, and stories from behind the lens. 
            Discover the art and craft of visual storytelling.
          </motion.p>
        </motion.div>
      </section>

      {/* Horizontal Scrolling Highlighted Images */}
      <section ref={containerRef} className="relative h-[110vh] overflow-hidden bg-gray-100 pt-5">
        <div className="sticky top-10 flex items-center h-[calc(100vh-60px)]">
          <motion.div 
            className="flex gap-8 px-8 py-8"
            style={{
              x: -2000 * scrollProgress
            }}
            transition={{ 
              type: "spring", 
              stiffness: 70, 
              damping: 30
            }}
          >
            {highlightedImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex-shrink-0 w-80 h-60 relative group cursor-pointer shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                <Image
                  src={image.image}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-6 left-6 text-white z-20">
                  <span className="text-xs font-light tracking-widest text-gray-300 mb-2 block">
                    {image.category.toUpperCase()}
                  </span>
                  <h3 className="text-xl font-light tracking-wide">
                    {image.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Simplified Lens Zoom Scale - Only visible during parallel scrolling */}
        <div 
          className="absolute left-0 right-0 bottom-12 flex justify-center items-center z-50 pointer-events-none"
          style={{ 
            opacity: scrollProgress > 0.02 && scrollProgress < 0.98 ? 1 : 0, // Only show during scrolling, not before or after
            transition: "opacity 0.3s ease-in-out",
            width: "75%",
            margin: "0 auto"
          }}
        >
          {/* Lens scale container with increased visibility */}
          <div className="relative mx-auto w-full h-[36px] backdrop-blur-[4px]">
            {/* Main scale bar - bolder for visibility */}
            <div className="absolute inset-0 border-t-2 border-b-2 border-white/50 bg-gradient-to-r from-black/70 via-black/80 to-black/70">
              {/* Simplified tick marks */}
              <div className="absolute inset-0 lens-ticks"></div>
              
              {/* Simplified number markings - only 100, 200, 300... */}
              <div className="absolute top-0 left-0 right-0 h-4">
                {[0, 100, 200, 300, 400, 500].map((num, i, arr) => (
                  <div 
                    key={num} 
                    className="absolute top-0" 
                    style={{ left: `${i * (100/(arr.length-1))}%` }}
                  >
                    <div className="w-[2px] h-[12px] bg-white"></div>
                    <div className="absolute top-[14px] -translate-x-1/2 text-[12px] text-white font-bold tracking-wider">
                      {num}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Bolder active indicator line with enhanced RED glow effect */}
              <motion.div 
                className="absolute inset-y-0 w-[4px] bg-red-500 focus-pulse"
                style={{ 
                  boxShadow: '0 0 12px rgba(255, 0, 0, 0.9), 0 0 20px rgba(255, 0, 0, 0.7)'
                }}
                animate={{ 
                  left: `${scrollProgress * 100}%` 
                }}
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 15
                }}
              >
                {/* Small triangle indicator on top of line */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-red-500"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Time Filters */}
      <section className="py-16 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {timeFilters.map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-3 font-light tracking-wide transition-all duration-300 ${
                  selectedFilter === filter
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </motion.div>

          {/* Horizontal Blog Gallery */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative overflow-hidden"
          >
            <div className="flex gap-8 overflow-x-auto scrollbar-hide pb-8 px-4" style={{ scrollSnapType: 'x mandatory' }}>
              {blogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className="flex-shrink-0 w-96 bg-white shadow-xl overflow-hidden cursor-pointer group"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(blog.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-light text-gray-900 mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors">
                      {blog.title}
                    </h3>

                    <p className="text-gray-600 font-light leading-relaxed mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 font-light tracking-wide">
                        {blog.category}
                      </span>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center text-black group-hover:text-gray-700 transition-colors"
                      >
                        <span className="text-sm font-light mr-2">Read More</span>
                        <ArrowRight size={16} />
                      </motion.div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-light mb-6 tracking-wide"
          >
            STAY INSPIRED
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-400 mb-8 font-light leading-relaxed"
          >
            Subscribe to our newsletter for the latest photography tips, tutorials, and behind-the-scenes stories
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            onSubmit={handleEmailSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto justify-center"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 bg-white text-gray-900 font-light tracking-wide focus:outline-none focus:ring-2 focus:ring-white"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-8 py-4 bg-black text-white font-light tracking-wide hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Subscribe
              <Mail size={16} />
            </motion.button>
          </motion.form>
        </motion.div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-black text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-8 mb-12"
          >
            {/* Brand */}
            <div className="md:col-span-2">
              <h3 className="text-3xl font-light mb-4 tracking-widest">STORIES</h3>
              <p className="text-gray-400 font-light leading-relaxed mb-6 max-w-md">
                Capturing life&apos;s most precious moments through the art of photography. 
                Creating timeless memories that tell your unique story.
              </p>
              <div className="flex gap-4">
                <Camera className="text-gray-400 hover:text-white transition-colors cursor-pointer" size={20} />
                <Instagram className="text-gray-400 hover:text-white transition-colors cursor-pointer" size={20} />
                <Facebook className="text-gray-400 hover:text-white transition-colors cursor-pointer" size={20} />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-light mb-4 tracking-wide">QUICK LINKS</h4>
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors font-light">Home</Link></li>
                <li><Link href="/blogs" className="text-gray-400 hover:text-white transition-colors font-light">Blogs</Link></li>
                <li><Link href="/book-us" className="text-gray-400 hover:text-white transition-colors font-light">Book Us</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-light mb-4 tracking-wide">CONTACT</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-gray-400" />
                  <span className="text-gray-400 font-light">(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-gray-400 font-light">hello@stories.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-gray-400" />
                  <span className="text-gray-400 font-light">New York, NY</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="border-t border-gray-800 pt-8 text-center"
          >
            <p className="text-gray-500 font-light tracking-wide">
              © 2024 Stories. All rights reserved. | Crafted with passion for photography
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

