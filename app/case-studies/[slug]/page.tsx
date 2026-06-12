import { notFound } from "next/navigation";
import { CaseStudyPageContent } from "@/components/CaseStudyPageContent";
import { caseStudies, getCaseStudy, screenshotUrl } from "@/lib/data";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    openGraph: {
      title: `${study.title} Case Study`,
      description: study.summary,
      images: [screenshotUrl(study.secondaryUrl ?? study.liveUrl)]
    }
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${study.title} case study`,
    description: study.summary,
    url: study.liveUrl,
    creator: { "@type": "Organization", name: "SoftThrive" },
    keywords: [...study.services, ...study.stack].join(", ")
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} type="application/ld+json" />
      <CaseStudyPageContent slug={slug} />
    </>
  );
}
