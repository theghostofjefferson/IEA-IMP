import { hidesLeadership, WITHHELD_NAME } from "@/config/restrictions";
import { PERSONNEL_NOTICE, PERSONNEL_VACATED } from "@/data/notices";

const IMAGE = "/notices/personnel-notice-2026-11-23.jpg";

/**
 * A notice from the Office of the Founder on the reconstitution of personnel.
 * Set as a formal document: dated, ruled, signed.
 */
export function PersonnelNotice() {
  return (
    <details
      id={PERSONNEL_NOTICE.id}
      open
      style={{ borderLeft: "4px solid var(--gold)" }}
      className="group scroll-mt-24 overflow-hidden rounded-md border border-ink-inverse/10 bg-ink text-ink-inverse shadow-[0_18px_40px_-28px_rgba(19,26,44,0.6)] transition-shadow duration-500 open:shadow-[0_26px_55px_-28px_rgba(19,26,44,0.8)]"
    >
      <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-5 sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden="true"
          className="inline-flex size-11 shrink-0 items-center justify-center border border-gold/60 font-serif text-xl font-bold text-gold"
        >
          III
        </span>
        <span className="min-w-0 flex-1">
          <span className="type-label block text-gold">
            Office of the Founder &middot; {PERSONNEL_NOTICE.dateLabel}
          </span>
          <span className="type-heading mt-1 block text-ink-inverse">
            A notice from the Office of the Founder
          </span>
          <span className="type-caption mt-2 block text-ink-inverse/65">
            Revisions to the Institute&rsquo;s About section and the reconstitution of its personnel
          </span>
        </span>
        <span className="type-caption hidden shrink-0 text-gold sm:block">
          Read notice{" "}
          <span aria-hidden="true" className="inline-block transition-transform duration-300 group-open:rotate-45">+</span>
        </span>
      </summary>

      <article className="border-t border-gold/30 px-5 py-6 sm:px-7 md:py-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          {hidesLeadership() ? null : (
            <>
          <a
            href={IMAGE}
            target="_blank"
            rel="noreferrer"
            aria-label="Open the notice as issued, full size"
            className="mx-auto block w-full max-w-[40rem] overflow-hidden rounded-sm border border-gold/40 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.7)]"
          >
            <img
              src={IMAGE}
              alt="The notice as issued: A Notice from the Office of the Founder, dated 23 November 2026, regarding revisions to the Institute's About section and the reconstitution of its personnel. The full text is reproduced below."
              width={1200}
              height={1789}
              loading="lazy"
              className="block h-auto w-full"
            />
          </a>
          <p className="type-caption text-center text-ink-inverse/60">The notice as issued. The text follows.</p>
            </>
          )}
          <p className="type-body-lg measure">
            It is hereby brought to the attention of the Institute&rsquo;s members, associates, and the
            public that certain revisions have been effected upon the Institute&rsquo;s About section,
            consequent upon a period of organisational reconsideration and the departure of several
            individuals from their former appointments.
          </p>
          <p className="type-body-lg measure">
            The Institute, in the ordinary course of its institutional development, finds itself
            presently engaged in the reconsideration and reconstitution of its personnel. Certain
            offices have thus been vacated, and the corresponding alterations have been reflected in
            the Institute&rsquo;s public records so as to maintain an accurate account of its present
            composition.
          </p>

          <div className="overflow-x-auto rounded-sm border border-gold/40">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Offices vacated, by name and role</caption>
              <thead>
                <tr className="bg-gold/15">
                  <th scope="col" className="type-label px-4 py-3 text-gold">Name</th>
                  <th scope="col" className="type-label px-4 py-3 text-gold">Role</th>
                </tr>
              </thead>
              <tbody>
                {PERSONNEL_VACATED.map((p) => (
                  <tr key={p.name} className="border-t border-gold/25">
                    <td className="type-body px-4 py-2.5 font-semibold text-ink-inverse">{p.name}</td>
                    <td className="type-body px-4 py-2.5 text-ink-inverse/80">{p.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="type-body-lg measure">
            The Office of the Founder wishes to make clear that the Institute is actively engaged in
            identifying, recruiting, and appointing suitable persons to assume these responsibilities.
            Such appointments shall be made with due regard to competence, diligence, and the proper
            discharge of the duties entrusted to each office.
          </p>
          <p className="type-body-lg measure">
            These alterations ought not to be construed as a departure from the Institute&rsquo;s
            founding principles or its institutional purpose. Rather, they constitute a necessary
            measure in the continued ordering, refinement, and strengthening of the organisation.
          </p>
          <p className="type-body-lg measure">
            Until such time, the understanding and patience of all concerned are earnestly appreciated.
          </p>

          <div className="mt-2 grid gap-8 border-t border-gold/30 pt-6 sm:grid-cols-2">
            <div>
              <p className="type-caption text-ink-inverse/70">By Order of the Founder,</p>
              <p className="mt-3 font-serif text-lg font-bold uppercase tracking-wide text-ink-inverse">{hidesLeadership() ? WITHHELD_NAME : "Eron Subedi"}</p>
              <p className="type-caption italic text-ink-inverse/75">Founder, Executive Chairman &amp; Chief of Investigations</p>
              <p className="type-caption italic text-ink-inverse/75">Office of the Founder</p>
              <p className="type-caption italic text-ink-inverse/75">The Institute for Educational Accountability</p>
            </div>
            <div>
              <p className="type-caption text-ink-inverse/70">Approved by:</p>
              <p className="mt-3 font-serif text-lg font-bold text-ink-inverse">{hidesLeadership() ? WITHHELD_NAME : "Yogeshwor Sharma"}</p>
              <p className="type-caption italic text-ink-inverse/75">President</p>
              <p className="type-caption italic text-ink-inverse/75">The Institute for Educational Accountability (IEA)</p>
            </div>
          </div>
          <p className="type-caption text-center italic text-gold">
            Issued in the interest of institutional clarity and continuity.
          </p>
        </div>
      </article>
    </details>
  );
}
