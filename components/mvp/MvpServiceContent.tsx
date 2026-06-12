"use client";

import { CheckCircle2 } from "lucide-react";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { SectionHeading } from "@/components/SectionHeading";
import { MvpPricing } from "@/components/mvp/MvpPricing";
import { MvpGuarantee } from "@/components/mvp/MvpGuarantee";
import { MvpTestimonials } from "@/components/mvp/MvpTestimonials";
import { LogoMarquee } from "@/components/LogoMarquee";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { getLocalizedCaseStudies, getLocalizedServices, useDictionary } from "@/lib/i18n";
import { getMobileAppWhatsAppMessage } from "@/lib/whatsapp";

export function MvpServiceContent() {
  const { dict, locale } = useDictionary();
  const services = getLocalizedServices(locale);
  const service = services.find((item) => item.slug === "mvp-development");
  if (!service) return null;

  const caseStudies = getLocalizedCaseStudies(locale);
  const related = caseStudies
    .filter(
      (study) =>
        study.services.some((name) => name.toLowerCase().includes("mvp") || name.toLowerCase().includes("mobile")) ||
        study.productType === "mobile"
    )
    .slice(0, 3);
  const fallback = related.length ? related : caseStudies.slice(0, 3);

  return (
    <>
      <section className="overflow-hidden bg-[#f8f9fc] py-12 sm:py-16 lg:py-20">
        <div className="container-shell grid min-w-0 gap-8 sm:gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="scroll-reveal">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2090f0]">{dict.mvp.heroEyebrow}</p>
            <h1 className="mt-4 text-3xl font-black leading-tight tracking-[0] text-[#08112b] sm:text-4xl lg:text-5xl">
              {dict.mvp.heroTitle}
            </h1>
            <p className="mt-5 text-lg leading-8 text-[#5a6d90]">{dict.mvp.heroDescription}</p>
            <div className="mt-8">
              <WhatsAppButton locale={locale} message={getMobileAppWhatsAppMessage(locale)}>
                {dict.cta.whatsappConsultation}
              </WhatsAppButton>
            </div>
          </div>
          <div className="scroll-reveal rounded-[34px] border border-[#2090f0]/15 bg-white p-6 shadow-[0_24px_80px_rgba(8,17,43,0.08)]">
            <div className="rounded-[28px] bg-gradient-to-br from-[#2090f0]/12 via-white to-[#2eca8b]/12 p-6">
              <service.icon className="h-12 w-12 text-[#2090f0]" />
              <h2 className="mt-8 text-3xl font-black text-[#08112b]">{dict.servicesPage.whatYouGet}</h2>
              <div className="mt-6 grid gap-3">
                {dict.mvp.outcomes.map((outcome) => (
                  <div
                    className="flex items-center gap-3 rounded-2xl bg-white p-4 text-sm font-bold text-[#3c4858]"
                    key={outcome}
                  >
                    <CheckCircle2 className="h-5 w-5 text-[#2eca8b]" />
                    {outcome}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <MvpPricing />
      <MvpGuarantee />
      <MvpTestimonials />

      <section className="border-y border-slate-200/80 bg-[#f9fafb] py-12 sm:py-16">
        <div className="container-shell">
          <LogoMarquee />
        </div>
      </section>

      <section className="py-20">
        <div className="container-shell">
          <SectionHeading eyebrow={dict.services.relatedWork} title={dict.mvp.portfolioTitle} />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {fallback.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
