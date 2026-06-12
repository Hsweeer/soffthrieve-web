"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { SaudiShopifyPortfolioCard } from "@/components/portfolio/SaudiShopifyPortfolioCard";
import { ShopifyPortfolioCarousel } from "@/components/portfolio/ShopifyPortfolioCarousel";
import { getSaudiShopifyShowcases, type SaudiShopifyShowcase } from "@/lib/saudi-shopify-portfolio";
import { localePath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";

type SaudiShopifyPortfolioShowcaseProps = {
  eyebrow: string;
  title: string;
  text: string;
  locale: Locale;
  showcases?: SaudiShopifyShowcase[];
  limit?: number;
  layout?: "carousel" | "grid";
  viewAllHref?: string;
  viewAllLabel?: string;
  carouselHint?: string;
  className?: string;
  id?: string;
};

export function SaudiShopifyPortfolioShowcase({
  eyebrow,
  title,
  text,
  locale,
  showcases,
  limit,
  layout = "carousel",
  viewAllHref,
  viewAllLabel,
  carouselHint,
  className,
  id
}: SaudiShopifyPortfolioShowcaseProps) {
  const items = showcases ?? getSaudiShopifyShowcases(limit);

  return (
    <section className={className} id={id}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2090f0]">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black text-[#08112b] sm:text-4xl">{title}</h2>
          <p className="mt-3 text-sm leading-7 text-[#5a6d90] sm:text-base">{text}</p>
          {carouselHint && layout === "carousel" ? (
            <p className="mt-2 text-sm font-medium text-slate-500">{carouselHint}</p>
          ) : null}
        </div>
        {viewAllHref && viewAllLabel && (
          <Link
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-sky-200 bg-white px-5 text-sm font-bold text-[#2090f0] transition hover:border-sky-400 hover:bg-sky-50"
            href={localePath(viewAllHref, locale)}
          >
            {viewAllLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="mt-10">
        {layout === "carousel" ? (
          <ShopifyPortfolioCarousel showTopHint={false}>
            {items.map((showcase) => (
              <SaudiShopifyPortfolioCard key={showcase.id} showcase={showcase} size="spotlight" />
            ))}
          </ShopifyPortfolioCarousel>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((showcase, index) => (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                key={showcase.id}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-40px" }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <SaudiShopifyPortfolioCard showcase={showcase} size="spotlight" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
