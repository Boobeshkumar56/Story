'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Save, Lock } from 'lucide-react';
import Link from 'next/link';

export default function AdminBlogs() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    description: '',
    category: 'Wedding',
    date: new Date().toISOString().split('T')[0],
    location: '',
    eventDate: '',
    coverImage: '',
    galleryImages: [''],
  });

  const categories = ['Wedding', 'Pre-Wedding', 'Portrait', 'Event'];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password protection - in production, use proper authentication
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addGalleryImage = () => {
    setFormData({
      ...formData,
      galleryImages: [...formData.galleryImages, '']
    });
  };

  const updateGalleryImage = (index: number, value: string) => {
    const newGalleryImages = [...formData.galleryImages];
    newGalleryImages[index] = value;
    setFormData({
      ...formData,
      galleryImages: newGalleryImages
    });
  };

  const removeGalleryImage = (index: number) => {
    const newGalleryImages = formData.galleryImages.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      galleryImages: newGalleryImages
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Blog data to save:', formData);
    
    // Here you would typically:
    // 1. Validate the data
    // 2. Send to your backend API
    // 3. Save to database
    // 4. Show success message
    
    alert('Blog post created successfully! (This is a demo - implement backend integration)');
    
    // Reset form
    setFormData({
      title: '',
      excerpt: '',
      description: '',
      category: 'Wedding',
      date: new Date().toISOString().split('T')[0],
      location: '',
      eventDate: '',
      coverImage: '',
      galleryImages: [''],
    });
    setShowForm(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
              <Lock className="text-white" size={32} />
            </div>
          </div>
          
          <h1 className="text-2xl font-light text-center mb-2">Admin Access</h1>
          <p className="text-gray-600 text-center mb-8 text-sm">
            Enter password to manage blog posts
          </p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black transition-colors"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors"
            >
              Login
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link
              href="/blogs"
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              ← Back to Blogs
            </Link>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded text-xs text-gray-600">
            <strong>Demo credentials:</strong><br />
            Password: admin123
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-light mb-2">Blog Management</h1>
              <p className="text-gray-600">Create and manage your blog posts</p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/blogs"
                className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                View Blogs
              </Link>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {!showForm ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-white rounded-lg shadow-md p-12">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus className="text-white" size={40} />
              </div>
              <h2 className="text-2xl font-light mb-4">Create New Blog Post</h2>
              <p className="text-gray-600 mb-8">
                Share your latest photography story with beautiful galleries
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
              >
                <Plus size={20} />
                New Blog Post
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md p-8"
          >
            <h2 className="text-2xl font-light mb-8">Create New Blog Post</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium border-b pb-2">Basic Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Sarah & John's Magical Wedding"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt *
                  </label>
                  <input
                    type="text"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    placeholder="Short description that appears in the blog list"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Detailed description that appears on the blog post page"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black transition-colors"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black transition-colors"
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Published Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Ooty, Nilgiris"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Date *
                    </label>
                    <input
                      type="text"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      placeholder="e.g., December 20, 2023"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium border-b pb-2">Cover Image</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Image URL *
                  </label>
                  <input
                    type="url"
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black transition-colors"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This image will be displayed in the blog list
                  </p>
                </div>
              </div>

              {/* Gallery Images */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="text-lg font-medium">Gallery Images</h3>
                  <button
                    type="button"
                    onClick={addGalleryImage}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors text-sm"
                  >
                    <Plus size={16} />
                    Add Image
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.galleryImages.map((image, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="flex-1">
                        <input
                          type="url"
                          value={image}
                          onChange={(e) => updateGalleryImage(index, e.target.value)}
                          placeholder={`Gallery image ${index + 1} URL`}
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black transition-colors"
                          required
                        />
                      </div>
                      {formData.galleryImages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="px-4 py-3 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                <p className="text-xs text-gray-500">
                  Add 4-8 high-quality images from the event
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  Publish Blog Post
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-8 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
