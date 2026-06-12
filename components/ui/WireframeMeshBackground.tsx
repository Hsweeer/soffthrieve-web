"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

type WireframeMeshBackgroundProps = {
  className?: string;
};

const COLS = 36;
const ROWS = 24;
const SPACING = 28;
const FOCAL = 440;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function waveHeight(x: number, z: number, t: number) {
  return (
    Math.sin(x * 0.04 + t) * 26 +
    Math.cos(z * 0.035 - t * 0.7) * 20 +
    Math.sin((x + z) * 0.025 + t * 0.45) * 14
  );
}

type MeshPoint = { x: number; y: number; depth: number; scale: number };

function buildGrid(t: number, w: number, h: number): MeshPoint[][] {
  const raw: { x: number; y: number; depth: number; scale: number }[][] = [];

  for (let row = 0; row < ROWS; row++) {
    const rowPoints: { x: number; y: number; depth: number; scale: number }[] = [];
    const z = row * SPACING;

    for (let col = 0; col < COLS; col++) {
      const x = (col - COLS * 0.5) * SPACING;
      const y = waveHeight(x, z, t);
      const depth = z + 90;
      const scale = FOCAL / (FOCAL + depth);
      rowPoints.push({
        x: x * scale,
        y: (z * 0.72 - y * 0.55) * scale,
        depth,
        scale
      });
    }
    raw.push(rowPoints);
  }

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const row of raw) {
    for (const pt of row) {
      minX = Math.min(minX, pt.x);
      maxX = Math.max(maxX, pt.x);
      minY = Math.min(minY, pt.y);
      maxY = Math.max(maxY, pt.y);
    }
  }

  const meshW = maxX - minX || 1;
  const meshH = maxY - minY || 1;
  const padX = w * 0.04;
  const padY = h * 0.06;
  const fitScale = Math.min((w - padX * 2) / meshW, (h - padY * 2) / meshH) * 0.98;
  const offsetX = (w - meshW * fitScale) * 0.52 - minX * fitScale;
  const offsetY = h - padY - maxY * fitScale;

  return raw.map((row) =>
    row.map((pt) => ({
      x: pt.x * fitScale + offsetX,
      y: pt.y * fitScale + offsetY,
      depth: pt.depth,
      scale: pt.scale
    }))
  );
}

export function WireframeMeshBackground({ className }: WireframeMeshBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    observer.observe(canvas);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w === 0 || h === 0) return;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const parent = canvas.parentElement;
    const ro = parent ? new ResizeObserver(resize) : null;
    ro?.observe(parent!);
    window.addEventListener("resize", resize);

    const draw = (t: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;

      ctx.clearRect(0, 0, w, h);
      const grid = buildGrid(t, w, h);

      const drawLine = (a: MeshPoint, b: MeshPoint, accent: boolean) => {
        const scaleMix = (a.scale + b.scale) * 0.5;
        const alpha = Math.min(0.75, Math.max(0.14, 0.18 + scaleMix * 0.62));
        ctx.beginPath();
        ctx.strokeStyle = accent ? `rgba(32,144,240,${alpha * 0.55})` : `rgba(32,220,199,${alpha})`;
        ctx.lineWidth = accent ? 1.35 : Math.max(0.65, scaleMix * 1.15);
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      };

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS - 1; col++) {
          drawLine(grid[row][col], grid[row][col + 1], row % 5 === 0);
        }
      }

      for (let row = 0; row < ROWS - 1; row++) {
        for (let col = 0; col < COLS; col++) {
          drawLine(grid[row][col], grid[row + 1][col], false);
        }
      }
    };

    if (reduced) {
      draw(0);
    } else {
      const loop = () => {
        if (visibleRef.current) {
          timeRef.current += 0.011;
          draw(timeRef.current);
        }
        frameRef.current = requestAnimationFrame(loop);
      };
      loop();
    }

    return () => {
      window.removeEventListener("resize", resize);
      ro?.disconnect();
      observer.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      aria-hidden
      className={clsx("pointer-events-none absolute inset-0 h-full w-full", className)}
      ref={canvasRef}
    />
  );
}
