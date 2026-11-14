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
    context: "A student describes being treated differently from classmates with lighter skin.",
    highlight: "They would treat the whiter than milk girls/guys as their own kids but not me.",
    source: "Student submission · School not stated",
  },
  {
    context:
      "A student says a lecturer sometimes remarks on classmates' accents in front of the whole class. They believe she means no harm, but that for students from outside central Kathmandu it becomes a way of being picked out.",
    highlight: "It feels like singling them out.",
    source: "Student submission · School identity withheld",
  },
  {
    context:
      "A student who has mostly had good teachers says they have seen friends treated differently because of gender and skin colour, mainly through teachers' jokes. They have not witnessed worse first-hand, but say they have heard of it.",
    highlight: "The jokes that some teachers make (‘kale’ being the most common).",
    source: "Student submission · School identity withheld",
  },
  {
    context:
      "A student says teachers showed little regard for students' mental health and used hurtful language, and that misbehaviour was met with force rather than care.",
    highlight: "Bullying is not taken seriously and physical violence is justified.",
    source: "Student submission · School identity withheld",
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
            The Institute is nearing the end of its research into discrimination in schools. Among the written
            submissions we received from students, we want to share a few passages now. They are shortened, with the
            line that stayed with us set in larger type, and the context around each is our own summary. First, the
            preliminary findings.
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
            These are individual accounts, quoted in part and as submitted. They are not findings: the Institute has not
            independently verified them, and nothing here is a conclusion about any school. If you have an experience
            you would like to share, you can{" "}
            <Link to="/report-a-concern" className="font-bold text-gold underline underline-offset-4">
              report it to us
            </Link>{" "}
            or write to{" "}
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
