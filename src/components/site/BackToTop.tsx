import { useEffect, useState } from "react";

/**
 * A quiet "back to top" button for the long pages (About, Methodology, the
 * rankings). It appears once the reader is well down the page, sits clear of
 * the iPhone home indicator, and is removed from tab order and the
 * accessibility tree while hidden.
 */
const SHOW_AFTER = 1400;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={
        "fixed right-4 z-40 inline-flex size-11 items-center justify-center rounded-full border border-bronze/60 bg-ink text-ink-inverse shadow-[0_8px_24px_-10px_rgb(19_26_44/0.6)] " +
        "bottom-[max(1rem,env(safe-area-inset-bottom))] md:right-8 md:bottom-8 " +
        "transition-[opacity,transform,background-color] duration-300 ease-brand hover:bg-bronze-ink " +
        (visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0")
      }
    >
      <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 16V4M4.5 9.5 10 4l5.5 5.5" />
      </svg>
    </button>
  );
}
