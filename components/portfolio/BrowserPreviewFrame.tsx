"use client";

import Image from "next/image";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import clsx from "clsx";
import { thumbnailFitClassName, type ThumbnailFitConfig } from "@/lib/thumbnail-fit";

type BrowserPreviewFrameProps = {
  title: string;
  liveUrl: string;
  screenshotSrc: string;
  className?: string;
  compact?: boolean;
  showFooterLink?: boolean;
  thumbnailFit?: ThumbnailFitConfig;
};

export function BrowserPreviewFrame({
  title,
  liveUrl,
  screenshotSrc,
  className,
  compact = false,
  showFooterLink = true,
  thumbnailFit
}: BrowserPreviewFrameProps) {
  const [failed, setFailed] = useState(false);
  const host = liveUrl.replace(/^https?:\/\//, "").split("/")[0];

  return (
    <div
      className={clsx(
        "relative overflow-hidden",
        compact ? "min-h-0" : "min-h-[220px]",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#030508]" />
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute left-[15%] top-[20%] h-40 w-40 rounded-full bg-[#2090f0]/35 blur-3xl" />
        <div className="absolute bottom-[10%] right-[10%] h-48 w-48 rounded-full bg-[#2eca8b]/25 blur-3xl" />
      </div>

      <div className={clsx("relative z-10 flex h-full flex-col", compact ? "p-3 sm:p-4" : "p-4 sm:p-6")}>
        <div className="mb-2 flex items-center gap-2 sm:mb-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">Live preview</span>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/12 bg-[#0b0b0d] shadow-[0_32px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
          <div className="flex items-center gap-2 border-b border-white/10 bg-[#111318] px-3 py-2.5 sm:px-4 sm:py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-1 truncate text-[10px] text-white/45 sm:text-xs">{host}</span>
          </div>

          <div className="relative aspect-[16/10] min-h-0 flex-1 bg-[#111318]">
            {!failed ? (
              <Image
                alt={`${title} live product screenshot`}
                className={clsx(thumbnailFitClassName(thumbnailFit, screenshotSrc, "web"), "transition duration-700 group-hover:scale-[1.02]")}
                fill
                onError={() => setFailed(true)}
                sizes="(min-width: 1024px) 50vw, 100vw"
                src={screenshotSrc}
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-sky-50 p-6 text-center">
                <p className="text-sm font-bold text-slate-600">{title}</p>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08112b]/25 via-transparent to-transparent" />
          </div>
        </div>

        {showFooterLink && (
          <a
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#5eead4] transition hover:text-white sm:text-sm"
            href={liveUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Open live <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
