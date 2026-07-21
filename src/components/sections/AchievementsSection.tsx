'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { achievements } from '@/lib/data';

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 50%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <div className="section-container">
        {/* Header */}
        <div className="section-header text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-label mb-3"
          >
            Milestones
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-section-title mb-4"
          >
            Achievements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-section-subtitle mx-auto"
          >
            Key milestones and recognitions along the journey.
          </motion.p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-[0.5px] top-0 bottom-0 w-[1px] bg-[var(--border-color)]">
            <motion.div
              className="w-full bg-gradient-to-b from-[var(--accent)] to-red-400"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-12 md:space-y-16">
            {achievements.map((achievement, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`relative flex items-start gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot marker */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="w-3 h-3 rounded-full bg-[var(--accent)] border-2 border-[var(--bg)] shadow-[0_0_12px_rgba(209,0,31,0.4)]"
                    />
                  </div>

                  {/* Content card */}
                  <div
                    className={`ml-12 md:ml-0 md:w-[calc(50%-32px)] ${
                      isLeft ? 'md:mr-auto md:pr-4' : 'md:ml-auto md:pl-4'
                    }`}
                  >
                    <div className="p-5 md:p-6 rounded-xl border border-[var(--border-color)] bg-[var(--glass-bg)] hover:border-[var(--border-hover)] transition-all duration-500 group">
                      {/* Year badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold tracking-wider uppercase text-[var(--accent)] px-2.5 py-0.5 rounded-full bg-[var(--accent-soft)] border border-[rgba(209,0,31,0.15)]">
                          {achievement.year}
                        </span>
                        {achievement.impact && (
                          <span className="text-[10px] font-medium tracking-wider uppercase text-[var(--text-muted)]">
                            {achievement.impact}
                          </span>
                        )}
                      </div>

                      {/* Icon + Title */}
                      <div className="flex items-start gap-3 mb-2">
                        <span className="text-xl flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                          {achievement.icon}
                        </span>
                        <h3 className="text-base font-bold text-[var(--text-primary)] leading-tight">
                          {achievement.title}
                        </h3>
                      </div>

                      <p className="text-body-sm ml-8">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
