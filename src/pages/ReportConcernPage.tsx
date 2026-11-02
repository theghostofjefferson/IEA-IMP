import { useEffect } from "react";

import { AccentRule } from "@/components/site/Rule";
import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { Rule } from "@/components/site/Rule";
import { TallyDisclosureForm } from "@/components/site/TallyDisclosureForm";
import { SEO, applySeo } from "@/lib/seo";

const TALLY_FORM_URL =
  "https://tally.so/embed/YjPzeN?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";

export function ReportConcernPage() {
  useEffect(() => applySeo(SEO.reportConcern), []);

  return (
    <Container>
      <div className="animate-route-in">
        <header className="pt-12 md:pt-20">
          <Reveal staggerMs={60}>
            <div className="flex items-center gap-3">
              <AccentRule />
              <span className="type-label text-bronze-ink">Public interest</span>
            </div>

            <h1 tabIndex={-1} className="type-title measure-tight mt-5 text-ink outline-none">
              Whistleblower &amp; Public Interest Disclosure
            </h1>
          </Reveal>
        </header>

        <Rule tone="rule" className="mt-8 md:mt-10" />

        <Reveal className="py-10 md:py-14" delayMs={60}>
          <div className="max-w-[68ch]">
            <p className="type-body-lg text-ink-muted">
              IEA accepts disclosures concerning educational institutions and matters of public
              interest. Submitted information may be reviewed, verified, documented, and, where
              appropriate, referred for further consideration or action.
            </p>
            <p className="type-body-lg mt-5 text-ink-muted">
              Providing identifying information is optional. IEA cannot guarantee absolute
              anonymity, confidentiality, an investigation, legal representation, or a particular
              outcome.
            </p>
          </div>

          <div className="mt-8 max-w-[52rem] rounded-sm border border-rule-soft bg-bronze-wash/50 p-4 md:p-5">
            <p className="type-label text-bronze-ink">Privacy and submission notice</p>
            <p className="type-body mt-3 text-ink-muted">
              Please avoid sharing passwords, unrelated personal information, or unnecessary
              sensitive information about third parties. Disclosures should be limited to matters
              relevant to the concern being raised.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-md border border-rule-soft bg-surface p-3 shadow-[0_0_0_1px_rgba(19,26,44,0.02)] md:p-4">
            <TallyDisclosureForm
              src={TALLY_FORM_URL}
              title="Whistleblower and public interest disclosure form"
              className="min-h-[700px]"
            />
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
