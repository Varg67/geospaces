import type { WorldSnapshot } from "./world";
/** Validate referential integrity at the presentation boundary, not world physics. */
export function validateSnapshot(snapshot: WorldSnapshot): void {
  const places = new Map(snapshot.places.map((place) => [place.id, place]));
  const characters = new Set(
    snapshot.characters.map((character) => character.id),
  );
  const connections = new Set(
    snapshot.connections.map((connection) => connection.id),
  );
  const requirePlace = (id: string) => {
    if (!places.has(id)) throw new Error(`Unknown place: ${id}`);
  };
  if (
    places.size !== snapshot.places.length ||
    characters.size !== snapshot.characters.length ||
    connections.size !== snapshot.connections.length
  )
    throw new Error("Duplicate entity ID");
  if (snapshot.asOf !== null && !Number.isFinite(Date.parse(snapshot.asOf)))
    throw new Error("Invalid state timestamp");
  for (const place of snapshot.places) {
    const visited = new Set<string>([place.id]);
    let parent = place.parentId;
    while (parent !== null) {
      requirePlace(parent);
      if (visited.has(parent)) throw new Error("Cyclic place hierarchy");
      visited.add(parent);
      parent = places.get(parent)!.parentId;
    }
  }
  for (const edge of snapshot.connections) {
    requirePlace(edge.from);
    requirePlace(edge.to);
    if (
      edge.durationMinutes !== null &&
      (!Number.isFinite(edge.durationMinutes) || edge.durationMinutes < 0)
    )
      throw new Error("Invalid connection duration");
  }
  const proximityIds = new Set<string>();
  if (snapshot.proximity) {
    const known = new Set(snapshot.proximity.knownPlaceIds);
    if (known.size !== snapshot.proximity.knownPlaceIds.length)
      throw new Error("Duplicate proximity coverage");
    for (const id of known) requirePlace(id);
    const pairs = new Set<string>();
    for (const relation of snapshot.proximity.relations) {
      requirePlace(relation.a);
      requirePlace(relation.b);
      const pair = JSON.stringify([relation.a, relation.b].sort());
      if (
        relation.a === relation.b ||
        pairs.has(pair) ||
        proximityIds.has(relation.id)
      )
        throw new Error("Invalid or duplicate proximity relation");
      if (!known.has(relation.a) || !known.has(relation.b))
        throw new Error("Proximity endpoint lacks recorded coverage");
      pairs.add(pair);
      proximityIds.add(relation.id);
    }
  }
  for (const character of snapshot.characters) {
    if (character.location.kind === "place") {
      if (character.location.placeId !== null)
        requirePlace(character.location.placeId);
    } else if (!connections.has(character.location.connectionId))
      throw new Error("Unknown journey connection");
  }
  for (const event of snapshot.events) {
    if (!characters.has(event.characterId))
      throw new Error("Unknown event character");
    if (event.placeId !== null) requirePlace(event.placeId);
    if (!Number.isFinite(Date.parse(event.at)))
      throw new Error("Invalid event timestamp");
  }
  for (const layout of snapshot.layouts) {
    requirePlace(layout.levelId);
    if (
      !Number.isFinite(layout.bounds.width) ||
      !Number.isFinite(layout.bounds.height) ||
      layout.bounds.width <= 0 ||
      layout.bounds.height <= 0
    )
      throw new Error("Invalid layout bounds");
    for (const station of layout.stations) requirePlace(station.placeId);
    for (const region of layout.regions) requirePlace(region.placeId);
    for (const route of layout.routes)
      if (!connections.has(route.connectionId))
        throw new Error("Unknown route connection");
    for (const route of layout.nearbyRoutes ?? [])
      if (!proximityIds.has(route.relationId))
        throw new Error("Unknown proximity route relation");
    const points = [
      ...(layout.nearbyRoutes ?? []).flatMap((route) => route.waypoints),
      ...layout.stations.map((station) => station.position),
      ...layout.regions.flatMap((region) => region.polygon),
      ...layout.routes.flatMap((route) => route.waypoints),
    ];
    if (
      points.some(
        (point) => !Number.isFinite(point.x) || !Number.isFinite(point.y),
      )
    )
      throw new Error("Invalid layout coordinate");
  }
}
