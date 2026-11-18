import { describe, expect, it } from "vitest";
import { createFixtureReader } from "./fixtureReader";
import { exampleWorld } from "./exampleWorld";
import { validateSnapshot } from "../domain/validateSnapshot";
describe("fixture reader", () => {
  it("supplies a deterministic immutable reference-consistent world", async () => {
    const reader = createFixtureReader("ready", 0);
    const snapshot = await reader.loadSnapshot();
    expect(snapshot).toEqual(await reader.loadSnapshot());
    expect(() => validateSnapshot(snapshot)).not.toThrow();
    expect(snapshot.places.filter((p) => p.kind === "urban")).toHaveLength(15);
    expect(snapshot.places.filter((p) => p.kind === "interior")).toHaveLength(
      6,
    );
    expect(Object.isFrozen(snapshot)).toBe(true);
    expect(Object.isFrozen(snapshot.places[0])).toBe(true);
    expect(() =>
      Reflect.set(snapshot.places[0]!, "name", "Changed"),
    ).not.toThrow();
    expect(snapshot.places[0]!.name).toBe("Alder Grove");
  });
  it("cancels before and during loading", async () => {
    const controller = new AbortController();
    const pending = createFixtureReader("loading").loadSnapshot(
      controller.signal,
    );
    controller.abort();
    await expect(pending).rejects.toMatchObject({ name: "AbortError" });
    await expect(
      createFixtureReader().loadSnapshot(controller.signal),
    ).rejects.toMatchObject({ name: "AbortError" });
  });
  it("exposes error and empty scenarios without inventing observations", async () => {
    await expect(
      createFixtureReader("error", 0).loadSnapshot(),
    ).rejects.toThrow("Example data");
    expect(
      (await createFixtureReader("empty", 0).loadSnapshot()).places,
    ).toHaveLength(0);
    const unknown = await createFixtureReader("unknown", 0).loadSnapshot();
    expect(
      unknown.characters.every(
        (c) => c.location.kind === "place" && c.location.placeId === null,
      ),
    ).toBe(true);
  });
  it("rejects dangling connections and cyclic parent relationships", () => {
    expect(() =>
      validateSnapshot({
        ...exampleWorld,
        connections: [
          { id: "bad", from: "missing", to: "place-0", durationMinutes: 1 },
        ],
      }),
    ).toThrow("Unknown place");
    expect(() =>
      validateSnapshot({
        ...exampleWorld,
        places: exampleWorld.places.map((p) =>
          p.id === "world" ? { ...p, parentId: "north" } : p,
        ),
      }),
    ).toThrow("Cyclic");
  });

  it.each(["width", "height"] as const)(
    "rejects nonfinite and nonpositive layout %s",
    (dimension) => {
      for (const invalid of [NaN, Infinity, -Infinity, 0, -1]) {
        const snapshot = {
          ...exampleWorld,
          layouts: exampleWorld.layouts.map((layout) => ({
            ...layout,
            bounds: { ...layout.bounds, [dimension]: invalid },
          })),
        };
        expect(() => validateSnapshot(snapshot)).toThrow(
          "Invalid layout bounds",
        );
      }
    },
  );
});
