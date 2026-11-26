import { RESTRICTIONS_NOTICE } from "@/data/notices";

const MEASURES: { label: string; text: string }[] = [
  {
    label: "Personnel Information",
    text: "The names, individual identities, designations, and other identifying information of certain individuals associated with the Institute will be temporarily withheld from public-facing portions of the website.",
  },
  {
    label: "Institutional Information",
    text: "Certain organizational records, internal administrative details, personnel listings, and other information previously accessible through the website may be temporarily restricted or removed from public access.",
  },
  {
    label: "Website Modifications",
    text: "The Institute’s website will undergo selective modifications concerning the publication and accessibility of institutional information. These modifications are precautionary and do not signify the suspension of the Institute’s activities, research, or institutional operations.",
  },
  {
    label: "Verification of Institutional Affiliation",
    text: "Any educational institution, governmental authority, prospective employer, organization, or other legitimate entity seeking to verify the employment, appointment, membership, or institutional affiliation of an individual associated with IEA may submit a formal inquiry directly to the Office of the President.",
  },
];

/**
 * The Office of the Founder's notice on the temporary website restrictions.
 * Set large and open by default: it explains the rest of the site's current state.
 */
export function RestrictionsNotice() {
  return (
    <section
      id={RESTRICTIONS_NOTICE.id}
      aria-labelledby="restrictions-title"
      style={{ borderLeft: "6px solid var(--gold)" }}
      className="scroll-mt-24 overflow-hidden rounded-md border border-ink-inverse/10 bg-ink text-ink-inverse shadow-[0_26px_60px_-28px_rgba(19,26,44,0.8)]"
    >
      <div className="border-b border-gold/30 px-6 py-8 sm:px-10 sm:py-12">
        <p className="type-label text-gold">Institute for Educational Accountability</p>
        <p className="type-label mt-1 text-gold/80">Office of the Founder &middot; Official Institutional Notice</p>
        <h2 id="restrictions-title" className="type-title mt-6 max-w-[48rem] text-ink-inverse">
          {RESTRICTIONS_NOTICE.title}
        </h2>
        <p className="type-body-lg mt-4 text-gold">
          <time dateTime={RESTRICTIONS_NOTICE.date}>{RESTRICTIONS_NOTICE.dateLabel}</time>
        </p>
      </div>

      <div className="px-6 py-8 sm:px-10 sm:py-12">
        <div className="mx-auto flex max-w-[48rem] flex-col gap-6">
          <p className="type-heading font-normal leading-snug text-ink-inverse">
            The Institute for Educational Accountability (IEA) is entering a period of substantially increased public
            visibility and institutional engagement. As the Institute expands its public presence, broadens its research
            activities, and prepares to release further findings and institutional publications, it is anticipated that its
            work will attract considerably greater public, institutional, and media attention.
          </p>
          <p className="type-body-lg text-ink-inverse/90">
            In view of this expansion, and to safeguard the Institute, its personnel, researchers, members, and associated
            individuals against potential targeted harassment, intimidation, and other forms of direct interference, I have
            exercised the authority vested in the Office of the Founder to implement temporary restrictions on the public
            disclosure of certain institutional information.
          </p>
          <p className="type-body-lg font-bold text-gold">Effective immediately, the following measures have been implemented:</p>

          <ol className="flex flex-col gap-5">
            {MEASURES.map((m, i) => (
              <li key={m.label} className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 border-t border-gold/25 pt-5">
                <span aria-hidden="true" className="font-serif text-4xl font-bold leading-none text-gold">
                  {i + 1}
                </span>
                <p className="type-body-lg text-ink-inverse/90">
                  <strong className="font-bold text-ink-inverse">{m.label}:</strong> {m.text}
                </p>
              </li>
            ))}
          </ol>

          <p className="type-body-lg text-ink-inverse/90">
            These measures are temporary and precautionary in nature. They are intended to preserve the security and
            operational independence of the Institute during a period of accelerated public expansion.
          </p>

          <h3 className="type-label mt-4 text-gold">Authority and implementation</h3>
          <p className="type-body-lg text-ink-inverse/90">
            This notice constitutes a direct administrative directive issued by the Founder in exercise of the unilateral
            authority of the Office of the Founder under the Institute&rsquo;s internal governance arrangements. The measures
            described herein have already been authorized and implemented and are not awaiting further approval.
          </p>
          <p className="type-body-lg text-ink-inverse/90">
            The Institute remains operational. Its research, investigations, publications, and other institutional activities
            will continue in accordance with their respective schedules.
          </p>
          <p className="type-body-lg text-ink-inverse/90">
            The temporary restriction of publicly accessible personnel information should not be interpreted as a withdrawal
            of institutional accountability or a refusal to verify legitimate institutional affiliations. IEA will continue
            to respond to appropriate verification requests through its official administrative channels.
          </p>

          <h3 className="type-label mt-4 text-gold">Official correspondence and verification</h3>
          <p className="type-body-lg text-ink-inverse/90">
            For institutional verification, employment or membership confirmation, and formal administrative correspondence,
            please contact:
          </p>
          <address className="rounded-sm border border-gold/40 bg-gold/10 px-5 py-4 not-italic">
            <p className="font-serif text-lg font-bold text-ink-inverse">Office of the President</p>
            <p className="type-body text-ink-inverse/85">Institute for Educational Accountability (IEA)</p>
            <p className="type-body mt-1">
              Email:{" "}
              <a href="mailto:officeofthepresident@ieainstitute.org" className="text-gold underline underline-offset-4">
                officeofthepresident@ieainstitute.org
              </a>
            </p>
          </address>
          <p className="type-body-lg text-ink-inverse/90">
            For correspondence directly concerning the Founder and the exercise of the Founder&rsquo;s institutional authority:
          </p>
          <address className="rounded-sm border border-gold/40 bg-gold/10 px-5 py-4 not-italic">
            <p className="font-serif text-lg font-bold text-ink-inverse">Office of the Founder</p>
            <p className="type-body text-ink-inverse/85">Institute for Educational Accountability (IEA)</p>
            <p className="type-body mt-1">
              Email:{" "}
              <a href="mailto:founder@ieainstitute.org" className="text-gold underline underline-offset-4">
                founder@ieainstitute.org
              </a>
            </p>
            <p className="type-body mt-1">
              Official website:{" "}
              <a href="https://ieainstitute.org" className="text-gold underline underline-offset-4">
                https://ieainstitute.org
              </a>
            </p>
          </address>

          <div className="mt-6 border-t border-gold/30 pt-6 text-center">
            <p className="type-label text-gold">By order of the Founder</p>
            <p className="font-serif mt-2 text-lg font-bold text-ink-inverse">Office of the Founder</p>
            <p className="type-caption text-ink-inverse/75">Institute for Educational Accountability (IEA)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
