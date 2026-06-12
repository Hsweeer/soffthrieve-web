/**
 * Softhrive WhatsApp Business number (digits only, include country code, no +).
 * Set NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local / Netlify — required for wa.me links.
 */
/** Digits only — override via NEXT_PUBLIC_WHATSAPP_NUMBER in Netlify (e.g. 923001234567). */
/** Primary business line from softthrive.com/contact (+92 311 4388760). */
export const COMMITTED_WHATSAPP_NUMBER = "923114388760";

export function resolveWhatsAppDigits(): string {
  const fromEnv = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";
  if (fromEnv.length >= 10) return fromEnv;
  const committed = COMMITTED_WHATSAPP_NUMBER.replace(/\D/g, "");
  return committed.length >= 10 ? committed : "";
}
