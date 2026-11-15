import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

/**
 * A ruled heading that opens a tier of the team. The two hairlines draw
 * outwards from the label as it scrolls into view.
 */
export function TierHeader({ label, className }: { label: string; className?: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={cn("tier-head", visible && "tier-on", className)}>
      <span aria-hidden="true" className="tier-line tier-line--l" />
      <h3 className="type-label tier-label text-bronze-ink">{label}</h3>
      <span aria-hidden="true" className="tier-line tier-line--r" />
    </div>
  );
}
