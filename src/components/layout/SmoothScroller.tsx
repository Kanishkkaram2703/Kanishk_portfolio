'use client';

import { useEffect, useRef } from 'react';

export default function SmoothScroller({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<ReturnType<typeof import('lenis')['default']> extends new (...args: unknown[]) => infer R ? R : never>(null);

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let lenis: InstanceType<typeof import('lenis')['default']> | null = null;
    let raf: number;

    const init = async () => {
      const Lenis = (await import('lenis')).default;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
        infinite: false,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (lenisRef as any).current = lenis;

      const animate = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);
    };

    init();

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
