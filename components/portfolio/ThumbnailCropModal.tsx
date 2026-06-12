"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Cropper, { type Area, type Point } from "react-easy-crop";
import { Check, X, ZoomIn } from "lucide-react";
import clsx from "clsx";
import { blobToObjectUrl, getCroppedImageBlob } from "@/lib/crop-image";
import { CroppedMediaPreview } from "@/components/portfolio/CroppedMediaPreview";
import {
  findPreset,
  getCropPresets,
  getDefaultPresetId,
  type MediaUploadKind
} from "@/components/portfolio/thumbnail-crop-presets";

type ThumbnailCropModalProps = {
  imageSrc: string;
  open: boolean;
  onClose: () => void;
  onComplete: (blob: Blob, previewUrl: string, presetId: string) => void;
  mediaKind: MediaUploadKind;
};

export function ThumbnailCropModal({
  imageSrc,
  open,
  onClose,
  onComplete,
  mediaKind
}: ThumbnailCropModalProps) {
  const presets = useMemo(() => getCropPresets(mediaKind), [mediaKind]);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspectId, setAspectId] = useState(getDefaultPresetId(mediaKind));
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [livePreview, setLivePreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const aspectPreset = findPreset(aspectId, mediaKind) ?? presets[0];
  const showRatioPicker = presets.length > 1;

  useEffect(() => {
    if (!open) return;
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setAspectId(getDefaultPresetId(mediaKind));
    setCroppedAreaPixels(null);
    setLivePreview(null);
  }, [open, imageSrc, mediaKind]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  useEffect(() => {
    if (!open || !croppedAreaPixels) return;
    let cancelled = false;
    void getCroppedImageBlob(imageSrc, croppedAreaPixels, "image/webp").then((blob) => {
      if (cancelled) return;
      const url = blobToObjectUrl(blob);
      setLivePreview((prev) => {
        if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
        return url;
      });
    });
    return () => {
      cancelled = true;
    };
  }, [open, imageSrc, croppedAreaPixels, aspectId]);

  const handleDone = async () => {
    if (!croppedAreaPixels) return;
    setBusy(true);
    try {
      const blob = await getCroppedImageBlob(imageSrc, croppedAreaPixels, "image/webp");
      onComplete(blob, blobToObjectUrl(blob), aspectPreset.id);
      onClose();
    } finally {
      setBusy(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-black">
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
        <button
          aria-label="Cancel crop"
          className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
          onClick={onClose}
          type="button"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="text-center">
          <p className="text-sm font-bold text-white">Adjust crop</p>
          <p className="text-[11px] text-white/50">{aspectPreset.label} — fits perfectly when uploaded</p>
        </div>
        <button
          className="inline-flex items-center gap-1.5 rounded-full bg-[#2090f0] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#1878c9] disabled:opacity-50"
          disabled={busy || !croppedAreaPixels}
          onClick={() => void handleDone()}
          type="button"
        >
          <Check className="h-4 w-4" />
          Done
        </button>
      </div>

      <div className="relative min-h-0 flex-1">
        <Cropper
          aspect={aspectPreset.ratio}
          crop={crop}
          cropShape="rect"
          image={imageSrc}
          objectFit="contain"
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          showGrid
          zoom={zoom}
        />
      </div>

      <div className="shrink-0 space-y-3 border-t border-white/10 bg-[#0a0a0a] px-4 py-4 sm:px-6">
        {showRatioPicker ? (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {presets.map((preset) => (
              <button
                className={clsx(
                  "shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition",
                  aspectId === preset.id ? "bg-white text-black" : "bg-white/10 text-white/80 hover:bg-white/20"
                )}
                key={preset.id}
                onClick={() => setAspectId(preset.id)}
                type="button"
              >
                {preset.label}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center text-xs font-medium text-white/60">
            Locked to {aspectPreset.label} for best display
          </p>
        )}

        {livePreview && (
          <div className="mx-auto max-w-xs rounded-xl bg-white/5 p-3">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-white/50">Live preview</p>
            <CroppedMediaPreview framed={false} preset={aspectPreset} src={livePreview} />
          </div>
        )}

        <div className="flex items-center gap-3">
          <ZoomIn className="h-4 w-4 shrink-0 text-white/60" />
          <input
            aria-label="Zoom"
            className="w-full accent-white"
            max={3}
            min={1}
            onChange={(e) => setZoom(Number(e.target.value))}
            step={0.02}
            type="range"
            value={zoom}
          />
        </div>
      </div>
    </div>
  );
}
