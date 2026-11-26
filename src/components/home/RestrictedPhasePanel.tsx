import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { inRestrictedPhase, RESTRICTED_PHASE_LINE, RESTRICTIONS } from "@/config/restrictions";

/**
 * The home page's explicit statement of the restricted phase, with the way in
 * for anyone who wants to join. Shown while `restrictedPhase` is on.
 */
export function RestrictedPhasePanel() {
  if (!inRestrictedPhase()) return null;

  const limits = [
    RESTRICTIONS.hideAllMemberNames || RESTRICTIONS.hideLeadershipNames
      ? "Names and identifying details of members are withheld."
      : null,
    RESTRICTIONS.hideUnderReview ? "The institutions under review are not named." : null,
    RESTRICTIONS.blurMemberPhotos ? "Member portraits are blurred or withheld." : null,
    "Some institutional records and administrative details may be restricted or removed.",
  ].filter((x): x is string => !!x);

  return (
    <section
      aria-labelledby="phase-title"
      className="mt-8 rounded-md border border-ink-inverse/10 border-l-[6px] border-l-gold bg-ink p-6 text-ink-inverse shadow-[0_26px_60px_-28px_rgba(19,26,44,0.8)] sm:p-9"
    >
      <p className="type-label text-gold">Restricted phase</p>
      <h2 id="phase-title" className="type-title mt-3 max-w-[46rem] text-ink-inverse">
        The Institute is in a restricted phase.
      </h2>
      <p className="type-body-lg mt-4 max-w-[46rem] text-ink-inverse/90">
        {RESTRICTED_PHASE_LINE} The Institute remains operational, and its research and publications continue.
      </p>
      <ul className="mt-5 grid max-w-[46rem] gap-2">
        {limits.map((l) => (
          <li key={l} className="type-body flex gap-3 text-ink-inverse/85">
            <span aria-hidden="true" className="text-gold">&#9670;</span>
            {l}
          </li>
        ))}
      </ul>
      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button asChild>
          <Link to="/recruits">Want to join us? Apply here</Link>
        </Button>
        <Link
          to="/notices#restrictions"
          className="type-caption text-gold underline underline-offset-4 hover:decoration-2"
        >
          Read the notice from the Office of the Founder &rarr;
        </Link>
      </div>
    </section>
  );
}
