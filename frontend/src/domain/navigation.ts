import type { Place, WorldSnapshot } from "./world";
export function ancestors(
  snapshot: WorldSnapshot,
  id: string | null,
): readonly Place[] {
  const result: Place[] = [],
    seen = new Set<string>();
  let place = snapshot.places.find((p) => p.id === id);
  while (place && !seen.has(place.id)) {
    result.unshift(place);
    seen.add(place.id);
    place = snapshot.places.find((p) => p.id === place!.parentId);
  }
  return result;
}
// A place can be known while its own interior remains private. Its ancestors
// must still allow their contents to be observed.
export function canObserve(
  snapshot: WorldSnapshot,
  id: string | null,
): boolean {
  const path = ancestors(snapshot, id);
  return (
    path.length > 0 &&
    path[0]!.parentId === null &&
    path.slice(0, -1).every((place) => place.interior === "available")
  );
}
export function canExplore(
  snapshot: WorldSnapshot,
  id: string | null,
): boolean {
  return (
    canObserve(snapshot, id) &&
    snapshot.places.some((p) => p.id === id && p.interior === "available")
  );
}
export function visiblePlaces(
  snapshot: WorldSnapshot,
  levelId: string | null,
): readonly Place[] {
  const level = snapshot.places.find((p) => p.id === levelId);
  if (!level || !canExplore(snapshot, levelId)) return [];
  return snapshot.places.filter(
    (p) =>
      canObserve(snapshot, p.id) &&
      (level.kind === "world"
        ? p.kind === "urban"
        : p.parentId === level.id &&
          (p.kind === "urban" || p.kind === "interior")),
  );
}
export function canNavigate(
  snapshot: WorldSnapshot,
  current: string | null,
  target: string,
): boolean {
  return (
    canExplore(snapshot, target) &&
    (ancestors(snapshot, current).some((p) => p.id === target) ||
      visiblePlaces(snapshot, current).some((p) => p.id === target))
  );
}
export function returnSelection(
  snapshot: WorldSnapshot,
  currentLevel: string | null,
  targetLevel: string,
) {
  const visible = new Set(
    visiblePlaces(snapshot, targetLevel).map((p) => p.id),
  );
  return (
    [...ancestors(snapshot, currentLevel)]
      .reverse()
      .find((p) => visible.has(p.id))?.id ?? null
  );
}
