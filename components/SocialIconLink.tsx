"use client";

import clsx from "clsx";
import Image from "next/image";
import { SOCIAL_LINKS, type SocialLink } from "@/lib/site-social";
import { useDictionary } from "@/lib/i18n";
const ICON_SIZE = 18;

/** Fiverr wordmark is wide — give it proportional width so it matches other marks */
function iconDimensions(id: SocialLink["id"]) {
  if (id === "fiverr") {
    return { width: 28, height: ICON_SIZE, className: "h-[18px] w-[28px]" };
  }
  return { width: ICON_SIZE, height: ICON_SIZE, className: "h-[18px] w-[18px]" };
}

type SocialIconLinkProps = {
  link: SocialLink;
  className?: string;
};

export function SocialIconLink({ link, className }: SocialIconLinkProps) {
  const src = `/brand-assets/social/${link.id}.svg`;
  const dims = iconDimensions(link.id);

  return (
    <a
      aria-label={link.label}
      className={clsx(
        "footer-social-link inline-flex shrink-0 items-center justify-center rounded-sm p-1 transition",
        className
      )}
      href={link.href}
      rel="noopener noreferrer"
      target="_blank"
      title={link.label}
    >
      <Image
        alt=""
        aria-hidden
        className={clsx("object-contain opacity-75 transition hover:opacity-100", dims.className)}
        height={dims.height}
        src={src}
        unoptimized
        width={dims.width}
      />
    </a>
  );
}

export function FooterSocialRow({ className }: { className?: string }) {
  const { dict } = useDictionary();

  return (
    <div className={clsx("border-t border-white/[0.08] pt-5", className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">{dict.common.connect}</p>      <ul className="mt-3.5 flex flex-wrap items-end gap-x-3.5 gap-y-3">
        {SOCIAL_LINKS.map((link) => (
          <li className="flex flex-col items-center" key={link.id}>
            <SocialIconLink link={link} />
            {link.id === "instagram" ? (
              <span className="mt-1 text-[10px] font-medium text-white/45">{dict.footer.instagramFollow}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
