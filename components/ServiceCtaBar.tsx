import Link from "next/link";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { GhostButton } from "@/components/ui/GhostButton";
import type { Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n/dictionary";
import { localePath } from "@/lib/i18n/paths";

type ServiceCtaBarProps = {
  locale?: Locale;
  proofHref?: string;
  proofLabel?: string;
};

export function ServiceCtaBar({ locale = "en", proofHref = "/work", proofLabel }: ServiceCtaBarProps) {
  const dict = getDictionary(locale);

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <WhatsAppButton locale={locale}>{dict.cta.whatsappConsultation}</WhatsAppButton>
      <GhostButton href={localePath(proofHref, locale)}>{proofLabel ?? dict.services.seeProof}</GhostButton>
      <Link className="inline-flex min-h-11 items-center text-sm font-semibold text-[#5a6d90] hover:text-[#2090f0]" href={localePath("/contact", locale)}>
        {dict.contact.formSecondary}
      </Link>
    </div>
  );
}
