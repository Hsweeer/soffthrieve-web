"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

type PhaedraHeroMeshProps = {
  className?: string;
};

type MeshPoint = { x: number; y: number; alpha: number; scale: number };

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getDensity() {
  if (typeof window === "undefined") return { cols: 44, rows: 24, spacing: 18 };
  const w = window.innerWidth;
  if (w < 640) return { cols: 28, rows: 16, spacing: 20 };
  if (w < 1024) return { cols: 36, rows: 20, spacing: 19 };
  return { cols: 44, rows: 24, spacing: 18 };
}

/** Animated height ripples on the terrain surface */
function waveHeight(x: number, z: number, t: number) {
  return (
    Math.sin(x * 0.045 + t * 0.88) * 28 +
    Math.cos(z * 0.038 - t * 0.65) * 22 +
    Math.sin((x * 0.022 + z * 0.028) + t * 0.5) * 15
  );
}

/**
 * Mesh sheet flows top → bottom along the highlighted curve (left-high → right-low).
 */
function buildGrid(
  t: number,
  w: number,
  h: number,
  cols: number,
  rows: number,
  spacing: number
): MeshPoint[][] {
  const grid: MeshPoint[][] = [];

  for (let row = 0; row < rows; row++) {
    const line: MeshPoint[] = [];
    const ny = row / Math.max(1, rows - 1);

    for (let col = 0; col < cols; col++) {
      const nx = col / Math.max(1, cols - 1);
      const x = (col - cols * 0.5) * spacing;
      const z = row * spacing;
      const bump = waveHeight(x, z, t);

      // Top edge (horizon) starts upper-left, dips slightly right; bottom edge fills viewport base
      const topY = h * (0.1 + nx * 0.18);
      const bottomY = h * (0.48 + nx * 0.5);
      const baseY = topY + ny * (bottomY - topY);

      const bumpStrength = (1 - ny * 0.25) * (0.45 + nx * 0.4);
      const sy = baseY - bump * bumpStrength * 0.38;
      const sx = w * -0.06 + nx * w * 1.12;

      const alpha = Math.min(1, 0.28 + ny * 0.35 + (1 - nx) * 0.2 + nx * 0.12);
      const scale = 0.75 + ny * 0.4;

      line.push({ x: sx, y: sy, alpha, scale });
    }
    grid.push(line);
  }

  return grid;
}

export function PhaedraHeroMesh({ className }: PhaedraHeroMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const timeRef = useRef(0);
  const visibleRef = useRef(true);
  const sizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = prefersReducedMotion();

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (!w || !h) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };
    };

    resize();
    const parent = canvas.parentElement;
    const ro = parent ? new ResizeObserver(resize) : null;
    ro?.observe(parent!);

    const strokeRow = (grid: MeshPoint[][], row: number, accent: boolean) => {
      const pts = grid[row];
      if (!pts.length) return;

      const mid = pts[Math.floor(pts.length / 2)];
      const width = Math.max(0.65, mid.scale * 1.05);

      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.strokeStyle = accent
        ? `rgba(82, 165, 243, ${mid.alpha * 0.75})`
        : `rgba(46, 235, 215, ${mid.alpha * 0.96})`;
      ctx.lineWidth = accent ? width * 1.08 : width;
      ctx.stroke();
    };

    const strokeCol = (grid: MeshPoint[][], row: number, col: number) => {
      const a = grid[row][col];
      const b = grid[row + 1][col];
      const alpha = Math.min(a.alpha, b.alpha);
      const width = Math.max(0.5, Math.min(a.scale, b.scale) * 0.9);

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = `rgba(46, 235, 215, ${alpha * 0.7})`;
      ctx.lineWidth = width;
      ctx.stroke();
    };

    const draw = (t: number) => {
      const { w, h } = sizeRef.current;
      if (!w || !h) return;

      const { cols, rows, spacing } = getDensity();
      ctx.clearRect(0, 0, w, h);

      const grid = buildGrid(t, w, h, cols, rows, spacing);

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let row = 0; row < rows; row++) {
        strokeRow(grid, row, row % 4 === 0);
      }

      for (let row = 0; row < rows - 1; row++) {
        for (let col = 0; col < cols; col += 1) {
          strokeCol(grid, row, col);
        }
      }
    };

    let lastFrame = 0;

    const loop = (now: number) => {
      frameRef.current = requestAnimationFrame(loop);
      if (!visibleRef.current) return;

      if (now - lastFrame < 32) return;
      lastFrame = now;

      timeRef.current += 0.013;
      draw(timeRef.current);
    };

    if (reduced) {
      draw(0);
    } else {
      visibleRef.current = true;
      frameRef.current = requestAnimationFrame(loop);
    }

    return () => {
      ro?.disconnect();
      observer.disconnect();
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      aria-hidden
      className={clsx("absolute inset-0 h-full w-full", className)}
      ref={canvasRef}
    />
  );
}
