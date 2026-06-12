export type { Locale, Dictionary } from "./types";
export { en } from "./en";
export { ar } from "./ar";
export { getDictionary } from "./dictionary";
export { localePath, switchLocalePath } from "./paths";
export { LocaleProvider, useLocale, useDictionary } from "./LocaleContext";
export {
  getLocalizedServices,
  getWorkflowTabs,
  getTrustPoints,
  getAboutStats,
  getProcess,
  getPortfolioExperience,
  getPortfolioCategories,
  getLocalizedCaseStudy,
  getLocalizedCaseStudies,
  getHomeFeaturedCaseStudies,
  getTeamMembers,
  getShopifyPortfolioCategory,
  getShopifyPortfolioDescription,
  getServiceStickyTitles,
  FEATURED_SERVICE_SLUGS
} from "./localized";
