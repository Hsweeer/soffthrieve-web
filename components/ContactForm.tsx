"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Send } from "lucide-react";
import { trackMetaLead } from "@/components/MetaPixel";
import { formatOnboardingSummary, loadOnboarding } from "@/lib/onboarding";
import { localePath, useDictionary } from "@/lib/i18n";

const CONTACT_PROJECT_TYPES = ["Shopify Store", "Mobile App"] as const;

function mapProductType(type: string) {
  if (type.includes("Shopify")) return CONTACT_PROJECT_TYPES[0];
  if (type.includes("Mobile")) return CONTACT_PROJECT_TYPES[1];
  return CONTACT_PROJECT_TYPES[0];
}

export function ContactForm() {
  const { dict, locale } = useDictionary();
  const searchParams = useSearchParams();
  const fromStart = searchParams.get("from") === "start";
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState<string>(CONTACT_PROJECT_TYPES[0]);
  const [details, setDetails] = useState("");
  const [hasOnboarding, setHasOnboarding] = useState(false);

  useEffect(() => {
    const saved = loadOnboarding();
    if (!saved) return;
    setHasOnboarding(true);
    if (saved.name) setName(saved.name);
    if (saved.whatsapp) setWhatsapp(saved.whatsapp);
    if (saved.email) setEmail(saved.email);
    if (saved.productType) setProjectType(mapProductType(saved.productType));
    setDetails(formatOnboardingSummary(saved));
  }, [locale]);

  if (submitted) {
    return (
      <div className="rounded-[var(--radius-card)] border border-[#2eca8b]/20 bg-white p-8 text-center shadow-[var(--shadow-card)]">
        <CheckCircle2 className="mx-auto h-12 w-12 text-[#2eca8b]" />
        <h3 className="mt-4 text-2xl font-black text-[#08112b]">{dict.form.successTitle}</h3>
        <p className="mt-3 text-[#5a6d90]">{dict.form.successText}</p>
        <button
          className="mt-6 rounded-full bg-[#2090f0] px-5 py-3 text-sm font-bold text-white"
          onClick={() => setSubmitted(false)}
          type="button"
        >
          {dict.form.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form
      className="rounded-[var(--radius-card)] border border-[#08112b]/10 bg-white p-6 shadow-[var(--shadow-card)]"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      method="POST"
      name="contact"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const body = new FormData(form);
        try {
          await fetch("/", { method: "POST", body });
          trackMetaLead();
          setSubmitted(true);
        } catch {
          setSubmitted(true);
        }
      }}
    >
      <input name="form-name" type="hidden" value="contact" />
      <p className="hidden">
        <label>
          Do not fill
          <input name="bot-field" />
        </label>
      </p>

      {(fromStart || hasOnboarding) && (
        <div className="mb-5 rounded-2xl border border-[#20dcc7]/30 bg-[#20dcc7]/8 px-4 py-3 text-sm text-[#08112b]">
          <p className="font-bold">{dict.form.onboardingLoaded}</p>
          <p className="mt-1 text-[#5a6d90]">
            {dict.form.onboardingPrefilled}{" "}
            <Link className="font-bold text-[#2090f0] hover:underline" href={localePath("/start", locale)}>
              {dict.form.editAnswers}
            </Link>
          </p>
        </div>
      )}

      <label className="grid gap-2 text-sm font-bold text-[#08112b]">
        {dict.form.name}
        <input
          className="rounded-2xl border border-[#08112b]/10 bg-[#f8f9fc] px-4 py-3 font-medium outline-none transition focus:border-[#2090f0]"
          name="name"
          onChange={(e) => setName(e.target.value)}
          required
          value={name}
        />
      </label>
      <label className="mt-4 grid gap-2 rounded-2xl border border-[#25D366]/25 bg-[#25D366]/6 p-4 text-sm font-bold text-[#08112b]">
        {dict.form.whatsapp}
        <input
          className="rounded-2xl border border-[#25D366]/30 bg-white px-4 py-3 font-medium outline-none transition focus:border-[#25D366]"
          name="whatsapp"
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder={dict.startPage.whatsappPlaceholder}
          required={fromStart || hasOnboarding}
          type="tel"
          value={whatsapp}
        />
      </label>
      <label className="mt-4 grid gap-2 text-sm font-bold text-[#08112b]">
        {dict.form.email}
        <input
          className="rounded-2xl border border-[#08112b]/10 bg-[#f8f9fc] px-4 py-3 font-medium outline-none transition focus:border-[#2090f0]"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          value={email}
        />
      </label>
      <label className="mt-4 grid gap-2 text-sm font-bold text-[#08112b]">
        {dict.form.projectType}
        <select
          className="rounded-2xl border border-[#08112b]/10 bg-[#f8f9fc] px-4 py-3 font-medium outline-none transition focus:border-[#2090f0]"
          name="projectType"
          onChange={(e) => setProjectType(e.target.value)}
          value={projectType}
        >
          {CONTACT_PROJECT_TYPES.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </label>
      <label className="mt-4 grid gap-2 text-sm font-bold text-[#08112b]">
        {dict.form.projectDetails}
        <textarea
          className="min-h-36 rounded-2xl border border-[#08112b]/10 bg-[#f8f9fc] px-4 py-3 font-medium outline-none transition focus:border-[#2090f0]"
          name="message"
          onChange={(e) => setDetails(e.target.value)}
          placeholder={dict.form.detailsPlaceholder}
          required
          value={details}
        />
      </label>
      <button
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2090f0] px-5 py-4 text-sm font-black text-white shadow-[0_18px_48px_rgba(32,144,240,0.26)] transition hover:bg-[#1878c9]"
        type="submit"
      >
        {dict.form.submit} <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
