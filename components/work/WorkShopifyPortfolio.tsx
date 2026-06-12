"use client";

import { SaudiShopifyPortfolioShowcase } from "@/components/portfolio/SaudiShopifyPortfolioShowcase";
import { getSaudiShopifyShowcases } from "@/lib/saudi-shopify-portfolio";
import { useDictionary } from "@/lib/i18n";

export function WorkShopifyPortfolio() {
  const { dict, locale } = useDictionary();
  const showcases = getSaudiShopifyShowcases();

  return (
    <SaudiShopifyPortfolioShowcase
      eyebrow={dict.workPage.shopifyPortfolioEyebrow}
      layout="carousel"
      locale={locale}
      showcases={showcases}
      text={dict.workPage.shopifyPortfolioText}
      title={dict.workPage.shopifyPortfolioTitle}
      viewAllHref="/services/shopify"
      viewAllLabel={dict.workPage.shopifyPortfolioCta}
    />
  );
}
