"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

type AnimatedCounterProps = {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

export function AnimatedCounter({
  end,
  prefix = "",
  suffix = "",
  duration = 1.25,
  className
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(end);
      return;
    }
    const controls = animate(0, end, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => setCount(Math.round(value))
    });
    return () => controls.stop();
  }, [inView, end, duration]);

  return (
    <span className={className} ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
