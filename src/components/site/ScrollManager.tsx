import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router";

/**
 * Owns scroll position for the whole app.
 *
 * WHY THE APP TAKES THIS OVER FROM THE BROWSER
 * A single-page app swaps the page without the browser reloading, so the
 * browser's own scroll handling (which is designed for real page loads) is a
 * poor fit: it restores positions on back/forward at moments the app has not
 * rendered yet, and differs between Chrome, Safari and Firefox. Setting
 * `history.scrollRestoration = "manual"` turns that off and this component does
 * the one job itself, the same way in every browser:
 *
 *   - a normal navigation to another route  -> the new page starts at the top
 *   - back / forward                        -> the position the reader left that
 *                                              entry at is restored
 *   - a URL with a #hash                    -> that element is scrolled to
 *   - same route, only the query changed    -> left alone (typing in the
 *                                              rankings search must not jump)
 *
 * The scroller is the window (`document.scrollingElement`); nothing in the app
 * scrolls inside a container, so there is no other owner to reset.
 *
 * WHY IT RE-APPLIES FOR A WHILE
 * Route chunks and fonts arrive after the first commit and change the page
 * height, so a single `scrollTo` can be undone. The target is re-applied each
 * frame until the content settles, and the moment the reader touches, clicks or
 * presses a key it stops, so it never fights them. `wheel` is deliberately NOT
 * one of those signals: trackpad momentum keeps emitting wheel events after the
 * click that started the navigation, and treating those as "the reader took
 * over" cancelled the reset.
 */

/** Scroll offset last seen for each history entry (`location.key`). */
const positions = new Map<string, number>();
const STORE = "iea:scroll";

try {
  const saved = JSON.parse(sessionStorage.getItem(STORE) ?? "[]") as [string, number][];
  for (const [key, y] of saved) positions.set(key, y);
} catch {
  /* storage unavailable: positions simply start empty */
}

const HOLD_MS = 1500;
const STOP_EVENTS = ["touchstart", "pointerdown", "mousedown", "keydown"] as const;

function scrollNow(top: number) {
  window.scrollTo({ top, left: 0, behavior: "instant" });
}

/**
 * Put the page at `target` and keep it there while it settles. `target` may be
 * a number, or a function for targets that only exist once rendered (a hash).
 * Returns a cleanup that stops the hold.
 */
function holdAt(target: number | (() => number | null), untilFound = false): () => void {
  let stopped = false;
  let raf = 0;
  const started = performance.now();

  const resolve = () => (typeof target === "function" ? target() : target);
  const stop = () => {
    stopped = true;
    cancelAnimationFrame(raf);
    for (const e of STOP_EVENTS) window.removeEventListener(e, stop);
    window.removeEventListener("wheel", onWheel);
  };
  // A wheel event in the first instants is trackpad momentum from the click
  // that started the navigation, not the reader taking over. Later ones are.
  const onWheel = () => {
    if (performance.now() - started > 150) stop();
  };
  for (const e of STOP_EVENTS) window.addEventListener(e, stop, { passive: true });
  window.addEventListener("wheel", onWheel, { passive: true });

  const tick = () => {
    if (stopped) return;
    const y = resolve();
    if (y !== null && Math.abs(window.scrollY - y) > 1) scrollNow(y);
    const found = y !== null;
    const elapsed = performance.now() - started;
    if (elapsed < HOLD_MS || (untilFound && !found && elapsed < HOLD_MS * 2)) {
      raf = requestAnimationFrame(tick);
    } else {
      stop();
    }
  };
  tick();
  return stop;
}

/** How this document was loaded: "navigate", "reload" or "back_forward". */
function loadType(): string {
  try {
    const entry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    return entry?.type ?? "navigate";
  } catch {
    return "navigate";
  }
}

function hashTarget(hash: string): () => number | null {
  let id = hash.slice(1);
  try {
    id = decodeURIComponent(id);
  } catch {
    /* a malformed escape in the URL: use the raw text */
  }
  return () => {
    const el = document.getElementById(id);
    if (!el) return null;
    const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    return Math.max(0, el.getBoundingClientRect().top + window.scrollY - margin);
  };
}

export function ScrollManager() {
  const { pathname, search, hash, key } = useLocation();
  const navType = useNavigationType();
  const view = new URLSearchParams(search).get("view") ?? "";
  const routeKey = `${pathname}?view=${view}`;

  const keyRef = useRef(key);
  const routeRef = useRef<string | null>(null);
  const hashRef = useRef<string | null>(null);

  // Take scroll restoration away from the browser, and keep a record of where
  // the reader is on the current history entry.
  useLayoutEffect(() => {
    const previous = history.scrollRestoration;
    history.scrollRestoration = "manual";

    const save = () => positions.set(keyRef.current, Math.round(window.scrollY));
    const persist = () => {
      save();
      try {
        sessionStorage.setItem(STORE, JSON.stringify([...positions].slice(-60)));
      } catch {
        /* ignore */
      }
    };
    window.addEventListener("scroll", save, { passive: true });
    window.addEventListener("pagehide", persist);
    return () => {
      window.removeEventListener("scroll", save);
      window.removeEventListener("pagehide", persist);
      history.scrollRestoration = previous;
    };
  }, []);

  // Runs after the new page's DOM is committed and BEFORE the browser paints
  // it, so the reader never sees the new page at the old page's offset.
  useLayoutEffect(() => {
    const firstRun = routeRef.current === null;
    const routeChanged = routeRef.current !== routeKey;
    const hashChanged = hashRef.current !== hash;
    routeRef.current = routeKey;
    hashRef.current = hash;
    keyRef.current = key;

    // First paint of the document. A fresh visit is already at the top, so
    // there is nothing to do (and nothing to fight if the reader starts
    // scrolling at once). A reload or a return via the browser's own
    // back/forward restores where this entry was left.
    if (firstRun) {
      if (hash) return holdAt(hashTarget(hash), true);
      if (loadType() !== "navigate") return holdAt(positions.get(key) ?? 0);
      return;
    }

    if (navType === "POP") {
      const saved = positions.get(key);
      if (hash && saved === undefined) return holdAt(hashTarget(hash), true);
      return holdAt(saved ?? 0);
    }

    if (routeChanged) {
      return hash ? holdAt(hashTarget(hash), true) : holdAt(0);
    }
    if (hashChanged && hash) return holdAt(hashTarget(hash), true);
  }, [routeKey, hash, key, navType]);

  return null;
}
