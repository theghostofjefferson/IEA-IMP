import { useEffect, useRef } from "react";

/**
 * Pointer-driven light and tilt for `.team-card` children of one container.
 *
 * One delegated listener per container, not one per card. Writes four CSS
 * variables (--mx/--my for the light, --rx/--ry for the tilt) and nothing else;
 * the CSS decides what they do. Inert on touch devices and for reduced motion.
 */
export function useCardSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window.matchMedia !== "function") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const cardOf = (t: EventTarget | null) =>
      t instanceof Element ? t.closest<HTMLElement>(".team-card") : null;

    const onMove = (e: PointerEvent) => {
      const card = cardOf(e.target);
      if (!card || !el.contains(card)) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
        card.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
        card.style.setProperty("--ry", `${((x - 0.5) * 14).toFixed(2)}deg`);
        card.style.setProperty("--rx", `${((0.5 - y) * 14).toFixed(2)}deg`);
      });
    };

    const onOut = (e: PointerEvent) => {
      const card = cardOf(e.target);
      if (!card || card.contains(e.relatedTarget as Node | null)) return;
      cancelAnimationFrame(raf);
      card.style.removeProperty("--rx");
      card.style.removeProperty("--ry");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerout", onOut);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerout", onOut);
    };
  }, []);

  return ref;
}
