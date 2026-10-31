import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { ScoreBar } from "@/components/data-display/ScoreBar";
import { StatBlock } from "@/components/data-display/StatBlock";
import { bandColor } from "@/lib/scoring";
import { formatCount, formatCountPlus, formatDate } from "@/lib/format";
import { meta, redFlags, schools, totalSchools } from "@/lib/data";

/**
 * The landing masthead.
 *
 * Editorial, not marketing. The headline is a claim the data supports, and the
 * only decoration is a single hairline above the fold. No illustration, no hero
 * image, no gradient — all three would fight the type, and the type is the
 * design.
 *
 * The red-flag and top-of-table lists live here, in the same card/row design
 * used elsewhere, so the page makes its argument before the reader scrolls.
 */
export function Hero() {
  const top5 = schools.slice(0, 5);
  const flaggedIds = new Set([
    "ace-higher-secondary-school",
    "vs-niketan-secondary-school",
    "st-marys-school",
    "kathmandu-model-college",
  ]);
  const flaggedPreview = redFlags.filter((r) => flaggedIds.has(r.id));

  return (
    <section className="pt-6 md:pt-10">
      <div className="madison-hero on-dark">
      <div className="animate-[page-settle_420ms_cubic-bezier(0.16,1,0.3,1)_both]">
        <div className="grid items-center gap-x-10 gap-y-6 xl:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0">
            <div className="mb-5 flex max-w-full flex-wrap items-center gap-3">
              <span className="accent-mark shrink-0" aria-hidden="true" />
              <p className="type-label max-w-full text-[0.7rem] leading-snug tracking-[0.04em] text-gold sm:text-sm sm:tracking-[0.14em]">
                Institute for Educational Accountability
              </p>
            </div>
            <span className="type-label text-bronze-ink">Edition {meta.edition}</span>

            <h1
              tabIndex={-1}
              className="type-display measure mt-5 text-ink outline-none"
              style={{ animationDelay: "var(--intro-reveal-delay)" }}
            >
              The worst and the best
              <br />
              of top high schools.
            </h1>

            <p className="type-body measure-snug mt-6 text-ink-muted">
              Highlighting the reality of high schools in Nepal beyond what they advertise.
            </p>
          </div>

          <div className="flex flex-col gap-3 justify-self-start md:justify-self-end">
            <Button asChild size="lg" className="w-full border border-gold bg-gold text-ink hover:bg-bronze-soft sm:w-auto">
              <Link to="/rankings">View the rankings</Link>
            </Button>
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
              <Link
                to="/methodology"
                className="type-caption text-bronze-ink underline decoration-1 underline-offset-4 hover:decoration-2"
              >
                Methodology
              </Link>
              <Link
                to="/reports"
                className="type-caption text-bronze-ink underline decoration-1 underline-offset-4 hover:decoration-2"
              >
                Annual report
              </Link>
              <Link
                to="/about"
                className="type-caption text-bronze-ink underline decoration-1 underline-offset-4 hover:decoration-2"
              >
                About us
              </Link>
            </div>
          </div>
        </div>
      </div>

      </div>


      {/* Stats as a ruled row. */}
      <Reveal className="min-w-0" delayMs={60}>
        <div className="mt-8 grid grid-cols-2 gap-0 border-y border-rule-soft md:grid-cols-4">
          <StatCell value={formatCount(totalSchools)} label="schools rated" />
          <StatCell value={formatCountPlus(meta.totalResponses)} label="responses" border />
          <StatCell value={formatCount(redFlags.length)} label="under review" border />
          <StatCell value={formatDate(meta.publicationDate)} label="published" border />
        </div>
      </Reveal>

      <Reveal className="min-w-0 mt-8" delayMs={90}>
        <details className="group overflow-hidden rounded-sm border border-claret/60 bg-ink text-ink-inverse transition-[background-color,border-color,box-shadow] duration-500 group-open:border-[#cf4650] group-open:bg-[#1b0b11] group-open:shadow-[0_0_36px_rgba(181,28,42,0.28)]">
          <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-5 sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
            <span
              aria-hidden="true"
              className="inline-flex size-11 shrink-0 items-center justify-center border border-claret font-serif text-2xl font-bold text-[#c54a53] transition-colors duration-500 group-open:border-[#ed525e] group-open:text-[#ff727b]"
            >
              !
            </span>
            <span className="min-w-0 flex-1">
              <span className="type-label block text-gold">IEA statement · 31 October 2026</span>
              <span className="type-heading mt-1 block text-ink-inverse">
                On the Assault on Freedom of Expression in Nepal
              </span>
              <span className="type-caption mt-2 block text-ink-inverse/65">
                A statement on press freedom, recent events, and why IEA continues its work
              </span>
            </span>
            <span className="type-caption hidden shrink-0 text-gold sm:block">
              Read statement <span aria-hidden="true" className="inline-block transition-transform duration-300 group-open:rotate-45">+</span>
            </span>
          </summary>

          <article className="border-t border-claret/50 px-5 py-6 sm:px-7 md:py-8">
            <div className="mx-auto flex max-w-4xl flex-col gap-6">
              <p className="type-body-lg measure">
                IEA and I are enraged by what we regard as a serious assault on freedom of expression
                in Nepal. We are concerned by broad or uncertain applications of defamation and
                cybercrime provisions to expression. Press-freedom organizations have documented
                concerns about the use of the Electronic Transactions Act in cases involving
                journalists and online speech, including in{" "}
                <a
                  href="https://kathmandupost.com/national/2026/04/29/nepal-s-electronic-transactions-law-continues-to-be-misused-to-stifle-free-speech"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold underline underline-offset-4"
                >
                  reporting on Section 47 of the Act
                </a>{" "}
                and{" "}
                <a
                  href="https://www.freedomforum.org.np/publications/item/annual-press-freedom-report-2026"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold underline underline-offset-4"
                >
                  Freedom Forum&apos;s 2026 press-freedom report
                </a>
                .
              </p>

              <p className="type-body-lg measure">
                On 30 October 2026, police entered newsrooms in Kathmandu and detained several
                journalists; the detentions were reported the next day.{" "}
                <a
                  href="https://kathmandupost.com/national/2026/10/31/police-cite-pmo-concerns-to-justify-summoning-journalists"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold underline underline-offset-4"
                >
                  Contemporary reporting
                </a>{" "}
                records the events and the stated police explanation. Separately, major social
                media platforms were blocked in September 2025 and the restrictions were later
                withdrawn, as documented by the{" "}
                <a
                  href="https://apnews.com/article/e111d7de4ac8223088159182c664d1f2"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold underline underline-offset-4"
                >
                  Associated Press
                </a>
                .
              </p>

              <p className="type-heading measure border-l-2 border-claret pl-4 text-ink-inverse">
                Cybercrime laws cannot be handed out like Halloween candy. Defamation must not
                become a convenient instrument for silencing criticism. Constitutional liberties
                must not depend on the goodwill of those exercising power.
              </p>

              <p className="type-body-lg measure">
                IEA has received direct threats. Together with the increasingly hostile environment,
                this has compelled us to make substantial changes to our website and temporarily
                restrict certain publications. Let there be no misunderstanding:{" "}
                <strong>a change in our methods is not a surrender of our convictions.</strong>
              </p>

              <p className="type-body-lg measure">
                IEA is exploring lawful avenues to preserve, document, and bring these reports to
                public attention. I am personally working to develop those avenues. We remain
                committed to institutional accountability and intend to pursue it through lawful
                means.
              </p>

              <p className="type-body-lg measure">
                What saddens us most is how severely these circumstances have limited our ability to
                inform students about what is happening in their educational environments. There is
                much we wish to communicate, but cannot presently publish.
              </p>

              <p className="type-body measure border-l-2 border-gold/70 pl-4">
                Students seeking advice, assistance, or guidance concerning their rights may contact
                us at{" "}
                <a
                  href="mailto:help@ieainstitute.org"
                  className="font-bold text-gold underline underline-offset-4"
                >
                  help@ieainstitute.org
                </a>
                .
              </p>

              <blockquote className="type-heading measure border-t border-claret/50 pt-6 text-ink-inverse">
                <strong>
                  We do not require the permission of those in power to believe in constitutional
                  liberty. Nor do threats alter the principles upon which this institution was
                  founded.
                </strong>
                <footer className="type-caption mt-4 text-gold">
                  Ron · Institute for Educational Accountability
                </footer>
              </blockquote>
            </div>
          </article>
        </details>
      </Reveal>

      {/* Red-flag spotlight + top of the table, side by side. */}
      <div className="grid gap-12 pt-10 md:grid-cols-2 md:gap-16">
        <Reveal className="min-w-0" delayMs={120}>
          <div className="red-flag-panel min-w-0 px-5 py-6 md:px-7">
            <h2 className="type-label text-gold">
              <Link
                to="/rankings?view=redflags"
                className="rounded-sm text-ink-faint underline decoration-1 underline-offset-4 transition-colors duration-[120ms] hover:text-bronze-ink"
              >
                Institutions under review <span aria-hidden="true">→</span>
              </Link>
            </h2>
            <div className="mt-4 grid gap-3">
              {flaggedPreview.map((redFlag) => (
                <Link
                  key={redFlag.id}
                  to={`/red-flag/${redFlag.id}`}
                  className="group flex min-w-0 items-stretch gap-3 rounded-sm border border-ink-inverse/25 bg-claret/35 p-3 transition-colors duration-[120ms] hover:border-gold"
                >
                  <span aria-hidden="true" className="w-1 shrink-0 bg-band-weak" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-[0.9375rem] font-bold text-ink-inverse group-hover:underline">
                      {redFlag.name}
                    </p>
                    <p className="type-caption mt-1 line-clamp-2 text-ink-inverse/75">
                      {redFlag.reasons[0] ?? "Review items pending."}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="shrink-0 self-center text-gold transition-transform duration-[120ms] group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
            <Link
              to="/rankings?view=redflags"
              className="type-caption mt-4 inline-block text-gold underline decoration-1 underline-offset-4 hover:decoration-2"
            >
              See all {redFlags.length} institutions under review
            </Link>
          </div>
        </Reveal>

        <Reveal className="min-w-0" delayMs={180}>
          <aside className="top-table-panel min-w-0">
            <h2 className="type-heading font-bold">
              <Link
                to="/rankings?view=all"
                className="rounded-sm text-ink-faint underline decoration-1 underline-offset-4 transition-colors duration-[120ms] hover:text-bronze-ink"
              >
                Top of the table <span aria-hidden="true">→</span>
              </Link>
            </h2>
            <ol className="mt-4 flex flex-col">
              {top5.map((school, i) => (
                <li
                  key={school.id}
                  className="border-b border-rule-soft py-3 last:border-b-0"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <Link
                      to={`/school/${school.id}`}
                      className="flex min-w-0 items-baseline gap-2 rounded-sm"
                    >
                      <span className="inline-flex size-7 shrink-0 items-center justify-center border border-bronze/50 bg-bronze-wash font-serif text-sm font-bold text-bronze-ink">
                        {school.rank}
                      </span>
                      <span className="truncate font-serif text-[0.9375rem] font-bold text-ink hover:underline">
                        {school.name}
                      </span>
                    </Link>
                    <span className={`type-numeric-sm ${bandColor(school.overallScore)}`}>
                      {school.overallScore.toFixed(1)}
                    </span>
                  </div>
                  <div className="mt-2 pl-7">
                    <ScoreBar
                      value={school.overallScore}
                      size="sm"
                      delayMs={2160 + i * 60}
                      label={`${school.name}, overall ${school.overallScore.toFixed(1)}`}
                    />
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

function StatCell({
  value,
  label,
  border = false,
}: {
  value: string;
  label: string;
  border?: boolean;
}) {
  return (
    <div
      className={
        border
          ? "border-t border-rule-soft px-4 py-5 md:border-l md:border-t-0"
          : "px-4 py-5 md:border-t-0"
      }
    >
      <StatBlock value={value} label={label} />
    </div>
  );
}