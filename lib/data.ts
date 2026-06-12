import {
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Layers3,
  LineChart,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles
} from "lucide-react";
import { SITE_STATS, SITE_STATS_NUMBERS } from "@/lib/site-stats";

export type Service = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  outcomes: string[];
  icon: typeof ShoppingBag;
};

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  challenge: string;
  solution: string;
  impact: string[];
  services: string[];
  stack: string[];
  liveUrl: string;
  secondaryUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  featured?: boolean;
  productType?: "mobile" | "web";
  artworkUrl?: string;
  previewImages?: string[];
  accent: "blue" | "green" | "orange";
};

export type WorkflowStep = {
  id: string;
  title: string;
  text: string;
  tag: string;
  icon: typeof ShoppingBag;
  href?: string;
};

export const services: Service[] = [
  {
    slug: "shopify",
    title: "Shopify and Commerce Engineering",
    eyebrow: "Commerce systems",
    description:
      "Conversion-focused storefronts, custom Shopify integrations, product experiences, and AI-assisted shopping flows for brands that need more than a template.",
    outcomes: ["Custom storefronts", "Checkout and app integrations", "AI/AR commerce experiences"],
    icon: ShoppingBag
  },
  {
    slug: "mvp-development",
    title: "Mobile App Development",
    eyebrow: "Mobile App Development for Saudi Arabia and GCC",
    description:
      "150+ apps delivered for Saudi and GCC businesses. iOS, Android, and Flutter. From idea to App Store in 60 days.",
    outcomes: ["Clickable prototype to launch", "Mobile and web delivery", "Release-ready QA"],
    icon: Rocket
  },
  {
    slug: "saas-applications",
    title: "SaaS Applications",
    eyebrow: "Scale with clarity",
    description:
      "Dashboards, admin panels, booking engines, marketplaces, subscriptions, roles, analytics, and operational workflows built for repeat daily use.",
    outcomes: ["Multi-role dashboards", "Workflow automation", "Reliable cloud architecture"],
    icon: Layers3
  },
  {
    slug: "ai-solutions",
    title: "AI Product Features",
    eyebrow: "Practical AI",
    description:
      "AI assistants, recommendation flows, language-learning tools, virtual try-on experiences, and automation features shaped around real user journeys.",
    outcomes: ["AI chat and guidance", "Recommendation systems", "Automation workflows"],
    icon: BrainCircuit
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    eyebrow: "iOS and Android",
    description:
      "Flutter-based apps with polished UI, Firebase or custom backends, store-ready release flows, subscriptions, maps, chat, media, and payments.",
    outcomes: ["Flutter app builds", "Store launch support", "Realtime features"],
    icon: Smartphone
  },
  {
    slug: "web-platforms",
    title: "Web Platforms",
    eyebrow: "Full-stack web",
    description:
      "Next.js, React, Node.js, dashboards, marketing websites, content platforms, and web products that feel fast, credible, and easy to operate.",
    outcomes: ["React and Next.js", "Admin systems", "SEO-friendly public pages"],
    icon: Code2
  }
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "frenzone-live",
    title: "Frenzone Live",
    category: "Social live streaming",
    summary:
      "A creator platform for live streams, short video, virtual gifting, and paid communities — built for real-time engagement and monetization on iOS and Android.",
    challenge:
      "Creators needed one app to go live, grow an audience, run paid rooms, and monetize through gifts and subscriptions without juggling multiple tools.",
    solution:
      "SoftThrive shipped a Flutter app with a Node.js and MongoDB backend, Socket.io real-time layers, co-host battles, e-wallet payouts, and store-ready release on both platforms.",
    impact: [
      "Live streaming, short video, and private paid rooms in one product",
      "Real-time gifting, battles, and co-host sessions via Socket.io",
      "Live on App Store and Google Play with creator monetization flows"
    ],
    services: ["Mobile Apps", "Mobile App Development", "AI Solutions"],
    stack: ["Flutter", "Node.js", "MongoDB", "Socket.io"],
    liveUrl: "https://apps.apple.com/in/app/frenzone-live/id6499107492",
    appStoreUrl: "https://apps.apple.com/in/app/frenzone-live/id6499107492",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.sheesX.Frenzone&hl=en",
    secondaryUrl: "https://www.frenzone.live",
    featured: true,
    productType: "mobile",
    accent: "blue",
    artworkUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/9d/c8/b2/9dc8b222-2c9f-1a85-a9b1-9719b21fc5e3/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
    previewImages: [
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/ba/ad/28/baad282d-0c01-9207-1b2f-69afb114a9f7/c8dfdece-fa53-401d-bdc6-c0a392b31adb_1__U00281_U0029.jpg/1290x2796bb.jpg",
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/75/e6/e8/75e6e8b3-7481-dec0-9f2a-55ecf7eb47a5/de7f022d-b6e3-4e29-b36b-7e1aa2e4ae89_2__U00281_U0029.jpg/1290x2796bb.jpg",
      "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/5a/b8/ea/5ab8ea58-963d-2c07-fb9c-d5e0e0046104/28663af4-ad42-43c2-bfe8-f68a63b80e25_4__U00281_U0029.jpg/1290x2796bb.jpg"
    ]
  },
  {
    slug: "execlane-chauffeur-service",
    title: "Execlane Chauffeur Service",
    category: "SaaS booking platform",
    summary:
      "A chauffeur booking and operations platform for Manchester and North England with dispatch, driver, fleet, and admin workflows.",
    challenge:
      "The business needed a polished customer booking experience while keeping dispatch, driver assignments, and fleet operations manageable behind the scenes.",
    solution:
      "SoftThrive delivered a React frontend with a Node.js and MongoDB backend, supported by admin and driver panels for operational control.",
    impact: ["Centralized bookings and fleet coordination", "Dedicated admin and driver workflows", "Live web platform for a UK market service"],
    services: ["SaaS Applications", "Web Platforms", "Admin Dashboard"],
    stack: ["React", "Node.js", "MongoDB", "ExpressJS"],
    liveUrl: "https://chaufer-softthrive.netlify.app/",
    accent: "blue"
  },
  {
    slug: "scribbes-social-platform",
    title: "Scribbes",
    category: "Social web platform",
    summary:
      "A Next.js social media and blogging platform with a separate admin dashboard for content and platform management.",
    challenge:
      "The product required a public social experience and an operational admin layer that could manage activity without slowing the user-facing app.",
    solution:
      "SoftThrive built the platform with Next.js, React, and Node.js, separating public flows from the admin-side control experience.",
    impact: ["Next.js production deployment", "Admin dashboard for platform operations", "Content and community features in one system"],
    services: ["SaaS Applications", "Web Platforms", "Mobile App Development"],
    stack: ["Next.js", "React", "Node.js", "Vercel"],
    liveUrl: "https://scribbes.vercel.app/",
    secondaryUrl: "https://scribbes-admin-side.vercel.app/",
    accent: "green"
  },
  {
    slug: "iammusic-lms",
    title: "IAmMusic",
    category: "Education SaaS",
    summary:
      "A music LMS connecting students with teachers through a React frontend, Node backend, marketplace flows, and admin tools.",
    challenge:
      "The platform needed to support discovery, learning, teacher-student matching, and internal management without feeling heavy to users.",
    solution:
      "SoftThrive created a web platform using React, Node.js, Tailwind CSS, and PostgreSQL with a clean front-facing experience and admin-ready structure.",
    impact: ["Teacher-student marketplace foundation", "Education workflows in a scalable web app", "Modern React interface for learners"],
    services: ["SaaS Applications", "Mobile App Development", "Web Platforms"],
    stack: ["React", "Node.js", "Tailwind CSS", "PostgreSQL"],
    liveUrl: "https://iammusic.netlify.app/",
    accent: "orange"
  },
  {
    slug: "dentclinic-healthcare-saas",
    title: "DentClinic",
    category: "Healthcare SaaS",
    productType: "mobile",
    summary:
      "A dental and poly-clinic SaaS with appointments, patient records, insurance claims, billing, inventory, and mobile-first access.",
    challenge:
      "Clinic teams needed a unified system for daily patient and operational workflows, replacing fragmented appointment, record, billing, and inventory handling.",
    solution:
      "SoftThrive delivered a Flutter app supported by React, Node.js, and Firebase capabilities for clinic management and healthcare operations.",
    impact: ["Appointments and patient records in one flow", "Billing, inventory, and claims support", "Live Android proof for healthcare SaaS"],
    services: ["SaaS Applications", "Mobile Apps", "Healthcare"],
    stack: ["Flutter", "React", "Node.js", "Firebase"],
    liveUrl: "https://play.google.com/store/apps/details?id=site.dentclinic.maincompanionapp",
    playStoreUrl: "https://play.google.com/store/apps/details?id=site.dentclinic.maincompanionapp",
    accent: "blue"
  },
  {
    slug: "prosready-marketplace",
    title: "ProsReady",
    category: "Home services marketplace",
    productType: "mobile",
    summary:
      "A home services marketplace with booking, payments, reviews, and mobile workflows supporting more than $50K in monthly transactions.",
    challenge:
      "The product needed to make home-service discovery and booking easy for customers while supporting trusted providers and transaction-heavy usage.",
    solution:
      "SoftThrive built a Flutter and Firebase marketplace experience covering service discovery, booking, payments, and review loops.",
    impact: ["$50K+ monthly transaction proof", "Booking, payments, and reviews", "Marketplace workflows for providers and customers"],
    services: ["Mobile App Development", "Mobile Apps", "Marketplace"],
    stack: ["Flutter", "Firebase"],
    liveUrl: "https://play.google.com/store/apps/details?id=com.shees1.services_provider",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.shees1.services_provider",
    accent: "green"
  },
  {
    slug: "repairoo-service-bidding",
    title: "Repairoo",
    category: "Service bidding platform",
    productType: "mobile",
    summary:
      "A Dubai-focused service bidding marketplace connecting customers with contractors through mobile and web touchpoints.",
    challenge:
      "Users needed a simple way to request repairs and compare contractor responses, while contractors needed a reliable channel for incoming work.",
    solution:
      "SoftThrive created a dual-sided marketplace with Flutter and Firebase, supported by a live web presence for the brand.",
    impact: ["Dual-sided service marketplace", "Contractor bidding workflows", "Live Android and website footprint"],
    services: ["Mobile App Development", "Mobile Apps", "Marketplace"],
    stack: ["Flutter", "Firebase"],
    liveUrl: "https://play.google.com/store/apps/details?id=com.repairoo.app",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.repairoo.app",
    secondaryUrl: "https://repairoo.ae/",
    accent: "orange",
    artworkUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/54/f4/41/54f44109-3e7f-3040-cacd-f7d7dc7adf4e/AppIcon-1x_U007emarketing-0-11-0-85-220-0.png/512x512bb.jpg",
    previewImages: ["/portfolio/featured/repairoo-play.webp", "/portfolio/featured/repairoo-web.webp"]
  },
  {
    slug: "fasal360-agtech-ai",
    title: "Fasal360",
    category: "AI agriculture platform",
    summary:
      "An AgTech platform with AI-powered recommendations, weather API support, seed verification, marketplace flows, mobile apps, and a website.",
    challenge:
      "Agriculture users needed practical intelligence for crop decisions, verification, weather context, and product discovery in one accessible platform.",
    solution:
      "SoftThrive combined Flutter, Firebase, and AI features into a mobile-first agriculture product with supporting web presence.",
    impact: ["AI recommendations for agriculture use cases", "Weather API and seed verification", "Live iOS, Android, and website ecosystem"],
    services: ["AI Solutions", "Mobile Apps", "Web Platforms"],
    stack: ["Flutter", "Firebase", "AI"],
    liveUrl: "https://apps.apple.com/pk/app/fasal360/id6748749929",
    appStoreUrl: "https://apps.apple.com/pk/app/fasal360/id6748749929",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.fasal360.app",
    secondaryUrl: "https://fasal360.com/",
    productType: "mobile",
    artworkUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/35/c2/cb/35c2cb92-ec1b-6108-229e-61be4e084916/AppIcon-0-0-1x_U007emarketing-0-11-0-85-220.png/512x512bb.jpg",
    previewImages: ["/portfolio/featured/fasal360-play.webp", "/portfolio/featured/fasal360-web.webp"],
    accent: "green"
  },
  {
    slug: "food-buddy-restaurant-platform",
    title: "Food Buddy",
    category: "Restaurant marketplace",
    productType: "mobile",
    summary:
      "A restaurant deals and booking product with QR redemption, cashback, table booking, and restaurant dashboard workflows.",
    challenge:
      "Restaurants needed a promotional system that could turn offers into measurable visits while giving customers a simple discovery and redemption journey.",
    solution:
      "SoftThrive delivered a Flutter, Node.js, and Firebase product with customer flows, QR redemption, bookings, cashback, and dashboard support.",
    impact: ["QR-code offer redemption", "Cashback and table booking flows", "Restaurant-side promotion management"],
    services: ["Mobile App Development", "Mobile Apps", "Marketplace"],
    stack: ["Flutter", "Firebase", "Node.js", "In-App Purchases"],
    liveUrl: "https://apps.apple.com/us/app/myfoodbuddy/id6505124191",
    appStoreUrl: "https://apps.apple.com/us/app/myfoodbuddy/id6505124191",
    accent: "orange"
  },
  {
    slug: "virtual-try-on-commerce",
    title: "Virtual Try-On / Maryum n Maria",
    category: "Shopify AI commerce",
    summary:
      "An e-commerce and AI/AR virtual try-on experience using Shopify, OpenAI, ByteDance APIs, and WordPress for a fashion commerce brand.",
    challenge:
      "The brand needed to improve online product confidence by letting shoppers experience fashion items more interactively before buying.",
    solution:
      "SoftThrive supported an AI/AR virtual try-on commerce experience with Shopify and AI integrations connected into the public shopping journey.",
    impact: ["AI/AR shopping experience", "Fashion commerce interaction layer", "Shopify and API integration proof"],
    services: ["Shopify", "AI Solutions", "Web Platforms"],
    stack: ["Shopify", "AI", "AR", "OpenAI", "WordPress"],
    liveUrl: "https://maryumnmaria.com/",
    accent: "blue"
  },
  {
    slug: "eurojobs-ecosystem",
    title: "EuroJobs Ecosystem",
    category: "Recruitment app",
    summary:
      "A two-sided recruitment ecosystem pairing job seeker profiles and recommendations with recruiter-side job management.",
    challenge:
      "The platform required separate experiences for job seekers and recruiters while keeping the product cohesive as a full hiring ecosystem.",
    solution:
      "SoftThrive built Flutter and Firebase apps for job searching, profile building, matching, recommendations, and recruiter job management.",
    impact: ["Separate job seeker and recruiter apps", "Profile, matching, and recommendation flows", "Live iOS proof for both sides"],
    services: ["Mobile App Development", "Mobile Apps", "SaaS Applications"],
    stack: ["Flutter", "Firebase"],
    liveUrl: "https://apps.apple.com/pk/app/eurojobs-search/id6477697476",
    appStoreUrl: "https://apps.apple.com/pk/app/eurojobs-search/id6477697476",
    secondaryUrl: "https://apps.apple.com/pk/app/eurojobs-pro/id6477157892",
    accent: "green"
  }
];

export const workflowSteps: WorkflowStep[] = [
  {
    id: "discover",
    title: "Map the product",
    text: "Scope, users, and launch goals aligned before design.",
    tag: "Discovery",
    icon: BriefcaseBusiness
  },
  {
    id: "shopify",
    title: "Commerce & Shopify",
    text: "Storefronts, checkout, and AI shopping experiences.",
    tag: "Build",
    icon: ShoppingBag,
    href: "/services/shopify"
  },
  {
    id: "design",
    title: "Design the experience",
    text: "Flows, UI, and motion that feel premium on day one.",
    tag: "Design",
    icon: Sparkles
  },
  {
    id: "mvp-saas",
    title: "Business apps & SaaS systems",
    text: "Dashboards, mobile apps, roles, and core workflows.",
    tag: "Engineering",
    icon: Layers3,
    href: "/services/saas-applications"
  },
  {
    id: "ai-mobile",
    title: "AI & mobile delivery",
    text: "Flutter apps, AI features, APIs, and integrations.",
    tag: "Scale",
    icon: BrainCircuit,
    href: "/services/ai-solutions"
  },
  {
    id: "launch",
    title: "Launch & improve",
    text: "QA, store release, performance, and post-launch clarity.",
    tag: "Launch",
    icon: CheckCircle2
  }
];

export const portfolioExperience =
  "150+ live mobile apps and 300+ web applications shipped. We work with startups and established companies, including Nasdaq-listed teams. Specialists in Arabic-first Shopify stores and mobile apps for Saudi Arabia and the GCC market.";

export const stats = [
  { label: "Live mobile apps", value: SITE_STATS.mobileApps },
  { label: "Web applications", value: SITE_STATS.webApps },
  { label: "Client range", value: "Startup → Nasdaq" },
  { label: "Team size", value: `${SITE_STATS.teamSize} person team` }
];

export type AboutStatItem = {
  label: string;
  detail: string;
  /** Numeric target for count-up; omit when using `display` */
  end?: number;
  prefix?: string;
  suffix?: string;
  /** Static label when not counting (e.g. client range) */
  display?: string;
  duration?: number;
};

export const aboutStats: AboutStatItem[] = [
  {
    display: "150+",
    label: "Live mobile apps",
    detail: "On App Store & Google Play"
  },
  {
    display: "300+",
    label: "Web applications",
    detail: "SaaS, commerce & platforms"
  },
  {
    display: "Startup → Nasdaq",
    label: "Client spectrum",
    detail: "Founders to listed enterprises"
  }
];

export const process = [
  {
    title: "Map the product",
    text: "We clarify audience, value, workflows, features, and launch constraints before design starts.",
    icon: BriefcaseBusiness
  },
  {
    title: "Design the experience",
    text: "User journeys, screens, motion, and visual systems are shaped around a polished buyer and user impression.",
    icon: Sparkles
  },
  {
    title: "Build the system",
    text: "Frontend, backend, mobile, integrations, admin panels, and QA move together in controlled delivery cycles.",
    icon: Bot
  },
  {
    title: "Launch and improve",
    text: "We verify performance, responsiveness, core flows, and post-launch next steps with product clarity.",
    icon: CheckCircle2
  }
];

export const trustPoints = [
  {
    title: "100+ Saudi Stores Built",
    text: "Real Arabic Shopify stores live across Saudi Arabia and GCC — fashion, beauty, perfumes, food, and more.",
    icon: ShieldCheck
  },
  {
    title: "Arabic-First Development",
    text: "Every store and app we build includes Arabic RTL layout and Saudi Riyal pricing as standard.",
    icon: Code2
  },
  {
    title: "Delivered On Time, Every Time",
    text: "From first-time entrepreneurs to established businesses — we ship products that work in production, delivered on schedule.",
    icon: LineChart
  }
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function getFeaturedCaseStudy() {
  return caseStudies.find((study) => study.featured) ?? caseStudies[0];
}

/** Homepage portfolio carousel — mobile hero + live web products */
export const HOME_FEATURED_CASE_STUDY_SLUGS = [
  "frenzone-live",
  "repairoo-service-bidding",
  "fasal360-agtech-ai"
] as const;

export function getHomeFeaturedCaseStudies(): CaseStudy[] {
  return HOME_FEATURED_CASE_STUDY_SLUGS.map((slug) => caseStudies.find((s) => s.slug === slug)).filter(
    (s): s is CaseStudy => Boolean(s)
  );
}

export function inferStoreLinks(study: CaseStudy) {
  const appStoreUrl =
    study.appStoreUrl ?? (study.liveUrl.includes("apps.apple.com") ? study.liveUrl : undefined);
  const playStoreUrl =
    study.playStoreUrl ?? (study.liveUrl.includes("play.google.com") ? study.liveUrl : undefined);
  return { appStoreUrl, playStoreUrl };
}

export { screenshotUrl, websiteScreenshotUrl, isStoreListingUrl } from "@/lib/screenshot";
