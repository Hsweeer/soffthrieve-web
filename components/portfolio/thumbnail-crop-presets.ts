export type MediaUploadKind =
  | "video-thumbnail"
  | "photo"
  | "portfolio-web"
  | "portfolio-mobile";

export type CropPreviewTarget = "video" | "photo" | "web" | "mobile" | "square";

export type CropAspectPreset = {
  id: string;
  label: string;
  /** width / height */
  ratio: number;
  preview: CropPreviewTarget;
  /** CSS aspect-ratio value e.g. "16 / 9" */
  aspectCss: string;
};

/** Video cover / YouTube-style thumbnail — true 16:9 */
const VIDEO_16_9: CropAspectPreset = {
  id: "video-16-9",
  label: "Video 16:9",
  ratio: 16 / 9,
  preview: "video",
  aspectCss: "16 / 9"
};

/** Instagram / feed photo */
const PHOTO_SQUARE: CropAspectPreset = {
  id: "photo-1-1",
  label: "Photo 1:1",
  ratio: 1,
  preview: "square",
  aspectCss: "1 / 1"
};

const PHOTO_PORTRAIT: CropAspectPreset = {
  id: "photo-4-5",
  label: "Photo 4:5",
  ratio: 4 / 5,
  preview: "photo",
  aspectCss: "4 / 5"
};

const PHOTO_LANDSCAPE: CropAspectPreset = {
  id: "photo-16-9",
  label: "Photo 16:9",
  ratio: 16 / 9,
  preview: "video",
  aspectCss: "16 / 9"
};

/** Portfolio browser card — matches BrowserPreviewFrame */
const PORTFOLIO_WEB: CropAspectPreset = {
  id: "portfolio-web",
  label: "Web card 16:10",
  ratio: 16 / 10,
  preview: "web",
  aspectCss: "16 / 10"
};

/** Portfolio phone mockup */
const PORTFOLIO_MOBILE: CropAspectPreset = {
  id: "portfolio-mobile",
  label: "Mobile 9:16",
  ratio: 9 / 16,
  preview: "mobile",
  aspectCss: "9 / 16"
};

export const CROP_PRESETS_BY_KIND: Record<MediaUploadKind, CropAspectPreset[]> = {
  "video-thumbnail": [VIDEO_16_9],
  photo: [PHOTO_SQUARE, PHOTO_PORTRAIT, PHOTO_LANDSCAPE],
  "portfolio-web": [PORTFOLIO_WEB],
  "portfolio-mobile": [PORTFOLIO_MOBILE]
};

export function getCropPresets(kind: MediaUploadKind): CropAspectPreset[] {
  return CROP_PRESETS_BY_KIND[kind];
}

export function getDefaultPresetId(kind: MediaUploadKind): string {
  return CROP_PRESETS_BY_KIND[kind][0].id;
}

export function findPreset(id: string, kind?: MediaUploadKind): CropAspectPreset | undefined {
  const pool = kind ? CROP_PRESETS_BY_KIND[kind] : Object.values(CROP_PRESETS_BY_KIND).flat();
  return pool.find((p) => p.id === id);
}

/** Infer kind from file MIME — images only for crop; caller sets video-thumbnail by context */
export function inferMediaKindFromFile(file: File): MediaUploadKind {
  if (file.type.startsWith("video/")) return "video-thumbnail";
  return "photo";
}
