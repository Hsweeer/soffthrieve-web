"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

type WavyBackgroundProps = {
  className?: string;
  variant?: "light" | "dark";
  intensity?: "subtle" | "medium" | "strong";
};

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type WaveLine = {
  yRatio: number;
  amplitude: number;
  frequency: number;
  speed: number;
  phase: number;
  color: string;
  width: number;
};

export function WavyBackground({ className, variant = "light", intensity = "medium" }: WavyBackgroundProps) {
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
    const isDark = variant === "dark";

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    observer.observe(canvas);

    const lineCount = intensity === "strong" ? 9 : intensity === "subtle" ? 6 : 8;

    const phaedraLines: WaveLine[] = [
      { yRatio: 0.12, amplitude: 18, frequency: 0.0034, speed: 0.42, phase: 0, color: "rgba(32,144,240,0.14)", width: 1.1 },
      { yRatio: 0.22, amplitude: 24, frequency: 0.0028, speed: 0.35, phase: 1.1, color: "rgba(82,165,243,0.18)", width: 1.2 },
      { yRatio: 0.34, amplitude: 28, frequency: 0.0038, speed: 0.48, phase: 2.3, color: "rgba(32,144,240,0.22)", width: 1.3 },
      { yRatio: 0.46, amplitude: 32, frequency: 0.0031, speed: 0.38, phase: 0.7, color: "rgba(125,211,252,0.26)", width: 1.4 },
      { yRatio: 0.58, amplitude: 26, frequency: 0.0042, speed: 0.52, phase: 3.4, color: "rgba(32,144,240,0.2)", width: 1.2 },
      { yRatio: 0.7, amplitude: 30, frequency: 0.0036, speed: 0.44, phase: 1.8, color: "rgba(82,165,243,0.16)", width: 1.1 },
      { yRatio: 0.82, amplitude: 22, frequency: 0.0045, speed: 0.36, phase: 4.1, color: "rgba(32,144,240,0.12)", width: 1 },
      { yRatio: 0.92, amplitude: 20, frequency: 0.0039, speed: 0.4, phase: 2.9, color: "rgba(186,230,253,0.2)", width: 1.1 },
      { yRatio: 0.4, amplitude: 36, frequency: 0.0025, speed: 0.3, phase: 5.2, color: "rgba(32,144,240,0.1)", width: 1.5 }
    ];

    const darkLines: WaveLine[] = [
      { yRatio: 0.28, amplitude: 38, frequency: 0.0045, speed: 0.9, phase: 0, color: "rgba(32,220,199,0.55)", width: 2.2 },
      { yRatio: 0.42, amplitude: 46, frequency: 0.0045, speed: 0.9, phase: 0.85, color: "rgba(32,144,240,0.42)", width: 1.6 },
      { yRatio: 0.56, amplitude: 34, frequency: 0.0045, speed: 0.9, phase: 1.7, color: "rgba(255,255,255,0.14)", width: 1.2 },
      { yRatio: 0.7, amplitude: 42, frequency: 0.0045, speed: 0.9, phase: 2.5, color: "rgba(46,202,139,0.32)", width: 1.8 },
      { yRatio: 0.84, amplitude: 28, frequency: 0.0045, speed: 0.9, phase: 3.3, color: "rgba(32,144,240,0.22)", width: 1.1 }
    ];

    const lines = isDark ? darkLines : phaedraLines;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const drawLightBase = (w: number, h: number) => {
      const bg = ctx.createLinearGradient(0, 0, w, h * 0.85);
      bg.addColorStop(0, "#ffffff");
      bg.addColorStop(0.45, "#fafcff");
      bg.addColorStop(1, "#ffffff");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const glow = ctx.createRadialGradient(w * 0.72, h * 0.18, 0, w * 0.72, h * 0.18, w * 0.55);
      glow.addColorStop(0, "rgba(186,230,253,0.35)");
      glow.addColorStop(0.55, "rgba(224,242,254,0.12)");
      glow.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      const glow2 = ctx.createRadialGradient(w * 0.08, h * 0.62, 0, w * 0.08, h * 0.62, w * 0.42);
      glow2.addColorStop(0, "rgba(224,242,254,0.28)");
      glow2.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, w, h);
    };

    const drawDarkBase = (w: number, h: number) => {
      ctx.fillStyle = "#03060c";
      ctx.fillRect(0, 0, w, h);

      const blobs = [
        { x: 0.18, y: 0.22, r: 0.42, color: "rgba(32,220,199,0.22)" },
        { x: 0.78, y: 0.18, r: 0.38, color: "rgba(32,144,240,0.26)" },
        { x: 0.62, y: 0.72, r: 0.34, color: "rgba(46,202,139,0.14)" }
      ];

      for (const blob of blobs) {
        const cx = blob.x * w;
        const cy = blob.y * h;
        const r = blob.r * Math.min(w, h);
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, blob.color);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      const vignette = ctx.createRadialGradient(w * 0.5, h * 0.45, w * 0.15, w * 0.5, h * 0.5, w * 0.72);
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);
    };

    const drawWave = (w: number, h: number, t: number, line: WaveLine, index: number) => {
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = line.width;
      ctx.strokeStyle = line.color;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (isDark) {
        ctx.shadowColor = line.color;
        ctx.shadowBlur = 14;
      }

      const baseY = h * line.yRatio;
      const drift = Math.sin(t * 0.18 + line.phase) * 6;

      for (let x = -40; x <= w + 40; x += 2) {
        const progress = x / w;
        const y =
          baseY +
          drift +
          Math.sin(x * line.frequency + t * line.speed + line.phase) * line.amplitude +
          Math.cos(x * line.frequency * 0.62 - t * line.speed * 0.55 + index) * (line.amplitude * 0.35) +
          Math.sin(progress * Math.PI * 2 + t * 0.25 + line.phase) * (line.amplitude * 0.15);

        if (x === -40) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();
      ctx.restore();
    };

    const drawScene = (t: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      if (isDark) drawDarkBase(w, h);
      else drawLightBase(w, h);

      const activeLines = lines.slice(0, lineCount);
      for (let i = 0; i < activeLines.length; i++) {
        drawWave(w, h, t, activeLines[i], i);
      }
    };

    if (reduced) {
      drawScene(0);
    } else {
      const loop = () => {
        if (visibleRef.current) {
          timeRef.current += isDark ? 0.012 : 0.008;
          drawScene(timeRef.current);
        }
        frameRef.current = requestAnimationFrame(loop);
      };
      loop();
    }

    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [variant, intensity]);

  return (
    <canvas
      aria-hidden
      className={clsx("pointer-events-none absolute inset-0 h-full w-full", className)}
      ref={canvasRef}
    />
  );
}
