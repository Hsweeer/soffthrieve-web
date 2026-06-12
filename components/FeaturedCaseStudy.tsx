"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { inferStoreLinks, type CaseStudy } from "@/lib/data";
import { getHomeFeaturedCaseStudies, localePath, useDictionary } from "@/lib/i18n";
import { resolveCaseStudyPreview } from "@/lib/portfolio-media";
import { ProductPreview } from "@/components/ProductPreview";
import { MobileProductShowcase } from "@/components/MobileProductShowcase";
import { BrowserPreviewFrame } from "@/components/portfolio/BrowserPreviewFrame";
import { StoreBadges } from "@/components/StoreBadges";
import { ButtonLink } from "@/components/ButtonLink";

const ease = [0.22, 1, 0.36, 1] as const;
const ROTATE_MS = 6500;
const SWIPE_THRESHOLD = 72;

const fade = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease }
  })
};

function FeaturedCaseStudyCard({ study }: { study: CaseStudy }) {
  const { dict, locale } = useDictionary();
  const { appStoreUrl, playStoreUrl } = inferStoreLinks(study);
  const preview = resolveCaseStudyPreview(study);
  const webUrl = preview.webUrl ?? study.liveUrl;
  const hasMobileShowcase = preview.previewImages.length > 0;

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_24px_64px_-28px_rgba(15,23,42,0.18)]">
      <div className="grid lg:grid-cols-2 lg:items-stretch">
        <div className="relative min-h-[280px] lg:min-h-0">
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
              className="h-full min-h-[280px] lg:min-h-[420px]"
              liveUrl={webUrl}
              screenshotSrc={preview.screenshotUrl}
              thumbnailFit={preview.thumbnailFit}
              title={study.title}
            />
          ) : (
            <ProductPreview liveHref={webUrl} title={study.title} url={webUrl} />
          )}
        </div>

        <div className="flex flex-col justify-center border-t border-slate-100 p-6 sm:p-8 lg:border-l lg:border-t-0">
          <motion.div
            className="flex flex-wrap items-center gap-2"
            custom={0}
            initial="hidden"
            variants={fade}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <span className="rounded-full bg-[#2090f0] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
              {dict.common.deepDive}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">{study.category}</span>
          </motion.div>

          <motion.h3
            className="mt-4 text-2xl font-black tracking-tight text-slate-900 sm:text-[1.75rem] sm:leading-tight"
            custom={1}
            initial="hidden"
            variants={fade}
            viewport={{ once: true }}
            whileInView="visible"
          >
            {study.title}
          </motion.h3>

          <motion.p
            className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]"
            custom={2}
            initial="hidden"
            variants={fade}
            viewport={{ once: true }}
            whileInView="visible"
          >
            {study.summary}
          </motion.p>

          <motion.ul
            className="mt-5 space-y-2.5"
            custom={3}
            initial="hidden"
            variants={fade}
            viewport={{ once: true }}
            whileInView="visible"
          >
            {study.impact.map((item) => (
              <li className="flex items-start gap-2.5 text-sm font-medium text-slate-800" key={item}>
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2.25} />
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            className="mt-5 flex flex-wrap gap-2"
            custom={4}
            initial="hidden"
            variants={fade}
            viewport={{ once: true }}
            whileInView="visible"
          >
            {study.stack.map((tech) => (
              <span
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-600"
                key={tech}
              >
                {tech}
              </span>
            ))}
          </motion.div>

          <motion.div custom={5} initial="hidden" variants={fade} viewport={{ once: true }} whileInView="visible">
            <StoreBadges appStoreUrl={appStoreUrl} className="mt-6" playStoreUrl={playStoreUrl} />
          </motion.div>

          <motion.div
            className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-6"
            custom={6}
            initial="hidden"
            variants={fade}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <Link
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
              href={localePath(`/case-studies/${study.slug}`, locale)}
            >
              {dict.common.fullCaseStudy}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <ButtonLink
              className="!min-h-0 !border-slate-200 !px-5 !py-2.5 !text-sm"
              href={localePath("/work", locale)}
              variant="secondary"
            >
              {dict.common.allProducts}
            </ButtonLink>
          </motion.div>
        </div>
      </div>
    </article>
  );
}

function CarouselNavButton({
  label,
  onClick,
  children,
  className
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      aria-label={label}
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/90 bg-white/95 text-slate-700 shadow-[0_4px_20px_rgba(15,23,42,0.1)] backdrop-blur-sm transition hover:border-[#2090f0]/35 hover:text-[#2090f0] hover:shadow-[0_6px_24px_rgba(32,144,240,0.2)] sm:h-11 sm:w-11 ${className ?? ""}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export function FeaturedCaseStudy() {
  const { dict, locale } = useDictionary();
  const studies = getHomeFeaturedCaseStudies(locale);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [timerKey, setTimerKey] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const count = studies.length;

  const navigate = useCallback(
    (next: number, dir: number) => {
      if (count < 2) return;
      setDirection(dir);
      setIndex(((next % count) + count) % count);
      setTimerKey((k) => k + 1);
    },
    [count]
  );

  const goNext = useCallback(() => navigate(index + 1, 1), [index, navigate]);
  const goPrev = useCallback(() => navigate(index - 1, -1), [index, navigate]);

  useEffect(() => {
    if (count < 2 || isDragging) return;
    const timer = window.setInterval(() => {
      setDirection(1);
      setIndex((current) => (current + 1) % count);
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [count, timerKey, isDragging]);

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 56 : -56 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -56 : 56 })
  };

  return (
    <div>
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease }}
        viewport={{ once: true, margin: "-10%" }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#2090f0]">{dict.featuredCaseStudy.eyebrow}</p>
        <h2 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.65rem)] font-medium leading-[1.1] tracking-tight text-[#0a1b33]">
          {dict.featuredCaseStudy.title}
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-slate-600">{dict.featuredCaseStudy.text}</p>
      </motion.div>

      <div
        aria-label={dict.common.featuredPortfolio}
        aria-roledescription="carousel"
        className="relative mt-10"
      >
        {count > 1 && (
          <>
            <CarouselNavButton
              className="absolute top-1/2 left-2 z-20 -translate-y-1/2 sm:left-4"
              label={dict.common.previousProduct}
              onClick={goPrev}
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
            </CarouselNavButton>
            <CarouselNavButton
              className="absolute top-1/2 right-2 z-20 -translate-y-1/2 sm:right-4"
              label={dict.common.nextProduct}
              onClick={goNext}
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
            </CarouselNavButton>
          </>
        )}

        <motion.div
          className="touch-pan-y"
          drag={count > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.14}
          onDragEnd={(_, info) => {
            setIsDragging(false);
            if (info.offset.x <= -SWIPE_THRESHOLD || info.velocity.x < -400) goNext();
            else if (info.offset.x >= SWIPE_THRESHOLD || info.velocity.x > 400) goPrev();
          }}
          onDragStart={() => setIsDragging(true)}
        >
          <AnimatePresence custom={direction} initial={false} mode="wait">
            <motion.div
              animate="center"
              custom={direction}
              exit="exit"
              initial="enter"
              key={studies[index].slug}
              transition={{ duration: 0.5, ease }}
              variants={slideVariants}
            >
              <FeaturedCaseStudyCard study={studies[index]} />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {count > 1 && (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1 overflow-hidden rounded-b-3xl"
            >
              <motion.div
                animate={{ scaleX: isDragging ? 0 : 1 }}
                className="h-full origin-left bg-gradient-to-r from-[#5eb3f6] via-[#2090f0] to-[#0d7fe0]"
                initial={{ scaleX: 0 }}
                key={`progress-${index}-${timerKey}`}
                transition={{ duration: isDragging ? 0.15 : ROTATE_MS / 1000, ease: "linear" }}
              />
            </div>

            <div
              aria-label="Slide indicators"
              className="mt-5 flex items-center justify-center gap-2"
              role="tablist"
            >
              {studies.map((study, i) => {
                const active = i === index;
                return (
                  <button
                    aria-label={dict.common.goToSlide.replace("{title}", study.title)}
                    aria-selected={active}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      active ? "w-7 bg-[#2090f0]" : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                    key={study.slug}
                    onClick={() => navigate(i, i > index ? 1 : -1)}
                    role="tab"
                    type="button"
                  />
                );
              })}
            </div>

          </>
        )}
      </div>
    </div>
  );
}
