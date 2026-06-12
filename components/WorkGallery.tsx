"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { PortfolioProjectCard } from "@/components/PortfolioProjectCard";
import { PortfolioCategoryHero } from "@/components/portfolio/PortfolioCategoryHero";
import { WorkShopifyPortfolio } from "@/components/work/WorkShopifyPortfolio";
import {
  getLocalizedCaseStudies,
  getPortfolioCategories,
  useDictionary
} from "@/lib/i18n";
import {
  CATEGORY_FEATURED_CASE_STUDY_SLUG,
  caseStudyMatchesCategory,
  filterProjectsByCategory,
  getAdditionalPortfolioProjects,
  sortPortfolioForCategory,
  type PortfolioCategory
} from "@/lib/portfolio";
import { useWorkCategory } from "@/lib/use-work-category";

export function WorkGallery() {
  const { dict, locale } = useDictionary();
  const category = useWorkCategory();
  const categories = getPortfolioCategories(locale);
  const categoryMeta = category ? categories.find((item) => item.id === category) : null;
  const localizedCaseStudies = useMemo(() => getLocalizedCaseStudies(locale), [locale]);

  const additional = useMemo(() => getAdditionalPortfolioProjects(), []);

  const filteredCaseStudies = useMemo(() => {
    const featuredSlug = category ? CATEGORY_FEATURED_CASE_STUDY_SLUG[category] : null;
    const list = category
      ? localizedCaseStudies.filter((study) => caseStudyMatchesCategory(study, category))
      : localizedCaseStudies;
    return featuredSlug ? list.filter((s) => s.slug !== featuredSlug) : list;
  }, [category, localizedCaseStudies]);

  const filteredPortfolio = useMemo(() => {
    const base = category ? filterProjectsByCategory(additional, category) : additional;
    const featuredSlug = category ? CATEGORY_FEATURED_CASE_STUDY_SLUG[category] : null;
    const featuredPortfolioId = featuredSlug?.includes("repairoo")
      ? "repairoo"
      : featuredSlug?.includes("frenzone")
        ? "frenzone"
        : null;
    const withoutFeatured = featuredPortfolioId
      ? base.filter((p) => p.id !== featuredPortfolioId)
      : base;
    return category ? sortPortfolioForCategory(withoutFeatured, category) : withoutFeatured;
  }, [additional, category]);

  const empty = filteredCaseStudies.length === 0 && filteredPortfolio.length === 0;

  if (category === "shopify") {
    return (
      <div className="work-gallery">
        {categoryMeta && (
          <motion.p
            className="mx-auto mb-10 max-w-2xl text-center text-sm leading-7 text-[#5a6d90]"
            initial={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {categoryMeta.blurb}
          </motion.p>
        )}
        <WorkShopifyPortfolio />
      </div>
    );
  }
  const { title: portfolioTitle, subtitle: portfolioSubtitle } = sectionLabels(category, dict.workPage);

  return (
    <div className="work-gallery">
      {category && (
        <motion.p
          className="mx-auto mb-10 max-w-2xl text-center text-sm leading-7 text-[#5a6d90]"
          initial={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {categoryMeta?.blurb}
        </motion.p>
      )}

      {category && <PortfolioCategoryHero category={category} />}

      <div key={category ?? "all"}>
        {filteredCaseStudies.length > 0 && (
          <GallerySection
            count={filteredCaseStudies.length}
            countLabel={dict.common.projectsCount}
            subtitle={dict.workPage.caseStudiesSub}
            title={dict.workPage.caseStudies}
          >
            <div className="grid gap-6 lg:grid-cols-2">
              {filteredCaseStudies.map((study, index) => (
                <CaseStudyCard
                  key={study.slug}
                  layout="default"
                  priority={index < 2}
                  revealsOnScroll={false}
                  study={study}
                />
              ))}
            </div>
          </GallerySection>
        )}

        {filteredPortfolio.length > 0 && (
          <GallerySection
            count={filteredPortfolio.length}
            countLabel={dict.common.projectsCount}
            subtitle={portfolioSubtitle}
            title={portfolioTitle}
          >
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
              {filteredPortfolio.map((project, index) => (
                <PortfolioProjectCard
                  index={index}
                  key={project.id}
                  layout={index === 0 && category === "mobile" ? "wide" : "grid"}
                  project={project}
                />
              ))}
            </div>
          </GallerySection>
        )}

        {empty && (
          <p className="rounded-2xl border border-[#08112b]/10 bg-[#f8f9fc] px-5 py-8 text-center text-sm text-[#5a6d90]">
            {dict.workPage.emptyTitle}. {dict.workPage.emptyText}
          </p>
        )}
      </div>
    </div>
  );
}

function sectionLabels(
  category: PortfolioCategory | null,
  workPage: ReturnType<typeof useDictionary>["dict"]["workPage"]
) {
  if (category === "mobile") {
    return { title: workPage.sectionMobileTitle, subtitle: workPage.sectionMobileSub };
  }
  if (category === "web") {
    return { title: workPage.sectionWebTitle, subtitle: workPage.sectionWebSub };
  }
  if (category === "shopify") {
    return { title: workPage.sectionShopifyTitle, subtitle: workPage.sectionShopifySub };
  }
  return { title: workPage.sectionDefaultTitle, subtitle: workPage.sectionDefaultSub };
}

function GallerySection({
  title,
  subtitle,
  count,
  countLabel,
  children
}: {
  title: string;
  subtitle: string;
  count: number;
  countLabel: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, margin: "-60px" }}
      whileInView={{ opacity: 1 }}
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2090f0]">{subtitle}</p>
          <h2 className="mt-1 font-display text-2xl font-black tracking-tight text-[#08112b] sm:text-[1.65rem]">{title}</h2>
        </div>
        <span className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-bold text-slate-600">
          {countLabel.replace("{count}", String(count))}
        </span>
      </div>
      {children}
    </motion.section>
  );
}
