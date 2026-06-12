"use client";

import { motion } from "motion/react";
import { SHOPIFY_PROCESS, SHOPIFY_PROCESS_AR } from "@/lib/shopify-landing";
import { useDictionary, useLocale } from "@/lib/i18n";

export function ShopifyProcess() {
  const { dict } = useDictionary();
  const locale = useLocale();
  const steps = locale === "ar" ? SHOPIFY_PROCESS_AR : SHOPIFY_PROCESS;

  return (
    <section className="bg-[#f8f9fc] py-16 sm:py-20">
      <div className="container-shell">
        <h2 className="text-3xl font-black text-[#08112b] sm:text-4xl">{dict.shopify.processTitle}</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              className="rounded-[28px] border border-slate-200/90 bg-white p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              key={step.step}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#2090f0]/10 text-sm font-black text-[#2090f0]">
                {step.step}
              </span>
              <h3 className="mt-4 text-lg font-black text-[#08112b]">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#5a6d90]">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
