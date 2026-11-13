import { Fragment, type CSSProperties } from "react";

import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

/**
 * The closing statement of the home page: a full-width band in the warm ivory wash,
 * so it is the last thing a reader meets before the footer and the one place on
 * the page that is a pause rather than information. Light, because the footer
 * below it is dark and carries its own Madison line.
 *
 * Federalist No. 47 (1788), the founding argument against concentrated power.
 *
 * On first view the ornament draws outward from the diamond, the words arrive
 * one after another, and the attribution settles last. Screen readers get the
 * whole quote at once (the animated words are `aria-hidden`), and reduced
 * motion collapses every transition to instant.
 */
const LEAD =
  "“The accumulation of all powers, legislative, executive, and judiciary, in the same hands [schools], whether of one, a few, or many, and whether hereditary, self-appointed, or elective, may justly be pronounced";
const EMPHASIS = "the very definition of tyranny [oppression]";
const TAIL = ".”";

const LEAD_WORDS = LEAD.split(" ");
const EMPHASIS_WORDS = EMPHASIS.split(" ");
const TOTAL = LEAD_WORDS.length + EMPHASIS_WORDS.length;

function Words({ words, offset, className }: { words: string[]; offset: number; className?: string }) {
  return (
    <>
      {words.map((w, k) => (
        <Fragment key={k}>
          <span aria-hidden="true" className={cn("quote-word", className)} style={{ "--i": offset + k } as CSSProperties}>
            {w}
          </span>
          {k < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

export function MadisonQuote() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section aria-label="James Madison, Federalist No. 47" className="mt-20 border-y border-rule-soft bg-bronze-wash md:mt-28">
      <div ref={ref} className={cn("mx-auto max-w-[62rem] px-6 py-16 text-center md:px-10 md:py-24", visible && "quote-on")}>
        <figure className="m-0">
          <div aria-hidden="true" className="mx-auto mb-8 flex items-center justify-center gap-4">
            <span className="quote-line quote-line-l h-px w-12 bg-bronze/50 md:w-20" />
            <span className="quote-diamond size-1.5 border border-bronze" />
            <span className="quote-line quote-line-r h-px w-12 bg-bronze/50 md:w-20" />
          </div>

          <blockquote
            className="m-0 font-serif text-ink"
            style={{ fontSize: "clamp(1.45rem, 1.05rem + 1.7vw, 2.35rem)", lineHeight: 1.35 }}
          >
            <p className="m-0 text-balance">
              <span className="sr-only">
                {LEAD} {EMPHASIS}
                {TAIL}
              </span>
              {/* Words are separate inline-blocks joined by ordinary spaces so lines still wrap naturally. */}
              <Words words={LEAD_WORDS} offset={0} />{" "}
              <Words
                words={EMPHASIS_WORDS.map((w, k) => (k === EMPHASIS_WORDS.length - 1 ? w + TAIL : w))}
                offset={LEAD_WORDS.length}
                className="text-bronze-ink"
              />
            </p>
          </blockquote>

          <figcaption
            className="quote-cite mt-8 text-[0.72rem] uppercase tracking-[0.24em] text-ink-muted md:mt-10"
            style={{ "--n": TOTAL } as CSSProperties}
          >
            James Madison <span aria-hidden="true">·</span> Federalist No. 47
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
