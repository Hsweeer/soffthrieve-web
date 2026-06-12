"use client";

import { motion } from "motion/react";
import { useDictionary } from "@/lib/i18n";

const reveal = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } }
};

export function TeamStatsSection() {
  const { dict } = useDictionary();
  const stats = dict.about.teamStats;

  return (
    <section className="border-t border-slate-200/80 py-14 sm:py-16">
      <div className="container-shell">
        <motion.div
          className="mb-8 max-w-xl"
          initial="hidden"
          variants={reveal}
          viewport={{ once: true }}
          whileInView="show"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{dict.about.teamEyebrow}</p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">{dict.about.teamTitle}</h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {stats.items.map((item, index) => (
            <motion.div
              className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6"
              initial="hidden"
              key={item.value || `team-stat-${index}`}
              variants={reveal}
              viewport={{ once: true }}
              whileInView="show"
            >
              <p className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">{item.value}</p>
              {item.label ? (
                <p className="mt-2 text-sm font-medium text-slate-900">{item.label}</p>
              ) : null}
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-8 max-w-3xl text-sm leading-relaxed text-slate-600"
          initial="hidden"
          variants={reveal}
          viewport={{ once: true }}
          whileInView="show"
        >
          {stats.summary}
        </motion.p>
      </div>
    </section>
  );
}
