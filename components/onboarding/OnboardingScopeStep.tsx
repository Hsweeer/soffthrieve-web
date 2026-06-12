"use client";

import { motion } from "motion/react";
import clsx from "clsx";
import { Check, Link2 } from "lucide-react";
import type { ProductTypeProfile } from "@/lib/onboarding-config";
import { getBudgetOptions, getTimelineOptions } from "@/lib/onboarding";

type Props = {
  profile: ProductTypeProfile;
  platforms: string[];
  features: string[];
  timeline: string;
  budget: string;
  referenceUrl: string;
  onTogglePlatform: (value: string) => void;
  onToggleFeature: (value: string) => void;
  onTimeline: (value: string) => void;
  onBudget: (value: string) => void;
  onReference: (value: string) => void;
};

const section = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 }
};

const grid = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.06 } }
};

const tile = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1 }
};

function ChoiceTiles({
  options,
  selected,
  onToggle,
  columns = 2
}: {
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
  columns?: 2 | 3;
}) {
  return (
    <motion.div
      className={clsx(
        "grid gap-2",
        columns === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"
      )}
      initial="hidden"
      animate="show"
      variants={grid}
    >
      {options.map((option) => {
        const active = selected.includes(option);
        return (
          <motion.button
            className={clsx(
              "onboarding-tile relative flex min-h-[44px] items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs font-medium leading-snug transition sm:text-[13px]",
              active
                ? "border-[#2090f0] bg-[#2090f0]/10 text-[#1260a3] shadow-[inset_0_0_0_1px_rgba(32,144,240,0.2)]"
                : "border-slate-200/90 bg-white text-slate-600 hover:border-slate-300 hover:shadow-sm"
            )}
            key={option}
            onClick={() => onToggle(option)}
            type="button"
            variants={tile}
            whileHover={{ y: active ? 0 : -1 }}
            whileTap={{ scale: 0.97 }}
          >
            <span
              className={clsx(
                "flex h-4 w-4 shrink-0 items-center justify-center rounded-md border transition",
                active ? "border-[#2090f0] bg-[#2090f0] text-white" : "border-slate-300 bg-white"
              )}
            >
              {active ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : null}
            </span>
            <span className="flex-1">{option}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}

function PillRow({
  label,
  options,
  value,
  onChange
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <motion.button
              className={clsx(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                active
                  ? "border-[#2090f0] bg-[#2090f0] text-white shadow-md shadow-[#2090f0]/25"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              )}
              key={opt}
              onClick={() => onChange(opt)}
              type="button"
              whileTap={{ scale: 0.96 }}
            >
              {opt}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export function OnboardingScopeStep({
  profile,
  platforms,
  features,
  timeline,
  budget,
  referenceUrl,
  onTogglePlatform,
  onToggleFeature,
  onTimeline,
  onBudget,
  onReference
}: Props) {
  const isShopify = profile.id === "Shopify store";
  const timelineChoices = getTimelineOptions(profile.id);
  const budgetChoices = getBudgetOptions(profile.id);

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.08 }}
    >
      <motion.section className="onboarding-scope-block" variants={section}>
        <div className="mb-3 flex items-baseline justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-[#0a1b33]">{profile.platformLabel}</h3>
            <p className="text-xs text-slate-500">{profile.platformHint}</p>
          </div>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
            {platforms.length} selected
          </span>
        </div>
        <ChoiceTiles
          columns={isShopify ? 2 : 2}
          onToggle={onTogglePlatform}
          options={profile.platformOptions}
          selected={platforms}
        />
      </motion.section>

      <motion.section className="onboarding-scope-block" variants={section}>
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-[#0a1b33]">{profile.featureLabel}</h3>
          <p className="text-xs text-slate-500">{profile.featureHint}</p>
        </div>
        <ChoiceTiles onToggle={onToggleFeature} options={profile.featureOptions} selected={features} />
      </motion.section>

      <motion.section
        className="onboarding-scope-block rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50/90 to-white p-4"
        variants={section}
      >
        <h3 className="mb-4 text-sm font-semibold text-[#0a1b33]">
          {isShopify ? "Store launch timing & budget" : "Timing & budget"}
        </h3>
        <div className="space-y-4">
          <PillRow label="Timeline" onChange={onTimeline} options={timelineChoices} value={timeline} />
          <PillRow label="Budget" onChange={onBudget} options={budgetChoices} value={budget} />
        </div>
      </motion.section>

      <motion.section className="space-y-2" variants={section}>
        <p className="text-xs font-medium text-slate-500">Reference (optional)</p>
        <div className="relative">
          <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            className="onboarding-field w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#2090f0] focus:ring-2 focus:ring-[#2090f0]/15"
            onChange={(e) => onReference(e.target.value)}
            placeholder="Store, app, or site you like"
            type="url"
            value={referenceUrl}
          />
        </div>
      </motion.section>
    </motion.div>
  );
}
