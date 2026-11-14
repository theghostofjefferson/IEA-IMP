import { Link } from "react-router";

import { Container } from "@/components/site/Container";
import { CountUp } from "@/components/site/CountUp";
import { FINDINGS } from "@/components/notices/PreliminaryFindings";
import { DISCRIMINATION_NOTICE } from "@/data/notices";

/**
 * The first thing on the front page: the three headline figures from the
 * discrimination research, as large as the page allows, in a full-width dark band
 * directly under the masthead. Short captions here; the notice carries the full
 * wording and the qualifications, and the band links straight to it.
 */
export function FindingsBand() {
  return (
    <section aria-label="Preliminary findings on discrimination in schools" className="bg-ink text-ink-inverse">
      <Container>
        <div className="py-8 md:py-12">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <p className="type-label text-gold">Preliminary findings · IEA research on discrimination</p>
            <Link
              to={`/notices#${DISCRIMINATION_NOTICE.id}`}
              className="type-caption text-gold underline decoration-1 underline-offset-4 hover:decoration-2"
            >
              Read the notice &rarr;
            </Link>
          </div>

          <ul className="mt-6 grid grid-cols-3 gap-3 sm:gap-6 md:mt-8 md:gap-10">
            {FINDINGS.map((f, i) => (
              <li key={f.value} className="min-w-0">
                <p className="type-label h-4 text-[0.6rem] text-ink-inverse/60 sm:text-xs">
                  {f.approx ? "Approximately" : ""}
                </p>
                <p className="mt-1 font-serif text-[2.6rem] font-bold leading-none text-gold sm:text-7xl md:text-8xl lg:text-9xl">
                  <CountUp to={f.value} suffix="%" durationMs={1800} delayMs={i * 200} />
                </p>
                <p className="type-caption mt-3 text-ink-inverse/85 sm:mt-4 sm:text-base">
                  <span className="font-bold">of respondents</span> {f.short}
                </p>
              </li>
            ))}
          </ul>

          <p className="type-caption mt-8 text-ink-inverse/55">
            Preliminary findings, shown as approximate figures. The notice sets out the full wording.
          </p>
        </div>
      </Container>
    </section>
  );
}
