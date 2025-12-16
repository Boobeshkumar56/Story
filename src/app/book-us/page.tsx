'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook, Calendar, Clock } from 'lucide-react';

export default function BookUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    eventType: '',
    location: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const services = [
    {
      title: 'Weddings',
      description: 'Complete wedding day coverage with a storytelling approach',
      features: ['Full day coverage', '300+ edited images', 'Online gallery', 'Print release'],
    },
    {
      title: 'Portraits',
      description: 'Personal and intimate portrait sessions',
      features: ['2-hour session', '50+ edited images', 'Styling consultation', 'Location scouting'],
    },
    {
      title: 'Events',
      description: 'Corporate and social event photography',
      features: ['Event coverage', '100+ edited images', 'Same day previews', 'Digital delivery'],
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <section className="pt-12 pb-16 px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-light tracking-[0.1em] mb-6">
              BOOK YOUR SESSION
            </h1>
            <p className="text-lg tracking-[0.2em] text-gray-600 mb-8">
              LET&apos;S CREATE SOMETHING BEAUTIFUL TOGETHER
            </p>
            <div className="w-24 h-px bg-black mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-lg leading-relaxed text-gray-700 mb-8">
              Whether it&apos;s your wedding day, a portrait session, or a special event, 
              I&apos;m here to capture your most precious moments with creativity and passion. 
              Let&apos;s discuss how we can tell your unique story together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-8 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-[0.15em] mb-6 text-black">
              WHAT I OFFER
            </h2>
            <div className="w-24 h-px bg-gray-400 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden bg-white border border-gray-200 hover:border-gray-400 transition-all duration-500 p-12"
              >
                {/* Number */}
                <div className="absolute top-8 right-8 text-6xl font-light text-gray-200 group-hover:text-gray-300 transition-colors">
                  0{index + 1}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-light tracking-[0.15em] mb-6 border-b border-gray-200 pb-4 text-black">
                    {service.title.toUpperCase()}
                  </h3>
                  
                  <p className="text-gray-600 mb-8 leading-relaxed font-light">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-4">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3 text-sm text-gray-700"
                      >
                        <span className="text-black mt-1">→</span>
                        <span className="tracking-wide">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16 pt-16 border-t border-gray-200"
          >
            <p className="text-gray-600 text-lg mb-6 font-light">
              Each package can be customized to fit your unique needs
            </p>
            <Link
              href="#contact"
              className="inline-block border border-black text-black px-12 py-4 text-sm tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300"
            >
              LET&apos;S DISCUSS
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-8 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-light tracking-[0.1em] mb-8">
                GET IN TOUCH
              </h3>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start space-x-4">
                  <Mail className="text-gray-600 mt-1" size={20} />
                  <div>
                    <p className="font-light text-lg">Email</p>
                    <p className="text-gray-600">hello@mithuashwin.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="text-gray-600 mt-1" size={20} />
                  <div>
                    <p className="font-light text-lg">Phone</p>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="text-gray-600 mt-1" size={20} />
                  <div>
                    <p className="font-light text-lg">Location</p>
                    <p className="text-gray-600">Coonoor, Nilgiris, Tamil Nadu</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Calendar size={18} />
                  <span className="text-sm tracking-wide">Available 7 days a week</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Clock size={18} />
                  <span className="text-sm tracking-wide">Response within 24 hours</span>
                </div>
              </div>

              <div className="mt-12">
                <div className="flex space-x-6">
                  <a
                    href="https://instagram.com/mithuashwin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    <Instagram size={24} />
                  </a>
                  <a
                    href="https://facebook.com/mithuashwin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    <Facebook size={24} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-black transition-colors bg-transparent text-lg"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email Address"
                      className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-black transition-colors bg-transparent text-lg"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-black transition-colors bg-transparent text-lg"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-black transition-colors bg-transparent text-lg"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-gray-600 transition-colors bg-transparent text-lg font-medium cursor-pointer hover:border-gray-600"
                      required
                    >
                      <option value="">Event Type</option>
                      <option value="wedding">Wedding</option>
                      <option value="portrait">Portrait Session</option>
                      <option value="event">Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Event Location"
                      className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-black transition-colors bg-transparent text-lg"
                      required
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell me about your vision and any special requirements..."
                    className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:outline-none focus:border-black transition-colors bg-transparent text-lg resize-none"
                  />
                </div>

                <div className="pt-8">
                  <button
                    type="submit"
                    className="w-full border border-black py-4 text-sm tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300"
                  >
                    SEND MESSAGE
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}