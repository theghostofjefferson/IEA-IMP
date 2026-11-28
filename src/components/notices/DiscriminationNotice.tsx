import { Link } from "react-router";

import { PreliminaryFindings } from "@/components/notices/PreliminaryFindings";
import { DISCRIMINATION_NOTICE } from "@/data/notices";

type Excerpt = {
  context: string;
  highlight: string;
  source: string;
};

/**
 * Highlights only, each with a short paraphrased context. The students' wording
 * inside the quotation marks is verbatim; everything outside them is the
 * Institute's own summary.
 */
const EXCERPTS: Excerpt[] = [
  {
    context:
      "A student reflects on how academic standing dictates classroom hierarchy, and who gets left behind when they don\u2019t top the exam.",
    highlight:
      "The student who scores high in the exam gets better treatment, and those who don\u2019t are denied the encouragement to improve.",
    source: "Student submission \u00b7 School identity withheld",
  },
  {
    context:
      "A student describes being repeatedly singled out over their complexion, explaining how remarks framed as classroom humour leave a lasting mark.",
    highlight:
      "Even when comments about my darker skin tone are presented as jokes, they hurt\u2014and teachers still use complexion nicknames.",
    source: "Student submission \u00b7 School identity withheld",
  },
  {
    context:
      "A student recounts watching classmates from the Terai region targeted in front of peers over where they come from.",
    highlight:
      "Students from the Terai are referred to through derogatory nicknames\u2014it becomes a way of singling them out.",
    source: "Student submission \u00b7 School identity withheld",
  },
  {
    context:
      "A student describes how teachers\u2019 casual assumptions quietly dictate which doors open for boys versus girls in school activities.",
    highlight:
      "Teachers make assumptions about which activities boys or girls are suited for, deciding opportunities before we even try.",
    source: "Student submission \u00b7 School identity withheld",
  },
];

export function DiscriminationNotice() {
  return (
    <details
      id={DISCRIMINATION_NOTICE.id}
      open
      className="group scroll-mt-24 overflow-hidden rounded-md border border-l-4 border-ink-inverse/10 border-l-gold bg-ink text-ink-inverse shadow-[0_18px_40px_-28px_rgba(19,26,44,0.6)] transition-shadow duration-500 open:shadow-[0_26px_55px_-28px_rgba(19,26,44,0.8)]"
    >
      <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-5 sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden="true"
          className="inline-flex size-11 shrink-0 items-center justify-center border border-gold/70 font-serif text-3xl leading-none text-gold"
        >
          &ldquo;
        </span>
        <span className="min-w-0 flex-1">
          <span className="type-label block text-gold">
            IEA notice · <time dateTime={DISCRIMINATION_NOTICE.date}>{DISCRIMINATION_NOTICE.dateLabel}</time>
          </span>
          <span className="type-heading mt-1 block text-ink-inverse">{DISCRIMINATION_NOTICE.title}</span>
          <span className="type-caption mt-2 block text-ink-inverse/65">{DISCRIMINATION_NOTICE.standfirst}</span>
        </span>
        <span className="type-caption hidden shrink-0 text-gold sm:block">
          Read notice{" "}
          <span aria-hidden="true" className="inline-block transition-transform duration-300 group-open:rotate-45">
            +
          </span>
        </span>
      </summary>

      <article className="border-t border-gold/30 px-5 py-6 sm:px-7 md:py-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-8">
          <p className="type-body-lg measure">
            The Institute for Educational Accountability (IEA) is nearing the conclusion of its landmark multi-province
            investigation into classroom conduct, unequal treatment, and institutional fairness across Nepali
            educational institutions. Drawing on extensive testimony and survey data collected from students across
            multiple provinces, cities, and school systems, we are releasing an initial snapshot of the findings ahead
            of our final Q1 2027 report.
          </p>
          <p className="type-body measure text-ink-inverse/85">
            First, the preliminary numbers point to a systemic pattern, one that students directly link to the overall
            quality of their education. Below that, we are sharing selected excerpts directly from students&rsquo;
            written submissions. Each passage has been edited for length and privacy, with the line that stayed with us
            set in larger type, accompanied by our editorial context.
          </p>

          <PreliminaryFindings />

          <p className="type-label -mb-2 text-gold">In students&rsquo; words</p>

          <ul className="flex flex-col gap-8">
            {EXCERPTS.map((e) => (
              <li key={e.highlight} className="flex flex-col gap-3">
                <p className="type-caption text-ink-inverse/70">{e.context}</p>
                <blockquote className="m-0 border-l-2 border-gold pl-4">
                  <p className="type-heading m-0 text-ink-inverse">
                    &ldquo;{e.highlight}&rdquo;
                  </p>
                </blockquote>
                <p className="type-label text-gold/90">{e.source}</p>
              </li>
            ))}
          </ul>

          <p className="type-body measure border-l-2 border-gold/70 pl-4">
            These are individual accounts, quoted in part and anonymized to protect student privacy. Nothing here is a
            formal conclusion about any individual school or educator. Have an experience to share? Submit a
            confidential report through{" "}
            <Link to="/report-a-concern" className="font-bold text-gold underline underline-offset-4">
              our portal
            </Link>{" "}
            or write directly to{" "}
            <a href="mailto:help@ieainstitute.org" className="font-bold text-gold underline underline-offset-4">
              help@ieainstitute.org
            </a>
            .
          </p>
        </div>
      </article>
    </details>
  );
}
