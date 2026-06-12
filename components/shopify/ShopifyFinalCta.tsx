"use client";

import { motion } from "motion/react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useDictionary, useLocale } from "@/lib/i18n";

export function ShopifyFinalCta() {
  const { dict, locale } = useDictionary();

  return (
    <section className="py-16 sm:py-20">
      <div className="container-shell">
        <motion.div
          className="overflow-hidden rounded-[32px] border border-[#25D366]/25 bg-gradient-to-br from-[#25D366]/10 via-white to-[#2090f0]/8 px-6 py-10 text-center sm:px-12 sm:py-14"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-black text-[#08112b] sm:text-4xl">{dict.shopify.finalTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#5a6d90] sm:text-base">{dict.shopify.finalSub}</p>
          <div className="mt-8 flex justify-center">
            <WhatsAppButton className="sm:min-w-[320px]" locale={locale}>
              {dict.cta.startOnWhatsApp}
            </WhatsAppButton>
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#128C7E]">{dict.shopify.urgency}</p>
        </motion.div>
      </div>
    </section>
  );
}
