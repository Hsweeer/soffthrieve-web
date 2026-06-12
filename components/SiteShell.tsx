"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LocaleProvider } from "@/lib/i18n/LocaleContext";
import { switchLocalePath } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/types";

function localeFromPath(pathname: string): Locale {
  return pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
}

function applyDocumentLocale(locale: Locale) {
  document.documentElement.lang = locale === "ar" ? "ar" : "en";
  document.documentElement.dir = "ltr";
  document.body.classList.toggle("locale-ar", locale === "ar");
  try {
    localStorage.setItem("softthrive-locale", locale);
  } catch {
    /* ignore */
  }
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pathLocale = localeFromPath(pathname);
  const [locale, setLocale] = useState<Locale>(pathLocale);

  useEffect(() => {
    setLocale(pathLocale);
  }, [pathLocale]);

  useEffect(() => {
    applyDocumentLocale(locale);
  }, [locale]);

  useEffect(() => {
    const onPopState = () => {
      setLocale(localeFromPath(window.location.pathname));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const switchLocale = useCallback(
    (target: Locale, sourcePath?: string) => {
      if (target === locale) return;

      const href = switchLocalePath(sourcePath ?? pathname, target);
      setLocale(target);
      applyDocumentLocale(target);
      window.history.replaceState(window.history.state, "", href);
    },
    [locale, pathname]
  );

  return (
    <LocaleProvider locale={locale} switchLocale={switchLocale}>
      {children}
    </LocaleProvider>
  );
}
