import { Link, useLocation } from "react-router";

import { inRestrictedPhase, RESTRICTED_PHASE_LINE } from "@/config/restrictions";

/**
 * A slim bar above the masthead on every page while the site is in its
 * restricted phase (`restrictedPhase` in src/config/restrictions.ts).
 */
export function PhaseBanner() {
  const { pathname } = useLocation();
  if (!inRestrictedPhase()) return null;
  const onRecruits = pathname.replace(/\/+$/, "") === "/recruits";

  return (
    <aside
      aria-label="Restricted phase"
      className="phase-banner border-b border-gold/40 bg-ink px-4 py-2.5 text-center text-ink-inverse"
    >
      <p className="type-caption mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <span className="type-label text-gold">Restricted phase</span>
        <span className="text-ink-inverse/90">{RESTRICTED_PHASE_LINE}</span>
        {onRecruits ? null : (
          <Link to="/recruits" className="font-semibold text-gold underline underline-offset-4 hover:decoration-2">
            Want to join us? Apply here &rarr;
          </Link>
        )}
      </p>
    </aside>
  );
}
