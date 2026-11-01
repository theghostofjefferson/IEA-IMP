import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { useNavigate } from "react-router";

import { Monogram } from "@/components/data-display/Monogram";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { bandColor } from "@/lib/scoring";
import { KIND_LABEL, PAGES, runSearch, type SearchEntry } from "@/lib/siteSearch";
import { cn } from "@/lib/utils";

/**
 * Site search, as a centred dialog.
 *
 * Searches schools, institutions under review, the people behind the Institute
 * and the site's own pages (see `lib/siteSearch.ts`). Fully keyboard driven:
 * arrows move, Enter opens, Esc closes, and focus returns to the trigger.
 *
 * ARIA follows the combobox + listbox pattern: DOM focus stays in the input and
 * `aria-activedescendant` names the highlighted result.
 */
export function SearchPalette({
  open,
  onClose,
  returnFocusRef,
}: {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
}) {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const uid = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const groups = useMemo(() => runSearch(query), [query]);
  // With no query, offer the pages as quick links.
  const suggestions = useMemo(() => PAGES.slice(0, 5), []);
  const flat: SearchEntry[] = useMemo(
    () => (query.trim() ? groups.flatMap((g) => g.items) : suggestions),
    [groups, query, suggestions],
  );

  const optionId = (i: number) => `${uid}-opt-${i}`;
  const hasQuery = query.trim().length > 0;

  // Reset on open; focus the field; lock page scroll; return focus on close.
  useEffect(() => {
    if (!open) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery("");
    setActive(0);
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const trigger = returnFocusRef.current;
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = prevOverflow;
      trigger?.focus();
    };
  }, [open, returnFocusRef]);

  // Keep the highlighted row in view while arrowing.
  useEffect(() => {
    if (!open) return;
    document.getElementById(optionId(active))?.scrollIntoView({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, open]);

  const go = (e: SearchEntry) => {
    onClose();
    navigate(e.to);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (flat.length) setActive((a) => (a + 1) % flat.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (flat.length) setActive((a) => (a - 1 + flat.length) % flat.length);
    } else if (e.key === "Enter") {
      const target = flat[active];
      if (target) {
        e.preventDefault();
        go(target);
      }
    }
  };

  let index = -1;
  const renderRow = (e: SearchEntry) => {
    index += 1;
    const i = index;
    const isActive = i === active;
    return (
      <li key={e.key} role="presentation">
        <button
          id={optionId(i)}
          role="option"
          aria-selected={isActive}
          type="button"
          tabIndex={-1}
          onMouseMove={() => setActive(i)}
          onClick={() => go(e)}
          className={cn(
            "flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-left transition-colors",
            isActive ? "bg-bronze-wash" : "bg-transparent",
          )}
        >
          <RowIcon entry={e} />
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="truncate font-serif text-[0.9375rem] font-bold text-ink">{e.title}</span>
            <span className="truncate font-sans text-xs text-ink-muted">{e.subtitle}</span>
          </span>
          {e.kind === "school" && e.score !== undefined ? (
            <span className={`type-numeric-sm ${bandColor(e.score)}`}>{e.score.toFixed(1)}</span>
          ) : null}
          <span
            aria-hidden="true"
            className={cn(
              "font-sans text-[0.625rem] font-bold uppercase tracking-[0.16em] text-bronze-ink transition-opacity",
              isActive ? "opacity-100" : "opacity-0",
            )}
          >
            Open &crarr;
          </span>
        </button>
      </li>
    );
  };

  return (
    <div
      aria-hidden={!open}
      inert={!open}
      className={cn(
        "fixed inset-0 z-50 flex items-start justify-center px-4 pt-[10vh] sm:pt-[12vh]",
        open ? "" : "pointer-events-none",
      )}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-ink/55 backdrop-blur-sm transition-opacity",
          reduced ? "duration-0" : "duration-200",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the Institute"
        onKeyDown={onKeyDown}
        className={cn(
          "relative flex max-h-[min(34rem,78vh)] w-full max-w-2xl flex-col overflow-hidden rounded-md border border-bronze/50 bg-surface shadow-[0_24px_60px_-20px_rgba(19,26,44,0.6)] transition-[opacity,transform] ease-brand",
          reduced ? "duration-0" : "duration-200",
          open ? "translate-y-0 scale-100 opacity-100" : "-translate-y-3 scale-[0.98] opacity-0",
        )}
      >
        {/* Brass hairline along the top edge */}
        <div aria-hidden="true" className="h-0.5 w-full bg-gradient-to-r from-transparent via-bronze to-transparent" />

        {/* Input row */}
        <div className="flex items-center gap-3 border-b border-rule-soft px-4 py-3 sm:px-5">
          <svg
            aria-hidden="true"
            className="size-5 shrink-0 text-bronze-ink"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7.5" />
            <path d="m20.5 20.5-4.2-4.2" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-controls={`${uid}-list`}
            aria-activedescendant={flat.length ? optionId(active) : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Search schools, institutions, people, pages…"
            aria-label="Search the Institute"
            className="min-w-0 flex-1 bg-transparent py-2 font-serif text-lg text-ink placeholder:font-serif placeholder:italic placeholder:text-ink-faint focus:outline-none"
          />
          {hasQuery ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActive(0);
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="inline-flex size-7 shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-bronze-soft hover:text-ink"
            >
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="shrink-0 rounded-sm border border-bronze/40 bg-canvas px-2 py-1 font-sans text-[0.625rem] font-bold uppercase tracking-[0.16em] text-ink-muted transition-colors hover:border-bronze hover:text-ink"
          >
            Esc
          </button>
        </div>

        {/* Results */}
        <div ref={listRef} id={`${uid}-list`} role="listbox" aria-label="Search results" className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
          {!hasQuery ? (
            <section aria-labelledby={`${uid}-sugg`}>
              <h2 id={`${uid}-sugg`} className="px-3 pb-1 pt-2 font-sans text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
                Quick links
              </h2>
              <ul role="presentation">{suggestions.map(renderRow)}</ul>
            </section>
          ) : groups.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <p className="font-serif text-base font-bold text-ink">No results for &ldquo;{query.trim()}&rdquo;</p>
              <p className="mt-1 font-sans text-sm text-ink-muted">
                Try a school name, a district, a team member, or a page such as &ldquo;methodology&rdquo;.
              </p>
            </div>
          ) : (
            groups.map((g) => (
              <section key={g.kind} aria-label={KIND_LABEL[g.kind]} className="mb-1">
                <h2 className="px-3 pb-1 pt-3 font-sans text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
                  {KIND_LABEL[g.kind]}
                </h2>
                <ul role="presentation">{g.items.map(renderRow)}</ul>
              </section>
            ))
          )}
        </div>

        {/* Footer hints */}
        <div className="hidden items-center justify-between border-t border-rule-soft bg-canvas px-5 py-2.5 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-ink-faint sm:flex">
          <span>
            <kbd className="font-bold text-ink-muted">&uarr;&darr;</kbd> Navigate
            <span className="mx-3 text-rule">|</span>
            <kbd className="font-bold text-ink-muted">&crarr;</kbd> Open
            <span className="mx-3 text-rule">|</span>
            <kbd className="font-bold text-ink-muted">Esc</kbd> Close
          </span>
          <span aria-live="polite">{hasQuery ? `${flat.length} result${flat.length === 1 ? "" : "s"}` : "Search the Institute"}</span>
        </div>
      </div>
    </div>
  );
}

function RowIcon({ entry }: { entry: SearchEntry }) {
  if (entry.kind === "school" || entry.kind === "person") {
    return <Monogram name={entry.title} label={entry.initials} size="sm" tone={entry.kind === "person" ? "neutral" : "brand"} />;
  }
  const glyph = entry.kind === "review" ? "!" : "↗";
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-full border font-serif text-sm font-bold",
        entry.kind === "review" ? "border-claret/60 text-claret" : "border-bronze/50 text-bronze-ink",
      )}
    >
      {glyph}
    </span>
  );
}
