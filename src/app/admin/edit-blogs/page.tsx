'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Trash2, Eye, Heart, Image as ImageIcon, X, Save } from 'lucide-react';
import Image from 'next/image';
import AdminNav from '@/components/AdminNav';

interface Blog {
  id: string;
  folderName: string;
  title: string;
  excerpt: string;
  description: string;
  category: string;
  date: string;
  coverImage: string;
  likes: number;
  views: number;
  addToRecentWorks: boolean;
  addToLibrary: boolean;
  addToBlogs: boolean;
}

export default function EditBlogs() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [folderImages, setFolderImages] = useState<Array<{ url: string; publicId: string }>>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  
  const categories = ['Wedding', 'Pre-Wedding', 'Portrait', 'Event'];

  useEffect(() => {
    // Check authentication
    const authStatus = localStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadBlogs();
    } else {
      router.push('/admin/blogs');
    }
  }, [router]);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const eventFolders = JSON.parse(localStorage.getItem('eventFolders') || '[]');
      
      const blogsData = await Promise.all(
        eventFolders.map(async (folderName: string) => {
          try {
            const response = await fetch(`/api/metadata?folder=${folderName}`);
            const result = await response.json();
            
            if (result.success) {
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

      const validBlogs = blogsData.filter((blog): blog is Blog => blog !== null);
      setBlogs(validBlogs);
    } catch (error) {
      console.error('Error loading blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/home');
  };

  const handleEdit = async (blog: Blog) => {
    setEditingBlog(blog);
    setShowEditModal(true);
    
    // Load images for this folder
    try {
      setLoadingImages(true);
      const response = await fetch(`/api/folder-images?folder=${encodeURIComponent(blog.folderName)}`);
      const result = await response.json();
      if (result.success) {
        setFolderImages(result.images);
      }
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoadingImages(false);
    }
  };

  const handleDelete = async (folderName: string) => {
    if (!confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      return;
    }

    try {
      // Remove from localStorage
      const eventFolders = JSON.parse(localStorage.getItem('eventFolders') || '[]');
      const updatedFolders = eventFolders.filter((f: string) => f !== folderName);
      localStorage.setItem('eventFolders', JSON.stringify(updatedFolders));

      // Update state
      setBlogs(blogs.filter(b => b.folderName !== folderName));
      
      alert('Blog deleted successfully! Note: Images in Cloudinary need to be deleted manually from the Cloudinary dashboard.');
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    }
  };

  const handleDeleteImage = async (publicId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch('/api/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId })
      });

      if (response.ok) {
        setFolderImages(folderImages.filter(img => img.publicId !== publicId));
        alert('Image deleted successfully!');
      } else {
        alert('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
    }
  };

  const handleSaveEdit = async () => {
    if (!editingBlog) return;

    try {
      const response = await fetch('/api/metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          folderName: editingBlog.folderName,
          title: editingBlog.title,
          excerpt: editingBlog.excerpt,
          description: editingBlog.description,
          category: editingBlog.category,
          date: editingBlog.date,
          coverImage: editingBlog.coverImage,
          addToRecentWorks: editingBlog.addToRecentWorks,
          addToLibrary: editingBlog.addToLibrary,
          addToBlogs: editingBlog.addToBlogs,
        })
      });

      const result = await response.json();

      if (result.success) {
        alert('Blog updated successfully!');
        setShowEditModal(false);
        setEditingBlog(null);
        loadBlogs();
      } else {
        alert('Failed to update blog: ' + result.error);
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Failed to update blog');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav onLogout={handleLogout} />

      <div className="pt-24 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-light tracking-wide mb-2">Edit Blogs</h1>
            <p className="text-gray-600">Manage and edit all your published events</p>
          </motion.div>

          {/* Blogs Grid */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
              <ImageIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <p className="text-xl text-gray-600">No blogs yet</p>
              <p className="text-gray-500 mt-2">Create your first event from the Home tab</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredId(blog.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Action Buttons */}
                    <AnimatePresence>
                      {hoveredId === blog.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className="absolute inset-0 flex items-center justify-center gap-3"
                        >
                          <button
                            onClick={() => handleEdit(blog)}
                            className="bg-white text-black p-3 rounded-full hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-110"
                          >
                            <Edit2 size={20} />
                          </button>
                          <button
                            onClick={() => handleDelete(blog.folderName)}
                            className="bg-white text-red-600 p-3 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                          >
                            <Trash2 size={20} />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <span className="text-xs text-gray-500 tracking-wider">{blog.category.toUpperCase()}</span>
                    <h3 className="text-lg font-light mt-2 mb-2 line-clamp-2">{blog.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{blog.excerpt}</p>
                    
                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Heart size={14} />
                        {blog.likes || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {blog.views || 0}
                      </span>
                    </div>

                    {/* Badges */}
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {blog.addToBlogs && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Blog</span>
                      )}
                      {blog.addToRecentWorks && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Recent</span>
                      )}
                      {blog.addToLibrary && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Library</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && editingBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                <h2 className="text-2xl font-light">Edit Blog</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={editingBlog.title}
                    onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Excerpt</label>
                  <input
                    type="text"
                    value={editingBlog.excerpt}
                    onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={editingBlog.description}
                    onChange={(e) => setEditingBlog({ ...editingBlog, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                        className="inline-flex items-center justify-between w-full text-gray-900 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none transition-all whitespace-nowrap"
                      >
                        {editingBlog.category}
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
                                    setEditingBlog({ ...editingBlog, category: cat });
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
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <input
                      type="date"
                      value={editingBlog.date}
                      onChange={(e) => setEditingBlog({ ...editingBlog, date: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingBlog.addToBlogs}
                      onChange={(e) => setEditingBlog({ ...editingBlog, addToBlogs: e.target.checked })}
                      className="w-5 h-5 accent-black cursor-pointer"
                    />
                    <span className="text-sm">Show in Blogs</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingBlog.addToLibrary}
                      onChange={(e) => setEditingBlog({ ...editingBlog, addToLibrary: e.target.checked })}
                      className="w-5 h-5 accent-black cursor-pointer"
                    />
                    <span className="text-sm">Add to Library</span>
                  </label>
                </div>

                {/* Images Gallery */}
                <div>
                  <label className="block text-sm font-medium mb-3">Folder Images</label>
                  {loadingImages ? (
                    <div className="text-center py-8 text-gray-500">Loading images...</div>
                  ) : folderImages.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No images found</div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-96 overflow-y-auto p-2 border border-gray-200 rounded-lg">
                      {folderImages.map((image) => (
                        <div key={image.publicId} className="relative group aspect-square">
                          <Image
                            src={image.url}
                            alt="Blog image"
                            fill
                            className="object-cover rounded-lg"
                          />
                          <button
                            onClick={() => handleDeleteImage(image.publicId)}
                            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                            title="Delete image"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSaveEdit}
                  className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-light tracking-wide"
                >
                  <Save size={20} />
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
