import type { CSSProperties } from "react";
import { Link } from "react-router";

import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";
import { Monogram } from "@/components/data-display/Monogram";
import { isHiddenName, photoBlurClass, RESTRICTED_LABEL, WITHHELD_NAME } from "@/config/restrictions";

/**
 * One person card.
 *
 * An arched portrait inside a gold frame. On hover the frame's light travels
 * round it, the portrait tilts towards the pointer (see `useCardSpotlight`) and
 * colour returns to the photograph. Cards rise into place as they scroll into
 * view, staggered by `index`. Photos load from `public/people/<id>.jpg` when
 * you set `photo`; otherwise a monogram shows.
 */
export function TeamCard({
  name,
  role,
  photo,
  featured = false,
  emphasis = false,
  to,
  index = 0,
  former = false,
  restricted = false,
}: {
  name: string;
  role: string;
  photo?: string;
  featured?: boolean;
  /** A quiet step up in standing: bolder, slightly larger name and a brighter frame. */
  emphasis?: boolean;
  /** When set, the whole card links to this profile page. */
  to?: string;
  /** Position within its row; sets the entrance delay. */
  index?: number;
  /** Has left the Institute: muted portrait, and a "Former member" label. */
  former?: boolean;
  /** Name and portrait are withheld (see `config/restrictions.ts`): shows a placeholder, no link. */
  restricted?: boolean;
}) {
  const { ref, visible } = useReveal<HTMLElement>();
  restricted = restricted || isHiddenName(name);
  if (restricted) {
    name = WITHHELD_NAME;
    photo = undefined;
    to = undefined;
  }

  const content = (
    <>
      <div className={cn("tc-frame", featured && "tc-frame--lg", emphasis && "tc-frame--emph", former && "tc-frame--former")}>
        <div className={cn("tc-inner", photo ? "bg-canvas" : "bg-sunken")}>
          {restricted ? (
            <div aria-hidden="true" className="flex h-full w-full flex-col items-center justify-center gap-2 text-ink-faint">
              <svg viewBox="0 0 24 24" className="size-9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="11" width="14" height="9" rx="1.5" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
            </div>
          ) : photo ? (
            <img src={photo} alt={name} className={cn("tc-img portrait-img", photoBlurClass())} />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-ink-faint">
              <Monogram name={name} size={featured ? "xl" : "md"} tone="neutral" />
            </div>
          )}
        </div>
        <span aria-hidden="true" className="tc-glow" />
      </div>

      <div className="mt-5 flex flex-col items-center">
        <p
          className={cn(
            "tc-name font-serif font-bold leading-tight text-ink text-center transition-colors duration-300 ease-brand group-hover:text-bronze",
            featured
              ? "px-2 py-1 text-[1.0625rem] sm:text-[1.1875rem]"
              : emphasis
                ? "font-black text-[1rem] sm:text-[1.125rem]"
                : "text-[0.9375rem] sm:text-[1rem]",
          )}
        >
          {name}
        </p>
        <p className="mt-2 type-caption text-center text-[0.75rem] uppercase tracking-[0.14em] text-ink-faint transition-colors duration-300 ease-brand group-hover:text-bronze">
          {role}
        </p>
        {former ? <span className="tc-former mt-2">Former member</span> : null}
        {restricted ? <span className="tc-former mt-2">{RESTRICTED_LABEL}</span> : null}
      </div>
      {to ? (
        <span className="tc-cta mt-2 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-bronze-ink">
          View profile <span aria-hidden="true">&rarr;</span>
        </span>
      ) : null}
    </>
  );

  const rootClass = cn("team-card tc-card flex flex-col items-center group", visible && "tc-on", former && "tc-card--former");
  const style = { "--d": `${(index % 6) * 80}ms` } as CSSProperties;
  return to ? (
    <Link
      ref={ref as React.Ref<HTMLAnchorElement>}
      to={to}
      style={style}
      aria-label={`${name}, ${former ? "former " : ""}${role} - view profile`}
      className={cn(rootClass, "rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze")}
    >
      {content}
    </Link>
  ) : (
    <div ref={ref as React.Ref<HTMLDivElement>} style={style} className={rootClass}>
      {content}
    </div>
  );
}
