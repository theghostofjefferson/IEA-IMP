import { cn } from "@/lib/utils";

/**
 * The site mark: the Institute's official horizontal logo, at every width.
 *
 * It used to drop to the three-column emblem alone on phones. The full lockup
 * is the Institute's name, so it now shows everywhere; on a phone it is sized
 * to the space left beside the header's buttons (`max-w`) and scales down
 * rather than overflowing.
 *
 * `tone="dark"` swaps to the ivory-and-gold version for navy backgrounds.
 * Presentational, so it can render without a router.
 */
export function Wordmark({
  size = "md",
  tone = "light",
  className,
}: {
  size?: "sm" | "md" | "lg";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <img
      src={`/brand/horizontal-${tone}.webp`}
      alt="Institute for Educational Accountability"
      width={1000}
      height={136}
      decoding="async"
      className={cn(
        "w-auto max-w-[calc(100vw-10.5rem)] object-contain object-left",
        size === "sm" && "h-6 md:h-8",
        size === "md" && "h-8 md:h-12",
        size === "lg" && "h-10 md:h-20",
        className,
      )}
    />
  );
}
