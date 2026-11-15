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
 *   contact   optional override. By default everyone but the founder shows firstname@ieainstitute.org
 *             [{ label, value, href? }]  e.g. { label: "Email", value: "a@b.org", href: "mailto:a@b.org" }
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
  "s-lamichhane",
  "tikaram-sharma",
  "prajjwal-dhakal",
  "aishani-rai",
  "ashmit-pandey",
  "abhinash-poudel",
  "kaustuv-rimal",
  "nischal-ghimire",
  "aaditya-jha",
  "krinjal-timalsina",
];

export const profiles: Record<string, MemberProfile> = {
  "eron-subedi": {
    summary: "Founded the Institute and leads its investigations.",
    bio: [
      "Eron Subedi serves as the Founder, Executive Chairman, and Chief of Investigations at the Institute for Educational Accountability.",
      "He provides the Institute’s overall vision and institutional direction, oversees its strategic development and operations, and leads its investigative initiatives.",
      "His longstanding engagement with constitutional law informs IEA’s legal strategy, including the development of legal challenges and the application of constitutional principles to questions of educational accountability.",
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
    bio: [
      "Yogeshwor Sharma joined the Institute for Educational Accountability in 2026 as a Co-Founder and was subsequently unanimously elected President in the months that followed.",
      "He oversees the Institute’s membership, directs its organisational and operational activities, and coordinates its day-to-day work.",
      "In addition to managing internal operations and member engagement, he provides strategic insights that inform the Institute’s priorities, organisational development, and execution of its work.",
    ],
    focus: [
      "Membership and member engagement",
      "Organisational and operational activities",
      "Day-to-day coordination",
      "Strategic insight and priorities",
    ],
  },
  "aarohan-baral": {
    bio: [
      "Aarohan Baral joined the Institute for Educational Accountability in 2026 and, in late 2026, was designated a Founding Member at the direct recommendation of the Founder, in recognition of his contribution to the Institute’s founding work.",
      "He plays a major role in the development and maintenance of IEA’s websites, alongside overseeing key technological functions and supporting the Institute’s broader digital infrastructure.",
      "His work contributes to the development of the Institute’s technological capabilities and its operational presence.",
    ],
    focus: [
      "Website development and maintenance",
      "Key technological functions",
      "Digital infrastructure",
    ],
  },
  "s-lamichhane": {
    bio: [
      "S. Lamichhane joined the Institute for Educational Accountability in 2025 and has since established herself as one of its most versatile and dependable members.",
      "Demonstrating remarkable adaptability and initiative, she has repeatedly taken on responsibilities across different areas of the Institute, at times independently completing projects originally intended for entire teams.",
      "Her ability to work across disciplines, deliver consistently, and take ownership of complex assignments has made her an invaluable contributor to IEA’s work. She remains one of the Institute’s most trusted and indispensable members.",
    ],
    contact: [
      { label: "Email", value: "coo@ieainstitute.org", href: "mailto:coo@ieainstitute.org" },
    ],
  },
  "tikaram-sharma": {
    bio: [
      "Tikaram Sharma joined the Institute for Educational Accountability in the first quarter of 2026 as a Statistical Analyst.",
      "In the months that followed, he was named a Co-Founder in recognition of his substantial contributions to the Institute’s data analysis and statistical work.",
      "His analytical contributions have been particularly instrumental in the development and execution of IEA’s survey initiatives, one of the Institute’s major undertakings, helping inform the Institute’s evidence base and public reporting.",
    ],
    focus: [
      "Data analysis and statistics",
      "Survey initiatives",
      "Interpretation and presentation of findings",
    ],
  },
  "prajjwal-dhakal": {
    bio: [
      "Prajjwal Dhakal was associated with the Institute for Educational Accountability from the earliest stages of its establishment and serves as Management Advisor in recognition of his substantial support.",
      "His early commitment and financial assistance helped provide the resources necessary for the organisation to establish its initial operations and pursue its institutional objectives.",
    ],
  },
  "aishani-rai": {
    bio: [
      "Aishani Rai joined the Institute for Educational Accountability in mid-2026 as a volunteer and was subsequently appointed Research Analyst.",
      "Within months of her initial appointment, she was named Editorial Lead in recognition of her contributions to the Institute’s leadership, organisational management, and editorial work.",
      "Since then, she has played a significant role in developing and reviewing IEA’s reports, particularly those concerning human rights abuses, helping shape the presentation, clarity, and credibility of the Institute’s work.",
    ],
    focus: [
      "Editorial leadership",
      "Development and review of reports",
      "Organisational management",
    ],
  },
  "ashmit-pandey": {},
  "abhinash-poudel": {
    bio: [
      "Abinash Poudel joined the Institute for Educational Accountability in late 2026 as a Research Analyst.",
      "Within weeks of his appointment, he distinguished himself through sustained dedication to online research, making substantial contributions to the Institute’s identification and documentation of relevant incidents and evidence.",
      "His work has been particularly significant in uncovering instances of reported violations through extensive digital research, source examination, and the identification of relevant evidence.",
      "He subsequently assumed responsibility for leading IEA’s online research efforts.",
    ],
    focus: [
      "Online research",
      "Identification and documentation of reported abuses",
      "Source examination and evidence",
    ],
  },
  "kaustuv-rimal": {},
  "nischal-ghimire": {
    bio: [
      "Nischal Ghimire joined the Institute for Educational Accountability in the first quarter of 2026, initially contributing to the Institute’s development work before transitioning into a research role.",
      "During IEA’s survey initiatives, he demonstrated considerable dedication and made substantial contributions to the research process.",
      "In recognition of his work and commitment, he was subsequently appointed Research Executive, where he contributes to the Institute’s research activities and wider investigative efforts.",
    ],
    focus: [
      "Research activities",
      "Survey research",
      "Investigative efforts",
    ],
  },
  "aaditya-jha": {},
  "krinjal-timalsina": {
    summary: "Leads IEA’s research and coordination work.",
    bio: [
      "Krinjal Timalsina joined the Institute for Educational Accountability as a volunteer and has since progressed through several research positions, serving successively as a Research Analyst, Research Associate, and Research Executive before assuming her current role as Lead Researcher.",
      "Throughout her time at IEA, she has demonstrated remarkable initiative, dedication, and versatility. She is particularly distinguished by her willingness to take on responsibilities independently, proactively identify areas requiring attention, and contribute beyond her assigned duties. She has also consistently supported fellow team members, often taking the initiative to assist with their work and coordinate efforts across the Institute.",
      "In addition to her research responsibilities, she contributes significantly to IEA’s social media and related communications work. Her initiative, collaborative approach, and consistent willingness to take responsibility have made her an important contributor to the Institute’s operations and research activities.",
    ],
    focus: [
      "Research and analysis",
      "Research coordination and team support",
      "Social media and digital communications",
      "Organisational initiatives",
    ],
    contact: [
      { label: "Email", value: "krinjal@ieainstitute.org", href: "mailto:krinjal@ieainstitute.org" },
    ],
  },
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

/**
 * Contact lines for a member's page.
 *
 * Anything written under `contact` in `profiles` wins (the founder uses his own
 * address). Everyone else gets the Institute's standard `firstname@ieainstitute.org`.
 */
export function memberContact(c: Contributor): NonNullable<MemberProfile["contact"]> {
  const explicit = profiles[c.id]?.contact;
  if (explicit?.length) return explicit;
  const first = c.name.split(/\s+/)[0]!.toLowerCase().replace(/[^a-z]/g, "");
  const email = `${first}@ieainstitute.org`;
  return [{ label: "Email", value: email, href: `mailto:${email}` }];
}
