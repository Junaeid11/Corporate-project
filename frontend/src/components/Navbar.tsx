"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/utils/authContext";
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaHome, FaCogs, FaEnvelope } from "react-icons/fa";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-xl border-b border-blue-200/50 shadow-xl"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent tracking-tight">
                CorpCraft
              </span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-8"
            >
              <Link 
                href="/" 
                className="group flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative"
              >
                <FaHome className="text-sm opacity-70 group-hover:opacity-100 transition-opacity" />
                <span>Home</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
              </Link>
              
            
              
              <Link 
                href="/contact" 
                className="group flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium relative"
              >
                <FaEnvelope className="text-sm opacity-70 group-hover:opacity-100 transition-opacity" />
                <span>Contact</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
              </Link>
            </motion.div>

            {/* Auth Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4"
            >
              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      href="/admin/dashboard" 
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium transition-all duration-300 border border-blue-200 hover:border-blue-300"
                    >
                      <FaUser className="text-sm" />
                      <span>Dashboard</span>
                    </Link>
                  </motion.div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-medium transition-all duration-300 border border-red-200 hover:border-red-300"
                  >
                    <FaSignOutAlt className="text-sm" />
                    <span>Logout</span>
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/auth/login" 
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <FaUser className="text-sm" />
                    <span>Login</span>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-3 rounded-xl hover:bg-gray-100 transition-all duration-300 border border-gray-200"
          >
            {mobileMenuOpen ? (
              <FaTimes className="w-5 h-5 text-gray-700" />
            ) : (
              <FaBars className="w-5 h-5 text-gray-700" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-6 border-t border-gray-200/50">
                <div className="flex flex-col gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link 
                      href="/" 
                      className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium p-3 rounded-xl hover:bg-blue-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaHome className="text-sm" />
                      <span>Home</span>
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <a 
                      href="#services" 
                      className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium p-3 rounded-xl hover:bg-blue-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaCogs className="text-sm" />
                      <span>Services</span>
                    </a>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link 
                      href="/contact" 
                      className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium p-3 rounded-xl hover:bg-blue-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaEnvelope className="text-sm" />
                      <span>Contact</span>
                    </Link>
                  </motion.div>
                  
                  {isLoggedIn ? (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                      className="pt-4 border-t border-gray-200/50 space-y-3"
                    >
                      <Link 
                        href="/admin/dashboard" 
                        className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium p-3 rounded-xl hover:bg-blue-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FaUser className="text-sm" />
                        <span>Dashboard</span>
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 text-red-600 hover:text-red-700 transition-all duration-300 font-medium p-3 rounded-xl hover:bg-red-50 w-full text-left"
                      >
                        <FaSignOutAlt className="text-sm" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                      className="pt-4 border-t border-gray-200/50"
                    >
                      <Link 
                        href="/auth/login" 
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FaUser className="text-sm" />
                        <span>Login</span>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
} 