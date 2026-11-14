import { Link } from "react-router";

import { CountUp } from "@/components/site/CountUp";
import { FINDINGS } from "@/components/notices/PreliminaryFindings";
import { DISCRIMINATION_NOTICE } from "@/data/notices";

/**
 * The headline figures of the discrimination research, set as a ruled row in the
 * same idiom as the stats row beneath it, so it reads as part of the masthead
 * rather than a banner laid on top. Short captions here; the notice carries the
 * full wording and the qualifications, and the row links straight to it.
 */
export function FindingsBand() {
  return (
    <section aria-label="Preliminary findings on discrimination in schools" className="mt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className="type-label text-bronze-ink">Preliminary findings · research on discrimination</p>
        <Link
          to={`/notices#${DISCRIMINATION_NOTICE.id}`}
          className="type-caption text-bronze-ink underline decoration-1 underline-offset-4 hover:decoration-2"
        >
          Read the notice &rarr;
        </Link>
      </div>

      <ul className="mt-3 grid grid-cols-3 border-y border-rule-soft">
        {FINDINGS.map((f, i) => (
          <li key={f.value} className={i > 0 ? "min-w-0 border-l border-rule-soft px-3 py-4 sm:px-5" : "min-w-0 py-4 pl-0 pr-3 sm:pr-5"}>
            <p className="type-caption h-4 text-[0.6rem] uppercase tracking-[0.12em] text-ink-faint sm:text-[0.65rem]">
              {f.approx ? "Approximately" : ""}
            </p>
            <p className="mt-0.5 font-serif text-3xl font-bold leading-none text-bronze-ink sm:text-5xl">
              <CountUp to={f.value} suffix="%" durationMs={1600} delayMs={i * 160} />
            </p>
            <p className="type-caption mt-2 text-[0.7rem] leading-snug text-ink-muted sm:text-sm">
              <span className="font-bold text-ink">of respondents</span> {f.short}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
