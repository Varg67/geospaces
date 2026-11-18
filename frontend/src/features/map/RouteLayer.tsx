import type { LevelLayout, WorldSnapshot } from "../../domain/world";
import { project, roundedPath, type Transform } from "./geometry";
import {
  visibleRoutes,
  visibleNearbyRoutes,
  type NetworkLayer,
} from "./mapModel";
export function RouteLayer({
  snapshot,
  layout,
  transform,
  layer,
  selectedPlaceId,
}: {
  snapshot: WorldSnapshot;
  layout: LevelLayout;
  transform: Transform;
  layer: NetworkLayer;
  selectedPlaceId: string | null;
}) {
  const routes =
    layer === "access"
      ? visibleRoutes(snapshot, layout).map((route) => ({
          id: route.connectionId,
          waypoints: route.waypoints,
          a: route.edge.from,
          b: route.edge.to,
        }))
      : visibleNearbyRoutes(snapshot, layout).map((route) => ({
          id: route.relationId,
          waypoints: route.waypoints,
          a: route.relation.a,
          b: route.relation.b,
        }));
  return (
    <g className={`map-routes map-routes--${layer}`}>
      {routes.map((route) => (
        <path
          key={route.id}
          data-connection={layer === "access" ? route.id : undefined}
          data-proximity={layer === "nearby" ? route.id : undefined}
          data-incident={
            route.a === selectedPlaceId || route.b === selectedPlaceId
              ? "true"
              : "false"
          }
          d={roundedPath(
            route.waypoints.map((point) => project(point, transform)),
          )}
        />
      ))}
    </g>
  );
}
