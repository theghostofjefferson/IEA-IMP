import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";

import { SkyCanvas, type Hovered } from "@/components/sky/SkyCanvas";
import { buildStars, type Star } from "@/components/sky/skyData";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SEO, applySeo } from "@/lib/seo";
import { cn } from "@/lib/utils";

/**
 * /sky — a decorative page. Every rated school is a star; institutions under
 * review are claret stars low near the ridge. It is for looking at, and it
 * carries no information the rest of the site does not, so it is unlisted from
 * the sitemap and linked only from the footer.
 */
export function SkyPage() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const stars = useMemo(buildStars, []);
  const [hovered, setHovered] = useState<(Hovered & { via: "mouse" | "touch" }) | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => applySeo(SEO.sky), []);

  const onHover = useCallback((h: Hovered, via: "mouse" | "touch") => setHovered(h ? { ...h, via } : null), []);
  const onOpen = useCallback((s: Star) => navigate(s.href), [navigate]);

  return (
    <section
      aria-label="The night sky"
      className="relative isolate h-[calc(100dvh-4rem)] min-h-[32rem] overflow-hidden bg-[linear-gradient(to_bottom,#070a14_0%,#0e1530_55%,#1a2347_100%)] text-ink-inverse"
    >
      <SkyCanvas stars={stars} reduced={reduced} activeId={activeId} onHover={onHover} onOpen={onOpen} />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-6 pt-8 text-center md:pt-12">
        <p className="type-label text-gold">Institute for Educational Accountability</p>
        <h1 className="mt-3 font-serif text-3xl text-ink-inverse md:text-5xl">The Night Sky</h1>
        <p className="type-caption mx-auto mt-3 max-w-md text-ink-inverse/65">
          Every rated school is a star. Brighter, higher stars scored higher. The red ones are institutions under review.
          Positions are decorative.
        </p>
      </div>

      {hovered ? (
        <div
          className={cn(
            "absolute z-20 w-56 -translate-x-1/2 rounded-sm border bg-ink/90 px-3 py-2 text-left shadow-lg backdrop-blur-sm",
            hovered.star.kind === "review" ? "border-[#e0566b]/70" : "border-gold/60",
            hovered.via === "mouse" && "pointer-events-none",
          )}
          style={{
            left: `${Math.min(Math.max(hovered.x, 120), (typeof window !== "undefined" ? window.innerWidth : 1200) - 120)}px`,
            top: `${hovered.y + 22}px`,
          }}
        >
          <p className="font-serif text-base leading-snug text-ink-inverse">{hovered.star.label}</p>
          <p className="type-caption mt-0.5 text-ink-inverse/65">{hovered.star.detail}</p>
          {hovered.via === "touch" ? (
            <Link to={hovered.star.href} className="type-caption mt-2 inline-block text-gold underline underline-offset-4">
              Open →
            </Link>
          ) : null}
        </div>
      ) : null}

      {/* Keyboard and screen-reader route: the same stars as real links. */}
      <ul className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:bottom-3 focus-within:left-3 focus-within:z-30 focus-within:max-h-40 focus-within:overflow-auto focus-within:rounded-sm focus-within:bg-ink focus-within:p-3">
        {stars.map((s) => (
          <li key={s.id}>
            <Link
              to={s.href}
              onFocus={() => setActiveId(s.id)}
              onBlur={() => setActiveId(null)}
              className="type-caption text-ink-inverse underline"
            >
              {s.label} — {s.detail}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
