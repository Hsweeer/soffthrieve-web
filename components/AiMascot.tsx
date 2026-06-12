"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "motion/react";

const SPLINE_SCENE =
  process.env.NEXT_PUBLIC_SPLINE_ROBOT_SCENE ??
  "https://prod.spline.design/kZDDjO5HuCqvCqkL/scene.splinecode";

const Spline = dynamic(() => import("@splinetool/react-spline/next").then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-10 w-10 animate-pulse rounded-full bg-[#20dcc7]/30" />
    </div>
  )
});

type AiMascotProps = {
  size?: "launcher" | "panel";
  className?: string;
  onHover?: () => void;
};

export function AiMascot({ size = "launcher", className, onHover }: AiMascotProps) {
  const [useFallback, setUseFallback] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [shouldLoad3d, setShouldLoad3d] = useState(false);
  const loadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotion = () => setReducedMotion(mq.matches);
    applyMotion();
    mq.addEventListener("change", applyMotion);

    if (!mq.matches) {
      const enable3d = () => setShouldLoad3d(true);
      if ("requestIdleCallback" in window) {
        (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
          enable3d,
          { timeout: 2800 }
        );
      } else {
        loadTimer.current = setTimeout(enable3d, 1800);
      }
      const failTimer = setTimeout(() => setUseFallback(true), 10000);
      return () => {
        mq.removeEventListener("change", applyMotion);
        if (loadTimer.current) clearTimeout(loadTimer.current);
        clearTimeout(failTimer);
      };
    }

    return () => mq.removeEventListener("change", applyMotion);
  }, []);

  const dimensions = size === "panel" ? "h-[220px] w-[220px]" : "h-[88px] w-[88px]";

  if (reducedMotion || useFallback || !shouldLoad3d) {
    return (
      <motion.div
        animate={reducedMotion ? undefined : { y: [0, -4, 0] }}
        className={`relative ${dimensions} ${className ?? ""}`}
        onMouseEnter={onHover}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          alt="SoftThrive assistant"
          className="object-contain"
          height={size === "panel" ? 220 : 88}
          priority={size === "launcher"}
          src="/mascot-robot.svg"
          width={size === "panel" ? 220 : 88}
        />
      </motion.div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${dimensions} ${className ?? ""}`}
      onMouseEnter={onHover}
    >
      <Spline
        onLoad={() => {
          if (loadTimer.current) clearTimeout(loadTimer.current);
        }}
        renderOnDemand
        scene={SPLINE_SCENE}
      />
    </div>
  );
}
