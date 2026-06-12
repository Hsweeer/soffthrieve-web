import clsx from "clsx";
import type { ReactNode } from "react";

export type Brand =
  | "google-play"
  | "google-pay"
  | "google"
  | "figma"
  | "app-store"
  | "shopify"
  | "paypal"
  | "amazon";

type BrandIconProps = {
  brand: Brand;
  size?: number;
  className?: string;
  /** Use white Apple logo on dark hero tiles */
  onDark?: boolean;
};

function IconShell({
  size,
  viewBox,
  className,
  children
}: {
  size: number;
  viewBox: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      aria-hidden
      className={clsx("block shrink-0", className)}
      height={size}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      viewBox={viewBox}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

/** Official multicolor Google Play icon (logos:google-play-icon) */
function GooglePlayIcon({ size, className }: { size: number; className?: string }) {
  return (
    <IconShell className={className} size={size} viewBox="0 0 256 283">
      <path
        d="M119.553 134.916L1.06 259.061a32.14 32.14 0 0 0 47.062 19.071l133.327-75.934z"
        fill="#EA4335"
      />
      <path
        d="M239.37 113.814L181.715 80.79l-64.898 56.95l65.162 64.28l57.216-32.67a31.345 31.345 0 0 0 0-55.537z"
        fill="#FBBC04"
      />
      <path
        d="M1.06 23.487A30.6 30.6 0 0 0 0 31.61v219.327a32.3 32.3 0 0 0 1.06 8.124l122.555-120.966z"
        fill="#4285F4"
      />
      <path
        d="m120.436 141.274l61.278-60.483L48.564 4.503A32.85 32.85 0 0 0 32.051 0C17.644-.028 4.978 9.534 1.06 23.399z"
        fill="#34A853"
      />
    </IconShell>
  );
}

/** Official multicolor Google G (logos:google-icon) */
function GoogleIcon({ size, className }: { size: number; className?: string }) {
  return (
    <IconShell className={className} size={size} viewBox="0 0 256 262">
      <path
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
        fill="#4285F4"
      />
      <path
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
        fill="#34A853"
      />
      <path
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
        fill="#FBBC05"
      />
      <path
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
        fill="#EB4335"
      />
    </IconShell>
  );
}

/** Official multicolor Figma mark (logos:figma) */
function FigmaIcon({ size, className }: { size: number; className?: string }) {
  return (
    <IconShell className={className} size={size} viewBox="0 0 256 384">
      <path d="M64 384c35.328 0 64-28.672 64-64v-64H64c-35.328 0-64 28.672-64 64s28.672 64 64 64" fill="#0ACF83" />
      <path d="M0 192c0-35.328 28.672-64 64-64h64v128H64c-35.328 0-64-28.672-64-64" fill="#A259FF" />
      <path d="M0 64C0 28.672 28.672 0 64 0h64v128H64C28.672 128 0 99.328 0 64" fill="#F24E1E" />
      <path d="M128 0h64c35.328 0 64 28.672 64 64s-28.672 64-64 64h-64z" fill="#FF7262" />
      <path
        d="M256 192c0 35.328-28.672 64-64 64s-64-28.672-64-64s28.672-64 64-64s64 28.672 64 64"
        fill="#1ABCFE"
      />
    </IconShell>
  );
}

const APPLE_GLYPH =
  "M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25z";

/** App Store — blue tile + white mark on dark hero; black mark on light surfaces */
function AppStoreIcon({ size, className, onDark }: { size: number; className?: string; onDark?: boolean }) {
  if (onDark) {
    return (
      <IconShell className={className} size={size} viewBox="0 0 24 24">
        <rect fill="#1A9BF5" height="24" rx="5.5" width="24" />
        <path d={APPLE_GLYPH} fill="#FFFFFF" transform="translate(3.25 2.75) scale(0.7)" />
      </IconShell>
    );
  }

  return (
    <IconShell className={className} size={size} viewBox="0 0 24 24">
      <path d={APPLE_GLYPH} fill="#000000" />
    </IconShell>
  );
}

/** Official Shopify bag logo (logos:shopify) */
function ShopifyIcon({ size, className }: { size: number; className?: string }) {
  return (
    <IconShell className={className} size={size} viewBox="0 0 256 292">
      <path
        d="M223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357a19614 19614 0 0 0-23.383-1.743s-15.507-15.395-17.209-17.099c-1.703-1.703-5.029-1.185-6.32-.805c-.19.056-3.388 1.043-8.678 2.68c-5.18-14.906-14.322-28.604-30.405-28.604c-.444 0-.901.018-1.358.044C129.31 3.407 123.644.779 118.75.779c-37.465 0-55.364 46.835-60.976 70.635c-14.558 4.511-24.9 7.718-26.221 8.133c-8.126 2.549-8.383 2.805-9.45 10.462C21.3 95.806.038 260.235.038 260.235l165.678 31.042l89.77-19.42S223.973 58.8 223.775 57.34M156.49 40.848l-14.019 4.339c.005-.988.01-1.96.01-3.023c0-9.264-1.286-16.723-3.349-22.636c8.287 1.04 13.806 10.469 17.358 21.32m-27.638-19.483c2.304 5.773 3.802 14.058 3.802 25.238c0 .572-.005 1.095-.01 1.624c-9.117 2.824-19.024 5.89-28.953 8.966c5.575-21.516 16.025-31.908 25.161-35.828m-11.131-10.537c1.617 0 3.246.549 4.805 1.622c-12.007 5.65-24.877 19.88-30.312 48.297l-22.886 7.088C75.694 46.16 90.81 10.828 117.72 10.828"
        fill="#95BF47"
      />
      <path
        d="M221.237 54.983a19614 19614 0 0 0-23.383-1.743s-15.507-15.395-17.209-17.099c-.637-.634-1.496-.959-2.394-1.099l-12.527 256.233l89.762-19.418S223.972 58.8 223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357"
        fill="#5E8E3E"
      />
      <path
        d="m135.242 104.585l-11.069 32.926s-9.698-5.176-21.586-5.176c-17.428 0-18.305 10.937-18.305 13.693c0 15.038 39.2 20.8 39.2 56.024c0 27.713-17.577 45.558-41.277 45.558c-28.44 0-42.984-17.7-42.984-17.7l7.615-25.16s14.95 12.835 27.565 12.835c8.243 0 11.596-6.49 11.596-11.232c0-19.616-32.16-20.491-32.16-52.724c0-27.129 19.472-53.382 58.778-53.382c15.145 0 22.627 4.338 22.627 4.338"
        fill="#FFFFFF"
      />
    </IconShell>
  );
}

/** Google Pay — multicolor G mark (official palette) */
function GooglePayIcon({ size, className }: { size: number; className?: string }) {
  return (
    <IconShell className={className} size={size} viewBox="0 0 48 48">
      <path
        d="M43.2 20.5H24v7.3h11.1c-.5 2.6-2.8 7.6-11.1 7.6-6.7 0-12.1-5.5-12.1-12.3S17.3 11 24 11c3.8 0 6.4 1.6 7.9 3l5.4-5.2C34.3 5.8 29.6 3.5 24 3.5 13.4 3.5 4.8 12.1 4.8 22.7S13.4 42 24 42c12.3 0 15.3-8.8 15.3-13.4 0-.9-.1-1.6-.2-2.1H24v-6h19.2z"
        fill="#4285F4"
      />
      <path
        d="M6.6 14.5l5.3 3.9C13.7 15.2 18.4 12.5 24 12.5c3.8 0 6.4 1.6 7.9 3l5.4-5.2C34.3 5.8 29.6 3.5 24 3.5 17.2 3.5 11.2 7.1 7.4 12.3l-.8-1.1z"
        fill="#34A853"
      />
      <path
        d="M4.8 22.7c0-1.6.3-3.1.7-4.5L6.6 14.5 4.1 22.7c.5 2.8 1.8 5.3 3.6 7.3l2.1-3.2c-.9-1.2-1.4-2.7-1.4-4.1z"
        fill="#FBBC05"
      />
      <path
        d="M24 42c5.5 0 10.2-1.8 13.6-4.9l-6.3-5.2c-1.8 1.2-4.1 2-7.3 2-5.3 0-9.8-3.6-11.4-8.4l-2.1 3.2C11.2 38.9 17.2 42 24 42z"
        fill="#EA4335"
      />
    </IconShell>
  );
}

export function BrandIcon({ brand, size = 40, className, onDark = true }: BrandIconProps) {
  switch (brand) {
    case "google-play":
      return <GooglePlayIcon className={className} size={size} />;
    case "google-pay":
      return <GooglePayIcon className={className} size={size} />;
    case "google":
      return <GoogleIcon className={className} size={size} />;
    case "figma":
      return <FigmaIcon className={className} size={size} />;
    case "app-store":
      return <AppStoreIcon className={className} onDark={onDark} size={size} />;
    case "shopify":
      return <ShopifyIcon className={className} size={size} />;
    case "amazon":
      return (
        <IconShell className={className} size={size} viewBox="0 0 48 48">
          <path
            d="M25.5 32.5c-5.8 4.3-14.2 6.6-21.5 6.6-1.1 0-2.2-.1-3.2-.2 10.8 6.2 24.5 5 33.4-2.7 1-.8.2-2.3-.7-1.5z"
            fill="#FF9900"
          />
          <path
            d="M10.5 18.5c0-6.2 5.3-11.2 13.5-11.2 3.4 0 6.2 1 8.3 2.6l-2.2 2.6c-1.5-1.2-3.6-1.9-6-1.9-5.1 0-8.6 3.4-8.6 7.9s3.5 7.9 8.6 7.9c2.8 0 4.9-1.1 6.4-2.6l2.2 2.6c-2.4 2.2-5.7 3.5-9.5 3.5-8.5 0-14.7-5.4-14.7-11.4z"
            fill="#232F3E"
          />
          <path d="M6 28.5h36" stroke="#FF9900" strokeLinecap="round" strokeWidth="2.5" />
        </IconShell>
      );
    case "paypal":
      return (
        <IconShell className={className} size={size} viewBox="0 0 48 48">
          <path
            d="M32.2 18.5h-6.8c-.6 0-1 .4-1.1 1l-2.2 14c-.1.6.3 1.1.9 1.1h3.2c.5 0 1-.4 1.1-.9l.5-3.2h2c4.8 0 7.5-2.3 8.2-7 .4-2.4-.1-4.2-1.3-5.5-1.1-1.2-2.8-1.8-5.2-1.8zm-.4 6.8c-.4 2.4-2.4 2.4-4.3 2.4h-1.1l.6-3.8c0-.3.3-.5.6-.5h.5c1.3 0 2.6 0 3.2.7.5.5.6 1.2.5 1.2z"
            fill="#003087"
          />
          <path
            d="M38.7 18.5h-3.1c-.5 0-.8.3-.9.8l-.1.7-.2-.3c-.7-1.1-2.4-1.5-4.1-1.5-3.9 0-7.2 2.9-7.8 7.1-.3 2 .1 4 1.3 5.3 1.1 1.2 2.6 1.8 4.4 1.8 3.1 0 4.8-2 4.8-2l-.1.9c-.1.6.3 1.1.9 1.1h3.2c.5 0 1-.4 1.1-.9l1.9-12c.1-.5-.3-1-.9-1zm-4.9 9.1c-.3 2-1.9 3.4-4 3.4-1 0-1.8-.3-2.4-1-1.1-1.2-.5-3.4 1.2-4.8 1-.8 2.2-1.2 3.4-1.2 1.3 0 2.2.5 2.7 1.4.4.7.4 1.6.1 2.2z"
            fill="#009CDE"
          />
          <path
            d="M18.2 18.5H8.1c-.6 0-1 .4-1.1 1L4.1 38.6c-.1.6.3 1.1.9 1.1h3.3c.5 0 1-.4 1.1-.9l1.1-7.2h2.1c4.5 0 7.1-2.2 7.8-6.5.4-2.3 0-4.1-1.2-5.3-1-.9-2.5-1.4-4.6-1.4zm-.5 6.6c-.4 2.2-2.2 2.2-4 2.2H12l.6-3.6c.1-.3.4-.6.7-.6h.5c1.2 0 2.4 0 3 .6.5.5.6 1.1.6 1.4z"
            fill="#003087"
          />
        </IconShell>
      );
  }
}
