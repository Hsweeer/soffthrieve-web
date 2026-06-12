"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue
} from "motion/react";
import { ArrowUpRight, Globe, Smartphone, Store, type LucideIcon } from "lucide-react";
import { getWorkflowTabs, localePath, useDictionary } from "@/lib/i18n";
import type { WorkflowTab, WorkflowTabId } from "@/lib/workflow-tabs";
import { brandCtaGradient, brandCtaShadow, brandCtaShell, brandCtaTextGradient } from "@/lib/brand-cta";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const TAB_META: Record<WorkflowTabId, { icon: LucideIcon }> = {
  mobile: { icon: Smartphone },
  web: { icon: Globe },
  shopify: { icon: Store }
};

function ProcessTimeline({
  steps,
  tabId,
  activeIndex,
  progressWidth,
  reducedMotion
}: {
  steps: WorkflowTab["steps"];
  tabId: WorkflowTabId;
  activeIndex: number;
  progressWidth: MotionValue<string>;
  reducedMotion: boolean;
}) {
  const cols = steps.length;

  return (
    <div className="relative pb-1">
      <div className="absolute top-5 right-0 left-0 h-0.5 rounded-full bg-slate-200/90" />
      <motion.div
        className="absolute top-5 left-0 h-0.5 origin-left rounded-full bg-gradient-to-r from-[#52a6f3] via-[#2090f0] to-[#1878c9]"
        style={{ width: progressWidth, boxShadow: "0 0 12px rgba(32,144,240,0.35)" }}
      />

      <div className="relative grid" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isReached = index <= activeIndex;
          const isCurrent = index === activeIndex;

          return (
            <div className="flex flex-col items-center" key={`${tabId}-node-${step.id}`}>
              <motion.div
                animate={{
                  scale: isCurrent ? 1.08 : 1,
                  borderColor: isCurrent ? "#2090f0" : isReached ? "#2090f0" : "#e2e8f0",
                  backgroundColor: isCurrent ? "#2090f0" : isReached ? "#eff7fe" : "#ffffff"
                }}
                className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white shadow-[0_4px_14px_rgba(32,144,240,0.12)]"
                transition={{ duration: reducedMotion ? 0 : 0.35, ease }}
              >
                <Icon
                  className="h-4 w-4"
                  strokeWidth={2}
                  style={{ color: isCurrent ? "#ffffff" : isReached ? "#2090f0" : "#94a3b8" }}
                />
              </motion.div>
              <span
                aria-hidden
                className={cn(
                  "mt-2.5 block w-px min-h-[22px] rounded-full transition-colors duration-300",
                  isReached ? "bg-[#2090f0]/35" : "bg-slate-200"
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StepCell({
  step,
  index,
  learnMore,
  href,
  isActive,
  isHovered,
  onHover
}: {
  step: WorkflowTab["steps"][number];
  index: number;
  learnMore: string;
  href?: string;
  isActive: boolean;
  isHovered: boolean;
  onHover: (index: number | null) => void;
}) {
  const Icon = step.icon;
  const highlighted = isHovered || isActive;

  const inner = (
    <>
      <AnimatePresence>
        {isHovered ? (
          <motion.span
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-white"
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
            initial={{ opacity: 0 }}
            layoutId="workflow-step-bg"
            transition={{ duration: 0.15 }}
          />
        ) : null}
      </AnimatePresence>

      <div
        className={cn(
          "relative z-10 transition-shadow duration-300",
          highlighted && !isHovered && "ring-1 ring-[#2090f0]/20 rounded-lg"
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              "font-mono text-[11px] font-medium tabular-nums transition-colors",
              highlighted ? "text-[#2090f0]" : "text-slate-400"
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
              highlighted ? "bg-[#2090f0] text-white" : "bg-[#eff7fe] text-[#2090f0]"
            )}
          >
            <Icon className="h-4 w-4" strokeWidth={2} />
          </span>
        </div>
        <p className="mt-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2090f0]">{step.tag}</p>
        <h3 className="mt-1.5 text-[15px] font-semibold leading-snug text-[#0a1b33]">{step.title}</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[#64748b]">{step.text}</p>
        {href ? (
          <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-[#2090f0] opacity-80 transition group-hover:opacity-100">
            {learnMore}
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </span>
        ) : null}
      </div>
    </>
  );

  const className = "group relative block h-full px-4 py-5 transition-colors md:px-5 md:py-5";

  if (href) {
    return (
      <Link
        className={className}
        href={href}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={() => onHover(null)}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div className={className} onMouseEnter={() => onHover(index)} onMouseLeave={() => onHover(null)}>
      {inner}
    </div>
  );
}

function MobileWorkflow({
  steps,
  activeIndex,
  onSelect,
  learnMore,
  locale,
  tabId,
  reducedMotion
}: {
  steps: WorkflowTab["steps"];
  activeIndex: number;
  onSelect: (index: number) => void;
  learnMore: string;
  locale: ReturnType<typeof useDictionary>["locale"];
  tabId: WorkflowTabId;
  reducedMotion: boolean;
}) {
  const step = steps[activeIndex];
  const Icon = step.icon;
  const lastIndex = Math.max(0, steps.length - 1);
  const href = step.href ? localePath(step.href, locale) : undefined;

  return (
    <div className="border-t border-slate-100 bg-[#f8fafc] p-4 md:hidden">
      <div className="mb-3 flex gap-1" role="tablist" aria-label="Process stages">
        {steps.map((s, index) => (
          <button
            aria-label={`${s.tag}: ${s.title}`}
            aria-selected={index === activeIndex}
            className="h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-200"
            key={`${tabId}-bar-${s.id}`}
            onClick={() => onSelect(index)}
            type="button"
          >
            <motion.span
              animate={{ scaleX: index <= activeIndex ? 1 : 0 }}
              className="block h-full origin-left rounded-full bg-[#2090f0]"
              initial={false}
              transition={{ duration: reducedMotion ? 0 : 0.3, ease }}
            />
          </button>
        ))}
      </div>

      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {steps.map((s, index) => {
          const StepIcon = s.icon;
          const selected = index === activeIndex;

          return (
            <button
              className={cn(
                "flex shrink-0 snap-start items-center gap-2 rounded-full border px-3 py-2 text-left transition-colors",
                selected
                  ? "border-[#2090f0] bg-[#2090f0] text-white shadow-[0_4px_14px_rgba(32,144,240,0.28)]"
                  : "border-slate-200/90 bg-white text-[#0a1b33]/80"
              )}
              key={`${tabId}-chip-${s.id}`}
              onClick={() => onSelect(index)}
              type="button"
            >
              <StepIcon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
              <span className="text-[11px] font-semibold uppercase tracking-wide">{s.tag}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm"
          exit={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
          initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
          key={`${tabId}-mobile-${step.id}`}
          transition={{ duration: reducedMotion ? 0.1 : 0.28, ease }}
        >
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eff7fe] text-[#2090f0]">
              <Icon className="h-5 w-5" strokeWidth={2} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2090f0]">{step.tag}</p>
                <span className="font-mono text-[10px] text-slate-400">
                  {String(activeIndex + 1).padStart(2, "0")}/{String(steps.length).padStart(2, "0")}
                </span>
              </div>
              <h4 className="mt-1 text-[16px] font-semibold leading-snug text-[#0a1b33]">{step.title}</h4>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#64748b]">{step.text}</p>
              {href ? (
                <Link className="mt-2.5 inline-flex items-center gap-1 text-[12px] font-semibold text-[#2090f0]" href={href}>
                  {learnMore} →
                </Link>
              ) : null}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
            <button
              className="text-xs font-medium text-slate-500 disabled:opacity-30"
              disabled={activeIndex === 0}
              onClick={() => onSelect(activeIndex - 1)}
              type="button"
            >
              ← Previous
            </button>
            <button
              className="text-xs font-medium text-[#2090f0] disabled:opacity-30"
              disabled={activeIndex === lastIndex}
              onClick={() => onSelect(activeIndex + 1)}
              type="button"
            >
              Next →
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function WorkflowPanel({
  tabId,
  tabs,
  learnMore,
  viewCategoryLabel,
  locale,
  reducedMotion
}: {
  tabId: WorkflowTabId;
  tabs: ReturnType<typeof getWorkflowTabs>;
  learnMore: string;
  viewCategoryLabel: string;
  locale: ReturnType<typeof useDictionary>["locale"];
  reducedMotion: boolean;
}) {
  const tab = tabs.find((t) => t.id === tabId)!;
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [scrollStep, setScrollStep] = useState(0);
  const [mobileStep, setMobileStep] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const hoverLock = useRef(false);
  const scrollStepRef = useRef(0);
  const cols = tab.steps.length;
  const lastIndex = Math.max(0, cols - 1);

  const progressTarget = useMotionValue(0);
  const smoothProgress = useSpring(progressTarget, { stiffness: 100, damping: 24, mass: 0.3 });
  const progressWidth = useTransform(smoothProgress, (v) => `${Math.min(100, Math.max(0, v))}%`);

  const applyStep = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(lastIndex, index));
      scrollStepRef.current = clamped;
      setScrollStep(clamped);
      progressTarget.set(lastIndex > 0 ? (clamped / lastIndex) * 100 : 100);
    },
    [lastIndex, progressTarget]
  );

  useEffect(() => {
    setMobileStep(0);
    applyStep(0);
    setHoveredStep(null);
    hoverLock.current = false;
  }, [tabId, applyStep]);

  useEffect(() => {
    stepRefs.current = [];

    if (reducedMotion) {
      applyStep(lastIndex);
      return;
    }

    if (typeof window === "undefined" || window.matchMedia("(max-width: 767px)").matches) {
      return;
    }

    let observer: IntersectionObserver | undefined;
    const frame = requestAnimationFrame(() => {
      const nodes = stepRefs.current.filter(Boolean) as HTMLElement[];
      if (!nodes.length) return;

      const visibility = new Map<number, number>();

      observer = new IntersectionObserver(
        (entries) => {
          if (hoverLock.current) return;

          entries.forEach((entry) => {
            const index = Number((entry.target as HTMLElement).dataset.stepIndex);
            visibility.set(index, entry.intersectionRatio);
          });

          let bestIndex = 0;
          let bestRatio = -1;
          visibility.forEach((ratio, index) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              bestIndex = index;
            }
          });

          if (bestRatio > 0) applyStep(bestIndex);
        },
        { root: null, threshold: [0, 0.2, 0.45, 0.7, 1], rootMargin: "-30% 0px -35% 0px" }
      );

      nodes.forEach((node) => observer?.observe(node));
    });

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [tabId, lastIndex, reducedMotion, applyStep]);

  const setHover = (index: number | null) => {
    if (index !== null) {
      hoverLock.current = true;
      setHoveredStep(index);
      if (lastIndex > 0) progressTarget.set((index / lastIndex) * 100);
      return;
    }

    hoverLock.current = false;
    setHoveredStep(null);
    applyStep(scrollStepRef.current);
  };

  const handleMobileSelect = (index: number) => {
    setMobileStep(index);
    if (lastIndex > 0) progressTarget.set((index / lastIndex) * 100);
  };

  const activeIndex = hoveredStep ?? scrollStep;

  const registerStepRef = (index: number) => (node: HTMLDivElement | null) => {
    stepRefs.current[index] = node;
  };

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
      key={tabId}
      transition={{ duration: reducedMotion ? 0.12 : 0.35, ease }}
    >
      <div className="flex flex-col gap-3 border-b border-slate-100 bg-gradient-to-b from-white to-[#fafbfd] px-4 py-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4 md:px-8 md:py-7">
        <div className="max-w-xl">
          <h3 className="font-display text-lg font-medium tracking-tight text-[#0a1b33] sm:text-xl md:text-2xl">
            {tab.headline}
          </h3>
          <p className="mt-1.5 hidden text-sm leading-relaxed text-[#64748b] sm:block">{tab.summary}</p>
        </div>
        <Link
          className="inline-flex shrink-0 items-center gap-1 self-start rounded-full border border-[#2090f0]/20 bg-[#eff7fe] px-3.5 py-1.5 text-xs font-semibold text-[#2090f0] sm:px-4 sm:py-2 sm:text-sm"
          href={localePath(tab.href, locale)}
        >
          <span className="line-clamp-1">{viewCategoryLabel.replace("{category}", tab.label.toLowerCase())}</span>
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
        </Link>
      </div>

      <div className="hidden md:block px-5 pb-6 pt-5 md:px-8 md:pb-7 md:pt-6">
        <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-[#f8fafc] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
          <div className="px-4 pt-4 md:px-5 md:pt-5">
            <ProcessTimeline
              activeIndex={activeIndex}
              progressWidth={progressWidth}
              reducedMotion={reducedMotion}
              steps={tab.steps}
              tabId={tabId}
            />
          </div>

          <div
            className="grid border-t border-slate-200/80 bg-white"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          >
            {tab.steps.map((step, index) => (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className={cn(index > 0 && "border-l border-slate-100")}
                data-step-index={index}
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                key={`${tabId}-${step.id}`}
                ref={registerStepRef(index)}
                transition={{ duration: reducedMotion ? 0 : 0.4, ease, delay: reducedMotion ? 0 : index * 0.04 }}
              >
                <StepCell
                  href={step.href ? localePath(step.href, locale) : undefined}
                  index={index}
                  isActive={index === activeIndex}
                  isHovered={hoveredStep === index}
                  learnMore={learnMore}
                  onHover={setHover}
                  step={step}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <MobileWorkflow
        activeIndex={mobileStep}
        learnMore={learnMore}
        locale={locale}
        onSelect={handleMobileSelect}
        reducedMotion={reducedMotion}
        steps={tab.steps}
        tabId={tabId}
      />
    </motion.div>
  );
}

export function WorkflowRoadmap() {
  const { dict, locale } = useDictionary();
  const tabs = getWorkflowTabs(locale);
  const [active, setActive] = useState<WorkflowTabId>("mobile");
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5, ease }}
      viewport={{ once: true, margin: "-5%" }}
      whileInView={{ opacity: 1 }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#64748b]">{dict.workflow.eyebrow}</p>
        <h2 className="mt-2 font-display text-[clamp(1.6rem,4vw,2.5rem)] font-medium leading-[1.1] tracking-tight text-[#0a1b33] md:mt-3">
          {dict.workflow.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#64748b] md:mt-4 md:text-[15px]">{dict.workflow.text}</p>
      </div>

      <div className="mt-6 flex justify-center md:mt-10">
        <div
          className={cn(
            "inline-flex max-w-full flex-wrap justify-center gap-0.5",
            brandCtaShell
          )}
        >
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            const TabIcon = TAB_META[tab.id].icon;

            return (
              <button
                className={cn(
                  "relative flex items-center gap-2 rounded-full px-4 py-2.5 text-[15px] font-extrabold tracking-tight transition-colors sm:px-5 sm:py-2.5 sm:text-base",
                  isActive ? "text-white" : "text-[#2090f0]"
                )}
                key={tab.id}
                onClick={() => setActive(tab.id)}
                type="button"
              >
                {isActive ? (
                  <motion.span
                    className={cn("absolute inset-0 rounded-full", brandCtaGradient, brandCtaShadow)}
                    layoutId="workflow-tab-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <TabIcon
                  className={cn("relative z-10 h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]", isActive && "text-white")}
                  strokeWidth={2.25}
                  style={!isActive ? { color: "#2090f0" } : undefined}
                />
                <span
                  className={cn(
                    "relative z-10 whitespace-nowrap font-extrabold",
                    !isActive && brandCtaTextGradient
                  )}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <motion.div
        className="mt-5 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_12px_40px_-20px_rgba(10,27,51,0.1)] md:mt-10 md:rounded-[28px] md:shadow-[0_16px_48px_-24px_rgba(10,27,51,0.12)]"
        initial={{ opacity: 0, y: 16 }}
        transition={{ duration: reducedMotion ? 0 : 0.55, ease }}
        viewport={{ once: true, margin: "-6%" }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <AnimatePresence mode="wait">
          <WorkflowPanel
            key={active}
            learnMore={dict.common.learnMore}
            locale={locale}
            reducedMotion={!!reducedMotion}
            tabId={active}
            tabs={tabs}
            viewCategoryLabel={dict.common.viewCategory}
          />
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
