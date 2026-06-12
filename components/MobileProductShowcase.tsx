"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Iphone16ProFrame } from "@/components/Iphone16ProFrame";
import { hiResAppScreenshot } from "@/lib/image-utils";
import { thumbnailFitClassName, type ThumbnailFitConfig } from "@/lib/thumbnail-fit";

type MobileProductShowcaseProps = {
  title: string;
  artworkUrl?: string;
  screenshots: string[];
  websiteUrl?: string;
  thumbnailFit?: ThumbnailFitConfig;
};

export function MobileProductShowcase({
  title,
  artworkUrl,
  screenshots,
  websiteUrl,
  thumbnailFit
}: MobileProductShowcaseProps) {
  const shots = [...new Set(screenshots.filter(Boolean).map(hiResAppScreenshot))];
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [screenshots.join("|")]);
  const main = shots[active] ?? shots[0];
  const left = shots[active === 0 ? 1 : 0] ?? shots[1];
  const right = shots.find((_, i) => i !== active && shots[i] !== left) ?? shots[2];

  return (
    <div className="portfolio-device-stage flex flex-col gap-4 p-5 sm:gap-5 sm:p-6">
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {artworkUrl && (
            <Image
              alt={`${title} app icon`}
              className="rounded-[14px] shadow-md ring-1 ring-slate-200/80"
              height={40}
              src={artworkUrl}
              unoptimized
              width={40}
            />
          )}
          <div>
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-600">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Live product
            </p>
            <p className="text-sm font-black text-slate-900">{title}</p>
          </div>
        </div>
        {websiteUrl && (
          <Link
            className="text-xs font-semibold text-slate-500 transition hover:text-sky-600"
            href={websiteUrl}
            target="_blank"
          >
            Website
          </Link>
        )}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[min(100%,20rem)] items-end justify-center gap-1.5 px-1 sm:max-w-[26rem] sm:gap-4 sm:px-0 lg:max-w-[28rem]">
        {left && left !== main && (
          <motion.div
            aria-hidden
            className="mb-6 hidden origin-bottom -rotate-6 opacity-80 sm:block"
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 0.8, y: 0 }}
          >
            <Iphone16ProFrame alt="" size="sm" src={left} thumbnailFit={thumbnailFit} />
          </motion.div>
        )}

        {main && (
          <motion.div
            animate={{ y: [0, -6, 0] }}
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            transition={{
              opacity: { duration: 0.5 },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
            }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Iphone16ProFrame alt={`${title} app screenshot`} priority size="lg" src={main} thumbnailFit={thumbnailFit} />
          </motion.div>
        )}

        {right && right !== main && (
          <motion.div
            aria-hidden
            className="mb-4 hidden origin-bottom rotate-6 opacity-70 sm:block"
            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 0.7, y: 0 }}
          >
            <Iphone16ProFrame alt="" size="sm" src={right} thumbnailFit={thumbnailFit} />
          </motion.div>
        )}
      </div>

      {shots.length > 1 && (
        <div className="relative z-10 mt-2 flex justify-center gap-2">
          {shots.slice(0, 4).map((shot, index) => (
            <button
              aria-label={`Show screenshot ${index + 1}`}
              aria-pressed={index === active}
              className={`relative h-14 w-[2.05rem] overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                index === active
                  ? "border-sky-500 shadow-[0_0_0_3px_rgba(32,144,240,0.2)]"
                  : "border-slate-200/90 opacity-70 hover:border-slate-300 hover:opacity-100"
              }`}
              key={shot}
              onClick={() => setActive(index)}
              type="button"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                className={`h-full w-full bg-slate-100 ${thumbnailFitClassName(thumbnailFit, shot, "mobile")}`}
                draggable={false}
                src={shot}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
