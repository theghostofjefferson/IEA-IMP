import type { CSSProperties } from "react";

import { CountUp } from "@/components/site/CountUp";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

type Finding = {
  value: number;
  /** The source text says "approximately" for two of the three figures and not the third; this keeps it that way. */
  approx: boolean;
  text: string;
};

const FINDINGS: Finding[] = [
  { value: 82, approx: true, text: "reported observing preferential treatment by teachers." },
  {
    value: 67,
    approx: false,
    text: "reported personally experiencing less favourable treatment, either sometimes or regularly.",
  },
  {
    value: 49,
    approx: true,
    text: "reported observing or experiencing differences they believed might be associated with skin colour, ethnicity, or geographical background.",
  },
];

/**
 * The headline figures of the discrimination research, set as large as the
 * notice allows: a big numeral that counts up, a bar showing the share, and one
 * line saying what was measured. The exact wording of the finding follows as
 * prose, so the numbers are never separated from their qualifications.
 */
export function PreliminaryFindings() {
  return (
    <section aria-labelledby="prelim-heading" className="border-y border-gold/30 py-8 md:py-10">
      <h3 id="prelim-heading" className="type-label text-gold">
        Preliminary findings
      </h3>

      <ul className="mt-6 grid gap-8 md:grid-cols-3 md:gap-6">
        {FINDINGS.map((f, i) => (
          <Stat key={f.value} finding={f} index={i} />
        ))}
      </ul>

      <p className="type-body-lg measure mt-8 text-ink-inverse/90">
        The preliminary findings suggest that unequal treatment is a recurring concern in students&rsquo; educational
        experiences. Approximately 82% of respondents reported observing preferential treatment by teachers, while 67%
        reported personally experiencing less favourable treatment, either sometimes or regularly. Furthermore,
        approximately 49% reported observing or experiencing differences they believed might be associated with skin
        colour, ethnicity, or geographical background.
      </p>
    </section>
  );
}

function Stat({ finding, index }: { finding: Finding; index: number }) {
  const { ref, visible } = useReveal<HTMLLIElement>();
  return (
    <li
      ref={ref}
      className={cn("finding", visible && "finding-on")}
      style={{ "--i": index } as CSSProperties}
    >
      <p className="type-label h-4 text-ink-inverse/60">{finding.approx ? "Approximately" : ""}</p>
      <p className="mt-1 font-serif text-7xl font-bold leading-none text-gold md:text-8xl">
        <CountUp to={finding.value} suffix="%" durationMs={1700} delayMs={index * 180} />
      </p>
      <div aria-hidden="true" className="mt-4 h-1 w-full overflow-hidden rounded-full bg-ink-inverse/15">
        <div className="finding-fill h-full rounded-full bg-gold" style={{ width: `${finding.value}%` }} />
      </div>
      <p className="type-body mt-4 text-ink-inverse">
        <span className="font-bold">of respondents</span> {finding.text}
      </p>
    </li>
  );
}
