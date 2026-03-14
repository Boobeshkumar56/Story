'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function BlogPost() {
  const params = useParams();
  const id = params.id as string;

  const [eventData, setEventData] = useState<any>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = useCallback(() => {
    setLightboxIndex(prev => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
  }, [galleryImages.length]);

  const nextImage = useCallback(() => {
    setLightboxIndex(prev => (prev !== null ? (prev + 1) % galleryImages.length : null));
  }, [galleryImages.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevImage();
      else if (e.key === 'ArrowRight') nextImage();
      else if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, prevImage, nextImage]);

  useEffect(() => {
    loadEventData();
  }, [id]);

  const loadEventData = async () => {
    try {
      setLoading(true);

      const metaResponse = await fetch(`/api/metadata?folder=${id}`);
      const metaResult = await metaResponse.json();

      if (!metaResult.success) {
        setEventData(null);
        setLoading(false);
        return;
      }

      setEventData(metaResult.metadata);

      const imagesResponse = await fetch(`/api/folder-images?folder=${id}`);
      const imagesResult = await imagesResponse.json();

      if (imagesResult.success) {
        const images = imagesResult.images
          .filter((img: any) => !img.publicId.includes('metadata'))
          .map((img: any) => img.url);
        setGalleryImages(images);
      }


    } catch (error) {
      console.error('Error loading event:', error);
      setEventData(null);
    } finally {
      setLoading(false);
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          <p className="mt-4 text-gray-600">Loading event...</p>
        </div>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, this event does not exist.</p>
          <Link href="/blogs" className="inline-block border border-black px-8 py-3 text-sm tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300">
            BACK TO STORIES
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-8 md:px-12 pt-12">
        <Link href="/blogs" className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8">
          <ArrowLeft size={20} />
          <span className="text-sm tracking-wide">Back to Stories</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-12 mb-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-sm tracking-[0.2em] text-gray-600 mb-4 block">
            {eventData.category?.toUpperCase()}
          </span>
          <h1 className="font-playfair text-4xl md:text-6xl font-light mb-6 leading-tight">{eventData.title}</h1>
          <p className="text-xl text-gray-600 font-light mb-8 max-w-3xl">{eventData.description}</p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(eventData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            {eventData.eventDate && (<><span>•</span><span>Event: {eventData.eventDate}</span></>)}
            {eventData.location && (<><span>•</span><span>Location: {eventData.location}</span></>)}
          </div>
          <div className="pb-8 border-b border-gray-200" />
        </motion.div>
      </div>

      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="font-playfair text-3xl font-light mb-8">
            Event Gallery
          </motion.h2>
          {galleryImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              {galleryImages.map((image: string, index: number) => (
                <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="relative h-80 overflow-hidden group cursor-pointer" onClick={() => openLightbox(index)}>
                  <Image src={image} alt={`Gallery image ${index + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No images in gallery</p>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-2 py-2"
            onClick={closeLightbox}
          >
            {/* Modal box */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.25 }}
              className="relative rounded-xl overflow-hidden shadow-2xl w-full max-w-6xl"
              style={{ maxHeight: '95vh', aspectRatio: '4/3' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <Image
                src={galleryImages[lightboxIndex]}
                alt={`Gallery image ${lightboxIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />

              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-3 right-3 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors z-10"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Counter */}
              <span className="absolute top-3 left-3 bg-black/40 text-white/80 text-xs tracking-widest px-2.5 py-1 rounded-full">
                {lightboxIndex + 1} / {galleryImages.length}
              </span>

              {/* Prev */}
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Next */}
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center py-16">
        <Link href="/blogs" className="inline-block border border-black px-12 py-4 text-sm tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300">
          VIEW MORE STORIES
        </Link>
      </div>
    </div>
  );
}
