'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-[var(--glass-bg)] backdrop-blur-sm border border-[var(--glass-border)] p-0.5 cursor-pointer focus:outline-none"
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Sliding knob */}
      <motion.div
        className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
        animate={{
          x: theme === 'dark' ? 0 : 26,
          backgroundColor: theme === 'dark' ? '#1a1a2e' : '#fbbf24',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <motion.span
          animate={{ rotate: theme === 'dark' ? 0 : 180 }}
          transition={{ duration: 0.5 }}
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </motion.span>
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{
          boxShadow:
            theme === 'dark'
              ? '0 0 10px rgba(100, 100, 255, 0.2)'
              : '0 0 10px rgba(251, 191, 36, 0.3)',
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
}
