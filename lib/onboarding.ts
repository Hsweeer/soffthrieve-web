export const ONBOARDING_STORAGE_KEY = "softthrive_onboarding_v1";

export type OnboardingData = {
  productType: string;
  stage: string;
  platforms: string[];
  features: string[];
  timeline: string;
  budget: string;
  referenceUrl: string;
  name: string;
  whatsapp: string;
  email: string;
};

export const defaultOnboarding: OnboardingData = {
  productType: "",
  stage: "",
  platforms: [],
  features: [],
  timeline: "",
  budget: "",
  referenceUrl: "",
  name: "",
  whatsapp: "",
  email: ""
};

export { PRODUCT_TYPE_IDS as productTypeOptions } from "@/lib/onboarding-config";

export const stageOptions = [
  "Idea only",
  "Wireframes / prototype",
  "Live product rebuild",
  "Scaling an existing product"
] as const;

export const platformOptions = [
  "iOS",
  "Android",
  "Web app",
  "Admin dashboard",
  "Shopify storefront",
  "API / backend only"
] as const;

export const featureOptions = [
  "User accounts & roles",
  "Payments / subscriptions",
  "Booking or scheduling",
  "Marketplace (two-sided)",
  "AI assistant / automation",
  "Maps / location",
  "Chat / notifications",
  "Analytics dashboard"
] as const;

export const timelineOptions = [
  "ASAP (4–8 weeks)",
  "1–3 months",
  "3–6 months",
  "Flexible / exploring"
] as const;

export const budgetOptions = ["Under $5K", "$5K – $15K", "$15K – $40K", "$40K+", "Not sure yet"] as const;

export const shopifyBudgetOptions = ["$999", "$1,999", "$4,999+"] as const;

export const shopifyTimelineOptions = ["10 days", "20 days", "45 days"] as const;

export function getBudgetOptions(productType: string): readonly string[] {
  return productType === "Shopify store" ? shopifyBudgetOptions : budgetOptions;
}

export function getTimelineOptions(productType: string): readonly string[] {
  return productType === "Shopify store" ? shopifyTimelineOptions : timelineOptions;
}

export const onboardingSteps = [
  {
    id: "project",
    title: "Your product",
    subtitle: "Choose a product type and where you are today."
  },
  {
    id: "scope",
    title: "Scope & timing",
    subtitle: "Questions tailored to your product type."
  },
  {
    id: "review",
    title: "Review & send",
    subtitle: "Confirm your brief and how we can reach you."
  }
] as const;

export function saveOnboarding(data: OnboardingData) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(data));
}

export function loadOnboarding(): OnboardingData | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(ONBOARDING_STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = { ...defaultOnboarding, ...JSON.parse(raw) } as OnboardingData;
    if (parsed.productType === "Shopify app") {
      parsed.productType = "Shopify store";
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearOnboarding() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(ONBOARDING_STORAGE_KEY);
}

export function formatOnboardingSummary(data: OnboardingData) {
  const lines = [
    `Product type: ${data.productType || "—"}`,
    `Stage: ${data.stage || "—"}`,
    `Platforms: ${data.platforms.length ? data.platforms.join(", ") : "—"}`,
    `Must-have features: ${data.features.length ? data.features.join(", ") : "—"}`,
    `Timeline: ${data.timeline || "—"}`,
    `Budget: ${data.budget || "—"}`,
    data.referenceUrl ? `Reference: ${data.referenceUrl}` : null,
    `Contact: ${data.name || "—"} · WhatsApp: ${data.whatsapp || "—"} · ${data.email || "—"}`
  ].filter(Boolean);
  return lines.join("\n");
}
