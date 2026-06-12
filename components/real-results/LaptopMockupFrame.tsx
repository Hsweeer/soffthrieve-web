"use client";

import { hiResAppScreenshot } from "@/lib/image-utils";
import { thumbnailFitClassName, type ThumbnailFitConfig } from "@/lib/thumbnail-fit";

type LaptopMockupFrameProps = {
  src: string;
  alt: string;
  thumbnailFit?: ThumbnailFitConfig;
};

export function LaptopMockupFrame({ src, alt, thumbnailFit }: LaptopMockupFrameProps) {
  const hiRes = hiResAppScreenshot(src);

  return (
    <div className="real-results-laptop mx-auto w-full">
      <div className="real-results-laptop__lid rounded-t-xl border border-slate-300/80 bg-slate-200 p-2 shadow-inner">
        <div className="overflow-hidden rounded-lg border border-slate-200/90 bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={alt}
            className={`real-results-laptop__shot aspect-[16/10] w-full bg-slate-50 ${thumbnailFitClassName(thumbnailFit, hiRes)}`}
            decoding="async"
            draggable={false}
            loading="lazy"
            src={hiRes}
          />
        </div>
      </div>
      <div
        aria-hidden
        className="real-results-laptop__base mx-auto h-2.5 w-[92%] rounded-b-md border border-t-0 border-slate-300/70 bg-gradient-to-b from-slate-300 to-slate-400"
      />
      <div
        aria-hidden
        className="real-results-laptop__hinge mx-auto -mt-px h-1 w-[38%] rounded-full bg-slate-400/80"
      />
    </div>
  );
}
