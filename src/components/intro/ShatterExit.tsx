import { useState, type CSSProperties } from "react";

import { SplashBody } from "@/components/intro/SplashBody";

/**
 * The splash breaking apart.
 *
 * When the reader taps, the splash is cut into 48 triangular shards (a jittered
 * 4 x 6 grid, each cell split along a diagonal). Each shard is a clipped copy of
 * the finished splash, so before it moves the screen looks unchanged. They then
 * fall away from the point that was tapped: the nearest pieces go first and the
 * crack spreads outward, each one tumbling and fading as it drops, which
 * reveals the home page underneath.
 *
 * Only `transform` and `opacity` are animated, so it runs on the compositor.
 * Each shard is sized to its own bounding box rather than the whole screen, to
 * keep the layers small on a phone. The layout is fixed (seeded) so the same
 * tap breaks the same way, and reduced-motion users never see it (the splash is
 * skipped entirely for them; see `useIntro`).
 */

const COLS = 4;
const ROWS = 6;
const FALL_MS = 950;
const SPREAD_MS = 320;
// SHATTER_MS (in useIntro) must be at least SPREAD_MS + FALL_MS, or the overlay
// would be removed before the last shard has landed.

/** Small deterministic PRNG, so the render is pure and repeatable. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Pt = { x: number; y: number };
type Shard = {
  box: { x: number; y: number; w: number; h: number };
  clip: string;
  vars: CSSProperties;
  origin: string;
};

function buildShards(W: number, H: number, ox: number, oy: number): Shard[] {
  const rnd = mulberry32(51);
  const cw = W / COLS;
  const ch = H / ROWS;

  // Grid points; interior ones are jittered so the cracks are irregular.
  const pts: Pt[][] = [];
  for (let r = 0; r <= ROWS; r++) {
    const row: Pt[] = [];
    for (let c = 0; c <= COLS; c++) {
      const edgeX = c === 0 || c === COLS;
      const edgeY = r === 0 || r === ROWS;
      row.push({
        x: c * cw + (edgeX ? 0 : (rnd() - 0.5) * cw * 0.6),
        y: r * ch + (edgeY ? 0 : (rnd() - 0.5) * ch * 0.6),
      });
    }
    pts.push(row);
  }

  const tris: [Pt, Pt, Pt][] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const tl = pts[r][c];
      const tr = pts[r][c + 1];
      const bl = pts[r + 1][c];
      const br = pts[r + 1][c + 1];
      if (rnd() < 0.5) {
        tris.push([tl, tr, bl], [tr, br, bl]);
      } else {
        tris.push([tl, tr, br], [tl, br, bl]);
      }
    }
  }

  const reach = Math.hypot(W, H);
  return tris.map((tri) => {
    const xs = tri.map((p) => p.x);
    const ys = tri.map((p) => p.y);
    const bx = Math.floor(Math.min(...xs)) - 1;
    const by = Math.floor(Math.min(...ys)) - 1;
    const bw = Math.ceil(Math.max(...xs)) + 1 - bx;
    const bh = Math.ceil(Math.max(...ys)) + 1 - by;
    const cx = (tri[0].x + tri[1].x + tri[2].x) / 3;
    const cy = (tri[0].y + tri[1].y + tri[2].y) / 3;

    // Away from the tap, plus gravity; nearer pieces start sooner.
    const vx = cx - ox * W;
    const vy = cy - oy * H;
    const len = Math.hypot(vx, vy) || 1;
    const push = reach * (0.12 + rnd() * 0.22);
    const dx = (vx / len) * push;
    const dy = (vy / len) * push + H * (0.45 + rnd() * 0.45);
    const rot = (rnd() - 0.5) * 80;
    const delay = Math.min(1, len / reach / 0.75) * SPREAD_MS;

    return {
      box: { x: bx, y: by, w: bw, h: bh },
      clip: `polygon(${tri.map((p) => `${(p.x - bx).toFixed(1)}px ${(p.y - by).toFixed(1)}px`).join(", ")})`,
      origin: `${(cx - bx).toFixed(1)}px ${(cy - by).toFixed(1)}px`,
      vars: {
        "--dx": `${dx.toFixed(1)}px`,
        "--dy": `${dy.toFixed(1)}px`,
        "--rot": `${rot.toFixed(1)}deg`,
        animationDelay: `${delay.toFixed(0)}ms`,
      } as CSSProperties,
    };
  });
}

export function ShatterExit({ originX, originY }: { originX: number; originY: number }) {
  // Measured once, when the exit begins.
  const [size] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));
  const [shards] = useState(() => buildShards(size.w, size.h, originX, originY));

  return (
    <div
      aria-hidden="true"
      data-intro-phase="exiting"
      className="fixed inset-0 z-50 touch-manipulation overflow-hidden"
    >
      {shards.map((s, i) => (
        <div
          key={i}
          className="absolute overflow-hidden will-change-transform"
          style={{
            left: s.box.x,
            top: s.box.y,
            width: s.box.w,
            height: s.box.h,
            clipPath: s.clip,
            transformOrigin: s.origin,
            animation: `intro-shard-out ${FALL_MS}ms cubic-bezier(0.55, 0.05, 0.85, 0.45) both`,
            ...s.vars,
          }}
        >
          <div
            className="absolute flex flex-col items-center justify-between bg-ink px-6 pb-12 pt-10 sm:pt-12"
            style={{ left: -s.box.x, top: -s.box.y, width: size.w, height: size.h }}
          >
            <SplashBody still />
          </div>
        </div>
      ))}
    </div>
  );
}
