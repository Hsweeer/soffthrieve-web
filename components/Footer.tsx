"use client";

import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { FooterSocialRow } from "./SocialIconLink";
import { getLocalizedServices, useDictionary, localePath } from "@/lib/i18n";

const FOOTER_SERVICES_TRIM_SLUGS = new Set(["saas-applications", "ai-solutions", "mobile-apps"]);

const companyLinks = [
  { href: "/work", key: "work" as const },
  { href: "/about", key: "about" as const },
  { href: "/services", key: "services" as const },
  { href: "/start", key: "startProject" as const },
  { href: "/contact", key: "contact" as const }
];

export function Footer() {
  const { dict, locale } = useDictionary();
  const localizedServices = getLocalizedServices(locale).filter(
    (service) => !FOOTER_SERVICES_TRIM_SLUGS.has(service.slug)
  );

  return (
    <footer className="footer-shell site-chrome-ltr relative border-t border-white/[0.06] bg-[#050508] text-white">
        <div className="container-shell grid gap-10 py-12 sm:gap-12 sm:py-14 lg:grid-cols-[1.25fr_0.9fr_0.75fr_0.9fr] lg:gap-10 lg:py-16 lg:pr-8 xl:pr-12">
          <div className="flex max-w-sm flex-col">
            <Logo iconSize={48} onDark showText={false} variant="light" />
            <p className="mt-5 text-sm leading-[1.65] text-white/72">{dict.footer.blurbHome}</p>
            <FooterSocialRow className="mt-6" />
            <p className="mt-6 text-xs font-medium leading-relaxed text-white/45">{dict.footer.statsLine}</p>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.16em] text-white/90">{dict.footer.services}</h3>
            <nav aria-label="Footer services" className="mt-4 grid gap-2">
              {localizedServices.map((service) => (
                <Link
                  className="text-sm font-medium text-white/62 transition hover:text-sky-400"
                  href={localePath(`/services/${service.slug}`, locale)}
                  key={service.slug}
                >
                  {service.title}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.16em] text-white/90">{dict.footer.company}</h3>
            <nav aria-label="Footer company" className="mt-4 grid gap-2">
              {companyLinks.map((link) => (
                <Link
                  className="text-sm font-medium text-white/62 transition hover:text-white"
                  href={localePath(link.href, locale)}
                  key={link.href}
                >
                  {dict.footerLinks[link.key]}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.16em] text-white/90">{dict.footer.contact}</h3>
            <ul className="mt-4 space-y-3 text-sm font-medium text-white/68">
              <li>
                <a className="inline-flex items-center gap-2 transition hover:text-white" href="mailto:hello@softthrive.com">
                  <Mail className="h-4 w-4 text-sky-400" />
                  hello@softthrive.com
                </a>
              </li>
              <li>
                <Link className="transition hover:text-sky-400" href={localePath("/start", locale)}>
                  {dict.footer.projectOnboarding}
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-sky-400" href={localePath("/contact", locale)}>
                  {dict.footer.contactForm}
                </Link>
              </li>
              <li className="inline-flex items-start gap-2 text-white/50">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                <span>{dict.footer.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.08]">
          <div className="container-shell flex flex-col gap-2 py-5 pr-4 text-xs text-white/42 sm:flex-row sm:items-center sm:justify-between sm:pr-6 lg:pr-8 xl:pr-12">
            <span>
              © {new Date().getFullYear()} Softhrive. {dict.footer.rights}
            </span>
            <span className="text-white/50">{dict.footer.tagline}</span>
          </div>
      </div>
    </footer>
  );
}
