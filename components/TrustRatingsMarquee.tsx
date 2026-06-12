"use client";

import { motion } from "motion/react";
import { TRUST_BRAND_MAP } from "@/components/TrustBrandLogos";
import { SITE_STATS } from "@/lib/site-stats";
import { useDictionary } from "@/lib/i18n";

type PlatformRating = {
  kind: "platform";
  score: string;
  label: keyof typeof TRUST_BRAND_MAP;
};

type StatRating = {
  kind: "stat";
  score: string;
  label: string;
  detail?: string;
};

function PlatformCard({ score, label }: PlatformRating) {
  const Logo = TRUST_BRAND_MAP[label];

  return (
    <div className="trust-marquee-card trust-marquee-card--platform group">
      <div className="flex min-w-0 items-center gap-4 sm:gap-5">
        <Logo className="opacity-95 transition group-hover:opacity-100" height={28} />
        <span className="hidden h-9 w-px shrink-0 bg-slate-200 sm:block" aria-hidden />
        <div className="flex shrink-0 flex-col gap-1">
          <span className="text-sm font-bold uppercase tracking-[0.12em] text-emerald-600">{score}</span>
          <span className="sr-only">{label}</span>
        </div>
      </div>
    </div>
  );
}

function StatCard({ score, label, detail }: StatRating) {
  return (
    <div className="trust-marquee-card trust-marquee-card--stat">
      <span className="shrink-0 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">{score}</span>
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-sm font-bold leading-snug text-slate-700">{label}</span>
        {detail && <span className="text-xs font-medium leading-snug text-slate-400">{detail}</span>}
      </div>
    </div>
  );
}

function TrustMarqueeCard(props: PlatformRating | StatRating) {
  return props.kind === "platform" ? <PlatformCard {...props} /> : <StatCard {...props} />;
}

export function TrustRatingsMarquee() {
  const { dict } = useDictionary();
  const tm = dict.trustMarquee;

  const items: (PlatformRating | StatRating)[] = [
    { kind: "stat", score: SITE_STATS.mobileApps, label: tm.mobileApps, detail: tm.mobileDetail },
    { kind: "stat", score: SITE_STATS.webApps, label: tm.webApps, detail: tm.webDetail },
    { kind: "stat", score: SITE_STATS.shopifyStores, label: tm.shopifyStores, detail: tm.shopifyDetail },
    { kind: "platform", score: tm.topRated, label: "Upwork" },
    { kind: "platform", score: tm.topRated, label: "Fiverr" }
  ];

  const row = [...items, ...items];

  return (
    <section aria-label={dict.aria.ratingsCertifications} className="relative border-y border-slate-200/80 bg-[#f9fafb] py-10 sm:py-12">
      <div className="container-shell mb-8 sm:mb-10">
        <motion.p
          className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500"
          initial={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true, margin: "-40px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {dict.home.trustMarquee}
        </motion.p>
      </div>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)"
        }}
      >
        <div className="trust-marquee-track" role="list">
          {row.map((item, index) => (
            <div
              key={
                item.kind === "platform"
                  ? `platform-${item.label}-${index}`
                  : `stat-${item.label}-${index}`
              }
              role="listitem"
            >
              <TrustMarqueeCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
