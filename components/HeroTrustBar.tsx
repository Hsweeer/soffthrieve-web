"use client";

import clsx from "clsx";
import { FIVERR_FI, UPWORK_UP } from "@/lib/integrations";
import { PlatformLogo } from "@/components/PlatformLogo";
import { SITE_STATS } from "@/lib/site-stats";
import { useDictionary } from "@/lib/i18n";

const trustStats = [
  { value: SITE_STATS.mobileApps, key: "mobile" as const },
  { value: SITE_STATS.webApps, key: "web" as const },
  { value: SITE_STATS.shopifyStores, key: "shopify" as const }
];

function TrustDivider() {
  return <span aria-hidden className="hidden h-5 w-px shrink-0 bg-white/12 md:block" />;
}

type HeroTrustBarProps = {
  className?: string;
};

export function HeroTrustBar({ className }: HeroTrustBarProps) {
  const { dict } = useDictionary();

  return (
    <div className={clsx("hero-trust border-t border-white/10 pt-5 sm:pt-6", className)}>
      <div className="flex flex-col gap-5 md:flex-row md:flex-wrap md:items-center md:gap-x-7 md:gap-y-4 lg:gap-x-8">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-7">
          {trustStats.map((item) => (
            <div className="hero-trust-stat flex items-baseline gap-1.5 text-xs sm:text-sm" key={item.key}>
              <span className="font-black tabular-nums text-white">{item.value}</span>
              <span className="font-medium text-white/45">{dict.hero.trustLabels[item.key]}</span>
            </div>
          ))}
        </div>

        <TrustDivider />

        <div
          className="hero-trust-platform flex flex-wrap items-center gap-3 sm:gap-4"
          title={dict.aria.topRatedPlatforms}
        >
          <div className="flex items-center gap-2.5 sm:gap-3">
            <PlatformLogo alt="Upwork" height={32} src={UPWORK_UP} width={32} />
            <PlatformLogo alt="Fiverr" height={32} src={FIVERR_FI} width={32} />
          </div>
          <span className="inline-flex items-center rounded-full border border-[#2ee8d6]/35 bg-[#2ee8d6]/10 px-3.5 py-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#2ee8d6]">
              {dict.hero.trustLabels.topRated}
            </span>
          </span>
          <span className="sr-only">{dict.aria.topRatedPlatforms}</span>
        </div>
      </div>
    </div>
  );
}
