'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  variant = 'primary',
  size = 'md',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (e.clientX - centerX) * 0.3;
    const distY = (e.clientY - centerY) * 0.3;
    setPos({ x: distX, y: distY });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  const baseClasses =
    'relative inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 rounded-full overflow-hidden group';

  const variantClasses = {
    primary:
      'bg-accent-red text-white hover:shadow-[0_0_30px_rgba(255,42,42,0.4)] border border-accent-red/50',
    secondary:
      'bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] hover:border-accent-red hover:shadow-[0_0_20px_rgba(255,42,42,0.15)]',
    ghost:
      'bg-transparent text-[var(--text-primary)] hover:text-accent-red',
  };

  const sizeClasses = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-7 py-3 text-base',
    lg: 'px-9 py-4 text-lg',
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
    >
      {/* Hover glow */}
      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
