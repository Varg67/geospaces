import { TRAVEL_MODES, type PlaceId, type TravelMode } from "../../kernel/index.ts";
import { ancestry, buildingOf } from "./hierarchy.ts";
import { ALLOWED_PARENT_KINDS, DISTRICT_PROFILES, type Place, type WorldData, type WorldIssue } from "./types.ts";

/** Modes allowed on edges that touch an interior place (rule W3). */
export const INTERIOR_MODES: readonly TravelMode[] = ["walk", "run"];

const NODE_KINDS = new Set(["urban", "interior"]);

const issue = (severity: WorldIssue["severity"], code: string, message: string, ...ids: string[]): WorldIssue => ({
  severity,
  code,
  message,
  ids,
});
const error = (code: string, message: string, ...ids: string[]) => issue("error", code, message, ...ids);

function validatePlaces(data: WorldData, places: Map<PlaceId, Place>): WorldIssue[] {
  const issues: WorldIssue[] = [];
  for (const place of data.places) {
    if (places.has(place.id)) issues.push(error("place.duplicate-id", `Duplicate place id ${place.id}`, place.id));
    places.set(place.id, place);
    if (place.name.trim() === "") issues.push(error("place.empty-name", `Place ${place.id} has an empty name`, place.id));
    if (place.profile !== undefined) {
      if (place.kind !== "district") {
        issues.push(error("place.profile-not-district", `Only districts have a profile: ${place.id}`, place.id));
      } else if (!DISTRICT_PROFILES.includes(place.profile)) {
        issues.push(error("place.unknown-profile", `Unknown district profile on ${place.id}`, place.id));
      }
    }
  }

  const roots = data.places.filter((p) => p.parentId === null);
  if (roots.length !== 1 || roots[0]?.kind !== "world") {
    issues.push(error("place.root", "The world needs exactly one root place, of kind world", ...roots.map((p) => p.id)));
  }

  for (const place of data.places) {
    if (place.parentId === null) {
      if (place.kind !== "world") issues.push(error("place.orphan", `Place ${place.id} has no parent`, place.id));
      continue;
    }
    const parent = places.get(place.parentId);
    if (!parent) {
      issues.push(error("place.missing-parent", `Parent ${place.parentId} of ${place.id} does not exist`, place.id));
      continue;
    }
    if (ancestry(places, place.id) === null) {
      issues.push(error("place.cycle", `Place ${place.id} is in a containment cycle`, place.id));
      continue;
    }
    if (!ALLOWED_PARENT_KINDS[place.kind].includes(parent.kind)) {
      issues.push(
        error("place.kind-order", `A ${place.kind} cannot be inside a ${parent.kind}: ${place.id}`, place.id, parent.id),
      );
    }
  }
  return issues;
}

function validateEdges(data: WorldData, places: ReadonlyMap<PlaceId, Place>): WorldIssue[] {
  const issues: WorldIssue[] = [];
  const ids = new Set<string>();
  for (const edge of data.edges) {
    if (ids.has(edge.id)) issues.push(error("edge.duplicate-id", `Duplicate edge id ${edge.id}`, edge.id));
    ids.add(edge.id);

    if (!Number.isSafeInteger(edge.lengthM) || edge.lengthM <= 0) {
      issues.push(error("edge.length", `Edge ${edge.id} needs a positive whole length in metres`, edge.id));
    }
    if (edge.allowedModes.length === 0) issues.push(error("edge.no-modes", `Edge ${edge.id} allows no mode`, edge.id));
    if (new Set(edge.allowedModes).size !== edge.allowedModes.length) {
      issues.push(error("edge.repeated-mode", `Edge ${edge.id} repeats a mode`, edge.id));
    }
    if (edge.allowedModes.some((m) => !TRAVEL_MODES.includes(m))) {
      issues.push(error("edge.unknown-mode", `Edge ${edge.id} has an unknown mode`, edge.id));
    }
    if (edge.from === edge.to) issues.push(error("edge.self-loop", `Edge ${edge.id} connects a place to itself`, edge.id));

    const from = places.get(edge.from);
    const to = places.get(edge.to);
    if (!from || !to) {
      issues.push(error("edge.missing-endpoint", `Edge ${edge.id} references a missing place`, edge.id));
      continue;
    }
    if (!NODE_KINDS.has(from.kind) || !NODE_KINDS.has(to.kind)) {
      issues.push(error("edge.region-endpoint", `Edge ${edge.id} must connect urban or interior places`, edge.id));
      continue;
    }
    if (from.kind === "interior" || to.kind === "interior") {
      const buildingFrom = from.kind === "urban" ? from : buildingOf(places, from.id);
      const buildingTo = to.kind === "urban" ? to : buildingOf(places, to.id);
      if (!buildingFrom || buildingFrom.id !== buildingTo?.id) {
        issues.push(
          error("edge.crosses-building", `Edge ${edge.id} must stay inside one building or reach its entrance`, edge.id),
        );
      }
      if (edge.allowedModes.some((m) => !INTERIOR_MODES.includes(m))) {
        issues.push(error("edge.interior-mode", `Interior edge ${edge.id} allows only walk and run`, edge.id));
      }
    }
  }
  return issues;
}

function validateProximity(data: WorldData, places: ReadonlyMap<PlaceId, Place>): WorldIssue[] {
  const issues: WorldIssue[] = [];
  const ids = new Set<string>();
  const pairs = new Set<string>();
  for (const rel of data.proximity ?? []) {
    if (ids.has(rel.id)) issues.push(error("proximity.duplicate-id", `Duplicate proximity id ${rel.id}`, rel.id));
    ids.add(rel.id);
    if (rel.a === rel.b) issues.push(error("proximity.self", `Proximity ${rel.id} relates a place to itself`, rel.id));
    const a = places.get(rel.a);
    const b = places.get(rel.b);
    if (!a || !b) {
      issues.push(error("proximity.missing-endpoint", `Proximity ${rel.id} references a missing place`, rel.id));
    } else if (!NODE_KINDS.has(a.kind) || !NODE_KINDS.has(b.kind)) {
      issues.push(error("proximity.region-endpoint", `Proximity ${rel.id} must relate urban or interior places`, rel.id));
    }
    const key = [rel.a, rel.b].sort().join("\u0000");
    if (pairs.has(key)) issues.push(error("proximity.duplicate-pair", `Proximity ${rel.id} repeats a pair`, rel.id));
    pairs.add(key);
  }
  return issues;
}

/** Structural checks that need no graph traversal. Returns errors only. */
export function validateStructure(data: WorldData): { issues: WorldIssue[]; places: ReadonlyMap<PlaceId, Place> } {
  const places = new Map<PlaceId, Place>();
  const issues = validatePlaces(data, places);
  issues.push(...validateEdges(data, places), ...validateProximity(data, places));
  return { issues, places };
}
