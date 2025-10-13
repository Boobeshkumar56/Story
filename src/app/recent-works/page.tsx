'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function RecentWorks() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const recentProjects = [
    {
      id: 1,
      title: 'The Vineyard Wedding',
      client: 'Sarah & Michael',
      date: 'December 2024',
      description: 'An intimate celebration amidst rolling vineyards, capturing the essence of rustic elegance and timeless romance.',
      coverImage: 'https://picsum.photos/1200/800?random=40',
      images: [
        'https://picsum.photos/800/1200?random=41',
        'https://picsum.photos/1200/800?random=42',
        'https://picsum.photos/800/800?random=43',
        'https://picsum.photos/1000/600?random=44',
      ]
    },
    {
      id: 2,
      title: 'Urban Portrait Series',
      client: 'Fashion Week 2024',
      date: 'November 2024',
      description: 'Contemporary portraits that blend architectural elements with human emotion, exploring the relationship between urban spaces and personal identity.',
      coverImage: 'https://picsum.photos/1200/800?random=45',
      images: [
        'https://picsum.photos/600/900?random=46',
        'https://picsum.photos/800/1200?random=47',
        'https://picsum.photos/1000/700?random=48',
        'https://picsum.photos/700/1000?random=49',
      ]
    },
    {
      id: 3,
      title: 'Heritage Family Portrait',
      client: 'The Richardson Family',
      date: 'October 2024',
      description: 'A multi-generational family portrait session celebrating heritage, tradition, and the bonds that connect us across time.',
      coverImage: 'https://picsum.photos/1200/800?random=50',
      images: [
        'https://picsum.photos/900/600?random=51',
        'https://picsum.photos/800/1000?random=52',
        'https://picsum.photos/1100/700?random=53',
        'https://picsum.photos/600/800?random=54',
      ]
    },
    {
      id: 4,
      title: 'Destination Elopement',
      client: 'Emma & James',
      date: 'September 2024',
      description: 'An adventurous elopement in the mountains, where dramatic landscapes served as the perfect backdrop for an intimate ceremony.',
      coverImage: 'https://picsum.photos/1200/800?random=55',
      images: [
        'https://picsum.photos/800/1200?random=56',
        'https://picsum.photos/1200/800?random=57',
        'https://picsum.photos/700/900?random=58',
        'https://picsum.photos/1000/600?random=59',
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="py-20 px-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-playfair font-light tracking-wider mb-8">
              RECENT WORKS
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Our latest projects showcasing contemporary photography and innovative 
              storytelling techniques, each crafted with passion and precision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-24">
            {recentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {/* Project Info */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-playfair font-light mb-2">
                        {project.title}
                      </h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-400 tracking-widest">
                        <span>{project.client}</span>
                        <span>•</span>
                        <span>{project.date}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <button
                      onClick={() => setSelectedProject(project.id)}
                      className="inline-block border border-white px-6 py-2 text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300"
                    >
                      VIEW PROJECT
                    </button>
                  </div>
                </div>

                {/* Project Cover Image */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative overflow-hidden cursor-pointer"
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="w-full h-96 object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-all duration-300" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <div className="min-h-screen p-4 md:p-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-6xl mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-3xl font-playfair font-light">
                      {recentProjects.find(p => p.id === selectedProject)?.title}
                    </h2>
                    <p className="text-gray-400 text-sm tracking-widest">
                      {recentProjects.find(p => p.id === selectedProject)?.client} • {recentProjects.find(p => p.id === selectedProject)?.date}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Modal Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recentProjects.find(p => p.id === selectedProject)?.images.map((image, imgIndex) => (
                    <motion.div
                      key={imgIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: imgIndex * 0.1 }}
                      className="relative overflow-hidden"
                    >
                      <Image
                        src={image}
                        alt={`Project image ${imgIndex + 1}`}
                        width={600}
                        height={800}
                        className="w-full h-96 object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back Navigation */}
      <section className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors text-sm tracking-widest"
          >
            ← BACK TO HOME
          </Link>
        </div>
      </section>
    </div>
  );
}