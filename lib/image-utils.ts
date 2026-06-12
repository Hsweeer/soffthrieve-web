/** Upscale Apple CDN screenshot URLs for sharper renders in phone mockups. */
export function hiResAppScreenshot(url: string) {
  return url.replace(/\/\d+x\d+bb\.(jpg|png|webp)$/i, "/1290x2796bb.$1");
}

export { inferDefaultThumbnailFit, thumbnailFitClassName, thumbnailFitMode } from "@/lib/thumbnail-fit";
export type { ThumbnailFitConfig, ThumbnailFitPreset } from "@/lib/thumbnail-fit";
