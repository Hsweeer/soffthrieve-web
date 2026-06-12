"use client";

import Link from "next/link";
import { Suspense } from "react";
import { Clock, Mail, MapPin, MessageSquare, Sparkles } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ButtonLink } from "@/components/ButtonLink";
import { SITE_LOCATION } from "@/lib/site-social";
import { localePath, useDictionary } from "@/lib/i18n";

export function ContactPageContent() {
  const { dict, locale } = useDictionary();
  const cp = dict.contactPage;

  const contactChannels = [
    {
      icon: Mail,
      title: cp.emailTitle,
      value: "hello@softthrive.com",
      href: "mailto:hello@softthrive.com",
      note: cp.emailNote
    },
    {
      icon: MapPin,
      title: cp.studioTitle,
      value: SITE_LOCATION.full,
      note: cp.studioNote
    },
    {
      icon: Clock,
      title: cp.responseTitle,
      value: cp.responseValue,
      note: cp.responseNote
    }
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#eff7fe] via-white to-[#f8f9fc] py-12 sm:py-16 lg:py-20">
        <div className="container-shell relative z-10">
          <p
            className="mb-6 w-full rounded-xl border border-sky-100 bg-[#e8f4fd] p-3 text-center text-sm font-medium leading-relaxed text-[#0c4a6e]"
            role="status"
          >
            {cp.saudiBanner}
          </p>
          <SectionHeading
            center
            eyebrow={dict.contact.eyebrow}
            text={dict.contact.text}
            title={dict.contact.title}
          />
          <div className="mt-8 flex justify-center">
            <WhatsAppButton>{dict.contact.whatsappPrimary}</WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-4">
        <div className="container-shell grid min-w-0 gap-8 sm:gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <div className="grid gap-4">
              {contactChannels.map((channel) => (
                <div
                  className="rounded-3xl border border-[#08112b]/10 bg-white p-5 shadow-[0_18px_60px_rgba(8,17,43,0.06)]"
                  key={channel.title}
                >
                  <channel.icon className="h-6 w-6 text-[#2090f0]" />
                  <h3 className="mt-4 font-black text-[#08112b]">{channel.title}</h3>
                  {channel.href ? (
                    <Link className="mt-1 block text-sm font-bold text-[#2090f0] hover:underline" href={channel.href}>
                      {channel.value}
                    </Link>
                  ) : (
                    <p className="mt-1 text-sm font-bold text-[#08112b]">{channel.value}</p>
                  )}
                  <p className="mt-2 text-sm leading-7 text-[#5a6d90]">{channel.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-[#2090f0]/15 bg-gradient-to-br from-[#eff7fe] to-white p-5">
              <Sparkles className="h-6 w-6 text-[#2090f0]" />
              <h3 className="mt-4 font-black text-[#08112b]">{cp.nextStepsTitle}</h3>
              <ol className="mt-3 space-y-2 text-sm leading-7 text-[#5a6d90]">
                {cp.nextSteps.map((step, i) => (
                  <li className="flex gap-2" key={step}>
                    <span className="font-black text-[#2090f0]">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-5 flex flex-wrap gap-3">
                <WhatsAppButton>{dict.cta.whatsappConsultation}</WhatsAppButton>
                <ButtonLink href={localePath("/work", locale)} variant="secondary">
                  {cp.viewOurWork}
                </ButtonLink>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-[#08112b]/10 bg-[#08112b] p-5 text-white">
              <MessageSquare className="h-6 w-6 text-[#52a6f3]" />
              <h3 className="mt-4 font-black">{cp.briefSidebarTitle}</h3>
              <p className="mt-2 text-sm leading-7 text-white/72">{cp.briefSidebarText}</p>
              <Link
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#52a6f3] hover:underline"
                href={localePath("/start", locale)}
              >
                {cp.openOnboarding}
              </Link>
            </div>
          </div>

          <div className="scroll-reveal">
            <p className="mb-4 text-sm font-semibold text-[#5a6d90]">{dict.contact.formSecondary}</p>
            <Suspense fallback={<div className="h-96 animate-pulse rounded-[var(--radius-card)] bg-[#f8f9fc]" />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
