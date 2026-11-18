import { describe, expect, it } from "vitest";
import { placeId } from "../../kernel/index.ts";
import { ancestry, buildingOf, createWorld, shortestPath, type World, type WorldData } from "./index.ts";
import { edge, P, place, townData } from "./world.fixture.ts";

function build(data: WorldData): World {
  const result = createWorld(data);
  if (!result.ok) throw new Error(JSON.stringify(result.error.errors));
  return result.value.world;
}

function errorCodes(data: WorldData): string[] {
  const result = createWorld(data);
  return result.ok ? [] : result.error.errors.map((e) => e.code);
}

function warningCodes(data: WorldData): string[] {
  const result = createWorld(data);
  return (result.ok ? result.value.warnings : result.error.warnings).map((w) => w.code);
}

const withPlaces = (...extra: WorldData["places"]): WorldData => {
  const base = townData();
  return { ...base, places: [...base.places, ...extra] };
};
const withEdges = (...extra: WorldData["edges"]): WorldData => {
  const base = townData();
  return { ...base, edges: [...base.edges, ...extra] };
};

describe("createWorld", () => {
  it("builds the fixture town without errors or warnings", () => {
    const result = createWorld(townData());
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.warnings).toEqual([]);
  });

  it("indexes children in id order", () => {
    const world = build(townData());
    expect(world.rootId).toBe("world");
    expect(world.children.get(P.home)).toEqual([P.bedroom, P.hall, P.kitchen]);
  });
});

describe("hierarchy", () => {
  it("resolves ancestry and the building of nested rooms", () => {
    const world = build(townData());
    expect(ancestry(world.places, P.closet)?.map((p) => p.id)).toEqual([
      P.world,
      P.north,
      P.home,
      P.bedroom,
      P.closet,
    ]);
    expect(buildingOf(world.places, P.closet)?.id).toBe(P.home);
    expect(buildingOf(world.places, P.bakery)?.id).toBe(P.bakery);
  });
});

describe("shortestPath", () => {
  const world = build(townData());

  it("finds the shortest walking route", () => {
    const path = shortestPath(world, P.home, P.cafe, ["walk"]);
    expect(path?.places).toEqual([P.home, P.stopA, P.stopB, P.square, P.cafe]);
    expect(path?.lengthM).toBe(2520);
  });

  it("uses only edges that allow the requested mode", () => {
    const path = shortestPath(world, P.home, P.cafe, ["car"]);
    expect(path?.places).toEqual([P.home, P.stopA, P.stopB, P.cafe]);
    expect(path?.lengthM).toBe(2550);
    expect(shortestPath(world, P.bakery, P.square, ["car"])).toBeNull();
  });

  it("starts inside a room and walks out through the entrance", () => {
    const path = shortestPath(world, P.closet, P.bakery, ["walk"]);
    expect(path?.places).toEqual([P.closet, P.bedroom, P.hall, P.home, P.bakery]);
    expect(path?.steps.map((s) => [s.from, s.to])).toEqual([
      [P.closet, P.bedroom],
      [P.bedroom, P.hall],
      [P.hall, P.home],
      [P.home, P.bakery],
    ]);
  });

  it("returns a zero-length path to the same place and null for unknown places", () => {
    expect(shortestPath(world, P.cafe, P.cafe, ["walk"])).toEqual({ lengthM: 0, places: [P.cafe], steps: [] });
    expect(shortestPath(world, P.cafe, placeId("nowhere"), ["walk"])).toBeNull();
  });

  it("follows one-way edges only forwards (W1)", () => {
    const data = townData();
    const oneWay = build({
      ...data,
      edges: data.edges.map((e) => (e.id === "e_stop_b_cafe" ? { ...e, oneWay: true } : e)),
    });
    expect(shortestPath(oneWay, P.stopB, P.cafe, ["car"])?.lengthM).toBe(250);
    expect(shortestPath(oneWay, P.cafe, P.stopB, ["car"])).toBeNull();
  });

  it("breaks equal-length ties by the smaller id sequence, then edge id (W4)", () => {
    const diamond = (via1: string, via2: string): WorldData => ({
      places: [
        place("w", "world", null),
        place("d", "district", "w"),
        ...["a", via1, via2, "z"].map((id) => place(id, "urban", "d")),
      ],
      edges: [
        edge("e1", "a", via2, 10, ["walk"]),
        edge("e2", via2, "z", 10, ["walk"]),
        edge("e3", "a", via1, 10, ["walk"]),
        edge("e4", via1, "z", 10, ["walk"]),
      ],
    });
    const a = placeId("a");
    const z = placeId("z");
    expect(shortestPath(build(diamond("b", "c")), a, z, ["walk"])?.places).toEqual(["a", "b", "z"]);
    expect(shortestPath(build(diamond("c", "b")), a, z, ["walk"])?.places).toEqual(["a", "b", "z"]);

    const parallel = build({
      places: [place("w", "world", null), place("d", "district", "w"), place("a", "urban", "d"), place("z", "urban", "d")],
      edges: [edge("e_b", "a", "z", 10, ["walk"]), edge("e_a", "a", "z", 10, ["walk"])],
    });
    expect(shortestPath(parallel, a, z, ["walk"])?.steps[0]?.edgeId).toBe("e_a");
  });
});

describe("validation errors", () => {
  it.each<[string, WorldData]>([
    ["place.root", withPlaces(place("world2", "world", null))],
    ["place.duplicate-id", withPlaces(place("cafe", "urban", "d_centre"))],
    ["place.missing-parent", withPlaces(place("ghost", "urban", "d_nowhere"))],
    ["place.kind-order", withPlaces(place("loose_room", "interior", "d_centre"))],
    ["place.kind-order", withPlaces(place("shop_in_cafe", "urban", "cafe"))],
    ["place.kind-order", withPlaces(place("districtless", "urban", "world"))],
    ["place.kind-order", withPlaces(place("sub_district", "district", "d_centre"))],
    ["place.profile-not-district", withPlaces(place("odd", "urban", "d_centre", { profile: "centre" }))],
    ["edge.region-endpoint", withEdges(edge("e_bad", "d_centre", "cafe", 10, ["walk"]))],
    ["edge.interior-mode", withEdges(edge("e_bad", "home", "home_kitchen", 10, ["car"]))],
    ["edge.crosses-building", withEdges(edge("e_bad", "home_kitchen", "bakery", 10, ["walk"]))],
    ["edge.length", withEdges(edge("e_bad", "cafe", "bakery", 0, ["walk"]))],
    ["edge.length", withEdges(edge("e_bad", "cafe", "bakery", 10.5, ["walk"]))],
    ["edge.self-loop", withEdges(edge("e_bad", "cafe", "cafe", 10, ["walk"]))],
    ["edge.missing-endpoint", withEdges(edge("e_bad", "cafe", "nowhere", 10, ["walk"]))],
    ["edge.no-modes", withEdges(edge("e_bad", "cafe", "bakery", 10, []))],
    ["edge.duplicate-id", withEdges(edge("e_home_bakery", "cafe", "bakery", 10, ["walk"]))],
  ])("reports %s", (code, data) => {
    expect(errorCodes(data)).toContain(code);
  });

  it("rejects containment cycles", () => {
    const data = townData();
    const cyclic: WorldData = {
      ...data,
      places: [...data.places, place("loop_a", "interior", "loop_b"), place("loop_b", "interior", "loop_a")],
    };
    expect(errorCodes(cyclic)).toContain("place.cycle");
  });

  it("rejects an unknown travel mode", () => {
    const bad = { ...edge("e_bad", "cafe", "bakery", 10, ["walk"]), allowedModes: ["teleport"] } as never;
    expect(errorCodes(withEdges(bad))).toContain("edge.unknown-mode");
  });

  it("rejects repeated proximity pairs in either order", () => {
    const data = townData();
    const repeated: WorldData = {
      ...data,
      proximity: [...(data.proximity ?? []), { id: "n_again", a: P.bakery, b: P.home }],
    };
    expect(errorCodes(repeated)).toContain("proximity.duplicate-pair");
  });

  it("requires every room to be reachable from the entrance and back (D15, W3)", () => {
    expect(errorCodes(withPlaces(place("home_attic", "interior", "home")))).toEqual(["interior.unreachable"]);

    const data = townData();
    const trapped: WorldData = {
      ...data,
      edges: data.edges.map((e) => (e.id === "e_bedroom_closet" ? { ...e, oneWay: true } : e)),
    };
    expect(errorCodes(trapped)).toEqual(["interior.no-exit"]);
  });
});

describe("validation warnings", () => {
  it("flags parallel edges that share a mode", () => {
    expect(warningCodes(withEdges(edge("e_copy", "bakery", "home", 210, ["walk"])))).toContain(
      "edge.possible-duplicate",
    );
    expect(warningCodes(withEdges(edge("e_bus_only", "home", "bakery", 210, ["bus"])))).not.toContain(
      "edge.possible-duplicate",
    );
  });

  it("flags a direct edge much longer than an alternative route (D6)", () => {
    expect(warningCodes(withEdges(edge("e_detour", "home", "cafe", 9000, ["walk"])))).toContain(
      "edge.longer-than-alternative",
    );
  });
});
