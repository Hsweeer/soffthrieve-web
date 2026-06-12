import { LogoMarquee } from "@/components/LogoMarquee";
import { ShopifyHero } from "@/components/shopify/ShopifyHero";
import { ShopifyPortfolioGrid } from "@/components/shopify/ShopifyPortfolioGrid";
import { ShopifyPricing } from "@/components/shopify/ShopifyPricing";
import { ShopifyGuarantee } from "@/components/shopify/ShopifyGuarantee";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ShopifyProcess } from "@/components/shopify/ShopifyProcess";
import { ShopifyFaq } from "@/components/shopify/ShopifyFaq";
import { ShopifyFinalCta } from "@/components/shopify/ShopifyFinalCta";
import { getSaudiShopifyShowcases } from "@/lib/saudi-shopify-portfolio";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Shopify Stores for Saudi Arabia",
  description:
    "Build your Arabic Shopify store in 7 days. 100+ Saudi stores built. SAR pricing. Money back guarantee. Starting from $499.",
  openGraph: {
    title: "Softhrive | Professional Shopify Stores for Saudi Arabia",
    description:
      "Build your Arabic Shopify store in 7 days. 100+ Saudi stores built. SAR pricing. Money back guarantee. Starting from $499."
  },
  twitter: {
    title: "Softhrive | Professional Shopify Stores for Saudi Arabia",
    description:
      "Build your Arabic Shopify store in 7 days. 100+ Saudi stores built. SAR pricing. Money back guarantee. Starting from $499."
  }
};

export default function ShopifyServicePage() {
  const showcases = getSaudiShopifyShowcases();

  return (
    <>
      <ShopifyHero />
      <ShopifyPortfolioGrid showcases={showcases} />
      <ShopifyPricing />
      <ShopifyGuarantee />
      <section className="border-y border-slate-200/80 bg-[#f9fafb] py-12 sm:py-16">
        <div className="container-shell">
          <LogoMarquee />
        </div>
      </section>
      <TestimonialsSection className="bg-[#f8f9fc] py-16 sm:py-20" />
      <ShopifyProcess />
      <ShopifyFaq />
      <ShopifyFinalCta />
    </>
  );
}
