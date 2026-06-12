import { getWhatsAppUrl } from "@/lib/whatsapp";

export const SITE_LOCATION = {
  short: "Serving Saudi Arabia and GCC",
  full: "Global remote — Serving Saudi Arabia and GCC"
} as const;

export type SocialId = "linkedin" | "instagram" | "x" | "upwork" | "fiverr" | "whatsapp";

export type SocialLink = {
  id: SocialId;
  label: string;
  href: string;
};

const linkedin =
  process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() || "https://www.linkedin.com/company/softthrive";
const instagram =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() || "https://www.instagram.com/softthrive";
const x = process.env.NEXT_PUBLIC_X_URL?.trim() || "https://x.com/softthrive";
const upwork =
  process.env.NEXT_PUBLIC_UPWORK_URL?.trim() || "https://www.upwork.com/agencies/softthrive/";
const fiverr = process.env.NEXT_PUBLIC_FIVERR_URL?.trim() || "https://www.fiverr.com/softthrive";

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim() || getWhatsAppUrl("en");

/** Official brand SVGs in /public/brand-assets/social/ — shown full-color in the footer */
export const SOCIAL_LINKS: SocialLink[] = [
  { id: "instagram", label: "Instagram", href: instagram },
  { id: "whatsapp", label: "WhatsApp", href: whatsapp },
  { id: "upwork", label: "Upwork", href: upwork },
  { id: "fiverr", label: "Fiverr", href: fiverr },
  { id: "linkedin", label: "LinkedIn", href: linkedin },
  { id: "x", label: "X (Twitter)", href: x }
];
