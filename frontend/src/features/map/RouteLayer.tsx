import type { LevelLayout, Point, WorldSnapshot } from "../../domain/world";
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
  focusId = null,
  webLayout,
}: {
  snapshot: WorldSnapshot;
  layout: LevelLayout;
  transform: Transform;
  layer: NetworkLayer;
  selectedPlaceId: string | null;
  focusId?: string | null;
  webLayout?: LevelLayout | undefined;
}) {
  const at = (id: string, fallback: Point) =>
    webLayout?.stations.find((s) => s.placeId === id)?.position ?? fallback;
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
          waypoints: webLayout
            ? [
                at(route.relation.a, route.waypoints[0]!),
                at(
                  route.relation.b,
                  route.waypoints[route.waypoints.length - 1]!,
                ),
              ]
            : route.waypoints,
          a: route.relation.a,
          b: route.relation.b,
        }));
  return (
    <g
      className={`map-routes map-routes--${layer}`}
      data-focused={layer === "nearby" && focusId ? "true" : undefined}
    >
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
          data-focus-link={
            focusId && (route.a === focusId || route.b === focusId)
              ? "true"
              : undefined
          }
          d={roundedPath(
            route.waypoints.map((point) => project(point, transform)),
          )}
        />
      ))}
    </g>
  );
}
