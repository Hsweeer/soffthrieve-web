import type { LucideIcon } from "lucide-react";
import { Building2, Globe, Rocket, ShoppingBag, Smartphone } from "lucide-react";

export type ProductTypeId =
  | "Mobile app for existing business"
  | "MVP"
  | "Web app"
  | "Shopify store";

export const PRODUCT_TYPE_IDS: ProductTypeId[] = [
  "Mobile app for existing business",
  "MVP",
  "Web app",
  "Shopify store"
];

export type ProductTypeProfile = {
  id: ProductTypeId;
  icon: LucideIcon;
  shortLabel: string;
  description: string;
  stageOptions: readonly string[];
  platformLabel: string;
  platformHint: string;
  platformOptions: readonly string[];
  featureLabel: string;
  featureHint: string;
  featureOptions: readonly string[];
  scopeSubtitle: string;
};

export const PRODUCT_TYPE_PROFILES: ProductTypeProfile[] = [
  {
    id: "Mobile app for existing business",
    icon: Building2,
    shortLabel: "Business app",
    description: "Digital product for an established company",
    stageOptions: [
      "Established business — no app yet",
      "Established business — app rebuild",
      "Live app — adding features",
      "Replacing an outdated app"
    ],
    platformLabel: "Where should it live?",
    platformHint: "Pick all that apply",
    platformOptions: [
      "iOS (App Store)",
      "Android (Google Play)",
      "Both stores",
      "Staff / internal",
      "Customer-facing",
      "Tablet-optimized"
    ],
    featureLabel: "Must-haves for v1",
    featureHint: "Tap what the app needs at launch",
    featureOptions: [
      "Bookings or scheduling",
      "Payments & checkout",
      "Loyalty & promotions",
      "Push notifications",
      "CRM / backend sync",
      "Maps & location",
      "Chat with customers",
      "Analytics & reporting"
    ],
    scopeSubtitle: "Quick scope for your mobile app."
  },
  {
    id: "MVP",
    icon: Rocket,
    shortLabel: "Mobile app",
    description: "Validate a new idea quickly",
    stageOptions: [
      "Idea only",
      "Wireframes / prototype",
      "Ready to build v1",
      "Pivoting from a previous version"
    ],
    platformLabel: "First launch targets",
    platformHint: "Where you need to be live first",
    platformOptions: [
      "iOS app",
      "Android app",
      "Web app",
      "Mobile + web",
      "Landing + waitlist",
      "Prototype / demo"
    ],
    featureLabel: "App must-haves",
    featureHint: "Minimum to test with real users",
    featureOptions: [
      "One core user journey",
      "Sign up & profiles",
      "Payments or bookings",
      "Admin to manage data",
      "Basic notifications",
      "Key integration",
      "Analytics events",
      "Store release"
    ],
    scopeSubtitle: "Lean app scope for a fast first release."
  },
  {
    id: "Web app",
    icon: Globe,
    shortLabel: "Web app",
    description: "Web platforms, dashboards & SaaS",
    stageOptions: [
      "Idea only",
      "Wireframes / prototype",
      "Live product rebuild",
      "Scaling an existing product"
    ],
    platformLabel: "Web surfaces",
    platformHint: "Which parts of the experience?",
    platformOptions: [
      "Marketing site",
      "Authenticated app",
      "Admin dashboard",
      "Customer portal",
      "Public API",
      "PWA (installable)"
    ],
    featureLabel: "Features for v1",
    featureHint: "What the first launch must support",
    featureOptions: [
      "User accounts & roles",
      "Payments / subscriptions",
      "SEO & content",
      "CMS or blog",
      "Real-time updates",
      "Integrations",
      "Multi-language",
      "Analytics"
    ],
    scopeSubtitle: "Web app scope for your build."
  },
  {
    id: "Shopify store",
    icon: ShoppingBag,
    shortLabel: "Shopify store",
    description: "Storefronts, themes & commerce",
    stageOptions: [
      "New store launch",
      "Redesign existing store",
      "Migrating to Shopify",
      "Scaling a live store"
    ],
    platformLabel: "What's your store about?",
    platformHint: "Helps us tailor theme, catalog, and launch plan",
    platformOptions: [
      "Fashion & apparel",
      "Beauty & perfumes",
      "Food & groceries",
      "Electronics & tech",
      "Home & lifestyle",
      "Services / bookings"
    ],
    featureLabel: "Launch priorities",
    featureHint: "What matters most for day one",
    featureOptions: [
      "Custom Shopify theme",
      "Arabic / RTL store",
      "Payments & checkout",
      "Subscriptions",
      "App integrations",
      "SEO & page speed",
      "Multi-currency / GCC",
      "WhatsApp & support"
    ],
    scopeSubtitle: "Tell us what your Shopify store needs — we'll scope the rest on WhatsApp."
  }
];

export function getProductProfile(productType: string): ProductTypeProfile | undefined {
  return PRODUCT_TYPE_PROFILES.find((p) => p.id === productType);
}

export function sanitizeSelections(
  productType: string,
  stage: string,
  platforms: string[],
  features: string[]
): { stage: string; platforms: string[]; features: string[] } {
  const profile = getProductProfile(productType);
  if (!profile) return { stage: "", platforms: [], features: [] };
  return {
    stage: profile.stageOptions.includes(stage) ? stage : "",
    platforms: platforms.filter((p) => profile.platformOptions.includes(p)),
    features: features.filter((f) => profile.featureOptions.includes(f))
  };
}
