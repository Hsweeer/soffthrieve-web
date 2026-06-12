"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

const COLS = 44;
const ROWS = 26;
const SPACING = 16;
const TILT = 0.54;
const DEPTH = 420;
const FOV = 920;

type ScreenPoint = { x: number; y: number; alpha: number };

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function waveHeight(x: number, z: number, t: number) {
  return (
    Math.sin(x * 0.055 + t * 0.9) * 14 +
    Math.cos(z * 0.045 - t * 0.65) * 11 +
    Math.sin((x + z) * 0.028 + t * 0.4) * 7
  );
}

function projectRaw(x: number, y: number, z: number): ScreenPoint {
  const yr = y * Math.cos(TILT) - z * Math.sin(TILT);
  const zr = y * Math.sin(TILT) + z * Math.cos(TILT) + DEPTH;
  const scale = FOV / zr;

  return {
    x: x * scale,
    y: yr * scale,
    alpha: Math.min(0.52, Math.max(0.07, 260 / zr))
  };
}

function fitToViewport(raw: ScreenPoint[][], w: number, h: number): ScreenPoint[][] {
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
  const targetW = w * 0.94;
  const targetH = h * 0.62;
  const fit = Math.min(targetW / meshW, targetH / meshH);
  const offsetX = w * 0.5 - (minX + meshW * 0.5) * fit;
  const offsetY = h * 0.78 - maxY * fit;

  return raw.map((row) =>
    row.map((pt) => ({
      x: pt.x * fit + offsetX,
      y: pt.y * fit + offsetY,
      alpha: pt.alpha
    }))
  );
}

function buildGrid(t: number, w: number, h: number): ScreenPoint[][] {
  const raw: ScreenPoint[][] = [];

  for (let row = 0; row <= ROWS; row++) {
    const z = row * SPACING;
    const line: ScreenPoint[] = [];
    for (let col = 0; col <= COLS; col++) {
      const x = (col - COLS * 0.5) * SPACING;
      const y = waveHeight(x, z, t);
      line.push(projectRaw(x, y, z));
    }
    raw.push(line);
  }

  return fitToViewport(raw, w, h);
}

export function HeroMeshBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
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
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      if (!width || !height) return;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const parent = canvas.parentElement;
    let ro: ResizeObserver | null = null;
    if (parent) {
      ro = new ResizeObserver(resize);
      ro.observe(parent);
    }
    window.addEventListener("resize", resize);

    const drawSegment = (a: ScreenPoint, b: ScreenPoint, highlight: boolean) => {
      const alpha = Math.min(a.alpha, b.alpha) * (highlight ? 0.85 : 1);
      if (alpha < 0.04) return;

      ctx.beginPath();
      ctx.strokeStyle = highlight
        ? `rgba(32,144,240,${alpha * 0.55})`
        : `rgba(32,220,199,${alpha * 0.75})`;
      ctx.lineWidth = highlight ? 0.9 : 0.65;
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    };

    const draw = (t: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;

      ctx.clearRect(0, 0, w, h);
      const grid = buildGrid(t, w, h);

      for (let row = 0; row <= ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          drawSegment(grid[row][col], grid[row][col + 1], row % 5 === 0);
        }
      }

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col <= COLS; col++) {
          drawSegment(grid[row][col], grid[row + 1][col], false);
        }
      }
    };

    if (reduced) {
      draw(0);
    } else {
      const loop = () => {
        if (visibleRef.current) {
          timeRef.current += 0.009;
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
      cancelAnimationFrame(frameRef.current);
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
