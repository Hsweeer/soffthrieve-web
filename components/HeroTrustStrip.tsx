"use client";

import { Check, Clock, Star } from "lucide-react";
import { useDictionary } from "@/lib/i18n";

const ITEMS = [
  { icon: Star, key: "upwork" as const },
  { icon: Star, key: "fiverr" as const },
  { icon: Check, key: "apps" as const },
  { icon: Clock, key: "experience" as const }
];

export function HeroTrustStrip() {
  const { dict } = useDictionary();

  return (
    <section
      aria-label={dict.hero.trustStripAria}
      className="hero-trust-strip bg-[#1E3A5F] text-white"
    >
      <div className="container-shell py-3 md:py-0 md:min-h-12 md:flex md:items-center">
        <ul className="grid w-full grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-4 md:gap-0 md:divide-x md:divide-white/20">
          {ITEMS.map((item, index) => {
            const Icon = item.icon;
            const label = dict.hero.trustStrip[item.key];
            return (
              <li
                className="flex min-h-12 items-center justify-center gap-2 px-2 py-1 text-center md:min-h-12 md:px-4"
                key={item.key}
              >
                <Icon aria-hidden className="h-3.5 w-3.5 shrink-0 text-[#52a6f3]" strokeWidth={2.25} />
                <span className="text-[11px] font-medium leading-snug sm:text-xs">{label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
