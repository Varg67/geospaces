# Frontend Block 2 review

Date: 2026-11-16 (America/Sao_Paulo).
Scope: parts 6–10 of the [approved plan](../../plans/frontend-implementation.md), plus
the brand-click scroll regression reported during the Block 1 user checkpoint.
User review: accepted without additional comments; the user authorized parts
11–16 at the following checkpoint.

## Delivered behavior

- Character selector and confirmed state: known/unknown location, recorded
  activity, snapshot timestamp/time zone, and static recorded transit information.
- Reducer/context for observed character and selected place, independent of the
  immutable snapshot; removed IDs are reconciled against replacement data.
- A provisional place directory grouped by district for consultation before the
  map renderer is implemented. Place details show parent, interior availability,
  connected places, and defined or explicitly unknown durations.
- Expandable recent events filtered by character, ordered by timestamp with
  stable order for ties. Observation creates no simulated events or time advance.
- Loading, empty, unknown, transit, long-content, and recoverable error states.
  Retry and cancellation preserve request identity and discard old completions.

The fixture reader is selected through a documented `?scenario=` query parameter
for local evaluation. There are no fixture-control panels in the product flow.
The error fixture deliberately fails once and succeeds on retry; it is a
deterministic test scenario, not evidence about a remote server.

Snapshot `asOf` can now be null to express unknown state time; the UI displays
that explicitly instead of substituting wall-clock time. Event timestamps remain
recorded timestamps. This is a frontend presentation contract, not a backend API.

## Brand regression

Before editing, the implementation agent reproduced the issue at 1024×640:
clicking the wordmark changed scrollY from 0 to 56, header Y from 0 to −56, and
the URL hash from empty to `#workspace`. The brand was an anchor targeting main.

The wordmark is now static identity. The explicit Skip to workspace link remains
the keyboard navigation mechanism. The browser regression checks scroll,
header position, URL hash, and the separate skip-link behavior.

## Verification and review

The implementation agent is the only code/test writer. Independent test and UX
agents review the resulting behavior, with a separate read-only structural pass.
Final source checks passed: lint, typecheck, five unit-test files with 16 tests,
and production build. Independent QA also ran those checks successfully.

The implementation agent and independent QA reviewer each executed all ten
Chromium tests successfully after the final semantic correction. Coverage includes the brand-scroll regression,
skip-link, observation versus place selection, character switching, events,
long-content reflow, and empty/unknown/transit/error/loading scenarios. axe was
run in the audited states; this does not prove complete WCAG conformance.

The first browser run identified missing main headings on loading and empty
pages. Page headings were added to the read-state pages; error is also audited
before retry. The full browser suite passed after this correction.

Structural inspection of the implemented modules found no blocking issue in
separation of composition, observation state, selectors, fixture readers, and
features. Source formatting was normalized before the verification freeze.

## Rendered UX evidence

The in-app browser was unavailable in this review (empty browser inventory), so
the UX reviewer used the Playwright browser already authorized by the plan.
The coordinator also opened and inspected the saved desktop and reflow captures.

Actual task checks confirmed Home selection leaves Ana at Cafe, switching to
Leo updates character state/events while retaining Home selection, Recent events
works with Enter/Space, both parts of the brand preserve hash/scroll/header
position, and Skip to workspace still moves focus. Unknown, transit, empty,
loading, and error-to-retry states were inspected. No page errors or blocking
visual findings were observed.

Evidence saved outside the repository:

- `/tmp/geospace-block2-desktop.jpg`: Home selected, Ana at Cafe, events expanded.
- `/tmp/geospace-block2-reflow.jpg`: 640×450 viewport with long-content fixture.
- `/tmp/geospace-block2-ux-result.json`: task outcomes and layout measurements.

The audit inspected 1440×900, 1280×720, 1024×640, and narrow 640×450 reflow.
No horizontal overflow was observed. Smaller desktop heights require ordinary
vertical scrolling; the narrow long-content example extends to 1814px. Selected
details below a long directory require scrolling; refine this in part 21.

This is agent-led heuristic evaluation, not human-user research. Narrow-viewport
reflow does not establish native browser zoom or screen-reader compatibility.
Firefox and complete map/interior accessibility remain later verification work.

The coordinator checked local documentation links, whitespace, and preserved
hashes of the original icon/catalog assets. The local preview remains at
`http://127.0.0.1:5173/`; the isolated Node 24 runtime and execution instructions
from the foundation checkpoint still apply.

## Boundaries

The real map, station selection within a rendered graph, character markers,
camera interaction, interior exploration, and icons remain in their later
approved blocks. This checkpoint uses local fictional observations only.
No engine, Kindroid account, authenticated API, or real-time simulation is tested.
User review is required before starting Block 3. No commit or publication was
requested for this checkpoint.
