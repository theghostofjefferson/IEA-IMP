import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The one notice style for the whole site.
 *
 * Warnings, disclosures and legal notes all read as the same kind of thing: a
 * quiet card with a coloured spine, a small badge and a label. Colour carries
 * the kind of notice, so a reader learns the code once:
 *
 *   legal    claret   disclosures and legal positions
 *   caution  bronze   things to be careful about
 *   info     blue     plain clarifications
 */
type Tone = "legal" | "caution" | "info";

const TONE: Record<Tone, { spine: string; text: string; badge: string; glyph: string }> = {
  legal: { spine: "bg-claret", text: "text-claret", badge: "border-claret/40", glyph: "§" },
  caution: { spine: "bg-bronze", text: "text-bronze-ink", badge: "border-bronze/50", glyph: "!" },
  info: { spine: "bg-letter", text: "text-letter", badge: "border-letter/40", glyph: "i" },
};

export function Notice({
  tone = "info",
  label,
  children,
  id,
  className,
}: {
  tone?: Tone;
  label: string;
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  const t = TONE[tone];
  return (
    <aside
      id={id}
      aria-label={label}
      className={cn(
        "relative scroll-mt-24 flex gap-4 overflow-hidden rounded-md border border-rule-soft bg-surface/70 py-4 pl-6 pr-5 md:py-5 md:pl-7 md:pr-6",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("absolute inset-y-0 left-0 w-[3px]", t.spine)} />
      <span
        aria-hidden="true"
        className={cn(
          "mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border font-serif text-sm font-bold",
          t.badge,
          t.text,
        )}
      >
        {t.glyph}
      </span>
      <div className="min-w-0">
        <p className={cn("type-label", t.text)}>{label}</p>
        <div className="type-body measure mt-2 text-ink-muted">{children}</div>
      </div>
    </aside>
  );
}
