'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  glowOnHover?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  tilt = true,
  glowOnHover = true,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        tilt
          ? { rotateX, rotateY, transformPerspective: 1000 }
          : {}
      }
      className={`
        relative rounded-2xl overflow-hidden
        bg-[var(--glass-bg)]
        backdrop-blur-xl
        border border-[var(--glass-border)]
        ${glowOnHover ? 'hover:shadow-[0_0_40px_rgba(255,42,42,0.1)]' : ''}
        transition-shadow duration-500
        ${className}
      `}
    >
      {/* Gradient shine overlay */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-transparent" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
