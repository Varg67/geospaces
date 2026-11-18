import { describe, expect, it } from "vitest";
import { exampleWorld } from "../data/exampleWorld";
import { createFixtureReader } from "../data/fixtureReader";
import { nearbyPlaces } from "./proximity";
import { validateSnapshot } from "./validateSnapshot";
import { visibleNearbyRoutes, visibleRoutes } from "../features/map/mapModel";
const ids = (id: string) =>
  nearbyPlaces(exampleWorld, id).places.map((place) => place.id);
const access = (id: string) =>
  exampleWorld.connections
    .filter((edge) => edge.from === id || edge.to === id)
    .map((edge) => (edge.from === id ? edge.to : edge.from));
describe("independent declared spatial relations", () => {
  it("has a meshed access network with several hubs and cycles, not an ordered chain", () => {
    const urban = exampleWorld.places
        .filter((place) => place.kind === "urban")
        .map((place) => place.id),
      seen = new Set<string>();
    const visit = (id: string) => {
      if (seen.has(id)) return;
      seen.add(id);
      for (const next of access(id)) visit(next);
    };
    visit("place-0");
    expect(urban.every((id) => seen.has(id))).toBe(true);
    const edges = exampleWorld.connections.filter(
      (edge) => urban.includes(edge.from) && urban.includes(edge.to),
    );
    expect(edges.length).toBeGreaterThanOrEqual(urban.length);
    expect(
      urban.filter((id) => access(id).length >= 3).length,
    ).toBeGreaterThanOrEqual(4);
    expect(ids("place-1")).toEqual([
      "place-0",
      "place-2",
      "place-3",
      "place-5",
    ]);
  });
  it("separates near-only, access-only and independently shared pairs", () => {
    expect(ids("place-1")).toContain("place-2");
    expect(access("place-1")).not.toContain("place-2");
    expect(access("place-1")).toContain("place-4");
    expect(ids("place-1")).not.toContain("place-4");
    expect(ids("place-1")).toContain("place-0");
    expect(access("place-1")).toContain("place-0");
    expect(ids("place-2")).toContain("place-1");
    expect(ids("room-3")).toContain("room-5");
    expect(access("room-3")).not.toContain("room-5");
    // Library remains reachable through actual passages, never a fabricated near link.
    expect(access("place-1")).toContain("place-4");
    expect(access("place-4")).toContain("place-3");
    expect(access("place-3")).toContain("place-2");
  });
  it("does not infer proximity from coordinates, district membership, time or access", () => {
    const changed = {
      ...exampleWorld,
      layouts: exampleWorld.layouts.map((layout) => ({
        ...layout,
        stations: layout.stations.map((station) => ({
          ...station,
          position: { x: 0, y: 0 },
        })),
      })),
      connections: exampleWorld.connections.map((edge) => ({
        ...edge,
        durationMinutes: 0,
      })),
    };
    expect(nearbyPlaces(changed, "place-1")).toEqual(
      nearbyPlaces(exampleWorld, "place-1"),
    );
    expect(ids("place-1")).not.toContain("place-7");
  });
  it("distinguishes missing knowledge and known-empty without guessing distance", async () => {
    expect(
      nearbyPlaces({ ...exampleWorld, proximity: null }, "place-1"),
    ).toEqual({ status: "unknown", places: [] });
    const { proximity, ...absent } = exampleWorld;
    expect(proximity).toBeTruthy();
    expect(nearbyPlaces(absent, "place-1").status).toBe("unknown");
    expect(nearbyPlaces(exampleWorld, "place-11").status).toBe("unknown");
    const empty = await createFixtureReader("nearby-empty", 0).loadSnapshot();
    expect(nearbyPlaces(empty, "place-1")).toEqual({
      status: "known",
      places: [],
    });
    const unknown = await createFixtureReader(
      "nearby-unknown",
      0,
    ).loadSnapshot();
    expect(nearbyPlaces(unknown, "place-1").status).toBe("unknown");
  });
  it("filters inaccessible endpoints from context and each level geometry", () => {
    const snapshot = {
      ...exampleWorld,
      places: exampleWorld.places.map((place) =>
        place.id === "north"
          ? { ...place, interior: "restricted" as const }
          : place,
      ),
    };
    expect(nearbyPlaces(snapshot, "place-1")).toEqual({
      status: "unknown",
      places: [],
    });
    expect(
      nearbyPlaces(snapshot, "place-8").places.map((place) => place.id),
    ).not.toContain("place-7");
    const world = exampleWorld.layouts.find(
      (layout) => layout.levelId === "world",
    )!;
    expect(
      visibleNearbyRoutes(snapshot, world).every(
        (route) =>
          !route.relation.a.match(/^place-[0-7]$/) &&
          !route.relation.b.match(/^place-[0-7]$/),
      ),
    ).toBe(true);
    const north = exampleWorld.layouts.find(
      (layout) => layout.levelId === "north",
    )!;
    expect(
      visibleRoutes(exampleWorld, north).some(
        (route) => route.connectionId === "walk-7",
      ),
    ).toBe(false);
    expect(
      visibleNearbyRoutes(exampleWorld, north).some(
        (route) => route.relationId === "near-bookshop-station",
      ),
    ).toBe(false);
    expect(
      visibleRoutes(exampleWorld, north).some(
        (route) => route.connectionId === "access-clinic-bookshop",
      ),
    ).toBe(true);
  });
  it("rejects invalid, duplicate/reversed and uncovered proximity endpoints", () => {
    const base = exampleWorld.proximity!;
    for (const relation of [
      { id: "bad", a: "missing", b: "place-1" },
      { id: "bad", a: "place-1", b: "place-1" },
      { id: "reverse", a: "place-1", b: "place-0" },
      { id: "bad", a: "place-11", b: "place-1" },
    ])
      expect(() =>
        validateSnapshot({
          ...exampleWorld,
          proximity: { ...base, relations: [...base.relations, relation] },
        }),
      ).toThrow();
  });
});
