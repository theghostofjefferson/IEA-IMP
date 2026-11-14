import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { View } from "@/lib/filters";
import { cn } from "@/lib/utils";

/**
 * The two-way switch between the full ranking and the institutions under review.
 *
 * Still a Radix toggle group underneath (arrow keys, roles, `aria-checked`), with
 * a pill that slides between the two halves. Both halves are the same width so
 * the pill can be moved with a transform alone.
 */
export function ViewToggle({ view, onView }: { view: View; onView: (v: View) => void }) {
  const itemClass =
    "relative z-10 h-9 border-0! rounded-[5px]! bg-transparent! px-4 shadow-none! hover:bg-transparent! data-[state=on]:bg-transparent! data-[state=on]:text-ink-inverse text-ink-muted transition-colors duration-300";
  return (
    <ToggleGroup
      type="single"
      value={view}
      onValueChange={(v) => v && onView(v as View)}
      aria-label="Choose between rankings and institutions under review"
      className="relative grid w-full max-w-[24rem] grid-cols-2 gap-0 rounded-md border border-rule bg-sunken p-0.5 sm:w-[24rem]"
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0.5 left-0.5 w-[calc(50%-0.125rem)] rounded-[5px] bg-ink shadow-sm transition-transform duration-300 ease-brand",
          view === "all" && "translate-x-full",
        )}
      />
      <ToggleGroupItem value="redflags" className={itemClass}>
        <span className="hidden sm:inline">Institutions under review</span>
        <span className="sm:hidden">Under review</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="all" className={itemClass}>
        All schools
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
