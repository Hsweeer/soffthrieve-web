"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";
import { brandCtaGradient, brandCtaShadow, brandCtaShadowHover } from "@/lib/brand-cta";
import { useDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";

type LanguageToggleProps = {
  className?: string;
  isDark?: boolean;
};

export function LanguageToggle({ className, isDark = false }: LanguageToggleProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { locale, switchLocale } = useDictionary();
  const [isSwitching, setIsSwitching] = useState(false);
  const switchTimerRef = useRef<number | null>(null);
  const cleanupTimerRef = useRef<number | null>(null);
  const targetLocale: Locale = locale === "en" ? "ar" : "en";
  const targetLabel = locale === "en" ? "العربية" : "English";

  const shellClass = clsx(
    "language-toggle relative inline-flex shrink-0 items-center rounded-full border p-[3px]",
    isDark
      ? "border-white/20 bg-[#04070f]/75 shadow-[0_10px_28px_rgba(0,0,0,0.4)] backdrop-blur-xl"
      : "border-sky-200/80 bg-white shadow-sm",
    className
  );

  const buttonClass = clsx(
    "relative overflow-hidden rounded-full px-5 py-2.5 text-[15px] font-extrabold leading-none tracking-tight text-white transition-[transform,box-shadow,filter,opacity] duration-300 ease-out active:scale-[0.985]",
    isDark
      ? "bg-[linear-gradient(135deg,#1878c9_0%,#2090f0_48%,#52a6f3_100%)] shadow-[0_8px_22px_rgba(32,144,240,0.4)] hover:brightness-[1.05] hover:shadow-[0_12px_28px_rgba(32,144,240,0.48)]"
      : clsx(brandCtaGradient, brandCtaShadow, brandCtaShadowHover)
  );

  useEffect(() => {
    return () => {
      if (switchTimerRef.current) window.clearTimeout(switchTimerRef.current);
      if (cleanupTimerRef.current) window.clearTimeout(cleanupTimerRef.current);
      document.body.classList.remove("locale-switching");
    };
  }, []);

  const handleSwitch = (target: Locale) => {
    if (isSwitching) return;
    const query = searchParams.toString();
    const fullPath = query ? `${pathname}?${query}` : pathname;
    setIsSwitching(true);
    document.body.classList.add("locale-switching");
    switchTimerRef.current = window.setTimeout(() => {
      switchLocale(target, fullPath);
      cleanupTimerRef.current = window.setTimeout(() => {
        document.body.classList.remove("locale-switching");
        setIsSwitching(false);
      }, 420);
    }, 120);
  };

  return (
    <div aria-label="Language" className={shellClass} role="group">
      <button
        aria-label={`Switch language to ${targetLocale}`}
        className={clsx(buttonClass, isSwitching && "opacity-90")}
        disabled={isSwitching}
        lang={targetLocale}
        onClick={() => handleSwitch(targetLocale)}
        type="button"
      >
        <AnimatePresence mode="wait">
          <motion.span
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" }}
            className="relative z-10 block min-w-[86px] text-center [text-shadow:0_1px_2px_rgba(0,0,0,0.28)]"
            exit={{ opacity: 0, y: 10, scale: 0.94, rotateX: -35, filter: "blur(3px)" }}
            initial={{ opacity: 0, y: -10, scale: 0.94, rotateX: 35, filter: "blur(3px)" }}
            key={targetLocale}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {targetLabel}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
