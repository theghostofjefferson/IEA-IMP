import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A Tally form, embedded the way Tally documents it, loaded as cheaply as it
 * can be.
 *
 * WHERE THE TIME GOES
 * Tally's embed is a chain: our JS -> the page's chunk -> `embed.js` -> the
 * iframe's `src` -> tally.so's HTML -> Tally's app -> the form. Each link
 * waits for the one before it, and the first request to tally.so also pays for
 * DNS and a TLS handshake at the moment it is needed. Ours is only the first
 * two links; the rest is Tally's, and cannot be shortened from here. What can
 * be done is to stop the chain starting late, stop it starting at all when
 * nobody will see the form, and make the wait honest.
 *
 *   1. WARM-UP. The connection to tally.so and the download of `embed.js` start
 *      during the first render of a form that will certainly be used (`eager`),
 *      or the moment a lazy one is wanted, not after the effect that used to
 *      follow, so they overlap with the page's own rendering.
 *   2. LAZY. Not a byte is requested from tally.so until the form is near the
 *      viewport. A form under a long introduction on a phone costs nothing
 *      until the reader scrolls toward it.
 *   3. ONCE. `embed.js` is added to the page at most once, through a module
 *      level promise that survives remounts, route changes and React
 *      StrictMode's double effects; `Tally.loadEmbeds()` only ever sees an
 *      iframe that has not been started.
 *   4. NO SHIFT. The iframe's height is reserved up front, so the page does not
 *      jump when it arrives; Tally's `dynamicHeight=1` still resizes it.
 *   5. HONEST WAIT. A skeleton in the site's own colours (announced to screen
 *      readers) shows until Tally reports the form loaded; if that takes
 *      unusually long, a direct link to the form appears.
 *
 * The form's own address, including every parameter, is passed through
 * untouched; the form inside the iframe is never styled from here.
 */

const SCRIPT_SRC = "https://tally.so/widgets/embed.js";
const ORIGIN = "https://tally.so";
const SLOW_MS = 12_000;

declare global {
  interface Window {
    Tally?: { loadEmbeds: () => void };
  }
}

let warmed = false;
/** Start the connection and the script download early. Safe to call often. */
export function warmTally(): void {
  if (warmed || typeof document === "undefined") return;
  warmed = true;
  const add = (attrs: Record<string, string>) => {
    const link = document.createElement("link");
    for (const [k, v] of Object.entries(attrs)) link.setAttribute(k, v);
    document.head.appendChild(link);
  };
  add({ rel: "preconnect", href: ORIGIN });
  add({ rel: "preload", as: "script", href: SCRIPT_SRC });
}

let scriptReady: Promise<void> | null = null;
/**
 * Load Tally's script once for the whole session. Resolves on load AND on
 * error: on error `Tally` is simply absent and the caller falls back to
 * setting the iframe's `src` itself, which is Tally's own documented fallback.
 */
function loadScript(): Promise<void> {
  if (window.Tally) return Promise.resolve();
  if (scriptReady) return scriptReady;
  scriptReady = new Promise<void>((resolve) => {
    let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => resolve(), { once: true });
  });
  return scriptReady;
}

/** Start every embed that has not been started yet. */
function startEmbeds(): void {
  if (window.Tally) {
    window.Tally.loadEmbeds();
    return;
  }
  document
    .querySelectorAll<HTMLIFrameElement>("iframe[data-tally-src]:not([src])")
    .forEach((frame) => {
      frame.src = frame.dataset.tallySrc ?? "";
    });
}

/** Tally tells the host page when the form has rendered. */
function isFormLoaded(data: unknown): boolean {
  try {
    const text = typeof data === "string" ? data : JSON.stringify(data);
    return text.includes("Tally.FormLoaded");
  } catch {
    return false;
  }
}

type Props = {
  /** The full embed address, parameters included. */
  src: string;
  /** Accessible name for the iframe. */
  title: string;
  /** Height to hold open until Tally reports the real one. */
  reservedHeight?: number;
  /** Load immediately instead of when the form nears the viewport. */
  eager?: boolean;
};

export function TallyEmbed({ src, title, reservedHeight = 560, eager = false }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const [wanted, setWanted] = useState(eager);
  const [ready, setReady] = useState(false);
  const [slow, setSlow] = useState(false);

  // An eager form is certain to be used: warm the connection during the first
  // render, before any effect has run. A lazy one waits until it is wanted.
  if (eager) warmTally();

  // Lazy: wait until the form is within reach of the viewport.
  useEffect(() => {
    if (wanted) return;
    const el = wrapRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setWanted(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setWanted(true);
          io.disconnect();
        }
      },
      { rootMargin: "500px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [wanted]);

  // Once wanted, the iframe exists in the DOM; start it after the script is in.
  useEffect(() => {
    if (!wanted) return;
    warmTally();
    let cancelled = false;
    void loadScript().then(() => {
      if (cancelled) return;
      const frame = frameRef.current;
      if (frame && !frame.getAttribute("src")) startEmbeds();
    });
    return () => {
      cancelled = true;
    };
  }, [wanted]);

  // Hide the skeleton when Tally says the form has rendered; fall back to the
  // iframe's own load event so a missing message never leaves it up forever.
  useEffect(() => {
    if (!wanted || ready) return;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== ORIGIN) return;
      if (e.source && e.source !== frameRef.current?.contentWindow) return;
      if (isFormLoaded(e.data)) setReady(true);
    };
    window.addEventListener("message", onMessage);
    const slowTimer = window.setTimeout(() => setSlow(true), SLOW_MS);
    return () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(slowTimer);
    };
  }, [wanted, ready]);

  const onFrameLoad = useCallback(() => {
    // The shell has loaded; the form follows within moments. Do not wait for a
    // message that may never come.
    window.setTimeout(() => setReady(true), 1500);
  }, []);

  return (
    <div ref={wrapRef} className="relative" style={{ minHeight: reservedHeight }}>
      {wanted && (
        <iframe
          ref={frameRef}
          data-tally-src={src}
          width="100%"
          height={reservedHeight}
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title={title}
          onLoad={onFrameLoad}
          className="block w-full transition-opacity duration-300"
          style={{ opacity: ready ? 1 : 0 }}
        />
      )}

      {!ready && (
        <div
          role="status"
          aria-live="polite"
          className="absolute inset-0 flex flex-col gap-4 rounded-md px-1 py-2"
        >
          <span className="type-label text-ink-faint">
            {wanted ? "Loading the form…" : "The form will load here"}
          </span>
          <div aria-hidden="true" className="flex animate-pulse flex-col gap-4">
            <div className="h-5 w-2/5 rounded bg-bronze-soft/70" />
            <div className="h-11 w-full rounded bg-bronze-soft/50" />
            <div className="h-5 w-1/3 rounded bg-bronze-soft/70" />
            <div className="h-11 w-full rounded bg-bronze-soft/50" />
            <div className="h-5 w-1/2 rounded bg-bronze-soft/70" />
            <div className="h-24 w-full rounded bg-bronze-soft/50" />
          </div>
          {slow && (
            <p className="type-body text-ink-muted">
              This is taking longer than usual.{" "}
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="text-bronze-ink underline underline-offset-4"
              >
                Open the form in a new tab
              </a>
              .
            </p>
          )}
        </div>
      )}

      <noscript>
        <p className="type-body text-ink-muted">
          The form needs JavaScript. You can also open it directly:{" "}
          <a href={src} className="underline underline-offset-4">
            {title}
          </a>
          .
        </p>
      </noscript>
    </div>
  );
}
