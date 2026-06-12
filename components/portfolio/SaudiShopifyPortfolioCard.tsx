"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { SaudiShopifyStorePreview } from "@/components/portfolio/SaudiShopifyStorePreview";
import { getSaudiShowcaseLabel, type SaudiShopifyShowcase } from "@/lib/saudi-shopify-portfolio";
import { useDictionary } from "@/lib/i18n";

type SaudiShopifyPortfolioCardProps = {
  showcase: SaudiShopifyShowcase;
  size?: "card" | "spotlight";
  className?: string;
};

export function SaudiShopifyPortfolioCard({
  showcase,
  size = "spotlight",
  className
}: SaudiShopifyPortfolioCardProps) {
  const { dict, locale } = useDictionary();
  const title = getSaudiShowcaseLabel(showcase, locale, "name");
  const visitLabel = dict.common.openLiveSite;

  return (
    <div className={className}>
      <Link
        className="group block overflow-hidden rounded-[28px] border border-slate-200/90 bg-white shadow-[0_20px_50px_-20px_rgba(8,17,43,0.12)] transition hover:border-sky-200/90 hover:shadow-[0_24px_60px_-18px_rgba(32,144,240,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2090f0]"
        href={showcase.liveUrl}
        rel="noopener noreferrer"
        target="_blank"
        aria-label={`${visitLabel}: ${title}`}
      >
        <SaudiShopifyStorePreview showcase={showcase} size={size} />
        <div className="border-t border-slate-100 p-3.5 sm:p-5">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#2090f0]">
            {getSaudiShowcaseLabel(showcase, locale, "category")}
          </span>
          <p className="mt-1.5 line-clamp-2 text-[13px] leading-6 text-[#5a6d90] sm:mt-2 sm:line-clamp-3 sm:text-sm sm:leading-7">
            {getSaudiShowcaseLabel(showcase, locale, "description")}
          </p>
          <span className="mt-3 inline-flex min-h-9 items-center gap-1.5 text-sm font-bold text-[#2090f0] transition group-hover:gap-2.5 sm:mt-4 sm:min-h-10">
            {visitLabel}
            <ExternalLink aria-hidden className="h-3.5 w-3.5 shrink-0" />
          </span>
        </div>
      </Link>
    </div>
  );
}
