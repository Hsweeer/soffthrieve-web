"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, Download, Film, ImageIcon, Monitor, Smartphone } from "lucide-react";
import clsx from "clsx";
import { downloadBlob } from "@/lib/crop-image";
import { ThumbnailCropModal } from "@/components/portfolio/ThumbnailCropModal";
import { CroppedMediaPreview } from "@/components/portfolio/CroppedMediaPreview";
import {
  findPreset,
  getDefaultPresetId,
  type MediaUploadKind
} from "@/components/portfolio/thumbnail-crop-presets";

const KIND_OPTIONS: {
  id: MediaUploadKind;
  label: string;
  hint: string;
  icon: typeof Film;
}[] = [
  { id: "video-thumbnail", label: "Video thumbnail", hint: "16:9 — YouTube / video cover", icon: Film },
  { id: "photo", label: "Photo", hint: "1:1, 4:5, or 16:9", icon: ImageIcon },
  { id: "portfolio-web", label: "Portfolio web", hint: "16:10 web card", icon: Monitor },
  { id: "portfolio-mobile", label: "Portfolio mobile", hint: "9:16 phone frame", icon: Smartphone }
];

type ThumbnailUploadFieldProps = {
  label?: string;
  hint?: string;
  /** Lock upload to one kind, or let user pick */
  mediaKind?: MediaUploadKind;
  showKindPicker?: boolean;
  filename?: string;
  onCropped?: (blob: Blob, previewUrl: string, presetId: string) => void;
  className?: string;
};

/** Select image → crop opens with ratios that match the upload type. */
export function ThumbnailUploadField({
  label = "Select image",
  hint,
  mediaKind: mediaKindProp,
  showKindPicker = true,
  filename = "upload.webp",
  onCropped,
  className
}: ThumbnailUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [mediaKind, setMediaKind] = useState<MediaUploadKind>(mediaKindProp ?? "photo");
  const [source, setSource] = useState<string | null>(null);
  const [cropOpen, setCropOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [presetId, setPresetId] = useState(getDefaultPresetId(mediaKind));

  useEffect(() => {
    if (mediaKindProp) setMediaKind(mediaKindProp);
  }, [mediaKindProp]);

  useEffect(() => {
    setPresetId(getDefaultPresetId(mediaKindProp ?? mediaKind));
  }, [mediaKindProp, mediaKind]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const activeKind = mediaKindProp ?? mediaKind;
  const preset = findPreset(presetId, activeKind);
  const kindMeta = KIND_OPTIONS.find((k) => k.id === activeKind);

  const openPicker = () => inputRef.current?.click();

  const onFile = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSource(String(reader.result));
      setCropOpen(true);
    };
    reader.readAsDataURL(file);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleComplete = (blob: Blob, url: string, id: string) => {
    if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(url);
    setPresetId(id);
    onCropped?.(blob, url, id);
  };

  return (
    <>
      <input
        accept="image/png,image/jpeg,image/webp,image/heic,image/heif"
        className="sr-only"
        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        ref={inputRef}
        type="file"
      />

      <div className={clsx("space-y-3", className)}>
        {showKindPicker && !mediaKindProp && (
          <div className="grid grid-cols-2 gap-2">
            {KIND_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const active = mediaKind === opt.id;
              return (
                <button
                  className={clsx(
                    "flex flex-col items-start gap-1 rounded-xl border px-3 py-2.5 text-left transition",
                    active
                      ? "border-sky-500 bg-sky-50 ring-2 ring-sky-500/20"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  )}
                  key={opt.id}
                  onClick={() => setMediaKind(opt.id)}
                  type="button"
                >
                  <Icon className={clsx("h-4 w-4", active ? "text-sky-600" : "text-slate-400")} />
                  <span className="text-xs font-bold text-slate-900">{opt.label}</span>
                  <span className="text-[10px] leading-tight text-slate-500">{opt.hint}</span>
                </button>
              );
            })}
          </div>
        )}

        <button
          className="flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-sky-300/90 bg-sky-50/60 px-4 py-8 text-center transition hover:border-sky-400 hover:bg-sky-50"
          onClick={openPicker}
          type="button"
        >
          <ImagePlus className="h-9 w-9 text-sky-500" />
          <span className="text-sm font-bold text-slate-900">{label}</span>
          <span className="text-xs text-slate-500">
            {hint ?? kindMeta?.hint ?? "Crop opens right after you pick a file"}
          </span>
        </button>

        {previewUrl && preset && (
          <div className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-3">
            <CroppedMediaPreview preset={preset} src={previewUrl} title={`Preview — ${preset.label}`} />
            <button
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700"
              onClick={() => {
                void fetch(previewUrl)
                  .then((r) => r.blob())
                  .then((blob) => downloadBlob(blob, filename));
              }}
              type="button"
            >
              <Download className="h-4 w-4" />
              Download cropped file
            </button>
          </div>
        )}
      </div>

      {source && (
        <ThumbnailCropModal
          imageSrc={source}
          mediaKind={activeKind}
          onClose={() => setCropOpen(false)}
          onComplete={handleComplete}
          open={cropOpen}
        />
      )}
    </>
  );
}
