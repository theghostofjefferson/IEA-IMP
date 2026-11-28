import { contributors } from "@/data/contributors";

/**
 * TEMPORARY RESTRICTIONS — the on/off switches.
 *
 * IEA is going heavily public, so two things are withheld for now and will be
 * relaxed gradually. Everything is driven from this one file:
 *
 *   restrictedPhase      true  = a banner on every page and a statement on the
 *                                home page say, explicitly, that IEA is in a
 *                                restricted phase and its website is being
 *                                restricted, and invite people to join at
 *                                /recruits.
 *                        false = no banner or statement. (The other switches
 *                                below still apply on their own.)
 *
 *   attackMode           true  = the whole site is replaced by the "under
 *                                attack, inaccessible" page, except the paths in
 *                                `ATTACK_MODE_OPEN_PATHS`.
 *                        false = the site is served as normal.
 *
 *   hideSchoolNames      true  = the ranked schools' names are withheld in the
 *                                ranking, school pages, search and the Night
 *                                Sky. Ranks, bands and scores still show.
 *                        false = names show as normal.
 *
 *   hideAllMemberNames   true  = EVERY member's name is locked: "Name withheld"
 *                                with a lock on cards, no profile pages, no
 *                                search or sitemap entries, no names in the
 *                                notices or intro. Roles stay. This covers
 *                                everything `hideLeadershipNames` does and more.
 *                        false = only the people below are locked.
 *
 *   hideLeadershipNames  true  = the Founder's and President's names are
 *                                hidden everywhere on the site: cards, profile
 *                                pages, letters and signatures, the personnel
 *                                notice and its image, search and the sitemap.
 *                        false = names show as normal.
 *
 *   hideUnderReview      true  = the names and review items of the
 *                                institutions under review are hidden. The
 *                                pages stay up with the count and a note that
 *                                the details are temporarily restricted.
 *                        false = full pages as normal.
 *
 *   blurMemberPhotos     true  = every member portrait is blurred and
 *                                greyscale, on cards, profile pages and the
 *                                intro strip, including on hover.
 *                        false = portraits show as normal.
 *
 * To turn one off: change `true` to `false` and deploy. Nothing else needs
 * editing. (`scripts/build-sitemap.mjs` reads this file, so keep each switch on
 * a single `name: true|false,` line.)
 *
 * What it cannot do: it hides names in the pages, not files in `public/`. The
 * portrait files for the two people stay reachable at their old URLs. Delete
 * them from `public/people/` if that matters too.
 */
export const RESTRICTIONS = {
  restrictedPhase: true,
  attackMode: false,
  hideSchoolNames: false,
  hideAllMemberNames: true,
  hideLeadershipNames: true,
  hideUnderReview: true,
  blurMemberPhotos: true,
};

export const PHOTO_NOTE = "Member portraits are blurred for now, in line with these temporary restrictions.";

/** The class that blurs a portrait, or nothing when `blurMemberPhotos` is off. */
export function photoBlurClass(): string {
  return RESTRICTIONS.blurMemberPhotos ? "photo-blur" : "";
}

/** People whose names are withheld while `hideLeadershipNames` is on. */
export const HIDDEN_PERSON_IDS: readonly string[] = ["eron-subedi", "yogeshwor-sharma"];

/** Names as they appear in prose, for the text scrub in `redactNames`. */
export const HIDDEN_PERSON_NAMES: readonly string[] = ["Eron Subedi", "Yogeshwor Sharma"];

export const WITHHELD_NAME = "Name withheld";
export const RESTRICTED_LABEL = "Temporarily restricted";

export const ALL_NAMES_NOTE =
  "Member names are temporarily restricted while IEA goes heavily public. Roles are shown; names will be restored gradually.";
export const LEADERSHIP_NOTE =
  "The names of the Founder and the President are temporarily restricted while IEA goes heavily public. This will be adjusted gradually.";
export const UNDER_REVIEW_NOTE =
  "The names and details of institutions under review are temporarily restricted while IEA goes heavily public. This will be adjusted gradually.";

export function hidesLeadership(): boolean {
  return RESTRICTIONS.hideLeadershipNames;
}

export function hidesUnderReview(): boolean {
  return RESTRICTIONS.hideUnderReview;
}

export function hidesAllNames(): boolean {
  return RESTRICTIONS.hideAllMemberNames;
}

export function isHiddenPerson(id: string): boolean {
  if (RESTRICTIONS.hideAllMemberNames) return true;
  return RESTRICTIONS.hideLeadershipNames && HIDDEN_PERSON_IDS.includes(id);
}

/** Is this member's name withheld right now? Looks the person up by name. */
export function isHiddenName(name: string): boolean {
  if (RESTRICTIONS.hideAllMemberNames) return contributors.some((c) => c.name === name);
  const c = contributors.find((x) => x.name === name);
  return !!c && isHiddenPerson(c.id);
}

/** The name to show for a member: the real one, or "Name withheld". */
export function shownName(name: string): string {
  return isHiddenName(name) ? WITHHELD_NAME : name;
}

/** Replace the hidden names inside a piece of prose. A no-op when the switch is off. */
export function redactNames(text: string): string {
  if (!RESTRICTIONS.hideLeadershipNames && !RESTRICTIONS.hideAllMemberNames) return text;
  const names = RESTRICTIONS.hideAllMemberNames ? contributors.map((c) => c.name) : HIDDEN_PERSON_NAMES;
  return names.reduce((t, n) => t.split(n).join(WITHHELD_NAME), text);
}

/** Paths that stay reachable while `attackMode` is on. */
export const ATTACK_MODE_OPEN_PATHS: readonly string[] = ["/recruits"];

export function isAttackModeBlocking(pathname: string): boolean {
  if (!RESTRICTIONS.attackMode) return false;
  const p = pathname.replace(/\/+$/, "") || "/";
  return !ATTACK_MODE_OPEN_PATHS.includes(p);
}

export function inRestrictedPhase(): boolean {
  return RESTRICTIONS.restrictedPhase;
}

export const RESTRICTED_PHASE_LINE =
  "During this phase, we are restricting the website of the Institute for Educational Accountability.";

export const SCHOOL_WITHHELD = "School withheld";
export const SCHOOL_NAMES_NOTE =
  "School names are temporarily restricted while IEA goes heavily public. Ranks, bands and scores are shown; names will be restored gradually.";

export function hidesSchoolNames(): boolean {
  return RESTRICTIONS.hideSchoolNames;
}
