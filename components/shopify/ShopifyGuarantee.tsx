"use client";

import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { SHOPIFY_GUARANTEES, SHOPIFY_GUARANTEES_AR } from "@/lib/shopify-landing";
import { useDictionary, useLocale } from "@/lib/i18n";

export function ShopifyGuarantee() {
  const { dict } = useDictionary();
  const locale = useLocale();
  const items = locale === "ar" ? SHOPIFY_GUARANTEES_AR : SHOPIFY_GUARANTEES;

  return (
    <section className="py-16 sm:py-20">
      <div className="container-shell">
        <h2 className="text-3xl font-black text-[#08112b] sm:text-4xl">{dict.shopify.guaranteeTitle}</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {items.map((promise, index) => (
            <motion.div
              className="flex gap-4 rounded-[24px] border border-emerald-100 bg-emerald-50/50 p-5"
              initial={{ opacity: 0, x: -12 }}
              key={promise}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <ShieldCheck className="h-6 w-6 shrink-0 text-[#2eca8b]" />
              <p className="text-sm font-semibold leading-7 text-[#0f5132]">{promise}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
