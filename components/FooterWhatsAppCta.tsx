"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Clock } from "lucide-react";
import { trackMetaContact } from "@/components/MetaPixel";
import { getWhatsAppUrl, WHATSAPP_GREEN } from "@/lib/whatsapp";
import { useDictionary } from "@/lib/i18n/LocaleContext";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export function FooterWhatsAppCta() {
  const { dict, locale } = useDictionary();
  const f = dict.footer;

  return (
    <section
      aria-label={f.whatsappCtaAria}
      className="site-chrome-ltr border-b border-slate-200/70 bg-gradient-to-b from-[#f6f9fc] to-[#eef4f9] py-10 sm:py-12 lg:py-14"
    >
      <div className="container-shell">
        <motion.div
          className="relative overflow-hidden rounded-[24px] border border-[#25D366]/20 bg-gradient-to-br from-white via-[#f0fdf4] to-[#ecfdf5] p-5 shadow-[0_20px_56px_rgba(37,211,102,0.1)] sm:rounded-[28px] sm:p-8 lg:p-10"
          initial={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-40px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#25D366]/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-12 h-40 w-40 rounded-full bg-[#2090f0]/8 blur-3xl"
          />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
              <div
                aria-hidden
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-[0_12px_32px_rgba(37,211,102,0.35)] sm:h-16 sm:w-16 sm:rounded-[20px]"
              >
                <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#128C7E]">{f.whatsappEyebrow}</p>
                <h2 className="mt-2 text-xl font-black leading-tight text-[#082f49] sm:text-2xl lg:text-[1.65rem]">
                  {f.whatsappTitle}
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-7 text-slate-600 sm:text-[0.9375rem]">
                  {f.whatsappSubtitle}
                </p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#25D366]/25 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-[#0f5132] shadow-sm">
                  <Clock aria-hidden className="h-3.5 w-3.5 text-[#25D366]" />
                  {f.whatsappResponseBadge}
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col items-stretch gap-3 sm:max-w-md lg:w-auto lg:max-w-none lg:shrink-0 lg:items-end">
              <Link
                className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-full px-6 text-center text-sm font-bold leading-snug text-white shadow-[0_14px_36px_rgba(37,211,102,0.32)] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:min-h-11 sm:w-auto sm:min-w-[min(100%,280px)] lg:min-w-[260px]"
                href={getWhatsAppUrl(locale)}
                onClick={() => trackMetaContact()}
                rel="noopener noreferrer"
                style={{ backgroundColor: WHATSAPP_GREEN }}
                target="_blank"
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                <span className="max-w-[220px] sm:max-w-none">{f.whatsappCtaButton}</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
