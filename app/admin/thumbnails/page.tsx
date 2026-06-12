"use client";

import { useMemo, useState } from "react";
import mediaData from "@/portfolio/portfolio_media.json";
import { ThumbnailCropEditor } from "@/components/portfolio/ThumbnailCropEditor";
import type { MediaUploadKind } from "@/components/portfolio/thumbnail-crop-presets";

const PROJECTS = Object.keys(mediaData as Record<string, unknown>).sort();

const KIND_TABS: { id: MediaUploadKind; label: string }[] = [
  { id: "video-thumbnail", label: "Video thumb" },
  { id: "photo", label: "Photo" },
  { id: "portfolio-web", label: "Web card" },
  { id: "portfolio-mobile", label: "Mobile" }
];

export default function PortfolioThumbnailStudioPage() {
  const [projectId, setProjectId] = useState(PROJECTS[0] ?? "");
  const [kind, setKind] = useState<MediaUploadKind>("portfolio-web");
  const media = useMemo(
    () => (mediaData as Record<string, { previewWebUrl?: string }>)[projectId],
    [projectId]
  );

  return (
    <section className="min-h-screen bg-[#f8f9fc] py-10 sm:py-14">
      <div className="container-shell max-w-lg">
        <h1 className="text-2xl font-black text-[#08112b]">Upload & crop</h1>
        <p className="mt-2 text-sm text-slate-600">
          Choose type → select image → crop with the right ratio only → preview matches site exactly.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {KIND_TABS.map((tab) => (
            <button
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                kind === tab.id ? "bg-[#2090f0] text-white" : "bg-white text-slate-600 ring-1 ring-slate-200"
              }`}
              key={tab.id}
              onClick={() => setKind(tab.id)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <label className="text-xs font-bold uppercase tracking-wide text-slate-500" htmlFor="project-select">
            Project
          </label>
          <select
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium"
            id="project-select"
            onChange={(e) => setProjectId(e.target.value)}
            value={projectId}
          >
            {PROJECTS.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6">
          <ThumbnailCropEditor
            key={`${projectId}-${kind}`}
            liveUrl={media?.previewWebUrl ?? "https://softthrive.com"}
            mediaKind={kind}
            title={projectId}
          />
        </div>
      </div>
    </section>
  );
}
