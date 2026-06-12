"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";
import { Logo } from "./Logo";
import { LanguageToggle } from "./LanguageToggle";
import { parsePortfolioCategory, type PortfolioCategory } from "@/lib/portfolio";
import { localePath, useDictionary } from "@/lib/i18n";

const NAV_TABS: { id: PortfolioCategory; href: string }[] = [
  { id: "mobile", href: "/work?category=mobile" },
  { id: "web", href: "/work?category=web" },
  { id: "shopify", href: "/work?category=shopify" }
];

const MOBILE_MENU_LINKS = [
  { key: "mobileShopify" as const, href: "/services/shopify" },
  { key: "mobileAppsMenu" as const, href: "/services/mvp-development" },
  { key: "mobileWork" as const, href: "/work" },
  { key: "mobileAbout" as const, href: "/about" },
  { key: "mobileContact" as const, href: "/contact" }
];

export function Header() {
  const pathname = usePathname();
  const { dict, locale } = useDictionary();
  const searchParams = useSearchParams();
  const normalizedPath = pathname.replace(/^\/ar(?=\/|$)/, "") || "/";
  const isHome = normalizedPath === "/";
  const activeCategory =
    normalizedPath === "/work" || normalizedPath === "/work/"
      ? parsePortfolioCategory(searchParams.get("category"))
      : null;

  const navLabels: Record<PortfolioCategory, string> = {
    mobile: dict.header.mobileApps,
    web: dict.header.webApps,
    shopify: dict.header.shopifyStores
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(isHome);
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollY = useRef(0);

  const isDarkNav = overHero;
  const aboutActive = normalizedPath === "/about" || normalizedPath === "/about/";

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const onHomeHero = isHome && y < 680;

      setScrolled(y > 16);
      setOverHero(onHomeHero);

      if (Math.abs(y - lastScrollY.current) > 8) {
        if (y > lastScrollY.current && y > 120) {
          setNavHidden(true);
        } else {
          setNavHidden(false);
        }
        lastScrollY.current = y;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, isHome]);

  const portfolioTabClass = (active: boolean) =>
    clsx(
      "rounded-full px-4 py-2.5 text-sm font-bold transition duration-300",
      isDarkNav
        ? active
          ? "bg-white text-[#030508] shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
          : "text-white/78 hover:bg-white/10 hover:text-white"
        : active
          ? "bg-[#2090f0] text-white shadow-[0_10px_28px_rgba(32,144,240,0.28)]"
          : "text-slate-600 hover:bg-sky-50 hover:text-sky-700"
    );

  const aboutClass = clsx(
    "rounded-full px-5 py-2.5 text-sm font-bold transition duration-300",
    isDarkNav
      ? aboutActive
        ? "bg-white/15 text-white"
        : "border border-white/28 text-white hover:border-white/50 hover:bg-white/10"
      : aboutActive
        ? "bg-sky-100 text-sky-800"
        : "border border-sky-200 text-sky-700 hover:border-sky-400 hover:bg-sky-50"
  );

  return (
    <motion.header
      animate={{ y: navHidden ? "-110%" : 0 }}
      className={clsx(
        "site-header site-chrome-ltr sticky top-0 z-50 border-b transition-[background,border-color,box-shadow,backdrop-filter] duration-500",
        isDarkNav
          ? "border-transparent bg-transparent"
          : scrolled
            ? "site-header--glass border-sky-200/40"
            : "border-transparent bg-transparent"
      )}
      initial={false}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ height: scrolled ? 64 : 76 }}
        className="container-shell grid min-w-0 grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-4 lg:gap-8"
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Logo iconSize={scrolled ? 40 : 48} onDark={isDarkNav} showText={false} />

        <nav aria-label={dict.aria.portfolioCategories} className="hidden items-center justify-center gap-1 lg:flex">
          {NAV_TABS.map((tab) => (
            <Link
              className={portfolioTabClass(activeCategory === tab.id)}
              href={localePath(tab.href, locale)}
              key={tab.id}
            >
              {navLabels[tab.id]}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center justify-end gap-2 lg:flex">
          <LanguageToggle isDark={isDarkNav} />
          <Link className={aboutClass} href={localePath("/about", locale)}>
            {dict.header.about}
          </Link>
        </div>

        <div className="col-start-3 flex items-center justify-end gap-2 lg:hidden">
          <LanguageToggle isDark={isDarkNav} />
          <button
            aria-label={dict.aria.toggleMenu}
            className={clsx(
              "rounded-full border p-3 transition duration-300 lg:hidden",
              isDarkNav
                ? "border-white/25 bg-white/10 text-white hover:bg-white/15"
                : "border-sky-200 bg-white/80 text-sky-700 hover:bg-sky-50"
            )}
            onClick={() => setMobileOpen((open) => !open)}
            type="button"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {scrolled && !isDarkNav && (
          <motion.div
            animate={{ scaleX: 1, opacity: 1 }}
            className="h-px w-full origin-left bg-gradient-to-r from-transparent via-sky-400/45 to-transparent"
            exit={{ scaleX: 0, opacity: 0 }}
            initial={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.45 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className={clsx(
              "overflow-hidden border-t lg:hidden",
              isDarkNav ? "border-white/10 bg-[#030508]/95 backdrop-blur-xl" : "border-sky-100 bg-white/95 backdrop-blur-xl"
            )}
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <motion.nav
              animate="show"
              aria-label={dict.aria.toggleMenu}
              className="container-shell flex flex-col py-2"
              initial="hidden"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
            >
              {MOBILE_MENU_LINKS.map((item, index) => (
                <motion.div
                  key={item.key}
                  variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                >
                  {index > 0 ? (
                    <div
                      aria-hidden
                      className={clsx("mx-4 h-px", isDarkNav ? "bg-white/12" : "bg-sky-100")}
                    />
                  ) : null}
                  <Link
                    className={clsx(
                      "flex min-h-12 items-center px-4 py-3 text-base font-bold leading-none",
                      isDarkNav ? "text-white hover:bg-white/8" : "text-[#082f49] hover:bg-sky-50"
                    )}
                    href={localePath(item.href, locale)}
                    onClick={() => setMobileOpen(false)}
                  >
                    {dict.header[item.key]}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
