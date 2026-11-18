import { edgeId, placeId, type TravelMode } from "../../kernel/index.ts";
import type { AccessEdge, Place, ProximityRelation, WorldData } from "./types.ts";

/** Small fictional town used by the world tests. */
export const P = {
  world: placeId("world"),
  north: placeId("d_north"),
  centre: placeId("d_centre"),
  home: placeId("home"),
  hall: placeId("home_hall"),
  bedroom: placeId("home_bedroom"),
  closet: placeId("home_closet"),
  kitchen: placeId("home_kitchen"),
  bakery: placeId("bakery"),
  stopA: placeId("stop_a"),
  stopB: placeId("stop_b"),
  square: placeId("square"),
  cafe: placeId("cafe"),
} as const;

export const place = (id: string, kind: Place["kind"], parentId: string | null, extra: Partial<Place> = {}): Place => ({
  id: placeId(id),
  name: id,
  kind,
  parentId: parentId === null ? null : placeId(parentId),
  ...extra,
});

export const edge = (
  id: string,
  from: string,
  to: string,
  lengthM: number,
  allowedModes: readonly TravelMode[],
  extra: Partial<AccessEdge> = {},
): AccessEdge => ({ id: edgeId(id), from: placeId(from), to: placeId(to), lengthM, allowedModes, ...extra });

const near = (id: string, a: string, b: string): ProximityRelation => ({ id, a: placeId(a), b: placeId(b) });

export function townData(): WorldData {
  return {
    places: [
      place("world", "world", null),
      place("d_north", "district", "world", { profile: "periphery" }),
      place("d_centre", "district", "world", { profile: "centre" }),
      place("home", "urban", "d_north", { category: "house" }),
      place("home_hall", "interior", "home"),
      place("home_bedroom", "interior", "home", { category: "bedroom" }),
      place("home_closet", "interior", "home_bedroom"),
      place("home_kitchen", "interior", "home", { category: "kitchen" }),
      place("bakery", "urban", "d_north", { category: "bakery" }),
      place("stop_a", "urban", "d_north", { category: "bus_stop" }),
      place("stop_b", "urban", "d_centre", { category: "bus_stop" }),
      place("square", "urban", "d_centre"),
      place("cafe", "urban", "d_centre", { category: "cafe" }),
    ],
    edges: [
      edge("e_home_bakery", "home", "bakery", 200, ["walk", "run", "car"]),
      edge("e_bakery_stop_a", "bakery", "stop_a", 150, ["walk", "run"]),
      edge("e_home_stop_a", "home", "stop_a", 300, ["walk", "run", "car"]),
      edge("e_stop_a_stop_b", "stop_a", "stop_b", 2000, ["walk", "run", "car", "bus"]),
      edge("e_stop_b_square", "stop_b", "square", 100, ["walk", "run"]),
      edge("e_square_cafe", "square", "cafe", 120, ["walk", "run"]),
      edge("e_stop_b_cafe", "stop_b", "cafe", 250, ["car"]),
      edge("e_home_hall", "home", "home_hall", 5, ["walk", "run"]),
      edge("e_hall_bedroom", "home_hall", "home_bedroom", 6, ["walk"]),
      edge("e_hall_kitchen", "home_hall", "home_kitchen", 4, ["walk"]),
      edge("e_bedroom_closet", "home_bedroom", "home_closet", 2, ["walk"]),
    ],
    proximity: [near("n_home_bakery", "home", "bakery"), near("n_square_cafe", "square", "cafe")],
  };
}
