import { totalSchools } from "@/lib/data";
import { formatCount } from "@/lib/format";

export const SEO = {
  home: build(
    "Institute for Educational Accountability",
    "An independent examination of Nepali schools, grounded in verified student testimony, field inquiry, and credible public sources, undertaken to illuminate the institutions entrusted with educating the next generation.",
    { title: `Institute for Educational Accountability | Independent School Evaluation in Nepal`, ogTitle: "Institute for Educational Accountability" },
  ),
  rankings: build(
    "Rankings",
    `All ${totalSchools} schools in the survey, with School Environment, Infrastructure, Net Cost and Net Benefit scores. Search, sort and filter the full table.`,
  ),
  methodology: build(
    "Methodology",
    `How the IEA Institute scores were built: the survey, the four dimensions and their weights, the cost inversion, and how ranks are assigned.`,
  ),
  annualReport: build(
    "Annual report",
    `The IEA Institute annual report on the 2026 school survey: the instrument, response rates, the scoring model and the limitations.`,
  ),
  about: build(
    "About",
    `The Institute for Educational Accountability (IEA) advances transparency and accountability in education through field research, school investigations, student surveys, and evidence-based analysis.`,
  ),
  reportConcern: build(
    "Report a concern",
    `Submit a disclosure to the Institute for Educational Accountability (IEA) regarding educational institutions, public-interest concerns, or possible rights violations.`,
  ),
  notFound: build(
    "Page not found",
    "That page does not exist. Browse all 42 schools in the IEA Institute rankings, or read how the rankings were built.",
    { noindex: true },
  ),
} as const satisfies Record<string, Seo>;

// NOTE: keep the rest of src/lib/seo.ts unchanged; this file is already loaded in the repo.
