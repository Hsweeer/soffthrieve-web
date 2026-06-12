import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MvpServiceContent } from "@/components/mvp/MvpServiceContent";
import { ServiceDetailContent } from "@/components/ServiceDetailContent";
import { services } from "@/lib/data";

export function generateStaticParams() {
  return services.filter((s) => s.slug !== "shopify").map((service) => ({ slug: service.slug }));
}

const PAGE_OG: Record<string, { pageTitle: string; title: string; description: string }> = {
  "mvp-development": {
    pageTitle: "Mobile App Development for Saudi Arabia",
    title: "Softhrive | Mobile App Development for Saudi Arabia",
    description:
      "Professional mobile app development for Saudi Arabia and GCC. iOS and Android apps built in 60 days. 150+ apps delivered. Top Rated on Upwork."
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  const og = PAGE_OG[slug];
  if (og) {
    return {
      title: og.pageTitle,
      description: og.description,
      openGraph: { title: og.title, description: og.description },
      twitter: { title: og.title, description: og.description }
    };
  }
  return {
    title: service.title,
    description: service.description
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "shopify") notFound();
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  if (slug === "mvp-development") return <MvpServiceContent />;
  return <ServiceDetailContent slug={slug} />;
}
