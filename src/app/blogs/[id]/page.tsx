'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Heart, Eye, ArrowLeft } from 'lucide-react';

export default function BlogPost() {
  const params = useParams();
  const id = params.id as string;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [eventData, setEventData] = useState<any>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

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
      setLikeCount(metaResult.metadata.likes || 0);
      setViewCount(metaResult.metadata.views || 0);

      const imagesResponse = await fetch(`/api/folder-images?folder=${id}`);
      const imagesResult = await imagesResponse.json();
      
      if (imagesResult.success) {
        const images = imagesResult.images
          .filter((img: any) => !img.publicId.includes('metadata'))
          .map((img: any) => img.url);
        setGalleryImages(images);
      }

      await fetch('/api/update-stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderName: id, type: 'views', increment: true })
      });
      
      setViewCount(prev => prev + 1);
    } catch (error) {
      console.error('Error loading event:', error);
      setEventData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    const newLiked = !liked;
    setLiked(newLiked);
    const newCount = newLiked ? likeCount + 1 : likeCount - 1;
    setLikeCount(newCount);
    
    try {
      await fetch('/api/update-stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderName: id, type: 'likes', increment: newLiked })
      });
    } catch (error) {
      console.error('Error updating likes:', error);
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
          <h1 className="text-4xl md:text-6xl font-extralight mb-6 leading-tight">{eventData.title}</h1>
          <p className="text-xl text-gray-600 font-light mb-8 max-w-3xl">{eventData.description}</p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(eventData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            {eventData.eventDate && (<><span>•</span><span>Event: {eventData.eventDate}</span></>)}
            {eventData.location && (<><span>•</span><span>Location: {eventData.location}</span></>)}
          </div>
          <div className="flex items-center gap-8 pb-8 border-b border-gray-200">
            <button onClick={handleLike} className={`flex items-center gap-2 transition-colors ${liked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}>
              <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
              <span>{likeCount}</span>
            </button>
            <span className="flex items-center gap-2 text-gray-600">
              <Eye size={20} />
              {viewCount} views
            </span>
          </div>
        </motion.div>
      </div>

      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-3xl font-light mb-8">
            Event Gallery
          </motion.h2>
          {galleryImages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              {galleryImages.map((image: string, index: number) => (
                <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="relative h-80 overflow-hidden group cursor-pointer">
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

      <div className="text-center py-16">
        <Link href="/blogs" className="inline-block border border-black px-12 py-4 text-sm tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300">
          VIEW MORE STORIES
        </Link>
      </div>
    </div>
  );
}
