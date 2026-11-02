import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { Rule, AccentRule } from "@/components/site/Rule";
import { StatBlock, StatRow } from "@/components/data-display/StatBlock";
import { SectionHeader } from "@/components/data-display/SectionHeader";
import { Button } from "@/components/ui/button";
import { TeamCard } from "@/components/site/TeamCard";
import { Notice } from "@/components/site/Notice";
import { FaqItem } from "@/components/site/FaqItem";
import { MessageModal } from "@/components/site/MessageModal";
import { founderMessage, presidentMessage } from "@/data/messages";
import { contributors } from "@/data/contributors";
import { profilePathByName } from "@/data/profiles";
import { SEO, applySeo } from "@/lib/seo";
import { bandCounts, meanResponses, meta, totalSchools } from "@/lib/data";
import { formatCount, formatCountPlus, formatDate } from "@/lib/format";

/**
 * The institute, the numbers, the people.
 *
 * On the live site this page is literally "Information Unavailable". It exists
 * because a ranking is a statistical claim about named institutions, and the
 * reader is entitled to know who made it, how, and how much to trust it. The
 * how — and the FAQ about what the score means — live on `/methodology`.
 */
export function AboutPage() {
  /** Map member name → photo path, so each TeamCard can show the portrait. */
  const photoByName = new Map(
    contributors.map((c) => [c.name, c.photo ?? undefined]),
  );
  useEffect(() => applySeo(SEO.about), []);

  // `/about#notices` (linked from the footer) scrolls to the notices section.
  const { hash } = useLocation();
  useEffect(() => {
    if (hash !== "#notices") return;
    const id = window.setTimeout(
      () => document.getElementById("notices")?.scrollIntoView({ behavior: "smooth", block: "center" }),
      200,
    );
    return () => window.clearTimeout(id);
  }, [hash]);

  /** Which founder letter is open: null, "president", or "founder". */
  const [letter, setLetter] = useState<"president" | "founder" | null>(null);

  return (
    <Container>
      <div className="animate-route-in">
        <header className="pt-12 md:pt-20">
          <Reveal staggerMs={60}>
            <div className="flex items-center gap-3">
              <AccentRule />
              <span className="type-label text-bronze-ink">The institute</span>
            </div>

            <h1
              tabIndex={-1}
              className="type-title measure-tight mt-5 text-ink outline-none"
            >
              About Us
            </h1>

            <div className="mt-8 flex flex-col gap-6">
              <p className="type-body-lg measure text-ink-muted">
                The{" "}
                <strong className="font-bold text-ink">
                  Institute for Educational Accountability (IEA)
                </strong>{" "}
                advances transparency and accountability in education through
                field research, school investigations, online research, student
                surveys, and evidence-based analysis.
              </p>
              <p className="type-body-lg measure text-ink-muted">
                We seek to highlight institutional shortcomings, not manufacture
                accusations. Our claims are grounded in evidence, and our
                conclusions remain proportionate to what that evidence
                establishes.
              </p>
              <p className="type-body-lg measure text-ink-muted">
                Where necessary, we pursue appropriate institutional and legal
                avenues to seek meaningful change.
              </p>
            </div>

            {/* The principle, set as a pull quote: same type size, but ruled
                and tinted so it reads as the sentence the page stands on. */}
            <blockquote className="mt-10 max-w-[46rem] border-l-[3px] border-bronze bg-bronze-soft/30 py-6 pr-6 pl-6 md:pl-8">
              <p className="type-body-lg text-ink">
                Guided by the principle that power must be accompanied by
                accountability, we strive to ensure that educational institutions
                remain answerable to the students they serve, while holding our
                own work to the same standards of fairness, evidence, and
                transparency.
              </p>
            </blockquote>
          </Reveal>
        </header>

        <Rule tone="rule" className="mt-10" />

        {/* --- the project in numbers ------------------------------------- */}
        <Reveal className="py-12 md:py-16" delayMs={60}>
          <StatRow>
            <StatBlock
              value={formatCount(totalSchools)}
              label="schools rated"
              sublabel={`${formatDate(meta.publicationDate)}`}
            />
            <StatBlock
              value={formatCountPlus(meta.totalResponses)}
              label="students answered"
              sublabel={`mean ${meanResponses} per school`}
            />
            <StatBlock
              value={formatCount(bandCounts.strong)}
              label="rated strong"
              sublabel={`${bandCounts.fair} fair, ${bandCounts.weak} weak`}
            />
          </StatRow>

          <Notice tone="info" label="Respondent confidentiality" className="mt-8 max-w-[46rem]">
            Survey respondents provided their identities to IEA. Those identities are held
            confidentially and are not disclosed publicly.
          </Notice>
        </Reveal>

        <Rule />

        {/* --- research timeline ------------------------------------------- */}
        <Reveal className="py-12 md:py-16" delayMs={120}>
          <section className="relative isolate overflow-hidden rounded-2xl border-2 border-ink/20 bg-white px-6 py-8 shadow-sm md:px-10 md:py-10">
            <div className="relative z-10">
          <div className="flex items-center gap-3">
            <AccentRule />
            <span className="type-label text-bronze-ink">Research and development</span>
          </div>
          <h2 className="type-heading mt-4 text-ink">How the work has developed</h2>
          <div className="mt-8 max-w-[46rem] border-l border-rule pl-5 md:pl-7">
            <div className="mb-6">
              <p className="type-label text-bronze-ink">2025</p>
              <p className="type-body mt-1 text-ink-muted">Survey design and methodology development began.</p>
            </div>
            <div className="mb-6">
              <p className="type-label text-bronze-ink">Early 2026</p>
              <p className="type-body mt-1 text-ink-muted">Online research and literature review began.</p>
            </div>
            <div className="mb-6">
              <p className="type-label text-bronze-ink">Mid 2026</p>
              <p className="type-body mt-1 text-ink-muted">The first batch of surveys was completed.</p>
            </div>
            <div className="mb-6">
              <p className="type-label text-bronze-ink">Third quarter of 2026</p>
              <p className="type-body mt-1 text-ink-muted">Field research began.</p>
            </div>
            <div className="mb-6">
              <p className="type-label text-bronze-ink">September 2026</p>
              <p className="type-body mt-1 text-ink-muted">The litigation process began.</p>
            </div>
            <div>
              <p className="type-label text-bronze-ink">First quarter of 2027 · expected</p>
              <p className="type-body mt-1 text-ink-muted">
                The Institute expects to publish its research, field findings, and reporting on litigation-related work.
              </p>
            </div>
          </div>
            </div>
          </section>
        </Reveal>

        <Rule />

        {/* --- people ------------------------------------------------------ */}
        <Reveal className="py-8 md:py-20" delayMs={180}>
          <div className="mb-12 text-center md:mb-16">
            <h2 className="type-title text-ink mb-6 bg-clip-text text-transparent bg-gradient-to-r from-ink via-bronze to-ink">
              The team
            </h2>
          </div>

          {/* Founders */}
          <section className="relative mb-14 md:mb-20">
            <div className="absolute inset-0 -z-10 bg-bronze-soft/40 rounded-2xl blur-3xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
              <div className="founder-profile-card founder-profile-card--liberte md:col-start-1">
                <TeamCard
                  name="Eron Subedi" to={profilePathByName("Eron Subedi")}
                  role="Founder, Executive Chairman & Chief of Investigations"
                  featured
                />
                <Link
                  to="/#statement"
                  aria-label="Read the IEA statement of 31 October 2026 on the assault on freedom of expression in Nepal"
                  className="group relative mx-auto mt-6 block w-full max-w-[20rem] rounded-2xl border border-bronze/30 bg-gradient-to-b from-surface to-bronze-wash px-7 pb-5 pt-9 text-center shadow-[0_12px_30px_rgba(19,26,44,0.08)]"
                >
                  {/* Opening quotation mark, set into the top edge of the card. */}
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-0 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bronze/30 bg-surface font-serif text-2xl text-bronze-ink"
                  >
                    <span className="translate-y-[3px]">&ldquo;</span>
                  </span>
                  <span className="block font-serif text-[1.0625rem] font-medium leading-[1.55] text-[color:var(--ink)]">
                    We are not content to stand still by the will of God.
                  </span>
                  <span aria-hidden="true" className="mx-auto mt-4 block h-px w-10 bg-bronze/50" />
                  <span className="mt-3 block font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-bronze-ink">
                    31 October 2026
                  </span>
                  <span className="mt-1.5 inline-flex items-center gap-1.5 font-sans text-xs text-[color:var(--ink-muted)] transition-colors duration-300 group-hover:text-bronze-ink">
                    Read the IEA statement
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
                  </span>
                </Link>
                <Button
                  onClick={() => setLetter("founder")}
                  className="bg-letter text-ink-inverse hover:bg-letter-deep active:bg-letter-deep"
                >
                  Message from founder
                </Button>
              </div>
              <div className="founder-profile-card founder-profile-card--president md:col-start-2">
                <TeamCard
                  name="Yogeshwor Sharma" to={profilePathByName("Yogeshwor Sharma")}
                  role="Co-Founder, President, & Head of Operations"
                  featured
                  photo={photoByName.get("Yogeshwor Sharma")}
                />
                <Button
                  onClick={() => setLetter("president")}
                  className="bg-letter text-ink-inverse hover:bg-letter-deep active:bg-letter-deep"
                >
                  Message from president
                </Button>
              </div>
            </div>
          </section>

          <div aria-hidden="true" className="my-10 h-px w-full bg-bronze/35 md:my-12" />

          {/* Leadership — Aarohan, S. Lamichhane, Tikaram, Prajjwal */}
          <section className="mb-14 md:mb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 items-start justify-items-center">
              <TeamCard name="Aarohan Baral" to={profilePathByName("Aarohan Baral")} role="Founding Member & Lead Developer" photo={photoByName.get("Aarohan Baral")} />
              <TeamCard name="S. Lamichhane" to={profilePathByName("S. Lamichhane")} role="Founding Member & COO" photo={photoByName.get("S. Lamichhane")} />
              <TeamCard name="Tikaram Sharma" to={profilePathByName("Tikaram Sharma")} role="Co-Founder & Statistical Analyst" photo={photoByName.get("Tikaram Sharma")} />
              <TeamCard name="Prajjwal Dhakal" to={profilePathByName("Prajjwal Dhakal")} role="Founding Member" photo={photoByName.get("Prajjwal Dhakal")} />
            </div>
          </section>

          <div aria-hidden="true" className="my-10 h-px w-full bg-bronze/35 md:my-12" />

          {/* Editorial and research leadership: editors, then the research leads. */}
          <section className="mb-14 md:mb-20">
            <div className="mx-auto flex max-w-3xl flex-col gap-10 md:gap-14">
              <div className="grid grid-cols-2 items-start justify-items-center gap-4 sm:gap-8 md:gap-12">
                <TeamCard name="Aishani Rai" to={profilePathByName("Aishani Rai")} role="Editorial Lead" photo={photoByName.get("Aishani Rai")} />
                <TeamCard name="Ashmit Pandey" to={profilePathByName("Ashmit Pandey")} role="Managing Editor and Associate Researcher" photo={photoByName.get("Ashmit Pandey")} />
              </div>
              <div className="grid grid-cols-2 items-start justify-items-center gap-4 sm:gap-8 md:gap-12">
                <TeamCard name="Abinash Poudel" to={profilePathByName("Abinash Poudel")} role="Lead of Online Research" photo={photoByName.get("Abinash Poudel")} />
                <TeamCard name="Krinjal Timalsina" to={profilePathByName("Krinjal Timalsina")} role="Lead Researcher" photo={photoByName.get("Krinjal Timalsina")} />
              </div>
            </div>
          </section>

          <div aria-hidden="true" className="my-10 h-px w-full bg-bronze/35 md:my-12" />

          {/* Research Executives, with the Research Analysts set beneath them in a
              bracketed panel so the reporting line reads at a glance. */}
          <section className="mb-14 md:mb-20" aria-label="Research Executives and the Research Analysts working under them">
            <div className="mx-auto grid max-w-3xl grid-cols-3 items-start justify-items-center gap-3 sm:gap-8 md:gap-10">
              <TeamCard name="Nischal Ghimire" to={profilePathByName("Nischal Ghimire")} role="Research Executive" photo={photoByName.get("Nischal Ghimire")} />
              <TeamCard name="Kaustuv Rimal" to={profilePathByName("Kaustuv Rimal")} role="Research Executive" emphasis />
              <TeamCard name="Aaditya Jha" to={profilePathByName("Aaditya Jha")} role="Research Executive" photo={photoByName.get("Aaditya Jha")} />
            </div>

            {/* Stem from the executives down into the analysts' panel. */}
            <div aria-hidden="true" className="mx-auto mt-8 flex flex-col items-center">
              <span className="size-1.5 rounded-full bg-bronze" />
              <span className="h-10 w-px bg-gradient-to-b from-bronze/70 to-bronze/25 md:h-14" />
            </div>

            <div className="relative rounded-2xl border border-bronze/30 bg-bronze-wash/40 px-4 pb-10 pt-12 md:px-10">
              <span className="type-label absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-bronze/40 bg-surface px-4 py-1.5 text-bronze-ink">
                Research Analysts
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 justify-items-center">
                <TeamCard name="Aadarsha Pandey" to={profilePathByName("Aadarsha Pandey")} role="Research Analyst" />
                <TeamCard name="Piyush Joshi" to={profilePathByName("Piyush Joshi")} role="Research Analyst" photo={photoByName.get("Piyush Joshi")} />
                <TeamCard name="Pratyush Neupane" to={profilePathByName("Pratyush Neupane")} role="Research Analyst" photo={photoByName.get("Pratyush Neupane")} />
                <TeamCard name="Sambriddhi Bhattarai" to={profilePathByName("Sambriddhi Bhattarai")} role="Research Analyst" photo={photoByName.get("Sambriddhi Bhattarai")} />
                <TeamCard name="Kashyap Shrestha" to={profilePathByName("Kashyap Shrestha")} role="Research Analyst" photo={photoByName.get("Kashyap Shrestha")} />
              </div>
            </div>

            {/* A second, matching panel for analysts outside the research team. */}
            <div className="relative mt-12 rounded-2xl border border-bronze/30 bg-bronze-wash/40 px-4 pb-10 pt-12 md:px-10">
              <span className="type-label absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-bronze/40 bg-surface px-4 py-1.5 text-bronze-ink">
                Other Analysts
              </span>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                <TeamCard name="Noaime G." role="Statistical Analyst" />
                <TeamCard name="E. Baskota" role="Data Analyst" />
              </div>
            </div>
          </section>
        </Reveal>

        <Notice tone="info" label="With thanks" className="mt-6 max-w-[46rem]">
          We want to show our gratitude to all those who answered the surveys
          honestly and made this possible. Their names and individual
          responses, however, will not be published anywhere, to maintain their
          anonymity.
        </Notice>

        <Rule />

        {/* --- independence ------------------------------------------------- */}
        <Reveal className="py-12 md:py-16" delayMs={220}>
          <div className="flex items-center gap-3">
            <AccentRule />
            <span className="type-label text-bronze-ink">Institutional independence</span>
          </div>
          <h2 className="type-heading mt-4 text-ink">Who we answer to</h2>
          <p className="type-body-lg mt-6 max-w-[46rem] text-ink">
            IEA does not accept donations or receive funding from foreign
            organisations. Every member of the Institute was born in Nepal.
          </p>
        </Reveal>

        <Rule />

        {/* --- intellectual foundations ------------------------------------
            Follows "Who we answer to": independence says who we answer to, this
            says what we answer by. Kept quiet - context, not a headline. */}
        <section className="py-10 md:py-12">
          <div className="flex items-center gap-3">
            <AccentRule />
            <span className="type-label text-bronze-ink">Intellectual foundations</span>
          </div>
          <h2 className="type-subheading mt-3 font-bold text-ink">The Madisonian tradition</h2>
          <div className="mt-4 flex flex-col gap-3">
            <p className="type-body measure text-ink-muted">
              The founder holds that the ideas of James Madison remain central to how
              freedom is understood and protected around the world: that power must be
              checked, that those who hold it must answer to the people it affects, and
              that open information is a precondition of self-government. These principles
              inform the Institute&rsquo;s purpose and practice. The founder has stated
              that he would not have undertaken this project without them, and the
              Institute seeks to conduct its work in that spirit.
            </p>
          </div>
        </section>

        <Rule />

        {/* --- notices and legal position ----------------------------------
            One place for everything the reader should know before relying on, or
            contacting, the Institute. */}
        <Reveal className="py-12 md:py-16" delayMs={240}>
          <SectionHeader
            eyebrow="Please note"
            title="Notices and our legal position"
            lede="How communications with the Institute are handled, and where we stand on legal action."
          />
          <div className="mt-8 max-w-[46rem]">
            <Notice id="notices" tone="legal" label="Notice to schools · Communications may be disclosed">
              Any school that contacts IEA, for any reason, should expect a public, accurate
              summary of its communication. Calls will be recorded only after participants have
              been informed and have consented. IEA will publish summaries only as permitted by
              applicable law.
            </Notice>
          </div>
        </Reveal>

        {/* --- institutional legal position -------------------------------- */}
        <Reveal className="py-12 md:py-16" delayMs={300}>
          <section className="institutional-legal-position" aria-labelledby="legal-position-title">
            <span className="legal-position-mark" aria-hidden="true">§</span>
            <div className="legal-position-content">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gold/35 pb-5">
                <div className="flex items-center gap-3">
                  <span className="accent-mark" />
                  <p className="type-label text-gold">Institutional position · Legal action</p>
                </div>
                <span className="type-caption text-ink-inverse/55">IEA / PUBLIC STATEMENT</span>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(15rem,0.75fr)_minmax(0,1.5fr)] lg:gap-16">
                <div>
                  <p className="type-label text-gold/80">Principle and remedy</p>
                  <h2 id="legal-position-title" className="type-title mt-4 max-w-[18ch] text-ink-inverse">
                    Institutional Position on Individualized Legal Action
                  </h2>
                  <div className="mt-6 h-px w-20 bg-gold" />
                </div>

                <div className="legal-position-copy flex flex-col gap-5">
                  <p className="type-body-lg text-ink-inverse/90">
                    The Institute for Educational Accountability (IEA) generally seeks to address systemic failures in educational accountability rather than single out individual schools. Our work is guided by a desire to improve institutional accountability and ensure ethical standards in the education sector.
                  </p>
                  <p className="type-body-lg text-ink-inverse/90">
                    However, this approach should not be mistaken for a relinquishment of our legal rights. Where an individual school initiates legal proceedings against IEA, engages in unlawful conduct, or seeks to suppress lawful reporting, we remain prepared to respond through appropriate legal means.
                  </p>
                  <p className="type-body-lg text-ink-inverse/90">
                    Where relevant and legally permissible, such proceedings may include the presentation of documented evidence and student accounts concerning the school&rsquo;s conduct. Evidence remains a critical tool for preserving accountability and promoting transparency.
                  </p>
                  <p className="type-body-lg text-ink-inverse/90">
                    IEA remains committed to the rule of law. Our preference for systemic reform does not preclude pursuing accountability against individual institutions when circumstances warrant it.
                  </p>
                </div>
              </div>

            </div>
          </section>
        </Reveal>

        {/* --- frequently asked questions ---------------------------------- */}
        <Rule />
        <Reveal className="py-12 md:py-16" delayMs={340}>
          <section aria-label="Frequently asked questions">
            <SectionHeader
              eyebrow="Answers"
              title="Frequently asked questions"
              lede="More detail on the Institute, its research, and the people behind it."
            />
            <div className="mt-6 max-w-[52rem]">
              <FaqItem
                question="What is the Institute for Educational Accountability?"
                answer={
                  <p className="type-body measure-snug text-ink-muted">
                    The Institute for Educational Accountability (IEA) conducts research on
                    educational accountability in Nepal through student surveys, school
                    investigations, online research, field research, and evidence-based analysis.
                  </p>
                }
              />
              <FaqItem
                question="How are the school rankings calculated?"
                answer={
                  <p className="type-body measure-snug text-ink-muted">
                    Overall scores combine School Environment (30%), Net Benefit (30%),
                    Infrastructure (20%), and Net Cost (20%). Net Cost is inverted, so a lower
                    cost burden contributes a higher score. The <Link to="/methodology" className="underline underline-offset-4">methodology page</Link> explains the scoring and ranking process.
                  </p>
                }
              />
              <FaqItem
                question="What does a school's score tell me?"
                answer={
                  <p className="type-body measure-snug text-ink-muted">
                    It summarizes how student respondents rated the school across the published
                    dimensions and how it compares with other schools in the dataset. It is not
                    an accreditation, an endorsement, or an individual recommendation for a student.
                  </p>
                }
              />
              <FaqItem
                question="How are survey participants' responses handled?"
                answer={
                  <p className="type-body measure-snug text-ink-muted">
                    Survey respondents identify themselves to IEA. The Institute keeps their identities
                    confidential and does not disclose them publicly. Individual responses are
                    not published.
                  </p>
                }
              />
              <FaqItem
                question="How does IEA handle communication from schools?"
                answer={
                  <p className="type-body measure-snug text-ink-muted">
                    A school contacting IEA should expect an accurate public summary of its
                    communication, subject to applicable law. Calls are recorded only after
                    participants have been informed and have consented.
                  </p>
                }
              />
              <FaqItem
                question="Who can request underlying sources and supporting evidence?"
                answer={
                  <p className="type-body measure-snug text-ink-muted">
                    Requests are considered from government bodies, international watchdogs, and
                    human rights institutions. They may be sent to{" "}
                    <a href="mailto:request@ieainstitute.org" className="underline underline-offset-4">
                      request@ieainstitute.org
                    </a>.
                  </p>
                }
              />

            </div>
          </section>
        </Reveal>

        <Rule />

        {/* --- provenance --------------------------------------------------- */}
        <Reveal className="py-12 md:py-16" delayMs={260}>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Button asChild variant="outline">
              <Link to="/rankings">See the rankings</Link>
            </Button>
            <Button asChild variant="link">
              <Link to="/">Back to the home page</Link>
            </Button>
          </div>
        </Reveal>

        {/* --- founder letters --------------------------------------------- */}
        <MessageModal
          open={letter === "president"}
          onClose={() => setLetter(null)}
          name="Yogeshwor Sharma"
          role="Message from the President"
          blocks={presidentMessage}
        />
        <MessageModal
          open={letter === "founder"}
          onClose={() => setLetter(null)}
          name="Eron Subedi"
          role="Message from the Founder"
          blocks={founderMessage}
        />
      </div>
    </Container>
  );
}
