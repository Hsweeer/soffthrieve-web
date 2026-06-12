import type { Metadata } from "next";
import { AboutExperience } from "@/components/about/AboutExperience";

export const metadata: Metadata = {
  title: "About",
  description:
    "40-person team. 150+ apps delivered. 100+ Shopify stores built. Serving Saudi Arabia and GCC.",
  openGraph: {
    title: "Softhrive | About Us — App and Shopify Development",
    description:
      "40-person team. 150+ apps delivered. 100+ Shopify stores built. Serving Saudi Arabia and GCC."
  },
  twitter: {
    title: "Softhrive | About Us — App and Shopify Development",
    description:
      "40-person team. 150+ apps delivered. 100+ Shopify stores built. Serving Saudi Arabia and GCC."
  }
};

export default function AboutPage() {
  return <AboutExperience />;
}
