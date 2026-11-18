import type { Point } from "../../domain/world";

type Bounds = Readonly<{ width: number; height: number }>;
type Station = Readonly<{ placeId: string; position: Point }>;
type Edge = Readonly<{ a: string; b: string }>;

/**
 * Deterministic force-directed ("web") positions for the Nearby layer.
 * Seeded from the authored schematic positions so results are stable between
 * loads. Topology drives placement: linked places pull together, unlinked
 * places push apart. Screen distance is a layout by-product, not a metric.
 */
export function webPositions(
  stations: readonly Station[],
  edges: readonly Edge[],
  bounds: Bounds,
  padding = 80,
): ReadonlyMap<string, Point> {
  const n = stations.length;
  if (n === 0) return new Map();
  const index = new Map(stations.map((s, i) => [s.placeId, i]));
  const links = edges.flatMap((e) => {
    const a = index.get(e.a),
      b = index.get(e.b);
    return a === undefined || b === undefined || a === b ? [] : [[a, b]];
  }) as [number, number][];
  const pos = stations.map((s) => ({ ...s.position }));
  const linked = new Set(links.flat());
  if (n > 1 && links.length) {
    const width = bounds.width,
      height = bounds.height;
    const k = 1.1 * Math.sqrt((width * height) / n);
    const iterations = 400;
    const active = [...linked];
    for (let step = 0; step < iterations; step++) {
      const temperature =
        (Math.min(width, height) / 8) * (1 - step / iterations);
      const force = pos.map(() => ({ x: 0, y: 0 }));
      for (const i of active)
        for (const j of active) {
          if (j <= i) continue;
          let dx = pos[i]!.x - pos[j]!.x,
            dy = pos[i]!.y - pos[j]!.y;
          if (dx === 0 && dy === 0) {
            dx = (i - j) * 0.01;
            dy = (j + 1) * 0.01;
          }
          const d = Math.hypot(dx, dy);
          const push = (k * k) / d;
          force[i]!.x += (dx / d) * push;
          force[i]!.y += (dy / d) * push;
          force[j]!.x -= (dx / d) * push;
          force[j]!.y -= (dy / d) * push;
        }
      for (const [a, b] of links) {
        const dx = pos[a]!.x - pos[b]!.x,
          dy = pos[a]!.y - pos[b]!.y;
        const d = Math.max(Math.hypot(dx, dy), 0.01);
        const pull = (d * d) / k;
        force[a]!.x -= (dx / d) * pull;
        force[a]!.y -= (dy / d) * pull;
        force[b]!.x += (dx / d) * pull;
        force[b]!.y += (dy / d) * pull;
      }
      for (const i of active) {
        // Gentle gravity keeps unlinked places from drifting away.
        force[i]!.x += (width / 2 - pos[i]!.x) * 0.5;
        force[i]!.y += (height / 2 - pos[i]!.y) * 0.5;
        const magnitude = Math.hypot(force[i]!.x, force[i]!.y) || 1;
        const move = Math.min(magnitude, temperature);
        pos[i]!.x += (force[i]!.x / magnitude) * move;
        pos[i]!.y += (force[i]!.y / magnitude) * move;
      }
    }
  }
  // Fit the result into the padded bounds, centred, preserving proportions.
  const fitted = links.length ? [...linked] : pos.map((_, i) => i);
  const xs = fitted.map((i) => pos[i]!.x),
    ys = fitted.map((i) => pos[i]!.y);
  const minX = Math.min(...xs),
    maxX = Math.max(...xs),
    minY = Math.min(...ys),
    maxY = Math.max(...ys);
  const spanX = maxX - minX || 1,
    spanY = maxY - minY || 1;
  const scale = Math.min(
    (bounds.width - 2 * padding) / spanX,
    (bounds.height - 2 * padding) / spanY,
  );
  const result = new Map<string, Point>();
  const isolated = stations.flatMap((s, i) =>
    links.length && !linked.has(i) ? [s.placeId] : [],
  );
  stations.forEach((s, i) => {
    if (links.length && !linked.has(i)) return;
    result.set(s.placeId, {
      x: bounds.width / 2 + (pos[i]!.x - (minX + maxX) / 2) * scale,
      y: bounds.height / 2 + (pos[i]!.y - (minY + maxY) / 2) * scale,
    });
  });
  // Places with no recorded neighbours sit in a quiet row along the bottom.
  isolated.forEach((id, i) =>
    result.set(id, {
      x: bounds.width / 2 + (i - (isolated.length - 1) / 2) * 140,
      y: bounds.height - padding * 0.9,
    }),
  );
  return result;
}
