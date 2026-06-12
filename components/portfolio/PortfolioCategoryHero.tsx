"use client";

import Link from "next/link";
import type { CaseStudy } from "@/lib/data";
import type { PortfolioProject } from "@/lib/portfolio";
import { PortfolioLivePreview } from "@/components/portfolio/PortfolioLivePreview";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { ProductPreview } from "@/components/ProductPreview";
import { MobileProductShowcase } from "@/components/MobileProductShowcase";
import { BrowserPreviewFrame } from "@/components/portfolio/BrowserPreviewFrame";
import { inferStoreLinks } from "@/lib/data";
import { LiveProjectActions } from "@/components/LiveProjectActions";
import {
  CATEGORY_FEATURED_CASE_STUDY_SLUG,
  type PortfolioCategory
} from "@/lib/portfolio";
import { resolveCaseStudyPreview } from "@/lib/portfolio-media";
import {
  getLocalizedCaseStudy,
  getPortfolioCategories,
  localePath,
  useDictionary
} from "@/lib/i18n";

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const }
  })
};

export function PortfolioCategoryHero({ category }: { category: PortfolioCategory }) {
  const { dict, locale } = useDictionary();
  const meta = getPortfolioCategories(locale).find((c) => c.id === category)!;
  const slug = CATEGORY_FEATURED_CASE_STUDY_SLUG[category];
  if (!slug) return null;
  const study = getLocalizedCaseStudy(slug, locale);
  if (!study) return null;

  const caseStudyHref = localePath(`/case-studies/${study.slug}`, locale);

  const { appStoreUrl, playStoreUrl } = inferStoreLinks(study);
  const preview = resolveCaseStudyPreview(study);
  const webUrl =
    preview.webUrl ??
    (study.liveUrl.includes("apple.com") || study.liveUrl.includes("play.google.com")
      ? study.secondaryUrl
      : study.liveUrl);

  const hasMobileShowcase = preview.previewImages.length > 0;

  return (
    <motion.article
      className="work-gallery-hero mb-14 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_32px_90px_-24px_rgba(8,17,43,0.18)]"
      initial={{ opacity: 0, y: 28 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-40px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="grid lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <div className="relative min-h-[300px] lg:min-h-[400px]">
          {hasMobileShowcase ? (
            <MobileProductShowcase
              artworkUrl={preview.artworkUrl}
              key={study.slug}
              screenshots={preview.previewImages}
              thumbnailFit={preview.thumbnailFit}
              title={study.title}
              websiteUrl={study.secondaryUrl ?? preview.webUrl}
            />
          ) : webUrl && preview.screenshotUrl ? (
            <BrowserPreviewFrame
              className="h-full min-h-[300px] lg:min-h-[400px]"
              liveUrl={webUrl}
              screenshotSrc={preview.screenshotUrl}
              thumbnailFit={preview.thumbnailFit}
              title={study.title}
            />
          ) : (
            <ProductPreview liveHref={webUrl ?? study.liveUrl} title={study.title} url={webUrl ?? study.liveUrl} />
          )}
        </div>

        <div className="flex flex-col justify-center border-t border-slate-100 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
          <motion.div custom={0} initial="hidden" variants={fade} viewport={{ once: true }} whileInView="visible">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#08112b] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
              {dict.common.featuredCategory.replace("{category}", meta.label)}
            </span>
          </motion.div>

          <motion.h2
            className="mt-4 font-display text-2xl font-black tracking-tight text-[#08112b] sm:text-3xl lg:text-[2.1rem] lg:leading-tight"
            custom={1}
            initial="hidden"
            variants={fade}
            viewport={{ once: true }}
            whileInView="visible"
          >
            {study.title}
          </motion.h2>

          <motion.p
            className="mt-4 text-sm leading-7 text-[#5a6d90] sm:text-[15px]"
            custom={2}
            initial="hidden"
            variants={fade}
            viewport={{ once: true }}
            whileInView="visible"
          >
            {study.summary}
          </motion.p>

          <motion.ul
            className="mt-5 space-y-2"
            custom={3}
            initial="hidden"
            variants={fade}
            viewport={{ once: true }}
            whileInView="visible"
          >
            {study.impact.slice(0, 3).map((line) => (
              <li className="flex items-start gap-2 text-sm text-[#3c4858]" key={line}>
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2eca8b]" />
                {line}
              </li>
            ))}
          </motion.ul>

          <motion.div
            className="mt-6 flex flex-wrap gap-2"
            custom={4}
            initial="hidden"
            variants={fade}
            viewport={{ once: true }}
            whileInView="visible"
          >
            {study.stack.slice(0, 4).map((tech) => (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600" key={tech}>
                {tech}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
            custom={5}
            initial="hidden"
            variants={fade}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <LiveProjectActions
              appStoreUrl={appStoreUrl}
              caseStudyHref={caseStudyHref}
              liveUrl={webUrl}
              playStoreUrl={playStoreUrl}
            />
            <Link
              className="inline-flex items-center gap-1 text-sm font-bold text-[#2090f0] transition hover:gap-2"
              href={caseStudyHref}
            >
              {dict.common.fullCaseStudy} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

/** Secondary commerce row for Shopify — live site banners + virtual try-on */
export function ShopifyCommerceSpotlight({
  projects,
  extraCaseStudySlug = "virtual-try-on-commerce"
}: {
  projects: PortfolioProject[];
  extraCaseStudySlug?: string;
}) {
  const { dict, locale } = useDictionary();
  const extra = getLocalizedCaseStudy(extraCaseStudySlug, locale);
  const tiles = projects.slice(0, 3);
  if (tiles.length === 0 && !extra) return null;

  return (
    <section className="mb-14">
      <div className="mb-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2090f0]">{dict.workPage.commercePortfolio}</p>
        <h2 className="mt-1 text-xl font-black text-[#08112b] sm:text-2xl">{dict.workPage.commerceTitle}</h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {extra && (
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <CaseStudyCommerceTile study={extra} />
          </motion.div>
        )}
        {tiles.map((project, index) => (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            key={project.id}
            transition={{ duration: 0.45, delay: index * 0.07 }}
            viewport={{ once: true, margin: "-40px" }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <PortfolioCommerceTile project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PortfolioCommerceTile({ project }: { project: PortfolioProject }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_20px_50px_-20px_rgba(8,17,43,0.12)]">
      <PortfolioLivePreview project={project} size="spotlight" />
      <div className="border-t border-slate-100 p-5">
        <h3 className="text-lg font-black text-[#08112b]">{project.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#5a6d90]">{project.description}</p>
      </div>
    </article>
  );
}

function CaseStudyCommerceTile({ study }: { study: CaseStudy }) {
  const { dict, locale } = useDictionary();
  const preview = resolveCaseStudyPreview(study);
  const webUrl = preview.webUrl ?? study.liveUrl;
  const caseStudyHref = localePath(`/case-studies/${study.slug}`, locale);
  return (
    <article className="grid overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_24px_60px_-20px_rgba(8,17,43,0.15)] lg:grid-cols-2">
      {webUrl && preview.screenshotUrl && (
        <BrowserPreviewFrame
          liveUrl={webUrl}
          screenshotSrc={preview.screenshotUrl}
          thumbnailFit={preview.thumbnailFit}
          title={study.title}
        />
      )}
      <div className="flex flex-col justify-center p-6 sm:p-8">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#2090f0]">{dict.workPage.commerceSub}</span>
        <h3 className="mt-2 text-2xl font-black text-[#08112b]">{study.title}</h3>
        <p className="mt-3 text-sm leading-7 text-[#5a6d90]">{study.summary}</p>
        <Link className="mt-5 inline-flex text-sm font-bold text-[#2090f0]" href={caseStudyHref}>
          {dict.common.viewCaseStudy} →
        </Link>
      </div>
    </article>
  );
}
