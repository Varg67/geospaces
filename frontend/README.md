# GeoSpace frontend

Blocks 1–5 (parts 1–26) implement the React/TypeScript/Vite foundation, read-only Companion observation interface, and District Network map with local fictional examples. Character context, map/list selection, territorial regions, connection details, recent events, static presence/transit, and loading/retry states are available. Explicit interior exploration, real ancestor breadcrumbs, per-level camera/selection memory and keyboard/pointer camera controls are available. Catalog icons are integrated with visible place names.

## Run

Use Node 24 LTS (`.nvmrc`), with npm. For a managed Node installation, `nvm install && nvm use` selects the project runtime without changing system Node. Then, from this directory:

```sh
npm ci
npm run dev
```

Open the printed localhost address. Vite binds only to `127.0.0.1` by default. The stylesheet imports the canonical tokens from `../docs/design-tokens.css`; keep this directory within the GeoSpace checkout.

## Verify

```sh
npm run typecheck
npm run lint
npm test
npm run build
npx playwright install chromium
npm run browsers:firefox
npm run test:e2e
```

Playwright runs the same regression suite in Chromium and Firefox. It runs the local dev server automatically. Reports and build products are ignored. Browser package installation may require network access.

## Responsibilities

- `src/app`: composition, loading lifecycle, and Companion shell.
- `src/domain`: read-only presentation contracts and referential validation.
- `src/data`: cancellable fictional reader and deterministic examples.
- `src/design-system`: semantic controls and feedback states.
- `src/features`: independent character, place, and event presentation modules.
- `src/app/view`: observation reducer/context, separate from the immutable snapshot.
- `src/styles`: presentation rules; canonical colors remain in the project design tokens.
- `src/icons`: deterministic catalog resolution and decorative place symbols.
- `build/iconCatalogPlugin.ts`: build-time canonical catalog projection and license emission.
- `e2e`: browser-level behavior and accessibility checks.

The reader contract is asynchronous and cancellable. Neither it nor the shell implements simulation, movement, storage, external calls, or Kindroid integration. Fixture snapshots are recursively frozen. The world/layout types separate connectivity from presentation coordinates. Scenario providers support the URL examples documented below; the default page opens the standard example.

## Observation scenarios (Block 2)

The default page uses `ready`. Append `?scenario=unknown`, `transit`, `long-content`,
`empty`, `loading`, or `error` to exercise a particular fictional read state.
Unrecognized scenario names use `ready`. `loading` stays pending until the view
is left; it does not start a simulation. The `error` reader fails its first
completed request and returns the same ready snapshot on retry; aborted requests
do not consume that failure. No scenario controls are added to the product UI.

Character observation, place selection, details, and recent-event consultation
are available in this checkpoint. The place directory and spatial renderer share selection. The brand is static identity;
keyboard users can use the explicit Skip to workspace link for navigation.

## District Network (Block 3)

The map is the default desktop presentation. Narrow containers initially use Place list; an explicit presentation choice persists across resizing and level navigation. `Place list` offers the same
selection as an accessible text directory. Selecting either presentation keeps
character observation unchanged. Native station buttons support keyboard input;
labels keep a constant readable size while geometry uses uniform scaling.
Long names are available in place details and the list; map labels truncate and
expand on hover/focus. Authored routes and schematic district polygons live in
the fixture presentation layout, separately from connection data and durations.
Presence follows only the selected character's recorded location or journey.
Transit position is a static, time-based estimate from the snapshot timestamp,
not a simulation update or proof of arrival. The marker samples the same rounded
route geometry, within subpixel approximation tolerance.

## Interior exploration and camera (Block 4)

Selecting Home does not enter it. `Explore interior` opens its six authored rooms;
room selection changes only the inspection details. The breadcrumb uses actual
ancestors: Alder Grove / North district / Home, with useful district maps.
Returning restores the parent place selection and each level's previous camera.
Re-entering restores that level's selection and camera. Navigation never changes
the character, recorded location, timestamp or events. A confirmed Home location
stays Home while its room is not recorded; no arbitrary room marker is invented.

`Zoom in`, `Zoom out` (50–300%), `Fit map`, and directional pan buttons operate
on one shared map transform. Arrow keys within the camera controls pan the map;
Ctrl/Meta/Alt combinations and wheel events retain browser behavior. Dragging
map background beyond six pixels pans; station buttons continue to select.
Panning is bounded to half the viewport times zoom in either direction. Long
names remain available through keyboard focus, details and Place list, which
includes direct links to the selected details.

Additional URL scenarios: `nested` defines a fictional Reading corner within
Bedroom; `empty-interior` defines Home with no rooms; `restricted` and
`undefined-interior` omit Home's children and interior layout entirely;
`missing-layout` keeps defined rooms available in the list; `at-home` records
Ana at Home without assigning a room. Access checks hide descendants of closed
ancestors, and snapshot reconciliation removes inaccessible cached views.
These fixtures exercise presentation boundaries, not an authorization backend.

## Canonical icons and distribution (Block 5)

`Place.catalogType?: string` is an optional semantic taxonomy identifier such as
`house_detached` or `living_room`. The domain imports no icon libraries. Unknown
or absent identifiers render a generic place symbol; the adapter exposes a
fallback source/reason without adding technical copy to the product.

The icon plugin reads `../icons/catalog.json` on every dev/build load. It projects
only type bindings and the custom manifest into a virtual module, and emits
explicit per-icon Lucide imports. There is no checked-in generated catalog or
manual regeneration step. All 589 current identifiers resolve: 98 bindings use
the 48 original custom assets and 491 use Lucide. The installed Lucide version
supports all 271 distinct fallback names, so Phosphor is not installed. The
canonical Phosphor alternatives remain unchanged for future catalog updates.
Tests compare the adapter against the canonical file and fail on unresolved
bindings. Read [NOTICE.md](NOTICE.md) for artwork licenses and provenance.

The 48 SVGs are loaded as local URLs and rendered through `currentColor` masks;
no SVG markup is inserted into HTML. The original names and files remain in
`../icons/custom/`. Station icons are 16px, list/location icons 20px, detail icons
24px; visible labels retain meaning without interpreting the artwork. Metro
junction rings and selection outlines remain distinct from icons and presence.
`?scenario=icon-examples` supplies an Open-air market, Sewing atelier, and an
unknown-type Flower shop to inspect custom and generic symbols without changing
default fixtures.

Keep `frontend/`, `icons/` and `docs/design-tokens.css` together in the checkout.
The Vite server allows only the frontend, canonical stylesheet, and custom asset
directory. Production `dist/` includes all referenced SVGs in `assets/`, plus
`NOTICE.md` and `licenses/`. To inspect that artifact locally after building, run
`npm run preview`; this is not publication or native packaging.

## Future reader boundary

Pass another `WorldReader` to `<App reader={reader}/>` to replace fixture loading.
It must return immutable `WorldSnapshot` observations with valid references and
honor `AbortSignal`; obsolete requests are ignored by the loading lifecycle.
Components consume reader results through the view provider and do not import
fixture files. `LevelLayout` holds authored presentation geometry separately
from place hierarchy, connection durations, and recorded character state.
`ViewState` changes only browsing perspective, selection and camera. Restrict
contents before supplying snapshots; frontend visibility checks are a second
presentation boundary, not backend authorization.

Backend/motor implementation, editing, persistent simulation, authenticated
Kindroid integration, native packaging and phone-specific product design remain
outside this frontend. Reduced-motion rules remove decorative transitions;
keyboard controls and Place list remain alternatives to pointer dragging.
Automated axe, text enlargement/spacing and browser checks provide scoped
evidence; native browser 200% zoom and complete WCAG conformance require separate
validation. Checkpoint evidence lives in the project `docs/` reports.

## Firefox test runtime repair

Playwright 1.65.1 bundles Firefox revision 1572, which has a confirmed native ARIA
reflection crash when the page and Playwright's isolated world both inspect
`ariaLabelledByElements`. This also affects axe scans after accessible locators.
The app's ARIA and accessibility assertions are preserved. Upstream fixed the
browser in [revision 1575](https://github.com/microsoft/playwright/pull/43982);
see [the exact regression](https://github.com/microsoft/playwright/issues/44135).
The Playwright dependency remains pinned to stable 1.65.1.

On **Debian 13 x64**, `npm run browsers:firefox` downloads the official fixed
Firefox 159.0 build into ignored `.cache/`. It requires `unzip` and checks the
archive against `firefox-browser.json` before extraction. The SHA256 was recorded
from the initial official HTTPS download, rather than a publisher signature.
The manifest records the upstream fix commit and download route. Repeating the
command verifies the cached archive and reuses a matching installation. Browser
cache files are not source artifacts and are not committed.

The Firefox project explicitly selects this fixed executable. Other platforms
must supply an appropriate verified fixed Playwright build, for example:

```sh
GEOSPACE_FIREFOX_EXECUTABLE=/absolute/path/to/firefox npm run test:e2e -- --project=firefox
```

The automatic installer rejects unverified platforms; it changes no system
browser or system Node installation. `npm run test:e2e -- --project=chromium`
uses the regular pinned Playwright Chromium. This repair changes browser tooling
only, and does not suppress axe rules, omit tests, or replace semantic labels.

## Explicit spatial neighborhoods

Nearby and Access are separate read-only relationship layers. Nearby is the
initial map layer and displays declared nearness, not a route or an ordered
itinerary. Access displays only traversable connections and their recorded
travel durations. Selection highlights every incident link in the active layer;
other links remain readable. Rings indicate three or more links in that layer.
Changing layers preserves selection, camera, character state, events and time.

`WorldSnapshot.proximity` records undirected `relations` plus `knownPlaceIds`
coverage. Missing/null proximity, or a place outside coverage, means unknown.
A covered place with no incident recorded relations is known empty. Neither
coordinates, same-district membership, access, duration nor missing meter values
can create a proximity relation. Proximity carries no travel cost. `LevelLayout`
keeps its separate authored `nearbyRoutes`; district views filter both route
families by endpoint membership. Hidden ancestor contents are filtered from
relation lists and map links.

The fictional urban Access fixture is now a branched mesh with several cycles.
Café is near Home, Library, Bakery and Market, while Library has no direct Café
access. Café has direct Clinic access without a recorded nearby relation. Home's
Bedroom and Bathroom are near without a direct door. These examples establish
independent relation semantics; they do not provide geographic distances or a
routefinder. Character context is anchored to its confirmed place and does not
follow the user's place selection.

Recorded journeys always reference Access connections. Nearby presents transit
text plus `Show recorded journey`, which explicitly changes only the layer;
it never draws transit along a nearness link. `?scenario=nearby-unknown` and
`?scenario=nearby-empty` exercise absent versus recorded-empty proximity while
keeping Access available. The default Workshop has no recorded nearby coverage.
The synthetic examples do not select an engine or geospatial architecture.
