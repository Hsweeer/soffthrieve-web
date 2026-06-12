"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Download } from "lucide-react";
import { downloadBlob } from "@/lib/crop-image";
import { BrowserPreviewFrame } from "@/components/portfolio/BrowserPreviewFrame";
import { CroppedMediaPreview } from "@/components/portfolio/CroppedMediaPreview";
import { Iphone16ProFrame } from "@/components/Iphone16ProFrame";
import { ThumbnailUploadField } from "@/components/portfolio/ThumbnailUploadField";
import {
  findPreset,
  type MediaUploadKind
} from "@/components/portfolio/thumbnail-crop-presets";

type ThumbnailCropEditorProps = {
  title?: string;
  liveUrl?: string;
  mediaKind?: MediaUploadKind;
  onCropped?: (blob: Blob, previewUrl: string, presetId: string) => void;
  className?: string;
};

export function ThumbnailCropEditor({
  title = "Portfolio preview",
  liveUrl = "https://example.com",
  mediaKind,
  onCropped,
  className
}: ThumbnailCropEditorProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [presetId, setPresetId] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const preset = presetId ? findPreset(presetId) : null;

  return (
    <div className={clsx("flex flex-col gap-5", className)}>
      <ThumbnailUploadField
        filename={`${title.replace(/\s+/g, "-").toLowerCase()}-thumb.webp`}
        mediaKind={mediaKind}
        onCropped={(blob, url, id) => {
          setPreviewUrl(url);
          setPresetId(id);
          onCropped?.(blob, url, id);
        }}
        showKindPicker={!mediaKind}
      />

      {previewUrl && preset && (
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Site preview</p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200/90 shadow-lg">
            {preset.preview === "web" ? (
              <BrowserPreviewFrame
                compact
                liveUrl={liveUrl}
                screenshotSrc={previewUrl}
                showFooterLink={false}
                thumbnailFit="cover-top"
                title={title}
              />
            ) : preset.preview === "mobile" ? (
              <div className="portfolio-device-stage flex items-center justify-center py-6">
                <Iphone16ProFrame alt={title} fit="cover" size="md" src={previewUrl} />
              </div>
            ) : preset.preview === "video" ? (
              <div className="bg-slate-900 p-4">
                <CroppedMediaPreview preset={preset} src={previewUrl} title="Video thumbnail" />
              </div>
            ) : (
              <div className="flex justify-center bg-slate-100 p-6">
                <CroppedMediaPreview className="max-w-xs" preset={preset} src={previewUrl} />
              </div>
            )}
          </div>
          <button
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white"
            onClick={() => {
              void fetch(previewUrl)
                .then((r) => r.blob())
                .then((blob) => downloadBlob(blob, `${title.replace(/\s+/g, "-").toLowerCase()}-thumb.webp`));
            }}
            type="button"
          >
            <Download className="h-4 w-4" />
            Download WebP
          </button>
        </div>
      )}
    </div>
  );
}
