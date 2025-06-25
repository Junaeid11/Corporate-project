"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram, ArrowUp } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-2">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 py-10">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <h3 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                CorpCraft
              </h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
              Your trusted partner for innovative business solutions. We help companies 
              grow and succeed in today&apos;s competitive market with cutting-edge technology 
              and strategic insights.
            </p>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              <motion.a
                href="https://www.facebook.com/junaeid.ahmed.tanim"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-blue-600/20 hover:bg-blue-600/40 rounded-xl flex items-center justify-center transition-all duration-300 border border-blue-500/30 hover:border-blue-400/50"
              >
                <Facebook className="w-5 h-5 text-blue-400" />
              </motion.a>
        
              <motion.a
                href="https://www.linkedin.com/in/junaeidahmedtanim"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-blue-600/20 hover:bg-blue-600/40 rounded-xl flex items-center justify-center transition-all duration-300 border border-blue-500/30 hover:border-blue-400/50"
              >
                <Linkedin className="w-5 h-5 text-blue-400" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-blue-600/20 hover:bg-blue-600/40 rounded-xl flex items-center justify-center transition-all duration-300 border border-blue-500/30 hover:border-blue-400/50"
              >
                <Instagram className="w-5 h-5 text-blue-400" />
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
              Contact Info
            </h4>
            <div className="space-y-4">
              <motion.div 
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300"
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Email</p>
                  <p className="text-white font-medium">tanim.junaeidahmed@gmail.com</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300"
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Phone</p>
                  <p className="text-white font-medium">+880 1910-500496</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300"
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Address</p>
                  <p className="text-white font-medium">Agrabad Circle, Chattogram, Bangladesh</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
              Quick Links
            </h4>
            <div className="space-y-3">
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link 
                  href="/" 
                  className="block text-gray-300 hover:text-blue-400 transition-all duration-300 font-medium"
                >
                  Home
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link 
                  href="/contact" 
                  className="block text-gray-300 hover:text-blue-400 transition-all duration-300 font-medium"
                >
                  Contact
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link 
                  href="/admin/dashboard" 
                  className="block text-gray-300 hover:text-blue-400 transition-all duration-300 font-medium"
                >
                  Admin Panel
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <a 
                  href="#services" 
                  className="block text-gray-300 hover:text-blue-400 transition-all duration-300 font-medium"
                >
                  Services
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-gray-700/50 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-center md:text-left">
              © 2025 <span className="text-blue-400 font-semibold">CorpCraft</span>. All rights reserved.
            </p>
            
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ArrowUp className="w-5 h-5 text-white" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
