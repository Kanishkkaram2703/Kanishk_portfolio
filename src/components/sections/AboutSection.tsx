'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AnimatedText from '@/components/ui/AnimatedText';
import { journeyMilestones } from '@/lib/data';

export default function AboutSection() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-20">
          <AnimatedText
            text="The Journey"
            as="h2"
            preset="word"
            className="text-section-title text-[var(--text-primary)] mb-4"
          />
          <AnimatedText
            text="From curious student to AI product builder — every step of the evolution."
            as="p"
            preset="line"
            delay={0.2}
            className="text-section-subtitle max-w-2xl mx-auto"
          />
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 hidden md:block"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.5, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="w-full h-full bg-gradient-to-b from-accent-red/60 via-[var(--border-color)] to-transparent" />
          </motion.div>

          {/* Mobile line (left) */}
          <motion.div
            className="absolute left-6 top-0 bottom-0 w-[1px] md:hidden"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="w-full h-full bg-gradient-to-b from-accent-red/60 via-[var(--border-color)] to-transparent" />
          </motion.div>

          {/* Milestones */}
          <div className="space-y-16 md:space-y-24">
            {journeyMilestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={milestone.title}
                  initial={{
                    opacity: 0,
                    x: isLeft ? -60 : 60,
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  className={`relative flex items-center gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row pl-16 md:pl-0`}
                >
                  {/* Content card */}
                  <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    <div
                      className="glass rounded-2xl p-6 md:p-8 group hover:border-accent-red/30 transition-all duration-500"
                    >
                      <span className="text-xs tracking-[0.2em] uppercase text-accent-red font-medium">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mt-2 mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed text-sm md:text-base">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Center node */}
                  <motion.div
                    className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-12 h-12 flex items-center justify-center"
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-lg border-accent-red/30 border group-hover:glow-red transition-all duration-500">
                      {milestone.icon}
                    </div>
                  </motion.div>

                  {/* Empty space for alternating layout */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-accent-red/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-accent-red/3 blur-3xl pointer-events-none" />
    </section>
  );
}
