"use client";

import {
  Children,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { useDictionary } from "@/lib/i18n";
import { useMediaQuery } from "@/lib/use-media-query";

const AUTO_MS = 5000;
const MOBILE_MQ = "(max-width: 767px)";

function modulo(value: number, length: number) {
  return ((value % length) + length) % length;
}

function NavButton({
  label,
  onClick,
  children
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-700 shadow-[0_4px_16px_rgba(15,23,42,0.1)] transition hover:border-[#2090f0]/40 hover:text-[#2090f0] active:scale-95"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function CarouselDots({
  count,
  activeIndex,
  onSelect,
  label
}: {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  label: string;
}) {
  return (
    <div className="mt-4 flex justify-center md:hidden">
      <div
        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/95 px-2.5 py-2 shadow-sm"
        role="tablist"
      >
        {Array.from({ length: count }).map((_, index) => (
          <button
            aria-label={`${label} ${index + 1}`}
            aria-selected={index === activeIndex}
            className={clsx(
              "h-2 rounded-full transition-[width,background-color] duration-300",
              index === activeIndex ? "w-7 bg-[#2090f0]" : "w-2 bg-slate-300"
            )}
            key={`rr-dot-${index}`}
            onClick={() => onSelect(index)}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}

function MobileSnapTrack({
  slides,
  activeIndex,
  onIndexChange,
  onUserInteract
}: {
  slides: ReactNode[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
  onUserInteract: () => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const userScrollingRef = useRef(false);
  const scrollEndTimerRef = useRef<number | null>(null);

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const track = trackRef.current;
    const slide = slideRefs.current[index];
    if (!track || !slide) return;

    const left = slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2;
    track.scrollTo({ left, behavior });
  }, []);

  const measureClosest = useCallback(() => {
    const track = trackRef.current;
    if (!track || !slides.length) return 0;

    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(center - slideCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closest = index;
      }
    });

    return closest;
  }, [slides.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const settleScroll = () => {
      userScrollingRef.current = true;
      onUserInteract();
      const closest = measureClosest();
      onIndexChange(closest);
      window.setTimeout(() => {
        userScrollingRef.current = false;
      }, 120);
    };

    const onScroll = () => {
      if (scrollEndTimerRef.current) window.clearTimeout(scrollEndTimerRef.current);
      scrollEndTimerRef.current = window.setTimeout(settleScroll, 100);
    };

    const onTouchStart = () => {
      userScrollingRef.current = true;
      onUserInteract();
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("scrollend", settleScroll, { passive: true });
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("pointerdown", onTouchStart, { passive: true });

    return () => {
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("scrollend", settleScroll);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("pointerdown", onTouchStart);
      if (scrollEndTimerRef.current) window.clearTimeout(scrollEndTimerRef.current);
    };
  }, [measureClosest, onIndexChange, onUserInteract]);

  useEffect(() => {
    if (userScrollingRef.current) return;
    scrollToIndex(activeIndex, "smooth");
  }, [activeIndex, scrollToIndex]);

  return (
    <div className="relative mt-2 md:hidden">
      <div
        ref={trackRef}
        className="real-results-cards-track"
        data-lenis-prevent
        role="list"
        style={{ touchAction: "pan-x pan-y pinch-zoom", WebkitOverflowScrolling: "touch" }}
      >
        {slides.map((child, index) => (
          <div
            className="real-results-cards-slide shrink-0 snap-center"
            key={(child as { key?: string | number }).key ?? `rr-slide-${index}`}
            ref={(node) => {
              slideRefs.current[index] = node;
            }}
            role="listitem"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

type RealResultsCardsCarouselProps = {
  children: ReactNode;
};

export function RealResultsCardsCarousel({ children }: RealResultsCardsCarouselProps) {
  const { dict } = useDictionary();
  const pauseUntilRef = useRef(0);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useMediaQuery(MOBILE_MQ);

  const slides = useMemo(() => Children.toArray(children), [children]);
  const count = slides.length;
  const canNavigate = count > 1;
  const safeIndex = count > 0 ? modulo(activeIndex, count) : 0;

  const pauseAuto = useCallback((ms = AUTO_MS * 2) => {
    pauseUntilRef.current = Date.now() + ms;
  }, []);

  const goTo = useCallback(
    (index: number, options?: { pause?: boolean }) => {
      if (!count) return;
      const next = Math.max(0, Math.min(index, count - 1));
      activeIndexRef.current = next;
      setActiveIndex(next);
      if (options?.pause !== false) pauseAuto();
    },
    [count, pauseAuto]
  );

  const scrollByStep = useCallback(
    (direction: 1 | -1) => {
      goTo(safeIndex + direction);
    },
    [goTo, safeIndex]
  );

  useEffect(() => {
    if (!canNavigate || !isMobile) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const tick = window.setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return;
      if (activeIndexRef.current >= count - 1) return;
      goTo(activeIndexRef.current + 1, { pause: false });
    }, AUTO_MS);

    return () => window.clearInterval(tick);
  }, [canNavigate, goTo, isMobile]);

  return (
    <div aria-roledescription="carousel" className="real-results-carousel">
      {canNavigate && (
        <div className="mt-10 flex items-center justify-between gap-3 md:hidden">
          <p className="text-xs font-medium text-slate-500">{dict.home.realResults.scrollHint}</p>
          <div className="flex shrink-0 items-center gap-1.5">
            <NavButton label={dict.common.previousProduct} onClick={() => scrollByStep(-1)}>
              <ChevronLeft aria-hidden className="h-4 w-4" strokeWidth={2.25} />
            </NavButton>
            <NavButton label={dict.common.nextProduct} onClick={() => scrollByStep(1)}>
              <ChevronRight aria-hidden className="h-4 w-4" strokeWidth={2.25} />
            </NavButton>
          </div>
        </div>
      )}

      {isMobile ? (
        <MobileSnapTrack
          activeIndex={safeIndex}
          onIndexChange={(index) => {
            activeIndexRef.current = index;
            setActiveIndex(index);
          }}
          onUserInteract={pauseAuto}
          slides={slides}
        />
      ) : (
        <div className="real-results-cards-grid mt-14 grid grid-cols-3 gap-6" role="list">
          {slides.map((child) => child)}
        </div>
      )}

      {canNavigate && (
        <CarouselDots
          activeIndex={safeIndex}
          count={count}
          label={dict.home.realResults.title}
          onSelect={goTo}
        />
      )}
    </div>
  );
}
