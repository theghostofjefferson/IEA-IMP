import { useEffect } from "react";

import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { Rule, AccentRule } from "@/components/site/Rule";
import { TallyEmbed } from "@/components/site/TallyEmbed";
import { SEO, applySeo } from "@/lib/seo";

/** The IEA Membership Application, a Tally form embedded unchanged. */
const FORM = {
  src: "https://tally.so/embed/8Nxz8k?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1",
  title: "IEA Membership Application",
};

/**
 * An unlisted page at `/recruits`: reachable by its address, linked from nowhere
 * on the site, out of the sitemap and marked `noindex, nofollow` (in the head and
 * in an `X-Robots-Tag` header). Not access-controlled; anyone with the link can
 * open it. To make it public, remove the `noindex` in `SEO.recruits` and the
 * `/recruits` header in `vercel.json`.
 */
export function RecruitsPage() {
  useEffect(() => applySeo(SEO.recruits), []);

  return (
    <Container>
      <div className="animate-route-in">
        <header className="pt-12 md:pt-20">
          <Reveal staggerMs={60}>
            <div className="flex items-center gap-3">
              <AccentRule />
              <span className="type-label text-bronze-ink">Membership</span>
            </div>
            <h1 tabIndex={-1} className="type-title measure mt-5 text-ink outline-none">
              {FORM.title}
            </h1>
          </Reveal>
        </header>

        <Rule tone="rule" className="mt-10 md:mt-12" />

        <Reveal className="py-8 pb-14 md:py-10 md:pb-20" delayMs={90}>
          <TallyEmbed src={FORM.src} title={FORM.title} eager />
        </Reveal>
      </div>
    </Container>
  );
}
