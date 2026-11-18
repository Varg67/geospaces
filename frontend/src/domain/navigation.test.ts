import { describe, expect, it } from "vitest";
import { exampleWorld } from "../data/exampleWorld";
import { createFixtureReader } from "../data/fixtureReader";
import {
  ancestors,
  canExplore,
  canNavigate,
  canObserve,
  returnSelection,
  visiblePlaces,
} from "./navigation";
import {
  initialViewState,
  reconcileViewState,
  viewReducer,
} from "../app/view/viewState";
import {
  boundedCamera,
  cameraTransform,
  MIN_ZOOM,
  MAX_ZOOM,
} from "../features/map/camera";

describe("explicit hierarchical observation", () => {
  it("lists real level contents and permits only visible entries or real ancestors", () => {
    expect(visiblePlaces(exampleWorld, "world")).toHaveLength(15);
    expect(visiblePlaces(exampleWorld, "north")).toHaveLength(8);
    expect(visiblePlaces(exampleWorld, "south")).toHaveLength(7);
    expect(visiblePlaces(exampleWorld, "place-0")).toHaveLength(6);
    expect(ancestors(exampleWorld, "room-3").map((p) => p.id)).toEqual([
      "world",
      "north",
      "place-0",
      "room-3",
    ]);
    expect(canNavigate(exampleWorld, "world", "room-3")).toBe(false);
    expect(canNavigate(exampleWorld, "place-0", "south")).toBe(false);
    expect(canNavigate(exampleWorld, "place-0", "north")).toBe(true);
    expect(canExplore(exampleWorld, "place-4")).toBe(false);
    expect(canObserve(exampleWorld, "place-4")).toBe(true);
    expect(returnSelection(exampleWorld, "place-0", "world")).toBe("place-0");
  });
  it("restores separate level cameras and selection without changing recorded state", async () => {
    const snapshot = await createFixtureReader("ready", 0).loadSnapshot(),
      before = JSON.stringify(snapshot);
    let state = viewReducer(initialViewState(snapshot), {
      type: "select-place",
      placeId: "place-0",
    });
    state = viewReducer(state, {
      type: "camera",
      camera: { x: 40, y: -20, zoom: 1.5 },
    });
    state = viewReducer(state, {
      type: "navigate",
      snapshot,
      levelId: "place-0",
    });
    expect(state.camera).toEqual({ x: 0, y: 0, zoom: 1 });
    state = viewReducer(state, { type: "select-place", placeId: "room-3" });
    state = viewReducer(state, {
      type: "camera",
      camera: { x: -15, y: 10, zoom: 2 },
    });
    state = viewReducer(state, {
      type: "navigate",
      snapshot,
      levelId: "world",
      returnPlaceId: "place-0",
    });
    expect(state.selectedPlaceId).toBe("place-0");
    expect(state.camera).toEqual({ x: 40, y: -20, zoom: 1.5 });
    state = viewReducer(state, {
      type: "navigate",
      snapshot,
      levelId: "place-0",
    });
    expect(state.selectedPlaceId).toBe("room-3");
    expect(state.camera).toEqual({ x: -15, y: 10, zoom: 2 });
    expect(JSON.stringify(snapshot)).toBe(before);
  });
  it("removes inaccessible descendants and cached visits when an ancestor closes", () => {
    let state = viewReducer(initialViewState(exampleWorld), {
      type: "navigate",
      snapshot: exampleWorld,
      levelId: "place-0",
    });
    state = viewReducer(state, {
      type: "navigate",
      snapshot: exampleWorld,
      levelId: "north",
    });
    const restricted = {
      ...exampleWorld,
      places: exampleWorld.places.map((p) =>
        p.id === "north" ? { ...p, interior: "restricted" as const } : p,
      ),
    };
    expect(canExplore(restricted, "place-0")).toBe(false);
    expect(visiblePlaces(restricted, "world")).toHaveLength(7);
    expect(
      viewReducer(initialViewState(restricted), {
        type: "navigate",
        snapshot: restricted,
        levelId: "place-0",
      }),
    ).toEqual(initialViewState(restricted));
    const result = reconcileViewState(state, restricted);
    expect(result.levelId).toBe("world");
    expect(result.visits["place-0"]).toBeUndefined();
    expect(result.visits.north).toBeUndefined();
    expect(
      reconcileViewState({ ...result, selectedPlaceId: "missing" }, restricted)
        .selectedPlaceId,
    ).toBeNull();
  });
  it("supplies empty, inaccessible, missing-layout and nested examples without fabricated or forbidden contents", async () => {
    for (const scenario of [
      "restricted",
      "undefined-interior",
      "empty-interior",
    ] as const) {
      const snapshot = await createFixtureReader(scenario, 0).loadSnapshot();
      expect(snapshot.places.filter((p) => p.parentId === "place-0")).toEqual(
        [],
      );
      expect(
        snapshot.connections.some((e) => e.id.startsWith("passage-")),
      ).toBe(false);
      expect(canExplore(snapshot, "place-0")).toBe(
        scenario === "empty-interior",
      );
    }
    const nested = await createFixtureReader("nested", 0).loadSnapshot();
    expect(visiblePlaces(nested, "room-3").map((p) => p.id)).toEqual([
      "corner",
    ]);
    const missing = await createFixtureReader(
      "missing-layout",
      0,
    ).loadSnapshot();
    expect(missing.layouts.some((l) => l.levelId === "place-0")).toBe(false);
    expect(visiblePlaces(missing, "place-0")).toHaveLength(6);
  });
  it("bounds zoom/pan with one uniform transform and finite fallback values", () => {
    const viewport = { width: 600, height: 400 };
    expect(
      boundedCamera({ x: Infinity, y: NaN, zoom: Infinity }, viewport),
    ).toEqual({ x: 0, y: 0, zoom: 1 });
    expect(boundedCamera({ x: 9999, y: -9999, zoom: 999 }, viewport)).toEqual({
      x: 900,
      y: -600,
      zoom: MAX_ZOOM,
    });
    expect(boundedCamera({ x: 0, y: 0, zoom: 0 }, viewport).zoom).toBe(
      MIN_ZOOM,
    );
    expect(
      cameraTransform({ x: 0, y: 0, scale: 0.5 }, viewport, {
        x: 40,
        y: 20,
        zoom: 2,
      }),
    ).toEqual({ scale: 1, x: -260, y: -180 });
  });
});
