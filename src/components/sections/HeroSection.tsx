'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { heroData } from '@/lib/data';

export default function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const TOTAL_FRAMES = 300;
  const FRAME_STEP = 2;

  // Preload clip sequence images
  useEffect(() => {
    let mounted = true;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    const framesToLoad = Array.from(
      { length: Math.ceil(TOTAL_FRAMES / FRAME_STEP) },
      (_, i) => i * FRAME_STEP + 1
    );

    framesToLoad.forEach((frameNum) => {
      const img = new Image();
      img.src = `/clips/${String(frameNum).padStart(5, '0')}.png`;
      img.onload = () => {
        if (!mounted) return;
        loadedCount++;
        if (loadedCount >= framesToLoad.length * 0.3) {
          setImagesLoaded(true);
        }
      };
      images[frameNum] = img;
    });

    imagesRef.current = images;
    return () => { mounted = false; };
  }, []);

  // Draw frame on canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const nearestFrame = Math.round(frameIndex / FRAME_STEP) * FRAME_STEP + 1;
    const clamped = Math.max(1, Math.min(nearestFrame, TOTAL_FRAMES));
    const img = imagesRef.current[clamped];

    if (img && img.complete) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    }
  }, []);

  // Scroll-driven frame rendering
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(
        0,
        Math.min(1, -rect.top / (rect.height - window.innerHeight))
      );
      const frameIndex = Math.floor(scrollProgress * (TOTAL_FRAMES - 1));
      drawFrame(frameIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    drawFrame(0);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [drawFrame]);

  // Role cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % heroData.roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative"
      style={{ minHeight: '300vh' }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* === Background effects === */}
        {/* Radial gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(209,0,31,0.06) 0%, transparent 70%)',
          }}
        />
        {/* Ambient top glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(209,0,31,0.04) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* === Main Content === */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Left — Text */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-label mb-6"
            >
              AI Engineer & Product Builder
            </motion.p>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h1 className="text-display mb-2 relative">
                <span className="block text-[var(--text-primary)]">
                  {heroData.firstName}
                </span>
                <span
                  className="block text-[var(--accent)] italic"
                  style={{
                    textShadow: '0 0 80px rgba(209,0,31,0.3), 0 0 160px rgba(209,0,31,0.1)',
                  }}
                >
                  {heroData.lastName}
                </span>
              </h1>
            </motion.div>

            {/* Role cycling */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="h-8 md:h-10 mb-6 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentRole}
                  initial={{ y: 24, opacity: 0, filter: 'blur(4px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -24, opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-lg md:text-xl text-[var(--text-secondary)] font-light tracking-wide"
                >
                  {heroData.roles[currentRole]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-body mb-10 max-w-lg mx-auto lg:mx-0"
            >
              {heroData.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a href="#projects" className="btn-primary">
                {heroData.cta.projects}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
              <a href="#contact" className="btn-secondary">
                {heroData.cta.contact}
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="flex gap-8 mt-12 justify-center lg:justify-start"
            >
              {heroData.stats.map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div
                    className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Scroll-driven canvas */}
          <motion.div
            className="flex-1 relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: imagesLoaded ? 1 : 0.3, scale: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
          >
            {/* Red rim light glow */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                filter: 'blur(40px)',
              }}
            >
              <div
                className="w-[300px] h-[400px] md:w-[400px] md:h-[500px] rounded-full"
                style={{
                  background:
                    'radial-gradient(ellipse, rgba(209,0,31,0.15) 0%, transparent 70%)',
                }}
              />
            </div>

            <canvas
              ref={canvasRef}
              className="w-full max-w-[500px] h-auto relative z-[2]"
              style={{ imageRendering: 'auto' }}
            />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-muted)] font-medium">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-5 h-8 rounded-full border border-[var(--border-color)] flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-1 h-1.5 rounded-full bg-[var(--accent)]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
