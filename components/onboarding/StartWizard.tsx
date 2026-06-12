"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import {
  OnboardingData,
  defaultOnboarding,
  getBudgetOptions,
  getTimelineOptions,
  onboardingSteps,
  saveOnboarding
} from "@/lib/onboarding";
import {
  getProductProfile,
  sanitizeSelections,
  type ProductTypeId
} from "@/lib/onboarding-config";
import { OnboardingProductPicker } from "@/components/onboarding/OnboardingProductPicker";
import { OnboardingScopeStep } from "@/components/onboarding/OnboardingScopeStep";
import { localePath, useDictionary } from "@/lib/i18n";

function ReviewSummary({ data }: { data: OnboardingData }) {
  const profile = getProductProfile(data.productType);
  const rows = [
    { label: "Product", value: data.productType },
    { label: "Stage", value: data.stage },
    { label: profile?.platformLabel ?? "Focus", value: data.platforms.join(", ") },
    { label: profile?.featureLabel ?? "Features", value: data.features.join(", ") },
    { label: "Timeline", value: data.timeline },
    { label: "Budget", value: data.budget },
    { label: "Reference", value: data.referenceUrl || "—" },
    { label: "WhatsApp", value: data.whatsapp || "—" }
  ];

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="grid gap-2 rounded-2xl border border-slate-100 bg-gradient-to-b from-slate-50/90 to-white p-4 text-sm"
      initial={{ opacity: 0, y: 8 }}
    >
      {rows.map((row, i) => (
        <motion.div
          className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4"
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          key={row.label}
          transition={{ delay: i * 0.05 }}
        >
          <span className="text-xs font-medium text-slate-500">{row.label}</span>
          <span className="font-medium leading-snug text-[#0a1b33] sm:max-w-[58%] sm:text-right">
            {row.value || "—"}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function StartWizard() {
  const router = useRouter();
  const { dict, locale } = useDictionary();
  const stepLabels = [dict.startPage.stepProduct, dict.startPage.stepScope, dict.startPage.stepReview];
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<OnboardingData>(defaultOnboarding);

  const profile = getProductProfile(data.productType);
  const step = onboardingSteps[stepIndex];
  const progress = ((stepIndex + 1) / onboardingSteps.length) * 100;

  const canContinue = useMemo(() => {
    if (stepIndex === 0) {
      return Boolean(data.productType && data.stage);
    }
    if (stepIndex === 1) {
      return (
        Boolean(profile) &&
        data.platforms.length > 0 &&
        data.features.length > 0 &&
        Boolean(data.timeline && data.budget)
      );
    }
    const whatsappDigits = data.whatsapp.replace(/\D/g, "");
    return (
      data.name.trim().length > 1 &&
      whatsappDigits.length >= 8 &&
      data.email.includes("@")
    );
  }, [stepIndex, data, profile]);

  const setProductType = (productType: ProductTypeId) => {
    setData((prev) => {
      const next = sanitizeSelections(productType, prev.stage, prev.platforms, prev.features);
      const timelines = getTimelineOptions(productType);
      const budgets = getBudgetOptions(productType);
      return {
        ...prev,
        productType,
        stage: next.stage,
        platforms: next.platforms,
        features: next.features,
        timeline: timelines.includes(prev.timeline) ? prev.timeline : "",
        budget: budgets.includes(prev.budget) ? prev.budget : ""
      };
    });
  };

  const update = (patch: Partial<OnboardingData>) => setData((prev) => ({ ...prev, ...patch }));

  const toggleList = (key: "platforms" | "features", value: string) => {
    setData((prev) => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter((v) => v !== value) : [...prev[key], value]
    }));
  };

  const goToStep = (index: number) => {
    if (index >= stepIndex) return;
    setDirection(-1);
    setStepIndex(index);
  };

  const goNext = () => {
    if (stepIndex < onboardingSteps.length - 1) {
      setDirection(1);
      setStepIndex((i) => i + 1);
      return;
    }
    saveOnboarding(data);
    router.push(`${localePath("/contact", locale)}?from=start`);
  };

  const goBack = () => {
    setDirection(-1);
    setStepIndex((i) => Math.max(0, i - 1));
  };

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 20 : -20, filter: "blur(4px)" }),
    center: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -20 : 20, filter: "blur(4px)" })
  };

  const stepSubtitle =
    stepIndex === 1 && profile ? profile.scopeSubtitle : step.subtitle;

  return (
    <div className="onboarding-wizard mx-auto max-w-xl">
      <motion.div
        className="onboarding-progress mb-6 rounded-2xl border border-white/80 bg-white/70 px-4 py-3.5 shadow-[0_12px_40px_rgba(32,144,240,0.08)] backdrop-blur-sm"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-slate-500">
            Step {stepIndex + 1} of {onboardingSteps.length}
            {data.productType ? (
              <span className="text-slate-400">
                {" "}
                · <span className="font-medium text-[#2090f0]">{data.productType}</span>
              </span>
            ) : null}
          </p>
          <p className="text-xs font-bold tabular-nums text-[#2090f0]">{Math.round(progress)}%</p>
        </div>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#52a6f3] to-[#2090f0]"
            layout
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 flex gap-1.5">
          {stepLabels.map((label, index) => {
            const done = index < stepIndex;
            const active = index === stepIndex;
            return (
              <button
                className={clsx(
                  "flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition",
                  active && "bg-[#2090f0]/12 text-[#2090f0]",
                  done && !active && "text-[#2090f0] hover:bg-slate-50",
                  !done && !active && "text-slate-400",
                  index < stepIndex && "cursor-pointer"
                )}
                disabled={index > stepIndex}
                key={label}
                onClick={() => goToStep(index)}
                type="button"
              >
                <span
                  className={clsx(
                    "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition",
                    active && "bg-[#2090f0] text-white shadow-md shadow-[#2090f0]/30",
                    done && !active && "bg-[#2090f0]/15 text-[#2090f0]",
                    !done && !active && "bg-slate-100 text-slate-400"
                  )}
                >
                  {done ? <Check className="h-3 w-3" strokeWidth={2.5} /> : index + 1}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          animate="center"
          className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur-sm"
          custom={direction}
          exit="exit"
          initial="enter"
          key={stepIndex}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          variants={slideVariants}
        >
          <div className="border-b border-slate-100/90 px-5 py-4 sm:px-6">
            <h2 className="font-display text-xl font-semibold tracking-tight text-[#0a1b33]">
              {step.title}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">{stepSubtitle}</p>
          </div>

          <div className="px-5 py-5 sm:px-6 sm:py-6">
            {stepIndex === 0 && (
              <OnboardingProductPicker
                onProductType={setProductType}
                onStage={(v) => update({ stage: v })}
                productType={data.productType}
                stage={data.stage}
              />
            )}

            {stepIndex === 1 && profile && (
              <OnboardingScopeStep
                budget={data.budget}
                features={data.features}
                onBudget={(v) => update({ budget: v })}
                onReference={(v) => update({ referenceUrl: v })}
                onTimeline={(v) => update({ timeline: v })}
                onToggleFeature={(v) => toggleList("features", v)}
                onTogglePlatform={(v) => toggleList("platforms", v)}
                platforms={data.platforms}
                profile={profile}
                referenceUrl={data.referenceUrl}
                timeline={data.timeline}
              />
            )}

            {stepIndex === 1 && !profile && (
              <p className="rounded-xl border border-amber-200/80 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                Go back and pick a product type first.
              </p>
            )}

            {stepIndex === 2 && (
              <motion.div
                animate="show"
                className="space-y-5"
                initial="hidden"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.07 } }
                }}
              >
                <ReviewSummary data={data} />
                <motion.div
                  className="space-y-4"
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                >
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-500">
                      {dict.form.name}
                    </label>
                    <input
                      className="onboarding-field w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#2090f0] focus:ring-2 focus:ring-[#2090f0]/15"
                      onChange={(e) => update({ name: e.target.value })}
                      type="text"
                      value={data.name}
                    />
                  </div>

                  <div className="onboarding-whatsapp-box rounded-2xl border border-[#25D366]/25 bg-gradient-to-br from-[#25D366]/8 via-white to-[#2090f0]/5 p-4 shadow-sm">
                    <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#0a1b33]">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white">
                        <MessageCircle className="h-3.5 w-3.5" />
                      </span>
                      {dict.form.whatsapp}
                    </label>
                    <p className="mb-2 text-[11px] text-slate-500">{dict.startPage.whatsappHint}</p>
                    <input
                      className="onboarding-field w-full rounded-xl border border-[#25D366]/30 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20"
                      onChange={(e) => update({ whatsapp: e.target.value })}
                      placeholder={dict.startPage.whatsappPlaceholder}
                      type="tel"
                      value={data.whatsapp}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-500">
                      {dict.form.email}
                    </label>
                    <input
                      className="onboarding-field w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#2090f0] focus:ring-2 focus:ring-[#2090f0]/15"
                      onChange={(e) => update({ email: e.target.value })}
                      type="email"
                      value={data.email}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-5 py-4 sm:px-6">
            <button
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-[#0a1b33] disabled:invisible"
              disabled={stepIndex === 0}
              onClick={goBack}
              type="button"
            >
              <ArrowLeft className="h-4 w-4" /> {dict.startPage.back}
            </button>
            <motion.button
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#52a6f3] to-[#2090f0] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#2090f0]/25 transition hover:shadow-xl hover:shadow-[#2090f0]/30 disabled:opacity-45"
              disabled={!canContinue}
              onClick={goNext}
              type="button"
              whileHover={{ scale: canContinue ? 1.02 : 1 }}
              whileTap={{ scale: canContinue ? 0.98 : 1 }}
            >
              {stepIndex === onboardingSteps.length - 1 ? (
                <>
                  {dict.startPage.sendBrief} <CheckCircle2 className="h-4 w-4" />
                </>
              ) : (
                <>
                  {dict.startPage.continue} <ArrowRight className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="mt-5 text-center text-xs text-slate-500">{dict.startPage.reviewNote}</p>
    </div>
  );
}
