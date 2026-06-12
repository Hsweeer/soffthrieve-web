"use client";

import Image from "next/image";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { screenshotUrl } from "@/lib/data";
import { thumbnailFitClassName } from "@/lib/thumbnail-fit";

type ProductPreviewProps = {
  title: string;
  url: string;
  liveHref: string;
};

export function ProductPreview({ title, url, liveHref }: ProductPreviewProps) {
  const [failed, setFailed] = useState(false);
  const src = screenshotUrl(url) ?? "";

  return (
    <div className="relative flex h-full min-h-[280px] items-center justify-center bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#08112b] p-5 sm:p-6 lg:min-h-[340px]">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute left-1/4 top-1/4 h-48 w-48 rounded-full bg-[#2090f0]/30 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-56 w-56 rounded-full bg-[#20dcc7]/25 blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg">
        <div className="mb-3 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white/90 backdrop-blur">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#2eca8b]" />
          Live product preview
        </div>

        <div className="overflow-hidden rounded-[20px] border border-white/15 bg-[#0b0b0d] shadow-[0_40px_100px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
          <div className="flex items-center gap-2 border-b border-white/10 bg-[#111318] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 truncate text-xs text-white/50">{liveHref.replace(/^https?:\/\//, "")}</span>
          </div>

          <div className="relative aspect-[16/10] bg-[#111318]">
            {src && !failed ? (
              <Image
                alt={`${title} screenshot`}
                className={thumbnailFitClassName(undefined, src)}
                fill
                onError={() => setFailed(true)}
                sizes="(min-width: 1024px) 50vw, 100vw"
                src={src}
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#e8f4fd] to-[#f0fdf9] p-8 text-center">
                <p className="text-sm font-bold text-[#5a6d90]">Platform dashboard</p>
                <p className="text-2xl font-black text-[#08112b]">{title}</p>
                <div className="grid w-full max-w-xs grid-cols-3 gap-2">
                  {["Bookings", "Fleet", "Admin"].map((label) => (
                    <div className="rounded-xl bg-white p-3 shadow-sm" key={label}>
                      <div className="text-lg font-black text-[#2090f0]">✓</div>
                      <div className="text-[10px] font-bold text-[#3c4858]">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <a
          className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#20dcc7] transition hover:text-white"
          href={liveHref}
          rel="noopener noreferrer"
          target="_blank"
        >
          Open live site <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
