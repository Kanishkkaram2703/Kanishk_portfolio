'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  preset?: 'char' | 'word' | 'line';
  delay?: number;
  once?: boolean;
}

export default function AnimatedText({
  text,
  className = '',
  as: Tag = 'p',
  preset = 'word',
  delay = 0,
  once = true,
}: AnimatedTextProps) {
  if (preset === 'char') {
    const chars = text.split('');
    return (
      <Tag className={className}>
        <motion.span
          initial="hidden"
          whileInView="visible"
          viewport={{ once, margin: '-50px' }}
          transition={{ staggerChildren: 0.03, delayChildren: delay }}
          className="inline-block"
        >
          {chars.map((char, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20, rotateX: -40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] },
                },
              }}
              className="inline-block"
              style={{ transformOrigin: 'bottom' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      </Tag>
    );
  }

  if (preset === 'word') {
    const words = text.split(' ');
    return (
      <Tag className={className}>
        <motion.span
          initial="hidden"
          whileInView="visible"
          viewport={{ once, margin: '-50px' }}
          transition={{ staggerChildren: 0.08, delayChildren: delay }}
          className="inline-flex flex-wrap"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
                },
              }}
              className="inline-block mr-[0.3em]"
              style={{ transformOrigin: 'bottom' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.span>
      </Tag>
    );
  }

  // Line preset
  return (
    <Tag className={className}>
      <motion.span
        initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
        whileInView={{
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] },
        }}
        viewport={{ once, margin: '-50px' }}
        className="block"
      >
        {text}
      </motion.span>
    </Tag>
  );
}
