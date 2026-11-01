import { useEffect } from "react";
import { Link, useParams } from "react-router";

import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { Rule } from "@/components/site/Rule";
import { TeamCard } from "@/components/site/TeamCard";
import { inline } from "@/components/site/MessageModal";
import { Monogram } from "@/components/data-display/Monogram";
import { founderMessage, presidentMessage, type MessageBlock } from "@/data/messages";
import {
  PRINCIPAL_IDS,
  getProfileMember,
  profileMembers,
  profilePath,
  profiles,
  type MemberProfile,
} from "@/data/profiles";
import { applySeo, memberSeo } from "@/lib/seo";
import type { Contributor } from "@/lib/types";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { cn } from "@/lib/utils";

const LETTERS: Record<string, MessageBlock[]> = {
  "eron-subedi": founderMessage,
  "yogeshwor-sharma": presidentMessage,
};

/**
 * One member of the Institute.
 *
 * Same split as `SchoolPage`: the outer component resolves the id so a bad URL
 * renders the 404 in place, and the inner one owns the hooks.
 *
 * Two layouts. The founder and the president get a full-width navy feature
 * panel and their signed letter inline; everyone else gets a quieter profile.
 * What appears on a page is driven by `data/profiles.ts` - sections with no
 * content are simply omitted.
 */
export function TeamMemberPage() {
  const { id } = useParams<{ id: string }>();
  const member = getProfileMember(id);
  if (!member) return <NotFoundPage />;
  return <MemberDetail member={member} />;
}

function MemberDetail({ member }: { member: Contributor }) {
  const profile = profiles[member.id] ?? {};
  const principal = PRINCIPAL_IDS.includes(member.id);

  useEffect(() => applySeo(memberSeo(member, profile.summary)), [member, profile.summary]);

  const all = profileMembers();
  const idx = all.findIndex((m) => m.id === member.id);
  const others = all.filter((m) => m.id !== member.id);

  return (
    <Container>
      <div className="animate-route-in">
        {principal ? (
          <PrincipalHero member={member} profile={profile} />
        ) : (
          <StandardHeader member={member} profile={profile} />
        )}

        {LETTERS[member.id] ? (
          <Reveal className="py-12 md:py-16" delayMs={40}>
            <section id="message" className="scroll-mt-24">
              <p className="type-label text-bronze-ink">
                A message from {member.id === "eron-subedi" ? "the founder" : "the president"}
              </p>
              <div className="mt-6 max-w-[42rem]">
                <Letter blocks={LETTERS[member.id]!} />
              </div>
            </section>
          </Reveal>
        ) : null}

        <Details member={member} profile={profile} showBio={!principal} />

        <Rule />

        <Reveal className="py-12 md:py-16" delayMs={60}>
          <h2 className="type-label text-ink-faint">More from the team</h2>
          <div className="mt-8 grid grid-cols-2 justify-items-center gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {others.map((m) => (
              <TeamCard key={m.id} name={m.name} role={m.role} photo={m.photo} to={profilePath(m.id)} />
            ))}
          </div>
        </Reveal>

        <Rule />

        <nav aria-label="Profiles" className="flex flex-wrap items-center justify-between gap-4 py-8">
          <Link to="/about" className="type-caption text-bronze-ink underline underline-offset-4 hover:decoration-2">
            &larr; Back to the team
          </Link>
          <div className="flex gap-6">
            {idx > 0 ? (
              <Link to={profilePath(all[idx - 1]!.id)!} className="type-caption text-ink-muted hover:text-ink">
                &larr; {all[idx - 1]!.name}
              </Link>
            ) : null}
            {idx < all.length - 1 ? (
              <Link to={profilePath(all[idx + 1]!.id)!} className="type-caption text-ink-muted hover:text-ink">
                {all[idx + 1]!.name} &rarr;
              </Link>
            ) : null}
          </div>
        </nav>
      </div>
    </Container>
  );
}

/* ---------------------------- principal feature ---------------------------- */

function PrincipalHero({ member, profile }: { member: Contributor; profile: MemberProfile }) {
  return (
    <section
      aria-label={`${member.name} - profile`}
      className="relative mt-6 overflow-hidden rounded-md bg-ink text-ink-inverse shadow-[0_30px_70px_-35px_rgba(19,26,44,0.8)] md:mt-10"
    >
      {/* Atmosphere: a warm glow and the emblem's columns, very faint. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_85%_-10%,rgba(201,178,124,0.18),transparent_60%),radial-gradient(40rem_26rem_at_0%_110%,rgba(138,106,53,0.16),transparent_60%)]"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 120 100"
        className="pointer-events-none absolute -right-10 bottom-0 h-[130%] text-ink-inverse opacity-[0.045]"
        fill="currentColor"
      >
        <rect x="8" y="6" width="104" height="8" rx="2" />
        <rect x="20" y="16" width="20" height="68" rx="3" />
        <rect x="50" y="16" width="20" height="68" rx="3" />
        <rect x="80" y="16" width="20" height="68" rx="3" />
        <rect x="4" y="86" width="112" height="8" rx="2" />
      </svg>
      {/* Brass double rule, top and bottom. */}
      <div aria-hidden="true" className="absolute inset-x-6 top-4 h-1 border-y border-[#b89a5e]/60 md:inset-x-10" />
      <div aria-hidden="true" className="absolute inset-x-6 bottom-4 h-1 border-y border-[#b89a5e]/60 md:inset-x-10" />

      <div className="relative grid items-center gap-10 px-6 pb-16 pt-14 md:grid-cols-[auto_1fr] md:gap-16 md:px-14 md:py-20">
        {/* Portrait, in a framed plate with an offset brass outline. */}
        <div className="mx-auto md:mx-0">
          <div className="relative">
            <div aria-hidden="true" className="absolute -bottom-3 -right-3 size-full rounded-sm border border-[#b89a5e]/70" />
            <div className="relative aspect-[4/5] w-60 overflow-hidden rounded-sm border border-[#b89a5e] bg-[#1c2438] sm:w-72 md:w-80">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="size-full object-cover object-[50%_25%]"
                />
              ) : (
                <div className="flex size-full items-center justify-center">
                  <Monogram name={member.name} size="xl" tone="neutral" />
                </div>
              )}
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        <div className="min-w-0 text-center md:text-left">
          <Link
            to="/about"
            className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[#c9b27c] transition-colors hover:text-ink-inverse"
          >
            &larr; The team
          </Link>
          <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-[#c9b27c]">{member.role}</p>
          <h1
            tabIndex={-1}
            className="mt-3 bg-gradient-to-b from-ink-inverse to-[#d9c9a3] bg-clip-text font-serif text-[2.5rem] font-black leading-[1.02] tracking-tight text-transparent outline-none sm:text-6xl md:text-7xl"
          >
            {member.name}
          </h1>
          <div aria-hidden="true" className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-[#b89a5e] to-transparent md:mx-0" />
          {profile.summary ? (
            <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-ink-inverse/75 md:mx-0 md:text-lg">
              {profile.summary}
            </p>
          ) : null}
          {profile.quote ? (
            <blockquote className="mx-auto mt-8 max-w-xl border-[#b89a5e] text-left md:mx-0 md:border-l-2 md:pl-5">
              <p className="font-serif text-xl italic leading-snug text-ink-inverse md:text-2xl">
                &ldquo;{profile.quote.text}&rdquo;
              </p>
              {profile.quote.source ? (
                <footer className="mt-2 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#c9b27c]">
                  {profile.quote.source}
                </footer>
              ) : null}
            </blockquote>
          ) : null}
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            {LETTERS[member.id] ? (
              <a
                href="#message"
                className="inline-flex h-11 items-center rounded-sm bg-[#c9b27c] px-5 font-sans text-xs font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink-inverse"
              >
                Read the message
              </a>
            ) : null}
            {profile.contact?.[0]?.href ? (
              <a
                href={profile.contact[0].href}
                className="inline-flex h-11 items-center rounded-sm border border-[#b89a5e]/70 px-5 font-sans text-xs font-bold uppercase tracking-[0.16em] text-ink-inverse transition-colors hover:border-ink-inverse"
              >
                Contact
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- standard header ------------------------------ */

function StandardHeader({ member, profile }: { member: Contributor; profile: MemberProfile }) {
  return (
    <header className="pt-10 md:pt-16">
      <Link to="/about" className="type-caption text-bronze-ink underline underline-offset-4 hover:decoration-2">
        &larr; The team
      </Link>
      <div className="mt-8 grid items-start gap-8 sm:grid-cols-[auto_1fr] sm:gap-12">
        <div className="relative w-44 sm:w-56">
          <div aria-hidden="true" className="absolute -bottom-2 -right-2 size-full rounded-sm border border-bronze/50" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-rule-soft bg-sunken">
            {member.photo ? (
              <img src={member.photo} alt={member.name} className="size-full object-cover object-[50%_25%]" />
            ) : (
              <div className="flex size-full items-center justify-center">
                <Monogram name={member.name} size="xl" tone="neutral" />
              </div>
            )}
          </div>
        </div>
        <div className="min-w-0">
          <p className="type-label text-bronze-ink">{member.role}</p>
          <h1 tabIndex={-1} className="type-title mt-3 text-ink outline-none">
            {member.name}
          </h1>
          <div aria-hidden="true" className="mt-5 h-px w-20 bg-bronze" />
          {profile.summary ? <p className="type-body-lg measure mt-5 text-ink-muted">{profile.summary}</p> : null}
          {profile.quote ? (
            <blockquote className="mt-6 max-w-xl border-l-2 border-bronze pl-4">
              <p className="font-serif text-lg italic text-ink">&ldquo;{profile.quote.text}&rdquo;</p>
              {profile.quote.source ? <footer className="type-caption mt-1 text-ink-faint">{profile.quote.source}</footer> : null}
            </blockquote>
          ) : null}
        </div>
      </div>
    </header>
  );
}

/* -------------------------------- sections --------------------------------- */

function Details({ member, profile, showBio }: { member: Contributor; profile: MemberProfile; showBio: boolean }) {
  const hasBio = showBio && !!profile.bio?.length;
  const hasFocus = !!profile.focus?.length;
  const hasContact = !!profile.contact?.length;
  const empty = showBio && !hasBio && !hasFocus && !hasContact;

  return (
    <>
      <Rule className="mt-12 md:mt-16" />
      <Reveal className="py-12 md:py-16" delayMs={80}>
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_18rem] md:gap-16">
          <div className="min-w-0">
            {hasBio ? (
              <>
                <h2 className="type-label text-bronze-ink">About {member.name.split(" ")[0]}</h2>
                <div className="mt-5 flex max-w-[42rem] flex-col gap-4">
                  {profile.bio!.map((para, i) => (
                    <p key={i} className="type-body-lg text-ink">
                      {inline(para)}
                    </p>
                  ))}
                </div>
              </>
            ) : null}
            {empty ? (
              <div className="max-w-[42rem] border border-dashed border-rule-soft px-5 py-6">
                <p className="type-label text-ink-faint">Profile in preparation</p>
                <p className="type-body mt-2 text-ink-muted">
                  A fuller profile for {member.name.split(" ")[0]} will be published here.
                </p>
              </div>
            ) : null}
            {hasFocus && !hasBio && !empty ? (
              <FocusList items={profile.focus!} />
            ) : null}
          </div>

          <aside className="flex min-w-0 flex-col gap-8">
            <div>
              <h2 className="type-label text-ink-faint">Role</h2>
              <p className="type-body mt-2 font-semibold text-ink">{member.role}</p>
              <p className="type-caption mt-1 text-ink-muted">Institute for Educational Accountability</p>
            </div>
            {hasFocus && hasBio ? <FocusList items={profile.focus!} compact /> : null}
            {hasContact ? (
              <div>
                <h2 className="type-label text-ink-faint">Contact</h2>
                <ul className="mt-2 flex flex-col gap-2">
                  {profile.contact!.map((c) => (
                    <li key={c.value}>
                      <span className="type-caption block text-ink-faint">{c.label}</span>
                      {c.href ? (
                        <a href={c.href} className="type-body break-all text-bronze-ink underline underline-offset-4 hover:decoration-2">
                          {c.value}
                        </a>
                      ) : (
                        <span className="type-body text-ink">{c.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </Reveal>
    </>
  );
}

function FocusList({ items, compact = false }: { items: string[]; compact?: boolean }) {
  return (
    <div>
      <h2 className={cn("type-label", compact ? "text-ink-faint" : "text-bronze-ink")}>Areas of work</h2>
      <ul className="mt-3 flex flex-col gap-2">
        {items.map((f) => (
          <li key={f} className="type-body flex gap-3 text-ink">
            <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-bronze" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Letter({ blocks }: { blocks: MessageBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "byline":
            return null;
          case "epigraph":
            return (
              <blockquote key={i} className="border-l-2 border-bronze pl-4">
                <p className="font-serif text-lg italic text-ink">{b.text}</p>
                <footer className="type-caption mt-1 text-ink-faint">{b.source}</footer>
              </blockquote>
            );
          case "h":
            return (
              <h3 key={i} className="type-subheading mt-4 font-bold text-ink">
                {b.text}
              </h3>
            );
          case "sign":
            return (
              <p key={i} className={cn("type-body mt-4 text-ink", b.style === "italic" ? "italic" : "font-bold")}>
                {b.lines.map((l, j) => (
                  <span key={j} className="block">
                    {l}
                  </span>
                ))}
              </p>
            );
          default:
            return (
              <p key={i} className="type-body-lg text-ink">
                {inline(b.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
