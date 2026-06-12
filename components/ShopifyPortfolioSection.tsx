"use client";

import { SaudiShopifyPortfolioShowcase } from "@/components/portfolio/SaudiShopifyPortfolioShowcase";
import { getSaudiShopifyShowcases, type SaudiShopifyShowcase } from "@/lib/saudi-shopify-portfolio";
import { useDictionary } from "@/lib/i18n";

const HOMEPAGE_SHOWCASE_COUNT = 10;

type ShopifyPortfolioSectionProps = {
  showcases?: SaudiShopifyShowcase[];
};

export function ShopifyPortfolioSection({ showcases }: ShopifyPortfolioSectionProps) {
  const { dict, locale } = useDictionary();
  const items = showcases ?? getSaudiShopifyShowcases(HOMEPAGE_SHOWCASE_COUNT);

  return (
    <section className="pb-16 pt-6 sm:pb-20 sm:pt-8">
      <div className="container-shell">
        <SaudiShopifyPortfolioShowcase
          eyebrow={dict.home.shopifySectionEyebrow}
          layout="carousel"
          locale={locale}
          showcases={items}
          text={dict.home.shopifySectionText}
          title={dict.home.shopifySectionTitle}
          carouselHint={dict.home.shopifyCarouselHint}
          viewAllHref="/services/shopify"
          viewAllLabel={dict.cta.viewAllShopifyWork}
        />
      </div>
    </section>
  );
}
