import {
  BriefcaseBusiness,
  Layers3,
  Rocket,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Globe,
  Store
} from "lucide-react";
import type { WorkflowStep } from "@/lib/data";

export type WorkflowTabId = "mobile" | "web" | "shopify";

export type WorkflowTab = {
  id: WorkflowTabId;
  label: string;
  headline: string;
  summary: string;
  href: string;
  accent: string;
  steps: WorkflowStep[];
};

export const WORKFLOW_TABS: WorkflowTab[] = [
  {
    id: "mobile",
    label: "Mobile Apps",
    headline: "From idea to App Store & Play Store",
    summary: "Five focused stages — discovery through store release — for iOS and Android products.",
    href: "/work?category=mobile",
    accent: "#2090f0",
    steps: [
      {
        id: "m-discover",
        title: "Map the product",
        text: "Users, app scope, and launch goals before design.",
        tag: "Discovery",
        icon: BriefcaseBusiness
      },
      {
        id: "m-design",
        title: "Design the experience",
        text: "Flows, UI, and motion tuned for both platforms.",
        tag: "Design",
        icon: Sparkles
      },
      {
        id: "m-build",
        title: "Flutter development",
        text: "Core features, state, and performance-first architecture.",
        tag: "Build",
        icon: Smartphone,
        href: "/services/mobile-apps"
      },
      {
        id: "m-integrate",
        title: "Integrate & test",
        text: "Firebase, payments, maps, push, APIs, and QA cycles.",
        tag: "Integrate",
        icon: Layers3
      },
      {
        id: "m-launch",
        title: "Ship to stores",
        text: "App Store & Play release, analytics, and iterations.",
        tag: "Launch",
        icon: Rocket
      }
    ]
  },
  {
    id: "web",
    label: "Web Apps",
    headline: "SaaS and platforms that scale",
    summary: "Four stages to take web products from scope to production — dashboards, APIs, and live URLs.",
    href: "/work?category=web",
    accent: "#2090f0",
    steps: [
      {
        id: "w-discover",
        title: "Define the system",
        text: "Roles, data model, and milestones with your team.",
        tag: "Discovery",
        icon: BriefcaseBusiness
      },
      {
        id: "w-design",
        title: "Product UX & UI",
        text: "Responsive layouts and a cohesive design system.",
        tag: "Design",
        icon: Sparkles
      },
      {
        id: "w-build",
        title: "Engineering",
        text: "Next.js, APIs, auth, admin panels, and integrations.",
        tag: "Build",
        icon: Layers3,
        href: "/services/saas-applications"
      },
      {
        id: "w-launch",
        title: "Deploy & optimize",
        text: "Hosting, performance, security, and post-launch support.",
        tag: "Launch",
        icon: Globe
      }
    ]
  },
  {
    id: "shopify",
    label: "Shopify Stores",
    headline: "E-commerce that converts",
    summary: "Three stages — strategy, build, and growth — for Shopify brands ready to sell.",
    href: "/work?category=shopify",
    accent: "#2090f0",
    steps: [
      {
        id: "s-strategy",
        title: "Strategy & UX",
        text: "Brand, catalog structure, PDPs, and conversion-focused flows.",
        tag: "Plan",
        icon: Sparkles
      },
      {
        id: "s-build",
        title: "Build the store",
        text: "Custom theme, checkout, apps, and third-party integrations.",
        tag: "Build",
        icon: ShoppingBag,
        href: "/services/shopify"
      },
      {
        id: "s-grow",
        title: "Launch & grow",
        text: "AI shopping tools, SEO, CRO, and ongoing optimization.",
        tag: "Grow",
        icon: Store
      }
    ]
  }
];
