/** Presentation contracts. These describe observations, never simulation commands. */
export type PlaceId = string;
export type Point = Readonly<{ x: number; y: number }>;
export type InteriorAvailability = "available" | "undefined" | "restricted";
export type Place = Readonly<{
  id: PlaceId;
  name: string;
  parentId: PlaceId | null;
  kind: "world" | "district" | "urban" | "interior";
  interior: InteriorAvailability;
  /** Optional semantic catalog identifier; presentation resolves its symbol. */
  catalogType?: string;
}>;
export type Connection = Readonly<{
  id: string;
  from: PlaceId;
  to: PlaceId;
  durationMinutes: number | null;
}>;
/** Undirected declared nearness; it grants no access and carries no travel cost. */
export type ProximityRelation = Readonly<{
  id: string;
  a: PlaceId;
  b: PlaceId;
}>;
export type ProximityKnowledge = Readonly<{
  /** A covered place with no incident relations has recorded empty knowledge. */
  knownPlaceIds: readonly PlaceId[];
  relations: readonly ProximityRelation[];
}>;
export type CharacterState = Readonly<{
  id: string;
  name: string;
  location:
    | Readonly<{ kind: "place"; placeId: PlaceId | null }>
    | Readonly<{
        kind: "journey";
        connectionId: string;
        departedAt: string;
        earliestArrivalAt: string;
      }>;
  activity: string | null;
}>;
export type WorldEvent = Readonly<{
  id: string;
  characterId: string;
  at: string;
  summary: string;
  placeId: PlaceId | null;
}>;
export type LevelLayout = Readonly<{
  levelId: PlaceId;
  bounds: Readonly<{ width: number; height: number }>;
  stations: readonly Readonly<{ placeId: PlaceId; position: Point }>[];
  regions: readonly Readonly<{ placeId: PlaceId; polygon: readonly Point[] }>[];
  nearbyRoutes?: readonly Readonly<{
    relationId: string;
    waypoints: readonly Point[];
  }>[];
  routes: readonly Readonly<{
    connectionId: string;
    waypoints: readonly Point[];
  }>[];
}>;
export type WorldSnapshot = Readonly<{
  id: string;
  name: string;
  asOf: string | null;
  timeZone: string;
  places: readonly Place[];
  connections: readonly Connection[];
  /** Missing/null means proximity has not been recorded. */
  proximity?: ProximityKnowledge | null;
  characters: readonly CharacterState[];
  events: readonly WorldEvent[];
  layouts: readonly LevelLayout[];
}>;
export interface WorldReader {
  loadSnapshot(signal?: AbortSignal): Promise<WorldSnapshot>;
}
