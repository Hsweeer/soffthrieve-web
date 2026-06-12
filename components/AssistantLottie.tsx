"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import assistantAnimation from "@/public/lottie/assistant-bot.json";

const Lottie = dynamic(() => import("lottie-react").then((mod) => mod.default), { ssr: false });

type AssistantLottieProps = {
  className?: string;
  onClick?: () => void;
};

/** Match PrimaryButton: sky-500 → sky-600 */
const SKY_500 = { r: 0.055, g: 0.647, b: 0.914 };
const SKY_600 = { r: 0.008, g: 0.518, b: 0.78 };
const SKY_400 = { r: 0.22, g: 0.741, b: 0.973 };

function remapRgb(r: number, g: number, b: number): [number, number, number] {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  // Mint / aqua bubble, arms, body (#00efd4 family)
  if (g >= 0.72 && b >= 0.55 && r <= 0.42) {
    return [SKY_500.r, SKY_500.g, SKY_500.b];
  }

  // Teal mid-tones on robot body
  if (g >= 0.48 && b >= 0.4 && r <= 0.45 && max - min > 0.08) {
    return [SKY_600.r, SKY_600.g, SKY_600.b];
  }

  // Bright cyan highlights
  if (g >= 0.9 && b >= 0.78 && r <= 0.2) {
    return [SKY_400.r, SKY_400.g, SKY_400.b];
  }

  return [r, g, b];
}

function isRgbaColor(value: unknown[]): value is [number, number, number, number?] {
  return (
    value.length === 4 &&
    value.every((entry) => typeof entry === "number") &&
    value[0] <= 1 &&
    value[1] <= 1 &&
    value[2] <= 1
  );
}

function isGradientStops(value: unknown[]): boolean {
  if (value.length < 8 || value.length % 4 !== 0) return false;
  for (let i = 0; i < value.length; i += 4) {
    const stop = value[i];
    const r = value[i + 1];
    const g = value[i + 2];
    const b = value[i + 3];
    if (typeof stop !== "number" || stop < 0 || stop > 1) return false;
    if (typeof r !== "number" || typeof g !== "number" || typeof b !== "number") return false;
    if (r > 1 || g > 1 || b > 1) return false;
  }
  return true;
}

function replaceColors(value: unknown): unknown {
  if (Array.isArray(value)) {
    if (isGradientStops(value)) {
      const next = [...value] as number[];
      for (let i = 0; i < next.length; i += 4) {
        const [r, g, b] = remapRgb(next[i + 1], next[i + 2], next[i + 3]);
        next[i + 1] = r;
        next[i + 2] = g;
        next[i + 3] = b;
      }
      return next;
    }

    if (isRgbaColor(value)) {
      const [r, g, b, a] = value;
      const [nr, ng, nb] = remapRgb(r, g, b);
      return [nr, ng, nb, a ?? 1];
    }

    return value.map(replaceColors);
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const next: Record<string, unknown> = {};

    for (const [key, entry] of Object.entries(record)) {
      if (key === "k" && entry && typeof entry === "object" && !Array.isArray(entry) && "k" in (entry as object)) {
        const animated = entry as { a?: number; k: unknown };
        next[key] = { ...animated, k: replaceColors(animated.k) };
      } else {
        next[key] = replaceColors(entry);
      }
    }

    return next;
  }

  return value;
}

export function AssistantLottie({ className, onClick }: AssistantLottieProps) {
  const themedAnimation = useMemo(
    () => replaceColors(structuredClone(assistantAnimation)) as typeof assistantAnimation,
    []
  );

  return (
    <motion.div className="contact-bot-lottie-wrap">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        className="contact-bot-lottie-glow"
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        animate={{ y: [0, -6, 0] }}
        aria-label="Open SoftThrive assistant"
        className={className}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
        }}
        role="button"
        tabIndex={0}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Lottie animationData={themedAnimation} loop style={{ width: "100%", height: "auto", display: "block" }} />
      </motion.div>
    </motion.div>
  );
}
