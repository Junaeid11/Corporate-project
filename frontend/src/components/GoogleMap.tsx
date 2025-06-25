"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaDirections } from 'react-icons/fa';
import Link from 'next/link';

export default function GoogleMap() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Find Us Here
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Visit our office or get in touch with us. We&apos;re here to help you with all your business needs.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Information Cards */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-1 space-y-6"
        >
          {/* Address Card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <FaMapMarkerAlt className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Our Location</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Agrabad Circle, Chattogram<br />
                  Bangladesh
                </p>
              </div>
            </div>
          </motion.div>

          {/* Phone Card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <FaPhone className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Call Us</h3>
                <p className="text-gray-600 text-sm">
                  +880 1910-500496
                </p>
              </div>
            </div>
          </motion.div>

          {/* Email Card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <FaEnvelope className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Email Us</h3>
                <p className="text-gray-600 text-sm">
                  tanim.junaeidahmed@gmail.com
                </p>
              </div>
            </div>
          </motion.div>

          {/* Hours Card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <FaClock className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Business Hours</h3>
                <p className="text-gray-600 text-sm">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Map Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.6912228865185!2d91.8097484742112!3d22.327514641910554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd9832c9d5cd7%3A0xb7d71d6fd944d7f!2sAgrabad%20Circle%2C%20Chattogram!5e0!3m2!1sen!2sbd!4v1750791368723!5m2!1sen!2sbd"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="transition-all duration-300"
              />
              
              {/* Overlay with company info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 max-w-xs"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <FaMapMarkerAlt className="text-white text-sm" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">CorpCraft</h4>
                    <p className="text-gray-600 text-xs">Agrabad Circle, Chattogram</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-blue-500" />
                    <span>+880 1910-500496</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-blue-500" />
                    <span> tanim.junaeidahmed@gmail.com</span>
                  </div>
                </div>
              </motion.div>

              {/* Directions Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute bottom-4 right-4"
              >
                <motion.a
                  href="https://maps.google.com/maps?q=Agrabad+Circle,+Chattogram"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <FaDirections />
                  Get Directions
                </motion.a>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-600 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-12 text-center"
      >
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Whether you want to visit us in person or connect virtually, we&apos;re here to help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Contact Us
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 