import { useEffect } from "react";
import { Link, useParams } from "react-router";

import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/site/Reveal";
import { Rule } from "@/components/site/Rule";
import { TeamCard } from "@/components/site/TeamCard";
import { inline } from "@/components/site/MessageModal";
import { Monogram } from "@/components/data-display/Monogram";
import {
  getProfileMember,
  memberPhoto,
  profileMembers,
  profilePath,
  profiles,
  type MemberProfile,
} from "@/data/profiles";
import { applySeo, memberSeo } from "@/lib/seo";
import type { Contributor } from "@/lib/types";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { cn } from "@/lib/utils";

/**
 * One member of the Institute.
 *
 * Same split as `SchoolPage`: the outer component resolves the id so a bad URL
 * renders the 404 in place, and the inner one owns the hooks.
 *
 * One quiet layout for everyone. What appears on a page is driven by
 * `data/profiles.ts` - sections with no content are simply omitted.
 */
export function TeamMemberPage() {
  const { id } = useParams<{ id: string }>();
  const member = getProfileMember(id);
  if (!member) return <NotFoundPage />;
  return <MemberDetail member={member} />;
}

function MemberDetail({ member }: { member: Contributor }) {
  const profile = profiles[member.id] ?? {};

  useEffect(() => applySeo(memberSeo(member, profile.summary)), [member, profile.summary]);

  const all = profileMembers();
  const idx = all.findIndex((m) => m.id === member.id);
  const others = all.filter((m) => m.id !== member.id);

  return (
    <Container>
      <div className="animate-route-in">
        <StandardHeader member={member} profile={profile} />

        <Details member={member} profile={profile} />

        <Rule />

        <Reveal className="py-12 md:py-16" delayMs={60}>
          <h2 className="type-label text-ink-faint">More from the team</h2>
          <div className="mt-8 grid grid-cols-2 justify-items-center gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {others.map((m) => (
              <TeamCard key={m.id} name={m.name} role={m.role} photo={memberPhoto(m)} to={profilePath(m.id)} />
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

/* ---------------------------- standard header ------------------------------ */

function StandardHeader({ member, profile }: { member: Contributor; profile: MemberProfile }) {
  const photo = memberPhoto(member);
  const showPortrait = profile.showPhoto !== false;
  return (
    <header className="pt-10 md:pt-16">
      <Link to="/about" className="type-caption text-bronze-ink underline underline-offset-4 hover:decoration-2">
        &larr; The team
      </Link>
      <div className={cn("mt-8 grid items-start gap-8", showPortrait && "sm:grid-cols-[auto_1fr] sm:gap-12")}>
        {showPortrait ? (
          <div className="w-44 sm:w-56">
            <div className="aspect-[4/5] overflow-hidden rounded-sm border border-rule-soft bg-sunken">
              {photo ? (
                <img src={photo} alt={member.name} className="size-full object-cover object-[50%_25%]" />
              ) : (
                <div className="flex size-full items-center justify-center">
                  <Monogram name={member.name} size="xl" tone="neutral" />
                </div>
              )}
            </div>
          </div>
        ) : null}
        <div className="min-w-0">
          <p className="type-label text-bronze-ink">{member.role}</p>
          <h1 tabIndex={-1} className="type-title mt-3 text-ink outline-none">
            {member.name}
          </h1>
          <div aria-hidden="true" className="mt-5 h-px w-16 bg-bronze/70" />
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

function Details({ member, profile }: { member: Contributor; profile: MemberProfile }) {
  const hasBio = !!profile.bio?.length;
  const hasFocus = !!profile.focus?.length;
  const hasContact = !!profile.contact?.length;
  const empty = !hasBio && !hasFocus && !hasContact;

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
