import type { EdgeId, PlaceId, TravelMode } from "../../kernel/index.ts";
import type { EdgeStep, Path, World } from "./types.ts";

export interface PathOptions {
  /** Ignore this edge, for example when looking for an alternative to it. */
  readonly excludeEdge?: EdgeId;
}

function compareIds(a: readonly PlaceId[], b: readonly PlaceId[]): number {
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i += 1) {
    const x = a[i] as string;
    const y = b[i] as string;
    if (x !== y) return x < y ? -1 : 1;
  }
  return a.length - b.length;
}

/** Steps leaving `place` that one of `modes` may use. */
export function usableSteps(
  world: World,
  place: PlaceId,
  modes: readonly TravelMode[],
  options: PathOptions = {},
): readonly EdgeStep[] {
  return (world.outgoing.get(place) ?? []).filter((step) => {
    if (step.edgeId === options.excludeEdge) return false;
    const edge = world.edges.get(step.edgeId);
    return edge !== undefined && edge.allowedModes.some((mode) => modes.includes(mode));
  });
}

/**
 * Shortest path by length over edges allowing at least one of `modes`.
 * Ties are broken by the lexicographically smaller sequence of place ids,
 * then by edge id, so the same world always yields the same route (rule W4).
 */
export function shortestPath(
  world: World,
  from: PlaceId,
  to: PlaceId,
  modes: readonly TravelMode[],
  options: PathOptions = {},
): Path | null {
  if (!world.places.has(from) || !world.places.has(to)) return null;

  interface Label {
    readonly lengthM: number;
    readonly places: readonly PlaceId[];
    readonly steps: readonly EdgeStep[];
  }
  const better = (a: Label, b: Label | undefined) =>
    b === undefined || a.lengthM < b.lengthM || (a.lengthM === b.lengthM && compareIds(a.places, b.places) < 0);

  const best = new Map<PlaceId, Label>([[from, { lengthM: 0, places: [from], steps: [] }]]);
  const settled = new Set<PlaceId>();

  for (;;) {
    let current: PlaceId | undefined;
    let currentLabel: Label | undefined;
    for (const [place, label] of best) {
      if (!settled.has(place) && better(label, currentLabel)) {
        current = place;
        currentLabel = label;
      }
    }
    if (current === undefined || currentLabel === undefined) return null;
    if (current === to) return currentLabel;
    settled.add(current);

    for (const step of usableSteps(world, current, modes, options)) {
      if (settled.has(step.to)) continue;
      const candidate: Label = {
        lengthM: currentLabel.lengthM + step.lengthM,
        places: [...currentLabel.places, step.to],
        steps: [...currentLabel.steps, step],
      };
      if (better(candidate, best.get(step.to))) best.set(step.to, candidate);
    }
  }
}

/** Places reachable from `from` using `modes`, including `from` itself. */
export function reachableFrom(world: World, from: PlaceId, modes: readonly TravelMode[]): ReadonlySet<PlaceId> {
  const seen = new Set<PlaceId>([from]);
  const queue = [from];
  for (let place = queue.shift(); place !== undefined; place = queue.shift()) {
    for (const step of usableSteps(world, place, modes)) {
      if (!seen.has(step.to)) {
        seen.add(step.to);
        queue.push(step.to);
      }
    }
  }
  return seen;
}
