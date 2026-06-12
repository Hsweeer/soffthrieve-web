"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { inferStoreLinks } from "@/lib/data";
import { getHomeFeaturedCaseStudies, localePath, useDictionary } from "@/lib/i18n";
import { resolveCaseStudyPreview } from "@/lib/portfolio-media";
import { Iphone16ProFrame } from "@/components/Iphone16ProFrame";
import { StoreBadges } from "@/components/StoreBadges";

export function HomeFeaturedProduct() {
  const { dict, locale } = useDictionary();
  const study = getHomeFeaturedCaseStudies(locale)[0];
  if (!study) return null;

  const { appStoreUrl, playStoreUrl } = inferStoreLinks(study);
  const preview = resolveCaseStudyPreview(study);
  const screenshot = preview.previewImages[0];
  const blurb = dict.home.frenzoneHomeBlurb;

  return (
    <div>
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#2090f0]">
          {dict.featuredCaseStudy.eyebrow}
        </p>
        <h2 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.65rem)] font-medium leading-[1.1] tracking-tight text-[#0a1b33]">
          {dict.featuredCaseStudy.title}
        </h2>
      </motion.div>

      <motion.article
        className="mt-8 overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_20px_56px_-28px_rgba(15,23,42,0.14)] sm:mt-10"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className="grid gap-6 p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] sm:items-center sm:gap-8 sm:p-6 lg:p-8">
          <div className="flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white px-2 py-6 sm:py-8">
            {screenshot ? (
              <div className="mx-auto w-full max-w-[200px] sm:max-w-[220px]">
                <Iphone16ProFrame alt={study.title} size="md" src={screenshot} thumbnailFit={preview.thumbnailFit} />
              </div>
            ) : null}
          </div>

          <div className="flex flex-col justify-center text-center sm:text-left">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center">
              {preview.artworkUrl ? (
                <Image
                  alt={`${study.title} app icon`}
                  className="rounded-2xl shadow-md ring-1 ring-slate-200/80"
                  height={56}
                  src={preview.artworkUrl}
                  unoptimized
                  width={56}
                />
              ) : null}
              <h3 className="text-2xl font-black tracking-tight text-slate-900">{study.title}</h3>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">{blurb}</p>

            <StoreBadges appStoreUrl={appStoreUrl} className="mt-6 justify-center sm:justify-start" playStoreUrl={playStoreUrl} />

            <Link
              className="mt-6 inline-flex items-center justify-center gap-2 text-sm font-bold text-[#2090f0] transition hover:text-[#1878c9] sm:justify-start"
              href={localePath(`/case-studies/${study.slug}`, locale)}
            >
              {dict.common.fullCaseStudy}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
