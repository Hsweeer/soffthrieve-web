"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import clsx from "clsx";
import { PortfolioProject } from "@/lib/portfolio";
import { PortfolioLivePreview } from "@/components/portfolio/PortfolioLivePreview";
import { LiveProjectActions } from "@/components/LiveProjectActions";
import { localePath, useDictionary } from "@/lib/i18n";

type PortfolioProjectCardProps = {
  project: PortfolioProject;
  index?: number;
  layout?: "grid" | "wide";
};

export function PortfolioProjectCard({ project, index = 0, layout = "grid" }: PortfolioProjectCardProps) {
  const { dict, locale } = useDictionary();
  const primaryWeb = project.webUrls[0];
  const appStoreUrl = project.iosUrls[0];
  const playStoreUrl = project.androidUrls[0];
  const figmaUrl = project.figmaUrls[0];
  const wide = layout === "wide";

  return (
    <motion.article
      className={clsx(
        "portfolio-card group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/90 bg-white shadow-[0_16px_48px_-20px_rgba(8,17,43,0.14)] transition-shadow duration-500 hover:shadow-[0_28px_64px_-16px_rgba(32,144,240,0.22)]",
        wide && "lg:flex-row lg:items-stretch"
      )}
      initial={{ opacity: 0, y: 28 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.35), ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-30px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div
        className={clsx(
          "portfolio-card__media relative overflow-hidden",
          wide ? "lg:w-[58%]" : "w-full"
        )}
      >
        <PortfolioLivePreview project={project} size={wide ? "spotlight" : "card"} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08112b]/40 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-2">
          <span
            className={clsx(
              "rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] backdrop-blur-md",
              project.isLive ? "bg-emerald-500/90 text-white" : "bg-white/90 text-[#1878c9]"
            )}
          >
            {project.isLive ? dict.common.live : dict.common.design}
          </span>
        </div>
      </div>

      <div className={clsx("flex flex-1 flex-col p-5 sm:p-6", wide && "lg:justify-center lg:p-8")}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2090f0]">
              {project.category || project.platforms.replace(" (Flutter)", "")}
            </p>
            <h3 className="mt-2 text-xl font-black leading-snug text-[#08112b] sm:text-[1.35rem]">{project.name}</h3>
          </div>
          {project.caseStudySlug && (
            <Link
              aria-label={`${project.name} case study`}
              className="shrink-0 rounded-full bg-slate-100 p-2.5 text-[#2090f0] transition hover:bg-[#2090f0] hover:text-white"
              href={localePath(`/case-studies/${project.caseStudySlug}`, locale)}
            >
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          )}
        </div>

        <p className="mt-3 flex-1 text-sm leading-7 text-[#5a6d90] line-clamp-3">{project.description}</p>

        {project.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.skills.slice(0, 4).map((skill) => (
              <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-600 ring-1 ring-slate-200/80" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 border-t border-slate-100 pt-4">
          <LiveProjectActions
            appStoreUrl={appStoreUrl}
            caseStudyHref={
              project.caseStudySlug
                ? localePath(`/case-studies/${project.caseStudySlug}`, locale)
                : undefined
            }
            figmaUrl={figmaUrl}
            liveUrl={primaryWeb}
            playStoreUrl={playStoreUrl}
          />
        </div>
      </div>
    </motion.article>
  );
}
