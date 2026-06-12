/** Local /public raster paths — prefer WebP when available. */
export function staticImage(src: string) {
  if (!src.startsWith("/")) return src;
  if (/\.(png|jpe?g)$/i.test(src)) {
    return src.replace(/\.(png|jpe?g)$/i, ".webp");
  }
  return src;
}
