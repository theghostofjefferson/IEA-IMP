import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";

/**
 * A calm call to action for the whistleblower page. It promises nothing the
 * page itself does not: the report form states plainly what the Institute can
 * and cannot guarantee, so this points the reader there before they submit.
 */
export function ReportBanner() {
  return (
    <section aria-labelledby="report-banner-heading" className="mt-10 md:mt-12">
      <Reveal delayMs={60}>
        <div className="grid gap-6 border-y border-rule bg-bronze-wash px-5 py-8 sm:px-8 md:grid-cols-[1fr_auto] md:items-center md:gap-10 md:py-10">
          <div>
            <p className="type-label text-bronze-ink">Report a violation</p>
            <h2 id="report-banner-heading" className="mt-3 font-serif text-2xl leading-snug text-ink md:text-3xl">
              Know something we should look at?
            </h2>
            <p className="type-body measure mt-3 text-ink-muted">
              If you have seen or experienced misconduct at a school, you can report it to the Institute. Read what we
              can and cannot promise before you submit.
            </p>
          </div>
          <Button asChild size="lg" className="w-full border border-ink bg-ink text-ink-inverse hover:bg-ink/90 md:w-auto">
            <Link to="/report-a-concern">
              Report a violation <span aria-hidden="true">&rarr;</span>
            </Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
