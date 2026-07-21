'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { contactData } from '@/lib/data';

const TERMINAL_LINES = [
  { prompt: '$ status --availability', response: `→ ${contactData.availability}`, delay: 0 },
  { prompt: '$ location', response: `→ ${contactData.location} 🇮🇳`, delay: 0.8 },
  { prompt: '$ response-time', response: `→ ${contactData.responseTime}`, delay: 1.6 },
  { prompt: '$ contact --preferred', response: `→ ${contactData.email}`, delay: 2.4 },
];

export default function ContactSection() {
  const [visibleLines, setVisibleLines] = useState(0);

  // Typewriter effect on mount when in view
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    if (visibleLines >= TERMINAL_LINES.length) return;

    const timer = setTimeout(() => {
      setVisibleLines((prev) => prev + 1);
    }, 800);

    return () => clearTimeout(timer);
  }, [visibleLines, started]);

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="section-header text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-label mb-3"
          >
            Get in Touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-display-sm mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Let&apos;s Build
            <br />
            <span className="text-[var(--accent)]">Something Great</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-section-subtitle mx-auto"
          >
            Have an idea, a project, or just want to connect? I&apos;m always open to conversations about AI, data, and building products.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            onViewportEnter={() => setStarted(true)}
          >
            <div className="rounded-2xl border border-[var(--border-color)] bg-[rgba(10,10,10,0.8)] overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-color)]">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-2 text-[11px] text-[var(--text-muted)] font-mono">
                  kanishk@portfolio ~ 
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-5 font-mono text-sm space-y-3 min-h-[240px]">
                {TERMINAL_LINES.map((line, index) => (
                  <div key={index}>
                    {index <= visibleLines && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-[var(--text-muted)]">{line.prompt}</div>
                        {index < visibleLines && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-[var(--text-secondary)] ml-2 mt-0.5"
                          >
                            {line.response}
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </div>
                ))}

                {/* Cursor */}
                {visibleLines >= TERMINAL_LINES.length && (
                  <div className="flex items-center gap-1 mt-2 text-[var(--text-muted)]">
                    <span>$</span>
                    <span
                      className="w-2 h-4 bg-[var(--accent)]"
                      style={{ animation: 'terminal-blink 1s infinite' }}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* CTA Side */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            {/* Social links */}
            <div className="space-y-4 mb-8">
              {[
                {
                  label: 'Email',
                  value: contactData.email,
                  href: `mailto:${contactData.email}`,
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  ),
                },
                {
                  label: 'LinkedIn',
                  value: 'linkedin.com/in/kanishkkaram',
                  href: contactData.linkedin,
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
                {
                  label: 'GitHub',
                  value: 'github.com/kanishkkaram',
                  href: contactData.github,
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--glass-bg)] hover:border-[var(--border-hover)] transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--accent-soft)] border border-[rgba(209,0,31,0.1)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                    {social.icon}
                  </div>
                  <div>
                    <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                      {social.label}
                    </div>
                    <div className="text-sm text-[var(--text-primary)] font-medium">
                      {social.value}
                    </div>
                  </div>
                  <svg className="w-4 h-4 ml-auto text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${contactData.email}`}
                className="btn-primary"
              >
                Send Email
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
              <a
                href={contactData.resumeUrl}
                className="btn-secondary"
              >
                Download Resume
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
