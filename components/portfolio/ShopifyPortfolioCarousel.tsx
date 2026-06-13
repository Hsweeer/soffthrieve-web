"use client";

import {
  Children,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { useDictionary } from "@/lib/i18n";
import { useMediaQuery } from "@/lib/use-media-query";

const DESKTOP_MQ = "(min-width: 768px)";
const AUTO_MS = 5500;
const TOUCH_RESUME_MS = 3000;
const SWIPE_THRESHOLD_PX = 52;
const SWIPE_VELOCITY = 0.4;

type ShopifyPortfolioCarouselProps = {
  children: ReactNode[];
  className?: string;
  showTopHint?: boolean;
};

function NavButton({
  label,
  onClick,
  children,
  className
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      aria-label={label}
      className={clsx(
        "flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/90 bg-white/95 text-slate-700 shadow-[0_4px_16px_rgba(15,23,42,0.1)] transition hover:border-[#2090f0]/40 hover:text-[#2090f0] active:scale-95 sm:h-11 sm:w-11",
        className
      )}
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
    <div className="mt-3 flex justify-center pb-1 sm:mt-5">
      <div
        className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-2.5 py-2 shadow-[0_8px_24px_rgba(15,23,42,0.08)] sm:gap-2 sm:px-3"
        role="tablist"
      >
        {Array.from({ length: count }).map((_, index) => (
          <button
            aria-label={`${label} ${index + 1}`}
            aria-selected={index === activeIndex}
            className={clsx(
              "h-2 rounded-full transition-[width,background-color] duration-300 ease-out",
              index === activeIndex ? "w-7 bg-[#18b8a8]" : "w-2 bg-slate-300"
            )}
            key={`carousel-dot-${index}`}
            onClick={() => onSelect(index)}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}

function MobileSnapCarousel({
  slides,
  activeIndex,
  onIndexChange,
  onTouchHold,
  onTouchRelease
}: {
  slides: ReactNode[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
  onTouchHold: () => void;
  onTouchRelease: () => void;
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
      const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - center);
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
      onIndexChange(measureClosest());
      window.setTimeout(() => {
        userScrollingRef.current = false;
      }, 80);
    };
    const onScroll = () => {
      if (scrollEndTimerRef.current) window.clearTimeout(scrollEndTimerRef.current);
      scrollEndTimerRef.current = window.setTimeout(settleScroll, 100);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("scrollend", settleScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("scrollend", settleScroll);
      if (scrollEndTimerRef.current) window.clearTimeout(scrollEndTimerRef.current);
    };
  }, [measureClosest, onIndexChange]);

  useEffect(() => {
    if (userScrollingRef.current) return;
    scrollToIndex(activeIndex, "auto");
  }, [activeIndex, scrollToIndex]);

  return (
    <div className="relative md:hidden">
      <div
        ref={trackRef}
        className="shopify-portfolio-snap-track flex items-stretch gap-3 overflow-x-auto overflow-y-visible py-3"
        data-lenis-prevent
        role="list"
        style={{ touchAction: "pan-x pan-y pinch-zoom", WebkitOverflowScrolling: "touch" }}
      >
        {slides.map((child, index) => (
          <div
            className={clsx(
              "shopify-portfolio-snap-slide shrink-0 snap-center",
              index === activeIndex && "is-active"
            )}
            key={(child as { key?: string | number }).key ?? `m-slide-${index}`}
            onPointerDown={onTouchHold}
            onPointerUp={onTouchRelease}
            onPointerCancel={onTouchRelease}
            onTouchEnd={onTouchRelease}
            onTouchStart={onTouchHold}
            ref={(node) => {
              slideRefs.current[index] = node;
            }}
            role="listitem"
            style={{ width: "min(82vw, 320px)" }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

function getSlideTransform(visualDelta: number, orbitRadiusX: number): CSSProperties {
  const absDelta = Math.abs(visualDelta);
  if (absDelta > 3.2) {
    return { opacity: 0, pointerEvents: "none", visibility: "hidden" };
  }

  const angle = visualDelta * 38;
  const x = Math.sin((angle * Math.PI) / 180) * orbitRadiusX;
  const depth = Math.cos((angle * Math.PI) / 180);
  const z = Math.round(depth * 140);
  const y = absDelta === 0 ? 0 : absDelta === 1 ? 12 : absDelta === 2 ? 28 : 44;
  const scale = absDelta === 0 ? 1 : absDelta === 1 ? 0.9 : absDelta === 2 ? 0.78 : 0.64;
  const opacity = absDelta === 0 ? 1 : absDelta === 1 ? 0.88 : absDelta === 2 ? 0.5 : 0.22;

  return {
    opacity,
    visibility: "visible" as const,
    pointerEvents: (absDelta < 1.2 ? "auto" : "none") as CSSProperties["pointerEvents"],
    zIndex: absDelta < 0.35 ? 30 : absDelta < 1.2 ? 20 : 10,
    transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px) scale(${scale}) rotateY(${-angle}deg)`,
    transition: "transform 0.48s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.38s ease"
  };
}

function applyTransformToNode(node: HTMLDivElement, style: CSSProperties) {
  node.style.opacity = String(style.opacity ?? 1);
  node.style.visibility = (style.visibility as string) ?? "visible";
  node.style.pointerEvents = (style.pointerEvents as string) ?? "auto";
  node.style.zIndex = String(style.zIndex ?? 10);
  node.style.transform = (style.transform as string) ?? "";
  if (style.transition) node.style.transition = style.transition as string;
}

function DesktopCoverflow({
  slides,
  safeIndex,
  canNavigate,
  goTo,
  scrollByStep,
  dict,
  isVisible
}: {
  slides: ReactNode[];
  safeIndex: number;
  canNavigate: boolean;
  goTo: (index: number) => void;
  scrollByStep: (direction: 1 | -1) => void;
  dict: ReturnType<typeof useDictionary>["dict"];
  isVisible: boolean;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const pointerIdRef = useRef<number | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartTimeRef = useRef(0);
  const dragDeltaRef = useRef(0);
  const didDragRef = useRef(false);
  const dragProgressRef = useRef(0);
  const slideNodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const orbitRadiusRef = useRef(320);
  const count = slides.length;

  const applySlideTransforms = useCallback(
    (index: number, dragProgress: number) => {
      if (!isVisible) return;
      slides.forEach((_, slideIndex) => {
        const node = slideNodesRef.current[slideIndex];
        if (!node) return;
        const delta = getCircularDistance(slideIndex, index, count) - dragProgress;
        applyTransformToNode(node, getSlideTransform(delta, orbitRadiusRef.current));
      });
    },
    [count, isVisible, slides]
  );

  const finishDrag = useCallback(
    (target: HTMLDivElement | null) => {
      if (pointerIdRef.current !== null && target?.hasPointerCapture(pointerIdRef.current)) {
        target.releasePointerCapture(pointerIdRef.current);
      }
      pointerIdRef.current = null;
      const delta = dragDeltaRef.current;
      dragDeltaRef.current = 0;
      dragProgressRef.current = 0;
      const elapsed = Math.max(performance.now() - dragStartTimeRef.current, 1);
      const velocity = Math.abs(delta) / elapsed;
      if ((Math.abs(delta) >= SWIPE_THRESHOLD_PX || velocity > SWIPE_VELOCITY) && canNavigate) {
        goTo(safeIndex + (delta < 0 ? 1 : -1));
      } else {
        applySlideTransforms(safeIndex, 0);
      }
    },
    [applySlideTransforms, canNavigate, goTo, safeIndex]
  );

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!canNavigate || event.button !== 0) return;
      didDragRef.current = false;
      pointerIdRef.current = event.pointerId;
      dragStartXRef.current = event.clientX;
      dragStartTimeRef.current = performance.now();
      dragDeltaRef.current = 0;
      event.currentTarget.setPointerCapture(event.pointerId);
      slides.forEach((_, i) => {
        const node = slideNodesRef.current[i];
        if (node) node.style.transition = "none";
      });
    },
    [canNavigate, slides]
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (pointerIdRef.current !== event.pointerId) return;
      const delta = event.clientX - dragStartXRef.current;
      dragDeltaRef.current = delta;
      if (Math.abs(delta) > 8) didDragRef.current = true;
      const stageWidth = stageRef.current?.clientWidth ?? 1024;
      const progress = clamp(delta / Math.max(stageWidth * 0.4, 160), -1, 1);
      dragProgressRef.current = progress;
      applySlideTransforms(safeIndex, progress);
    },
    [applySlideTransforms, safeIndex]
  );

  useLayoutEffect(() => {
    if (!isVisible) return;
    applySlideTransforms(safeIndex, dragProgressRef.current);
  }, [applySlideTransforms, safeIndex, isVisible]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const update = () => {
      const next = clamp(stage.clientWidth * 0.44, 220, 430);
      if (Math.abs(next - orbitRadiusRef.current) < 2) return;
      orbitRadiusRef.current = next;
      applySlideTransforms(safeIndex, dragProgressRef.current);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [applySlideTransforms, safeIndex]);

  return (
    <div className="relative hidden md:block">
      <div
        ref={stageRef}
        className="shopify-portfolio-carousel-stage relative h-[640px] overflow-hidden select-none lg:h-[720px]"
        onPointerCancel={(event) => finishDrag(event.currentTarget)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(event) => finishDrag(event.currentTarget)}
        style={{ touchAction: "pan-y" }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-[42%] z-[1] mx-auto h-56 w-[88%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.16)_0%,transparent_72%)] blur-xl" />

        <div
          className="relative mx-auto h-full w-full [perspective:1200px] [transform-style:preserve-3d]"
          role="list"
        >
          {slides.map((child, index) => (
            <div
              className="absolute left-1/2 top-[48%] w-[320px] lg:w-[360px]"
              key={(child as { key?: string | number }).key ?? `d-slide-${index}`}
              onClick={() => {
                if (didDragRef.current) return;
                goTo(index);
              }}
              ref={(node) => {
                slideNodesRef.current[index] = node;
              }}
              role="listitem"
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {canNavigate && (
        <>
          <NavButton
            className="absolute top-[42%] left-2 z-20 -translate-y-1/2"
            label={dict.common.previousProduct}
            onClick={() => scrollByStep(-1)}
          >
            <ChevronLeft aria-hidden className="h-5 w-5" strokeWidth={2.25} />
          </NavButton>
          <NavButton
            className="absolute top-[42%] right-2 z-20 -translate-y-1/2"
            label={dict.common.nextProduct}
            onClick={() => scrollByStep(1)}
          >
            <ChevronRight aria-hidden className="h-5 w-5" strokeWidth={2.25} />
          </NavButton>
        </>
      )}
    </div>
  );
}

export function ShopifyPortfolioCarousel({
  children,
  className,
  showTopHint = true
}: ShopifyPortfolioCarouselProps) {
  const { dict } = useDictionary();
  const isDesktop = useMediaQuery(DESKTOP_MQ);
  const shellRef = useRef<HTMLDivElement>(null);
  const pauseUntilRef = useRef(0);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const slides = useMemo(() => Children.toArray(children), [children]);
  const count = slides.length;
  const canNavigate = count > 1;
  const safeIndex = count > 0 ? Math.max(0, Math.min(activeIndex, count - 1)) : 0;

  const pauseAuto = useCallback((ms = AUTO_MS * 1.5) => {
    pauseUntilRef.current = Date.now() + ms;
  }, []);

  const holdAuto = useCallback(() => {
    pauseUntilRef.current = Number.MAX_SAFE_INTEGER;
  }, []);

  const releaseAutoAfterTouch = useCallback(() => {
    pauseUntilRef.current = Date.now() + TOUCH_RESUME_MS;
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
    const shell = shellRef.current;
    if (!shell) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "80px 0px", threshold: 0.05 }
    );
    observer.observe(shell);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const pauseWhileScrolling = () => {
      pauseUntilRef.current = Date.now() + 1200;
    };
    window.addEventListener("scroll", pauseWhileScrolling, { passive: true });
    return () => window.removeEventListener("scroll", pauseWhileScrolling);
  }, []);

  useEffect(() => {
    if (!canNavigate || !isVisible) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const tick = window.setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return;
      if (activeIndexRef.current >= count - 1) return;
      goTo(activeIndexRef.current + 1, { pause: false });
    }, AUTO_MS);
    return () => window.clearInterval(tick);
  }, [canNavigate, count, goTo, isVisible]);

  return (
    <div
      ref={shellRef}
      aria-label={dict.home.shopifySectionTitle}
      aria-roledescription="carousel"
      className={clsx("shopify-portfolio-carousel-shell relative", className)}
    >
      {canNavigate && showTopHint && (
        <div className="mb-2 flex items-start justify-between gap-2 sm:mb-5">
          <p className="max-w-[58%] text-[10px] font-semibold leading-snug text-slate-500 sm:max-w-none sm:text-sm">
            {dict.home.shopifyCarouselHint}
          </p>
          <div className="flex shrink-0 items-center gap-1.5 md:hidden">
            <NavButton label={dict.common.previousProduct} onClick={() => scrollByStep(-1)}>
              <ChevronLeft aria-hidden className="h-5 w-5" strokeWidth={2.25} />
            </NavButton>
            <NavButton label={dict.common.nextProduct} onClick={() => scrollByStep(1)}>
              <ChevronRight aria-hidden className="h-5 w-5" strokeWidth={2.25} />
            </NavButton>
          </div>
        </div>
      )}

      <div className="shopify-portfolio-carousel-viewport relative">
        {isDesktop ? (
          <DesktopCoverflow
            canNavigate={canNavigate}
            dict={dict}
            goTo={goTo}
            isVisible={isVisible}
            safeIndex={safeIndex}
            scrollByStep={scrollByStep}
            slides={slides}
          />
        ) : (
          <MobileSnapCarousel
            activeIndex={safeIndex}
            onIndexChange={(index) => {
              activeIndexRef.current = index;
              setActiveIndex(index);
              pauseAuto();
            }}
            onTouchHold={holdAuto}
            onTouchRelease={releaseAutoAfterTouch}
            slides={slides}
          />
        )}
      </div>

      {canNavigate && (
        <CarouselDots
          activeIndex={safeIndex}
          count={count}
          label={dict.common.nextProduct}
          onSelect={goTo}
        />
      )}
    </div>
  );
}

function getCircularDistance(index: number, activeIndex: number, count: number) {
  if (count <= 1) return 0;
  const direct = index - activeIndex;
  const wrapped = direct > 0 ? direct - count : direct + count;
  return Math.abs(direct) <= Math.abs(wrapped) ? direct : wrapped;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
