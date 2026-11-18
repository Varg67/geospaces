import type { PlaceId } from "../../kernel/index.ts";
import type { Place } from "./types.ts";

type PlaceLookup = ReadonlyMap<PlaceId, Place>;

/** Root-to-place chain including the place itself, or `null` on a missing parent or cycle. */
export function ancestry(places: PlaceLookup, id: PlaceId): readonly Place[] | null {
  const chain: Place[] = [];
  const seen = new Set<PlaceId>();
  let current = places.get(id);
  while (current) {
    if (seen.has(current.id)) return null;
    seen.add(current.id);
    chain.push(current);
    if (current.parentId === null) return chain.reverse();
    current = places.get(current.parentId);
  }
  return null;
}

/** Building that contains an interior place: its nearest `urban` ancestor (rule W2). */
export function buildingOf(places: PlaceLookup, id: PlaceId): Place | null {
  const chain = ancestry(places, id);
  if (!chain) return null;
  for (let i = chain.length - 1; i >= 0; i -= 1) {
    const place = chain[i];
    if (place?.kind === "urban") return place;
  }
  return null;
}
