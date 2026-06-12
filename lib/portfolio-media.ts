import mediaData from "@/portfolio/portfolio_media.json";
import { isStoreListingUrl, websiteScreenshotUrl } from "@/lib/screenshot";
import type { CaseStudy } from "@/lib/data";
import type { PortfolioProject } from "@/lib/portfolio";
import type { ThumbnailFitConfig } from "@/lib/thumbnail-fit";

export type PortfolioMedia = {
  artworkUrl?: string;
  previewImages?: string[];
  previewWebUrl?: string;
  /** Cached direct image URL (mShots, Microlink, or iTunes CDN) */
  previewImage?: string;
  /** Per-project thumbnail crop/fit — preset or { fit, position }. See lib/thumbnail-fit.ts */
  thumbnailFit?: ThumbnailFitConfig;
};

const mediaById = mediaData as Record<string, PortfolioMedia>;

export function getPortfolioMedia(projectId: string): PortfolioMedia | undefined {
  return mediaById[projectId];
}

export function resolveLivePreviewUrl(project: PortfolioProject): string | undefined {
  const media = getPortfolioMedia(project.id);
  const web = project.webUrls[0];
  if (web) return web;
  if (media?.previewWebUrl && !isStoreListingUrl(media.previewWebUrl)) return media.previewWebUrl;
  if (media?.previewWebUrl) return media.previewWebUrl;
  if (project.iosUrls[0]) return project.iosUrls[0];
  if (project.androidUrls[0]) return project.androidUrls[0];
  return undefined;
}

export function resolveWebScreenshotUrl(project: PortfolioProject): string | undefined {
  const media = getPortfolioMedia(project.id);
  if (media?.previewImage) return media.previewImage;
  const live = resolveLivePreviewUrl(project);
  if (!live || isStoreListingUrl(live)) return undefined;
  return websiteScreenshotUrl(live);
}

export function resolveCaseStudyPreview(study: CaseStudy) {
  const isStoreLive =
    study.liveUrl.includes("apps.apple.com") || study.liveUrl.includes("play.google.com");

  let webUrl: string | undefined;
  if (
    study.secondaryUrl &&
    !study.secondaryUrl.includes("apps.apple.com") &&
    !study.secondaryUrl.includes("play.google.com")
  ) {
    webUrl = study.secondaryUrl;
  } else if (!isStoreLive) {
    webUrl = study.liveUrl;
  }

  const media = mediaById[getCaseStudyPortfolioId(study.slug)];
  const artworkUrl = study.artworkUrl ?? media?.artworkUrl;
  const previewImages = (study.previewImages?.length ? study.previewImages : media?.previewImages) ?? [];

  let screenshotUrl: string | undefined;
  if (media?.previewImage) {
    screenshotUrl = media.previewImage;
  } else if (webUrl && !isStoreListingUrl(webUrl)) {
    screenshotUrl = websiteScreenshotUrl(webUrl);
  }

  const isMobile = previewImages.length > 0;
  const showArtworkOnly = Boolean(artworkUrl) && isStoreLive && !screenshotUrl && !previewImages.length;

  return {
    webUrl: webUrl ?? (media?.previewWebUrl && !isStoreListingUrl(media.previewWebUrl) ? media.previewWebUrl : undefined),
    screenshotUrl,
    artworkUrl,
    previewImages,
    isMobile,
    showArtworkOnly,
    thumbnailFit: media?.thumbnailFit
  };
}

export function getCaseStudyThumbnailFit(slug: string) {
  return getPortfolioMedia(getCaseStudyPortfolioId(slug))?.thumbnailFit;
}

function getCaseStudyPortfolioId(slug: string): string {
  const map: Record<string, string> = {
    "frenzone-live": "frenzone",
    "execlane-chauffeur-service": "execlane",
    "scribbes-social-platform": "scribbes",
    "iammusic-lms": "iammusic",
    "dentclinic-healthcare-saas": "dentclinic",
    "prosready-marketplace": "prosready",
    "repairoo-service-bidding": "repairoo",
    "fasal360-agtech-ai": "fasal360",
    "food-buddy-restaurant-platform": "foodbuddy",
    "virtual-try-on-commerce": "virtualtryon",
    "eurojobs-ecosystem": "eurojobs"
  };
  return map[slug] ?? slug;
}

export function resolveProjectPreview(project: PortfolioProject) {
  const media = getPortfolioMedia(project.id);
  const liveUrl = resolveLivePreviewUrl(project);
  const screenshotUrl = resolveWebScreenshotUrl(project);
  const previewImages = media?.previewImages ?? [];
  const artworkUrl = media?.artworkUrl;

  const variant =
    previewImages.length > 0
      ? ("mobile" as const)
      : screenshotUrl
        ? ("web" as const)
        : artworkUrl
          ? ("artwork" as const)
          : ("fallback" as const);

  return {
    liveUrl,
    screenshotUrl,
    artworkUrl,
    previewImages,
    variant,
    thumbnailFit: media?.thumbnailFit
  };
}
