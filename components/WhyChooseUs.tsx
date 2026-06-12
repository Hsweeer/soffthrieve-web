"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getTrustPoints, localePath, useDictionary } from "@/lib/i18n";

const links = ["/services/shopify", "/services", "/contact"] as const;

export function WhyChooseUs() {
  const { dict, locale } = useDictionary();
  const trustPoints = getTrustPoints(locale);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-5%" }}
      whileInView={{ opacity: 1 }}
    >
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#64748b]">{dict.home.whyEyebrow}</p>
        <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-[#0a1b33] md:text-[2rem]">
          {dict.home.whyTitle}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#64748b]">{dict.home.whyText}</p>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_8px_30px_rgba(10,27,51,0.04)] md:mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-slate-100">
          {trustPoints.map((point, index) => (
            <Link
              className="group relative block px-6 py-7 transition-colors md:px-7 md:py-8"
              href={localePath(links[index], locale)}
              key={point.title}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.span
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 block bg-[#f8fafc]"
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    initial={{ opacity: 0 }}
                    layoutId="whySoftThriveHighlight"
                    transition={{ duration: 0.15 }}
                  />
                )}
              </AnimatePresence>

              <div className="relative z-10">
                <span className="font-mono text-[11px] font-medium tabular-nums text-slate-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[15px] font-semibold leading-snug text-[#0a1b33]">{point.title}</h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-[#64748b]">{point.text}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-[12px] font-medium text-[#2090f0] opacity-80 transition-opacity group-hover:opacity-100">
                  {dict.common.learnMore}
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
