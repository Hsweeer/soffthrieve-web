"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import clsx from "clsx";
import { HeroUrgencyLine } from "@/components/HeroUrgencyLine";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useDictionary, localePath } from "@/lib/i18n";

export function ShopifyHero() {
  const { dict, locale } = useDictionary();
  const isArabic = locale === "ar";

  return (
    <section className="site-chrome-ltr relative overflow-hidden bg-[#030508] py-16 text-white sm:py-20 lg:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,211,102,0.12),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(32,144,240,0.15),transparent_40%)]" />
      <div className="container-shell relative z-10">
        <motion.p
          className="text-xs font-black uppercase tracking-[0.18em] text-[#2ee8d6]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {dict.shopify.heroEyebrow}
        </motion.p>
        <motion.h1
          className={clsx(
            "mt-4 max-w-4xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl",
            isArabic && "locale-ar-text text-right"
          )}
          dir={isArabic ? "rtl" : "ltr"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          {dict.shopify.heroTitle}
        </motion.h1>
        <motion.p
          className={clsx(
            "mt-5 max-w-2xl text-base leading-8 text-white/70 sm:text-lg",
            isArabic && "locale-ar-text text-right"
          )}
          dir={isArabic ? "rtl" : "ltr"}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {dict.shopify.heroSub}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <WhatsAppButton dark fullWidth locale={locale}>
            {dict.cta.whatsappConsultation}
          </WhatsAppButton>
          <Link
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/8 px-6 text-sm font-bold text-white transition hover:bg-white/12"
            href="#shopify-portfolio"
          >
            {dict.shopify.heroCtaSecondary}
            <ArrowDown className="h-4 w-4" />
          </Link>
        </motion.div>

        <HeroUrgencyLine centered className="mt-4" />

        <motion.div
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {dict.shopify.stats.map((stat) => (
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-center backdrop-blur-sm" key={stat.label}>
              <p className="text-xl font-black text-white sm:text-2xl">{stat.value}</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
