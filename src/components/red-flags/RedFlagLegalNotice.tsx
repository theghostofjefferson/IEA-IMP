/**
 * Collapsed notice for the institutional review initiative.
 *
 * The publication position and institutional declaration remain available
 * without expanding the notice into the page by default.
 */
export function RedFlagLegalNotice() {
  return (
    <details className="group my-6 border border-gold/40 bg-ink/45 backdrop-blur-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6 [&::-webkit-details-marker]:hidden">
        <span className="type-heading text-ink-inverse">
          Legal notice &amp; disclaimer
        </span>
        <span
          aria-hidden="true"
          className="type-heading shrink-0 text-gold transition-transform duration-200 group-open:rotate-180"
        >
          ▾
        </span>
      </summary>

      <div className="flex flex-col gap-8 border-t border-gold/25 px-5 py-6 sm:px-6 md:py-8">
        <section>
          <h3 className="type-label text-gold">IEA&apos;s publication position</h3>
          <p className="type-body measure mt-3 text-ink-inverse/90">
            <strong>
              IEA regrets that it cannot publish every report it receives concerning alleged abuse,
              including gross and blatant suppression of liberty and harm. Concerns about the
              adequacy of protections for students and sources, together with confidentiality,
              verification, and applicable-law obligations, can limit what the Institute can
              responsibly publish. After receiving threats, and following{" "}
              <a
                href="https://kathmandupost.com/national/2026/10/31/police-action-in-newsrooms-revives-memories-of-gyanendra-era-media-crackdown"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                public reporting on 31 October 2026 about journalists detained during newsroom visits
                in Kathmandu
              </a>
              , IEA substantially revised this page. The Institute continues its work. Its founder
              remains committed to liberty and to holding institutions accountable through
              evidence-based, lawful research.
            </strong>
          </p>
        </section>

        <section className="border-t border-gold/25 pt-6">
          <h3 className="type-label text-gold">Institutional declaration</h3>
          <p className="type-body measure mt-3 text-ink-inverse/85">
            IEA does not purport to exercise judicial authority, determine criminal guilt, or
            substitute its research classifications for the determinations of competent courts. The
            Institute&apos;s responsibility is to document information received, apply transparent
            research criteria, and facilitate institutional accountability.
          </p>
          <p className="type-body measure mt-4 text-ink-inverse/85">
            The allegations originate with their respective submitters. The institutional review
            classification originates with IEA&apos;s research methodology. Any determination of
            legal liability remains a matter for the competent judicial authorities.
          </p>
          <blockquote className="mt-6 border-l-2 border-gold pl-4 font-serif text-ink-inverse">
            <strong>
              Accountability requires scrutiny; justice requires evidence; and neither ought to be
              pursued at the expense of the rule of law.
            </strong>
          </blockquote>
        </section>
      </div>
    </details>
  );
}
