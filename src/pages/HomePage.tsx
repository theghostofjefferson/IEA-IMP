import { useEffect } from "react";

import { Container } from "@/components/site/Container";
import { Hero } from "@/components/home/Hero";
import { FindingsBand } from "@/components/home/FindingsBand";
import { LatestNotice } from "@/components/home/LatestNotice";
import { ReportBanner } from "@/components/home/ReportBanner";
import { DissolveQuote } from "@/components/home/DissolveQuote";
import { SEO, applySeo } from "@/lib/seo";

/**
 * The landing page.
 *
 * The preliminary discrimination findings open the page, full width. Hero carries the stats, red-flag spotlight and top of the table. Below it, the
 * latest public statement and a way to report a violation. The Madison quotation
 * closes the page: a figure that dissolves into words, or a static band for
 * reduced motion.
 */
export function HomePage() {
  useEffect(() => applySeo(SEO.home), []);

  return (
    <>
      <FindingsBand />
      <Container>
        <Hero />
        <LatestNotice />
        <ReportBanner />
      </Container>
      <DissolveQuote />
    </>
  );
}