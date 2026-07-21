'use client';

import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#050505',
        padding: '24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 400,
          background: 'radial-gradient(ellipse, rgba(209,0,31,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* 404 Large Number */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: 'clamp(6rem, 20vw, 14rem)',
          fontWeight: 900,
          letterSpacing: '-0.06em',
          lineHeight: 0.9,
          color: 'rgba(209,0,31,0.08)',
          position: 'relative',
          userSelect: 'none',
          marginBottom: 16,
        }}
      >
        404
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: 700,
          color: '#fff',
          marginBottom: 16,
          letterSpacing: '-0.02em',
        }}
      >
        Lost in the AI Universe?
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          fontSize: 15,
          color: 'rgba(255,255,255,0.5)',
          maxWidth: 400,
          lineHeight: 1.7,
          marginBottom: 40,
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved to a different dimension.
      </motion.p>

      {/* Return Home Button */}
      <motion.a
        href="/"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        whileHover={{
          scale: 1.04,
          boxShadow: '0 8px 32px rgba(209,0,31,0.3)',
        }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '14px 32px',
          fontSize: 14,
          fontWeight: 600,
          color: '#fff',
          background: '#D1001F',
          border: '1px solid rgba(209,0,31,0.6)',
          borderRadius: 10,
          textDecoration: 'none',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        Return Home
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </motion.a>

      {/* Decorative lines */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 4,
        }}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1 + i * 0.15, duration: 0.6 }}
            style={{
              width: 1,
              height: 24 + i * 8,
              background: `rgba(209,0,31,${0.1 + i * 0.08})`,
              borderRadius: 1,
              transformOrigin: 'bottom',
            }}
          />
        ))}
      </div>
    </div>
  );
}
