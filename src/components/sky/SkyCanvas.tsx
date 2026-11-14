import { useEffect, useRef } from "react";

import { mulberry32, type Star } from "@/components/sky/skyData";

export type Hovered = { star: Star; x: number; y: number } | null;

type Props = {
  stars: Star[];
  reduced: boolean;
  /** A star highlighted from outside the canvas (keyboard focus). */
  activeId: string | null;
  onHover: (h: Hovered, via: "mouse" | "touch") => void;
  onOpen: (star: Star) => void;
};

type Ambient = { x: number; y: number; r: number; depth: number; phase: number; speed: number };
type Shooter = { x: number; y: number; vx: number; vy: number; life: number; max: number };

const IVORY = "244,236,216";
const GOLD = "201,164,92";
const REVIEW = "224,86,107";

/**
 * The night sky, drawn on one canvas.
 *
 * Three depth layers of ambient stars drift against the pointer; the school and
 * review stars sit on the middle layer and are the only interactive ones.
 * Nothing here allocates per frame, the loop stops when the canvas is off
 * screen or the tab is hidden, and with reduced motion it draws still frames
 * only (on resize and on hover).
 */
export function SkyCanvas({ stars, reduced, activeId, onHover, onOpen }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef<string | null>(activeId);
  const cbRef = useRef({ onHover, onOpen });
  const redrawRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    activeRef.current = activeId;
    redrawRef.current?.();
  }, [activeId]);
  useEffect(() => {
    cbRef.current = { onHover, onOpen };
  }, [onHover, onOpen]);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dpr = 1;
    const rnd = mulberry32(51);

    const ambient: Ambient[] = Array.from({ length: 190 }, () => {
      const depth = rnd() < 0.5 ? 0.25 : rnd() < 0.6 ? 0.5 : 0.8;
      return {
        x: rnd(),
        y: rnd() * 0.9,
        r: 0.4 + rnd() * (depth > 0.6 ? 1.2 : 0.8),
        depth,
        phase: rnd() * Math.PI * 2,
        speed: 0.6 + rnd() * 1.6,
      };
    });

    // The ridge line: two layered ranges, generated once.
    const ridge = (seed: number, base: number, amp: number) => {
      const r = mulberry32(seed);
      const pts: number[] = [];
      let v = r();
      for (let i = 0; i <= 48; i++) {
        v += (r() - 0.5) * 0.55;
        v = Math.min(1, Math.max(0, v));
        pts.push(base - v * amp);
      }
      return pts;
    };
    const ridgeFar = ridge(7, 0.9, 0.1);
    const ridgeNear = ridge(19, 0.97, 0.06);

    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, inside: false };
    const hover = { id: null as string | null };
    const glow = new Map<string, number>();
    stars.forEach((s) => glow.set(s.id, 0));

    const shooters: Shooter[] = [];
    let nextShot = 2500;

    const neighbours = new Map<string, Star[]>();
    stars.forEach((s) => {
      const near = stars
        .filter((o) => o !== s && o.kind === s.kind)
        .map((o) => ({ o, d: (o.nx - s.nx) ** 2 + (o.ny - s.ny) ** 2 }))
        .sort((a, b) => a.d - b.d)
        .slice(0, 3)
        .map((e) => e.o);
      neighbours.set(s.id, near);
    });

    const pos = (s: Star) => {
      const px = (pointer.x - 0.5) * 18;
      const py = (pointer.y - 0.5) * 12;
      return { x: s.nx * W + px * 0.5, y: s.ny * H + py * 0.5 };
    };

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawStar(x: number, y: number, size: number, rgb: string, g: number, tw: number, kind: Star["kind"]) {
      const r = (1.8 + size * 3.2) * (1 + g * 0.6);
      const a = (0.72 + tw * 0.28) * (0.8 + g * 0.2);
      const halo = r * (kind === "review" ? 7 : 6) * (1 + g * 0.5);
      const grad = ctx!.createRadialGradient(x, y, 0, x, y, halo);
      grad.addColorStop(0, `rgba(${rgb},${0.5 * a})`);
      grad.addColorStop(0.35, `rgba(${rgb},${0.12 * a})`);
      grad.addColorStop(1, `rgba(${rgb},0)`);
      ctx!.fillStyle = grad;
      ctx!.beginPath();
      ctx!.arc(x, y, halo, 0, Math.PI * 2);
      ctx!.fill();

      // Four-point sparkle for the brighter stars.
      if (size > 0.6 || g > 0.2) {
        const len = r * (3.2 + g * 2);
        ctx!.strokeStyle = `rgba(${rgb},${0.55 * a})`;
        ctx!.lineWidth = 0.8;
        ctx!.beginPath();
        ctx!.moveTo(x - len, y);
        ctx!.lineTo(x + len, y);
        ctx!.moveTo(x, y - len);
        ctx!.lineTo(x, y + len);
        ctx!.stroke();
      }
      ctx!.fillStyle = `rgba(${rgb},${a})`;
      ctx!.beginPath();
      ctx!.arc(x, y, r, 0, Math.PI * 2);
      ctx!.fill();
    }

    function frame(t: number, dt: number) {
      ctx!.clearRect(0, 0, W, H);

      // Ambient stars.
      for (const a of ambient) {
        const ox = (pointer.x - 0.5) * 40 * a.depth;
        const oy = (pointer.y - 0.5) * 26 * a.depth;
        const tw = reduced ? 0.8 : 0.55 + 0.45 * Math.sin(t * 0.001 * a.speed + a.phase);
        ctx!.fillStyle = `rgba(${IVORY},${(0.18 + a.depth * 0.5) * tw})`;
        ctx!.beginPath();
        ctx!.arc(a.x * W + ox, a.y * H + oy, a.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Shooting stars.
      if (!reduced) {
        nextShot -= dt;
        if (nextShot <= 0) {
          nextShot = 5000 + Math.random() * 4500;
          const fromLeft = Math.random() < 0.5;
          const speed = 0.9 + Math.random() * 0.5;
          shooters.push({
            x: (fromLeft ? 0.05 : 0.95) * W + (Math.random() - 0.5) * W * 0.2,
            y: Math.random() * H * 0.35,
            vx: (fromLeft ? 1 : -1) * speed,
            vy: speed * 0.45,
            life: 0,
            max: 900,
          });
        }
        for (let i = shooters.length - 1; i >= 0; i--) {
          const s = shooters[i]!;
          s.life += dt;
          s.x += s.vx * dt * 0.6;
          s.y += s.vy * dt * 0.6;
          const k = s.life / s.max;
          if (k >= 1) {
            shooters.splice(i, 1);
            continue;
          }
          const alpha = Math.sin(k * Math.PI);
          const tail = 90;
          const g = ctx!.createLinearGradient(s.x, s.y, s.x - s.vx * tail, s.y - s.vy * tail);
          g.addColorStop(0, `rgba(${GOLD},${0.9 * alpha})`);
          g.addColorStop(1, `rgba(${GOLD},0)`);
          ctx!.strokeStyle = g;
          ctx!.lineWidth = 1.4;
          ctx!.beginPath();
          ctx!.moveTo(s.x, s.y);
          ctx!.lineTo(s.x - s.vx * tail, s.y - s.vy * tail);
          ctx!.stroke();
        }
      }

      // Smooth glow toward the hovered / active star.
      const focus = hover.id ?? activeRef.current;
      for (const s of stars) {
        const target = s.id === focus ? 1 : 0;
        const cur = glow.get(s.id) ?? 0;
        glow.set(s.id, reduced ? target : cur + (target - cur) * Math.min(1, dt * 0.012));
      }

      // Constellation lines from the focused star.
      if (focus) {
        const f = stars.find((s) => s.id === focus);
        if (f) {
          const p = pos(f);
          const g = glow.get(f.id) ?? 0;
          ctx!.lineWidth = 1;
          for (const n of neighbours.get(f.id) ?? []) {
            const q = pos(n);
            ctx!.strokeStyle = `rgba(${f.kind === "review" ? REVIEW : GOLD},${0.45 * g})`;
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(q.x, q.y);
            ctx!.stroke();
          }
        }
      }

      // Rated schools and institutions under review.
      for (const s of stars) {
        const p = pos(s);
        const tw = reduced
          ? 0.8
          : s.kind === "review"
            ? 0.5 + 0.5 * Math.abs(Math.sin(t * 0.0021 + s.phase * 3))
            : 0.6 + 0.4 * Math.sin(t * 0.0013 + s.phase);
        drawStar(p.x, p.y, s.size, s.kind === "review" ? REVIEW : s.size > 0.7 ? GOLD : IVORY, glow.get(s.id) ?? 0, tw, s.kind);
      }

      // The ridge: two silhouettes, nearest darkest.
      const ridgeDraw = (pts: number[], fill: string, shift: number) => {
        ctx!.fillStyle = fill;
        ctx!.beginPath();
        ctx!.moveTo(0, H);
        pts.forEach((v, i) => ctx!.lineTo((i / (pts.length - 1)) * W + shift, v * H));
        ctx!.lineTo(W, H);
        ctx!.closePath();
        ctx!.fill();
      };
      ridgeDraw(ridgeFar, "rgba(24,33,58,0.92)", (pointer.x - 0.5) * -10);
      ridgeDraw(ridgeNear, "rgba(10,14,27,1)", (pointer.x - 0.5) * -18);
    }

    let raf = 0;
    let last = 0;
    let running = false;
    let visible = true;

    function loop(now: number) {
      const dt = Math.min(48, now - (last || now));
      last = now;
      pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 0.004);
      pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 0.004);
      frame(now, dt);
      raf = requestAnimationFrame(loop);
    }
    function start() {
      if (reduced || running || !visible || document.hidden) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }
    const redraw = () => {
      if (!running) frame(performance.now(), 16);
    };
    redrawRef.current = redraw;

    resize();
    redraw();
    start();

    const ro = new ResizeObserver(() => {
      resize();
      redraw();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    function pick(clientX: number, clientY: number, touch: boolean): Star | null {
      const rect = canvas!.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const reach = touch ? 30 : 20;
      let best: Star | null = null;
      let bd = reach * reach;
      for (const s of stars) {
        const p = pos(s);
        const d = (p.x - x) ** 2 + (p.y - y) ** 2;
        if (d < bd) {
          bd = d;
          best = s;
        }
      }
      return best;
    }

    function setHover(s: Star | null, via: "mouse" | "touch") {
      if ((s?.id ?? null) === hover.id) return;
      hover.id = s?.id ?? null;
      canvas!.style.cursor = s && via === "mouse" ? "pointer" : "default";
      if (s) {
        const p = pos(s);
        cbRef.current.onHover({ star: s, x: p.x, y: p.y }, via);
      } else {
        cbRef.current.onHover(null, via);
      }
      redraw();
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      pointer.ty = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
      if (e.pointerType === "mouse") setHover(pick(e.clientX, e.clientY, false), "mouse");
    };
    const onLeave = () => {
      pointer.tx = 0.5;
      pointer.ty = 0.5;
      if (hover.id) setHover(null, "mouse");
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        const s = pick(e.clientX, e.clientY, false);
        if (s) cbRef.current.onOpen(s);
      } else {
        // Touch: first tap selects (shows the label card), tapping empty sky clears.
        const s = pick(e.clientX, e.clientY, true);
        hover.id = null;
        setHover(s, "touch");
      }
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
      redrawRef.current = null;
    };
  }, [stars, reduced]);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 size-full touch-pan-y" />;
}
