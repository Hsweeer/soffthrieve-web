"use client";

import { SITE_STATS } from "@/lib/site-stats";
import { useDictionary } from "@/lib/i18n";

const STAT_DISPLAY = [
  SITE_STATS.mobileApps,
  SITE_STATS.shopifyStores,
  SITE_STATS.webApps,
  SITE_STATS.teamSize
] as const;

export function RealResultsStatsStrip() {
  const { dict } = useDictionary();
  const items = dict.home.realResults.stats;

  return (
    <div className="real-results-stats mt-10 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_8px_30px_rgba(10,27,51,0.05)] sm:mt-12">
      <div className="grid grid-cols-2 divide-x divide-y divide-slate-100 sm:grid-cols-4 sm:divide-y-0">
        {items.map((item, index) => (
          <div
            className="flex flex-col items-center justify-center px-3 py-5 text-center sm:px-4 sm:py-6"
            key={item.label}
          >
            <span className="text-xl font-black tabular-nums text-[#082f49] sm:text-2xl">
              {STAT_DISPLAY[index]}
            </span>
            <span className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
