import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router";

import { ShatterExit } from "@/components/intro/ShatterExit";
import { SplashBody } from "@/components/intro/SplashBody";
import { useIntro } from "@/hooks/useIntro";
import { cn } from "@/lib/utils";

/**
 * The splash screen: a short credit sequence, then the site.
 *
 * **It plays on `/` and nowhere else.** A reader who lands on `/rankings` from a
 * shared link, or follows a school from search, gets the site immediately — the
 * sequence is an introduction to the project, not a toll to pass through, and
 * making someone sit through it on every internal navigation would be hostile.
 *
 * **It plays on every load of `/`, including every refresh.** There is no
 * session flag. The whole point of the sequence is that the people who built
 * this are seen; suppressing it after the first view meant most people never
 * saw it at all.
 *
 * `children` is rendered ALWAYS and the overlay is its SIBLING, not a wrapper:
 *
 *   - the page is live and interactive from the first frame, so there is never
   *     a blank screen and a throttled timer cannot produce a broken site
   *   - the overlay catches taps from the first frame, so the tap that closes it
   *     is spent on closing it and cannot reach a link or card underneath
   *   - the exit can REVEAL the page (the splash breaks into shards that fall away) instead of
   *     cross-fading two things, which reads as a designed transition
 *
 * Skipped entirely — not shortened — under `prefers-reduced-motion`, with
 * `?skipIntro=1`, or on any interaction.
 */
export function IntroGate({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const { phase, visible, dismiss } = useIntro(isHome);
  // Where the reader tapped, as a fraction of the screen; the splash breaks from there.
  const [origin, setOrigin] = useState({ x: 0.5, y: 0.45 });

  /**
   * `intro-active` is what makes the page wait before settling in. It is
   * applied ONLY while the overlay is genuinely on screen.
   *
   * This is not a nicety. The page's entrance animation uses
   * `animation-fill-mode: both`, so a non-zero delay pins it at `opacity: 0`
   * for the whole delay. If this class were applied when the splash is not
   * showing, every non-home route would render a blank page for two seconds.
   * See docs/09-BUGS.md § A7.
   */
  useEffect(() => {
    const root = document.documentElement;
    if (!visible || phase === "exiting") {
      root.classList.remove("intro-active");
      return;
    }
    root.classList.add("intro-active");
    return () => root.classList.remove("intro-active");
  }, [visible, phase]);

  if (!visible) return <>{children}</>;

  return (
    <>
      {children}

      {/*
        aria-hidden from the first frame, and gone from the DOM entirely
        afterwards. A screen reader must never be held hostage to a 2-second
        animation — that would be an accessibility failure, not a style choice.
      */}
      {phase === "exiting" ? (
        <ShatterExit originX={origin.x} originY={origin.y} />
      ) : (
        <div
          aria-hidden="true"
          data-intro-phase={phase}
          onClick={(e) => {
            // The crack starts where the reader tapped.
            setOrigin({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
            dismiss();
          }}
          className={cn(
            "fixed inset-0 z-50 flex flex-col items-center justify-between bg-ink px-6 pb-12 pt-10 sm:pt-12",
            // Catches every tap while it is up, so a tap meant to dismiss never
            // lands on the page beneath it. `touch-manipulation` removes the
            // double-tap-zoom delay on phones.
            "cursor-pointer touch-manipulation",
            "animate-[intro-overlay-in_300ms_cubic-bezier(0.16,1,0.3,1)_both]",
          )}
        >
          <SplashBody />
        </div>
      )}
    </>
  );
}
