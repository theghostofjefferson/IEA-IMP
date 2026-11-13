/**
 * What the splash shows: the logo, the Madison line and the prompt.
 *
 * It is its own component because it is drawn twice: once live, with its
 * entrance animations, and once per shard when the splash breaks apart (see
 * `ShatterExit`). Shards are `still`: they must look exactly like the finished
 * splash, so the entrance animations (which start from `opacity: 0`) are left
 * off rather than replayed.
 */
export function SplashBody({ still = false }: { still?: boolean }) {
  const anim = (cls: string) => (still ? "" : cls);
  const delay = (ms: number) => (still ? undefined : { animationDelay: `${ms}ms` });

  return (
    <>
      {/* A quiet profile silhouette sits behind the content, low in contrast. */}
      <div className="intro-portrait" aria-hidden="true" />
      <div className="intro-frame" aria-hidden="true" />

      <img
        src="/brand/stacked-dark.webp"
        alt=""
        width={900}
        height={381}
        className={`relative w-56 max-w-[70%] sm:w-72 ${anim("animate-[intro-label-in_600ms_cubic-bezier(0.16,1,0.3,1)_both]")}`}
        style={delay(100)}
      />

      <div className="relative flex w-full flex-col items-center gap-5">
        {/* Holds the height the founder names used to take, so the quote sits
            where it always has. */}
        <div aria-hidden="true" className="type-caption invisible">
          &nbsp;
        </div>

        <div className="my-4 h-px w-full bg-ink-inverse/20 md:my-6" aria-hidden="true" />

        <p
          className={`type-caption measure-snug text-center text-ink-inverse/90 ${anim("animate-[intro-label-in_500ms_cubic-bezier(0.16,1,0.3,1)_both]")}`}
          style={delay(1600)}
        >
          If men were angels, no government would be necessary.
          <span className="mt-3 block text-[0.7rem] uppercase tracking-[0.22em] text-ink-inverse/50">
            James Madison · Federalist No. 51
          </span>
        </p>
      </div>

      {/* "Click anywhere to continue". */}
      <p
        className={`absolute inset-x-0 bottom-4 px-4 text-center type-caption text-ink-inverse/45 sm:bottom-6 ${anim("animate-[intro-label-in_500ms_cubic-bezier(0.16,1,0.3,1)_both]")}`}
        style={delay(1900)}
      >
        Click anywhere to continue
      </p>
    </>
  );
}
