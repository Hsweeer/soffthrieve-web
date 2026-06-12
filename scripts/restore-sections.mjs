import fs from "node:fs";
import path from "node:path";

const transcript =
  "C:/Users/Yoga Book/.cursor/projects/d-Softhrieve-work-Softtrieve-web/agent-transcripts/420b4b33-797c-47ff-bff6-8c1ac1da2317/420b4b33-797c-47ff-bff6-8c1ac1da2317.jsonl";

const pick = (name, prefer) => {
  let best = null;
  for (const line of fs.readFileSync(transcript, "utf8").split("\n")) {
    try {
      const data = JSON.parse(line);
      for (const c of data.message?.content ?? []) {
        if (c.name !== "Write") continue;
        const p = c.input?.path?.replace(/\\/g, "/") ?? "";
        const contents = c.input?.contents;
        if (!p.endsWith(name) || typeof contents !== "string") continue;
        const score = (prefer(contents) ? 1e9 : 0) + contents.length;
        if (!best || score > best.score) best = { contents, score };
      }
    } catch {
      /* skip */
    }
  }
  return best?.contents;
};

const files = {
  "WhyChooseUs.tsx": (c) => c.includes("whySoftThriveHighlight"),
  "FeaturedCaseStudy.tsx": (c) => c.includes("portfolio-device-stage") || c.includes("motion.article"),
  "MobileProductShowcase.tsx": (c) => c.includes("portfolio-device-stage"),
  "TrustRatingsMarquee.tsx": (c) => c.includes("TrustBrandLogos"),
  "TrustBrandLogos.tsx": () => true,
  "ServicesScrollSection.tsx": (c) => c.includes("StickyScroll"),
  "WorkflowRoadmap.tsx": (c) => c.includes("BorderBeam") || c.includes("Timeline"),
  "providers/SmoothScroll.tsx": () => true
};

for (const [file, prefer] of Object.entries(files)) {
  const contents = pick(file, prefer);
  if (!contents) {
    console.log("MISSING", file);
    continue;
  }
  const full = path.join(process.cwd(), "components", file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents);
  console.log("OK", file, contents.length, prefer(contents) ? "(preferred)" : "");
}
