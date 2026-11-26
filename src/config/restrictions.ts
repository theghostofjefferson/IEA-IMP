/**
 * TEMPORARY RESTRICTIONS — the on/off switches.
 *
 * IEA is going heavily public, so two things are withheld for now and will be
 * relaxed gradually. Everything is driven from this one file:
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

export function isHiddenPerson(id: string): boolean {
  return RESTRICTIONS.hideLeadershipNames && HIDDEN_PERSON_IDS.includes(id);
}

/** Replace the hidden names inside a piece of prose. A no-op when the switch is off. */
export function redactNames(text: string): string {
  if (!RESTRICTIONS.hideLeadershipNames) return text;
  return HIDDEN_PERSON_NAMES.reduce((t, n) => t.split(n).join(WITHHELD_NAME), text);
}
