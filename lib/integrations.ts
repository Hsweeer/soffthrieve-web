/** Famous third-party services we integrate across mobile, web, and Shopify. */
export type IntegrationItem = {
  name: string;
  slug: string;
  /** Brand hex without # */
  color: string;
};

export const INTEGRATION_ITEMS: IntegrationItem[] = [
  { name: "Firebase", slug: "firebase", color: "DD2C00" },
  { name: "Stripe", slug: "stripe", color: "635BFF" },
  { name: "Shopify", slug: "shopify", color: "7AB55C" },
  { name: "App Store", slug: "appstore", color: "000000" },
  { name: "Google Play", slug: "googleplay", color: "414141" },
  { name: "PayPal", slug: "paypal", color: "00457C" },
  { name: "OpenAI", slug: "openai", color: "412991" },
  { name: "Twilio", slug: "twilio", color: "F22F46" },
  { name: "MongoDB", slug: "mongodb", color: "47A248" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Flutter", slug: "flutter", color: "02569B" },
  { name: "AWS", slug: "amazonaws", color: "232F3E" },
  { name: "Google Cloud", slug: "googlecloud", color: "4285F4" },
  { name: "GraphQL", slug: "graphql", color: "E10098" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  { name: "Meta", slug: "meta", color: "0467DF" },
  { name: "Slack", slug: "slack", color: "4A154B" },
  { name: "Algolia", slug: "algolia", color: "003DFF" },
  { name: "Mapbox", slug: "mapbox", color: "000000" },
  { name: "Agora", slug: "agora", color: "099DFD" },
  { name: "Auth0", slug: "auth0", color: "EB5424" },
  { name: "Supabase", slug: "supabase", color: "3FCF8E" },
  { name: "Vercel", slug: "vercel", color: "000000" },
  { name: "Cloudflare", slug: "cloudflare", color: "F38020" },
  { name: "WooCommerce", slug: "woocommerce", color: "96588A" },
  { name: "WordPress", slug: "wordpress", color: "21759B" },
  { name: "HubSpot", slug: "hubspot", color: "FF7A59" },
  { name: "Zendesk", slug: "zendesk", color: "03363D" },
  { name: "Intercom", slug: "intercom", color: "1F8DED" },
  { name: "Square", slug: "square", color: "3E4348" },
  { name: "Apple Pay", slug: "applepay", color: "000000" }
];

export function integrationIconPath(slug: string) {
  return `/brand-assets/integrations/${slug}.svg`;
}

/** Green circle marks — same style, 32×32 */
export const UPWORK_UP = "/brand-assets/upwork-up.svg";
export const FIVERR_FI = "/brand-assets/fiverr-fi.svg";
