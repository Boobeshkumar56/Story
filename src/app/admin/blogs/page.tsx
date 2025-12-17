'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Save, Lock, Upload, X, Heart, Eye, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/ImageUploader';
import AdminNav from '@/components/AdminNav';

export default function AdminBlogs() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');

  useEffect(() => {
    // Check if already authenticated
    const authStatus = localStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const [formData, setFormData] = useState({
    folderName: '',
    title: '',
    excerpt: '',
    description: '',
    category: 'Wedding',
    date: new Date().toISOString().split('T')[0],
    location: '',
    eventDate: '',
    coverImage: '',
    galleryImages: [] as string[],
    addToLibrary: true,
    addToBlogs: true,
  });

  const categories = ['Wedding', 'Pre-Wedding', 'Portrait', 'Event'];
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password protection - in production, use proper authentication
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
    } else {
      alert('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    router.push('/home');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCoverImageUpload = (url: string) => {
    setFormData({
      ...formData,
      coverImage: url
    });
    setUploadError('');
  };

  const handleGalleryImageUpload = (url: string) => {
    setFormData({
      ...formData,
      galleryImages: [...formData.galleryImages, url]
    });
    setUploadError('');
  };

  const removeGalleryImage = (index: number) => {
    const newGalleryImages = formData.galleryImages.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      galleryImages: newGalleryImages
    });
  };

  const handleUploadError = (error: string) => {
    setUploadError(error);
    setTimeout(() => setUploadError(''), 5000);
  };

  const handleCheckboxChange = (field: string) => {
    setFormData({
      ...formData,
      [field]: !formData[field as keyof typeof formData]
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.folderName.trim()) {
      setUploadError('Please enter a folder name for Cloudinary storage');
      return;
    }
    
    if (!formData.coverImage) {
      setUploadError('Please upload a cover image');
      return;
    }
    
    if (formData.galleryImages.length === 0) {
      setUploadError('Please upload at least one gallery image');
      return;
    }
    
    try {
      // Save event metadata to Cloudinary
      const response = await fetch('/api/metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          folderName: formData.folderName.trim(),
          title: formData.title,
          excerpt: formData.excerpt,
          description: formData.description,
          category: formData.category,
          date: formData.date,
          location: formData.location,
          eventDate: formData.eventDate,
          coverImage: formData.coverImage,
          addToLibrary: formData.addToLibrary,
          addToBlogs: formData.addToBlogs
        })
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to save event');
      }

      // Update local folder list
      const existingFolders = JSON.parse(localStorage.getItem('eventFolders') || '[]');
      const cleanFolderName = formData.folderName.trim();
      if (!existingFolders.includes(cleanFolderName)) {
        localStorage.setItem('eventFolders', JSON.stringify([cleanFolderName, ...existingFolders]));
      }

      alert('Event uploaded successfully! All images and metadata are now in Cloudinary.');
      
      // Reset form
      setFormData({
        folderName: '',
        title: '',
        excerpt: '',
        description: '',
        category: 'Wedding',
        date: new Date().toISOString().split('T')[0],
        location: '',
        eventDate: '',
        coverImage: '',
        galleryImages: [],
        addToLibrary: true,
        addToBlogs: true,
      });
      setShowForm(false);
    } catch (error: any) {
      setUploadError(error.message || 'Failed to upload event');
      console.error('Upload error:', error);
    }
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
            Enter password to manage content
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
    <div className="min-h-screen bg-gray-50">
      <AdminNav onLogout={handleLogout} />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-12 pt-32">
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
              <h2 className="text-2xl font-light mb-4">Upload New Event</h2>
              <p className="text-gray-600 mb-8">
                Upload event photos and update your website sections
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
              >
                <Plus size={20} />
                New Event Upload
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
            <h2 className="text-2xl font-light mb-8">Upload New Event</h2>
            
            {uploadError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between"
              >
                <p className="text-red-600 text-sm">{uploadError}</p>
                <button
                  onClick={() => setUploadError('')}
                  className="text-red-600 hover:text-red-800"
                >
                  <X size={18} />
                </button>
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Cloudinary Folder Name */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium border-b pb-2">Storage Settings</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Folder Name *
                  </label>
                  <input
                    type="text"
                    name="folderName"
                    value={formData.folderName}
                    onChange={handleInputChange}
                    placeholder="e.g., sarah-john-wedding-2024"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black transition-colors"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    All images will be organized in this folder in Cloudinary
                  </p>
                </div>
              </div>

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
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                        className="inline-flex items-center justify-between w-full text-gray-900 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none transition-all whitespace-nowrap"
                      >
                        {formData.category}
                        <svg className="w-4 h-4 ms-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isCategoryOpen && (
                        <div className="absolute z-50 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg w-full">
                          <ul className="p-2 text-sm text-gray-700 font-medium">
                            {categories.map(cat => (
                              <li key={cat}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFormData({ ...formData, category: cat });
                                    setIsCategoryOpen(false);
                                  }}
                                  className="inline-flex items-center w-full p-2 hover:bg-gray-100 hover:text-gray-900 rounded transition-colors text-left whitespace-nowrap"
                                >
                                  {cat}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
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
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium border-b pb-2">Cover Image</h3>
                
                <div className="space-y-3">
                  {!formData.coverImage ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                      <p className="text-gray-600 mb-4">Upload cover image from your device</p>
                      <ImageUploader
                        onUploadComplete={handleCoverImageUpload}
                        onError={handleUploadError}
                        folder={formData.folderName || 'events'}
                      />
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={formData.coverImage}
                        alt="Cover preview"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, coverImage: '' })}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    This image will be displayed in the blog list
                  </p>
                </div>
              </div>

              {/* Gallery Images */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="text-lg font-medium">Gallery Images</h3>
                  <span className="text-sm text-gray-500">
                    {formData.galleryImages.length} image(s)
                  </span>
                </div>

                {/* Upload new gallery image */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto mb-3 text-gray-400" size={40} />
                  <p className="text-gray-600 mb-3 text-sm">Select up to 8 images at once</p>
                  <ImageUploader
                    onUploadComplete={handleGalleryImageUpload}
                    onError={handleUploadError}
                    folder={formData.folderName || 'events'}
                    multiple={true}
                    maxFiles={8}
                  />
                </div>

                {/* Display uploaded gallery images */}
                {formData.galleryImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    {formData.galleryImages.map((image, index) => (
                      <div key={`${image}-${index}`} className="relative group">
                        <img
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full 
                                   opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white 
                                      px-2 py-1 rounded text-xs">
                          Image {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <p className="text-xs text-gray-500">
                  Add 4-8 high-quality images from the event
                </p>
              </div>

              {/* Where to Display */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium border-b pb-2">Display Sections</h3>
                <p className="text-sm text-gray-600">Select where this event should appear</p>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.addToBlogs}
                      onChange={() => handleCheckboxChange('addToBlogs')}
                      className="w-5 h-5 accent-black cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="font-medium">Blogs Page</div>
                      <div className="text-sm text-gray-500">Show as a blog post with full details</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.addToLibrary}
                      onChange={() => handleCheckboxChange('addToLibrary')}
                      className="w-5 h-5 accent-black cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="font-medium">Library</div>
                      <div className="text-sm text-gray-500">Add to photography library</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  Upload Event
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
