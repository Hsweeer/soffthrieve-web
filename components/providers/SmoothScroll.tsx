"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const narrowViewport = window.matchMedia("(max-width: 1023px)").matches;
    // Native touch scrolling is smoother on phones — Lenis fights it and causes flicker.
    if (reduceMotion || coarsePointer || narrowViewport) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.12,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      prevent: (node) => {
        if (!(node instanceof Element)) return false;
        const scrollable = node.closest("[data-lenis-prevent]");
        if (!scrollable || !(scrollable instanceof HTMLElement)) return false;
        return scrollable.scrollWidth > scrollable.clientWidth + 4;
      }
    });

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return children;
}
