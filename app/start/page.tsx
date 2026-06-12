import { StartPageContent } from "@/components/StartPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Tell us about your Shopify store or app idea. We scope it and follow up on WhatsApp within 30 minutes.",
  openGraph: {
    title: "Softhrive | Start Your Project — Shopify or App Development",
    description:
      "Tell us about your Shopify store or app idea. We scope it and follow up on WhatsApp within 30 minutes."
  },
  twitter: {
    title: "Softhrive | Start Your Project — Shopify or App Development",
    description:
      "Tell us about your Shopify store or app idea. We scope it and follow up on WhatsApp within 30 minutes."
  }
};

export default function StartPage() {
  return <StartPageContent />;
}
