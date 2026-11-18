// Stage 1 — world graph: places, hierarchy, access edges, validation, shortest paths.
export type {
  AccessEdge,
  DistrictProfile,
  EdgeStep,
  Path,
  Place,
  PlaceKind,
  ProximityRelation,
  World,
  WorldData,
  WorldIssue,
} from "./types.ts";
export { ALLOWED_PARENT_KINDS, DISTRICT_PROFILES } from "./types.ts";
export { ancestry, buildingOf } from "./hierarchy.ts";
export { reachableFrom, shortestPath, usableSteps, type PathOptions } from "./paths.ts";
export { INTERIOR_MODES } from "./validate.ts";
export { createWorld, DETOUR_WARNING_RATIO, type BuiltWorld, type RejectedWorld } from "./world.ts";
