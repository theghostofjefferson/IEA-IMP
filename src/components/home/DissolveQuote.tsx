import { useEffect, useRef, useState } from "react";

import { MadisonQuote, QUOTE_CITE, QUOTE_TEXT } from "@/components/home/MadisonQuote";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { mulberry32 } from "@/components/sky/skyData";

const FIGURE_SRC = "/images/madison/figure.png";
const HEADER_PAD = 64;
const SERIF = '"Latin Modern Roman", "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif';

type Field = {
  n: number;
  /** The quotation, rendered crisply; faded in once the particles have settled. */
  text: HTMLCanvasElement;
  fig: { x: number; y: number; w: number; h: number };
  fx: Float32Array;
  fy: Float32Array;
  tx: Float32Array;
  ty: Float32Array;
  start: Float32Array;
  curl: Float32Array;
  size: Float32Array;
};

const smooth = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Greedy word wrap on an offscreen context. */
function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    const test = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(test).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function sample(ctx: CanvasRenderingContext2D, W: number, H: number, step: number): number[] {
  const { data } = ctx.getImageData(0, 0, W, H);
  const out: number[] = [];
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      if ((data[(y * W + x) * 4 + 3] ?? 0) > 140) out.push(x, y);
    }
  }
  return out;
}

/** Take `n` points at random, then order them top to bottom so heads become first lines. */
function pickSorted(points: number[], n: number, rnd: () => number): [number, number][] {
  const total = points.length / 2;
  const idx = Array.from({ length: total }, (_, i) => i);
  for (let i = total - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [idx[i], idx[j]] = [idx[j]!, idx[i]!];
  }
  return idx
    .slice(0, n)
    .map((i): [number, number] => [points[i * 2]!, points[i * 2 + 1]!])
    .sort((a, b) => a[1] - b[1] || a[0] - b[0]);
}

function buildField(img: HTMLImageElement, W: number, H: number): Field | null {
  const off = document.createElement("canvas");
  off.width = W;
  off.height = H;
  const ctx = off.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  const mobile = W < 700;
  const rnd = mulberry32(1788);
  const top = HEADER_PAD;
  const usable = H - top;

  // 1. The figure, centred, about 72% of the usable height.
  const figH = usable * 0.72;
  const figW = (img.naturalWidth / img.naturalHeight) * figH;
  ctx.clearRect(0, 0, W, H);
  const fig0 = { x: (W - figW) / 2, y: top + (usable - figH) / 2, w: figW, h: figH };
  ctx.drawImage(img, fig0.x, fig0.y, fig0.w, fig0.h);
  const fig = sample(ctx, W, H, 2);

  // 2. The quotation, laid out and centred.
  ctx.clearRect(0, 0, W, H);
  const maxW = Math.min(W * 0.88, 960);
  const fs = mobile ? Math.max(15, W * 0.049) : Math.min(38, Math.max(20, W * 0.028));
  ctx.fillStyle = "#f4ecd8";
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "center";
  ctx.font = `${fs}px ${SERIF}`;
  const lines = wrap(ctx, QUOTE_TEXT, maxW);
  const lh = fs * 1.4;
  const citeFs = Math.max(11, fs * 0.5);
  const blockH = lines.length * lh + citeFs * 3.2;
  let y = top + (usable - blockH) / 2 + fs;
  for (const l of lines) {
    ctx.fillText(l, W / 2, y);
    y += lh;
  }
  ctx.font = `${citeFs}px ${SERIF}`;
  y += citeFs * 1.2;
  ctx.fillText(QUOTE_CITE.toUpperCase().split("").join(" "), W / 2, y);
  const txt = sample(ctx, W, H, 2);
  const text = document.createElement("canvas");
  text.width = W;
  text.height = H;
  text.getContext("2d")?.drawImage(off, 0, 0);

  const n = Math.min(mobile ? 3000 : 7000, fig.length / 2, txt.length / 2);
  if (n < 200) return null;
  const a = pickSorted(fig, n, rnd);
  const b = pickSorted(txt, n, rnd);

  const f: Field = {
    n,
    text,
    fig: fig0,
    fx: new Float32Array(n),
    fy: new Float32Array(n),
    tx: new Float32Array(n),
    ty: new Float32Array(n),
    start: new Float32Array(n),
    curl: new Float32Array(n),
    size: new Float32Array(n),
  };
  for (let i = 0; i < n; i++) {
    f.fx[i] = a[i]![0];
    f.fy[i] = a[i]![1];
    f.tx[i] = b[i]![0];
    f.ty[i] = b[i]![1];
    f.start[i] = 0.1 + rnd() * 0.34;
    f.curl[i] = (rnd() - 0.5) * (mobile ? 140 : 260);
    f.size[i] = (mobile ? 1.1 : 1.3) + rnd() * 0.9;
  }
  return f;
}

/**
 * The closing statement: Madison's figure, in particles, dissolves as you scroll
 * and the particles regroup into the words of the quotation.
 *
 * The scene is decorative and aria-hidden; the quotation is also present as real
 * text. Reduced motion, a failed image load, or too few particles falls back to
 * the static band.
 */
export function DissolveQuote() {
  const reduced = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const stageRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (reduced || failed) return;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setFailed(true);
      return;
    }

    let W = 0;
    let H = 0;
    let field: Field | null = null;
    let target = 0;
    let cur = 0;
    let raf = 0;
    let visible = false;
    let alive = true;
    let img: HTMLImageElement | null = null;

    const measure = () => {
      const r = stage.getBoundingClientRect();
      const span = Math.max(1, r.height - window.innerHeight);
      target = Math.min(1, Math.max(0, -r.top / span));
    };

    const rebuild = () => {
      if (!img) return;
      const rect = canvas.getBoundingClientRect();
      W = Math.round(rect.width);
      H = Math.round(rect.height);
      if (!W || !H) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      field = buildField(img, W, H);
      if (!field) setFailed(true);
    };

    const draw = (now: number) => {
      if (!field) return;
      ctx.clearRect(0, 0, W, H);
      const { n, fx, fy, tx, ty, start, curl, size, text, fig } = field;
      const settled = cur > 0.86;
      const textFade = smooth(0.8, 0.97, cur);

      // The figure itself, faint, so the scene opens on a solid shape that the
      // particles then peel away from.
      const figA = 0.3 * (1 - smooth(0.03, 0.2, cur));
      if (figA > 0.005 && img) {
        ctx.globalAlpha = figA;
        ctx.drawImage(img, fig.x, fig.y, fig.w, fig.h);
      }
      ctx.globalAlpha = 1 - 0.6 * textFade;
      for (let pass = 0; pass < 2; pass++) {
        ctx.fillStyle = pass === 0 ? "rgba(244,236,216,0.88)" : "rgba(201,164,92,0.95)";
        for (let i = pass; i < n; i += 2) {
          // Every 6th particle is gold.
          const gold = i % 6 === 0;
          if ((pass === 1) !== gold) continue;
          const t = Math.min(1, Math.max(0, (cur - start[i]!) / 0.4));
          const e = ease(t);
          const arc = Math.sin(e * Math.PI);
          let x = fx[i]! + (tx[i]! - fx[i]!) * e + arc * curl[i]!;
          let y = fy[i]! + (ty[i]! - fy[i]!) * e - arc * Math.abs(curl[i]!) * 0.45;
          if (t === 0) {
            x += Math.sin(now * 0.0012 + i) * 0.5;
            y += Math.cos(now * 0.001 + i * 1.3) * 0.5;
          } else if (settled && t === 1) {
            x += Math.sin(now * 0.0016 + i) * 0.25;
          }
          const s = size[i]!;
          ctx.fillRect(x, y, s, s);
        }
      }
      ctx.globalAlpha = 1;
      if (textFade > 0.005) {
        ctx.globalAlpha = textFade;
        ctx.drawImage(text, 0, 0, W, H);
        ctx.globalAlpha = 1;
      }
    };

    const loop = (now: number) => {
      raf = 0;
      if (!alive || !visible) return;
      cur += (target - cur) * 0.1;
      if (Math.abs(target - cur) < 0.0004) cur = target;
      draw(now);
      if (hintRef.current) hintRef.current.style.opacity = String(Math.max(0, 1 - cur * 8));
      raf = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (!raf && visible && alive) raf = requestAnimationFrame(loop);
    };

    const onScroll = () => {
      measure();
      kick();
    };
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        rebuild();
        measure();
        kick();
      }, 150);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      if (visible) {
        measure();
        kick();
      }
    });
    io.observe(stage);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const image = new Image();
    image.onload = () => {
      img = image;
      const go = () => {
        if (!alive) return;
        rebuild();
        measure();
        cur = target;
        kick();
      };
      // Text is sampled from pixels, so wait for the real serif to be ready.
      if (document.fonts?.ready) void document.fonts.ready.then(go);
      else go();
    };
    image.onerror = () => setFailed(true);
    image.src = FIGURE_SRC;

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced, failed]);

  if (reduced || failed) return <MadisonQuote />;

  return (
    <section ref={stageRef} aria-label="James Madison, Federalist No. 47" className="relative mt-20 h-[250vh] bg-ink md:mt-28 md:h-[300vh]">
      <div className="sticky top-0 h-dvh overflow-hidden">
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 size-full" />
        <p
          ref={hintRef}
          aria-hidden="true"
          className="type-caption absolute inset-x-0 bottom-8 text-center uppercase tracking-[0.3em] text-ink-inverse/60"
        >
          Scroll
        </p>
      </div>
      <figure className="sr-only">
        <blockquote>{QUOTE_TEXT}</blockquote>
        <figcaption>{QUOTE_CITE}</figcaption>
      </figure>
    </section>
  );
}
