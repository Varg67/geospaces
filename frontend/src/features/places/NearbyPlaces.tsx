import { nearbyPlaces } from "../../domain/proximity";
import type { WorldSnapshot } from "../../domain/world";
export function NearbyPlaces({
  snapshot,
  placeId,
}: {
  snapshot: WorldSnapshot;
  placeId: string | null;
}) {
  const observation = nearbyPlaces(snapshot, placeId);
  return observation.status === "unknown" ? (
    <p>Nearby places unknown.</p>
  ) : observation.places.length ? (
    <ul>
      {observation.places.map((place) => (
        <li key={place.id}>{place.name}</li>
      ))}
    </ul>
  ) : (
    <p>No nearby places recorded in this view.</p>
  );
}
