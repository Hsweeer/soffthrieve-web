"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { motion } from "motion/react";
import { CaseStudy, inferStoreLinks } from "@/lib/data";
import { LiveProjectActions } from "@/components/LiveProjectActions";
import { BrowserPreviewFrame } from "@/components/portfolio/BrowserPreviewFrame";
import { MobileProductShowcase } from "@/components/MobileProductShowcase";
import { resolveCaseStudyPreview } from "@/lib/portfolio-media";
import { getLocalizedCaseStudy, localePath, useDictionary } from "@/lib/i18n";

export function CaseStudyCard({
  study: studyProp,
  revealsOnScroll = true,
  layout = "default"
}: {
  study: CaseStudy;
  priority?: boolean;
  revealsOnScroll?: boolean;
  layout?: "default" | "wide";
}) {
  const { dict, locale } = useDictionary();
  const study = getLocalizedCaseStudy(studyProp.slug, locale) ?? studyProp;
  const caseStudyHref = localePath(`/case-studies/${study.slug}`, locale);
  const { appStoreUrl, playStoreUrl } = inferStoreLinks(study);
  const preview = resolveCaseStudyPreview(study);
  const webUrl =
    preview.webUrl ??
    (study.liveUrl.includes("apple.com") || study.liveUrl.includes("play.google.com")
      ? study.secondaryUrl
      : study.liveUrl);

  const showMobile = preview.isMobile;
  const showArtworkOnly = preview.showArtworkOnly;
  const wide = layout === "wide";

  return (
    <motion.article
      className={clsx(
        "group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/90 bg-white shadow-[0_16px_48px_-20px_rgba(8,17,43,0.12)] transition duration-500 hover:shadow-[0_28px_64px_-16px_rgba(32,144,240,0.2)]",
        wide && "lg:flex-row",
        revealsOnScroll && "scroll-reveal"
      )}
      initial={revealsOnScroll ? undefined : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileInView={revealsOnScroll ? undefined : { opacity: 1, y: 0 }}
    >
      <Link
        className={clsx("relative block shrink-0 overflow-hidden", wide ? "lg:w-[55%]" : "w-full")}
        href={caseStudyHref}
      >
        {showMobile && preview.previewImages.length > 0 ? (
          <div className="portfolio-device-stage min-h-[260px] sm:min-h-[300px]">
            <MobileProductShowcase
              artworkUrl={preview.artworkUrl}
              screenshots={preview.previewImages}
              thumbnailFit={preview.thumbnailFit}
              title={study.title}
              websiteUrl={study.secondaryUrl}
            />
          </div>
        ) : showArtworkOnly && preview.artworkUrl ? (
          <div className="portfolio-device-stage flex min-h-[240px] items-center justify-center sm:min-h-[280px]">
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="relative h-24 w-24 overflow-hidden rounded-[22px] shadow-xl ring-1 ring-slate-200/80 sm:h-28 sm:w-28">
                <Image alt={`${study.title} app`} className="object-cover" fill src={preview.artworkUrl} unoptimized />
              </div>
              <p className="text-lg font-black text-slate-900">{study.title}</p>
            </div>
          </div>
        ) : preview.screenshotUrl ? (
          <BrowserPreviewFrame
            compact
            liveUrl={webUrl ?? study.playStoreUrl ?? study.appStoreUrl ?? study.liveUrl}
            screenshotSrc={preview.screenshotUrl}
            showFooterLink={false}
            thumbnailFit={preview.thumbnailFit}
            title={study.title}
          />
        ) : preview.artworkUrl ? (
          <div className="relative flex min-h-[240px] items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-8">
            <Image alt={study.title} className="rounded-3xl shadow-2xl" height={120} src={preview.artworkUrl} unoptimized width={120} />
          </div>
        ) : null}

        <span className="absolute left-4 top-4 z-20 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-[#08112b] shadow-md backdrop-blur-sm">
          {study.category}
        </span>
      </Link>

      <div className={clsx("flex flex-1 flex-col p-6 sm:p-7", wide && "lg:justify-center")}>
        <div className="flex items-start justify-between gap-3">
          <Link href={caseStudyHref}>
            <h3 className="text-xl font-black text-[#08112b] transition group-hover:text-[#2090f0] lg:text-2xl">{study.title}</h3>
          </Link>
          <Link
            aria-label={`${study.title} — ${dict.common.readCaseStudy}`}
            className="rounded-full bg-slate-100 p-2 text-[#2090f0] transition hover:bg-[#2090f0] hover:text-white"
            href={caseStudyHref}
          >
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
        <p className="mt-3 flex-1 text-sm leading-7 text-[#5a6d90]">{study.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {study.services.slice(0, 3).map((service) => (
            <span className="rounded-full bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 ring-1 ring-slate-200/80" key={service}>
              {service}
            </span>
          ))}
        </div>
        <div className="mt-5 border-t border-slate-100 pt-4">
          <LiveProjectActions
            appStoreUrl={appStoreUrl}
            caseStudyHref={caseStudyHref}
            liveUrl={webUrl}
            playStoreUrl={playStoreUrl}
          />
        </div>
      </div>
    </motion.article>
  );
}
