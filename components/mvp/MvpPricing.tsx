"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { MVP_PRICING } from "@/lib/mvp-landing";
import { useDictionary } from "@/lib/i18n";

export function MvpPricing() {
  const { dict } = useDictionary();

  return (
    <section className="bg-[#f8f9fc] py-16 sm:py-20">
      <div className="container-shell">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2090f0]">{dict.mvp.pricingEyebrow}</p>
          <h2 className="mt-3 text-3xl font-black text-[#08112b] sm:text-4xl">{dict.mvp.pricingTitle}</h2>
          <p className="mt-3 text-sm font-semibold text-[#5a6d90]">{dict.mvp.pricingNote}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {MVP_PRICING.map((pkg, index) => (
            <motion.div
              className={`relative flex flex-col rounded-[28px] border bg-white p-6 shadow-[0_20px_60px_rgba(8,17,43,0.06)] sm:p-8 ${
                pkg.popular ? "border-[#2090f0] ring-2 ring-[#2090f0]/20" : "border-slate-200/90"
              }`}
              initial={{ opacity: 0, y: 24 }}
              key={pkg.id}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {pkg.popular && (
                <span className="absolute -top-3 start-6 rounded-full bg-[#2090f0] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white">
                  {dict.shopify.mostPopular}
                </span>
              )}
              <h3 className="text-xl font-black text-[#08112b]">{pkg.name}</h3>
              <p className="mt-3 text-4xl font-black text-[#2090f0]">{pkg.price}</p>
              <p className="mt-2 text-sm font-bold text-[#5a6d90]">
                {pkg.pages} · {pkg.delivery}
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm leading-7 text-[#3c4858]">
                <li className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2eca8b]" />
                  {pkg.includes}
                </li>
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
