import { useMemo, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router";

import { Monogram } from "@/components/data-display/Monogram";
import { useReveal } from "@/hooks/useReveal";
import { hidesUnderReview, RESTRICTED_LABEL, UNDER_REVIEW_NOTE } from "@/config/restrictions";
import { redFlags } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Fisher–Yates shuffle over a fresh copy, so the source array is never
 * mutated and every element has an equal chance at every position.
 */
function shuffled<T>(list: readonly T[]): T[] {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}

/**
 * The curated red-flag list, in a different order on every load.
 *
 * **No rank, no score.** The red-flag list is a separate set of schools with
 * published reasons, not a slice of the ranking. Shuffling is deliberate: a
 * fixed order would imply a severity ranking the site does not make, and a
 * repeat visitor should not see the same school first every time.
 *
 * Rendered on the `/rankings` red-flags view as a responsive grid of cards —
 * one column on a phone, two on `sm`, three on `lg`. Each card is a bordered
 * box with canvas-coloured gaps between them, so an incomplete last row never
 * leaves a dark void behind.
 */
function RedFlagItem({ column, children }: { column: number; children: ReactNode }) {
  const { ref, visible } = useReveal<HTMLLIElement>();
  return (
    <li ref={ref} className={cn("rf-reveal", visible && "rf-reveal-on")} style={{ "--d": column } as CSSProperties}>
      {children}
    </li>
  );
}

export function RedFlagList() {
  // Shuffled once per mount. A full page reload is a new mount, so the order
  // changes on every reload — the behaviour the page is specified to have.
  const list = useMemo(() => shuffled(redFlags), []);

  // Restricted: the institutions stay counted but unnamed, with no link and no reasons.
  if (hidesUnderReview()) {
    return (
      <div>
        <p className="type-body-lg measure text-ink-inverse/90">{UNDER_REVIEW_NOTE}</p>
        <ul className="red-flag-list mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
          {list.map((r, i) => (
            <RedFlagItem key={r.id} column={i % 3}>
              <div className="red-flag-card block h-full border border-rule-soft bg-canvas p-6">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-rule-soft text-ink-faint"
                  >
                    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="11" width="14" height="9" rx="1.5" />
                      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1 font-serif text-[1rem] font-bold text-ink">
                    Institution under review
                  </span>
                </div>
                <p className="type-caption mt-2 text-ink-muted">{RESTRICTED_LABEL}</p>
                <span className="type-caption mt-2 block text-ink-faint">
                  {r.reasons.length} review item{r.reasons.length === 1 ? "" : "s"} on record
                </span>
              </div>
            </RedFlagItem>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <ul className="red-flag-list grid grid-cols-1 gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((redFlag, i) => (
        <RedFlagItem key={redFlag.id} column={i % 3}>
          <Link
            to={`/red-flag/${redFlag.id}`}
            className="red-flag-card block h-full p-6 border border-rule-soft bg-canvas transition-colors hover:bg-bronze-wash"
          >
            <div className="flex items-center gap-3">
              <Monogram name={redFlag.name} size="lg" />
              <span className="min-w-0 flex-1 truncate font-serif text-[1rem] font-bold text-ink hover:underline">
                {redFlag.name}
              </span>
            </div>
            <p className="type-caption mt-2 line-clamp-2 text-ink-muted">
              {redFlag.reasons[0] ?? "Review items pending."}
            </p>
            <span className="type-caption mt-2 block text-ink-faint">
              {redFlag.reasons.length} review item{redFlag.reasons.length === 1 ? "" : "s"} · View details →
            </span>
          </Link>
        </RedFlagItem>
      ))}
    </ul>
  );
}
