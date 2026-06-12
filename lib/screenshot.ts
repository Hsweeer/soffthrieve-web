const STORE_HOST_FRAGMENTS = ["apps.apple.com", "play.google.com", "itunes.apple.com"];

/** Store listings cannot be captured by free screenshot APIs — use App Store media instead. */
export function isStoreListingUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    return STORE_HOST_FRAGMENTS.some((fragment) => host.includes(fragment));
  } catch {
    return false;
  }
}

/**
 * Free website preview captures (WordPress mShots).
 * Do not use for App Store / Play Store URLs.
 */
export function websiteScreenshotUrl(url: string): string | undefined {
  if (isStoreListingUrl(url)) return undefined;
  const normalized = url.startsWith("http") ? url : `https://${url}`;
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(normalized)}?w=1200`;
}

/** @deprecated Use websiteScreenshotUrl — kept for imports across the codebase */
export function screenshotUrl(url: string): string | undefined {
  return websiteScreenshotUrl(url);
}
