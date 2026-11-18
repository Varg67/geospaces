# Weak frontend implementation plan

Approved by the user on 2026-11-16 (America/Sao_Paulo). This is the canonical
implementation plan; the original Weak conception remains an imported proposal.

## Delivery and boundaries

Build a read-only desktop-browser frontend using React, React DOM, strict
TypeScript, Vite, npm with a lockfile, and an isolated Node 24 LTS runtime.
Use CSS with the canonical Warm Glass tokens and SVG for spatial presentation.
The approved composition is Companion with District Network and explicit
hierarchical interior exploration.

Use deterministic fictional data through a replaceable asynchronous reader.
This delivery excludes backend implementation, world editing, engine logic,
automatic graph layout, LLM calls, authenticated Kindroid integration, native
desktop packaging, and phone-specific product design. Mid and Strong remain
future requirements. Integrate the existing icons after the structural base.

## Responsibilities and review gates

The implementation agent is the sole author of application code, configuration,
and permanent tests. Independent reviewers do not edit that code:

- Test reviewer: independently defines cases, runs checks, and reports failures.
- UX reviewer: follows concrete user tasks in the rendered interface; records
  screenshots, clarity/legibility/accessibility observations, and evidence limits.
- Structure reviewer: examines module boundaries, contracts, dependencies, and
  consistency with the approved design and observation-only behavior.
- Coordinator: distributes work, consolidates findings, maintains project
  documentation, and presents the checkpoints to the user.

Schedule these roles in rounds with at most three active specialists plus the
coordinator. Freeze each reviewable change before independent checks. The coder
fixes findings and reviewers rerun affected checks. A passing build alone does
not establish visual quality or complete accessibility.

User review is required after parts 5, 10, 16, 21, and 26, before the following
block starts. Blocking defects include broken tasks, misleading state, keyboard
traps, and illegible essential content. Resolve smaller findings within the same
block before its review. Agent UX inspection is not human-user research.

## Structure and contracts

Keep the application under `frontend/`, organized by responsibility: composition,
presentation-domain types/selectors, data readers and fixtures, design system,
character/place/event/navigation features, map rendering/camera, and icon adapter.
The main composition must not absorb those responsibilities into one component.

- `WorldSnapshot`: read-only places, regions, connections, character states,
  visible events, and the timestamp of the represented state.
- `WorldReader`: asynchronous cancelable snapshot loading; fixture implementation
  now, actual source adapter later. Components must not import fixture files.
- `LevelLayout`: authored coordinates, polygons, route waypoints, and label
  anchors per level, separate from hierarchy, connectivity, and durations.
- `ViewState`: observed character, explored level, selected place, and camera;
  presentation changes must not mutate the snapshot or create simulated events.

Use explicit undefined/unavailable interior states and unknown information.
Restricted contents must not enter data supplied to the UI. The initial world
has two districts, approximately 15 urban places, two characters, and six Home
interior spaces. Additional scenarios cover transit, unknown state, loading,
failure, empty data, and long content. New project and interface text is English.

## The 26 parts

| Part | Delivery | Acceptance |
| --- | --- | --- |
| 1 | Environment, modular project, build/types/lint/test scripts | Reproducible installation; local application and basic checks execute |
| 2 | Warm Glass tokens, system typography, spacing | Centralized values, legible text, approved surface/contrast rules |
| 3 | Buttons, disclosure, loading/error/empty primitives | Keyboard operation, accessible names, distinguishable states |
| 4 | Snapshot/layout/reader contracts and deterministic fixtures | Valid references, separated geometry, reproducible scenarios |
| 5 | Companion shell: header, left panel, canvas, detail strip, footer | Approved proportions; shell renders independently of the complete map |
| 6 | Character identity, confirmed location, activity, timestamp | Missing data stays unknown; no invented activity |
| 7 | Observation/selection state | Selection does not change canonical state, events, or time |
| 8 | Selected-place details and connection durations | Details follow selection and explicitly represent unknown data |
| 9 | Expandable recent events | Stable ordering; character context remains accessible |
| 10 | Async loading, error/retry, empty state, cancellation | Obsolete responses cannot replace newer data |
| 11 | SVG layers, coordinates, uniform transformations | Resizing preserves angles and control alignment |
| 12 | Labeled schematic territorial regions | Belonging represented without implying real area/distance |
| 13 | Metro connections with softened 45-degree bends | Defined edges only; crossings do not invent junctions |
| 14 | Accessible stations, junctions, readable labels | Pointer and keyboard selection; fixture labels do not overlap |
| 15 | Confirmed presence and recorded transit presentation | Markers derive from snapshot; no automatic time advance |
| 16 | Integrated map selection and equivalent accessible place list | Both views produce the same selection without moving a character |
| 17 | Explicit Explore interior action | Selection and level change remain distinct |
| 18 | Breadcrumb, ancestor return, restored selection/camera | Return reselects Home; focus moves appropriately |
| 19 | Zoom, fit, background panning | Accessible controls; dragging does not select; browser zoom preserved |
| 20 | Empty, undefined, restricted interiors and deeper hierarchy | Clear states; no invented or restricted contents exposed |
| 21 | Smaller windows, long names, denser fixtures | Main flow works at tested viewports and text enlargement |
| 22 | Adapter for existing icon catalog/custom/library bindings | Deterministic resolution and identified fallback; originals preserved |
| 23 | Icons integrated with visible labels | Readable sizes; essential meaning remains available in text |
| 24 | Typography, contrast, focus, semantics, reduced motion | Complete keyboard tasks and resolved blocking findings |
| 25 | Cross-browser regression and production build | Current evidence, no unexplained relevant console errors or blockers |
| 26 | Documentation, execution instructions, contracts, handoff | Reproducible reviewed frontend and documented future motor boundary |

Review blocks: **1–5 Foundation**, **6–10 Consultation**, **11–16 Map**,
**17–21 Exploration**, **22–26 Icons and final delivery**.

Icon resolution uses the custom SVG when the catalog specifies one; otherwise
prefer the available Lucide binding and use Phosphor where necessary. Use explicit
imports, preserve the canonical catalog, and record library attribution. No icon
integration is required in the foundation checkpoint.

## Verification

Use Vitest and Testing Library for meaningful logic/component checks; Playwright
for browser flows and axe for automated accessibility checks. Add behavior tests
with the relevant part rather than postponing them to final regression.

Inspect Chromium during development and Chromium plus Firefox at final
regression. Target logical content viewports of 1024×640, 1280×720, 1440×900,
and 1920×1080, plus 200% zoom/reflow. WCAG 2.2 AA is the implementation target;
automated checks and screenshots alone do not prove conformance.

Core tasks: identify the character's confirmed location and state time;
distinguish observation/selection/level; explore Home and return; understand
unknown/unavailable states; consult events; inspect static transit; repeat
applicable tasks by keyboard and after resizing.

Each checkpoint records the executed commands, current screenshots, findings,
fixes, and remaining limitations. Preserve pre-existing work. Commit only when
authorized; remote creation, publication, and pushing are outside this task.

## Execution status

Block 1 (parts 1–5): implemented; independent technical, structural, and rendered
UX checks are recorded in the [checkpoint report](../reviews/frontend/frontend-block-1-review.md).
The user reviewed Block 1 and authorized the next block, requesting a fix for
brand clicks scrolling the workspace and moving the header out of view.
Block 2 (parts 6–10) and that regression fix are implemented; checks and review
evidence are recorded in the [Block 2 report](../reviews/frontend/frontend-block-2-review.md).
The user accepted Block 2 without further comments and authorized Block 3.
Parts 11–16 (District Network rendering) are implemented, with executed evidence
and limitations in the [map report](../reviews/frontend/frontend-block-3-review.md). User review
after part 16 was accepted by the user. Parts 17–21 (exploration, navigation,
camera, edge cases, and reflow) are implemented and verified, with evidence in
the [exploration report](../reviews/frontend/frontend-block-4-review.md). The user accepted the
part-21 checkpoint and authorized parts 22–26. Those parts are implemented and
verified, with 37 unit tests, a clean 60-case Chromium/Firefox run, production
text-enlargement/spacing checks, and independent reviews recorded in the
[final report](../reviews/frontend/frontend-block-5-review.md). All 26 implementation parts are
delivered; final user review after part 26 is pending. Engine and integration
work remain outside this frontend delivery.

During final review, the user identified the sequential urban topology as a
semantic mismatch and explicitly confirmed independent proximity and access
relations. The [spatial network correction](spatial-network-correction.md)
records the bounded follow-up implementation and its acceptance criteria.
Final frontend acceptance remains pending that correction and its review.
