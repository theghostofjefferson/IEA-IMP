import { useEffect } from "react";

import { Container } from "@/components/site/Container";
import { Hero } from "@/components/home/Hero";
import { MadisonQuote } from "@/components/home/MadisonQuote";
import { SEO, applySeo } from "@/lib/seo";

/**
 * The landing page.
 *
 * Hero carries the stats, red-flag spotlight and top of the table. The Madison
 * quotation closes the page as a full-width band: the single high-contrast anchor.
 */
export function HomePage() {
  useEffect(() => applySeo(SEO.home), []);

  return (
    <>
      <Container>
        <Hero />
      </Container>
      <MadisonQuote />
    </>
  );
}