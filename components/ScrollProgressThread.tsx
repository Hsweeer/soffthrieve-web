"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";

/**
 * Scroll progress thread — buttery line + comet synced to scroll.
 * Fixed overlay, fractional path sampling, GPU comet layer, no SVG filters.
 */

const SAMPLES_DESKTOP = 1600;
const SAMPLES_MOBILE = 960;
/** Viewport lead — comet sits this far below the top edge while scrolling. */
const COMET_LEAD_RATIO = 0.22;
/** Snappy lerp kills 1–2px scroll steps without feeling delayed. */
const SCROLL_LERP = 0.92;

type Sample = { x: number; y: number };

type ThreadProfile = {
  compact: boolean;
  samples: number;
  edgeInset: number;
  edgePct: number;
  cometRx: number;
  cometRy: number;
  cometDotR: number;
};

function threadProfile(vw: number): ThreadProfile {
  const compact = vw < 768;
  return {
    compact,
    samples: compact ? SAMPLES_MOBILE : SAMPLES_DESKTOP,
    edgeInset: compact ? 14 : 28,
    edgePct: compact ? 0.055 : 0.045,
    cometRx: compact ? 9 : 12,
    cometRy: compact ? 9 : 12,
    cometDotR: compact ? 2 : 2.25,
  };
}

function getScrollY() {
  return window.scrollY || document.documentElement.scrollTop || 0;
}

function buildAnchors(docH: number, vw: number, profile: ThreadProfile): Sample[] {
  const main = document.querySelector("main");
  const blocks: HTMLElement[] = [];
  if (main) {
    main.querySelectorAll<HTMLElement>(":scope > *").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.height > 120) blocks.push(el);
    });
  }

  const leftX = Math.max(profile.edgeInset, vw * profile.edgePct);
  const rightX = Math.min(vw - profile.edgeInset, vw * (1 - profile.edgePct));
  const headerOffset = 76;
  const anchors: Sample[] = [{ x: rightX, y: headerOffset }];

  if (blocks.length >= 2) {
    let side = 0;
    blocks.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const top = rect.top + getScrollY();
      const h = rect.height;
      const ys = h > window.innerHeight * 1.4 ? [top + h * 0.25, top + h * 0.78] : [top + h * 0.5];
      ys.forEach((y) => {
        anchors.push({ x: side === 0 ? leftX : rightX, y });
        side = 1 - side;
      });
    });
  } else {
    const step = window.innerHeight * 0.9;
    let side = 0;
    for (let y = step; y < docH - step * 0.5; y += step) {
      anchors.push({ x: side === 0 ? leftX : rightX, y });
      side = 1 - side;
    }
  }

  anchors.push({ x: vw * 0.5, y: docH - 24 });
  for (let i = 1; i < anchors.length; i++) {
    if (anchors[i].y <= anchors[i - 1].y + 40) anchors[i].y = anchors[i - 1].y + 41;
  }
  return anchors;
}

function catmullRomPath(pts: Sample[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

function pointOnSamples(samples: Float32Array, sampleCount: number, t: number) {
  const clamped = Math.min(1, Math.max(0, t));
  const f = clamped * sampleCount;
  const i0 = Math.min(sampleCount - 1, Math.floor(f));
  const i1 = Math.min(sampleCount, i0 + 1);
  const blend = f - i0;
  const x0 = samples[i0 * 2];
  const y0 = samples[i0 * 2 + 1];
  const x1 = samples[i1 * 2];
  const y1 = samples[i1 * 2 + 1];
  return {
    x: x0 + (x1 - x0) * blend,
    y: y0 + (y1 - y0) * blend,
  };
}

function tangentAngle(samples: Float32Array, sampleCount: number, t: number) {
  const a = pointOnSamples(samples, sampleCount, Math.max(0, t - 0.003));
  const b = pointOnSamples(samples, sampleCount, Math.min(1, t + 0.003));
  return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
}

/** Sub-pixel path progress from scroll — comet stays in view, no index jumps. */
function progressForScroll(sampleYs: Float32Array, sampleCount: number, scrollY: number) {
  const targetY = scrollY + window.innerHeight * COMET_LEAD_RATIO;
  let lo = 0;
  let hi = sampleCount;

  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (sampleYs[mid] < targetY) lo = mid + 1;
    else hi = mid;
  }

  if (lo <= 0) return 0;
  if (lo >= sampleCount) return 1;

  const y0 = sampleYs[lo - 1];
  const y1 = sampleYs[lo];
  const span = y1 - y0;
  const frac = span > 0.001 ? (targetY - y0) / span : 0;
  const t0 = (lo - 1) / sampleCount;
  const t1 = lo / sampleCount;
  return t0 + (t1 - t0) * Math.min(1, Math.max(0, frac));
}

function ThreadLayer({
  hostRef,
  barRef,
  cometRef,
}: {
  hostRef: React.RefObject<HTMLDivElement | null>;
  barRef: React.RefObject<HTMLDivElement | null>;
  cometRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <>
      <div aria-hidden className="thread-topbar">
        <div ref={barRef} className="thread-topbar-fill" />
      </div>
      <div aria-hidden className="thread-host" ref={hostRef}>
        <div className="thread-comet-head" ref={cometRef}>
          <span className="thread-comet-halo" aria-hidden />
          <span className="thread-comet-dot" aria-hidden />
        </div>
      </div>
    </>
  );
}

export function ScrollProgressThread() {
  const pathname = usePathname();
  const hostRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const cometRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const host = hostRef.current;
    const bar = barRef.current;
    const comet = cometRef.current;
    if (!host || !bar || !comet) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let svg: SVGSVGElement | null = null;
    let progressPath: SVGPathElement | null = null;
    let trailPath: SVGPathElement | null = null;
    let totalLen = 0;
    let tailLen = 0;
    let samples: Float32Array | null = null;
    let sampleYs: Float32Array | null = null;
    let sampleCount = SAMPLES_DESKTOP;
    let lastRebuildWidth = 0;
    let docHeight = 0;
    let destroyed = false;
    let rafId = 0;
    let smoothScroll = getScrollY();
    let smoothTopT = 0;
    let smoothThreadT = 0;

    const scrollProgress = (scrollY: number) => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    };

    const buildThread = () => {
      host.querySelector(".thread-svg")?.remove();
      svg = null;
      if (reduceMotion) return;

      const vw = window.innerWidth;
      const profile = threadProfile(vw);
      sampleCount = profile.samples;
      lastRebuildWidth = vw;

      docHeight = document.documentElement.scrollHeight;
      host.classList.toggle("thread-host--compact", profile.compact);
      comet.classList.toggle("thread-comet-head--compact", profile.compact);

      const d = catmullRomPath(buildAnchors(docHeight, vw, profile));
      if (!d) return;

      const NS = "http://www.w3.org/2000/svg";
      svg = document.createElementNS(NS, "svg");
      svg.setAttribute("width", String(vw));
      svg.setAttribute("height", String(docHeight));
      svg.setAttribute("viewBox", `0 0 ${vw} ${docHeight}`);
      svg.classList.add("thread-svg");

      svg.innerHTML = `
        <defs>
          <linearGradient id="threadGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#7dd3fc"/>
            <stop offset="45%" stop-color="#52a6f3"/>
            <stop offset="100%" stop-color="#2090f0"/>
          </linearGradient>
        </defs>
        <path class="thread-track" d="${d}"/>
        <path class="thread-progress" d="${d}"/>
        <path class="thread-trail" d="${d}"/>
      `;
      host.insertBefore(svg, comet);

      progressPath = svg.querySelector(".thread-progress");
      trailPath = svg.querySelector(".thread-trail");
      const track = svg.querySelector<SVGPathElement>(".thread-track");
      if (!progressPath || !trailPath || !track) return;

      totalLen = progressPath.getTotalLength();
      tailLen = Math.min(180, totalLen * 0.04);
      progressPath.style.strokeDasharray = `${totalLen}`;
      trailPath.style.strokeDasharray = `${tailLen} ${totalLen}`;

      samples = new Float32Array((sampleCount + 1) * 2);
      sampleYs = new Float32Array(sampleCount + 1);
      for (let i = 0; i <= sampleCount; i++) {
        const p = track.getPointAtLength((i / sampleCount) * totalLen);
        samples[i * 2] = p.x;
        samples[i * 2 + 1] = p.y;
        sampleYs[i] = p.y;
      }

      smoothScroll = getScrollY();
      smoothTopT = scrollProgress(smoothScroll);
      smoothThreadT =
        sampleYs.length > 1 ? progressForScroll(sampleYs, sampleCount, smoothScroll) : smoothTopT;
      paintFrame(true);
    };

    const paintFrame = (snap = false) => {
      if (destroyed) return;

      const rawScroll = getScrollY();
      if (snap) {
        smoothScroll = rawScroll;
      } else {
        smoothScroll += (rawScroll - smoothScroll) * SCROLL_LERP;
        if (Math.abs(rawScroll - smoothScroll) < 0.05) smoothScroll = rawScroll;
      }

      const targetTopT = scrollProgress(smoothScroll);
      const targetThreadT =
        sampleYs && sampleCount > 0
          ? progressForScroll(sampleYs, sampleCount, smoothScroll)
          : targetTopT;

      if (snap) {
        smoothTopT = targetTopT;
        smoothThreadT = targetThreadT;
      } else {
        smoothTopT += (targetTopT - smoothTopT) * SCROLL_LERP;
        smoothThreadT += (targetThreadT - smoothThreadT) * SCROLL_LERP;
      }

      bar.style.transform = `scale3d(${smoothTopT}, 1, 1)`;

      if (svg) {
        svg.style.transform = `translate3d(0, ${-smoothScroll}px, 0)`;
      }

      if (!progressPath || !trailPath || !samples || totalLen <= 0) return;

      const drawn = smoothThreadT * totalLen;
      const offset = totalLen - drawn;
      progressPath.style.strokeDashoffset = `${offset}`;
      trailPath.style.strokeDashoffset = `${offset + tailLen}`;

      const { x: hx, y: hy } = pointOnSamples(samples, sampleCount, smoothThreadT);
      const angleDeg = tangentAngle(samples, sampleCount, smoothThreadT);
      const viewY = hy - smoothScroll;
      comet.style.transform = `translate3d(${hx}px, ${viewY}px, 0) rotate(${angleDeg}deg)`;
    };

    const frameLoop = () => {
      rafId = requestAnimationFrame(frameLoop);
      if (document.hidden) return;
      paintFrame(false);
    };

    let rebuildTimer: ReturnType<typeof setTimeout> | undefined;
    const scheduleRebuild = (force = false) => {
      clearTimeout(rebuildTimer);
      rebuildTimer = setTimeout(() => {
        const w = window.innerWidth;
        const h = document.documentElement.scrollHeight;
        if (!force && svg && Math.abs(w - lastRebuildWidth) < 12 && Math.abs(h - docHeight) < 24) return;
        buildThread();
      }, force ? 0 : 320);
    };

    const onResize = () => scheduleRebuild(false);
    const onOrientation = () => scheduleRebuild(true);

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onOrientation);

    let mainObserver: ResizeObserver | undefined;
    const main = document.querySelector("main");
    if (main && typeof ResizeObserver !== "undefined") {
      mainObserver = new ResizeObserver(() => scheduleRebuild(false));
      mainObserver.observe(main);
    }

    rafId = requestAnimationFrame(frameLoop);
    const initTimer = setTimeout(() => scheduleRebuild(true), 400);

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onOrientation);
      mainObserver?.disconnect();
      clearTimeout(rebuildTimer);
      clearTimeout(initTimer);
      host.querySelector(".thread-svg")?.remove();
    };
  }, [pathname, mounted]);

  if (!mounted) return null;

  return createPortal(
    <ThreadLayer barRef={barRef} cometRef={cometRef} hostRef={hostRef} />,
    document.body
  );
}
