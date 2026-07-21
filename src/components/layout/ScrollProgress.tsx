'use client';

import React from 'react';
import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[200] origin-left bg-gradient-to-r from-accent-red via-red-400 to-accent-red"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
