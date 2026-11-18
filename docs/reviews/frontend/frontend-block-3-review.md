# Frontend Block 3 review

Implementation began: 2026-11-16 (America/Sao_Paulo).
Resumed for verification: 2026-11-17 (America/Sao_Paulo).
Scope: parts 11–16 of the [approved plan](../../plans/frontend-implementation.md).
User checkpoint: accepted; the user authorized parts 17–21 after this review.

## Delivery

District Network is the default spatial presentation in Companion. Rendering is
separated into viewport/geometry utilities, a presentation model, region and route
SVG layers, station controls, character presence, and a map/list presentation
panel. The existing consultation features remain the source of selection state
and place details.

Authored layout data provides district polygons, station coordinates, and route
waypoints. Layout adjustments do not change connectivity or durations. A uniform
projection aligns vector geometry with accessible HTML station buttons without
stretching diagonal angles. Colors follow Warm Glass; district labels use primary
text over subtle tinted regions to retain contrast.

Only explicit connections with endpoints at the displayed level are drawn.
Junction degree uses those visible connections; a visual crossing does not create
a place or traversal rule. Route lines use octilinear segments with softened
corners. Transit positioning follows the same rounded geometry.

Selection uses a coral outline; confirmed character presence has a labeled green
marker. Static transit is estimated from the snapshot timestamp and recorded
journey bounds, never the wall clock, and does not claim arrival. Missing location
or insufficient timing information must not invent a position. The Place list
offers equivalent selection and readable full place names.

## Review status

The implementation agent authors the source and tests. Independent test, UX,
and structural reviewers evaluate their respective boundaries. Executed results,
screenshots, and limitations are recorded after the final verification freeze.

Early review refinements: junction markers were restricted to visible-level
connections; marker alignment was matched to rounded routes; region-label
contrast was strengthened. No icons, interior navigation, camera controls,
backend, or Kindroid integration are included in this checkpoint.

On resumption, an authored interior route was found to pass through an unrelated
room station. Its waypoints were detoured within Home without changing the
connection. A regression now checks clearance from non-endpoint stations at all
authored levels. The transit marker wrapper also received explicit dimensions
while preserving its projected center, making its visible bounding box testable.

## Source verification

On 2026-11-17, the implementation agent and independent test reviewer passed
lint, typecheck, seven unit-test files with 25 tests, and production build.
The isolated Node 24 runtime was restored after temporary files from the previous
session were unavailable; the system runtime and dependency lockfile were not
changed for that restoration.

Additional independent checks confirmed that all 19 original connections and
their durations are unchanged (14 walk edges, five interior passages), with
15 world stations/14 routes and six Home stations/five routes. Station positions
lie inside the polygons of their actual parents; route endpoints match their
defined connection endpoints; authored segments are octilinear; projection uses
one uniform scale across viewport shapes. The read-only SSR check reported a
sandbox HMR binding warning, but its assertions completed successfully.

The user must review this map milestone before Block 4 begins. No new commit or
publication was requested.

## Browser and UX evidence

The implementation agent executed all 15 Chromium cases successfully with one
worker and a 90-second per-test timeout. Initial parallel 30-second runs timed
out during axe evaluation in the slower restored environment; the serial run
retained the same assertions. Independent QA then passed three targeted browser
regressions for the brand/skip link, selection versus presence, and unknown/static
transit. axe results apply only to the exercised states, not full conformance.

The UX reviewer used the plan-authorized Playwright browser because IAB was
unavailable. At 1440×900, 1280×720, and 1024×640, the standard fixture displayed
15 stations and two district polygons without overlapping label boxes or
horizontal overflow. Actual tasks confirmed Home selection leaves Ana at Cafe,
map and list retain selection, keyboard selection works, observing Leo changes
the marker, unknown location has no invented point, and transit stays static.
No page errors were captured.

The coordinator opened the desktop and transit screenshots. Local evidence:

- `/tmp/geospace-block3-desktop.jpg`.
- `/tmp/geospace-block3-1280.jpg` and `/tmp/geospace-block3-1024.jpg`.
- `/tmp/geospace-block3-transit.jpg`.
- `/tmp/geospace-block3-reflow.jpg` and `/tmp/geospace-block3-reflow-list.jpg`.
- `/tmp/geospace-block3-ux-result.json`.

Known limitation: at 640×450 with extended names, nine label pairs overlap and
district names truncate. The Place list alternative preserves full names and
consultation. A hint now advises Place list when the actual map container is at
most 480px wide, preserving the user's chosen presentation. After this correction,
types, lint, 25 unit tests, build, and all six affected map browser tests passed.
The full 15-case suite passed before the added hint; the suite now contains 16
cases, with the six map cases rerun after that addition. Full density/reflow
refinement remains part 21. Screenshots and agent heuristics
do not establish human usability, screen-reader compatibility, native 200% zoom,
or Firefox behavior. No engine or authenticated platform behavior was tested.

The coordinator restarted the local Vite preview after the browser runner's
temporary server stopped. The delivery address is `http://127.0.0.1:5173/`.
The UX reviewer independently verified the hint at 640×450, full-name list and
details with unchanged character location, and hint absence at 1440×900. The
coordinator inspected `/tmp/geospace-block3-narrow-hint.jpg`; label overlap in the
narrow map itself remains the limitation described above.
