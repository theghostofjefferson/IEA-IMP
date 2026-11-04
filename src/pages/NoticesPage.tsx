import { Link, useLocation } from "react-router";
import { useEffect } from "react";

import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { Rule, AccentRule } from "@/components/site/Rule";
import { SEO, applySeo } from "@/lib/seo";

const PUBLICATIONS = [
  {
    to: "/reports",
    kicker: "Annual report",
    text: "The 2026 survey: its instrument, response rates and limitations.",
  },
  {
    to: "/methodology",
    kicker: "Methodology",
    text: "How the survey, the weights and the scores were built.",
  },
] as const;

/**
 * Notices & Publications: the Institute's public statements and the documents
 * behind its ratings, in one place.
 */
export function NoticesPage() {
  useEffect(() => applySeo(SEO.notices), []);

  // `/notices#statement`: the page is lazy-loaded, so the browser cannot scroll
  // to the anchor on its own. Do it once the page has mounted.
  const { hash } = useLocation();
  useEffect(() => {
    if (hash !== "#statement") return;
    const id = window.setTimeout(
      () => document.getElementById("statement")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      150,
    );
    return () => window.clearTimeout(id);
  }, [hash]);

  return (
    <Container>
      <div className="animate-route-in">
        <header className="pt-12 md:pt-20">
          <Reveal staggerMs={60}>
            <div className="flex items-center gap-3">
              <AccentRule />
              <span className="type-label text-bronze-ink">The Institute</span>
            </div>
            <h1 tabIndex={-1} className="type-title measure mt-5 text-ink outline-none">
              Notices &amp; Publications
            </h1>
            <p className="type-body-lg measure mt-6 text-ink-muted">
              Statements issued by the Institute, and the documents that explain our work.
            </p>
          </Reveal>
        </header>

        <Rule tone="rule" className="mt-10 md:mt-12" />

        <section aria-labelledby="statements" className="py-10 md:py-12">
          <h2 id="statements" className="type-label text-ink-faint">
            Statements
          </h2>
          <Reveal className="mt-6 min-w-0" delayMs={60}>
      <details
        id="statement"
        open
        style={{ borderLeft: "4px solid var(--claret)" }}
        className="group scroll-mt-24 overflow-hidden rounded-md border border-ink-inverse/10 bg-ink text-ink-inverse shadow-[0_18px_40px_-28px_rgba(19,26,44,0.6)] transition-shadow duration-500 open:shadow-[0_26px_55px_-28px_rgba(19,26,44,0.8)]"
      >
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
              A statement on press freedom, recent events, and why we continue our work
            </span>
          </span>
          <span className="type-caption hidden shrink-0 text-gold sm:block">
            Read statement <span aria-hidden="true" className="inline-block transition-transform duration-300 group-open:rotate-45">+</span>
          </span>
        </summary>

        <article className="border-t border-claret/50 px-5 py-6 sm:px-7 md:py-8">
          <div className="mx-auto flex max-w-4xl flex-col gap-6">
            <p className="type-body-lg measure">
              IEA is deeply alarmed by what we regard as a serious assault on freedom of expression
              in Nepal. Of particular concern are broad or uncertain applications of defamation and
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
              records the events and the stated police explanation.{" "}
              <a
                href="https://thehimalayantimes.com/kathmandu/police-raid-newsrooms-and-detain-journalists-in-capital-before-their-swift-release"
                target="_blank"
                rel="noreferrer"
                className="text-gold underline underline-offset-4"
              >
                Follow-up coverage
              </a>{" "}
              reported that all detained journalists were released. Separately, major social
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
              We have received direct threats. Together with the increasingly hostile environment,
              this has compelled us to make substantial changes to our website and temporarily
              restrict certain publications. Let there be no misunderstanding:{" "}
              <strong>a change in our methods is not a surrender of our convictions.</strong>
            </p>

            <p className="type-body-lg measure">
              IEA is exploring lawful avenues to preserve, document, and bring these reports to
              public attention, and our founder is personally leading the effort to develop
              those avenues. We remain
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
        </section>

        <Rule />

        <section aria-labelledby="publications" className="py-10 md:py-12">
          <h2 id="publications" className="type-label text-ink-faint">
            Publications
          </h2>
          <Reveal className="mt-6" delayMs={60}>
            <div className="grid gap-4 md:grid-cols-2">
              {PUBLICATIONS.map((c) => (
                <Link
                  key={c.to}
                  to={c.to}
                  className="group flex flex-col rounded-md border border-rule-soft bg-surface/70 p-5 transition-[border-color,background-color,transform] duration-300 ease-brand hover:-translate-y-0.5 hover:border-bronze hover:bg-bronze-wash"
                >
                  <span className="type-label text-bronze-ink">{c.kicker}</span>
                  <span className="type-body mt-2 text-ink-muted">{c.text}</span>
                  <span aria-hidden="true" className="mt-4 font-sans text-sm text-bronze-ink transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </section>
      </div>
    </Container>
  );
}
