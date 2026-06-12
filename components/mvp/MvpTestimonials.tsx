"use client";

import Image from "next/image";
import clsx from "clsx";
import { Star } from "lucide-react";
import { MVP_TESTIMONIALS } from "@/lib/mvp-landing";
import { useDictionary, useLocale } from "@/lib/i18n";

export function MvpTestimonials() {
  const { dict } = useDictionary();
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section className="bg-[#f8f9fc] py-16 sm:py-20">
      <div className="container-shell">
        <div className={clsx("max-w-2xl", isArabic && "locale-ar-text ms-auto text-right")}>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2090f0]">
            {dict.home.testimonialsEyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-black text-[#08112b] sm:text-4xl">{dict.mvp.testimonialsTitle}</h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:mt-10 md:grid-cols-3 md:gap-6">
          {MVP_TESTIMONIALS.map((item) => (
            <article
              className="relative flex h-full flex-col rounded-[28px] border border-slate-200/90 bg-white p-6 shadow-[0_16px_50px_rgba(8,17,43,0.06)]"
              key={item.id}
            >
              <div className="flex gap-0.5">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" key={i} />
                ))}
              </div>
              <p
                className={clsx("mt-4 flex-1 text-sm leading-7 text-[#3c4858]", isArabic && "locale-ar-text text-right")}
                dir={isArabic ? "rtl" : "ltr"}
              >
                &ldquo;{item.text}&rdquo;
              </p>
              <div className="mt-5 border-t border-slate-100 pt-4">
                <p
                  className={clsx("text-sm font-black text-[#08112b]", isArabic && "locale-ar-text text-right")}
                  dir={isArabic ? "rtl" : "ltr"}
                >
                  {item.name} — {item.role}, {item.location}
                </p>
              </div>
              {item.source ? (
                <div className="absolute bottom-5 end-5 opacity-70">
                  <Image
                    alt={item.source}
                    height={18}
                    src={`/brand-assets/${item.source === "upwork" ? "upwork-mark.svg" : "fiverr-mark.svg"}`}
                    width={18}
                  />
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
