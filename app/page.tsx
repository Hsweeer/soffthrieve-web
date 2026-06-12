import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { HeroTrustStrip } from "@/components/HeroTrustStrip";
import { HomeTrustLogos } from "@/components/HomeTrustLogos";
import { RealResultsSection } from "@/components/real-results/RealResultsSection";
import { HomeFeaturedProduct } from "@/components/HomeFeaturedProduct";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { StartCta } from "@/components/StartCta";
import { TrustRatingsMarquee } from "@/components/TrustRatingsMarquee";
import { ShopifyPortfolioSection } from "@/components/ShopifyPortfolioSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { SectionShell } from "@/components/ui/SectionShell";
import { getSaudiShopifyShowcases } from "@/lib/saudi-shopify-portfolio";

export const metadata: Metadata = {
  title: "Softhrive | Shopify Stores for Saudi Arabia",
  description:
    "Softhrive builds professional Shopify stores for Saudi businesses — ready in 7 days. 100+ stores built. Arabic RTL. SAR pricing. Top Rated on Upwork.",
  openGraph: {
    title: "Softhrive | Professional Shopify Stores for Saudi Arabia",
    description:
      "Softhrive builds professional Shopify stores for Saudi businesses — ready in 7 days. 100+ stores built. Arabic RTL. SAR pricing. Top Rated on Upwork."
  },
  twitter: {
    title: "Softhrive | Professional Shopify Stores for Saudi Arabia",
    description:
      "Softhrive builds professional Shopify stores for Saudi businesses — ready in 7 days. 100+ stores built. Arabic RTL. SAR pricing. Top Rated on Upwork."
  }
};

export default function HomePage() {
  const saudiShopifyShowcases = getSaudiShopifyShowcases(10);

  return (
    <>
      <Hero />
      <HeroTrustStrip />
      <div className="relative z-10 bg-[#f9fafb] pb-4 pt-2 md:pb-6 md:pt-4">
        <div className="container-shell">
          <HomeTrustLogos />
        </div>
      </div>
      <ShopifyPortfolioSection showcases={saudiShopifyShowcases} />
      <TestimonialsSection className="bg-[#f8f9fc] py-16 sm:py-20" />

      <RealResultsSection />

      <SectionShell id="work">
        <HomeFeaturedProduct />
      </SectionShell>

      <TrustRatingsMarquee />
      <StartCta />

      <SectionShell id="why">
        <WhyChooseUs />
      </SectionShell>
    </>
  );
}
