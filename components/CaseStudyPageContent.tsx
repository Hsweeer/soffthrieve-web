"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { inferStoreLinks, screenshotUrl } from "@/lib/data";
import { hiResAppScreenshot } from "@/lib/image-utils";
import { getCaseStudyThumbnailFit } from "@/lib/portfolio-media";
import { thumbnailFitClassName } from "@/lib/thumbnail-fit";
import { LiveProjectActions } from "@/components/LiveProjectActions";
import {
  getLocalizedCaseStudies,
  getLocalizedCaseStudy,
  localePath,
  useDictionary
} from "@/lib/i18n";

export function CaseStudyPageContent({ slug }: { slug: string }) {
  const { dict, locale } = useDictionary();
  const study = getLocalizedCaseStudy(slug, locale);
  if (!study) return null;

  const related = getLocalizedCaseStudies(locale).filter((item) => item.slug !== study.slug).slice(0, 3);
  const { appStoreUrl, playStoreUrl } = inferStoreLinks(study);
  const heroWeb =
    study.secondaryUrl && !study.secondaryUrl.includes("apps.apple.com") && !study.secondaryUrl.includes("play.google.com")
      ? study.secondaryUrl
      : study.liveUrl.includes("apps.apple.com") || study.liveUrl.includes("play.google.com")
        ? undefined
        : study.liveUrl;
  const heroShot: string = study.previewImages?.[0]
    ? hiResAppScreenshot(study.previewImages[0])
    : heroWeb && screenshotUrl(heroWeb)
      ? screenshotUrl(heroWeb)!
      : study.artworkUrl ?? "/logo-dark.webp";

  const heroThumbnailFit = getCaseStudyThumbnailFit(slug);

  return (
    <>
      <section className="bg-[#f8f9fc] py-20">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="scroll-reveal">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2090f0]">{study.category}</p>
              <h1 className="mt-4 text-5xl font-black leading-tight tracking-[0] text-[#08112b] sm:text-6xl">{study.title}</h1>
              <p className="mt-5 text-lg leading-8 text-[#5a6d90]">{study.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {study.services.map((service) => (
                  <span className="rounded-full bg-white px-3 py-2 text-xs font-black text-[#3c4858] shadow-sm" key={service}>
                    {service}
                  </span>
                ))}
              </div>
              <LiveProjectActions
                appStoreUrl={appStoreUrl}
                playStoreUrl={playStoreUrl}
                liveUrl={study.secondaryUrl ?? (study.productType === "mobile" ? undefined : study.liveUrl)}
              />
              <div className="mt-4">
                <ButtonLink href={localePath("/contact", locale)} variant="secondary">
                  {dict.cta.buildSimilar}
                </ButtonLink>
              </div>
            </div>
            <div className="scroll-reveal overflow-hidden rounded-[34px] border border-[#2090f0]/15 bg-[#050a14] p-4 shadow-[0_30px_90px_rgba(8,17,43,0.14)]">
              <div
                className={`relative mx-auto overflow-hidden rounded-[28px] border border-white/10 bg-black shadow-2xl ${
                  study.productType === "mobile" ? "aspect-[9/19] max-w-[280px]" : "aspect-[16/10] w-full rounded-[26px]"
                }`}
              >
                <Image
                  alt={`${study.title} screenshot`}
                  className={thumbnailFitClassName(
                    heroThumbnailFit,
                    heroShot,
                    study.productType === "mobile" ? "mobile" : "web"
                  )}
                  fill
                  priority
                  sizes="(min-width: 1024px) 280px, 90vw"
                  src={heroShot}
                  unoptimized={Boolean(study.previewImages?.length)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-shell grid gap-6 lg:grid-cols-3">
          {[
            [dict.caseStudyPage.challenge, study.challenge],
            [dict.caseStudyPage.solution, study.solution],
            [dict.caseStudyPage.stack, study.stack.join(", ")]
          ].map(([title, text]) => (
            <div className="scroll-reveal rounded-[30px] border border-[#08112b]/10 bg-white p-6 shadow-[0_18px_60px_rgba(8,17,43,0.07)]" key={title}>
              <h2 className="text-2xl font-black text-[#08112b]">{title}</h2>
              <p className="mt-4 leading-8 text-[#5a6d90]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f8f9fc] py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="scroll-reveal">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2eca8b]">{dict.caseStudyPage.impact}</p>
            <h2 className="mt-3 text-4xl font-black text-[#08112b]">{dict.caseStudyPage.proves}</h2>
          </div>
          <div className="grid gap-4">
            {study.impact.map((item) => (
              <div className="scroll-reveal flex items-center gap-4 rounded-3xl bg-white p-5 shadow-[0_16px_52px_rgba(8,17,43,0.06)]" key={item}>
                <CheckCircle2 className="h-6 w-6 shrink-0 text-[#2eca8b]" />
                <span className="font-bold leading-7 text-[#3c4858]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-shell">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2090f0]">{dict.caseStudyPage.moreProof}</p>
              <h2 className="mt-3 text-4xl font-black text-[#08112b]">{dict.caseStudyPage.related}</h2>
            </div>
            <ButtonLink href={localePath("/work", locale)} variant="secondary">
              {dict.cta.allWork}
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {related.map((item) => (
              <CaseStudyCard key={item.slug} study={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
