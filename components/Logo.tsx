import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

type LogoProps = {
  variant?: "dark" | "light";
  onDark?: boolean;
  /** Header mode — logo mark only, no tagline text */
  showText?: boolean;
  /** Logo height in px (width scales from wordmark aspect ratio) */
  iconSize?: number;
};

const LOGO_ASPECT = 3.35;

export function Logo({
  variant = "dark",
  onDark = false,
  showText = true,
  iconSize = 44
}: LogoProps) {
  const logoHeight = iconSize;
  const logoWidth = Math.round(iconSize * LOGO_ASPECT);

  return (
    <Link aria-label="SoftThrive home" className="group flex items-center gap-3" href="/">
      <span
        className="relative flex shrink-0 items-center transition-transform duration-300 group-hover:scale-[1.02]"
        style={{ width: logoWidth, height: logoHeight }}
      >
        <Image
          alt="SoftThrive"
          className={clsx(
            "object-contain object-left",
            onDark
              ? "drop-shadow-[0_2px_18px_rgba(82,165,243,0.45)]"
              : "drop-shadow-[0_1px_10px_rgba(32,144,240,0.2)]"
          )}
          fill
          priority
          quality={92}
          sizes={`${logoWidth}px`}
          src="/logo-dark.webp"
        />
      </span>
      {showText && (
        <span className="leading-none">
          <span
            className={clsx(
              "block text-lg font-black tracking-[0]",
              variant === "light" ? "text-white" : "text-[#082f49]"
            )}
          >
            SoftThrive
          </span>
          <span
            className={clsx(
              "block text-[11px] font-semibold uppercase tracking-[0.16em]",
              variant === "light" ? "text-sky-200" : "text-sky-600"
            )}
          >
            We make IT happen
          </span>
        </span>
      )}
    </Link>
  );
}
