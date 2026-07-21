'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { featuredProjects, universeProjects } from '@/lib/data';

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'cv', label: 'Computer Vision' },
  { key: 'ml', label: 'Machine Learning' },
  { key: 'dl', label: 'Deep Learning' },
  { key: 'data', label: 'Data Analysis' },
];

export default function FeaturedProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredUniverse = activeFilter === 'all'
    ? universeProjects
    : universeProjects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="section-container-wide">
        {/* Header */}
        <div className="section-header text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-label mb-3"
          >
            Selected Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-section-title mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-section-subtitle mx-auto"
          >
            Building intelligent systems, not just ML models.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {featuredProjects.map((project, index) => {
            const isLarge = project.featured;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group ${isLarge ? 'md:col-span-2 lg:col-span-2' : ''}`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div
                  className="relative h-full rounded-2xl border border-[var(--border-color)] overflow-hidden transition-all duration-500 hover:border-[var(--border-hover)]"
                  style={{ background: project.gradient }}
                >
                  {/* Content */}
                  <div className={`p-6 md:p-8 flex flex-col h-full ${isLarge ? 'min-h-[320px]' : 'min-h-[280px]'}`}>
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-4">
                      {project.metrics && (
                        <span className="text-[11px] font-medium tracking-wider uppercase text-[var(--text-muted)] px-3 py-1 rounded-full border border-[var(--border-color)]">
                          {project.metrics}
                        </span>
                      )}
                      {/* Arrow icon */}
                      <motion.div
                        animate={{
                          x: hoveredProject === project.id ? 4 : 0,
                          y: hoveredProject === project.id ? -4 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-8 h-8 rounded-full border border-[var(--border-color)] flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:border-[var(--accent)] transition-all duration-300"
                      >
                        <svg className="w-3.5 h-3.5 text-[var(--text-secondary)] group-hover:text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Bottom content */}
                    <div>
                      <h3
                        className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2 tracking-tight"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-body-sm mb-5 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.techStack.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-medium text-[var(--text-muted)] px-2.5 py-1 rounded-md bg-[rgba(255,255,255,0.03)] border border-[var(--border-color)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Links — revealed on hover */}
                      <motion.div
                        initial={false}
                        animate={{
                          height: hoveredProject === project.id ? 'auto' : 0,
                          opacity: hoveredProject === project.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-3 pt-1">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5"
                            >
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                              </svg>
                              Source
                            </a>
                          )}
                          {project.liveDemo && project.liveDemo !== '#' && (
                            <a
                              href={project.liveDemo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                              </svg>
                              Live Demo
                            </a>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(209,0,31,0.04), transparent 40%)',
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* === Other Projects === */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h3 className="text-heading text-[var(--text-primary)] mb-3">
              More Projects
            </h3>
            <p className="text-body-sm max-w-lg mx-auto">
              Exploring CV, ML, deep learning, and data analysis through hands-on projects.
            </p>
          </motion.div>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 border ${
                  activeFilter === cat.key
                    ? 'bg-[var(--accent-soft)] border-[rgba(209,0,31,0.3)] text-[var(--accent)]'
                    : 'border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--border-hover)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Mini cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-w-5xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredUniverse.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <div className="p-4 rounded-xl border border-[var(--border-color)] hover:border-[var(--border-hover)] transition-all duration-300 bg-[var(--glass-bg)]">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-[10px] font-semibold tracking-wider uppercase text-[var(--accent)]">
                        {project.category.toUpperCase()}
                      </span>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-60 transition-opacity">
                          <svg className="w-3.5 h-3.5 text-[var(--text-muted)]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1.5 leading-tight">
                      {project.title}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-[10px] text-[var(--text-muted)] px-2 py-0.5 rounded bg-[rgba(255,255,255,0.02)] border border-[var(--border-color)]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
