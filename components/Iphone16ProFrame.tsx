"use client";

import clsx from "clsx";
import { hiResAppScreenshot } from "@/lib/image-utils";
import { thumbnailFitMode, type ThumbnailFitConfig } from "@/lib/thumbnail-fit";

type Iphone16ProFrameProps = {
  src: string;
  alt: string;
  priority?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  hideHardwareButtons?: boolean;
  /** Per-project fit from portfolio_media.json — overrides auto detection */
  thumbnailFit?: ThumbnailFitConfig;
  /** Direct fit override (legacy) */
  fit?: "contain" | "cover";
};

const sizeClass = {
  sm: "iphone-16-device--sm",
  md: "iphone-16-device--md",
  lg: "iphone-16-device--lg"
};

export function Iphone16ProFrame({
  src,
  alt,
  priority,
  size = "md",
  className,
  hideHardwareButtons = false,
  thumbnailFit,
  fit: fitProp
}: Iphone16ProFrameProps) {
  const hiRes = hiResAppScreenshot(src);
  const fit = fitProp ?? thumbnailFitMode(thumbnailFit, src, "mobile");

  return (
    <div className={clsx("iphone-16-device shrink-0", sizeClass[size], className)}>
      <div className="iphone-16-bezel">
        <div aria-hidden className="iphone-16-island" />
        <div className="iphone-16-screen">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={alt}
            className={`iphone-16-shot ${fit === "cover" ? "iphone-16-shot--cover" : "iphone-16-shot--contain"}`}
            decoding="async"
            draggable={false}
            fetchPriority={priority ? "high" : "auto"}
            loading={priority ? "eager" : "lazy"}
            src={hiRes}
          />
        </div>
        {!hideHardwareButtons ? (
          <>
            <div aria-hidden className="iphone-16-btn iphone-16-btn--left" />
            <div aria-hidden className="iphone-16-btn iphone-16-btn--right" />
          </>
        ) : null}
      </div>
    </div>
  );
}
