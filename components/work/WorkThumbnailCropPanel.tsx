"use client";

import { useSearchParams } from "next/navigation";
import { ThumbnailUploadField } from "@/components/portfolio/ThumbnailUploadField";

/** Visible on /work?crop=1 — video, photo, and portfolio crop formats */
export function WorkThumbnailCropPanel() {
  const searchParams = useSearchParams();
  if (searchParams.get("crop") !== "1") return null;

  return (
    <div className="mb-10 max-w-md rounded-2xl border border-sky-200/90 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-sky-600">Upload & crop</p>
      <p className="mt-1 text-sm text-slate-600">
        Pick type first, then select image. Video → 16:9 only. Photo → 1:1, 4:5, or 16:9. Portfolio → matched card sizes.
      </p>
      <div className="mt-4">
        <ThumbnailUploadField showKindPicker />
      </div>
    </div>
  );
}
