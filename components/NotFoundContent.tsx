"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { localePath, useDictionary } from "@/lib/i18n";

export function NotFoundContent() {
  const { dict, locale } = useDictionary();

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-[#f8f9fc] py-16">
      <div className="container-shell flex max-w-lg flex-col items-center text-center">
        <Logo iconSize={48} showText={false} />
        <h1 className="mt-8 text-3xl font-black text-[#08112b] sm:text-4xl">{dict.notFound.title}</h1>
        <p className="mt-4 text-base leading-8 text-[#5a6d90]">{dict.notFound.text}</p>
        <div className="mt-8 w-full max-w-sm">
          <WhatsAppButton fullWidth locale={locale}>
            {dict.notFound.whatsappCta}
          </WhatsAppButton>
        </div>
        <Link
          className="mt-6 text-sm font-medium text-[#5a6d90] underline-offset-4 transition hover:text-[#08112b] hover:underline"
          href={localePath("/", locale)}
        >
          {dict.notFound.backHome}
        </Link>
      </div>
    </section>
  );
}
