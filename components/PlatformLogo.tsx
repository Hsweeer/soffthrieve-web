import clsx from "clsx";

type PlatformLogoProps = {
  src: string;
  alt: string;
  height: number;
  className?: string;
  width?: number;
  priority?: boolean;
};

/** Crisp SVG/PNG brand mark from `/public/brand-assets`. */
export function PlatformLogo({ src, alt, height, width, className, priority = false }: PlatformLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      className={clsx("block h-auto max-w-none object-contain", className)}
      decoding="async"
      height={height}
      loading={priority ? "eager" : "lazy"}
      src={src}
      style={{ height, width: width ?? "auto" }}
      width={width}
    />
  );
}
