"use client";

import clsx from "clsx";
import { AppStoreMark } from "@/components/AppStoreMark";
import { BrandIcon } from "@/components/BrandIcon";
import { useDictionary } from "@/lib/i18n";

type HeroShippedOnProps = {
  className?: string;
  align?: "start" | "end";
};

const tileClass =
  "hero-brand-tile hero-brand-float flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-[0_8px_28px_rgba(0,0,0,0.4)] backdrop-blur-sm";

export function HeroShippedOn({ className, align = "end" }: HeroShippedOnProps) {
  const { dict } = useDictionary();
  const tileSize = align === "end" ? "h-[4.25rem] w-[4.25rem]" : "h-14 w-14";

  return (
    <div
      className={clsx(
        "flex flex-col gap-4",
        align === "end" ? "items-end" : "items-start",
        className
      )}
    >
      <div
        className={clsx(
          "flex flex-wrap items-center gap-4 sm:gap-5",
          align === "end" ? "justify-end" : "justify-start"
        )}
      >
        <p className="shrink-0 text-[11px] font-bold uppercase tracking-[0.2em] text-[#2ee8d6]/80">
          {dict.common.shippedOn}
        </p>
        <div
          className={clsx(
            "flex flex-wrap items-center gap-3 sm:gap-4",
            align === "end" ? "justify-end" : "justify-start"
          )}
        >
          <div className={clsx(tileClass, "hero-brand-float-1 p-2", tileSize)}>
            <AppStoreMark className="h-full w-full" />
          </div>
          <div className={clsx(tileClass, "hero-brand-float-2 p-2.5", tileSize)}>
            <BrandIcon brand="google-play" onDark size={align === "end" ? 40 : 34} />
          </div>
          <div className={clsx(tileClass, "hero-brand-float-3 p-2.5", tileSize)}>
            <BrandIcon brand="shopify" size={align === "end" ? 40 : 34} />
          </div>
        </div>
      </div>
    </div>
  );
}
