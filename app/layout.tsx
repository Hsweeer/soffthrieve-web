import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { ScrollProgressThread } from "@/components/ScrollProgressThread";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { MetaPixel } from "@/components/MetaPixel";
import { FooterWhatsAppCta } from "@/components/FooterWhatsAppCta";
import { SiteShell } from "@/components/SiteShell";

export const viewport = {
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.softthrive.com"),
  title: {
    default: "Softhrive | Shopify Stores and Mobile Apps for Saudi Arabia",
    template: "%s | Softhrive"
  },
  description:
    "Softhrive builds professional Shopify stores and mobile apps for Saudi Arabia and GCC. 100+ stores. 150+ apps. Top Rated on Upwork.",
  openGraph: {
    title: "Softhrive | Professional Shopify Stores for Saudi Arabia",
    description:
      "Softhrive builds professional Shopify stores for Saudi businesses — ready in 7 days. 100+ stores built. Arabic RTL. SAR pricing. Top Rated on Upwork.",
    type: "website",
    images: ["/logo-dark.webp"]
  },
  twitter: {
    title: "Softhrive | Professional Shopify Stores for Saudi Arabia",
    description:
      "Softhrive builds professional Shopify stores for Saudi businesses — ready in 7 days. 100+ stores built. Arabic RTL. SAR pricing. Top Rated on Upwork."
  }
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Softhrive",
  url: "https://www.softthrive.com/",
  logo: "https://www.softthrive.com/logo-dark.png",
  description:
    "Softhrive builds professional Shopify stores and mobile apps for Saudi Arabia and GCC.",
  makesOffer: [
    "Shopify development",
    "Mobile app development",
    "SaaS application development",
    "Mobile app development",
    "Web platform development",
    "AI product features"
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" className="font-sans">
      <body>
        <MetaPixel />
        <script dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} type="application/ld+json" />
        <SiteShell>
          <SmoothScroll>
            <ScrollAnimations />
            <ScrollProgressThread />
            <Suspense fallback={<div className="h-[76px]" />}>
              <Header />
            </Suspense>
            <main>{children}</main>
            <FooterWhatsAppCta />
            <Footer />
            <FloatingWhatsAppButton />
            <Chatbot />
          </SmoothScroll>
        </SiteShell>
      </body>
    </html>
  );
}
