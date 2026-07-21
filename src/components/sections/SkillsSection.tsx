'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillCategories } from '@/lib/data';

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0);

  const active = skillCategories[activeCategory];

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="section-header text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-label mb-3"
          >
            Technical Arsenal
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-section-title mb-4"
          >
            Skills & Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-section-subtitle mx-auto"
          >
            Technologies and tools I use to build intelligent systems.
          </motion.p>
        </div>

        {/* Split Panel Layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 max-w-4xl mx-auto"
        >
          {/* Left — Category Nodes */}
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {skillCategories.map((category, index) => (
              <button
                key={category.title}
                onClick={() => setActiveCategory(index)}
                className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-400 whitespace-nowrap lg:whitespace-normal min-w-fit ${
                  activeCategory === index
                    ? 'bg-[var(--accent-soft)] border border-[rgba(209,0,31,0.2)]'
                    : 'border border-transparent hover:bg-[rgba(255,255,255,0.02)] hover:border-[var(--border-color)]'
                }`}
              >
                {/* Active indicator */}
                {activeCategory === index && (
                  <motion.div
                    layoutId="skill-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full bg-[var(--accent)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="text-xl">{category.icon}</span>
                <div>
                  <div className={`text-sm font-semibold transition-colors ${
                    activeCategory === index
                      ? 'text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)]'
                  }`}>
                    {category.title}
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)] hidden lg:block">
                    {category.skills.length} skills
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right — Detail Panel */}
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--glass-bg)] p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Category header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{active.icon}</span>
                    <h3
                      className="text-xl font-bold text-[var(--text-primary)]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {active.title}
                    </h3>
                  </div>
                  <p className="text-body-sm">{active.description}</p>
                </div>

                {/* Skills with progress rings */}
                <div className="grid gap-3">
                  {active.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.06, duration: 0.4 }}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                    >
                      {/* Circular progress */}
                      <div className="relative w-10 h-10 flex-shrink-0">
                        <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                          <circle
                            cx="18" cy="18" r="15"
                            fill="none"
                            stroke="rgba(255,255,255,0.04)"
                            strokeWidth="3"
                          />
                          <motion.circle
                            cx="18" cy="18" r="15"
                            fill="none"
                            stroke="var(--accent)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 15}`}
                            initial={{ strokeDashoffset: 2 * Math.PI * 15 }}
                            animate={{
                              strokeDashoffset: 2 * Math.PI * 15 * (1 - skill.level / 100),
                            }}
                            transition={{
                              duration: 1,
                              delay: index * 0.1,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-[var(--text-secondary)]">
                            {skill.level}
                          </span>
                        </div>
                      </div>

                      {/* Skill name + bar */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-medium text-[var(--text-primary)]">
                            {skill.name}
                          </span>
                        </div>
                        <div className="w-full h-1 bg-[rgba(255,255,255,0.04)] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-red-400"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{
                              duration: 0.8,
                              delay: index * 0.1,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Related projects */}
                {active.relatedProjects.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-[var(--border-color)]">
                    <p className="text-[11px] font-semibold tracking-wider uppercase text-[var(--text-muted)] mb-2">
                      Used In
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {active.relatedProjects.map((proj) => (
                        <span
                          key={proj}
                          className="text-[11px] text-[var(--text-secondary)] px-2.5 py-1 rounded-md bg-[rgba(255,255,255,0.03)] border border-[var(--border-color)]"
                        >
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
