import { bandCounts, totalSchools } from "@/lib/data";
import { BAND_LABEL, BAND_THRESHOLDS } from "@/lib/scoring";
import type { Band } from "@/lib/types";
import { cn } from "@/lib/utils";
import type { Filters } from "@/lib/filters";
import type { CSSProperties } from "react";

const ORDER: Band[] = ["strong", "fair", "weak"];

const RANGE: Record<Band, string> = {
  strong: `${BAND_THRESHOLDS.strong}+`,
  fair: `${BAND_THRESHOLDS.fair}–${BAND_THRESHOLDS.strong - 1}`,
  weak: `under ${BAND_THRESHOLDS.fair}`,
};

/**
 * One bar for the whole field: how many of the schools fall in each band.
 *
 * The segments are also the band filter. Pressing one narrows the table to that
 * band and dims the other two; pressing it again clears it. State lives in the
 * URL with the rest of the filters, so a filtered view is still shareable.
 */
export function BandBar({ band, onBand }: { band: Filters["band"]; onBand: (b: Filters["band"]) => void }) {
  return (
    <section aria-label="How the schools are distributed across score bands" className="pt-8 md:pt-10">
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <p className="type-label text-ink-muted">Where the {totalSchools} schools fall</p>
        {band !== "all" ? (
          <button
            type="button"
            onClick={() => onBand("all")}
            className="type-caption text-bronze-ink underline underline-offset-4 hover:decoration-2"
          >
            Show all
          </button>
        ) : null}
      </div>

      <div className="flex gap-1">
        {ORDER.map((b, i) => {
          const n = bandCounts[b] ?? 0;
          if (n === 0) return null;
          const active = band === b;
          return (
            <button
              key={b}
              type="button"
              aria-pressed={active}
              aria-label={`${BAND_LABEL[b]}, ${RANGE[b]}: ${n} schools. ${active ? "Showing only these. Press to clear." : "Press to show only these."}`}
              onClick={() => onBand(active ? "all" : b)}
              style={{ flexGrow: n, flexBasis: 0, "--d": i } as CSSProperties}
              className={cn(
                "band-seg group min-w-0 text-left transition-opacity duration-300",
                band !== "all" && !active && "opacity-40 hover:opacity-80",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "block h-2.5 rounded-sm transition-[height] duration-300 group-hover:h-3.5",
                  b === "strong" && "bg-band-strong",
                  b === "fair" && "bg-band-fair",
                  b === "weak" && "bg-band-weak",
                )}
              />
              <span className="mt-2 block truncate type-caption text-ink-muted">
                <span className="font-bold text-ink">{n}</span> {BAND_LABEL[b]}
                <span className="hidden text-ink-faint sm:inline"> · {RANGE[b]}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
