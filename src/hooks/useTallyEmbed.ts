import { useEffect } from "react";

/**
 * Official Tally embed integration, as a hook.
 *
 * Tally's documented embed is an `<iframe data-tally-src="...">` plus one
 * script (`widgets/embed.js`) that sets each iframe's `src` and resizes it from
 * the form's height (`dynamicHeight=1`). This hook reproduces Tally's own
 * loader for React:
 *
 *   - the script is added to <body> AT MOST ONCE, however many times the page
 *     mounts (it is looked up by `src` before it is created);
 *   - if the script is already loaded, `Tally.loadEmbeds()` is called straight
 *     away - that is the case on every visit after the first, because a client
 *     route change mounts a fresh iframe;
 *   - if the script is still loading, the embed runs on its `load` event;
 *   - if the script fails (blocked, offline), Tally's own fallback is used: the
 *     iframes get their `src` directly, so the form still appears, just
 *     without automatic resizing.
 */
const SCRIPT_SRC = "https://tally.so/widgets/embed.js";

declare global {
  interface Window {
    Tally?: { loadEmbeds: () => void };
  }
}

function loadEmbeds(): void {
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

export function useTallyEmbed(): void {
  useEffect(() => {
    if (window.Tally) {
      loadEmbeds();
      return;
    }

    let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }

    script.addEventListener("load", loadEmbeds);
    script.addEventListener("error", loadEmbeds);
    return () => {
      script?.removeEventListener("load", loadEmbeds);
      script?.removeEventListener("error", loadEmbeds);
    };
  }, []);
}
