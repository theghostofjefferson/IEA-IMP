import { contributors } from "@/data/contributors";
import type { Contributor } from "@/lib/types";

/**
 * PROFILE PAGES - one per listed member (researchers are not given one).
 * ---------------------------------------------------------------------------
 * Each person below has a page at `/team/<id>`, linked from the About page and
 * from site search. THIS FILE IS WHERE THEIR WORDS GO: fill in any field and it
 * appears on their page; leave it out and that section simply does not render.
 *
 *   summary   one or two sentences under the name (also the search/SEO text)
 *   quote     a pull quote:  { text: "...", source: "..." }  (source optional)
 *   bio       paragraphs. Inline **bold** and *italic* are supported.
 *   focus     short lines for "Areas of work"
 *   contact   [{ label, value, href? }]  e.g. { label: "Email", value: "a@b.org", href: "mailto:a@b.org" }
 *
 * The founder and the president also show their full signed letter on their
 * page; that text lives in `data/messages.ts`.
 *
 * To give someone ELSE a page, add their contributor `id` to PROFILE_IDS.
 */
export type MemberProfile = {
  summary?: string;
  quote?: { text: string; source?: string };
  bio?: string[];
  focus?: string[];
  contact?: { label: string; value: string; href?: string }[];
};

/** Who has a page, in the order they appear in "More from the team". */
export const PROFILE_IDS: readonly string[] = [
  "eron-subedi",
  "yogeshwor-sharma",
  "aarohan-baral",
  "tikaram-sharma",
  "prajjwal-dhakal",
  "aishani-rai",
  "ashmit-pandey",
];

/** The two principals get the full-width feature layout. */
export const PRINCIPAL_IDS: readonly string[] = ["eron-subedi", "yogeshwor-sharma"];

export const profiles: Record<string, MemberProfile> = {
  "eron-subedi": {
    summary:
      "Founded the Institute in the belief that institutions entrusted with responsibility should answer for how they exercise it.",
    quote: {
      text: "We are not content to stand still by the will of God.",
      source: "31 October 2026",
    },
    focus: ["Investigations", "Institutional accountability", "Public statements and legal action"],
    contact: [
      { label: "Institute enquiries", value: "founder@ieainstitute.org", href: "mailto:founder@ieainstitute.org" },
    ],
  },
  "yogeshwor-sharma": {
    summary: "Leads the Institute's operations and its day-to-day work as President.",
    quote: {
      text: "Sometimes, it starts with recognizing that something can be better and being willing to put in the work to make it so.",
    },
    focus: ["Operations", "Organisation and coordination"],
  },
  "aarohan-baral": {},
  "tikaram-sharma": {},
  "prajjwal-dhakal": {},
  "aishani-rai": {},
  "ashmit-pandey": {},
};

/* -------------------------------------------------------------------------- */

const byId = new Map(contributors.map((c) => [c.id, c]));
const byName = new Map(contributors.map((c) => [c.name, c]));

export function profileMembers(): Contributor[] {
  return PROFILE_IDS.map((id) => byId.get(id)).filter((c): c is Contributor => !!c);
}

export function getProfileMember(id: string | undefined): Contributor | undefined {
  return id && PROFILE_IDS.includes(id) ? byId.get(id) : undefined;
}

/** `/team/<id>` for people with a page, `undefined` for everyone else. */
export function profilePath(id: string): string | undefined {
  return PROFILE_IDS.includes(id) ? `/team/${id}` : undefined;
}

export function profilePathByName(name: string): string | undefined {
  const c = byName.get(name);
  return c ? profilePath(c.id) : undefined;
}
