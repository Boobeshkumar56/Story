'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Phone, Mail, Camera, Heart, Star, Check } from 'lucide-react';
import { useState } from 'react';

export default function BookUs() {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    package: '',
    message: ''
  });

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

  const packages = [
    {
      id: 1,
      name: "Portrait Session",
      duration: "2 hours",
      description: "Perfect for individual or couple portraits in natural settings",
      features: [
        "2-hour photo session",
        "30+ edited high-resolution images",
        "Online gallery access",
        "Personal styling consultation",
        "Location scouting"
      ],
      popular: false
    },
    {
      id: 2,
      name: "Event Photography",
      duration: "4-6 hours",
      description: "Comprehensive coverage for your special events and celebrations",
      features: [
        "Full event coverage",
        "100+ edited high-resolution images",
        "Online gallery with download",
        "Second photographer included",
        "Same-day preview images",
        "Photo slideshow"
      ],
      popular: true
    },
    {
      id: 3,
      name: "Wedding Package",
      duration: "Full day",
      description: "Complete wedding day coverage with premium service",
      features: [
        "Full wedding day coverage",
        "Engagement session included",
        "300+ edited high-resolution images",
        "Wedding album design",
        "USB drive with all images",
        "Two photographers",
        "Bridal preparation coverage"
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      type: "Wedding",
      rating: 5,
      text: "Absolutely stunning work! They captured every precious moment of our wedding day. The attention to detail and emotional storytelling through photos was incredible.",
      image: "/api/placeholder/80/80"
    },
    {
      id: 2,
      name: "Mike Chen",
      type: "Portrait",
      rating: 5,
      text: "Professional, creative, and so much fun to work with. The portrait session was comfortable and the results exceeded our expectations completely.",
      image: "/api/placeholder/80/80"
    },
    {
      id: 3,
      name: "Emily Davis",
      type: "Event",
      rating: 5,
      text: "They made our corporate event look amazing! Great communication, punctual, and delivered beautiful photos that perfectly captured the essence of our celebration.",
      image: "/api/placeholder/80/80"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-extralight mb-8 tracking-wide leading-tight"
          >
            <span className="block text-white font-thin">BOOK YOUR</span>
            <span className="block text-gray-300 font-extralight mt-2">SESSION</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto font-light tracking-wide leading-relaxed"
          >
            Let's create beautiful memories together. Choose from our packages or contact us for a custom consultation
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <div className="flex items-center gap-2 text-gray-300">
              <Calendar className="text-gray-400" size={20} />
              <span>Available 7 days a week</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Clock className="text-gray-400" size={20} />
              <span>Quick response time</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Animated floating elements */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 text-white/30"
        >
          <Camera size={80} strokeWidth={0.5} />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -3, 3, 0],
            scale: [1, 0.95, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 left-20 text-white/20"
        >
          <Camera size={60} strokeWidth={0.5} />
        </motion.div>

        
      </section>

      {/* Packages Section */}
      <section className="py-20 px-4 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
            >
              Photography Packages
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Choose the perfect package for your needs. All packages include professional editing and high-resolution images
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`relative bg-white shadow-xl overflow-hidden cursor-pointer ${
                  pkg.popular ? 'ring-2 ring-black' : ''
                }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                {pkg.popular && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="absolute top-0 left-0 right-0 bg-black text-white text-center py-2 z-10"
                  >
                    <span className="text-sm font-light tracking-widest">
                      MOST POPULAR
                    </span>
                  </motion.div>
                )}

                <div className={`p-8 ${pkg.popular ? 'pt-16' : ''}`}>
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-light text-gray-900 mb-3 tracking-wide">{pkg.name.toUpperCase()}</h3>
                    <p className="text-gray-500 font-light tracking-wide">{pkg.duration}</p>
                  </div>

                  <p className="text-gray-600 mb-8 text-center font-light leading-relaxed">{pkg.description}</p>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                      >
                        <Check className="text-black flex-shrink-0" size={16} strokeWidth={1} />
                        <span className="text-gray-700 font-light">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 font-light text-lg tracking-wide transition-all duration-300 ${
                      pkg.popular
                        ? 'bg-black text-white hover:bg-gray-800'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pkg.popular ? 'SELECT PACKAGE' : 'INQUIRE NOW'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Booking Form */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-4 text-gray-900"
            >
              Ready to Book?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600"
            >
              Fill out the form below and we'll get back to you within 24 hours
            </motion.p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all font-light"
                  placeholder="Your full name"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all font-light"
                  placeholder="your@email.com"
                  required
                />
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all font-light"
                  placeholder="(555) 123-4567"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <label className="block text-gray-700 font-medium mb-2">Preferred Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all font-light"
                  required
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <label className="block text-gray-700 font-medium mb-2">Package</label>
              <select
                name="package"
                value={formData.package}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all font-light"
                required
              >
                <option value="">Select a package</option>
                <option value="portrait">Portrait Session</option>
                <option value="event">Event Photography</option>
                <option value="wedding">Wedding Package</option>
                <option value="custom">Custom Consultation</option>
              </select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all resize-none font-light"
                placeholder="Tell us about your vision, location preferences, and any special requirements..."
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-black text-white py-4 font-light text-lg tracking-widest hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              SEND BOOKING REQUEST
            </motion.button>
          </motion.form>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-4 text-gray-900"
            >
              What Our Clients Say
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600"
            >
              Don't just take our word for it - hear from our happy clients
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.type} Session</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={16} />
                  ))}
                </div>

                <p className="text-gray-700 italic leading-relaxed font-serif text-lg">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Info */}
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
            className="text-4xl font-bold mb-8"
          >
            Get in Touch
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-center"
            >
              <Phone className="text-blue-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-300">(555) 123-4567</p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-center"
            >
              <Mail className="text-blue-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-300">hello@stories.com</p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-center"
            >
              <MapPin className="text-blue-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="text-gray-300">New York, NY</p>
            </motion.div>
          </motion.div>
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
                <Heart className="text-gray-400 hover:text-white transition-colors cursor-pointer" size={20} />
                <Star className="text-gray-400 hover:text-white transition-colors cursor-pointer" size={20} />
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
                  <span className="text-gray-400 font-light">0000000000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-gray-400 font-light">hello@stories.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-gray-400" />
                  <span className="text-gray-400 font-light">Tamil Nadu, TN</span>
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
              © 2025 Stories. All rights reserved. | Crafted with passion for photography
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
