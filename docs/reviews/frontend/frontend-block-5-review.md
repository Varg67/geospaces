# Frontend Block 5 review

Date: 2026-11-17 (America/Sao_Paulo).
Scope: parts 22–26 of the [approved plan](../../plans/frontend-implementation.md).
State: implementation and verification complete; final user review pending.

Post-checkpoint review: the user identified that the urban fixture is a
sequential circuit rather than the intended spatial neighborhood, and confirmed
that proximity and access are separate relationships. The technical results
below apply to the original fixture. They do not constitute acceptance of that
model. See the [spatial network correction](../../plans/spatial-network-correction.md)
for the current work and its new acceptance criteria.

## Delivery contract

Integrate the existing canonical icon catalog without altering its source files.
Use deterministic custom/Lucide/Phosphor resolution with an identified fallback,
visible place names, and responsibility-separated presentation modules. Preserve
Warm Glass, Companion, District Network, and observation-only behavior.

Complete the targeted typography, contrast, focus, semantics and reduced-motion
review, Chromium/Firefox regression, production build, and execution/contract
handoff. Existing backend, simulation, integration, and desktop packaging
boundaries remain unchanged. New content remains English.

The coordinator recorded SHA-256 hashes for all 54 files under `icons/` before
implementation in `/tmp/geospace-block5-icons-before.json`. Compare them after
the final change. Temporary evidence paths may disappear after environment reset.

## Verification record

The final frozen implementation passed independent source, browser, and rendered
UX review. The independent source checks passed on the current code:

| Check | Result |
| --- | --- |
| `npm run typecheck` | Passed |
| `npm run lint` | Passed |
| `npm test` | 37 tests passed across 11 files |
| `npm run build` | Passed, 401 modules |

The build emits JavaScript 398.11 kB (gzip 123.82 kB), CSS 17.62 kB
(gzip 4.20 kB), 48 separate SVGs, `NOTICE.md`, and three upstream license files.
The coordinator compared the SVG byte hashes with the originals: all 48
production assets matched. The taxonomy narrative key is absent from the
compiled JavaScript; the reviewed plugin projects only binding/manifest data.

The final independent static review found no concrete blocker. It checked all
271 installed Lucide module paths, canonical 589-type projection, all 48 custom
asset paths, own-property lookup guards, presentation-only imports, and emitted
license notices byte-matching the installed packages. All 54 original catalog
and icon files still match the pre-implementation hashes. Static review did not
execute tests or establish visual quality.

## Implemented icon integration

`Place.catalogType` carries an optional semantic identifier without importing
icon libraries into domain contracts. The UI adapter uses a Vite build-time
projection of the canonical catalog, excluding narrative taxonomy descriptions
from the browser bundle. It emits explicit per-icon imports, prioritizes custom
assets, and identifies generic fallbacks for absent, unknown, or missing bindings.
Inherited object-property names are treated as unknown identifiers.

All 589 current types resolve in the focused tests: 98 bindings use the 48
custom SVGs and 491 use Lucide. Every Lucide fallback name exists in pinned
`lucide-react` 1.74.0, so a Phosphor runtime dependency is unnecessary. The
canonical Phosphor alternatives remain preserved. The UI uses 16px station,
20px list/location, and 24px detail symbols with visible names, metro junction
rings, selection outlines and recorded presence.

Custom SVGs are local URL assets rendered as `currentColor` masks, without
inserting SVG markup into the DOM. The `icon-examples` URL fixture demonstrates
an Open-air market, Sewing atelier and unknown-type Flower shop; default world
semantics and recorded travel durations remain unchanged.

The [frontend notice](../../../frontend/NOTICE.md) and upstream license files record
Lucide ISC/Feather MIT and React/React DOM MIT notices. Production builds emit
those notices beside the application assets. Project-supplied custom SVGs are
loaded unchanged; no new license is assigned to them by this integration.

The review uses the [W3C WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/)
for relevant contrast, keyboard, focus, reflow, text resize, target-size and
drag-alternative criteria. Automated accessibility checks and agent inspection
do not establish complete WCAG conformance or human usability.

The coordinator recalculated canonical opaque sRGB pairs from
`docs/design-tokens.css`: primary text/canvas 12.47259, primary text/surface
13.93654, secondary text/canvas 4.56024, secondary text/surface 5.09549,
white action label/primary 5.04094, spatial accent/canvas 5.46618,
spatial accent/surface 6.10776, and coral/canvas 4.44053. Text pairs meet 4.5:1;
the coral/canvas pairing is used as a non-text cue requiring 3:1, not small text.
These calculations do not validate translucent composites or every rendered
component.

## Rendered UX review

Independent heuristic review found no actionable visual defect. Chromium
captures at 1440, 1280, 1024 and 640 logical pixels retained readable names,
distinguishable junctions, coral selection and black keyboard focus. The Café
cup, Ana presence pill, and location name remained understandable together.
The custom market and sewing symbols were compact at 16px and distinguishable
at 24px in the details. The 640px long-content example used Place list and its
details link successfully.

The keyboard path Café → Home → Explore interior → Bedroom → North district →
recent events passed while Ana remained at Café. Firefox also rendered the
custom masks at 16/20/24px in the production preview at
`http://127.0.0.1:4173/`, without reported page errors or relevant console
warnings/errors. The coordinator opened and inspected these current viewport
captures:

- `/tmp/geospace-block5-world.png`
- `/tmp/geospace-block5-interior.png`
- `/tmp/geospace-block5-custom.png`
- `/tmp/geospace-block5-reflow.png`
- `/tmp/geospace-block5-firefox-custom.png`
- `/tmp/geospace-block5-world-1024.png`

These temporary evidence files may disappear after reset. Browser plugin was
not available; the approved local Playwright fallback was used. This is agent
inspection, not human usability research or assistive-technology testing.

## Cross-browser diagnosis and text checks

The first complete owned-server regression run passed 58 of 60 cases:
Chromium 30/30 and Firefox 28/30. Two Firefox cases completed their functional
assertions but repeatedly crashed during axe evaluation. A targeted unchanged
rerun reproduced both failures; browser stderr identified content-process
SIGSEGV. No out-of-memory cause is inferred. Earlier connection failures from
an interrupted standalone Vite server are separate and are not counted as app
assertion failures.

Investigation identified the upstream Firefox build-1572 ARIA reflection defect
documented in [Playwright issue 44135](https://github.com/microsoft/playwright/issues/44135)
and its [browser revision update](https://github.com/microsoft/playwright/pull/43982).
The implementation agent reproduced the crash with a minimal page containing no
GeoSpace code: reading `ariaLabelledByElements` in the page followed by an
isolated-world label lookup. The reported fixed browser revision is 1575.
The same minimal reproduction passed with official Firefox 159.0 revision 1575
after failing with revision 1572. The fix changes only the test browser: a pinned
Debian 13 x64 manifest, checksum-verified installer into ignored local cache,
and an executable selector with an explicit override for other environments.
Playwright remains at stable 1.65.1; application ARIA and axe assertions remain
unchanged. The cold installer performed a real official HTTPS download, verified
the pinned SHA-256 and extracted successfully; a warm run verified the cached
archive and reused the installation. Static review of the installer found no
concrete blocker. Generated browser cache is ignored by Git and lint, and the
TypeScript checker includes installer/configuration helpers.

Both original unchanged Firefox cases passed with revision 1575, including their
full axe assertions. The final source gates above were then rerun successfully.
The complete final command
`CI=1 npm run test:e2e -- --workers=1 --timeout=90000` passed **60/60 cases**
in 5.8 minutes: Chromium 30/30 and Firefox revision 1575 30/30. Exit status was
zero. The same functional and full axe assertions were retained; no test,
semantic label or accessibility rule was removed to obtain this result.

The final independent production runner passed eight actual keyboard/selection flows:
Chromium and Firefox × world and Home × computed font doubling and text-spacing
overrides. Heading text was measured at 24px before and 48px afterward. There was
no horizontal page overflow, application page error or console error, and
character switching, events, selection and ancestor focus remained usable.
Both additional 1920×1080 checks passed. The final rerun explicitly used fixed
Firefox 159.0 revision 1575 and Chromium 159.0.8154.6. Spacing overrides used
line-height 1.5, letter-spacing 0.12em and word-spacing 0.16em. Temporary
screenshots are under `/tmp/geospace-final-text-review/`; representative enlarged
text and spacing captures were opened by QA and the coordinator.
Computed-font enlargement and logical viewport reflow are not native browser
200% zoom; native zoom and screen-reader behavior remain unverified.

## Handoff boundary

The replaceable `WorldReader` loads a cancelable, asynchronous snapshot.
`WorldSnapshot` describes places, hierarchy, connections, observations, events,
the represented timestamp, and authored presentation layouts. Components consume
that boundary through application state; they must not become fixture readers
or simulation controllers. `ViewState` owns observation choice, explored level,
selected place, and camera separately from the immutable snapshot.

A future real reader must supply truthful unknown/unavailable states, protect
restricted contents before they reach the frontend, and preserve cancellation
and validation behavior. That is an integration seam, not an implemented engine
or platform protocol. Storage, authority, revisions, world editing, advancement,
and Kindroid communication still require their own architecture decisions.

The execution and adapter instructions belong in the
[frontend README](../../../frontend/README.md), avoiding a second setup manual here.

## Verification boundary

Final coordinator checks passed: whitespace, 58 relative links across eight
active documents, all 54 original icon/catalog hashes, and all 48 production SVG
hashes matching their originals. Git staging remains empty; pre-existing changes
remain preserved. A local production preview was started at
`http://127.0.0.1:4173/`; it remains available only while that process is running.
Execution instructions remain in the frontend README.

All 26 frontend implementation parts are delivered. Final user acceptance is
pending; this checkpoint does not authorize engine or integration work. No
blocking source, functional, structural or rendered UX finding remains within
the tested environment. Automatic patched-Firefox installation is verified only
on Debian 13 x64; other platforms require an explicit compatible executable as
documented in the frontend README.

No authenticated Kindroid tests, backend, simulation, world editing, persistent
storage, remote deployment, native packaging, or phone-specific design is part
of this delivery. No new commit or publication is authorized by this step.
