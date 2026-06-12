"use client";



import Link from "next/link";

import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

import { localePath, useDictionary } from "@/lib/i18n";



export function StartCta() {

  const { dict, locale } = useDictionary();



  return (

    <section className="cta-band bg-sky-50/50 py-10 sm:py-14 lg:py-16">

      <div className="container-shell">

        <div className="flex flex-col gap-6 overflow-hidden rounded-[24px] border border-sky-200/80 bg-gradient-to-br from-sky-100 via-white to-sky-50 px-5 py-7 shadow-[0_20px_60px_rgba(32,144,240,0.12)] sm:gap-8 sm:rounded-[28px] sm:px-10 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-12 lg:py-11">

          <div className="max-w-xl">

            <p className="text-xs font-black uppercase tracking-[0.16em] text-sky-600">{dict.home.startCtaEyebrow}</p>

            <h2 className="mt-2 text-2xl font-black leading-tight text-[#082f49] sm:text-3xl">{dict.home.startCtaTitle}</h2>

            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{dict.home.startCtaText}</p>

          </div>



          <div className="flex w-full flex-col items-stretch gap-3 lg:w-auto lg:max-w-sm lg:shrink-0">

            <WhatsAppButton className="min-h-12 w-full" dark fullWidth locale={locale}>

              {dict.cta.messageWhatsAppNow}

            </WhatsAppButton>

            <Link

              className="text-center text-sm font-semibold text-[#2090f0] underline underline-offset-4 transition hover:text-[#1878c9] lg:text-left"

              href={localePath("/start", locale)}

            >

              {dict.home.startCtaBriefLink}

            </Link>

          </div>

        </div>

      </div>

    </section>

  );

}


