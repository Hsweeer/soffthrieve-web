import type { Locale } from "@/lib/i18n/types";
import { resolveWhatsAppDigits } from "@/lib/site-contact";

export const WHATSAPP_GREEN = "#25D366";

const CAMPAIGN_MESSAGE_EN =
  "Hi Softhrive — I saw your ad and I am interested in a Shopify store";

const CAMPAIGN_MESSAGE_AR =
  "مرحباً Softhrive — شاهدت إعلانكم وأنا مهتم بمتجر Shopify";

const MOBILE_APP_MESSAGE_EN =
  "Hi Softhrive — I am interested in building a mobile app for my business";

const MOBILE_APP_MESSAGE_AR =
  "مرحباً Softhrive — أنا مهتم ببناء تطبيق جوال لعملي";

export function getWhatsAppMessage(locale: Locale = "en"): string {
  return locale === "ar" ? CAMPAIGN_MESSAGE_AR : CAMPAIGN_MESSAGE_EN;
}

export function getMobileAppWhatsAppMessage(locale: Locale = "en"): string {
  return locale === "ar" ? MOBILE_APP_MESSAGE_AR : MOBILE_APP_MESSAGE_EN;
}

export function getWhatsAppNumber(): string {
  return resolveWhatsAppDigits();
}

export function getWhatsAppUrl(locale: Locale = "en", customMessage?: string): string {
  const number = getWhatsAppNumber();
  const text = encodeURIComponent(customMessage ?? getWhatsAppMessage(locale));

  if (!number) {
    console.warn("NEXT_PUBLIC_WHATSAPP_NUMBER is not set — WhatsApp links will not work.");
    return `https://wa.me/?text=${text}`;
  }

  return `https://wa.me/${number}?text=${text}`;
}
