"use client";

import { motion } from "motion/react";
import clsx from "clsx";
import { Check } from "lucide-react";
import { PRODUCT_TYPE_PROFILES, type ProductTypeId } from "@/lib/onboarding-config";
import { OnboardingSelect } from "@/components/onboarding/OnboardingSelect";

type Props = {
  productType: string;
  stage: string;
  onProductType: (id: ProductTypeId) => void;
  onStage: (stage: string) => void;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 }
  }
};

const item = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1 }
};

export function OnboardingProductPicker({ productType, stage, onProductType, onStage }: Props) {
  const profile = PRODUCT_TYPE_PROFILES.find((p) => p.id === productType);

  return (
    <motion.div className="space-y-6" initial="hidden" animate="show" variants={container}>
      <div>
        <p className="text-sm font-medium text-[#0a1b33]">What are you building?</p>
        <p className="mt-1 text-xs text-slate-500">Step 2 adapts to your choice.</p>
        <motion.div
          className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2"
          variants={container}
        >
          {PRODUCT_TYPE_PROFILES.map((p) => {
            const active = productType === p.id;
            const Icon = p.icon;
            return (
              <motion.button
                className={clsx(
                  "onboarding-choice-card group relative flex items-start gap-3 rounded-2xl border p-4 text-left transition-colors",
                  active
                    ? "border-[#2090f0] bg-gradient-to-br from-[#2090f0]/12 to-white shadow-[0_8px_28px_rgba(32,144,240,0.18)]"
                    : "border-slate-200/90 bg-white/90 hover:border-slate-300 hover:bg-slate-50/80"
                )}
                key={p.id}
                onClick={() => onProductType(p.id)}
                type="button"
                variants={item}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span
                  className={clsx(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition",
                    active
                      ? "bg-[#2090f0] text-white shadow-md shadow-[#2090f0]/30"
                      : "bg-slate-100 text-slate-600 group-hover:bg-slate-200/80"
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="min-w-0 flex-1 pt-0.5">
                  <span className="block text-sm font-semibold text-[#0a1b33]">{p.shortLabel}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-slate-500">{p.description}</span>
                </span>
                {active ? (
                  <motion.span
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#2090f0] text-white"
                    initial={{ scale: 0.6, opacity: 0 }}
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </motion.span>
                ) : null}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {profile ? (
        <motion.div animate={{ opacity: 1, height: "auto" }} initial={{ opacity: 0 }}>
          <OnboardingSelect
            hint={profile.description}
            label="Where is it today?"
            onChange={onStage}
            options={profile.stageOptions}
            placeholder="Select current stage"
            value={stage}
          />
        </motion.div>
      ) : null}
    </motion.div>
  );
}
