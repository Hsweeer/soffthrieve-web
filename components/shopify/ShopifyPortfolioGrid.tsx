"use client";

import { SaudiShopifyPortfolioShowcase } from "@/components/portfolio/SaudiShopifyPortfolioShowcase";
import { getSaudiShopifyShowcases, type SaudiShopifyShowcase } from "@/lib/saudi-shopify-portfolio";
import { useDictionary } from "@/lib/i18n";

type ShopifyPortfolioGridProps = {
  showcases?: SaudiShopifyShowcase[];
};

export function ShopifyPortfolioGrid({ showcases }: ShopifyPortfolioGridProps) {
  const { dict, locale } = useDictionary();
  const items = showcases ?? getSaudiShopifyShowcases();

  return (
    <SaudiShopifyPortfolioShowcase
      className="py-16 sm:py-20"
      eyebrow={dict.shopify.portfolioEyebrow}
      id="shopify-portfolio"
      layout="carousel"
      locale={locale}
      showcases={items}
      text={dict.shopify.portfolioNote}
      title={dict.shopify.portfolioTitle}
    />
  );
}
