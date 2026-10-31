/**
 * Collapsed reader notice for the Institutional review initiative.
 *
 * Native details/summary keeps the full legal notice available without
 * expanding it into the page by default.
 */
export function RedFlagLegalNotice() {
  return (
    <details className="group my-6 border border-gold/40 bg-ink/45 backdrop-blur-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6 [&::-webkit-details-marker]:hidden">
        <span className="flex min-w-0 flex-col gap-1">
          <span className="type-label text-gold">Institutional review initiative · Reader notice</span>
          <span className="type-heading text-ink-inverse">
            Legal notice &amp; disclaimer
          </span>
          <span className="type-caption text-ink-inverse/70">
            Third-party reports and research classification
          </span>
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
          <h3 className="type-label text-gold">1. Source and attribution of reports</h3>
          <p className="type-body measure mt-3 text-ink-inverse/85">
            The reports appearing under IEA&apos;s Institutional review initiative originate from information
            submitted by third parties through the Institute&apos;s surveys, research activities,
            field investigations, and other reporting channels. The underlying allegations are
            those of their respective submitters and respondents. They are not allegations
            originally authored or independently invented by the Institute for Educational
            Accountability.
          </p>
          <p className="type-body measure mt-4 text-ink-inverse/85">
            IEA acts in its capacity as a research and educational-accountability institution,
            receiving, documenting, organizing, and assessing information obtained through these
            channels. The attribution of an allegation remains with its original source, and its
            appearance on this platform shall not be construed as an independent declaration by IEA
            that every assertion contained therein is established fact.
          </p>
        </section>

        <section>
          <h3 className="type-label text-gold">2. Institutional review classification</h3>
          <p className="type-body measure mt-3 text-ink-inverse/85">
            Selection for institutional review is a research classification arising from IEA&apos;s
            methodology and assessment criteria. Reports may be identified for further scrutiny on
            account of their reported nature, frequency, severity, or relevance to institutional
            accountability.
          </p>
          <p className="type-body measure mt-4 text-ink-inverse/85">
            Selection for institutional review is neither a judicial finding nor a determination of criminal or
            civil liability. It does not establish that an individual or institution has committed
            an offence, nor should it be interpreted as a declaration of guilt.
          </p>
        </section>

        <section>
          <h3 className="type-label text-gold">3. Purpose and public interest</h3>
          <p className="type-body measure mt-3 text-ink-inverse/85">
            The initiative documents third-party reports concerning student safety, dignity, and rights
            within educational environments, including reports about staff-student interactions,
            disciplinary practices, and institutional procedures.
          </p>
          <p className="type-body measure mt-4 text-ink-inverse/85">
            Publication is undertaken for legitimate research, educational accountability, and
            public-interest purposes. IEA does not maintain this platform for personal retaliation,
            harassment, intimidation, or the infliction of unnecessary reputational injury. Its
            objective is to identify institutional concerns and facilitate informed scrutiny
            through documented information.
          </p>
        </section>

        <section>
          <h3 className="type-label text-gold">4. Verification and editorial responsibility</h3>
          <p className="type-body measure mt-3 text-ink-inverse/85">
            The Institute distinguishes between information received from respondents, allegations
            undergoing assessment, and findings supported by subsequent investigation. The
            publication of a report does not imply that every underlying allegation has undergone
            independent judicial or investigative verification.
          </p>
          <p className="type-body measure mt-4 text-ink-inverse/85">
            Materials may be subjected to methodological assessment, editorial review,
            corroboration, and independent scrutiny, where reasonably available and appropriate. IEA
            reserves the right to correct, qualify, restrict, or withdraw material when warranted
            by subsequent evidence, procedural fairness, or applicable law.
          </p>
        </section>

        <section>
          <h3 className="type-label text-gold">5. Privacy and protection of individuals</h3>
          <p className="type-body measure mt-3 text-ink-inverse/85">
            IEA recognizes the constitutional and statutory protections afforded to privacy, dignity,
            and reputation under the laws of Nepal. The Institute takes particular care with
            information concerning alleged victims, minors, witnesses, and other vulnerable
            individuals.
          </p>
          <p className="type-body measure mt-4 text-ink-inverse/85">
            Personal identifying information, private correspondence, and sensitive materials shall
            not be published merely because they were submitted during research. Appropriate
            anonymization, redaction, and safeguards shall be applied in accordance with applicable
            law and the legitimate purpose of publication.
          </p>
        </section>

        <section>
          <h3 className="type-label text-gold">6. Clarification and right of response</h3>
          <p className="type-body measure mt-3 text-ink-inverse/85">
            Any individual or institution materially concerned by a published report may submit
            relevant evidence, documentary clarification, or a request for correction to the
            Institute for consideration.
          </p>
          <p className="type-body measure mt-4 text-ink-inverse/85">
            IEA shall assess such submissions through its appropriate editorial and institutional
            procedures. The opportunity to provide clarification does not constitute an admission
            that a report is inaccurate, nor does the existence of a published report establish the
            truth of every allegation.
          </p>
        </section>

        <section>
          <h3 className="type-label text-gold">7. Applicable law</h3>
          <p className="type-body measure mt-3 text-ink-inverse/85">
            All publication activities undertaken through the Institutional review initiative remain subject to
            the Constitution of Nepal and applicable legislation, including the National Penal
            (Code) Act, 2074, the Privacy Act, 2075, and the Electronic Transactions Act, 2063.
          </p>
          <p className="type-body measure mt-4 text-ink-inverse/85">
            Nothing in this notice shall be interpreted as an attempt to exclude the jurisdiction of
            competent Nepali authorities, waive the rights of affected persons, or claim immunity
            from applicable law. IEA reserves all rights and remedies available to it under
            prevailing legislation.
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
            classification originates with IEA&apos;s research methodology. Any determination of legal liability
            remains a matter for the competent judicial authorities.
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
