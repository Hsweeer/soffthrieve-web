import fs from "node:fs";

const transcript =
  "C:/Users/Yoga Book/.cursor/projects/d-Softhrieve-work-Softtrieve-web/agent-transcripts/420b4b33-797c-47ff-bff6-8c1ac1da2317/420b4b33-797c-47ff-bff6-8c1ac1da2317.jsonl";

let best = "";

for (const line of fs.readFileSync(transcript, "utf8").split("\n")) {
  try {
    const data = JSON.parse(line);
    for (const c of data.message?.content ?? []) {
      const p = c.input?.path ?? "";
      const contents = c.input?.contents;
      if (c.name === "Write" && p.includes("sticky-scroll-reveal") && typeof contents === "string") {
        if (contents.includes("scrollMode") && contents.length > best.length) best = contents;
      }
    }
  } catch {
    /* skip */
  }
}

if (best) {
  fs.writeFileSync("components/ui/sticky-scroll-reveal.tsx", best);
  console.log("sticky-scroll-reveal", best.length);
} else {
  console.log("not found");
}
