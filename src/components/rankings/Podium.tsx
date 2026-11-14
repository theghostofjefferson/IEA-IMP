import { Link } from "react-router";

import { Monogram } from "@/components/data-display/Monogram";
import { useReveal } from "@/hooks/useReveal";
import { topSchools } from "@/lib/data";
import { band } from "@/lib/scoring";
import type { School } from "@/lib/types";
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

const R = 30;
const CIRC = 2 * Math.PI * R;

/** Accent for each place: a thin top rule, nothing louder. */
const ACCENT = ["bg-gold", "bg-ink-faint", "bg-bronze"] as const;

/**
 * The top three schools, set apart above the table.
 *
 * On a wide screen the first place stands in the middle and a little taller; on
 * a phone the cards stack in rank order. Each score is drawn as a ring that
 * fills the first time the card is seen. Rank here is the published rank and
 * nothing else: no filter or sort changes who is shown, and the whole block is
 * hidden while a search or filter is active, because "top three" would then
 * mislead.
 */
export function Podium() {
  const top = topSchools(3);
  // Visual order on wide screens: 2, 1, 3. DOM and reading order stay 1, 2, 3.
  return (
    <section aria-label="Top three schools" className="pt-8 md:pt-10">
      <ol className="grid gap-4 md:grid-cols-3 md:items-end md:gap-5">
        {top.map((school, i) => (
          <PodiumCard key={school.id} school={school} place={i} />
        ))}
      </ol>
    </section>
  );
}

function PodiumCard({ school, place }: { school: School; place: number }) {
  const { ref, visible } = useReveal<HTMLLIElement>();
  const first = place === 0;
  const pct = Math.max(0, Math.min(1, school.overallScore / 100));
  const tone = band(school.overallScore);

  return (
    <li
      ref={ref}
      className={cn(
        "rk-rise",
        visible && "rk-rise-on",
        place === 0 && "md:order-2",
        place === 1 && "md:order-1",
        place === 2 && "md:order-3",
      )}
      style={{ "--d": place === 0 ? 0 : place === 1 ? 1 : 2 } as CSSProperties}
    >
      <Link
        to={`/school/${school.id}`}
        aria-label={`${school.name}, rank ${school.rank}, overall ${school.overallScore.toFixed(1)}`}
        className={cn(
          "group relative block overflow-hidden border border-rule-soft bg-surface transition-[border-color,background-color,transform] duration-300 ease-brand hover:-translate-y-0.5 hover:border-bronze hover:bg-bronze-wash",
          first ? "px-6 pb-8 pt-8 md:pb-12 md:pt-10" : "px-6 pb-6 pt-7",
        )}
      >
        <span aria-hidden="true" className={cn("absolute inset-x-0 top-0 h-[3px]", ACCENT[place])} />

        <p className="type-label text-bronze-ink">No. {school.rank}</p>

        <div className="mt-4 flex items-center gap-4">
          <Monogram name={school.name} label={school.initials} size={first ? "xl" : "lg"} />
          <div className="min-w-0">
            <p className="font-serif text-lg font-bold leading-snug text-ink group-hover:underline">{school.name}</p>
            <p className="type-caption mt-0.5 text-ink-faint">
              {school.type} · {school.location}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <div className={cn("podium-ring-wrap relative size-[4.5rem] shrink-0", visible && "podium-on")}>
            <svg viewBox="0 0 72 72" className="size-full -rotate-90" aria-hidden="true">
              <circle cx="36" cy="36" r={R} fill="none" strokeWidth="4" className="stroke-sunken" />
              <circle
                cx="36"
                cy="36"
                r={R}
                fill="none"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                style={{ "--off": CIRC * (1 - pct) } as CSSProperties}
                className={cn(
                  "podium-ring",
                  tone === "strong" && "stroke-band-strong",
                  tone === "fair" && "stroke-band-fair",
                  tone === "weak" && "stroke-band-weak",
                )}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-serif text-lg font-bold tabular-nums text-ink">
              {school.overallScore.toFixed(1)}
            </span>
          </div>
          <p className="type-caption text-ink-muted">Overall score out of 100</p>
        </div>
      </Link>
    </li>
  );
}
