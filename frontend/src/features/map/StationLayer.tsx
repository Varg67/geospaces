import { PlaceIcon } from "../../icons/PlaceIcon";
import { useWorldView } from "../../app/view/ViewContext";
import type { LevelLayout } from "../../domain/world";
import { project, type Transform } from "./geometry";
import {
  stationDegree,
  nearbyDegree,
  visibleNearbyRoutes,
  type NetworkLayer,
} from "./mapModel";
export function StationLayer({
  layout,
  transform,
  layer = "access",
  focusId = null,
}: {
  layout: LevelLayout;
  transform: Transform;
  layer?: NetworkLayer;
  focusId?: string | null;
}) {
  const { snapshot, state, dispatch } = useWorldView();
  const linked = new Set<string>();
  if (layer === "nearby" && focusId) {
    linked.add(focusId);
    for (const r of visibleNearbyRoutes(snapshot, layout)) {
      if (r.relation.a === focusId) linked.add(r.relation.b);
      if (r.relation.b === focusId) linked.add(r.relation.a);
    }
  }
  return (
    <div className="map-stations" role="group" aria-label="Places on the map">
      {layout.stations.map((station) => {
        const place = snapshot.places.find(
          (item) => item.id === station.placeId,
        );
        if (!place) return null;
        const point = project(station.position, transform),
          junction =
            (layer === "access"
              ? stationDegree(snapshot, place.id, layout)
              : nearbyDegree(snapshot, place.id, layout)) >= 3;
        return (
          <button
            className={`map-station${junction ? " map-station--junction" : ""}${linked.size && !linked.has(place.id) ? " map-station--dim" : ""}`}
            type="button"
            key={place.id}
            aria-label={place.name}
            aria-pressed={state.selectedPlaceId === place.id}
            onClick={() =>
              dispatch({ type: "select-place", placeId: place.id })
            }
            style={{ left: point.x, top: point.y }}
          >
            <span className="map-station__dot" aria-hidden="true">
              <PlaceIcon catalogType={place.catalogType} size={16} />
            </span>
            <span
              className="map-station__label"
              title={place.name}
              style={{
                maxWidth: Math.max(
                  18,
                  Math.min(
                    96,
                    ...layout.stations
                      .filter((other) => other.placeId !== place.id)
                      .map((other) => project(other.position, transform))
                      .filter((other) => Math.abs(other.y - point.y) < 26)
                      .map((other) => Math.abs(other.x - point.x) - 10),
                  ),
                ),
              }}
            >
              {place.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
