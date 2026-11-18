import type {
  CharacterState,
  LevelLayout,
  WorldSnapshot,
} from "../../domain/world";
import { canObserve } from "../../domain/navigation";
import { pointAlong } from "./geometry";
export function visibleRoutes(snapshot: WorldSnapshot, layout: LevelLayout) {
  const ids = new Set(layout.stations.map((station) => station.placeId));
  return layout.routes.flatMap((route) => {
    const edge = snapshot.connections.find(
      (connection) => connection.id === route.connectionId,
    );
    return edge &&
      ids.has(edge.from) &&
      ids.has(edge.to) &&
      canObserve(snapshot, edge.from) &&
      canObserve(snapshot, edge.to)
      ? [{ ...route, edge }]
      : [];
  });
}
export function stationDegree(
  snapshot: WorldSnapshot,
  id: string,
  layout: LevelLayout,
) {
  return visibleRoutes(snapshot, layout).filter(
    (route) => route.edge.from === id || route.edge.to === id,
  ).length;
}
export function presence(
  snapshot: WorldSnapshot,
  layout: LevelLayout,
  character: CharacterState | undefined,
) {
  if (!character) return null;
  if (character.location.kind === "place") {
    const id = character.location.placeId;
    const station = layout.stations.find((item) => item.placeId === id);
    return station
      ? {
          point: station.position,
          label: `${character.name} is here`,
          kind: "place" as const,
          progress: null,
          waypoints: null,
        }
      : null;
  }
  const journey = character.location;
  const route = visibleRoutes(snapshot, layout).find(
    (item) => item.connectionId === journey.connectionId,
  );
  if (!route) return null;
  const from = Date.parse(journey.departedAt),
    to = Date.parse(journey.earliestArrivalAt),
    asOf = snapshot.asOf === null ? NaN : Date.parse(snapshot.asOf);
  if (
    !Number.isFinite(from) ||
    !Number.isFinite(to) ||
    to <= from ||
    !Number.isFinite(asOf) ||
    asOf < from
  )
    return {
      point: null,
      label: `${character.name} in transit · progress unknown`,
      kind: "journey" as const,
      progress: null,
      waypoints: route.waypoints,
    };
  const progress = Math.max(0, Math.min(0.98, (asOf - from) / (to - from)));
  const point = pointAlong(route.waypoints, progress);
  return {
    point,
    label: `${character.name} in transit · snapshot position estimate`,
    kind: "journey" as const,
    progress,
    waypoints: route.waypoints,
  };
}

export function visibleNearbyRoutes(
  snapshot: WorldSnapshot,
  layout: LevelLayout,
) {
  const ids = new Set(layout.stations.map((station) => station.placeId));
  return (layout.nearbyRoutes ?? []).flatMap((route) => {
    const relation = snapshot.proximity?.relations.find(
      (relation) => relation.id === route.relationId,
    );
    return relation &&
      ids.has(relation.a) &&
      ids.has(relation.b) &&
      canObserve(snapshot, relation.a) &&
      canObserve(snapshot, relation.b)
      ? [{ ...route, relation }]
      : [];
  });
}
export function nearbyDegree(
  snapshot: WorldSnapshot,
  id: string,
  layout: LevelLayout,
) {
  return visibleNearbyRoutes(snapshot, layout).filter(
    (route) => route.relation.a === id || route.relation.b === id,
  ).length;
}
export type NetworkLayer = "nearby" | "access";
