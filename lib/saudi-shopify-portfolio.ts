import type { Locale } from "@/lib/i18n/types";

import type { ThumbnailFitConfig } from "@/lib/thumbnail-fit";

export type SaudiShopifyShowcase = {
  id: string;
  displayName: string;
  displayNameAr: string;
  category: string;
  categoryAr: string;
  description: string;
  descriptionAr: string;
  liveUrl: string;
  mobileScreenshot: string;
  /** Optional crop/fit override for store preview thumbnails */
  thumbnailFit?: ThumbnailFitConfig;
};

export const SAUDI_SHOPIFY_SHOWCASES: SaudiShopifyShowcase[] = [
  {
    id: "kayanee",
    displayName: "Kayanee KSA",
    displayNameAr: "كيانِي — السعودية",
    category: "Fashion & wellness",
    categoryAr: "أزياء وعافية",
    description:
      "Arabic-first Shopify for activewear, supplements, and studio bookings — built for Saudi women.",
    descriptionAr:
      "متجر Shopify بالعربية للأزياء الرياضية والمكملات وحجز الاستوديو — مصمم لنساء السعودية.",
    liveUrl: "https://kayanee.com/",
    mobileScreenshot: "/portfolio/saudi/kayanee-mobile.webp"
  },
  {
    id: "givenchy-beauty-ksa",
    displayName: "Givenchy Beauty KSA",
    displayNameAr: "جيفنشي بيوتي — السعودية",
    category: "Luxury beauty",
    categoryAr: "جمال فاخر",
    description:
      "Premium beauty storefront with SAR pricing, Arabic support, and a polished mobile checkout.",
    descriptionAr:
      "واجهة جمال فاخرة بأسعار بالريال، دعم عربي، وتجربة شراء متنقلة مصقولة للسوق السعودي.",
    liveUrl: "https://beauty.givenchy.sa/",
    mobileScreenshot: "/portfolio/saudi/givenchy-mobile.webp"
  },
  {
    id: "niceone",
    displayName: "Nice One KSA",
    displayNameAr: "نايس ون — السعودية",
    category: "Beauty & skincare",
    categoryAr: "جمال والعناية",
    description:
      "Large-catalog beauty Shopify store with bilingual UX, promos, and GCC-focused product ranges.",
    descriptionAr:
      "متجر جمال Shopify بكتالوج واسع، تجربة ثنائية اللغة، وعروض مخصصة لاتجاهات الخليج.",
    liveUrl: "https://niceonesa.com/",
    mobileScreenshot: "/portfolio/saudi/niceone-mobile.webp"
  },
  {
    id: "gulfshopstore",
    displayName: "Gulf Shop Store",
    displayNameAr: "متجر الخليج",
    category: "General retail",
    categoryAr: "تجزئة عامة",
    description:
      "High-traffic Saudi marketplace with COD, promotions, and mobile-first product discovery.",
    descriptionAr:
      "متجر سعودي عالي الزيارات مع الدفع عند الاستلام والعروض وتصفح منتجات مخصص للجوال.",
    liveUrl: "https://gulfshop.store/",
    mobileScreenshot: "/portfolio/saudi/gulfshop-mobile.webp"
  },
  {
    id: "fashion-sa",
    displayName: "Fashion.sa",
    displayNameAr: "فاشن.إس إيه",
    category: "Fashion retail",
    categoryAr: "أزياء وتجزئة",
    description:
      "Trend-led fashion Shopify storefront with collections for women, kids, and seasonal drops.",
    descriptionAr:
      "واجهة أزياء Shopify عصرية مع مجموعات للنساء والأطفال وإصدارات موسمية.",
    liveUrl: "https://fashion.sa/",
    mobileScreenshot: "/portfolio/saudi/fashion-mobile.webp"
  },
  {
    id: "sidalih",
    displayName: "Sidalih",
    displayNameAr: "سيداليه",
    category: "Perfumes & fragrances",
    categoryAr: "عطور وبخور",
    description:
      "Fragrance-focused Shopify build with rich product storytelling and mobile catalog browsing.",
    descriptionAr:
      "متجر عطور Shopify مع عرض منتجات غني وتصفح كتالوج سلس على الجوال.",
    liveUrl: "https://sidalih.com/",
    mobileScreenshot: "/portfolio/saudi/sidalih-mobile.webp"
  },
  {
    id: "albayan-perfumes",
    displayName: "Al Bayan Perfumes",
    displayNameAr: "البيان للعطور",
    category: "Perfumes & oud",
    categoryAr: "عطور وعود",
    description:
      "Arabic perfume commerce with gift-ready packaging flows and SAR-first merchandising.",
    descriptionAr:
      "تجارة عطور عربية مع تدفقات هدايا وتسويق merchandise بالريال السعودي.",
    liveUrl: "https://albayanperfumes.com/",
    mobileScreenshot: "/portfolio/saudi/albayan-mobile.webp"
  },
  {
    id: "florina",
    displayName: "Florina KSA",
    displayNameAr: "فلورينا — السعودية",
    category: "Athleisure & street",
    categoryAr: "رياضة وستريت",
    description:
      "Athleisure Shopify store with bold visuals, size-led navigation, and campaign-ready landing pages.",
    descriptionAr:
      "متجر athleisure بصور جريئة، تنقل حسب المقاس، وصفحات هبوط جاهزة للحملات.",
    liveUrl: "https://florina.sa/",
    mobileScreenshot: "/portfolio/saudi/florina-mobile.webp"
  },
  {
    id: "dermazone",
    displayName: "Dermazone Store",
    displayNameAr: "متجر ديرمازون",
    category: "Skincare & derma",
    categoryAr: "عناية وجلدية",
    description:
      "Clinical skincare Shopify experience with routines, bundles, and trust-led product education.",
    descriptionAr:
      "تجربة عناية جلدية Shopify مع روتينات وباقات ومحتوى تعليمي يبني الثقة.",
    liveUrl: "https://dermazone.store/",
    mobileScreenshot: "/portfolio/saudi/dermazone-mobile.webp"
  },
  {
    id: "rakizah",
    displayName: "Rakizah",
    displayNameAr: "ركيزة",
    category: "Jewelry & accessories",
    categoryAr: "مجوهرات وإكسسوارات",
    description:
      "Jewelry Shopify storefront with elegant product grids and mobile checkout tuned for gifting.",
    descriptionAr:
      "متجر مجوهرات Shopify بشبكات منتجات أنيقة وشراء جوال مناسب للهدايا.",
    liveUrl: "https://rakizah.com/",
    mobileScreenshot: "/portfolio/saudi/rakizah-mobile.webp"
  }
];

export function getSaudiShopifyShowcases(limit?: number): SaudiShopifyShowcase[] {
  const list = SAUDI_SHOPIFY_SHOWCASES;
  return limit ? list.slice(0, limit) : list;
}

export function getSaudiShowcaseLabel(
  showcase: SaudiShopifyShowcase,
  locale: Locale,
  field: "name" | "category" | "description"
): string {
  if (locale === "ar") {
    if (field === "name") return showcase.displayNameAr;
    if (field === "category") return showcase.categoryAr;
    return showcase.descriptionAr;
  }
  if (field === "name") return showcase.displayName;
  if (field === "category") return showcase.category;
  return showcase.description;
}
