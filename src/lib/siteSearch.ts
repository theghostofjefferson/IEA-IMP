import { contributors } from "@/data/contributors";
import { profilePath } from "@/data/profiles";
import { redFlags, schools } from "@/lib/data";

/**
 * Site-wide search index.
 *
 * One flat list of everything a reader might look for - schools, institutions
 * under review, the people behind the Institute, and the site's own pages -
 * built once from the same data the pages render, so it cannot drift from them.
 *
 * Matching is deliberately simple and predictable: the query is split into
 * words, every word must appear somewhere in an entry, and entries whose name
 * starts with (or has a word starting with) the query rank first.
 */

export type SearchKind = "school" | "review" | "person" | "page";

export type SearchEntry = {
  key: string;
  kind: SearchKind;
  title: string;
  /** Secondary line under the title. */
  subtitle: string;
  to: string;
  /** Extra words that should find this entry but are not displayed. */
  keywords: string;
  /** Initials for the monogram (schools, people). */
  initials?: string;
  /** Overall score, for schools only. */
  score?: number;
  rank?: number;
};

export const KIND_LABEL: Record<SearchKind, string> = {
  school: "Schools",
  review: "Institutions under review",
  person: "People",
  page: "Pages",
};

/** Display order of the groups. */
export const KIND_ORDER: SearchKind[] = ["school", "review", "person", "page"];

const PER_KIND_LIMIT: Record<SearchKind, number> = { school: 6, review: 4, person: 5, page: 5 };

/** The site's own pages. `keywords` are what a reader might type to find them. */
export const PAGES: SearchEntry[] = [
  {
    key: "page:rankings",
    kind: "page",
    title: "Rankings",
    subtitle: "Every surveyed school, scored and ranked",
    to: "/rankings",
    keywords: "ranking table scores list schools compare best top",
  },
  {
    key: "page:review",
    kind: "page",
    title: "Institutions under review",
    subtitle: "Schools selected for institutional review",
    to: "/rankings?view=redflags",
    keywords: "red flags flagged complaints concerns investigation",
  },
  {
    key: "page:methodology",
    kind: "page",
    title: "Methodology",
    subtitle: "How the survey and scores were built",
    to: "/methodology",
    keywords: "method scoring weights survey how calculated cost inversion",
  },
  {
    key: "page:reports",
    kind: "page",
    title: "Reports",
    subtitle: "The annual report on the school survey",
    to: "/reports",
    keywords: "annual report publication 2026 pdf research findings",
  },
  {
    key: "page:about",
    kind: "page",
    title: "About the Institute",
    subtitle: "Mission, work and team",
    to: "/about",
    keywords: "about iea team members founders mission who we are contact",
  },
  {
    key: "page:statement",
    kind: "page",
    title: "IEA statement, 31 October 2026",
    subtitle: "On the Assault on Freedom of Expression in Nepal",
    to: "/#statement",
    keywords: "statement press freedom expression free speech journalists electronic transactions act",
  },
];

let cache: SearchEntry[] | null = null;

export function searchIndex(): SearchEntry[] {
  if (cache) return cache;

  const schoolEntries: SearchEntry[] = schools.map((s) => ({
    key: `school:${s.id}`,
    kind: "school",
    title: s.name,
    subtitle: `${s.shortName} · ${s.location}`,
    to: `/school/${s.id}`,
    keywords: `${s.shortName} ${s.location} ${s.type} rank ${s.rank}`,
    initials: s.initials,
    score: s.overallScore,
    rank: s.rank,
  }));

  const reviewEntries: SearchEntry[] = redFlags.map((r) => ({
    key: `review:${r.id}`,
    kind: "review",
    title: r.name,
    subtitle: "Institution under review",
    to: `/red-flag/${r.id}`,
    keywords: r.reasons.join(" "),
  }));

  const peopleEntries: SearchEntry[] = contributors.map((c) => ({
    key: `person:${c.id}`,
    kind: "person",
    title: c.name,
    subtitle: c.role,
    to: profilePath(c.id) ?? "/about",
    keywords: `${c.role} team member profile`,
  }));

  cache = [...schoolEntries, ...reviewEntries, ...peopleEntries, ...PAGES];
  return cache;
}

/** Lowercase, strip accents and punctuation so "St. Mary's" finds "st marys". */
function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreEntry(e: SearchEntry, words: string[], full: string): number {
  const title = norm(e.title);
  const sub = norm(e.subtitle);
  const extra = norm(e.keywords);
  const hay = `${title} ${sub} ${extra}`;
  if (!words.every((w) => hay.includes(w))) return 0;

  let score = 1;
  if (title === full) score += 100;
  else if (title.startsWith(full)) score += 60;
  else if (title.includes(full)) score += 35;
  for (const w of words) {
    if (title.split(" ").some((t) => t.startsWith(w))) score += 12;
    else if (title.includes(w)) score += 6;
    else if (sub.includes(w)) score += 3;
  }
  return score;
}

/**
 * Grouped results for a query, in `KIND_ORDER`. Empty groups are dropped.
 * An empty query returns nothing: the dialog shows suggestions instead.
 */
export function runSearch(query: string): { kind: SearchKind; items: SearchEntry[] }[] {
  const full = norm(query);
  if (!full) return [];
  const words = full.split(" ");

  const scored = searchIndex()
    .map((e) => ({ e, s: scoreEntry(e, words, full) }))
    .filter((x) => x.s > 0);

  return KIND_ORDER.map((kind) => ({
    kind,
    items: scored
      .filter((x) => x.e.kind === kind)
      .sort((a, b) => b.s - a.s || (a.e.rank ?? 0) - (b.e.rank ?? 0))
      .slice(0, PER_KIND_LIMIT[kind])
      .map((x) => x.e),
  })).filter((g) => g.items.length > 0);
}
