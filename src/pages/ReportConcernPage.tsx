import { useEffect } from "react";

import { Container } from "@/components/site/Container";
import { Notice } from "@/components/site/Notice";
import { Reveal } from "@/components/site/Reveal";
import { Rule, AccentRule } from "@/components/site/Rule";
import { useTallyEmbed } from "@/hooks/useTallyEmbed";
import { SEO, applySeo } from "@/lib/seo";

/** The Tally form. `dynamicHeight=1` lets Tally resize the iframe to fit. */
const FORM_SRC =
  "https://tally.so/embed/YjPzeN?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";

/**
 * What a reader needs to know before they submit. The four statements are the
 * Institute's wording and are shown verbatim; the short label above each only
 * helps a reader find the one they are looking for.
 */
const TERMS = [
  {
    label: "Scope",
    text: "IEA accepts disclosures concerning educational institutions and matters of public interest.",
  },
  {
    label: "What happens next",
    text: "Submitted information may be reviewed, verified, documented, and, where appropriate, referred for further consideration or action.",
  },
  {
    label: "Your identity",
    text: "Providing identifying information is optional.",
  },
  {
    label: "Limits",
    text: "IEA cannot guarantee absolute anonymity, confidentiality, an investigation, legal representation, or a particular outcome.",
  },
] as const;

/**
 * Report a Violation: the Institute's disclosure page.
 *
 * A page the reader may reach in a difficult moment, so it is deliberately
 * plain: what we accept, what we cannot promise, what not to send, then the
 * form. The form itself is Tally's, embedded; see `hooks/useTallyEmbed.ts`.
 */
export function ReportConcernPage() {
  useEffect(() => applySeo(SEO.reportConcern), []);
  useTallyEmbed();

  return (
    <Container>
      <div className="animate-route-in">
        <header className="pt-12 md:pt-20">
          <Reveal staggerMs={60}>
            <div className="flex items-center gap-3">
              <AccentRule />
              <span className="type-label text-bronze-ink">Report a violation</span>
            </div>
            <h1 tabIndex={-1} className="type-title measure mt-5 text-ink outline-none">
              Whistleblower &amp; Public Interest Disclosure
            </h1>
            <p className="type-body-lg measure mt-6 text-ink-muted">
              If you know of a concern about an educational institution, you may tell us here.
              Please read the points below first.
            </p>
          </Reveal>
        </header>

        <Rule tone="rule" className="mt-10 md:mt-12" />

        <Reveal className="py-10 md:py-12" delayMs={60}>
          <section aria-labelledby="before-you-submit">
            <h2 id="before-you-submit" className="type-label text-ink-faint">
              Before you submit
            </h2>
            <dl className="mt-6 grid gap-4 md:grid-cols-2 md:gap-5">
              {TERMS.map((t) => (
                <div
                  key={t.label}
                  className="rounded-md border border-rule-soft bg-surface/70 px-5 py-4 md:px-6 md:py-5"
                >
                  <dt className="type-label text-bronze-ink">{t.label}</dt>
                  <dd className="type-body mt-2 text-ink">{t.text}</dd>
                </div>
              ))}
            </dl>

            <Notice tone="caution" label="Privacy notice" className="mt-5 md:mt-6">
              Please do not submit passwords, unrelated personal information, or unnecessary
              sensitive information about third parties.
            </Notice>
          </section>
        </Reveal>

        <Rule />

        <Reveal className="py-10 md:py-14" delayMs={90}>
          <section aria-labelledby="disclosure-form">
            <h2 id="disclosure-form" className="type-heading text-ink">
              Submit a disclosure
            </h2>
            <div className="mt-6 rounded-md border border-rule-soft bg-surface/70 px-3 py-4 sm:px-6 sm:py-6 md:px-8">
              <iframe
                data-tally-src={FORM_SRC}
                loading="lazy"
                width="100%"
                height="620"
                title="Whistleblower and Public Interest Disclosure form"
                className="block w-full border-0"
              />
              <noscript>
                <p className="type-body text-ink-muted">
                  The form needs JavaScript. You can also open it directly:{" "}
                  <a href={FORM_SRC} className="underline underline-offset-4">
                    Whistleblower &amp; Public Interest Disclosure form
                  </a>
                  .
                </p>
              </noscript>
            </div>
          </section>
        </Reveal>
      </div>
    </Container>
  );
}
