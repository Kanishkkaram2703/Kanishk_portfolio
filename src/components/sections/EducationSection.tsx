'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import { education } from '@/lib/data';

export default function EducationSection() {
  return (
    <section id="education" className="section-padding relative overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-20">
          <AnimatedText
            text="Education"
            as="h2"
            preset="word"
            className="text-section-title text-[var(--text-primary)] mb-4"
          />
          <AnimatedText
            text="Academic foundations that shaped the journey."
            as="p"
            preset="line"
            delay={0.2}
            className="text-section-subtitle max-w-2xl mx-auto"
          />
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-2xl mx-auto">
          {/* Center line */}
          <motion.div
            className="absolute left-6 md:left-8 top-0 bottom-0 w-[1px]"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="w-full h-full bg-gradient-to-b from-accent-red via-[var(--border-color)] to-transparent" />
          </motion.div>

          <div className="space-y-12">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="relative pl-16 md:pl-20"
              >
                {/* Timeline node */}
                <motion.div
                  className="absolute left-4 md:left-6 top-2 w-4 h-4 md:w-5 md:h-5"
                  whileInView={{ scale: [0, 1.3, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
                >
                  <div className={`w-full h-full rounded-full border-2 ${
                    edu.current
                      ? 'border-accent-red bg-accent-red/20 shadow-[0_0_15px_rgba(255,42,42,0.3)]'
                      : 'border-[var(--border-color)] bg-[var(--surface)]'
                  }`} />
                </motion.div>

                {/* Card */}
                <div className="glass rounded-2xl p-6 md:p-8 hover:border-accent-red/20 transition-all duration-500 group">
                  {edu.current && (
                    <span className="inline-block px-3 py-1 text-xs tracking-[0.15em] uppercase bg-accent-red/10 text-accent-red rounded-full mb-3 border border-accent-red/20">
                      Current
                    </span>
                  )}

                  <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2">
                    {edu.degree}
                  </h3>

                  <p className="text-[var(--text-secondary)] mb-1">
                    {edu.institution}
                  </p>

                  {edu.board && (
                    <p className="text-[var(--text-muted)] text-sm mb-4">
                      {edu.board}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border-color)]">
                    <div>
                      <span className="text-xs tracking-[0.15em] uppercase text-[var(--text-muted)]">
                        {edu.scoreLabel}
                      </span>
                      <p className="text-2xl font-bold text-accent-red mt-1">
                        {edu.score}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs tracking-[0.15em] uppercase text-[var(--text-muted)]">
                        Year
                      </span>
                      <p className="text-lg font-medium text-[var(--text-primary)] mt-1">
                        {edu.year}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
