import masterData from "@/portfolio/all_work_master.json";
import type { CaseStudy } from "@/lib/data";

export type PortfolioCategory = "mobile" | "web" | "shopify";

export const PORTFOLIO_CATEGORIES: {
  id: PortfolioCategory;
  label: string;
  href: string;
  headline: string;
  blurb: string;
}[] = [
  {
    id: "mobile",
    label: "Mobile Apps",
    href: "/work?category=mobile",
    headline: "150+ live mobile apps",
    blurb: "Flutter apps on the App Store and Google Play — social, healthcare, marketplaces, ride-hailing, and more."
  },
  {
    id: "web",
    label: "Web Apps",
    href: "/work?category=web",
    headline: "300+ web applications",
    blurb: "SaaS dashboards, platforms, marketplaces, and marketing sites — live URLs and production-ready UX."
  },
  {
    id: "shopify",
    label: "Shopify Stores",
    href: "/work?category=shopify",
    headline: "100+ Live Shopify Stores We Have Built",
    blurb:
      "Arabic-first Shopify storefronts for Saudi and GCC — tap any store to visit the live site. Fashion, beauty, perfumes, and more."
  }
];

export function parsePortfolioCategory(value: string | null | undefined): PortfolioCategory | null {
  if (value === "mobile" || value === "web" || value === "shopify") return value;
  return null;
}

export function isMobileProject(project: PortfolioProject): boolean {
  return project.iosUrls.length > 0 || project.androidUrls.length > 0;
}

export function isWebProject(project: PortfolioProject): boolean {
  return project.webUrls.length > 0;
}

/** Commerce / Shopify portfolio highlights */
const SHOPIFY_PORTFOLIO_IDS = new Set([
  "virtualtryon",
  "cannacabana",
  "mybeautydeals",
  "repairoo",
  "vendup",
  "bmessentia",
  "saimportfolio"
]);

export function isShopifyProject(project: PortfolioProject): boolean {
  if (SHOPIFY_PORTFOLIO_IDS.has(project.id)) return true;
  const hay = `${project.name} ${project.description} ${project.category} ${project.skills.join(" ")}`.toLowerCase();
  if (hay.includes("shopify")) return true;
  if (!project.webUrls.length) return false;
  return (
    hay.includes("commerce") ||
    hay.includes("e-commerce") ||
    hay.includes("storefront") ||
    hay.includes("retail")
  );
}

export function filterProjectsByCategory(
  projects: PortfolioProject[],
  category: PortfolioCategory
): PortfolioProject[] {
  if (category === "mobile") return projects.filter(isMobileProject);
  if (category === "web") return projects.filter(isWebProject);
  return projects.filter(isShopifyProject);
}

export function caseStudyMatchesCategory(study: CaseStudy, category: PortfolioCategory): boolean {
  const isStore =
    study.liveUrl.includes("apps.apple.com") ||
    study.liveUrl.includes("play.google.com") ||
    Boolean(study.appStoreUrl || study.playStoreUrl);
  const isWebLive =
    study.productType === "web" ||
    (!isStore && (study.liveUrl.startsWith("http://") || study.liveUrl.startsWith("https://")));

  if (category === "mobile") {
    return study.productType === "mobile" || isStore;
  }
  if (category === "web") {
    return isWebLive;
  }
  return (
    study.services.some((s) => s.toLowerCase().includes("shopify")) ||
    study.stack.some((s) => s.toLowerCase().includes("shopify")) ||
    study.category.toLowerCase().includes("commerce") ||
    study.category.toLowerCase().includes("shopify")
  );
}

export type PortfolioProject = {
  id: string;
  name: string;
  description: string;
  category: string;
  platforms: string;
  statusLabel: string;
  isLive: boolean;
  iosUrls: string[];
  androidUrls: string[];
  webUrls: string[];
  figmaUrls: string[];
  skills: string[];
  caseStudySlug?: string;
};

/** Portfolio IDs that already have a dedicated case study page */
export const CASE_STUDY_PORTFOLIO_IDS = new Set([
  "frenzone",
  "execlane",
  "scribbes",
  "iammusic",
  "dentclinic",
  "prosready",
  "repairoo",
  "fasal360",
  "foodbuddy",
  "virtualtryon",
  "eurojobs"
]);

const CASE_STUDY_SLUG_BY_PORTFOLIO_ID: Record<string, string> = {
  frenzone: "frenzone-live",
  execlane: "execlane-chauffeur-service",
  scribbes: "scribbes-social-platform",
  iammusic: "iammusic-lms",
  dentclinic: "dentclinic-healthcare-saas",
  prosready: "prosready-marketplace",
  repairoo: "repairoo-service-bidding",
  fasal360: "fasal360-agtech-ai",
  foodbuddy: "food-buddy-restaurant-platform",
  virtualtryon: "virtual-try-on-commerce",
  eurojobs: "eurojobs-ecosystem"
};

type MasterProject = (typeof masterData.projects)[number];

const PLACEHOLDER_DESCRIPTION = /^Old Work Data/i;

function normalizeProject(raw: MasterProject): PortfolioProject | null {
  if (raw.avoid) return null;

  const id = raw.portfolio_id || raw.project_id;
  if (id === "reapiroo") return null;
  const iosUrls = raw.links?.ios ?? [];
  const androidUrls = raw.links?.android ?? [];
  const webUrls = raw.links?.web ?? [];
  const figmaUrls = raw.links?.figma ?? [];
  const hasLive =
    raw.has_live_link ||
    iosUrls.length > 0 ||
    androidUrls.length > 0 ||
    webUrls.length > 0;

  const description =
    raw.description?.trim() ||
    raw.summary?.trim() ||
    raw.category_text?.trim() ||
    "Product design and engineering delivered by Softhrive.";

  if (PLACEHOLDER_DESCRIPTION.test(description)) return null;

  return {
    id,
    name: raw.name,
    description,
    category: raw.category_text || "Product build",
    platforms: raw.platforms_text || "Multi-platform",
    statusLabel: raw.status_text || raw.portfolio_status || (hasLive ? "Live" : "Design deliverable"),
    isLive: hasLive,
    iosUrls,
    androidUrls,
    webUrls,
    figmaUrls,
    skills: raw.skills ?? [],
    caseStudySlug: CASE_STUDY_SLUG_BY_PORTFOLIO_ID[id]
  };
}

export function getAllPortfolioProjects(): PortfolioProject[] {
  return masterData.projects
    .map(normalizeProject)
    .filter((project): project is PortfolioProject => Boolean(project))
    .sort((a, b) => {
      if (a.isLive !== b.isLive) return a.isLive ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
}

export function getAdditionalPortfolioProjects(): PortfolioProject[] {
  return getAllPortfolioProjects().filter((project) => !CASE_STUDY_PORTFOLIO_IDS.has(project.id));
}

export const CATEGORY_FEATURED_CASE_STUDY_SLUG: Partial<Record<PortfolioCategory, string>> = {
  mobile: "frenzone-live",
  web: "repairoo-service-bidding"
};

/** Spotlight commerce builds shown prominently on Shopify tab */
export const SHOPIFY_SPOTLIGHT_IDS = [
  "repairoo",
  "virtualtryon",
  "cannacabana",
  "mybeautydeals",
  "bmessentia",
  "vendup"
] as const;

export const CATEGORY_PORTFOLIO_PRIORITY: Record<PortfolioCategory, string[]> = {
  mobile: [
    "prosready",
    "frenzone",
    "petty",
    "ambit",
    "nomadnurse",
    "english_pathway",
    "go_amigo",
    "doclink",
    "vendup",
    "wishes_app"
  ],
  web: [
    "repairoo",
    "execlane",
    "scribbes",
    "iammusic",
    "bmessentia",
    "fasal360",
    "cannacabana",
    "saimportfolio",
    "connectandprotect",
    "sportlytics"
  ],
  shopify: [
    "repairoo",
    "cannacabana",
    "virtualtryon",
    "mybeautydeals",
    "bmessentia",
    "vendup",
    "myboutique",
    "saimportfolio"
  ]
};

export function sortPortfolioForCategory(projects: PortfolioProject[], category: PortfolioCategory) {
  const priority = CATEGORY_PORTFOLIO_PRIORITY[category];
  return [...projects].sort((a, b) => {
    const ai = priority.indexOf(a.id);
    const bi = priority.indexOf(b.id);
    const aRank = ai === -1 ? 999 : ai;
    const bRank = bi === -1 ? 999 : bi;
    if (aRank !== bRank) return aRank - bRank;
    if (a.isLive !== b.isLive) return a.isLive ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

export function getFeaturedShopifyProjects(limit = 6) {
  const all = getAllPortfolioProjects();
  const shopify = sortPortfolioForCategory(filterProjectsByCategory(all, "shopify"), "shopify");
  const priority = SHOPIFY_SPOTLIGHT_IDS;
  return shopify
    .sort((a, b) => {
      const ai = priority.indexOf(a.id as (typeof priority)[number]);
      const bi = priority.indexOf(b.id as (typeof priority)[number]);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    })
    .slice(0, limit);
}

export function getPortfolioStats(category?: PortfolioCategory | null) {
  const all = getAllPortfolioProjects();
  const scoped = category ? filterProjectsByCategory(all, category) : all;
  const mobile = filterProjectsByCategory(all, "mobile");
  const web = filterProjectsByCategory(all, "web");
  const shopify = filterProjectsByCategory(all, "shopify");

  return {
    total: scoped.length,
    live: scoped.filter((p) => p.isLive).length,
    withStores: scoped.filter((p) => p.iosUrls.length || p.androidUrls.length).length,
    withFigma: scoped.filter((p) => p.figmaUrls.length && !p.isLive).length,
    mobileCount: mobile.length,
    webCount: web.length,
    shopifyCount: shopify.length
  };
}
