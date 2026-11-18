import type { WorldSnapshot } from "../../domain/world";
import {
  canExplore,
  canNavigate,
  visiblePlaces,
} from "../../domain/navigation";
export type Camera = Readonly<{ x: number; y: number; zoom: number }>;
type LevelVisit = Readonly<{ selectedPlaceId: string | null; camera: Camera }>;
export type ViewState = Readonly<{
  characterId: string | null;
  selectedPlaceId: string | null;
  levelId: string | null;
  camera: Camera;
  visits: Readonly<Record<string, LevelVisit>>;
}>;
export type ViewAction =
  | { type: "observe"; characterId: string }
  | { type: "select-place"; placeId: string }
  | { type: "reconcile"; snapshot: WorldSnapshot }
  | {
      type: "navigate";
      snapshot: WorldSnapshot;
      levelId: string;
      returnPlaceId?: string | null;
    }
  | { type: "camera"; camera: Camera };
export const fitCamera: Camera = { x: 0, y: 0, zoom: 1 };
export function initialViewState(snapshot: WorldSnapshot): ViewState {
  return {
    characterId: snapshot.characters[0]?.id ?? null,
    selectedPlaceId: null,
    levelId: snapshot.places.find((p) => p.kind === "world")?.id ?? null,
    camera: fitCamera,
    visits: {},
  };
}
export function reconcileViewState(
  state: ViewState,
  snapshot: WorldSnapshot,
): ViewState {
  const characterId = snapshot.characters.some(
    (c) => c.id === state.characterId,
  )
    ? state.characterId
    : (snapshot.characters[0]?.id ?? null);
  const levelId = canExplore(snapshot, state.levelId)
    ? state.levelId
    : (snapshot.places.find((p) => p.kind === "world")?.id ?? null);
  const visits: Record<string, LevelVisit> = {};
  let changed = levelId !== state.levelId;
  for (const [id, visit] of Object.entries(state.visits)) {
    if (!canExplore(snapshot, id)) {
      changed = true;
      continue;
    }
    const selectedPlaceId = visiblePlaces(snapshot, id).some(
      (p) => p.id === visit.selectedPlaceId,
    )
      ? visit.selectedPlaceId
      : null;
    visits[id] =
      selectedPlaceId === visit.selectedPlaceId
        ? visit
        : { ...visit, selectedPlaceId };
    if (visits[id] !== visit) changed = true;
  }
  const candidate =
    levelId === state.levelId
      ? state.selectedPlaceId
      : (visits[levelId ?? ""]?.selectedPlaceId ?? null);
  const selectedPlaceId = visiblePlaces(snapshot, levelId).some(
    (p) => p.id === candidate,
  )
    ? candidate
    : null;
  if (
    !changed &&
    characterId === state.characterId &&
    selectedPlaceId === state.selectedPlaceId
  )
    return state;
  return {
    ...state,
    characterId,
    levelId,
    selectedPlaceId,
    visits,
    camera:
      levelId === state.levelId
        ? state.camera
        : (visits[levelId ?? ""]?.camera ?? fitCamera),
  };
}
export function viewReducer(state: ViewState, action: ViewAction): ViewState {
  switch (action.type) {
    case "observe":
      return { ...state, characterId: action.characterId };
    case "select-place":
      return { ...state, selectedPlaceId: action.placeId };
    case "reconcile":
      return reconcileViewState(state, action.snapshot);
    case "camera":
      return { ...state, camera: action.camera };
    case "navigate": {
      if (
        !canNavigate(action.snapshot, state.levelId, action.levelId) ||
        action.levelId === state.levelId
      )
        return state;
      const visit = state.visits[action.levelId];
      const visible = visiblePlaces(action.snapshot, action.levelId);
      const selectedPlaceId =
        action.returnPlaceId !== undefined
          ? action.returnPlaceId
          : (visit?.selectedPlaceId ?? null);
      return {
        ...state,
        levelId: action.levelId,
        selectedPlaceId: visible.some((p) => p.id === selectedPlaceId)
          ? selectedPlaceId
          : null,
        camera: visit?.camera ?? fitCamera,
        visits: {
          ...state.visits,
          ...(state.levelId
            ? {
                [state.levelId]: {
                  selectedPlaceId: state.selectedPlaceId,
                  camera: state.camera,
                },
              }
            : {}),
        },
      };
    }
  }
}
