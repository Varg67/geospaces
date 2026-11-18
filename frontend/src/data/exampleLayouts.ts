import { urbanAccess, exampleProximity } from "./exampleRelations";
import type { LevelLayout, Point } from "../domain/world";
const worldPositions: readonly Point[] = [
  { x: 140, y: 180 },
  { x: 370, y: 180 },
  { x: 600, y: 180 },
  { x: 600, y: 390 },
  { x: 370, y: 390 },
  { x: 140, y: 390 },
  { x: 140, y: 600 },
  { x: 370, y: 600 },
  { x: 850, y: 620 },
  { x: 1080, y: 620 },
  { x: 1080, y: 460 },
  { x: 850, y: 460 },
  { x: 850, y: 300 },
  { x: 1080, y: 300 },
  { x: 1080, y: 140 },
];
const roomPositions: readonly Point[] = [
  { x: 160, y: 180 },
  { x: 480, y: 180 },
  { x: 800, y: 180 },
  { x: 160, y: 420 },
  { x: 480, y: 420 },
  { x: 800, y: 420 },
];
const route = (id: string, points: readonly Point[]) => ({
  connectionId: id,
  waypoints: points,
});
const worldRoutes = [
  route("walk-0", [worldPositions[0]!, worldPositions[1]!]),
  route("walk-2", [worldPositions[2]!, worldPositions[3]!]),
  route("walk-3", [worldPositions[3]!, worldPositions[4]!]),
  route("walk-4", [worldPositions[4]!, worldPositions[5]!]),
  route("walk-5", [worldPositions[5]!, worldPositions[6]!]),
  route("walk-6", [worldPositions[6]!, worldPositions[7]!]),
  route("walk-7", [
    worldPositions[7]!,
    { x: 650, y: 600 },
    { x: 670, y: 620 },
    worldPositions[8]!,
  ]),
  route("walk-8", [worldPositions[8]!, worldPositions[9]!]),
  route("walk-9", [worldPositions[9]!, worldPositions[10]!]),
  route("walk-10", [worldPositions[10]!, worldPositions[11]!]),
  route("walk-11", [worldPositions[11]!, worldPositions[12]!]),
  route("walk-12", [worldPositions[12]!, worldPositions[13]!]),
  route("walk-13", [worldPositions[13]!, worldPositions[14]!]),
  route("access-cafe-clinic", [worldPositions[1]!, worldPositions[4]!]),
  route("access-cafe-market", [
    worldPositions[1]!,
    { x: 250, y: 180 },
    { x: 140, y: 290 },
    worldPositions[5]!,
  ]),
  route("access-clinic-bookshop", [worldPositions[4]!, worldPositions[7]!]),
  route("access-market-bookshop", [
    worldPositions[5]!,
    { x: 160, y: 390 },
    worldPositions[7]!,
  ]),
  route("access-station-gym", [
    worldPositions[8]!,
    { x: 920, y: 620 },
    worldPositions[10]!,
  ]),
  route("access-workshop-cinema", [
    worldPositions[11]!,
    { x: 920, y: 460 },
    worldPositions[13]!,
  ]),
];
const nearRoute = (relationId: string, waypoints: readonly Point[]) => ({
  relationId,
  waypoints,
});
const worldNearby = [
  nearRoute("near-home-cafe", [worldPositions[0]!, worldPositions[1]!]),
  nearRoute("near-cafe-library", [worldPositions[1]!, worldPositions[2]!]),
  nearRoute("near-cafe-bakery", [
    worldPositions[1]!,
    { x: 490, y: 180 },
    { x: 600, y: 290 },
    worldPositions[3]!,
  ]),
  nearRoute(
    "near-cafe-market",
    worldRoutes.find((r) => r.connectionId === "access-cafe-market")!.waypoints,
  ),
  nearRoute("near-home-market", [worldPositions[0]!, worldPositions[5]!]),
  nearRoute("near-library-bakery", [worldPositions[2]!, worldPositions[3]!]),
  nearRoute("near-bakery-clinic", [worldPositions[3]!, worldPositions[4]!]),
  nearRoute("near-clinic-market", [worldPositions[4]!, worldPositions[5]!]),
  nearRoute("near-market-school", [worldPositions[5]!, worldPositions[6]!]),
  nearRoute("near-school-bookshop", [worldPositions[6]!, worldPositions[7]!]),
  nearRoute("near-clinic-bookshop", [worldPositions[4]!, worldPositions[7]!]),
  nearRoute(
    "near-market-bookshop",
    worldRoutes.find((r) => r.connectionId === "access-market-bookshop")!
      .waypoints,
  ),
  nearRoute("near-station-gallery", [worldPositions[8]!, worldPositions[9]!]),
  nearRoute(
    "near-station-gym",
    worldRoutes.find((r) => r.connectionId === "access-station-gym")!.waypoints,
  ),
  nearRoute("near-gallery-gym", [worldPositions[9]!, worldPositions[10]!]),
  nearRoute("near-gym-pharmacy", [
    worldPositions[10]!,
    { x: 1010, y: 460 },
    worldPositions[12]!,
  ]),
  nearRoute("near-pharmacy-cinema", [worldPositions[12]!, worldPositions[13]!]),
  nearRoute("near-cinema-flower", [worldPositions[13]!, worldPositions[14]!]),
  nearRoute(
    "near-bookshop-station",
    worldRoutes.find((r) => r.connectionId === "walk-7")!.waypoints,
  ),
];
const baseLayouts: readonly LevelLayout[] = [
  {
    levelId: "world",
    bounds: { width: 1200, height: 800 },
    stations: worldPositions.map((position, index) => ({
      placeId: `place-${index}`,
      position,
    })),
    regions: [
      {
        placeId: "north",
        polygon: [
          { x: 40, y: 70 },
          { x: 660, y: 70 },
          { x: 720, y: 130 },
          { x: 720, y: 680 },
          { x: 690, y: 710 },
          { x: 40, y: 710 },
        ],
      },
      {
        placeId: "south",
        polygon: [
          { x: 750, y: 70 },
          { x: 1160, y: 70 },
          { x: 1160, y: 710 },
          { x: 780, y: 710 },
          { x: 750, y: 680 },
        ],
      },
    ],
    routes: worldRoutes,
    nearbyRoutes: worldNearby,
  },
  {
    levelId: "place-0",
    bounds: { width: 1000, height: 600 },
    stations: roomPositions.map((position, index) => ({
      placeId: `room-${index}`,
      position,
    })),
    regions: [
      {
        placeId: "place-0",
        polygon: [
          { x: 40, y: 50 },
          { x: 960, y: 50 },
          { x: 960, y: 550 },
          { x: 40, y: 550 },
        ],
      },
    ],
    nearbyRoutes: [
      nearRoute("near-entry-living", [roomPositions[0]!, roomPositions[1]!]),
      nearRoute("near-living-hall", [roomPositions[1]!, roomPositions[2]!]),
      nearRoute("near-living-kitchen", [roomPositions[1]!, roomPositions[4]!]),
      nearRoute("near-hall-bathroom", [roomPositions[2]!, roomPositions[5]!]),
      nearRoute("near-bedroom-bathroom", [
        roomPositions[3]!,
        { x: 220, y: 480 },
        { x: 740, y: 480 },
        roomPositions[5]!,
      ]),
    ],
    routes: [
      {
        connectionId: "passage-0",
        waypoints: [roomPositions[0]!, roomPositions[1]!],
      },
      {
        connectionId: "passage-1",
        waypoints: [roomPositions[1]!, roomPositions[2]!],
      },
      {
        connectionId: "passage-2",
        waypoints: [
          roomPositions[2]!,
          { x: 900, y: 280 },
          { x: 900, y: 500 },
          { x: 240, y: 500 },
          roomPositions[3]!,
        ],
      },
      {
        connectionId: "passage-3",
        waypoints: [roomPositions[1]!, roomPositions[4]!],
      },
      {
        connectionId: "passage-4",
        waypoints: [roomPositions[2]!, roomPositions[5]!],
      },
    ],
  },
];

// District views reuse authored geometry and defined connections; they add no
// shortcuts between places. South coordinates use a local origin.
const worldLayout = baseLayouts[0]!;
function districtLayout(
  levelId: string,
  start: number,
  end: number,
  offsetX: number,
  width: number,
): LevelLayout {
  const shift = (point: Point): Point => ({ x: point.x - offsetX, y: point.y });
  const ids = new Set(
    worldLayout.stations.slice(start, end).map((station) => station.placeId),
  );
  return {
    levelId,
    bounds: { width, height: 800 },
    stations: worldLayout.stations
      .slice(start, end)
      .map((station) => ({ ...station, position: shift(station.position) })),
    regions: worldLayout.regions
      .filter((region) => region.placeId === levelId)
      .map((region) => ({ ...region, polygon: region.polygon.map(shift) })),
    routes: worldLayout.routes
      .filter((route) =>
        urbanAccess.some(
          (edge) =>
            edge.id === route.connectionId &&
            ids.has(edge.from) &&
            ids.has(edge.to),
        ),
      )
      .map((route) => ({ ...route, waypoints: route.waypoints.map(shift) })),
    nearbyRoutes: (worldLayout.nearbyRoutes ?? [])
      .filter((route) =>
        exampleProximity.relations.some(
          (relation) =>
            relation.id === route.relationId &&
            ids.has(relation.a) &&
            ids.has(relation.b),
        ),
      )
      .map((route) => ({ ...route, waypoints: route.waypoints.map(shift) })),
  };
}
export const exampleLayouts: readonly LevelLayout[] = [
  ...baseLayouts,
  districtLayout("north", 0, 8, 0, 760),
  districtLayout("south", 8, 15, 700, 500),
];
