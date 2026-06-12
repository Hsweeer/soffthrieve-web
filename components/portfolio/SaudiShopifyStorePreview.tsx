"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import clsx from "clsx";
import { Iphone16ProFrame } from "@/components/Iphone16ProFrame";
import type { SaudiShopifyShowcase } from "@/lib/saudi-shopify-portfolio";
import { getSaudiShowcaseLabel } from "@/lib/saudi-shopify-portfolio";
import { useDictionary } from "@/lib/i18n";

type SaudiShopifyStorePreviewProps = {
  showcase: SaudiShopifyShowcase;
  className?: string;
  size?: "card" | "spotlight";
};

export function SaudiShopifyStorePreview({
  showcase,
  className,
  size = "spotlight"
}: SaudiShopifyStorePreviewProps) {
  const { locale } = useDictionary();
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const title = getSaudiShowcaseLabel(showcase, locale, "name");
  const isSpotlight = size === "spotlight";

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div
      className={clsx(
        "portfolio-device-stage relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#030508]",
        isSpotlight ? "min-h-[220px] sm:min-h-[320px]" : "min-h-[200px]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute left-[12%] top-[18%] h-36 w-36 rounded-full bg-[#2090f0]/30 blur-3xl" />
        <div className="absolute bottom-[8%] right-[8%] h-40 w-40 rounded-full bg-[#25D366]/20 blur-3xl" />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center px-3 py-4 sm:px-6 sm:py-8">
        <div className="mb-2 flex items-center gap-2 sm:mb-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute hidden h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70 sm:inline-flex" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
            {locale === "ar" ? "متجر نشط — اضغط للزيارة" : "Live store — tap to visit"}
          </span>
        </div>

        {reducedMotion || isMobile ? (
          <div className="relative">
            <Iphone16ProFrame
              alt={`${title} mobile storefront`}
              priority={isSpotlight}
              size={isSpotlight ? "md" : "sm"}
              src={showcase.mobileScreenshot}
              thumbnailFit={showcase.thumbnailFit}
            />
          </div>
        ) : (
          <motion.div
            animate={{ y: [0, -7, 0] }}
            className="relative"
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Iphone16ProFrame
              alt={`${title} mobile storefront`}
              priority={isSpotlight}
              size={isSpotlight ? "md" : "sm"}
              src={showcase.mobileScreenshot}
              thumbnailFit={showcase.thumbnailFit}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
