'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certifications } from '@/lib/data';

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  return (
    <section id="certifications" className="section-padding relative overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="section-header text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-label mb-3"
          >
            Credentials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-section-title mb-4"
          >
            Certifications
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-section-subtitle mx-auto"
          >
            Industry-recognized credentials validating expertise.
          </motion.p>
        </div>

        {/* Certification Vault */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.button
                onClick={() => setSelectedCert(index)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="w-full text-left group"
              >
                <div className="relative p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--glass-bg)] overflow-hidden transition-all duration-500 hover:border-[var(--border-hover)]"
                  style={{ perspective: '1000px' }}
                >
                  {/* Corner glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)] opacity-0 group-hover:opacity-[0.03] rounded-full blur-3xl transition-opacity duration-700 pointer-events-none -translate-y-1/2 translate-x-1/2" />

                  <div className="relative z-10 flex items-start gap-4">
                    {/* Badge */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[rgba(209,0,31,0.08)] to-transparent border border-[rgba(209,0,31,0.1)] flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-500">
                      {cert.badge}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-[var(--text-primary)] mb-1 leading-tight">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-3">
                        {cert.issuer}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-label">{cert.year}</span>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400/60 animate-pulse" />
                          <span className="text-[11px] text-[var(--text-muted)]">
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom gradient line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/0 to-transparent group-hover:via-[var(--accent)]/30 transition-all duration-700" />
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedCert !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200]"
              onClick={() => setSelectedCert(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[201] flex items-center justify-center p-6"
              onClick={() => setSelectedCert(null)}
            >
              <div
                className="w-full max-w-lg rounded-3xl border border-[var(--border-color)] bg-[#0a0a0a] p-8 md:p-10 relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Modal content */}
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[rgba(209,0,31,0.1)] to-transparent border border-[rgba(209,0,31,0.15)] flex items-center justify-center text-3xl mx-auto mb-6">
                    {certifications[selectedCert].badge}
                  </div>
                  <h3
                    className="text-2xl font-bold text-[var(--text-primary)] mb-2"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {certifications[selectedCert].title}
                  </h3>
                  <p className="text-[var(--text-secondary)] mb-1">
                    {certifications[selectedCert].issuer}
                  </p>
                  <span className="text-label">{certifications[selectedCert].year}</span>

                  {certifications[selectedCert].description && (
                    <p className="text-body-sm mt-6 max-w-md mx-auto">
                      {certifications[selectedCert].description}
                    </p>
                  )}

                  <div className="flex items-center justify-center gap-2 mt-6">
                    <div className="w-2 h-2 rounded-full bg-green-400/60" />
                    <span className="text-sm text-green-400/80 font-medium">
                      Verified Credential
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
