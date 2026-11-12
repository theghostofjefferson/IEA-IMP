import { Reveal } from "@/components/site/Reveal";

/**
 * The closing statement of the home page: a full-width band in the warm ivory wash,
 * so it is the last thing a reader meets before the footer and the one place on
 * the page that is a pause rather than information. Light, because the footer
 * below it is dark and carries its own Madison line.
 *
 * Federalist No. 47 (1788), the founding argument against concentrated power.
 */
export function MadisonQuote() {
  return (
    <section aria-label="James Madison, Federalist No. 47" className="mt-20 border-y border-rule-soft bg-bronze-wash md:mt-28">
      <div className="mx-auto max-w-[62rem] px-6 py-16 text-center md:px-10 md:py-24">
        <Reveal>
          <figure className="m-0">
            <div aria-hidden="true" className="mx-auto mb-8 flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-bronze/50 md:w-20" />
              <span className="size-1.5 rotate-45 border border-bronze" />
              <span className="h-px w-12 bg-bronze/50 md:w-20" />
            </div>

            <blockquote
              className="m-0 font-serif text-ink"
              style={{ fontSize: "clamp(1.45rem, 1.05rem + 1.7vw, 2.35rem)", lineHeight: 1.35 }}
            >
              <p className="m-0 text-balance">
                &ldquo;The accumulation of all powers, legislative, executive, and judiciary, in
                the same hands, whether of one, a few, or many, and whether hereditary,
                self-appointed, or elective, may justly be pronounced{" "}
                <em className="text-bronze-ink not-italic">the very definition of tyranny</em>.&rdquo;
              </p>
            </blockquote>

            <figcaption className="mt-8 text-[0.72rem] uppercase tracking-[0.24em] text-ink-muted md:mt-10">
              James Madison <span aria-hidden="true">·</span> Federalist No. 47
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
