# GeoSpace Frontend — Technical Guide

This document describes the **implemented** read-only **GeoSpace Weak** frontend in `frontend/`, based on the approved 26-part plan ([docs/plans/frontend-implementation.md](../plans/frontend-implementation.md)), the [Design Blueprint](../DESIGN.md), and the ongoing [spatial network correction](../plans/spatial-network-correction.md).

> **Scope boundary:** The frontend is strictly a **read-only observation client** driven by frozen fictional fixtures. It performs no simulation, movement commands, persistence writes, network API calls, or Kindroid integration.

## 1. Stack and Tooling

From `frontend/package.json`, `frontend/tsconfig.json`, and `frontend/.nvmrc`:
- **Runtime:** Node.js `>=24 <25` (`.nvmrc`).
- **UI & Icons:** React `19.3.1`, React DOM `19.3.1`, `lucide-react` `1.74.0`.
- **Language:** TypeScript `6.0.3` with strict compiler flags:
  - `strict: true`
  - `noUncheckedIndexedAccess: true`
  - `exactOptionalPropertyTypes: true`
  - `noUnusedLocals: true`, `noUnusedParameters: true`, `noFallthroughCasesInSwitch: true`
- **Build & Dev Server:** Vite `8.3.8` (`@vitejs/plugin-react` `6.3.0`), bound to `127.0.0.1` by default, with a custom build-time plugin (`build/iconCatalogPlugin.ts`).
- **Testing:** Vitest `5.1.0` (`jsdom` + `@testing-library/react`), Playwright `1.65.1` (Chromium + pinned Firefox revision `1575` on Debian 13 x64), and `@axe-core/playwright` `4.14.0`.
- **Linting:** ESLint `10.15.0` with `typescript-eslint` and `eslint-plugin-react-hooks`.

## 2. Directory & Responsibility Boundaries

`frontend/src/` is organized by responsibility so domain observation rules stay decoupled from React UI and fixture data:

| Path | Responsibility |
| --- | --- |
| `src/domain/` | Read-only TypeScript contracts, snapshot referential validation, hierarchy/visibility traversal, proximity/access selectors, and time/location formatting. Imports zero React or icon libraries. |
| `src/data/` | Fictional world fixtures (`exampleWorld.ts`, `exampleRelations.ts`, `exampleLayouts.ts`) and cancellable `fixtureReader.ts` supporting URL `?scenario=...` states. |
| `src/app/` | Application root (`App.tsx`), async snapshot lifecycle (`useWorldSnapshot.ts`), status screens (`ReadStateScreen.tsx`), and the `CompanionShell.tsx` layout. |
| `src/app/view/` | Client-only UI browsing state (`WorldViewProvider.tsx`, `ViewContext.ts`, `viewState.ts`). Strictly separated from the immutable `WorldSnapshot`. |
| `src/features/character/` | `CharacterPanel.tsx`: observed character selector, confirmed location/activity/timestamp, and nearby context anchored to the character's confirmed place. |
| `src/features/events/` | `RecentEvents.tsx`: chronological event consultation for the observed character. |
| `src/features/map/` | `WorldMapPanel.tsx`, `DistrictNetwork.tsx`, SVG/DOM map layers (`RegionLayer`, `RouteLayer`, `StationLayer`, `PresenceLayer`), `CameraControls`, geometry & camera math, and pointer/viewport hooks. |
| `src/features/navigation/` | `Breadcrumb.tsx` and `focusNavigation.ts` for accessible ancestor traversal and heading focus management. |
| `src/features/places/` | `PlaceDetails.tsx`, `NearbyPlaces.tsx`, and `PlaceDirectory.tsx` (the accessible text equivalent to the schematic map). |
| `src/icons/` | `resolvePlaceIcon.ts` and `PlaceIcon.tsx` consuming the virtual build-time catalog module. |
| `src/design-system/` | Reusable semantic primitives (`Button.tsx`, `Disclosure.tsx`, `Feedback.tsx`). |
| `src/styles/` | `foundations.css`, importing canonical color and surface tokens from `../docs/design-tokens.css`. |
| `build/` | `iconCatalogPlugin.ts` Vite plugin projecting `../icons/catalog.json` and copying license notices. |

## 3. Domain Data Contracts (`src/domain/world.ts`)

The upstream boundary is `WorldReader`:

```ts
export interface WorldReader {
  loadSnapshot(signal?: AbortSignal): Promise<WorldSnapshot>;
}
```

`<App reader={reader} />` accepts any `WorldReader` implementation. Key immutable types in `WorldSnapshot`:

- **`Place`:** `{ id, name, parentId, kind: "world" | "district" | "urban" | "interior", interior: "available" | "undefined" | "restricted", catalogType? }`.
  - Hierarchy (`parentId`) expresses containment (`world -> district -> urban -> interior`), which is strictly separate from connectivity and proximity.
- **`Connection`:** `{ id, from, to, durationMinutes: number | null }`.
  - Represents traversable direct access between two places. `durationMinutes` can be `null` (duration unknown).
- **`ProximityKnowledge` (`snapshot.proximity?: ProximityKnowledge | null`):**
  - `{ knownPlaceIds: readonly PlaceId[], relations: readonly ProximityRelation[] }`, where `ProximityRelation` is `{ id, a, b }`.
  - Distinguishes **unknown proximity** (when `proximity` is missing/`null` or a place ID is absent from `knownPlaceIds`) from **known empty neighborhood** (present in `knownPlaceIds` with zero incident relations).
  - Undirected nearness carries no travel duration and never grants access.
- **`CharacterState`:** `{ id, name, location, activity }`, where `location` is either `{ kind: "place", placeId: string | null }` or `{ kind: "journey", connectionId, departedAt, earliestArrivalAt }`.
- **`WorldEvent`:** `{ id, characterId, at, summary, placeId }`.
- **`LevelLayout`:** `{ levelId, bounds, stations, regions, routes, nearbyRoutes? }`.
  - Holds schematic presentation geometry separately from semantic topology. `routes` map to `Connection.id`; `nearbyRoutes` map to `ProximityRelation.id`.

### Referential Validation (`src/domain/validateSnapshot.ts`)
Before serving a snapshot, `validateSnapshot(snapshot)` enforces:
- Unique IDs across places, characters, and connections.
- Valid `asOf` and `WorldEvent.at` timestamps.
- Acyclic `parentId` hierarchy with existing parents.
- Non-negative finite connection durations (or `null`).
- Valid proximity invariants: no duplicate `knownPlaceIds`, no self-loops (`a === b`), no duplicate undirected pairs, and both endpoints present in `knownPlaceIds`.
- Valid references for character locations/journeys, events, and `LevelLayout` stations, regions, routes, `nearbyRoutes`, and finite coordinates.

## 4. Hierarchy, Visibility, and Browsing State

### Visibility & Navigation (`src/domain/navigation.ts`)
- `ancestors(snapshot, id)` resolves the root-to-place chain.
- `canObserve(snapshot, id)` verifies that the place has a valid root path and **every ancestor** has `interior === "available"`. A place itself can be observed even if its own `interior` is `"restricted"` or `"undefined"`, hiding only its descendants.
- `canExplore(snapshot, id)` requires `canObserve(snapshot, id)` and `place.interior === "available"`.
- `visiblePlaces(snapshot, levelId)`: at a `"world"` level, returns observable `"urban"` places; inside any other explorable level, returns direct observable children (`"urban"` or `"interior"`).
- `canNavigate` and `returnSelection` govern entering child interiors and returning up the breadcrumb while re-selecting the ancestor branch just exited.

> **Security boundary note:** Frontend `canObserve`/`canExplore` checks are a presentation safeguard only. Any future backend must filter private/restricted entities before delivering a `WorldSnapshot`.

### Async Loading & View State (`src/app/useWorldSnapshot.ts`, `src/app/view/`)
- `useWorldSnapshot(reader, attempt)` uses `AbortController` so cancelled or superseded requests never overwrite newer state, returning `"loading"` immediately on reader/attempt changes without flashing stale snapshots.
- `WorldViewProvider` manages `ViewState` (`characterId`, `selectedPlaceId`, `levelId`, `camera`, `visits`) via `viewReducer` and `reconcileViewState`:
  - Selecting a place (`select-place`) or changing levels (`navigate`) **never alters** `WorldSnapshot`, character location, timestamps, or events.
  - Each visited `levelId` caches `{ selectedPlaceId, camera }` in `visits`, restoring prior selection and zoom/pan when returning or re-entering.
  - When a new snapshot arrives, `reconcileViewState` prunes inaccessible cached visits and selections via `canExplore` / `visiblePlaces`.

## 5. Spatial Rendering & District Network (`src/features/map/`)

`WorldMapPanel` manages two orthogonal presentation switches:
1. **Presentation mode (`Map` vs `Place list`):** Defaults to `Map` on desktop, automatically defaults to `Place list` when the viewport container is `< 480px` wide (unless the user makes an explicit choice), and keeps selection synchronized with `PlaceDirectory`.
2. **Relationship layer (`Nearby` vs `Access`):**
   - Defaults to **`Nearby`**, rendering `layout.nearbyRoutes` (declared nearness; never draws transit progress along nearness strokes). If the observed character is in transit, displays a note with a `"Show recorded journey"` button that switches only the active layer to `Access`.
   - **`Access`** renders `layout.routes` (traversable passages) and journey transit progress.
   - Changing layers preserves selection, camera, character state, events, and time.

### Geometry, Camera, and Layers
- **`geometry.ts`:**
  - `fitTransform(bounds, viewport)` computes uniform aspect-preserving scale and centering.
  - `roundedPath(points, radius = 10)` renders SVG quadratic Bézier corners (`Q`); `roundedPolyline` samples those same rounded corners (24 segments per corner) so `pointAlong` places a character in transit accurately along the curved SVG route.
  - `isOctilinear` checks metro-style 0°/45°/90° segment geometry (used in geometry tests).
- **`camera.ts` & `usePointerPan.ts`:**
  - Zoom is clamped to `[0.5, 3]` (50%–300%).
  - Panning (`x`, `y`) is bounded to `±(viewport * zoom) / 2`.
  - `CameraControls` exposes buttons (`Zoom in`, `Zoom out`, `Fit map`, directional pan) and arrow-key panning; `usePointerPan` pans when dragging > 6 px without hijacking station button clicks.
- **SVG + DOM hybrid stack in `DistrictNetwork.tsx`:**
  - `<svg className="district-network__geometry" aria-hidden="true">` renders `RegionLayer` (territorial polygons filtered to current level or available child districts) and `RouteLayer` (filtering routes by visible station endpoints and highlighting `data-incident="true"` paths for the selected station).
  - `StationLayer` renders native HTML `<button>` elements positioned via projected coordinates, marking 3+ incident links in the active layer with `.map-station--junction` (larger ring), and clamping label `maxWidth` dynamically based on horizontal neighbors while expanding full names on hover/focus.
  - `PresenceLayer` plots the observed character at their confirmed station or at an estimated snapshot position (`Math.max(0, Math.min(0.98, (asOf - from) / (to - from)))`) along an active `Access` journey.

## 6. Build-Time Icon Pipeline (`build/iconCatalogPlugin.ts`, `src/icons/`)

- Source catalog: `icons/catalog.json` (341 `urban_places` + 248 `interior_rooms` = 589 types) plus 48 custom SVGs in `icons/custom/`.
- On dev/build, `iconCatalogPlugin` reads `../icons/catalog.json`, projects **only** binding metadata (stripping narrative taxonomy descriptions out of the client bundle), generates explicit per-icon `lucide-react/icons/<name>` imports in virtual module `virtual:geospace-icon-catalog`, and emits `NOTICE.md` + `licenses/*.txt` into `dist/`.
- `resolvePlaceIcon(catalogType)` checks `Object.hasOwn` (protecting against prototype keys), prefers custom SVG assets (loaded via Vite `import.meta.glob` as URLs and rendered via CSS `mask-image` + `currentColor` without inline SVG injection), falls back to Lucide, and finally returns a generic `MapPin` fallback with an explicit reason (`unspecified-type` | `unknown-type` | `missing-binding`).

## 7. Styling, Accessibility, and Scenarios

- **Tokens:** `docs/design-tokens.css` defines the Warm Glass light palette (`--gs-bg-canvas`, `--gs-bg-surface`, `--gs-accent-primary`, `--gs-accent-spatial`, `--gs-text-primary`, etc.) and glass blur/border tokens.
- **Accessibility:** Skip link to `#workspace`, focus restoration to `#world-heading` on level navigation, native `<button>` stations with `aria-pressed`, `Place list` keyboard/screen-reader equivalent, `prefers-reduced-motion` handling, and `axe-core` Playwright checks.
- **Fixture Scenarios (`?scenario=<name>`):** Defined in `src/data/fixtureReader.ts`:
  - `ready` (default), `empty`, `unknown`, `transit`, `long-content`, `error` (fails first completed read, succeeds on retry), `loading` (never resolves), `nested` (adds `Reading corner` inside `Bedroom`), `empty-interior`, `restricted`, `undefined-interior`, `missing-layout`, `at-home`, `icon-examples`, `nearby-unknown`, `nearby-empty`.

## 8. Verification Status & Open Frontend Work

- **Blocks 1–5 (parts 1–26)** passed unit (`vitest`), `tsc -b`, `eslint`, production build, Chromium/Playwright, and pinned Firefox (`1575`) checks before the spatial network correction. See the [Block 5 review](../reviews/frontend/frontend-block-5-review.md).
- **Pending acceptance:** The [spatial network correction](../plans/spatial-network-correction.md) replaced the linear fixture with a branching access network and added explicit proximity. The [repository review](../reviews/repository-readiness.md) records the current suite results and open findings.
