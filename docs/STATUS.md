# Project status

Updated: 2026-11-18 (America/Sao_Paulo).

## Current state

- The approved 26-part read-only Weak frontend is implemented and technically
  verified. Final review identified an incorrect sequential urban fixture;
  the user confirmed that proximity and access are separate relationships.
  The [spatial network correction](plans/spatial-network-correction.md) is in
  progress, and final acceptance remains pending. Engine and platform
  architecture remain open.
- The initial focus is **GeoSpace Weak**. Mid and Strong remain later stages.
- **Warm Glass** is the accepted visual direction: Kindroid-compatible warm
  neutrals, coral/terracotta actions, restrained frosted overlays, and a secondary
  mineral-green spatial accent. The light palette is recorded in the
  [Design Blueprint](DESIGN.md) and [canonical tokens](design-tokens.css).
- **Companion** is the accepted layout for the separate Weak desktop window:
  character context on the left, spatial canvas on the right, selected-place
  details below the canvas, and expandable events in the character panel.
  Exact dimensions and rendered behavior remain to be refined and tested.
- **District Network** is the accepted Weak map approach: metro-inspired
  connections between places, grouped within labeled schematic district regions.
  Regions express territorial belonging; exact polygon shapes and geographic
  geometry are not established. See the [map decision](DESIGN.md#accepted-map-approach-district-network).
- **Hierarchical interior exploration** is accepted: select a place to inspect
  it, activate Explore interior to show its defined internal network, and use
  the breadcrumb to return to an ancestor. Browsing preserves the character's
  confirmed state and creates no movement or visits. See the
  [interaction decision](DESIGN.md#accepted-interaction-hierarchical-interior-exploration).
- A temporary English spatial taxonomy and semiotic icon catalog is organized in
  [`icons/`](../icons/README.md), covering 341 point-level urban places, 248
  interior rooms, open-source icon bindings (Phosphor/Lucide), and 48 custom
  Warm Glass SVGs ([`icons/custom/`](../icons/custom/README.md)). Polygon/region
  types remain a separate step. The frontend now consumes this canonical
  registry through a build-time adapter; all 54 source files remain unchanged.
- The user approved React, strict TypeScript, Vite, CSS, and authored SVG layouts
  for the read-only local-browser frontend. The
  [26-part implementation plan](plans/frontend-implementation.md) is canonical.
  Block 1 (parts 1–5) was reviewed by the user, who authorized Block 2 and
  reported a brand-click scroll jump. Parts 6–10 and that fix are implemented;
  the user accepted the consultation checkpoint and authorized Block 3.
  Parts 11–16 (District Network map rendering) are implemented and accepted by
  the user. Parts 17–21 (explicit interiors, ancestor navigation, per-level camera
  state, edge cases, and reflow) are implemented, verified, and accepted by the
  user. Parts 22–26 are implemented and verified, awaiting final user review.
  The [final report](reviews/frontend/frontend-block-5-review.md) records 589 resolved icon types,
  48 custom SVG assets, 37 unit tests, a clean 60-case Chromium/Firefox suite,
  eight production text-enlargement/spacing flows, and independent reviews.
  Firefox testing uses a pinned upstream-fixed browser revision; its installer
  and platform boundary are documented in the frontend README.
  The [exploration report](reviews/frontend/frontend-block-4-review.md)
  records 31 unit tests, 27 Chromium tests, independent reviews, and limitations.
  Narrow containers now initially use Place list; map labels retain full names
  through focus/hover and details.
  The [checkpoint report](reviews/frontend/frontend-block-1-review.md) records verification and
  limitations. The application now supports character/place consultation, recent
  events, and asynchronous fictional data states. See the
  [Block 2 report](reviews/frontend/frontend-block-2-review.md).
- The engine will be written in TypeScript on Node.js. A 2026-11-17/18 design
  review accepted the Weak engine rules for time, travel modes, multi-leg
  journeys and the user avatar; provisional places and later topics remain
  proposed or open. See the [engine rules](architecture/engine-weak-rules.md).
  Database, deployment model, and detailed engine/platform communication
  contracts remain under discussion. The [`engine/`](../engine/README.md)
  package holds a staged, modular scaffold (kernel, ports and accepted
  contracts) delivered as a single Node 22 bundle. Stage 1 (world graph:
  hierarchy, access edges, proximity, validation, deterministic shortest
  paths) is implemented with unit tests; other mechanics and the platform
  adapter are not implemented. Frontend fixtures must remain explicitly fictional.
- The supplied material provides no evidence of authenticated Kindroid integration
  or real Kindroid tests. Static guide/client research is not runtime validation.
- Engine implementation and Kindroid integration require a later task.
- The foundation commit is on `main`. The local `codex/prepare-github` branch
  carries the existing observer and repository preparation for review. Commits
  use the configured GitHub `noreply` address. Publication is pending.
  See the [repository review](reviews/repository-readiness.md) for the fresh
  verification and open findings.

## Sources and pending work

- The original [Weak plan](plans/01_GeoSpace_Weak.md) and
  [Kindroid Apps context](context/Kindroid_Apps_GeoSpace_Contexto_Codex.md) are
  preserved verbatim. Both contain proposals rather than architecture approval.
- Original Mid and Strong plans were not found in the supplied workspace or the
  searched Documents/Downloads locations. Obtain them before importing; do not
  reconstruct substitutes. See the [plan inventory](plans/README.md).
- Simulated time runs 1:1 with real time, and the decision authority split is
  accepted (see the [engine rules](architecture/engine-weak-rules.md)).
  On-demand chronological advancement remains the execution hypothesis.
  Simultaneous-event ordering, checkpoint contents, and recovery remain open.

## Next work

Follow the accepted [Design Blueprint](DESIGN.md) and
[frontend implementation plan](plans/frontend-implementation.md). Obtain the
user's review after correcting the spatial network. The user accepted
the exploration checkpoint and authorized the final block; its final review
now requires distinct proximity/access semantics and a branching neighborhood.
Typography and component states are refined with rendered evidence; dark mode
and host-theme integration remain outside this first delivery.

Clarify communication contracts and define minimum experiments before choosing
an implementation architecture:

1. Describe requests, observations, proposed actions, validation results, and
   confirmed state. Clarify authority, simulated timestamps, revisions, failures,
   repeated requests, and the distinction between queries and interventions.
2. Define the minimum platform experiments: replace a keyed spatial fact, observe
   location-query action use, reject an impossible movement, and compare action
   results with the character's narrative response. These are proposed tests;
   none has been executed here.
3. Define local causal and recovery experiments, including equivalent advancement
   in one step or multiple steps over 24 hours, 7 days, and 30 days. Record what
   would count as evidence before selecting storage or an execution strategy.

The independent simulation state and the character's adherence to it are separate
outcomes. Any later platform testing needs its own authorization and must protect
credentials and private conversations.

## Verification boundary

Foundation verification covers document paths, relative links, imported-file
integrity, ignore rules, and Git state. The original Weak plan references missing
Mid and Strong files; these historical links are retained and listed in the plan
inventory. No engine, platform, authenticated, or character-adherence tests are claimed.
Design verification covers the documented opaque color pairs, local document
consistency, and static XML/coordinate validation of the 48 custom SVGs in
[`icons/QA_REPORT.md`](../icons/QA_REPORT.md). The frontend foundation has unit,
build, Chromium/axe, and rendered agent-review evidence in the
[foundation report](reviews/frontend/frontend-block-1-review.md) and
[consultation report](reviews/frontend/frontend-block-2-review.md), with map geometry, selection,
presence, and browser evidence in the [map report](reviews/frontend/frontend-block-3-review.md).
Interior/camera flows, navigation focus/scroll, and smaller-window reflow have
Chromium and agent-review evidence in the [exploration report](reviews/frontend/frontend-block-4-review.md).
The [final report](reviews/frontend/frontend-block-5-review.md) adds icon resolution/preservation,
Chromium and Firefox regression, rendered inspection, and computed-font
enlargement/text-spacing evidence. Complete accessibility conformance, native
browser zoom, screen-reader behavior, other browser/platform combinations, and
authenticated Kindroid behavior remain unverified.
