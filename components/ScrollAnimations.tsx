"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const INIT_ATTR = "data-scroll-init";

function showAllScrollReveals() {
  document.querySelectorAll<HTMLElement>(".scroll-reveal").forEach((el) => {
    el.removeAttribute(INIT_ATTR);
    gsap.set(el, { opacity: 1, y: 0, clearProps: "transform" });
  });
}

function initScrollAnimations() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    showAllScrollReveals();
    return undefined;
  }

  gsap.registerPlugin(ScrollTrigger);

  const pending = gsap.utils.toArray<HTMLElement>(`.scroll-reveal:not([${INIT_ATTR}])`);
  if (pending.length === 0) return undefined;

  const ctx = gsap.context(() => {
    pending.forEach((el) => {
      el.setAttribute(INIT_ATTR, "true");

      gsap.fromTo(
        el,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true
          }
        }
      );
    });

    gsap.utils.toArray<HTMLElement>(".float-parallax:not([data-parallax-init])").forEach((el) => {
      el.setAttribute("data-parallax-init", "true");
      gsap.to(el, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 2.2
        }
      });
    });
  });

  ScrollTrigger.refresh();
  return ctx;
}

function forceVisibleStuckElements() {
  document.querySelectorAll<HTMLElement>(".scroll-reveal").forEach((el) => {
    const opacity = window.getComputedStyle(el).opacity;
    if (parseFloat(opacity) < 0.05) {
      gsap.set(el, { opacity: 1, y: 0, clearProps: "transform" });
    }
  });
}

export function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    let ctx: gsap.Context | undefined;
    let frame = 0;
    let delayedTimer: ReturnType<typeof setTimeout> | undefined;
    let safetyTimer: ReturnType<typeof setTimeout> | undefined;

    const run = () => {
      ctx?.revert();
      ctx = initScrollAnimations() ?? ctx;
    };

    const scheduleRun = () => {
      frame = requestAnimationFrame(() => {
        requestAnimationFrame(run);
      });
      delayedTimer = setTimeout(run, 120);
    };

    scheduleRun();

    const main = document.querySelector("main");
    const observer = new MutationObserver(() => {
      const pending = document.querySelectorAll(`.scroll-reveal:not([${INIT_ATTR}])`);
      if (pending.length > 0) run();
    });

    if (main) {
      observer.observe(main, { childList: true, subtree: true });
    }

    safetyTimer = setTimeout(forceVisibleStuckElements, 700);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(delayedTimer);
      clearTimeout(safetyTimer);
      observer.disconnect();
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
