// ============================================================
// Animation Presets — Framer Motion Variants & GSAP Configs
// ============================================================

import type { Variants } from 'framer-motion';

// ============================================================
// FRAMER MOTION VARIANTS
// ============================================================

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.1,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, delay: i * 0.15 },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

// Character-by-character text reveal
export const charReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.03,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

// Word-by-word text reveal
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 30, rotateX: -40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

// Card hover effect
export const cardHover = {
  rest: {
    scale: 1,
    boxShadow: '0 0 0 rgba(255, 42, 42, 0)',
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 0 30px rgba(255, 42, 42, 0.15)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

// Glow pulse
export const glowPulse: Variants = {
  hidden: { opacity: 0.4 },
  visible: {
    opacity: [0.4, 0.8, 0.4],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

// Floating animation
export const float: Variants = {
  hidden: { y: 0 },
  visible: {
    y: [-10, 10, -10],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
};

// Page transition
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4 },
  },
};

// Navbar animations
export const navVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  },
};

// Timeline line draw
export const lineGrow: Variants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.5, ease: [0.25, 0.4, 0.25, 1] },
  },
};

// ============================================================
// GSAP SCROLL TRIGGER DEFAULTS
// ============================================================

export const gsapScrollDefaults = {
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse',
};

export const gsapScrubDefaults = {
  start: 'top top',
  end: 'bottom bottom',
  scrub: 1,
};
