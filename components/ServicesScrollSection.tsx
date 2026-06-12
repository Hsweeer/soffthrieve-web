"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import {
  FEATURED_SERVICE_SLUGS,
  getLocalizedServices,
  getServiceStickyTitles,
  localePath,
  useDictionary
} from "@/lib/i18n";
import type { Service } from "@/lib/data";

function ServiceStickyVisual({
  service,
  title,
  viewServiceLabel,
  locale
}: {
  service: Service;
  title: string;
  viewServiceLabel: string;
  locale: ReturnType<typeof useDictionary>["locale"];
}) {
  return (
    <div className="flex h-full flex-col justify-between p-8 text-white md:p-10">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/75">{service.eyebrow}</p>
        <h3 className="mt-6 font-display text-2xl font-medium tracking-tight md:text-[1.75rem]">{title}</h3>
        <div className="mt-8 h-px w-full bg-white/20" aria-hidden />
        <ul className="mt-6 space-y-3">
          {service.outcomes.map((outcome) => (
            <li className="text-[15px] leading-relaxed text-white/95" key={outcome}>
              {outcome}
            </li>
          ))}
        </ul>
      </div>
      <Link
        className="group mt-10 inline-flex w-fit items-center gap-2 text-sm font-semibold text-white transition hover:text-white/90"
        href={localePath(`/services/${service.slug}`, locale)}
      >
        {viewServiceLabel}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

function MobileServiceCard({
  service,
  title,
  index,
  viewServiceLabel,
  locale
}: {
  service: Service;
  title: string;
  index: number;
  viewServiceLabel: string;
  locale: ReturnType<typeof useDictionary>["locale"];
}) {
  return (
    <motion.article
      className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_16px_48px_-20px_rgba(10,27,51,0.12)]"
      initial={{ opacity: 0, y: 32 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
      viewport={{ once: true, margin: "-8%" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div
        className="p-6 text-white md:p-8"
        style={{
          background: "linear-gradient(145deg, #2090f0 0%, #0c4a6e 52%, #0a152d 100%)"
        }}
      >
        <span className="font-mono text-xs text-white/60">{String(index + 1).padStart(2, "0")}</span>
        <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/75">{service.eyebrow}</p>
        <h3 className="mt-2 font-display text-xl font-medium">{title}</h3>
        <ul className="mt-4 space-y-2">
          {service.outcomes.map((outcome) => (
            <li className="text-sm text-white/90" key={outcome}>
              {outcome}
            </li>
          ))}
        </ul>
        <Link
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white"
          href={localePath(`/services/${service.slug}`, locale)}
        >
          {viewServiceLabel} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <p className="border-t border-slate-100 p-5 text-sm leading-relaxed text-slate-600">{service.description}</p>
    </motion.article>
  );
}

export function ServicesScrollSection() {
  const { dict, locale } = useDictionary();
  const services = getLocalizedServices(locale);
  const stickyTitles = getServiceStickyTitles(locale);
  const featuredServices = FEATURED_SERVICE_SLUGS.map((slug) => services.find((s) => s.slug === slug)).filter(
    (service): service is Service => Boolean(service)
  );

  const stickyContent = featuredServices.map((service) => ({
    title: stickyTitles[service.slug] ?? service.title,
    description: service.description,
    content: (
      <ServiceStickyVisual
        locale={locale}
        service={service}
        title={stickyTitles[service.slug] ?? service.title}
        viewServiceLabel={dict.common.viewService}
      />
    )
  }));

  return (
    <section className="bg-[#f9fafb] py-16 md:py-24" id="services">
      <div className="container-shell">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <p className="text-sm font-medium text-slate-500">{dict.home.servicesEyebrow}</p>
          <h2 className="mt-2 font-display text-[clamp(1.85rem,4vw,2.75rem)] font-medium leading-[1.08] tracking-tight text-[#0a1b33]">
            {dict.home.servicesTitle}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{dict.servicesScroll.subtitle}</p>
        </motion.div>

        <div className="mt-10 hidden lg:block">
          <StickyScroll content={stickyContent} scrollMode="container" theme="light" />
        </div>

        <div className="mt-10 space-y-6 lg:hidden">
          {featuredServices.map((service, index) => (
            <MobileServiceCard
              index={index}
              key={service.slug}
              locale={locale}
              service={service}
              title={stickyTitles[service.slug] ?? service.title}
              viewServiceLabel={dict.common.viewService}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-slate-200/80 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-500">{dict.home.servicesSubtitle}</p>
          <Link
            className="inline-flex items-center gap-2 rounded-full bg-[#0a152d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0f1f3d]"
            href={localePath("/services", locale)}
          >
            {dict.home.servicesLink}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
