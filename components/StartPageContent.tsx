"use client";

import { StartWizard } from "@/components/onboarding/StartWizard";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useDictionary } from "@/lib/i18n";

export function StartPageContent() {
  const { dict, locale } = useDictionary();

  return (
    <section className="onboarding-page relative overflow-hidden py-10 lg:py-14">
      <div className="onboarding-page__bg absolute inset-0" aria-hidden />
      <div className="container-shell relative z-10">
        <div className="mb-8 rounded-2xl border border-[#25D366]/25 bg-[#f0fdf4] p-5 text-center sm:p-6">
          <WhatsAppButton fullWidth locale={locale}>
            {dict.startPage.whatsappSkip}
          </WhatsAppButton>
          <p className="mt-3 text-sm font-medium text-[#166534]">{dict.startPage.whatsappSkipNote}</p>
        </div>

        <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.12em] text-slate-400">
          {dict.startPage.formDivider}
        </p>

        <SectionHeading
          center
          eyebrow={dict.startPage.eyebrow}
          text={dict.startPage.subtitle}
          title={dict.startPage.title}
        />
        <div className="mt-8 lg:mt-10">
          <StartWizard />
        </div>
      </div>
    </section>
  );
}
