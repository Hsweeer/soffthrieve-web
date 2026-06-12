"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import clsx from "clsx";
import { VantaHeroBackground } from "@/components/ui/VantaHeroBackground";
import { GhostButton } from "@/components/ui/GhostButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { HeroHeadline } from "@/components/HeroHeadline";
import { HeroArabicTagline } from "@/components/HeroArabicTagline";
import { HeroUrgencyLine } from "@/components/HeroUrgencyLine";
import { HeroShippedOn } from "@/components/HeroShippedOn";
import { useDictionary } from "@/lib/i18n/LocaleContext";
import { localePath } from "@/lib/i18n";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const { dict, locale } = useDictionary();

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".hero-brand-tile", { opacity: 0, y: 14 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { opacity: 0, y: 22, duration: 0.65 })
        .from(".hero-word", { opacity: 0, y: 48, rotateX: -12, stagger: 0.09, duration: 0.85 }, "-=0.35")
        .from(".hero-sub", { opacity: 0, y: 22, duration: 0.6 }, "-=0.45")
        .from(".hero-trust-stat, .hero-trust-platform, .hero-brand-tile", {
          opacity: 0,
          y: 14,
          duration: 0.45,
          stagger: 0.06
        }, "-=0.25")
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, clearProps: "opacity,transform" },
          "-=0.2"
        )
        .to(".hero-brand-tile", { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, "-=0.35");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="hero-shell hero-shell--mesh site-chrome-ltr relative -mt-[4.75rem] overflow-hidden bg-[#030508] pt-[4.75rem] text-white lg:min-h-[min(860px,92vh)]"
      ref={rootRef}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#030508]" />
        <VantaHeroBackground />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,#030508_0%,#030508_42%,rgba(3,5,8,0.55)_62%,rgba(3,5,8,0.2)_78%,transparent_92%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(3,5,8,0.15)_0%,transparent_30%,rgba(3,5,8,0.25)_100%)]" />
      </div>

      <div className="container-shell relative z-10 grid items-center gap-8 py-10 sm:gap-10 sm:py-12 md:py-16 lg:min-h-[min(860px,92vh)] lg:grid-cols-[minmax(0,1.25fr)_minmax(260px,0.75fr)] lg:gap-10 xl:gap-16 lg:py-20">
        <div className="relative min-w-0 max-w-none">
          <div className="hero-eyebrow inline-flex max-w-full items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/75 backdrop-blur-sm sm:px-3.5 sm:py-2 sm:text-[11px] sm:tracking-[0.12em]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2ee8d6]" />
            {dict.hero.eyebrow}
          </div>

          <HeroHeadline />

          {locale === "en" ? <HeroArabicTagline /> : null}

          <p
            className={clsx(
              "hero-sub mt-5 max-w-3xl text-base leading-7 text-white/68 md:text-lg md:leading-8",
              locale === "ar" && "locale-ar-text text-right"
            )}
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            {dict.hero.sub}
          </p>

          <div className="mt-6 flex max-w-lg flex-col gap-3 md:max-w-none md:flex-row md:items-stretch md:justify-start">
            <WhatsAppButton
              className="hero-cta min-h-12 w-full md:w-auto"
              dark
              fullWidth
              locale={locale}
            >
              {dict.cta.whatsappConsultation}
            </WhatsAppButton>
            <GhostButton
              className="hero-cta min-h-12 w-full !border-white/35 !bg-transparent !text-white hover:!border-white/60 hover:!bg-white/10 md:w-auto"
              dark
              href={localePath("/work?category=shopify", locale)}
            >
              {dict.cta.seePortfolio}
            </GhostButton>
          </div>

          <HeroUrgencyLine className="mt-4" />
        </div>

        <HeroShippedOn align="end" className="relative hidden lg:flex" />
      </div>
    </section>
  );
}
