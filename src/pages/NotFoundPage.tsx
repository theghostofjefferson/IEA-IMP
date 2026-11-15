import { useEffect } from "react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { SEO, applySeo } from "@/lib/seo";

/**
 * Styled 404. Never a bare status page — a reader who lands here should get
 * navigation out of it in one tap.
 *
 * Also rendered in place by `SchoolPage` for an unknown `:id`, so it must not
 * assume it is the whole page.
 */
export function NotFoundPage() {
  useEffect(() => applySeo(SEO.notFound), []);

  return (
    <div className="relative flex min-h-[60dvh] flex-col items-center justify-center overflow-hidden px-4 py-16 text-center">
      <span
        aria-hidden="true"
        className="nf-numeral pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none font-serif text-[clamp(10rem,38vw,22rem)] font-bold leading-none text-bronze/10"
      >
        404
      </span>
      <div className="relative flex flex-col items-center">
        <div aria-hidden="true" className="nf-rule h-0.5 w-10 bg-bronze" />
        <p className="type-label mt-5 text-bronze-ink">Error 404</p>
        <h1 tabIndex={-1} className="type-title mt-3 text-ink outline-none">
          This page is not on the record
        </h1>
        <p className="type-body measure mt-4 text-ink-muted">
          The link may be wrong, or the page may have moved. Open information is
          the whole point here, so let&rsquo;s get you back to it.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link to="/rankings">See the rankings</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Back home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/about">About the Institute</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
