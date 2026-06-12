"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { getPortfolioCategories, getPortfolioExperience, useDictionary } from "@/lib/i18n";
import { useWorkCategory } from "@/lib/use-work-category";

export function WorkPageHeading() {
  const { dict, locale } = useDictionary();
  const category = useWorkCategory();
  const categories = getPortfolioCategories(locale);
  const meta = category ? categories.find((item) => item.id === category) : null;
  const experience = getPortfolioExperience(locale);

  return (
    <SectionHeading
      center
      eyebrow={meta ? meta.label : dict.workPage.galleryEyebrow}
      text={
        meta
          ? `${experience} ${meta.blurb}`
          : `${experience} ${dict.workPage.browseHint}`
      }
      title={meta ? meta.headline : dict.workPage.allProductsTitle}
    />
  );
}
