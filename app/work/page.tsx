"use client";

import { Suspense } from "react";
import { WorkCategoryRedirect } from "@/components/WorkCategoryRedirect";
import { WorkGallery } from "@/components/WorkGallery";
import { WorkPageHeading } from "@/components/WorkPageHeading";
import { WorkThumbnailCropPanel } from "@/components/work/WorkThumbnailCropPanel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "150+ live apps and 100+ Shopify stores built for Saudi and GCC clients. View our full portfolio.",
  openGraph: {
    title: "Softhrive | Portfolio — Apps and Shopify Stores",
    description:
      "150+ live apps and 100+ Shopify stores built for Saudi and GCC clients. View our full portfolio."
  },
  twitter: {
    title: "Softhrive | Portfolio — Apps and Shopify Stores",
    description:
      "150+ live apps and 100+ Shopify stores built for Saudi and GCC clients. View our full portfolio."
  }
};

export default function WorkPage() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container-shell">
        <Suspense fallback={null}>
          <WorkCategoryRedirect />
          <WorkThumbnailCropPanel />
          <WorkPageHeading />
          <div className="mt-12">
            <WorkGallery />
          </div>
        </Suspense>
      </div>
    </section>
  );
}
