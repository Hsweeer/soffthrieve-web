export type ThumbnailFitPreset =
  | "cover-top"
  | "cover-center"
  | "cover-bottom"
  | "contain-top"
  | "contain-center"
  | "contain-bottom";

export type ThumbnailFitSimple =
  | ThumbnailFitPreset
  | {
      fit?: "cover" | "contain";
      position?: "top" | "center" | "bottom";
    };

export type ThumbnailFitConfig = ThumbnailFitSimple | {
  /** Fit for phone mockups / App Store screenshots */
  mobile?: ThumbnailFitSimple;
  /** Fit for browser / website screenshots */
  web?: ThumbnailFitSimple;
  /** Fallback when variant is not specified */
  default?: ThumbnailFitSimple;
};

export type ThumbnailFitVariant = "mobile" | "web" | "default";

const POSITION_CLASS: Record<"top" | "center" | "bottom", string> = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom"
};

const PRESET_MAP: Record<
  ThumbnailFitPreset,
  { fit: "cover" | "contain"; position: "top" | "center" | "bottom" }
> = {
  "cover-top": { fit: "cover", position: "top" },
  "cover-center": { fit: "cover", position: "center" },
  "cover-bottom": { fit: "cover", position: "bottom" },
  "contain-top": { fit: "contain", position: "top" },
  "contain-center": { fit: "contain", position: "center" },
  "contain-bottom": { fit: "contain", position: "bottom" }
};

export const THUMBNAIL_FIT_PRESETS: ThumbnailFitPreset[] = [
  "cover-top",
  "cover-center",
  "cover-bottom",
  "contain-top",
  "contain-center",
  "contain-bottom"
];

/** Smart default when `thumbnailFit` is not set in portfolio_media.json */
export function inferDefaultThumbnailFit(src?: string): ThumbnailFitPreset {
  if (!src) return "contain-top";
  if (src.includes("mzstatic.com")) return "contain-top";
  if (src.includes("-play.") || src.includes("play.webp") || src.includes("mobile.webp")) {
    return "contain-top";
  }
  if (src.includes("-web.") || src.includes("web.webp")) return "cover-top";
  if (src.includes("microlink.io") || src.includes("mshots/v1")) return "cover-top";
  return "cover-top";
}

function isVariantMap(
  config: ThumbnailFitConfig
): config is { mobile?: ThumbnailFitSimple; web?: ThumbnailFitSimple; default?: ThumbnailFitSimple } {
  return (
    typeof config === "object" &&
    config !== null &&
    ("mobile" in config || "web" in config || "default" in config) &&
    !("fit" in config) &&
    typeof config !== "string"
  );
}

function pickConfigForVariant(config: ThumbnailFitConfig | null | undefined, variant: ThumbnailFitVariant): ThumbnailFitSimple | undefined {
  if (!config) return undefined;
  if (typeof config === "string") return config;
  if (!isVariantMap(config)) return config;
  if (variant === "mobile") return config.mobile ?? config.default;
  if (variant === "web") return config.web ?? config.default;
  return config.default ?? config.web ?? config.mobile;
}

export function normalizeThumbnailFitConfig(
  config?: ThumbnailFitConfig | null,
  src?: string,
  variant: ThumbnailFitVariant = "default"
): { fit: "cover" | "contain"; position: "top" | "center" | "bottom"; preset: ThumbnailFitPreset } {
  const scoped = pickConfigForVariant(config ?? undefined, variant);

  if (typeof scoped === "string" && scoped in PRESET_MAP) {
    const preset = scoped as ThumbnailFitPreset;
    return { preset, ...PRESET_MAP[preset] };
  }

  if (scoped && typeof scoped === "object") {
    const fit = scoped.fit ?? "contain";
    const position = scoped.position ?? "top";
    const preset = `${fit}-${position}` as ThumbnailFitPreset;
    return { fit, position, preset };
  }

  const preset = inferDefaultThumbnailFit(src);
  return { preset, ...PRESET_MAP[preset] };
}

export function thumbnailFitClassName(
  config?: ThumbnailFitConfig | null,
  src?: string,
  variant: ThumbnailFitVariant = "default"
): string {
  const { fit, position } = normalizeThumbnailFitConfig(config, src, variant);
  return fit === "cover" ? `object-cover ${POSITION_CLASS[position]}` : `object-contain ${POSITION_CLASS[position]}`;
}

export function thumbnailFitMode(
  config?: ThumbnailFitConfig | null,
  src?: string,
  variant: ThumbnailFitVariant = "default"
): "cover" | "contain" {
  return normalizeThumbnailFitConfig(config, src, variant).fit;
}
