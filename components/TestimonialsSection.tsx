"use client";



import Image from "next/image";

import clsx from "clsx";

import { Star } from "lucide-react";

import { getTestimonials, type Testimonial } from "@/lib/testimonials";

import { useDictionary, useLocale } from "@/lib/i18n";



type TestimonialsSectionProps = {

  className?: string;

};



function TestimonialCard({ item, locale }: { item: Testimonial; locale: "en" | "ar" }) {

  const isArabic = locale === "ar";



  return (

    <article className="relative flex h-full flex-col rounded-[28px] border border-slate-200/90 bg-white p-6 shadow-[0_16px_50px_rgba(8,17,43,0.06)]">

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

  );

}



export function TestimonialsSection({ className }: TestimonialsSectionProps) {

  const { dict } = useDictionary();

  const locale = useLocale();

  const testimonials = getTestimonials(locale);



  return (

    <section className={className}>

      <div className="container-shell">

        <div className={clsx("max-w-2xl", locale === "ar" && "locale-ar-text ms-auto text-right")}>

          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2090f0]">

            {dict.home.testimonialsEyebrow}

          </p>

          <h2 className="mt-3 text-3xl font-black text-[#08112b] sm:text-4xl">{dict.home.testimonialsTitle}</h2>

        </div>



        <div

          aria-label={dict.home.testimonialsTitle}

          className="mt-8 grid grid-cols-1 gap-5 md:mt-10 md:grid-cols-3 md:gap-6"

          role="list"

        >

          {testimonials.map((item) => (

            <div key={item.id} role="listitem">
              <TestimonialCard item={item} locale={locale} />
            </div>

          ))}

        </div>

      </div>

    </section>

  );

}


