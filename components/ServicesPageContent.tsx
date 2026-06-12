"use client";

import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { getLocalizedServices, useDictionary } from "@/lib/i18n";

export function ServicesPageContent() {
  const { dict, locale } = useDictionary();
  const sp = dict.servicesPage;
  const services = getLocalizedServices(locale);

  return (
    <section className="py-20">
      <div className="container-shell">
        <SectionHeading center eyebrow={sp.eyebrow} text={sp.text} title={sp.title} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <div className="mt-14 rounded-[34px] bg-[#f8f9fc] p-8 text-center">
          <h2 className="text-3xl font-black text-[#08112b]">{sp.combinedTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl leading-7 text-[#5a6d90]">{sp.combinedText}</p>
          <div className="mt-6 flex justify-center">
            <WhatsAppButton>{dict.cta.whatsappConsultation}</WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
