"use client";

import Link from "next/link";
import { ExternalLink, Figma, Globe } from "lucide-react";
import { StoreBadges } from "@/components/StoreBadges";
import { useDictionary } from "@/lib/i18n";

type LiveProjectActionsProps = {
  liveUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  figmaUrl?: string;
  caseStudyHref?: string;
};

export function LiveProjectActions({
  liveUrl,
  appStoreUrl,
  playStoreUrl,
  figmaUrl,
  caseStudyHref
}: LiveProjectActionsProps) {
  const { dict } = useDictionary();
  const hasStore = Boolean(appStoreUrl || playStoreUrl);
  const hasPrimaryLink = Boolean(liveUrl || figmaUrl);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2.5">
        {liveUrl && (
          <Link
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2090f0] to-[#1878c9] px-5 py-2.5 text-sm font-black text-white shadow-[0_14px_36px_rgba(32,144,240,0.35)] transition hover:-translate-y-0.5 hover:brightness-110"
            href={liveUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Globe className="h-4 w-4" />
            {dict.common.visitLive}
            <ExternalLink className="h-3.5 w-3.5 opacity-80" />
          </Link>
        )}

        {figmaUrl && (
          <Link
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#08112b]/12 bg-white px-5 py-2.5 text-sm font-black text-[#08112b] transition hover:border-[#2090f0] hover:text-[#2090f0]"
            href={figmaUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Figma className="h-4 w-4" />
            {liveUrl ? dict.common.figmaDesign : dict.common.viewFigma}
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </Link>
        )}

        {caseStudyHref && (
          <Link
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#08112b]/12 bg-white px-5 py-2.5 text-sm font-black text-[#08112b] transition hover:border-[#2090f0] hover:text-[#2090f0]"
            href={caseStudyHref}
          >
            {dict.common.readCaseStudy}
          </Link>
        )}
      </div>

      {!hasPrimaryLink && !hasStore && !caseStudyHref && (
        <p className="text-xs font-medium text-[#5a6d90]">{dict.common.privateReleaseNote}</p>
      )}

      {hasStore && <StoreBadges appStoreUrl={appStoreUrl} playStoreUrl={playStoreUrl} />}
    </div>
  );
}
