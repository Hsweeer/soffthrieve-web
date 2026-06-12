"use client";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { SHOPIFY_FAQ, SHOPIFY_FAQ_AR } from "@/lib/shopify-landing";
import { useDictionary, useLocale } from "@/lib/i18n";

export function ShopifyFaq() {
  const { dict } = useDictionary();
  const locale = useLocale();
  const faqs = locale === "ar" ? SHOPIFY_FAQ_AR : SHOPIFY_FAQ;

  return (
    <section className="py-16 sm:py-20">
      <div className="container-shell max-w-3xl">
        <h2 className="text-3xl font-black text-[#08112b] sm:text-4xl">{dict.shopify.faqTitle}</h2>
        <div className="mt-8 divide-y divide-slate-200 rounded-[28px] border border-slate-200/90 bg-white">
          {faqs.map((item) => (
            <details className="group px-5 py-1 sm:px-6" key={item.question}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                <span className="text-sm font-bold text-[#08112b] sm:text-base">{item.question}</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-[#2090f0] transition group-open:rotate-180" />
              </summary>
              <p className={clsx("pb-5 text-sm leading-7 text-[#5a6d90]")}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
