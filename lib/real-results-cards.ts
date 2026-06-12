import type { Locale } from "@/lib/i18n/types";

export type RealResultsCardId = "shopify" | "mobile" | "web";

export type RealResultsCardConfig = {
  id: RealResultsCardId;
  mockup: "phone" | "laptop";
  imageSrc: string;
  imageAlt: string;
  badgeClass: string;
  whatsappMessageEn: string;
  whatsappMessageAr: string;
};

export const REAL_RESULTS_CARDS: RealResultsCardConfig[] = [
  {
    id: "shopify",
    mockup: "phone",
    imageSrc: "/portfolio/saudi/kayanee-mobile.webp",
    imageAlt: "Kayanee Shopify store on mobile",
    badgeClass: "bg-[#25D366] text-white",
    whatsappMessageEn:
      "Hi Softhrive — I saw your ad and I am interested in a Shopify store. I would like a free consultation.",
    whatsappMessageAr:
      "مرحباً Softhrive — أريد استشارة مجانية لمتجر Shopify."
  },
  {
    id: "mobile",
    mockup: "phone",
    imageSrc:
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/ba/ad/28/baad282d-0c01-9207-1b2f-69afb114a9f7/c8dfdece-fa53-401d-bdc6-c0a392b31adb_1__U00281_U0029.jpg/1290x2796bb.jpg",
    imageAlt: "Frenzone Live mobile app",
    badgeClass: "bg-[#2090f0] text-white",
    whatsappMessageEn:
      "Hi Softhrive — I am interested in a mobile app for iOS and Android. I would like a free consultation.",
    whatsappMessageAr:
      "مرحباً Softhrive — أنا مهتم بتطبيق جوال لـ iOS و Android. أريد استشارة مجانية."
  },
  {
    id: "web",
    mockup: "laptop",
    imageSrc:
      "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fscribbes.vercel.app%2F?w=1200",
    imageAlt: "Scribbes web platform",
    badgeClass: "bg-[#0c4a6e] text-white",
    whatsappMessageEn:
      "Hi Softhrive — I am interested in a web platform build. I would like a free consultation.",
    whatsappMessageAr:
      "مرحباً Softhrive — أنا مهتم بمنصة ويب. أريد استشارة مجانية."
  }
];

export function getRealResultsWhatsAppMessage(
  card: RealResultsCardConfig,
  locale: Locale
): string {
  return locale === "ar" ? card.whatsappMessageAr : card.whatsappMessageEn;
}
