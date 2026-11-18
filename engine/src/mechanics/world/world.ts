import { err, ok, type EdgeId, type PlaceId, type Result } from "../../kernel/index.ts";
import { reachableFrom, shortestPath } from "./paths.ts";
import { INTERIOR_MODES, validateStructure } from "./validate.ts";
import type { AccessEdge, EdgeStep, Place, World, WorldData, WorldIssue } from "./types.ts";

/** A direct edge longer than this multiple of an alternative route raises a warning (rule D6). */
export const DETOUR_WARNING_RATIO = 1.5;

export interface BuiltWorld {
  readonly world: World;
  readonly warnings: readonly WorldIssue[];
}

export interface RejectedWorld {
  readonly errors: readonly WorldIssue[];
  readonly warnings: readonly WorldIssue[];
}

const byId = <T extends { readonly id: string }>(a: T, b: T) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);

function index(data: WorldData, places: ReadonlyMap<PlaceId, Place>): World {
  const children = new Map<PlaceId, PlaceId[]>();
  for (const place of [...data.places].sort(byId)) {
    if (place.parentId !== null) children.set(place.parentId, [...(children.get(place.parentId) ?? []), place.id]);
  }

  const outgoing = new Map<PlaceId, EdgeStep[]>();
  const add = (step: EdgeStep) => outgoing.set(step.from, [...(outgoing.get(step.from) ?? []), step]);
  for (const edge of data.edges) {
    add({ edgeId: edge.id, from: edge.from, to: edge.to, lengthM: edge.lengthM });
    if (!edge.oneWay) add({ edgeId: edge.id, from: edge.to, to: edge.from, lengthM: edge.lengthM });
  }
  for (const steps of outgoing.values()) {
    steps.sort((a, b) => (a.to !== b.to ? (a.to < b.to ? -1 : 1) : a.edgeId < b.edgeId ? -1 : a.edgeId > b.edgeId ? 1 : 0));
  }

  const root = data.places.find((p) => p.parentId === null);
  if (!root) throw new Error("index() requires a validated world");
  return Object.freeze({
    rootId: root.id,
    places,
    edges: new Map<EdgeId, AccessEdge>(data.edges.map((e) => [e.id, e])),
    proximity: Object.freeze([...(data.proximity ?? [])]),
    children,
    outgoing,
  });
}

/** Every room must be reachable on foot from its building's entrance and back (rules D15, W3). */
function checkInteriors(world: World): WorldIssue[] {
  const issues: WorldIssue[] = [];
  for (const building of world.places.values()) {
    if (building.kind !== "urban") continue;
    const rooms: PlaceId[] = [];
    const stack = [...(world.children.get(building.id) ?? [])];
    for (let id = stack.pop(); id !== undefined; id = stack.pop()) {
      if (world.places.get(id)?.kind !== "interior") continue;
      rooms.push(id);
      stack.push(...(world.children.get(id) ?? []));
    }
    if (rooms.length === 0) continue;
    const fromEntrance = reachableFrom(world, building.id, INTERIOR_MODES);
    for (const room of rooms.sort()) {
      if (!fromEntrance.has(room)) {
        issues.push({
          severity: "error",
          code: "interior.unreachable",
          message: `Room ${room} cannot be reached on foot from the entrance of ${building.id}`,
          ids: [room, building.id],
        });
      } else if (!reachableFrom(world, room, INTERIOR_MODES).has(building.id)) {
        issues.push({
          severity: "error",
          code: "interior.no-exit",
          message: `Room ${room} has no walking route back to the entrance of ${building.id}`,
          ids: [room, building.id],
        });
      }
    }
  }
  return issues;
}

/** Warn about likely duplicates and edges much longer than an alternative route (rule D6). */
function checkWarnings(world: World): WorldIssue[] {
  const warnings: WorldIssue[] = [];
  const edges = [...world.edges.values()].sort(byId);

  for (let i = 0; i < edges.length; i += 1) {
    for (let j = i + 1; j < edges.length; j += 1) {
      const a = edges[i];
      const b = edges[j];
      if (!a || !b) continue;
      const samePair = (a.from === b.from && a.to === b.to) || (!a.oneWay && !b.oneWay && a.from === b.to && a.to === b.from);
      if (samePair && a.allowedModes.some((m) => b.allowedModes.includes(m))) {
        warnings.push({
          severity: "warning",
          code: "edge.possible-duplicate",
          message: `Edges ${a.id} and ${b.id} join the same places with a shared mode`,
          ids: [a.id, b.id],
        });
      }
    }
  }

  for (const edge of edges) {
    for (const mode of edge.allowedModes) {
      const alternative = shortestPath(world, edge.from, edge.to, [mode], { excludeEdge: edge.id });
      if (alternative && edge.lengthM > DETOUR_WARNING_RATIO * alternative.lengthM) {
        warnings.push({
          severity: "warning",
          code: "edge.longer-than-alternative",
          message: `Edge ${edge.id} (${edge.lengthM} m) is much longer than a ${mode} route of ${alternative.lengthM} m`,
          ids: [edge.id],
        });
        break;
      }
    }
  }
  return warnings;
}

/** Validate world data and build an immutable, indexed world. */
export function createWorld(data: WorldData): Result<BuiltWorld, RejectedWorld> {
  const { issues, places } = validateStructure(data);
  if (issues.length > 0) return err({ errors: issues, warnings: [] });

  const world = index(data, places);
  const errors = checkInteriors(world);
  const warnings = checkWarnings(world);
  return errors.length > 0 ? err({ errors, warnings }) : ok({ world, warnings });
}
