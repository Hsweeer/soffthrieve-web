"use client";

import clsx from "clsx";
import { useDictionary } from "@/lib/i18n";

type HeroUrgencyLineProps = {
  className?: string;
  centered?: boolean;
};

export function HeroUrgencyLine({ className, centered = false }: HeroUrgencyLineProps) {
  const { dict } = useDictionary();

  return (
    <p
      className={clsx(
        "text-[13px] font-normal leading-snug text-white/55",
        centered && "text-center",
        className
      )}
    >
      {dict.hero.urgencyLine}
    </p>
  );
}
