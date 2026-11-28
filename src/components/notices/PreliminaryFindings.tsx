import type { CSSProperties } from "react";

import { CountUp } from "@/components/site/CountUp";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

export type Finding = {
  value: number;
  /** The scale in words, as the Institute phrases it: "Nearly 4 in 5". */
  lead: string;
  text: string;
  /** A shorter caption for tight spaces, such as the front-page band. Same claim, fewer words. */
  short: string;
  /** Shown in the front-page band, which has room for three. */
  home?: boolean;
};

export const FINDINGS: Finding[] = [
  {
    value: 79.8,
    lead: "Nearly 4 in 5",
    text: "of surveyed students reported observing teachers give preferential treatment to particular students, either sometimes or regularly.",
    short: "of surveyed students observed teachers give preferential treatment, sometimes or regularly",
    home: true,
  },
  {
    value: 69.8,
    lead: "Nearly 7 in 10",
    text: "believe that eliminating unequal treatment and disparities would produce at least moderate improvements in their school\u2019s academic environment, including 53.5% who anticipate considerable or significant academic gains.",
    short: "believe ending unequal treatment would improve their school\u2019s academic environment",
  },
  {
    value: 61.7,
    lead: "More than 3 in 5",
    text: "reported personally feeling that a teacher treated them less favourably than their peers.",
    short: "personally felt a teacher treated them less favourably than their peers",
    home: true,
  },
  {
    value: 41.5,
    lead: "Over 2 in 5",
    text: "reported observing or experiencing differences in teacher treatment they believed were linked to skin colour, ethnicity, or geographical background.",
    short: "observed or experienced treatment they linked to skin colour, ethnicity or background",
    home: true,
  },
  {
    value: 42.6,
    lead: "Nearly half",
    text: "reported that teachers fail to provide consistent, equal academic assistance and attention to all students regardless of background.",
    short: "said teachers do not give all students consistent, equal attention",
  },
];

/**
 * The headline figures of the discrimination research, set as large as the
 * notice allows: a big numeral that counts up, a bar showing the share, and one
 * line saying what was measured. The Institute's reading of them follows as
 * prose, so the numbers are never separated from their qualifications.
 */
export function PreliminaryFindings() {
  return (
    <section aria-labelledby="prelim-heading" className="border-y border-gold/30 py-8 md:py-10">
      <h3 id="prelim-heading" className="type-label text-gold">
        Preliminary findings
      </h3>

      <ul className="mt-6 grid gap-8 md:grid-cols-2 md:gap-x-10 md:gap-y-10 lg:grid-cols-3">
        {FINDINGS.map((f, i) => (
          <Stat key={f.value} finding={f} index={i} />
        ))}
      </ul>

      <p className="type-body-lg measure mt-8 text-ink-inverse/90">
        Taken together, these preliminary figures demonstrate that classroom disparities are not merely an abstract
        question of fairness. They directly shape learning outcomes and the broader academic environment. While academic
        performance was the single most cited factor behind differential attention, a substantial share of students
        pointed directly to complexion, regional origin, and personal identity, reinforcing why institutional reform is
        essential for elevating educational standards across Nepal.
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
      <p className="type-label min-h-4 text-ink-inverse/70">{finding.lead}</p>
      <p className="mt-1 font-serif text-7xl font-bold leading-none text-gold md:text-8xl">
        <CountUp to={finding.value} decimals={1} suffix="%" durationMs={1700} delayMs={index * 180} />
      </p>
      <div aria-hidden="true" className="mt-4 h-1 w-full overflow-hidden rounded-full bg-ink-inverse/15">
        <div className="finding-fill h-full rounded-full bg-gold" style={{ width: `${finding.value}%` }} />
      </div>
      <p className="type-body mt-4 text-ink-inverse">
        {finding.text}
      </p>
    </li>
  );
}
