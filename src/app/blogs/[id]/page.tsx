'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Heart, MessageCircle, Eye, ArrowLeft, Send } from 'lucide-react';

export default function BlogPost() {
  const params = useParams();
  const id = params.id as string;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');

  const blogPosts: Record<string, { id: string; title: string; excerpt: string; description: string; category: string; date: string; initialLikes: number; initialComments: number; views: number; location: string; eventDate: string; gallery: string[]; comments: Array<{ id: number; user: string; avatar: string; comment: string; date: string; likes: number; }>; }> = {
    '1': {
      id: '1',
      title: 'Sarah & John&apos;s Magical Wedding',
      excerpt: 'A beautiful celebration of love in the misty hills of Ooty',
      description: 'Witnessing Sarah and John exchange vows amidst the breathtaking landscapes of Ooty was truly magical. The morning mist, the golden afternoon light, and the couple&apos;s genuine emotions made this wedding unforgettable. From the intimate getting-ready moments to the grand reception, every frame tells their unique love story.',
      category: 'Wedding',
      date: '2024-01-15',
      initialLikes: 234,
      initialComments: 45,
      views: 1200,
      location: 'Ooty, Nilgiris',
      eventDate: 'December 20, 2023',
      gallery: [
        'https://picsum.photos/1200/800?random=201',
        'https://picsum.photos/1200/800?random=202',
        'https://picsum.photos/1200/800?random=203',
        'https://picsum.photos/1200/800?random=204',
        'https://picsum.photos/1200/800?random=205',
        'https://picsum.photos/1200/800?random=206',
        'https://picsum.photos/1200/800?random=207',
        'https://picsum.photos/1200/800?random=208',
      ],
      comments: [
        {
          id: 1,
          user: 'Emily Rodriguez',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
          comment: 'These photos are absolutely stunning! You captured their love so beautifully.',
          date: '2024-01-16',
          likes: 12
        },
        {
          id: 2,
          user: 'Michael Chen',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
          comment: 'The composition and lighting in these shots are incredible. Such professional work!',
          date: '2024-01-16',
          likes: 8
        },
        {
          id: 3,
          user: 'Priya Sharma',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
          comment: 'We&apos;re looking for a photographer for our wedding next year. Your work is exactly what we want!',
          date: '2024-01-17',
          likes: 15
        },
        {
          id: 4,
          user: 'David Thompson',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
          comment: 'The way you&apos;ve captured the emotions and moments is truly remarkable. Beautiful storytelling!',
          date: '2024-01-17',
          likes: 6
        }
      ]
    },
    '2': {
      id: '2',
      title: 'Priya & Raj - A Love Story',
      excerpt: 'Traditional elegance meets modern romance',
      description: 'Priya and Raj&apos;s wedding was a perfect blend of tradition and contemporary style. The vibrant colors, intricate details, and heartfelt moments created a visual feast that celebrated their culture and love story beautifully.',
      category: 'Wedding',
      date: '2024-01-10',
      initialLikes: 189,
      initialComments: 32,
      views: 980,
      location: 'Coimbatore, Tamil Nadu',
      eventDate: 'January 5, 2024',
      gallery: [
        'https://picsum.photos/1200/800?random=301',
        'https://picsum.photos/1200/800?random=302',
        'https://picsum.photos/1200/800?random=303',
        'https://picsum.photos/1200/800?random=304',
        'https://picsum.photos/1200/800?random=305',
        'https://picsum.photos/1200/800?random=306',
      ],
      comments: [
        {
          id: 1,
          user: 'Aisha Patel',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha',
          comment: 'The colors are so vibrant! Love how you captured the cultural elements.',
          date: '2024-01-11',
          likes: 9
        },
        {
          id: 2,
          user: 'Ravi Kumar',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi',
          comment: 'Beautiful documentation of a beautiful day. Well done!',
          date: '2024-01-12',
          likes: 5
        }
      ]
    },
    '3': {
      id: '3',
      title: 'Monsoon Magic in Nilgiris',
      excerpt: 'Capturing the ethereal beauty of pre-wedding moments',
      description: 'There&apos;s something incredibly romantic about monsoon season in the Nilgiris. The rain-kissed landscapes, dramatic clouds, and soft diffused light created the perfect backdrop for this couple&apos;s pre-wedding session.',
      category: 'Pre-Wedding',
      date: '2024-01-05',
      initialLikes: 312,
      initialComments: 56,
      views: 1450,
      location: 'Nilgiris, Tamil Nadu',
      eventDate: 'December 15, 2023',
      gallery: [
        'https://picsum.photos/1200/800?random=401',
        'https://picsum.photos/1200/800?random=402',
        'https://picsum.photos/1200/800?random=403',
        'https://picsum.photos/1200/800?random=404',
        'https://picsum.photos/1200/800?random=405',
      ],
      comments: [
        {
          id: 1,
          user: 'Sarah Williams',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
          comment: 'The monsoon atmosphere is captured so perfectly! Magical shots!',
          date: '2024-01-06',
          likes: 18
        }
      ]
    },
    '4': {
      id: '4',
      title: 'Portraits in Nature',
      excerpt: 'When personality meets the wilderness',
      description: 'These portrait sessions in the wild landscapes of the Nilgiris showcase how natural settings can bring out authentic personality and create stunning visual narratives.',
      category: 'Portrait',
      date: '2023-12-28',
      initialLikes: 156,
      initialComments: 28,
      views: 750,
      location: 'Coonoor, Nilgiris',
      eventDate: 'December 10, 2023',
      gallery: [
        'https://picsum.photos/1200/800?random=501',
        'https://picsum.photos/1200/800?random=502',
        'https://picsum.photos/1200/800?random=503',
        'https://picsum.photos/1200/800?random=504',
      ],
      comments: []
    },
    '5': {
      id: '5',
      title: 'Destination Wedding Chronicles',
      excerpt: 'A three-day celebration across Kerala backwaters',
      description: 'This destination wedding across the serene Kerala backwaters was a three-day celebration filled with joy, tradition, and unforgettable moments. From houseboat ceremonies to beachside receptions, every event was unique.',
      category: 'Wedding',
      date: '2023-12-20',
      initialLikes: 421,
      initialComments: 78,
      views: 2100,
      location: 'Alleppey, Kerala',
      eventDate: 'December 1-3, 2023',
      gallery: [
        'https://picsum.photos/1200/800?random=601',
        'https://picsum.photos/1200/800?random=602',
        'https://picsum.photos/1200/800?random=603',
        'https://picsum.photos/1200/800?random=604',
        'https://picsum.photos/1200/800?random=605',
        'https://picsum.photos/1200/800?random=606',
        'https://picsum.photos/1200/800?random=607',
      ],
      comments: [
        {
          id: 1,
          user: 'John Anderson',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
          comment: 'What an incredible series! The backwater setting is absolutely dreamy.',
          date: '2023-12-21',
          likes: 22
        }
      ]
    },
    '6': {
      id: '6',
      title: 'Golden Hour Sessions',
      excerpt: 'Chasing light and creating memories',
      description: 'Golden hour photography is all about timing, light, and capturing the warm, magical glow that transforms ordinary moments into extraordinary memories.',
      category: 'Pre-Wedding',
      date: '2023-12-15',
      initialLikes: 267,
      initialComments: 41,
      views: 1350,
      location: 'Ooty, Nilgiris',
      eventDate: 'November 28, 2023',
      gallery: [
        'https://picsum.photos/1200/800?random=701',
        'https://picsum.photos/1200/800?random=702',
        'https://picsum.photos/1200/800?random=703',
        'https://picsum.photos/1200/800?random=704',
        'https://picsum.photos/1200/800?random=705',
      ],
      comments: [
        {
          id: 1,
          user: 'Lisa Brown',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
          comment: 'The golden light is captured perfectly! These are breathtaking.',
          date: '2023-12-16',
          likes: 14
        }
      ]
    }
  };

  const post = blogPosts[id];

  if (!post) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, this story doesn&apos;t exist.</p>
          <Link
            href="/blogs"
            className="inline-block border border-black px-8 py-3 text-sm tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300"
          >
            BACK TO STORIES
          </Link>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle comment submission logic here
    setNewComment('');
    setUserName('');
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-8 md:px-12 pt-12">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span className="text-sm tracking-wide">Back to Stories</span>
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-8 md:px-12 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm tracking-[0.2em] text-gray-600 mb-4 block">
            {post.category.toUpperCase()}
          </span>

          <h1 className="text-4xl md:text-6xl font-extralight mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 font-light mb-8 max-w-3xl">
            {post.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span>•</span>
            <span>Event: {post.eventDate}</span>
            <span>•</span>
            <span>Location: {post.location}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 pb-8 border-b border-gray-200">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 transition-colors ${
                liked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
              <span>{post.initialLikes + likeCount}</span>
            </button>
            <span className="flex items-center gap-2 text-gray-600">
              <MessageCircle size={20} />
              {post.comments.length}
            </span>
            <span className="flex items-center gap-2 text-gray-600">
              <Eye size={20} />
              {post.views}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Image Gallery */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-light mb-8"
          >
            Event Gallery
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {post.gallery.map((image: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative h-80 overflow-hidden group cursor-pointer"
              >
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-8 md:px-12">
          <h2 className="text-3xl font-light mb-8">
            Comments ({post.comments.length})
          </h2>

          {/* Comment Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onSubmit={handleCommentSubmit}
            className="mb-12 bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black transition-colors"
                required
              />
            </div>
            <textarea
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black transition-colors mb-4"
              required
            />
            <button
              type="submit"
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
            >
              <Send size={18} />
              Post Comment
            </button>
          </motion.form>

          {/* Comments List */}
          <div className="space-y-6">
            {post.comments.map((comment, index: number) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={comment.avatar}
                      alt={comment.user}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{comment.user}</h4>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{comment.comment}</p>
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-500 transition-colors">
                      <Heart size={16} />
                      {comment.likes} likes
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Blogs */}
      <div className="text-center py-16">
        <Link
          href="/blogs"
          className="inline-block border border-black px-12 py-4 text-sm tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300"
        >
          VIEW MORE STORIES
        </Link>
      </div>
    </div>
  );
}
