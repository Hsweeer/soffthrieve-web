"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import clsx from "clsx";
import { Iphone16ProFrame } from "@/components/Iphone16ProFrame";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { LaptopMockupFrame } from "@/components/real-results/LaptopMockupFrame";
import {
  getRealResultsWhatsAppMessage,
  type RealResultsCardConfig,
  type RealResultsCardId
} from "@/lib/real-results-cards";
import { useDictionary } from "@/lib/i18n";

type ServiceResultCardProps = {
  config: RealResultsCardConfig;
  badge: string;
  headline: string;
  supporting: string;
  cta: string;
};

export function ServiceResultCard({
  config,
  badge,
  headline,
  supporting,
  cta
}: ServiceResultCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const reducedMotion = useReducedMotion();
  const { locale } = useDictionary();
  const whatsappMessage = getRealResultsWhatsAppMessage(config, locale);

  const animate = !reducedMotion && inView;

  return (
    <motion.article
      className="real-results-card flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-[#F8F8F8] shadow-[0_12px_40px_rgba(15,23,42,0.08)]"
      role="listitem"
      ref={ref}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={animate ? { opacity: 1, y: 0 } : reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="real-results-card__mockup">
        {config.mockup === "phone" ? (
          <div className="real-results-card__phone-fit">
            <Iphone16ProFrame
              alt={config.imageAlt}
              className="real-results-card__iphone"
              fit={
                config.id === "mobile" || config.imageSrc.includes("mzstatic.com")
                  ? "contain"
                  : "cover"
              }
              hideHardwareButtons
              size="md"
              src={config.imageSrc}
            />
          </div>
        ) : (
          <div className="real-results-card__laptop-fit">
            <LaptopMockupFrame alt={config.imageAlt} src={config.imageSrc} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span
          className={clsx(
            "inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide",
            config.badgeClass
          )}
        >
          {badge}
        </span>

        <h3 className="mt-3 text-lg font-black leading-snug text-[#082f49] sm:text-xl">{headline}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{supporting}</p>

        <div className="mt-auto pt-5">
          <WhatsAppButton
            className="!min-h-12 !rounded-xl !text-[13px] sm:!text-sm"
            dark
            fullWidth
            locale={locale}
            message={whatsappMessage}
          >
            {cta}
          </WhatsAppButton>
        </div>
      </div>
    </motion.article>
  );
}
