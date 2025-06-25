"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaRocket, FaLightbulb, FaStar, FaUsers, FaCode } from 'react-icons/fa';

interface HeroData {
  title: string;
  subtitle: string;
  imageUrl: string;
}

const DEFAULT_BG = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80";

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 2);
      const currentCount = Math.floor(progress * value);
      setCount(currentCount);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [value, duration]);

  return (
    <span className="text-3xl font-bold text-white mb-2">
      {count}{suffix}
    </span>
  );
};

const Hero = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const res = await fetch("https://craft-server-opal.vercel.app/api/hero");
        const data = await res.json();
        setHeroData(data);
      } catch (error) {
        console.error('Failed to fetch hero data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // Mouse move effect for dynamic background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (loading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 animate-pulse"></div>
        <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        <div className="relative z-10 text-center text-white">
          <div className="w-64 h-8 bg-white/20 rounded-lg mb-4 animate-pulse"></div>
          <div className="w-96 h-6 bg-white/20 rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Background Image with Parallax Effect */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: `url(${heroData?.imageUrl || DEFAULT_BG})`,
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) scale(1.1)`
        }}
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Dynamic Gradient Overlays - Blue Theme */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-blue-800/40 to-blue-700/60"
        animate={{
          background: isHovered 
            ? "linear-gradient(to bottom right, rgba(30, 58, 138, 0.6), rgba(37, 99, 235, 0.5), rgba(59, 130, 246, 0.7))"
            : "linear-gradient(to bottom right, rgba(30, 58, 138, 0.5), rgba(37, 99, 235, 0.4), rgba(59, 130, 246, 0.6))"
        }}
        transition={{ duration: 0.5 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 via-transparent to-blue-900/20"></div>
      
      {/* Dynamic Animated Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
        animate={{
          opacity: isHovered ? 0.3 : 0.2,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Interactive Floating Elements - Blue Theme */}
      <motion.div 
        className="absolute top-20 left-10 opacity-20 cursor-pointer"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ 
          scale: 1.2, 
          opacity: 0.8,
          rotate: 15
        }}
      >
        <FaRocket className="text-4xl text-blue-300" />
      </motion.div>
      
      <motion.div 
        className="absolute top-32 right-20 opacity-20 cursor-pointer"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        whileHover={{ 
          scale: 1.3, 
          opacity: 0.9,
          rotate: -15
        }}
      >
        <FaLightbulb className="text-3xl text-blue-200" />
      </motion.div>

      <motion.div 
        className="absolute bottom-32 left-20 opacity-20 cursor-pointer"
        animate={{ 
          y: [0, -8, 0],
          x: [0, 5, 0],
        }}
        transition={{ 
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        whileHover={{ 
          scale: 1.2, 
          opacity: 0.8,
        }}
      >
        <FaStar className="text-2xl text-blue-300" />
      </motion.div>
      
      {/* Main Content with Scroll-based Animations */}
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto text-center px-6"
        style={{ y, opacity, scale }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {/* Dynamic Badge - Blue Theme */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full px-6 py-2  cursor-pointer shadow-lg"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <FaRocket className="text-white" />
            </motion.div>
            <span className="text-white text-sm font-semibold drop-shadow-md">Innovation at its finest</span>
          </motion.div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-6xl font-extrabold text-white mb-2 leading-tight drop-shadow-2xl"
        >
          <motion.span 
            className="text-white/90 drop-shadow-lg"
            animate={{
              textShadow: isHovered 
                ? "0 4px 8px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)" 
                : "0 2px 4px rgba(0, 0, 0, 0.6), 0 1px 2px rgba(0, 0, 0, 0.4)"
            }}
            transition={{ duration: 0.8 }}
            style={{
              textShadow: "0 4px 8px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)",
            }}
          >
            {heroData?.title || "Welcome to Your Unique Corporate Site"}
          </motion.span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-lg text-white/70 font-semibold mb-8 max-w-3xl mx-auto leading-relaxed"
          style={{
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.8), 0 1px 2px rgba(0, 0, 0, 0.6)",
          }}
        >
          {heroData?.subtitle || "Empowering your business with modern web solutions."}
        </motion.p>


        {/* Dynamic Stats Section with Animated Counters - Blue Theme */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-5 mb-5 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          <motion.div 
            className="text-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <FaUsers className="text-white drop-shadow-md" />
              <AnimatedCounter value={33} suffix="+" />
            </div>
            <div className="text-white text-sm font-medium" style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)" }}>Happy Clients</div>
          </motion.div>
          
          <motion.div 
            className="text-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <FaCode className="text-white drop-shadow-md" />
              <AnimatedCounter value={150} suffix="+" />
            </div>
            <div className="text-white text-sm font-medium" style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)" }}>Projects Completed</div>
          </motion.div>
          
          <motion.div 
            className="text-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <FaStar className="text-white drop-shadow-md" />
              <span className="text-3xl font-bold text-white mb-2 drop-shadow-lg">24/7</span>
            </div>
            <div className="text-white text-sm font-medium" style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)" }}>Support Available</div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Dynamic Scroll Indicator - Blue Theme */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-blue-300/50 rounded-full flex justify-center"
          animate={{ 
            borderColor: ["rgba(147, 197, 253, 0.5)", "rgba(147, 197, 253, 0.9)", "rgba(147, 197, 253, 0.5)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="w-1 h-3 bg-blue-300/70 rounded-full mt-2"
            animate={{ 
              y: [0, 12, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
