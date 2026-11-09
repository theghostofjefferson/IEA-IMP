import { useEffect } from "react";

import { Container } from "@/components/site/Container";
import { Notice } from "@/components/site/Notice";
import { Reveal } from "@/components/site/Reveal";
import { Rule, AccentRule } from "@/components/site/Rule";
import { TallyEmbed } from "@/components/site/TallyEmbed";
import { SEO, applySeo } from "@/lib/seo";

/** The Tally form. `dynamicHeight=1` lets Tally resize the iframe to fit. */
const FORM_SRC =
  "https://tally.so/embed/jebGBx?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";

/**
 * An unlisted page: reachable by its address, linked from nowhere on the site,
 * left out of the sitemap, and marked `noindex, nofollow` (in the page head and
 * in an `X-Robots-Tag` header). It is not access-controlled; anyone with the
 * link can open it.
 *
 * The form is Tally's, embedded unchanged; see `components/site/TallyEmbed.tsx`.
 */
export function FormsPage() {
  useEffect(() => applySeo(SEO.forms), []);

  return (
    <Container>
      <div className="animate-route-in">
        <header className="pt-12 md:pt-20">
          <Reveal staggerMs={60}>
            <div className="flex items-center gap-3">
              <AccentRule />
              <span className="type-label text-bronze-ink">Student survey</span>
            </div>
            <h1 tabIndex={-1} className="type-title measure mt-5 text-ink outline-none">
              Student Experiences and Educational Equity
            </h1>
            <p className="type-body-lg measure mt-6 text-ink-muted">
              This form collects students&apos; experiences and perspectives on how they are treated
              and assisted in school, and on possible differences associated with skin colour,
              ethnicity or geographical background.
            </p>
          </Reveal>
        </header>

        <Rule tone="rule" className="mt-10 md:mt-12" />

        <Reveal className="py-8 md:py-10" delayMs={60}>
          <Notice tone="info" label="Confidentiality notice" className="max-w-[46rem]">
            This form is confidential, not anonymous. Respondents may provide their real name or
            use an alias. Responses will be handled confidentially and will not be publicly
            attributed to individual respondents without their permission.
          </Notice>
        </Reveal>

        <Reveal className="pb-14 md:pb-20" delayMs={90}>
          <TallyEmbed src={FORM_SRC} title="Student Experiences and Educational Equity" eager />
        </Reveal>
      </div>
    </Container>
  );
}
