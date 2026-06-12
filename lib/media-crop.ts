/** App-wide media upload with Instagram-style crop — import from here */
export { ThumbnailUploadField } from "@/components/portfolio/ThumbnailUploadField";
export { ThumbnailCropModal } from "@/components/portfolio/ThumbnailCropModal";
export { CroppedMediaPreview } from "@/components/portfolio/CroppedMediaPreview";
export type { MediaUploadKind } from "@/components/portfolio/thumbnail-crop-presets";
export {
  getCropPresets,
  getDefaultPresetId,
  inferMediaKindFromFile
} from "@/components/portfolio/thumbnail-crop-presets";
