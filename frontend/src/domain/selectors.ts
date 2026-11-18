import { canObserve } from "./navigation";
import type { CharacterState, WorldSnapshot } from "./world";
export function placeName(snapshot: WorldSnapshot, id: string | null): string {
  return (
    snapshot.places.find((place) => place.id === id && canObserve(snapshot, id))
      ?.name ?? "Unknown location"
  );
}
export function describeLocation(
  snapshot: WorldSnapshot,
  character: CharacterState,
): string {
  if (character.location.kind === "place")
    return placeName(snapshot, character.location.placeId);
  const connectionId = character.location.connectionId;
  const edge = snapshot.connections.find(
    (connection) => connection.id === connectionId,
  );
  return edge
    ? `In transit: ${placeName(snapshot, edge.from)} → ${placeName(snapshot, edge.to)}`
    : "Unknown journey";
}
export function characterEvents(snapshot: WorldSnapshot, characterId: string) {
  return snapshot.events
    .filter((event) => event.characterId === characterId)
    .map((event, index) => ({ event, index }))
    .sort(
      (a, b) =>
        Date.parse(a.event.at) - Date.parse(b.event.at) || a.index - b.index,
    )
    .map((item) => item.event);
}
export function formatStateTime(
  instant: string | null,
  timeZone: string,
): string {
  if (instant === null) return "State time unknown";
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone,
  }).format(new Date(instant));
}
