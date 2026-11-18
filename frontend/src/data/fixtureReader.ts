import type { WorldReader, WorldSnapshot } from "../domain/world";
import { validateSnapshot } from "../domain/validateSnapshot";
import { exampleWorld } from "./exampleWorld";
export type FixtureScenario =
  | "ready"
  | "empty"
  | "unknown"
  | "transit"
  | "long-content"
  | "error"
  | "loading"
  | "nested"
  | "empty-interior"
  | "restricted"
  | "undefined-interior"
  | "missing-layout"
  | "at-home"
  | "icon-examples"
  | "nearby-unknown"
  | "nearby-empty";
function freezeDeep<T>(value: T): T {
  if (value && typeof value === "object") {
    Object.values(value).forEach(freezeDeep);
    Object.freeze(value);
  }
  return value;
}
function scenarioSnapshot(scenario: FixtureScenario): WorldSnapshot {
  const world = structuredClone(exampleWorld);
  if (scenario === "nearby-unknown" || scenario === "nearby-empty")
    return {
      ...world,
      proximity:
        scenario === "nearby-unknown"
          ? null
          : {
              knownPlaceIds: world.places.map((place) => place.id),
              relations: [],
            },
      layouts: world.layouts.map((layout) => ({ ...layout, nearbyRoutes: [] })),
    };
  if (scenario === "icon-examples")
    return {
      ...world,
      places: world.places.map((place) =>
        place.id === "place-5"
          ? {
              ...place,
              name: "Open-air market",
              catalogType: "open_air_market_central_stall",
            }
          : place.id === "place-11"
            ? {
                ...place,
                name: "Sewing atelier",
                catalogType: "tailor_seamstress_atelier",
              }
            : place.id === "place-14"
              ? { ...place, catalogType: "example-unrecognized-type" }
              : place,
      ),
    };
  if (scenario === "nested")
    return {
      ...world,
      places: [
        ...world.places.map((place) =>
          place.id === "room-3"
            ? { ...place, interior: "available" as const }
            : place,
        ),
        {
          id: "corner",
          name: "Reading corner",
          parentId: "room-3",
          kind: "interior",
          interior: "undefined",
        },
      ],
      layouts: [
        ...world.layouts,
        {
          levelId: "room-3",
          bounds: { width: 600, height: 400 },
          stations: [{ placeId: "corner", position: { x: 300, y: 220 } }],
          regions: [
            {
              placeId: "room-3",
              polygon: [
                { x: 40, y: 40 },
                { x: 560, y: 40 },
                { x: 560, y: 360 },
                { x: 40, y: 360 },
              ],
            },
          ],
          routes: [],
        },
      ],
    };
  if (scenario === "missing-layout")
    return {
      ...world,
      layouts: world.layouts.filter((layout) => layout.levelId !== "place-0"),
    };
  if (scenario === "at-home")
    return {
      ...world,
      characters: world.characters.map((character) =>
        character.id === "ana"
          ? { ...character, location: { kind: "place", placeId: "place-0" } }
          : character,
      ),
    };
  if (
    scenario === "restricted" ||
    scenario === "undefined-interior" ||
    scenario === "empty-interior"
  ) {
    const interior =
      scenario === "restricted"
        ? "restricted"
        : scenario === "undefined-interior"
          ? "undefined"
          : "available";
    return {
      ...world,
      places: world.places
        .filter((place) => place.parentId !== "place-0")
        .map((place) =>
          place.id === "place-0" ? { ...place, interior } : place,
        ),
      proximity: world.proximity
        ? {
            knownPlaceIds: world.proximity.knownPlaceIds.filter(
              (id) => !id.startsWith("room-"),
            ),
            relations: world.proximity.relations.filter(
              (relation) =>
                !relation.a.startsWith("room-") &&
                !relation.b.startsWith("room-"),
            ),
          }
        : null,
      connections: world.connections.filter(
        (connection) => !connection.id.startsWith("passage-"),
      ),
      layouts: world.layouts
        .filter((layout) => layout.levelId !== "place-0")
        .concat(
          scenario === "empty-interior"
            ? [
                {
                  levelId: "place-0",
                  bounds: { width: 1000, height: 600 },
                  stations: [],
                  regions: [],
                  routes: [],
                },
              ]
            : [],
        ),
    };
  }
  if (scenario === "empty")
    return {
      ...world,
      places: [],
      proximity: { knownPlaceIds: [], relations: [] },
      connections: [],
      characters: [],
      events: [],
      layouts: [],
    };
  if (scenario === "unknown")
    return {
      ...world,
      asOf: null,
      characters: world.characters.map((character) => ({
        ...character,
        location: { kind: "place", placeId: null },
        activity: null,
      })),
    };
  if (scenario === "transit")
    return {
      ...world,
      characters: world.characters.map((character) =>
        character.id === "ana"
          ? {
              ...character,
              location: {
                kind: "journey",
                connectionId: "walk-0",
                departedAt: "2026-11-16T08:25:00-03:00",
                earliestArrivalAt: "2026-11-16T08:35:00-03:00",
              },
            }
          : character,
      ),
    };
  if (scenario === "long-content")
    return {
      ...world,
      name: "Alder Grove — the northern riverside residential and cultural district",
      places: world.places.map((place) => ({
        ...place,
        name: `${place.name} — extended example name for layout evaluation`,
      })),
    };
  return world;
}
export function createFixtureReader(
  scenario: FixtureScenario = "ready",
  delayMs = 80,
): WorldReader {
  const snapshot = freezeDeep(scenarioSnapshot(scenario));
  validateSnapshot(snapshot);
  let failedOnce = false;
  return {
    loadSnapshot(signal) {
      return new Promise((resolve, reject) => {
        if (signal?.aborted) {
          reject(new DOMException("Loading cancelled", "AbortError"));
          return;
        }
        const finish = () => {
          signal?.removeEventListener("abort", abort);
          if (scenario === "error" && !failedOnce) {
            failedOnce = true;
            reject(new Error("Example data could not be loaded"));
          } else resolve(snapshot);
        };
        const timer =
          scenario === "loading" ? undefined : setTimeout(finish, delayMs);
        const abort = () => {
          clearTimeout(timer);
          signal?.removeEventListener("abort", abort);
          reject(new DOMException("Loading cancelled", "AbortError"));
        };
        signal?.addEventListener("abort", abort, { once: true });
      });
    },
  };
}

const scenarios: readonly FixtureScenario[] = [
  "ready",
  "empty",
  "unknown",
  "transit",
  "long-content",
  "error",
  "loading",
  "nested",
  "empty-interior",
  "restricted",
  "undefined-interior",
  "missing-layout",
  "at-home",
  "icon-examples",
  "nearby-unknown",
  "nearby-empty",
];
export function fixtureScenarioFromSearch(search: string): FixtureScenario {
  const value = new URLSearchParams(search).get("scenario");
  return scenarios.includes(value as FixtureScenario)
    ? (value as FixtureScenario)
    : "ready";
}
