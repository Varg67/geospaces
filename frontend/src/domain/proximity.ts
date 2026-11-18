import { canObserve } from "./navigation";
import type { Place, WorldSnapshot } from "./world";
export type NearbyObservation = Readonly<{
  status: "unknown" | "known";
  places: readonly Place[];
}>;
export function nearbyPlaces(
  snapshot: WorldSnapshot,
  id: string | null,
): NearbyObservation {
  if (
    !id ||
    !canObserve(snapshot, id) ||
    !snapshot.proximity?.knownPlaceIds.includes(id)
  )
    return { status: "unknown", places: [] };
  const ids = new Set(
    snapshot.proximity.relations.flatMap((relation) =>
      relation.a === id ? [relation.b] : relation.b === id ? [relation.a] : [],
    ),
  );
  return {
    status: "known",
    places: snapshot.places.filter(
      (place) => ids.has(place.id) && canObserve(snapshot, place.id),
    ),
  };
}
