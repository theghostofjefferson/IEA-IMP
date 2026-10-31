import { useEffect } from "react";

import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { Rule } from "@/components/site/Rule";
import { SEO, applySeo } from "@/lib/seo";

/**
 * The annual report and a public account of the Institute's investigations,
 * litigation work, and publication process.
 */
export function AnnualReportPage() {
  useEffect(() => applySeo(SEO.annualReport), []);

  return (
    <Container>
      <div className="animate-route-in">
        <header className="pt-12 md:pt-20">
          <Reveal staggerMs={60}>
            <span className="type-label text-bronze-ink">2026</span>
            <h1 tabIndex={-1} className="type-title measure-tight mt-5 text-ink outline-none">
              Annual report
            </h1>
          </Reveal>
        </header>

        <Rule tone="rule" className="mt-10" />

        <Reveal className="py-12 md:py-16" delayMs={60}>
          <section className="max-w-[70ch]" aria-labelledby="annual-investigations-title">
            <h2 id="annual-investigations-title" className="type-heading text-ink">
              Annual Report &amp; Investigations
            </h2>
            <p className="type-body-lg mt-5 text-ink-muted">
              The Institute for Educational Accountability (IEA) is undertaking a comprehensive
              programme of investigation into discrimination on the grounds of caste and colour,
              gross violations of human rights, and other oppressive practices within educational
              institutions. The Annual Report shall document these findings, examine the
              institutional conditions that permit such abuses to persist, and identify the
              failures of accountability that allow individual rights to be subordinated to
              arbitrary authority.
            </p>
            <p className="type-body-lg mt-5 text-ink-muted">
              Our investigations shall rely principally upon field research, conducted across
              multiple regions by the IEA investigative team under the supervision of the Chief
              Investigator, with the participation of IEA members. We consider geographical
              breadth and independent verification indispensable to the integrity of our findings.
              Accordingly, this undertaking remains in progress as of October 31, 2026, and shall
              require considerable time to ensure that our conclusions rest upon sufficient
              evidence rather than conjecture or isolated accounts.
            </p>
          </section>

          <section className="mt-12 max-w-[70ch] border-t border-rule-soft pt-10" aria-labelledby="litigation-title">
            <h2 id="litigation-title" className="type-heading text-ink">
              Litigation and Constitutional Accountability
            </h2>
            <p className="type-body-lg mt-5 text-ink-muted">
              Investigation shall not be confined to the publication of findings. Where the
              evidence warrants judicial intervention, IEA intends to pursue lawful remedies
              through the courts. As of October 31, 2026, this work is already underway. The Chief
              of Investigations has commenced the preparation and drafting of potential litigation
              strategies, and IEA has secured pro bono legal assistance to represent the Institute
              in judicial proceedings.
            </p>
            <p className="type-body-lg mt-5 text-ink-muted">
              We regard the judiciary as an essential institutional safeguard against arbitrary
              power. Where existing mechanisms of accountability prove inadequate, constitutional
              litigation provides a lawful means through which rights may be vindicated and
              institutional excesses subjected to judicial scrutiny.
            </p>
          </section>

          <section className="mt-12 max-w-[70ch] border-t border-rule-soft pt-10" aria-labelledby="publication-title">
            <h2 id="publication-title" className="type-heading text-ink">
              Publication, Review, and Institutional Oversight
            </h2>
            <p className="type-body-lg mt-5 text-ink-muted">
              The findings and materials arising from these investigations shall be published on
              the IEA website following a structured process of editorial and independent review.
              Each publication shall be examined by the Lead Editor and Managing Editor, in addition
              to third-party reviewers providing neutral oversight. This process is intended to
              ensure evidentiary integrity, editorial independence, and the reliability of the
              Institute&apos;s public findings.
            </p>
            <p className="type-body-lg mt-5 text-ink-muted">
              Institutional oversight shall remain vested in the President, who presides over the
              Institute under the direction of the Executive Director. This arrangement is intended
              to preserve accountability within the Institute itself, recognizing that an
              institution entrusted with scrutinizing the exercise of authority must remain equally
              answerable for the exercise of its own.
            </p>
            <p className="type-body-lg mt-5 text-ink-muted">
              IEA proceeds from a fundamental conviction:{" "}
              <strong>
                no institution ought to be the final judge of its own conduct, and no authority
                ought to be exercised beyond the restraints imposed by law and individual rights.
              </strong>{" "}
              Our purpose is not merely to identify wrongdoing, but to establish the evidence,
              pursue the remedies, and strengthen the institutional safeguards necessary to prevent
              its recurrence.
            </p>
          </section>
        </Reveal>
      </div>
    </Container>
  );
}
