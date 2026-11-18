import type { LevelLayout } from "../../domain/world";
import { useWorldView } from "../../app/view/ViewContext";
import {
  project,
  pointAlong,
  roundedPolyline,
  type Transform,
} from "./geometry";
import { presence } from "./mapModel";
export function PresenceLayer({
  layout,
  transform,
  showJourney = true,
}: {
  layout: LevelLayout;
  transform: Transform;
  showJourney?: boolean;
}) {
  const { snapshot, state } = useWorldView();
  const character = snapshot.characters.find(
    (item) => item.id === state.characterId,
  );
  const marker = presence(snapshot, layout, character);
  if (!marker || (marker.kind === "journey" && !showJourney)) return null;
  if (!marker.point) return <p className="map-transit-note">{marker.label}</p>;
  const point =
    marker.kind === "journey" && marker.progress !== null && marker.waypoints
      ? pointAlong(
          roundedPolyline(marker.waypoints.map((p) => project(p, transform))),
          marker.progress,
        )!
      : project(marker.point, transform);
  return (
    <div
      className={`map-presence map-presence--${marker.kind}`}
      style={{ left: point.x, top: point.y }}
    >
      <span className="map-presence__dot" aria-hidden="true" />
      <span className="map-presence__label">
        {character?.name}
        {marker.kind === "journey" ? " · in transit" : ""}
      </span>
      <span className="sr-only">{marker.label}</span>
    </div>
  );
}
