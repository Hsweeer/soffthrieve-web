import { caseStudies } from "@/lib/data";
import { WORKFLOW_TABS } from "@/lib/workflow-tabs";

export type ChatPrompt = {
  id: string;
  label: string;
};

export const CHAT_PROMPTS: ChatPrompt[] = [
  { id: "mobile", label: "Mobile app for business" },
  { id: "web", label: "Web app" },
  { id: "shopify", label: "Shopify store" },
  { id: "mvp", label: "Mobile apps" },
  { id: "portfolio", label: "Live project examples" },
  { id: "start", label: "Start a project" }
];

const mobileTab = WORKFLOW_TABS.find((t) => t.id === "mobile")!;
const webTab = WORKFLOW_TABS.find((t) => t.id === "web")!;
const shopifyTab = WORKFLOW_TABS.find((t) => t.id === "shopify")!;

function stepList(tab: typeof mobileTab) {
  return tab.steps.map((s, i) => `${i + 1}. ${s.title}`).join(" ");
}

const MOBILE_EXAMPLES = ["Frenzone Live", "ProsReady", "Fasal360", "DentClinic", "Food Buddy"];
const WEB_EXAMPLES = ["Execlane", "Scribbes", "IAmMusic", "Repairoo", "EuroJobs"];
const SHOPIFY_EXAMPLES = ["Repairoo", "CannaCabana", "Maryum n Maria (virtual try-on)", "BMessentia"];

export function answerForPrompt(promptId: string): string {
  switch (promptId) {
    case "mobile":
      return answerFor("mobile apps");
    case "web":
      return answerFor("web saas");
    case "shopify":
      return answerFor("shopify");
    case "mvp":
      return answerFor("mvp launch");
    case "portfolio":
      return answerFor("live projects portfolio");
    case "start":
      return answerFor("start a project");
    default:
      return answerFor(promptId);
  }
}

export function answerFor(input: string): string {
  const value = input.toLowerCase();

  if (value.includes("start a project") || value.includes("onboard") || value.includes("begin onboarding")) {
    return "Use Begin project below for a short brief, or Contact for a quote. We typically reply within one business day.";
  }

  if (
    value.includes("mobile") ||
    value.includes("existing business") ||
    value.includes("flutter") ||
    value.includes("app store") ||
    value.includes("ios") ||
    value.includes("android")
  ) {
    return `We build Flutter mobile apps for iOS and Google Play — 150+ live products. Highlights: ${MOBILE_EXAMPLES.join(", ")}. Our process (${mobileTab.steps.length} stages): ${stepList(mobileTab)}. See the portfolio: /work?category=mobile`;
  }

  if (value.includes("shopify") || value.includes("commerce") || value.includes("storefront")) {
    return `Shopify and commerce: custom themes, checkout, apps, and AI shopping flows. Examples: ${SHOPIFY_EXAMPLES.join(", ")}. Process (${shopifyTab.steps.length} stages): ${stepList(shopifyTab)}. Browse stores: /work?category=shopify`;
  }

  if (
    value.includes("web") ||
    value.includes("saas") ||
    value.includes("dashboard") ||
    value.includes("next.js") ||
    value.includes("platform")
  ) {
    const saasNames = caseStudies
      .filter((s) => s.services.some((svc) => /saas|web/i.test(svc)))
      .slice(0, 4)
      .map((s) => s.title);
    return `Web and SaaS: Next.js, React, Node.js, admin panels, and APIs — 300+ shipped web applications. Case studies include ${saasNames.join(", ")} and ${WEB_EXAMPLES.slice(0, 3).join(", ")}. Process (${webTab.steps.length} stages): ${stepList(webTab)}. View work: /work?category=web`;
  }

  if (value.includes("mvp") || value.includes("launch")) {
    return `Mobile apps we have launched include ${WEB_EXAMPLES.join(", ")}, ${MOBILE_EXAMPLES.slice(0, 3).join(", ")} — from discovery through live release on stores or production URLs.`;
  }

  if (value.includes("ai")) {
    return "AI work: Fasal360 (AgTech), Virtual Try-On commerce, and practical AI inside SaaS and mobile — recommendations, vision, and workflow automation.";
  }

  if (value.includes("portfolio") || value.includes("example") || value.includes("project")) {
    return `Featured live work: Frenzone Live (mobile streaming), Repairoo (marketplace + web), Fasal360 (AI + mobile + web). Full portfolio at /work with Mobile, Web, and Shopify tabs.`;
  }

  if (value.includes("contact") || value.includes("quote") || value.includes("price")) {
    return "For pricing and timelines, use Get a quote (/contact) or Begin project (/start) with your scope — mobile, web, or Shopify.";
  }

  return "I can help with mobile apps (Flutter), web & SaaS, or Shopify commerce — plus live examples and how to start a project. Pick a topic above or type your question.";
}
