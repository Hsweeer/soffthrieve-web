import fs from "fs";
import path from "path";

const dir = "public/brand-assets/integrations";
const colors = {
  stripe: "635BFF",
  shopify: "7AB55C",
  appstore: "000000",
  googleplay: "414141",
  paypal: "00457C",
  openai: "000000",
  twilio: "F22F46",
  mongodb: "47A248",
  postgresql: "4169E1",
  react: "61DAFB",
  amazonaws: "FF9900",
  googlecloud: "4285F4",
  graphql: "E10098",
  docker: "2496ED",
  meta: "0467DF",
  slack: "4A154B",
  algolia: "003DFF",
  mapbox: "000000",
  agora: "099DFD",
  auth0: "EB5424",
  supabase: "3FCF8E",
  vercel: "000000",
  cloudflare: "F38020",
  woocommerce: "96588A",
  wordpress: "21759B",
  hubspot: "FF7A59",
  zendesk: "03363D",
  intercom: "1F8DED",
  square: "3E4348",
  applepay: "000000"
};

const skip = new Set(["flutter", "firebase"]);

for (const [slug, color] of Object.entries(colors)) {
  const file = path.join(dir, `${slug}.svg`);
  if (!fs.existsSync(file) || skip.has(slug)) continue;
  let svg = fs.readFileSync(file, "utf8");
  if (svg.includes('fill="#')) continue;
  svg = svg.replace(/<path /g, `<path fill="#${color}" `);
  fs.writeFileSync(file, svg);
  console.log("updated", slug);
}
