'use client';

import React, { useRef, useMemo, useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import AnimatedText from '@/components/ui/AnimatedText';
import GlassCard from '@/components/ui/GlassCard';
import { universeProjects } from '@/lib/data';
import type { UniverseProject } from '@/lib/data';

// Category colors
const categoryColors: Record<string, string> = {
  cv: '#FF2A2A',
  ml: '#FF6B6B',
  dl: '#FF4444',
  data: '#CC2222',
};

// Generate positions in a galaxy spiral
function getGalaxyPositions(count: number): [number, number, number][] {
  const positions: [number, number, number][] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 4;
    const radius = 2 + (i / count) * 5;
    const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 1.5;
    const y = (Math.random() - 0.5) * 2;
    const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 1.5;
    positions.push([x, y, z]);
  }
  return positions;
}

function ProjectNode({
  project,
  position,
  onSelect,
}: {
  project: UniverseProject;
  position: [number, number, number];
  onSelect: (p: UniverseProject) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const color = categoryColors[project.category] || '#FF2A2A';

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position}>
        {/* Glow sphere */}
        <mesh
          ref={meshRef}
          onClick={() => onSelect(project)}
          onPointerEnter={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
          onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
          scale={hovered ? 1.4 : 1}
        >
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 2 : 0.5}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Label */}
        {hovered && (
          <Text
            position={[0, 0.6, 0]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="bottom"
            font="/fonts/inter.woff"
          >
            {project.title}
          </Text>
        )}

        {/* Outer glow ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={hovered ? 1.8 : 1.2}>
          <ringGeometry args={[0.3, 0.35, 32]} />
          <meshBasicMaterial color={color} transparent opacity={hovered ? 0.4 : 0.1} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </Float>
  );
}

function StarField() {
  const count = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function GalaxyRotation({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

function GalaxyScene({ onSelect }: { onSelect: (p: UniverseProject) => void }) {
  const positions = useMemo(() => getGalaxyPositions(universeProjects.length), []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#FF2A2A" distance={20} />
      <pointLight position={[10, 5, 10]} intensity={0.5} />

      <StarField />

      <GalaxyRotation>
        {/* Connection lines */}
        {positions.map((pos, i) => {
          const nextPos = positions[(i + 1) % positions.length];
          const lineGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(...pos),
            new THREE.Vector3(...nextPos),
          ]);
          return (
            <line key={`line-${i}`} geometry={lineGeo}>
              <lineBasicMaterial color="#FF2A2A" transparent opacity={0.08} />
            </line>
          );
        })}

        {universeProjects.map((project, i) => (
          <ProjectNode
            key={project.id}
            project={project}
            position={positions[i]}
            onSelect={onSelect}
          />
        ))}
      </GalaxyRotation>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI * 0.7}
        minPolarAngle={Math.PI * 0.3}
      />
    </>
  );
}

export default function ProjectUniverse() {
  const [selected, setSelected] = useState<UniverseProject | null>(null);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <AnimatedText
            text="Project Universe"
            as="h2"
            preset="word"
            className="text-section-title text-[var(--text-primary)] mb-4"
          />
          <AnimatedText
            text="An interactive galaxy of all projects — click any node to explore."
            as="p"
            preset="line"
            delay={0.2}
            className="text-section-subtitle max-w-2xl mx-auto"
          />
        </div>

        {/* 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden border border-[var(--border-color)]"
          style={{ background: 'radial-gradient(ellipse at center, #0a0a12 0%, #050505 70%)' }}
        >
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)]">
              Loading Universe...
            </div>
          }>
            <Canvas camera={{ position: [0, 3, 12], fov: 60 }}>
              <GalaxyScene onSelect={setSelected} />
            </Canvas>
          </Suspense>

          {/* Category legend */}
          <div className="absolute bottom-4 left-4 flex gap-4 text-xs">
            {[
              { label: 'Computer Vision', color: categoryColors.cv },
              { label: 'Machine Learning', color: categoryColors.ml },
              { label: 'Deep Learning', color: categoryColors.dl },
              { label: 'Data Science', color: categoryColors.data },
            ].map((cat) => (
              <div key={cat.label} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-[var(--text-muted)]">{cat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Selected project overlay */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-6"
              onClick={() => setSelected(null)}
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative z-10 w-full max-w-lg"
              >
                <GlassCard className="p-8" tilt={false}>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs tracking-[0.2em] uppercase text-accent-red font-medium">
                      {selected.category.toUpperCase()}
                    </span>
                    <button
                      onClick={() => setSelected(null)}
                      className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-xl"
                    >
                      ✕
                    </button>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                    {selected.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                    {selected.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selected.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full border border-[var(--border-color)] text-[var(--text-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
