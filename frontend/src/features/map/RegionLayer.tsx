import type { LevelLayout, WorldSnapshot } from "../../domain/world";
import { project, type Transform } from "./geometry";
export function RegionLayer({
  snapshot,
  layout,
  transform,
}: {
  snapshot: WorldSnapshot;
  layout: LevelLayout;
  transform: Transform;
}) {
  return (
    <g className="map-regions">
      {layout.regions.map((region) => {
        const points = region.polygon.map((point) => project(point, transform));
        const x = Math.min(...points.map((p) => p.x)) + 14,
          y = Math.min(...points.map((p) => p.y)) + 22;
        const name =
          snapshot.places.find((place) => place.id === region.placeId)?.name ??
          "Unnamed region";
        return (
          <g key={region.placeId}>
            <polygon
              points={points.map((point) => `${point.x},${point.y}`).join(" ")}
            />
            <text x={x} y={y}>
              <title>{name}</title>
              {name.length > 24 ? `${name.slice(0, 23)}…` : name}
            </text>
          </g>
        );
      })}
    </g>
  );
}
