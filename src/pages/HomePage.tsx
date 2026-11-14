import { useEffect } from "react";

import { Container } from "@/components/site/Container";
import { Hero } from "@/components/home/Hero";
import { DissolveQuote } from "@/components/home/DissolveQuote";
import { SEO, applySeo } from "@/lib/seo";

/**
 * The landing page.
 *
 * Hero carries the stats, red-flag spotlight and top of the table. The Madison
 * quotation closes the page: a scroll-driven scene (figure to words), or a static
 * band for reduced motion.
 */
export function HomePage() {
  useEffect(() => applySeo(SEO.home), []);

  return (
    <>
      <Container>
        <Hero />
      </Container>
      <DissolveQuote />
    </>
  );
}