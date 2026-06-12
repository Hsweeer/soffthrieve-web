"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

export type StickyScrollContentItem = {
  title: string;
  description: string;
  content?: React.ReactNode;
};

type StickyScrollProps = {
  content: StickyScrollContentItem[];
  contentClassName?: string;
  className?: string;
  theme?: "dark" | "light";
  /** Page scroll (one scroll) vs inner box — default page */
  scrollMode?: "page" | "container";
};

const darkBackgrounds = ["#0f172a", "#000000", "#171717"];
const darkGradients = [
  "linear-gradient(to bottom right, #06b6d4, #10b981)",
  "linear-gradient(to bottom right, #ec4899, #6366f1)",
  "linear-gradient(to bottom right, #f97316, #eab308)",
];

const lightGradients = [
  "linear-gradient(145deg, #2090f0 0%, #0c4a6e 52%, #0a152d 100%)",
  "linear-gradient(145deg, #1878c9 0%, #2090f0 48%, #0a1b33 100%)",
  "linear-gradient(145deg, #06b6d4 0%, #2090f0 42%, #082f49 100%)",
  "linear-gradient(145deg, #52a6f3 0%, #2090f0 38%, #0a152d 100%)",
];

export const StickyScroll = ({
  content,
  contentClassName,
  className,
  theme = "dark",
  scrollMode = "page",
}: StickyScrollProps) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isLight = theme === "light";
  const isPageScroll = scrollMode === "page";
  const gradients = isLight ? lightGradients : darkGradients;

  const { scrollYProgress } = useScroll(
    isPageScroll
      ? { target: ref, offset: ["start start", "end end"] }
      : { container: ref, offset: ["start start", "end start"] },
  );

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint);
      if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
        return index;
      }
      return acc;
    }, 0);
    setActiveCard(closestBreakpointIndex);
  });

  const [backgroundGradient, setBackgroundGradient] = useState(gradients[0]);

  useEffect(() => {
    setBackgroundGradient(gradients[activeCard % gradients.length]);
  }, [activeCard, gradients]);

  const sectionHeight = isPageScroll ? `${Math.max(content.length, 1) * 100}vh` : undefined;

  const textColumn = (
    <div className="relative z-10 flex-1 px-2 sm:px-4 lg:max-w-xl lg:px-6">
      {content.map((item, index) => (
        <div
          className={cn(
            "flex flex-col justify-center",
            isPageScroll ? "min-h-[85vh] py-12 lg:min-h-[100vh] lg:py-0" : "my-16 first:mt-4 last:mb-4 lg:my-20",
          )}
          key={`${item.title}-${index}`}
        >
          <motion.span
            animate={{ opacity: activeCard === index ? 1 : 0.4, x: activeCard === index ? 0 : -8 }}
            className={cn(
              "mb-3 inline-block font-mono text-xs tabular-nums",
              isLight ? "text-slate-400" : "text-slate-500",
            )}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
          <motion.h2
            animate={{
              opacity: activeCard === index ? 1 : 0.22,
              y: activeCard === index ? 0 : 12,
              scale: activeCard === index ? 1 : 0.98,
            }}
            className={cn(
              "font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.1] tracking-tight",
              isLight ? "text-[#0a1b33]" : "font-bold text-slate-100",
            )}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {item.title}
          </motion.h2>
          <motion.p
            animate={{
              opacity: activeCard === index ? 1 : 0.18,
              y: activeCard === index ? 0 : 16,
            }}
            className={cn(
              "mt-6 max-w-lg text-[15px] leading-relaxed md:text-base md:leading-7",
              isLight ? "text-slate-600" : "mt-10 text-lg text-slate-300",
            )}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
          >
            {item.description}
          </motion.p>
        </div>
      ))}
      {!isPageScroll && <div className="h-32 lg:h-40" />}
    </div>
  );

  const visualColumn = (
    <div className="relative hidden w-full max-w-md shrink-0 lg:block lg:max-w-lg">
      <motion.div
        className={cn(
          "relative overflow-hidden rounded-[1.75rem] shadow-[0_40px_100px_-24px_rgba(10,27,51,0.28)]",
          isLight ? "h-[26rem] xl:h-[28rem]" : "h-60 w-80",
          contentClassName,
        )}
        layout
        style={{ background: backgroundGradient }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <AnimatePresence mode="wait">
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="relative h-full"
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            key={activeCard}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {content[activeCard].content ?? null}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );

  if (isPageScroll) {
    return (
      <div className={cn("relative w-full", className)} ref={ref} style={{ height: sectionHeight }}>
        <div className="sticky top-0 z-10 flex min-h-[100svh] items-center overflow-hidden">
          <div className="container-shell grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
            {textColumn}
            {visualColumn}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      animate={
        isLight
          ? undefined
          : { backgroundColor: darkBackgrounds[activeCard % darkBackgrounds.length] }
      }
      className={cn(
        "relative flex justify-center gap-6 overflow-y-auto rounded-2xl p-6 sm:gap-10 sm:p-8 lg:gap-14 lg:p-10",
        isLight
          ? "h-[38rem] border border-slate-200/70 bg-white lg:h-[42rem]"
          : "h-[30rem] space-x-10",
        className,
      )}
      ref={ref}
    >
      {textColumn}
      {visualColumn}
    </motion.div>
  );
};
