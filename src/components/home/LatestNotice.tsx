import { Link } from "react-router";

import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/data-display/SectionHeader";

/**
 * The newest public statement, surfaced on the front page so a returning
 * reader sees what has changed without having to look for it. The text lives on
 * the Notices & Publications page; this is a doorway to it, so the copy here is
 * only the headline and standfirst, kept identical to that page.
 */
export function LatestNotice() {
  return (
    <section aria-label="Latest from the Institute" className="mt-16 md:mt-24">
      <Reveal delayMs={60}>
        <SectionHeader
          eyebrow="Latest from the Institute"
          title="Notices & publications"
          action={
            <Link
              to="/notices"
              className="type-caption text-bronze-ink underline decoration-1 underline-offset-4 hover:decoration-2"
            >
              All notices &amp; publications &rarr;
            </Link>
          }
        />

        <Link
          to="/notices#statement"
          className="group mt-8 flex items-start gap-4 rounded-md border border-ink-inverse/10 border-l-4 border-l-claret bg-ink p-5 text-ink-inverse shadow-[0_18px_40px_-28px_rgba(19,26,44,0.6)] transition-[transform,box-shadow] duration-500 ease-brand hover:-translate-y-0.5 hover:shadow-[0_26px_55px_-28px_rgba(19,26,44,0.8)] sm:items-center sm:gap-5 sm:p-7"
        >
          <span
            aria-hidden="true"
            className="inline-flex size-11 shrink-0 items-center justify-center border border-claret font-serif text-2xl font-bold text-[#c54a53] transition-colors duration-500 group-hover:border-[#ed525e] group-hover:text-[#ff727b]"
          >
            !
          </span>
          <span className="min-w-0 flex-1">
            <span className="type-label block text-gold">
              IEA statement · <time dateTime="2026-10-31">31 October 2026</time>
            </span>
            <span className="type-heading mt-1 block text-ink-inverse">
              On the Assault on Freedom of Expression in Nepal
            </span>
            <span className="type-caption mt-2 block text-ink-inverse/65">
              A statement on press freedom, recent events, and why we continue our work
            </span>
          </span>
          <span className="type-caption hidden shrink-0 text-gold sm:block">
            Read the statement{" "}
            <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
