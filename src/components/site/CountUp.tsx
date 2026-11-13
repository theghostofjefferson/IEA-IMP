import { useEffect, useState } from "react";

import { useReveal } from "@/hooks/useReveal";

/**
 * A figure that counts up to `to` the first time it scrolls into view.
 *
 * The final value is always what assistive tech reads (`aria-label`) and what
 * is rendered with reduced motion, without IntersectionObserver, or before
 * hydration, so the number is never wrong or missing — only the in-between
 * frames are decoration. Tabular figures keep the width steady while counting.
 */
export function CountUp({
  to,
  suffix = "",
  durationMs = 1400,
  delayMs = 0,
  className,
}: {
  to: number;
  suffix?: string;
  durationMs?: number;
  delayMs?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLSpanElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(to);
      return;
    }
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now + delayMs;
      const t = Math.min(Math.max((now - start) / durationMs, 0), 1);
      // easeOutExpo: fast start, long settle.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, to, durationMs, delayMs]);

  return (
    <span ref={ref} aria-label={`${to}${suffix}`} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      <span aria-hidden="true">
        {value}
        {suffix}
      </span>
    </span>
  );
}
