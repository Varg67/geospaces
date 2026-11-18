import type { EdgeId, PlaceId, TravelMode } from "../../kernel/index.ts";

/** Weak place kinds, from outermost to innermost (rule W2). */
export type PlaceKind = "world" | "district" | "urban" | "interior";

/** Kinds each place kind may be contained in: world → district → urban → interior (rules W2, W3). */
export const ALLOWED_PARENT_KINDS: Readonly<Record<PlaceKind, readonly PlaceKind[]>> = {
  world: [],
  district: ["world"],
  urban: ["district"],
  interior: ["urban", "interior"],
};

/** District morphology used by later stages for waits and stand density (rule W2). */
export const DISTRICT_PROFILES = [
  "centre",
  "historic_centre",
  "inner_ring",
  "periphery",
  "informal_settlement",
  "old_suburb",
  "modern_suburb",
  "outlying_district",
] as const;
export type DistrictProfile = (typeof DISTRICT_PROFILES)[number];

export interface Place {
  readonly id: PlaceId;
  readonly name: string;
  /** `null` only for the single `world` root. */
  readonly parentId: PlaceId | null;
  readonly kind: PlaceKind;
  /** Spatial taxonomy type from the icon catalog, such as `bakery` or `bedroom`. */
  readonly category?: string;
  /** Only on districts. */
  readonly profile?: DistrictProfile;
}

/**
 * Traversable access between two urban or interior places (rules D6, W1, W3).
 * Two-way unless `oneWay` is true, in which case it runs only `from` → `to`.
 */
export interface AccessEdge {
  readonly id: EdgeId;
  readonly from: PlaceId;
  readonly to: PlaceId;
  /** Positive whole metres. Weak curates it; Mid will compute it. */
  readonly lengthM: number;
  readonly allowedModes: readonly TravelMode[];
  readonly oneWay?: boolean;
}

/** Declared, undirected nearness. Carries no duration and grants no access. */
export interface ProximityRelation {
  readonly id: string;
  readonly a: PlaceId;
  readonly b: PlaceId;
}

/** Raw world description, as authored or loaded. */
export interface WorldData {
  readonly places: readonly Place[];
  readonly edges: readonly AccessEdge[];
  readonly proximity?: readonly ProximityRelation[];
}

/** One traversal of an edge in a given direction. */
export interface EdgeStep {
  readonly edgeId: EdgeId;
  readonly from: PlaceId;
  readonly to: PlaceId;
  readonly lengthM: number;
}

/** Validated, immutable world with lookup indices. Build it with `createWorld`. */
export interface World {
  readonly rootId: PlaceId;
  readonly places: ReadonlyMap<PlaceId, Place>;
  readonly edges: ReadonlyMap<EdgeId, AccessEdge>;
  readonly proximity: readonly ProximityRelation[];
  /** Children of each place, sorted by id. */
  readonly children: ReadonlyMap<PlaceId, readonly PlaceId[]>;
  /** Traversable steps leaving each place, sorted by target id, then edge id. */
  readonly outgoing: ReadonlyMap<PlaceId, readonly EdgeStep[]>;
}

export interface Path {
  readonly places: readonly PlaceId[];
  readonly steps: readonly EdgeStep[];
  readonly lengthM: number;
}

export interface WorldIssue {
  readonly severity: "error" | "warning";
  readonly code: string;
  readonly message: string;
  readonly ids: readonly string[];
}
