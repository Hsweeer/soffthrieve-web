"use client";

import { createContext, useContext, useCallback, useMemo } from "react";
import type { Locale, Dictionary } from "./types";
import { en } from "./en";
import { getDictionary } from "./dictionary";

type LocaleContextValue = {
  locale: Locale;
  dict: Dictionary;
  switchLocale: (target: Locale, pathname?: string) => void;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  dict: en,
  switchLocale: () => {}
});

export function LocaleProvider({
  locale,
  switchLocale,
  children
}: {
  locale: Locale;
  switchLocale: (target: Locale, pathname?: string) => void;
  children: React.ReactNode;
}) {
  const value = useMemo(
    () => ({ locale, dict: getDictionary(locale), switchLocale }),
    [locale, switchLocale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext).locale;
}

export function useDictionary(): LocaleContextValue {
  return useContext(LocaleContext);
}

export function useSwitchLocale() {
  return useContext(LocaleContext).switchLocale;
}
