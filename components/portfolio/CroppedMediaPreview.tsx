"use client";

import clsx from "clsx";
import type { CropAspectPreset } from "@/components/portfolio/thumbnail-crop-presets";

type CroppedMediaPreviewProps = {
  src: string;
  preset: CropAspectPreset;
  title?: string;
  className?: string;
  framed?: boolean;
};

/** Renders cropped output in the exact aspect ratio — no stretch or squish. */
export function CroppedMediaPreview({ src, preset, title, className, framed = true }: CroppedMediaPreviewProps) {
  return (
    <div className={clsx("w-full", className)}>
      {title ? <p className="mb-2 text-xs font-bold text-slate-500">{title}</p> : null}
      <div
        className={clsx(
          "relative w-full overflow-hidden bg-[#0a0a0a]",
          framed && "rounded-xl ring-1 ring-slate-200/80 shadow-md"
        )}
        style={{ aspectRatio: preset.aspectCss }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="h-full w-full object-cover object-center" draggable={false} src={src} />
      </div>
    </div>
  );
}
