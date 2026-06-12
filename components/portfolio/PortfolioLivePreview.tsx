"use client";

import Image from "next/image";
import { motion } from "motion/react";
import clsx from "clsx";
import { Iphone16ProFrame } from "@/components/Iphone16ProFrame";
import { BrowserPreviewFrame } from "@/components/portfolio/BrowserPreviewFrame";
import { resolveProjectPreview } from "@/lib/portfolio-media";
import type { PortfolioProject } from "@/lib/portfolio";
import { hiResAppScreenshot } from "@/lib/image-utils";

type PortfolioLivePreviewProps = {
  project: PortfolioProject;
  className?: string;
  size?: "card" | "hero" | "spotlight";
};

export function PortfolioLivePreview({ project, className, size = "card" }: PortfolioLivePreviewProps) {
  const preview = resolveProjectPreview(project);
  const isHero = size === "hero";
  const isSpotlight = size === "spotlight";

  if (preview.variant === "mobile" && preview.previewImages[0]) {
    const shot = hiResAppScreenshot(preview.previewImages[0]);
    return (
      <div
        className={clsx(
          "portfolio-device-stage relative flex items-center justify-center overflow-hidden",
          isHero ? "min-h-[340px] lg:min-h-[420px]" : isSpotlight ? "min-h-[280px]" : "min-h-[200px]",
          className
        )}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          className="relative z-10 py-6"
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Iphone16ProFrame
            alt={`${project.name} app screenshot`}
            priority={isHero}
            size={isHero ? "lg" : isSpotlight ? "md" : "sm"}
            src={shot}
            thumbnailFit={preview.thumbnailFit}
          />
        </motion.div>
        {preview.artworkUrl && (
          <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full bg-white/90 px-2.5 py-1.5 shadow-lg backdrop-blur-sm">
            <Image alt="" className="rounded-lg" height={28} src={preview.artworkUrl} unoptimized width={28} />
            <span className="text-xs font-bold text-slate-800">{project.name}</span>
          </div>
        )}
      </div>
    );
  }

  if (preview.variant === "artwork" && preview.artworkUrl) {
    return (
      <div
        className={clsx(
          "portfolio-device-stage relative flex items-center justify-center overflow-hidden",
          isHero ? "min-h-[300px]" : "min-h-[200px]",
          className
        )}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          className="relative z-10 flex flex-col items-center gap-4 py-8"
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative h-28 w-28 overflow-hidden rounded-[28px] border border-white/20 shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:h-32 sm:w-32">
            <Image alt={`${project.name} icon`} className="object-cover" fill src={preview.artworkUrl} unoptimized />
          </div>
          <p className="text-lg font-black text-slate-900">{project.name}</p>
        </motion.div>
      </div>
    );
  }

  if (preview.variant === "web" && preview.liveUrl && preview.screenshotUrl) {
    return (
      <BrowserPreviewFrame
        className={clsx("h-full", className)}
        compact={size === "card"}
        liveUrl={preview.liveUrl}
        screenshotSrc={preview.screenshotUrl}
        showFooterLink={isHero || isSpotlight}
        thumbnailFit={preview.thumbnailFit}
        title={project.name}
      />
    );
  }

  return (
    <div
      className={clsx(
        "relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-800 to-slate-950",
        className
      )}
    >
      <p className="px-4 text-center text-sm font-bold text-white/80">{project.name}</p>
    </div>
  );
}
