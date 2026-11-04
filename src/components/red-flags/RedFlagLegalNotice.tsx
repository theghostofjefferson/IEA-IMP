import { Link } from "react-router";

/**
 * Notice of revision for the institutional review initiative.
 *
 * Replaces the earlier collapsible legal notice. It says one thing, briefly,
 * and points to the statement of 31 October 2026 that explains why.
 */
export function RedFlagLegalNotice() {
  return (
    <aside
      aria-label="Notice of revision"
      style={{ borderLeft: "3px solid var(--claret)" }}
      className="my-6 flex items-start gap-4 rounded-md border border-gold/35 bg-ink/55 px-5 py-4 backdrop-blur-sm sm:px-6 sm:py-5"
    >
      <span
        aria-hidden="true"
        className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-gold/50 font-serif text-sm font-bold text-gold"
      >
        §
      </span>
      <div className="min-w-0">
        <p className="type-label text-gold">Notice of revision</p>
        <p className="type-body measure mt-2 text-ink-inverse/90">
          Substantial changes have been made to this page in line with our notice of 31 October
          2026.
        </p>
        <Link
          to="/notices#statement"
          className="type-caption mt-3 inline-block text-gold underline decoration-1 underline-offset-4 hover:decoration-2"
        >
          Read the notice <span aria-hidden="true">→</span>
        </Link>
      </div>
    </aside>
  );
}
