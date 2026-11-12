import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type RefObject,
} from "react";
import { useNavigate } from "react-router";

import { Monogram } from "@/components/data-display/Monogram";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { bandColor } from "@/lib/scoring";
import { KIND_LABEL, runSearch, type SearchEntry } from "@/lib/siteSearch";
import { cn } from "@/lib/utils";

/**
 * Site search: a centred dialog on larger screens, a full-height sheet on phones.
 *
 * On a phone the on-screen keyboard covers half the screen, so a floating box
 * with a blurred page behind it looks broken and its results hide under the
 * keys. The sheet instead fills the screen with a solid background, follows the
 * visual viewport (so it ends exactly where the keyboard begins), and swaps the
 * keyboard-only "Esc" hint for a plain "Cancel".
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

  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  // Height of what is actually visible (shrinks when the keyboard opens).
  const [visibleHeight, setVisibleHeight] = useState<number | null>(null);

  const groups = useMemo(() => runSearch(query), [query]);
  const flat: SearchEntry[] = useMemo(() => groups.flatMap((g) => g.items), [groups]);

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

  // Follow the visual viewport so the phone sheet stops above the keyboard.
  useEffect(() => {
    if (!open) return;
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => setVisibleHeight(Math.round(vv.height));
    vv.addEventListener("resize", update);
    return () => {
      vv.removeEventListener("resize", update);
      setVisibleHeight(null);
    };
  }, [open]);

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
            "relative flex w-full items-center gap-3 rounded-[3px] px-3 py-2.5 text-left transition-colors duration-150",
            isActive ? "bg-bronze-wash" : "bg-transparent",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-y-2 left-0 w-0.5 rounded-full bg-bronze transition-opacity duration-150",
              isActive ? "opacity-100" : "opacity-0",
            )}
          />
          <RowIcon entry={e} />
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="truncate font-sans text-[0.9375rem] font-semibold text-ink">{e.title}</span>
            <span className="truncate font-sans text-xs text-ink-muted">{e.subtitle}</span>
          </span>
          {e.kind === "school" && e.score !== undefined ? (
            <span className={`type-numeric-sm ${bandColor(e.score)}`}>{e.score.toFixed(1)}</span>
          ) : null}
        </button>
      </li>
    );
  };

  return (
    <div
      aria-hidden={!open}
      inert={!open}
      className={cn(
        "fixed inset-0 z-50 flex items-start justify-center sm:px-4 sm:pt-[14vh]",
        open ? "" : "pointer-events-none",
      )}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-ink/35 backdrop-blur-[3px] transition-opacity",
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
        style={{ "--vvh": visibleHeight ? `${visibleHeight}px` : "100dvh" } as CSSProperties}
        className={cn(
          "relative flex h-[var(--vvh)] w-full flex-col overflow-hidden bg-surface transition-[opacity,transform] ease-brand",
          "sm:h-auto sm:max-w-xl sm:rounded-md sm:border sm:border-rule-soft sm:shadow-[0_20px_50px_-24px_rgba(19,26,44,0.55)]",
          reduced ? "duration-0" : "duration-200",
          open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
        )}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 border-b border-rule-soft px-4 sm:border-b-0 sm:px-5">
          <svg
            aria-hidden="true"
            className="size-[18px] shrink-0 text-ink-muted"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
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
            aria-expanded={open && hasQuery}
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
            placeholder="Search schools, people and pages"
            aria-label="Search the Institute"
            className="h-16 min-w-0 flex-1 bg-transparent sm:h-14 font-sans text-base text-ink placeholder:text-ink-faint focus:outline-none"
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
              className="inline-flex size-7 shrink-0 items-center justify-center rounded-sm text-ink-muted transition-colors hover:bg-bronze-wash hover:text-ink"
            >
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="hidden shrink-0 rounded-sm border border-rule-soft px-1.5 py-0.5 font-sans text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-ink-faint transition-colors hover:text-ink sm:inline-block"
          >
            Esc
          </button>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 py-2 pl-1 font-sans text-[0.9375rem] font-semibold text-bronze-ink sm:hidden"
          >
            Cancel
          </button>
        </div>

        {/* Phone only: a calm line in place of an empty sheet. */}
        {!hasQuery ? (
          <p className="px-5 pt-6 font-sans text-sm leading-relaxed text-ink-muted sm:hidden">
            Search for a school, a district, a member of the Institute, or a page of this site.
          </p>
        ) : null}

        {/* Results. On larger screens the panel grows open only once there is something to show. */}
        <div
          className={cn(
            "min-h-0 flex-1 overflow-hidden sm:grid sm:flex-none sm:transition-[grid-template-rows] sm:ease-brand",
            !hasQuery && "max-sm:hidden",
            reduced ? "sm:duration-0" : "sm:duration-200",
            hasQuery ? "sm:grid-rows-[1fr]" : "sm:grid-rows-[0fr]",
          )}
        >
          <div className="h-full min-h-0 overflow-hidden sm:h-auto">
            <div className="flex h-full flex-col sm:block sm:h-auto sm:border-t sm:border-rule-soft">
              <div
                id={`${uid}-list`}
                role="listbox"
                aria-label="Search results"
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2 sm:max-h-[min(24rem,56vh)] sm:flex-none sm:p-1.5"
              >
                {hasQuery && groups.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <p className="font-sans text-sm font-semibold text-ink">No results for &ldquo;{query.trim()}&rdquo;</p>
                    <p className="mt-1 font-sans text-xs text-ink-muted">
                      Check the spelling, or try a school, district, person or page.
                    </p>
                  </div>
                ) : (
                  groups.map((g) => (
                    <section key={g.kind} aria-label={KIND_LABEL[g.kind]} className="mb-1">
                      <h2 className="px-3 pb-1 pt-2.5 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                        {KIND_LABEL[g.kind]}
                      </h2>
                      <ul role="presentation">{g.items.map(renderRow)}</ul>
                    </section>
                  ))
                )}
              </div>
              <div className="hidden items-center justify-between border-t border-rule-soft px-4 py-2 font-sans text-[0.6875rem] text-ink-faint sm:flex">
                <span>
                  <kbd className="font-semibold text-ink-muted">&uarr;&darr;</kbd> to navigate
                  <span className="mx-2 text-ink-faint">&middot;</span>
                  <kbd className="font-semibold text-ink-muted">Enter</kbd> to open
                </span>
                <span aria-live="polite">{flat.length ? `${flat.length} result${flat.length === 1 ? "" : "s"}` : ""}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RowIcon({ entry }: { entry: SearchEntry }) {
  if (entry.kind === "school" || entry.kind === "person") {
    return <Monogram name={entry.title} label={entry.initials} size="sm" tone={entry.kind === "person" ? "neutral" : "brand"} />;
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-full border font-sans text-xs font-semibold",
        entry.kind === "review" ? "border-claret/50 text-claret" : "border-rule-soft text-ink-muted",
      )}
    >
      {entry.kind === "review" ? "!" : "\u2192"}
    </span>
  );
}
