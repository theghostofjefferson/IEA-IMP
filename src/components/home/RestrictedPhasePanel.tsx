import { Link } from "react-router";

import { inRestrictedPhase, RESTRICTED_PHASE_LINE, RESTRICTIONS } from "@/config/restrictions";

/**
 * A quiet statement under the hero while the site is in its restricted phase.
 * It sits below the page's own content so nothing above it moves.
 */
export function RestrictedPhasePanel() {
  if (!inRestrictedPhase()) return null;

  const withheld = [
    RESTRICTIONS.hideAllMemberNames || RESTRICTIONS.hideLeadershipNames ? "names" : null,
    RESTRICTIONS.hideSchoolNames ? "school names" : null,
    RESTRICTIONS.hideUnderReview ? "institutions under review" : null,
    RESTRICTIONS.blurMemberPhotos ? "portraits" : null,
  ].filter((x): x is string => !!x);

  return (
    <section
      aria-label="Restricted phase"
      className="mt-6 rounded-sm border border-rule-soft border-l-2 border-l-bronze bg-surface/60 px-5 py-4"
    >
      <p className="type-caption text-ink-muted">
        <span className="type-label mr-2 text-bronze-ink">Restricted phase</span>
        {RESTRICTED_PHASE_LINE}
        {withheld.length ? ` Withheld for now: ${withheld.join(", ")}.` : ""}{" "}
        <Link to="/recruits" className="font-semibold text-bronze-ink underline underline-offset-4 hover:decoration-2">
          Want to join us? Apply here &rarr;
        </Link>{" "}
        <Link to="/notices#restrictions" className="text-bronze-ink underline underline-offset-4 hover:decoration-2">
          Read the notice
        </Link>
      </p>
    </section>
  );
}
