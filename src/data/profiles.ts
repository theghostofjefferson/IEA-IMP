import { contributors } from "@/data/contributors";
import type { Contributor } from "@/lib/types";

/**
 * PROFILE PAGES - one per listed member, except Research Analysts.
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
 *   showPhoto false keeps the portrait frame but shows initials instead of the photo
 *   (the first bio paragraph is set as a larger lead-in, so make it the key sentence)
 *
 * The founder's and president's letters are NOT repeated on their profile pages;
 * they stay on the About page ("Message from..." buttons) and the home page.
 *
 * To give someone ELSE a page, add their contributor `id` to PROFILE_IDS.
 */
export type MemberProfile = {
  summary?: string;
  quote?: { text: string; source?: string };
  bio?: string[];
  focus?: string[];
  contact?: { label: string; value: string; href?: string }[];
  /** Set to false to show initials in the portrait frame instead of the photo. */
  showPhoto?: boolean;
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
  "abhinash-poudel",
  "kaustuv-rimal",
  "nischal-ghimire",
  "aaditya-jha",
];

export const profiles: Record<string, MemberProfile> = {
  "eron-subedi": {
    summary: "Founded the Institute and leads its investigations.",
    bio: [
      "Eron Subedi serves as the Founder, Executive Chairman, and Chief of Investigations at the Institute for Educational Accountability.",
      "He provides the Institute’s overall vision and institutional direction, oversees its strategic development and operations, and leads its investigative initiatives.",
      "His longstanding engagement with constitutional law informs IEA’s legal strategy, including the development of legal challenges and the application of constitutional principles to questions of institutional accountability and students’ rights.",
    ],
    focus: [
      "Vision and institutional direction",
      "Strategy and operations",
      "Investigations",
      "Constitutional law and legal strategy",
    ],
    contact: [
      { label: "Institute enquiries", value: "founder@ieainstitute.org", href: "mailto:founder@ieainstitute.org" },
    ],
    // Initials in the portrait frame for now; remove this line to show his photo.
    showPhoto: false,
  },
  "yogeshwor-sharma": {
    summary: "Leads the Institute's operations and its day-to-day work as President.",
    focus: ["Operations", "Organisation and coordination"],
  },
  "aarohan-baral": {},
  "tikaram-sharma": {},
  "prajjwal-dhakal": {},
  "aishani-rai": {},
  "ashmit-pandey": {},
  "abhinash-poudel": {},
  "kaustuv-rimal": {},
  "nischal-ghimire": {},
  "aaditya-jha": {},
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

/** The portrait to show for a member on their own page and in listings. */
export function memberPhoto(c: Contributor): string | undefined {
  return profiles[c.id]?.showPhoto === false ? undefined : c.photo;
}
