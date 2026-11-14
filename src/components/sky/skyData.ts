import { redFlags, schools } from "@/lib/data";

export type StarKind = "school" | "review";

export type Star = {
  id: string;
  kind: StarKind;
  label: string;
  detail: string;
  href: string;
  /** Normalised position, 0..1. */
  nx: number;
  ny: number;
  /** Visual size, 0..1. */
  size: number;
  phase: number;
};

/** Small deterministic PRNG, so the sky is the same on every visit. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * One star per rated school, one per institution under review.
 *
 * Positions are decorative and say nothing about geography: the sky is a
 * picture, not a map. Height does follow the data for rated schools (a higher
 * overall score sits higher in the sky, with scatter so it never reads as a
 * chart), and institutions under review sit low, near the ridge line.
 */
export function buildStars(): Star[] {
  const rnd = mulberry32(1788);
  const out: Star[] = [];

  schools.forEach((s, i) => {
    const nx = 0.06 + ((i * 0.6180339887) % 1) * 0.88;
    const ny = 0.1 + (1 - s.overallScore / 100) * 0.55 + (rnd() - 0.5) * 0.14;
    out.push({
      id: `school-${s.id}`,
      kind: "school",
      label: s.name,
      detail: `Rank ${s.rank} · score ${s.overallScore.toFixed(1)}`,
      href: `/school/${s.id}`,
      nx,
      ny: Math.min(0.72, Math.max(0.08, ny)),
      size: 0.35 + (s.overallScore / 100) * 0.65,
      phase: rnd() * Math.PI * 2,
    });
  });

  redFlags.forEach((r, i) => {
    out.push({
      id: `review-${r.id}`,
      kind: "review",
      label: r.name,
      detail: "Institution under review",
      href: `/red-flag/${r.id}`,
      nx: 0.1 + ((i * 0.381966 + 0.13) % 1) * 0.8,
      ny: 0.74 + rnd() * 0.12,
      size: 0.7,
      phase: rnd() * Math.PI * 2,
    });
  });

  return out;
}
