"use client";

import Image from "next/image";
import { AppStoreMark } from "@/components/AppStoreMark";
import { BrandIcon } from "@/components/BrandIcon";
import { IntegrationIcon } from "@/components/IntegrationIcon";
import { INTEGRATION_ITEMS } from "@/lib/integrations";
import { useDictionary } from "@/lib/i18n";

type MarqueeLogo =
  | { name: string; kind: "integration"; slug: string; color: string }
  | { name: "App Store"; kind: "app-store" }
  | { name: "Google Play"; kind: "google-play" }
  | { name: "Google Pay"; kind: "google-pay" }
  | { name: string; kind: "image"; image: string };

const LEADING_LOGOS: MarqueeLogo[] = [
  { name: "Shopify", kind: "integration", slug: "shopify", color: "7AB55C" },
  { name: "WhatsApp", kind: "image", image: "/brand-assets/social/whatsapp.svg" },
  { name: "App Store", kind: "app-store" },
  { name: "Google Play", kind: "google-play" },
  { name: "Apple Pay", kind: "integration", slug: "applepay", color: "000000" },
  { name: "Google Pay", kind: "google-pay" }
];

const LEADING_SLUGS = new Set(["shopify", "applepay", "googleplay", "appstore"]);

function buildMarqueeLogos(): MarqueeLogo[] {
  const tail = INTEGRATION_ITEMS.filter((item) => !LEADING_SLUGS.has(item.slug)).map(
    (item): MarqueeLogo => ({
      name: item.name,
      kind: "integration",
      slug: item.slug,
      color: item.color
    })
  );

  return [...LEADING_LOGOS, ...tail];
}

const MARQUEE_LOGOS = buildMarqueeLogos();

function MarqueePill({ item }: { item: MarqueeLogo }) {
  return (
    <div className="flex w-[4.75rem] shrink-0 flex-col items-center gap-2 sm:w-[5.5rem]" title={item.name}>
      <div className="flex h-14 w-full items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-2 shadow-[0_2px_14px_rgba(15,23,42,0.07)] transition-shadow hover:shadow-[0_4px_20px_rgba(15,23,42,0.1)] sm:h-[3.75rem]">
        {item.kind === "integration" ? (
          <IntegrationIcon color={item.color} size={30} slug={item.slug} />
        ) : item.kind === "app-store" ? (
          <AppStoreMark className="h-8 w-8 sm:h-9 sm:w-9" />
        ) : item.kind === "google-play" ? (
          <BrandIcon brand="google-play" size={30} />
        ) : item.kind === "google-pay" ? (
          <BrandIcon brand="google-pay" size={30} />
        ) : (
          <Image alt="" className="h-8 w-8 object-contain" height={32} src={item.image} width={32} />
        )}
      </div>
      <span className="max-w-full truncate text-center text-[10px] font-medium leading-tight text-slate-600 sm:text-[11px]">
        {item.name}
      </span>
    </div>
  );
}

export function HomeTrustLogos() {
  const { dict } = useDictionary();
  const row = [...MARQUEE_LOGOS, ...MARQUEE_LOGOS];

  return (
    <section aria-label={dict.aria.integrations} className="relative z-10 w-full">
      <div className="mb-4 text-center sm:mb-5">
        <p className="text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
          {dict.home.homeTrustLogosText}
        </p>
      </div>

      <div
        className="relative overflow-hidden py-2"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)"
        }}
      >
        <div className="marquee-track items-start gap-4 px-2 sm:gap-5">
          {row.map((item, index) => (
            <MarqueePill item={item} key={`${item.name}-${index}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
