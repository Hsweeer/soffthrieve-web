"use client";

import { useEffect, useRef } from "react";

/** Phaedra-style hero: Vanta WAVES (Three.js) — smooth floating wireframe terrain. */
export function VantaHeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let cancelled = false;

    const init = async () => {
      const THREE = await import("three");
      const WAVES = (await import("vanta/dist/vanta.waves.min")).default;

      if (cancelled || !containerRef.current) return;

      const effect = WAVES({
        el: containerRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        color: 0x2ee8d6,
        shininess: 8,
        waveHeight: 22,
        waveSpeed: 1.15,
        zoom: 0.92,
        backgroundColor: 0x030508
      });

      const mat = effect.plane?.material as { wireframe?: boolean; transparent?: boolean; opacity?: number; flatShading?: boolean } | undefined;
      if (mat) {
        mat.wireframe = true;
        mat.transparent = true;
        mat.opacity = 0.42;
        mat.flatShading = true;
      }

      effectRef.current = effect;
    };

    void init();

    return () => {
      cancelled = true;
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 h-full min-h-[min(860px,92vh)] w-full"
      aria-hidden
    />
  );
}
