import { describe, expect, it, vi } from "vitest";
import { exampleWorld } from "../../data/exampleWorld";
import { createFixtureReader } from "../../data/fixtureReader";
import {
  fitTransform,
  isOctilinear,
  pointAlong,
  project,
  roundedPath,
  roundedPolyline,
} from "./geometry";
import {
  presence,
  stationDegree,
  visibleRoutes,
  visibleNearbyRoutes,
} from "./mapModel";

describe("authored spatial presentation", () => {
  it("uses one uniform transform and retains 45 degree segments", () => {
    const transform = fitTransform(
      { width: 1200, height: 800 },
      { width: 600, height: 600 },
    );
    expect(transform).toEqual({ scale: 0.5, x: 0, y: 100 });
    const a = project({ x: 100, y: 100 }, transform),
      b = project({ x: 150, y: 150 }, transform);
    expect(b.x - a.x).toBe(b.y - a.y);
  });
  it("authored routes match only actual connections and their station endpoints", () => {
    for (const layout of exampleWorld.layouts) {
      const routes = visibleRoutes(exampleWorld, layout);
      expect(routes).toHaveLength(layout.routes.length);
      for (const route of routes) {
        expect(isOctilinear(route.waypoints)).toBe(true);
        expect(route.waypoints[0]).toEqual(
          layout.stations.find((s) => s.placeId === route.edge.from)!.position,
        );
        expect(route.waypoints.at(-1)).toEqual(
          layout.stations.find((s) => s.placeId === route.edge.to)!.position,
        );
      }
    }
    for (const layout of exampleWorld.layouts)
      for (const route of visibleNearbyRoutes(exampleWorld, layout)) {
        expect(isOctilinear(route.waypoints)).toBe(true);
        expect(route.waypoints[0]).toEqual(
          layout.stations.find((s) => s.placeId === route.relation.a)!.position,
        );
        expect(route.waypoints.at(-1)).toEqual(
          layout.stations.find((s) => s.placeId === route.relation.b)!.position,
        );
      }
    const layout = exampleWorld.layouts[0]!;
    expect(
      visibleRoutes(exampleWorld, {
        ...layout,
        routes: [...layout.routes, { connectionId: "invented", waypoints: [] }],
      }),
    ).toHaveLength(layout.routes.length);
  });
  it("junction degree counts only connections represented at this level", () => {
    const layout = exampleWorld.layouts[0]!;
    const snapshot = {
      ...exampleWorld,
      connections: [
        ...exampleWorld.connections,
        { id: "hidden", from: "place-1", to: "room-0", durationMinutes: null },
      ],
    };
    expect(stationDegree(snapshot, "place-1", layout)).toBe(3);
  });
  it("authored routes do not pass through unrelated stations at any defined level", () => {
    for (const layout of exampleWorld.layouts) {
      const routes = [
        ...visibleRoutes(exampleWorld, layout),
        ...visibleNearbyRoutes(exampleWorld, layout).map((route) => ({
          connectionId: route.relationId,
          waypoints: route.waypoints,
          edge: { from: route.relation.a, to: route.relation.b },
        })),
      ];
      for (const route of routes) {
        const unrelated = layout.stations.filter(
          (station) =>
            station.placeId !== route.edge.from &&
            station.placeId !== route.edge.to,
        );
        for (const station of unrelated) {
          for (let index = 1; index < route.waypoints.length; index++) {
            const a = route.waypoints[index - 1]!,
              b = route.waypoints[index]!;
            const dx = b.x - a.x,
              dy = b.y - a.y;
            const lengthSquared = dx * dx + dy * dy;
            const t =
              lengthSquared === 0
                ? 0
                : Math.max(
                    0,
                    Math.min(
                      1,
                      ((station.position.x - a.x) * dx +
                        (station.position.y - a.y) * dy) /
                        lengthSquared,
                    ),
                  );
            const clearance = Math.hypot(
              station.position.x - a.x - t * dx,
              station.position.y - a.y - t * dy,
            );
            expect(
              clearance,
              `${layout.levelId}: ${route.connectionId} passes ${station.placeId}`,
            ).toBeGreaterThan(24);
          }
        }
      }
    }
  });
  it("rounded transit samples follow the same curved corner as the visible path", () => {
    const points = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
    ];
    expect(roundedPath(points)).toContain("Q 100 0 100 10");
    const middle = pointAlong(roundedPolyline(points), 0.5)!;
    expect(middle.x).toBeCloseTo(97.5, 3);
    expect(middle.y).toBeCloseTo(2.5, 3);
  });
  it("does not invent a presence for unknown or out-of-level locations", async () => {
    const unknown = await createFixtureReader("unknown", 0).loadSnapshot();
    expect(
      presence(unknown, unknown.layouts[0]!, unknown.characters[0]),
    ).toBeNull();
    expect(
      presence(
        exampleWorld,
        exampleWorld.layouts[1]!,
        exampleWorld.characters[0],
      ),
    ).toBeNull();
  });
  it("uses snapshot time only and never fabricates an arrival", async () => {
    const snapshot = await createFixtureReader("transit", 0).loadSnapshot();
    const layout = snapshot.layouts[0]!;
    const before = presence(snapshot, layout, snapshot.characters[0]);
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2030-01-01"));
    expect(presence(snapshot, layout, snapshot.characters[0])).toEqual(before);
    vi.useRealTimers();
    expect(before?.kind).toBe("journey");
    expect(before?.progress).toBe(0.5);
    expect(
      presence({ ...snapshot, asOf: null }, layout, snapshot.characters[0])
        ?.point,
    ).toBeNull();
    expect(
      presence(
        { ...snapshot, asOf: "2026-11-16T08:40:00-03:00" },
        layout,
        snapshot.characters[0],
      )?.progress,
    ).toBe(0.98);
  });
});
