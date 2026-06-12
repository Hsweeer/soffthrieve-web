import type { Metadata } from "next";
import { ContactPageContent } from "@/components/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get a free consultation for your Shopify store or app. We respond within 30 minutes. Serving Saudi Arabia and GCC.",
  openGraph: {
    title: "Softhrive | Contact Us — Free Consultation on WhatsApp",
    description:
      "Get a free consultation for your Shopify store or app. We respond within 30 minutes. Serving Saudi Arabia and GCC."
  },
  twitter: {
    title: "Softhrive | Contact Us — Free Consultation on WhatsApp",
    description:
      "Get a free consultation for your Shopify store or app. We respond within 30 minutes. Serving Saudi Arabia and GCC."
  }
};

export default function ContactPage() {
  return <ContactPageContent />;
}
