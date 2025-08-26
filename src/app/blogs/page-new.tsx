'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Search, Mail, Phone, MapPin, Camera, Instagram, Facebook } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function Blogs() {
  const [selectedFilter, setSelectedFilter] = useState('All Time');
  const [email, setEmail] = useState('');

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const timeFilters = ['All Time', 'This Week', 'This Month', 'This Year'];

  const blogs = [
    {
      id: 1,
      title: "Capturing Golden Hour Portraits",
      excerpt: "Discover the magic of golden hour photography and how it transforms ordinary portraits into extraordinary art pieces.",
      image: "/api/placeholder/400/300",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Portraits"
    },
    {
      id: 2,
      title: "Wedding Photography Essentials",
      excerpt: "Essential tips and techniques for capturing perfect wedding moments that couples will treasure forever.",
      image: "/api/placeholder/400/300",
      date: "2024-01-10",
      readTime: "8 min read",
      category: "Weddings"
    },
    {
      id: 3,
      title: "Street Photography Storytelling",
      excerpt: "Learn how to tell compelling stories through street photography and capture authentic human emotions.",
      image: "/api/placeholder/400/300",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Street"
    },
    {
      id: 4,
      title: "Color Theory in Photography",
      excerpt: "Understanding color theory and how to use it effectively to create mood and atmosphere in your photographs.",
      image: "/api/placeholder/400/300",
      date: "2023-12-28",
      readTime: "7 min read",
      category: "Theory"
    },
    {
      id: 5,
      title: "Natural Light Techniques",
      excerpt: "Master the art of working with natural light to create stunning photographs in any environment.",
      image: "/api/placeholder/400/300",
      date: "2023-12-20",
      readTime: "9 min read",
      category: "Lighting"
    },
    {
      id: 6,
      title: "Behind the Scenes Stories",
      excerpt: "Personal stories and experiences from memorable photo shoots that shaped our creative journey.",
      image: "/api/placeholder/400/300",
      date: "2023-12-15",
      readTime: "4 min read",
      category: "Stories"
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

      {/* Time Filters */}
      <section className="py-16 px-4 bg-gray-50">
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

          {/* Horizontal Scrolling Blog Gallery */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="flex gap-8 overflow-x-auto scrollbar-hide pb-8" style={{ scrollSnapType: 'x mandatory' }}>
              {blogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="flex-shrink-0 w-80 bg-white shadow-lg overflow-hidden cursor-pointer group"
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
                Capturing life's most precious moments through the art of photography. 
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
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors font-light">Home</a></li>
                <li><a href="/blogs" className="text-gray-400 hover:text-white transition-colors font-light">Blogs</a></li>
                <li><a href="/book-us" className="text-gray-400 hover:text-white transition-colors font-light">Book Us</a></li>
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
