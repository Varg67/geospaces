# Frontend Block 4 review

Date: 2026-11-17 (America/Sao_Paulo).
Scope: parts 17–21 of the [approved plan](../../plans/frontend-implementation.md).
User checkpoint: pending before parts 22–26.

## Implemented delivery

Explicit interior exploration, ancestor breadcrumbs, restored per-level
selection/camera state, zoom/fit/panning with keyboard alternatives, truthful
unavailable/empty/deeper-level examples, and desktop reflow/readability work.
Selection, exploration, and camera operations remain presentation-only. They do
not move a character, advance time, or create events.

- Home selection and Explore interior are separate actions. Home defines six
  rooms; the nested fixture adds a Reading corner inside Bedroom.
- Breadcrumbs use actual ancestors, including authored district maps. Returning
  selects the relevant parent place and restores the previous camera; re-entry
  restores that level's selection and camera.
- Camera controls provide 50–300% zoom, fit, directional buttons, keyboard
  arrows within the controls, and background dragging after a six-pixel
  threshold. SVG geometry, station controls, and presence use one transform.
- Empty, unavailable, undefined, and missing-layout examples remain distinct.
  A character recorded at Home without a known room gets no fabricated marker.
- Narrow map containers initially offer Place list. Explicit view choices
  persist, labels truncate with full names on focus/hover, and the directory
  links directly to selected-place details.

The existing Companion layout and District Network material language govern
these features. Icons, the final delivery regression, backend implementation,
and authenticated Kindroid integration remain outside this checkpoint.

## Review record

Implementation and verification are complete for this checkpoint. User review
is pending; parts 22–26 have not started.

Early structural review identified shallow navigation availability checks:
world-level filtering and exploration could expose a nested place whose ancestor
was unavailable, and keep its cached visit after an ancestor restriction. The
implementation now uses shared ancestor-aware rules for list, map, exploration,
and snapshot reconciliation. A known place with a restricted interior remains
visible, while its contents remain unavailable.

The final independent static review found no further concrete structural blocker.
It checked ancestor filtering, cached-view reconciliation, per-level restoration,
shared camera projection, pointer termination/cancellation/lost capture, and
module responsibilities. This review did not execute tests or validate rendered
focus, scrolling, or pointer behavior; those require separate runtime evidence.
The final focus-helper delta also passed independent static review: it reveals
the page destination without changing camera state or scrolling a clipped
station inside the hidden-overflow map surface.

Independent rendered review reproduced an orientation defect: Explore interior
focused the new heading with scrolling suppressed, leaving it above the visible
viewport after the details action had scrolled into view. This occurred at
1440×900, 1024×640, and the narrow 640×450 reflow size. A separate browser
assertion compared absolute viewport coordinates across document scrolling;
camera restoration is now measured relative to its map surface, with viewport
visibility checked independently. Explicit entry now reveals and focuses the
destination heading. Return reveals and focuses the selected place without
scrolling the clipped map internally; a station outside the current camera uses
the level heading as a safe focus fallback.

## Executed checks

The final source gates passed using isolated Node 24.22.3:

| Check | Result |
| --- | --- |
| `npm run typecheck` | Passed |
| `npm run lint` | Passed |
| `npm test` | 31 tests passed across 9 files |
| `npm run build` | Passed; 51 modules; JavaScript 250.99 kB, gzip 77.94 kB |

The runtime was restored under `/tmp/geospace-node24` after the environment
reset. No system Node installation, project dependency, or lockfile changed.
Browser plugin not available; the approved Playwright/Chromium fallback is used.
The initial browser run exposed the absolute-coordinate assertion described
above and was interrupted for the fix. It is not counted as a passing suite.
The independent final command
`npm run test:e2e -- --workers=1 --timeout=90000` passed **27/27 Chromium tests**
in 1.7 minutes on the frozen final code. Coverage includes restored camera and
selection measured relative to the map, visible/focused navigation destinations
at 1024×640 and 640×450, nested ancestors, all new interior states, zoom/fit,
keyboard pan, background drag, and narrow long-name details access. Existing
brand-scroll, observation, map geometry/selection, asynchronous state, and axe
checks also passed. Axe's tested states reported no violations; this does not
prove complete accessibility.

Source gates passed independently before the focused scroll patch, and the sole
implementation agent reran all four successfully afterward (31 unit tests,
types, lint and build). The final browser run was owned by the independent test
reviewer. The coordinator also checked whitespace, document links (48 relative
links in five documents after final status edits), empty staging, and original
reference SHA-256 hashes; originals match the recorded imports.

## Rendered UX review

An independent agent exercised Home selection → Explore interior → Bedroom →
ancestor return, camera memory/fit/keyboard/drag, the nested Reading corner,
restricted/undefined/empty/missing-layout examples, and Home with an unknown
room. Ana's confirmed location remained unchanged. At 640×450, long names remain
complete in Place list and its links reach the selected details.

After the navigation fix, focused retests passed at 1440×900, 1024×640 and
640×450: the destination heading was visible and focused, returned Home was
visible and focused, and there was no horizontal page overflow. No page errors
or relevant console warnings/errors were observed. The final viewport captures
were opened and inspected by both the UX reviewer and coordinator:

- `/tmp/geospace-block4-interior.png`: six rooms, Bedroom selected, Ana at Café.
- `/tmp/geospace-block4-desktop-1024.png`: smaller desktop navigation.
- `/tmp/geospace-block4-narrow.png`: long-name interior in Place list.

These are temporary local evidence paths and may disappear after a reset.
An initial Chromium full-page capture intermittently omitted map layers outside
the visible viewport. Repeated DOM/geometry and scroll measurements remained
stable; viewport captures showed the layers correctly. Canvas, SVG and station
container scroll offsets stayed zero. This is recorded as a capture limitation,
not proof of a persistent blank-map defect.

This is agent heuristic inspection, not human usability research. The narrow
test represents reflow; it does not approve a phone-specific product layout.

## Verification boundary

All examples are fictional, read-only observations. No backend, authenticated
Kindroid connection, simulation, movement, storage, icon integration, or native
desktop packaging is implemented here. Chromium and agent UX inspection do not
establish full WCAG conformance, screen-reader usability, native browser zoom
behavior, or Firefox compatibility. The final block owns cross-browser review.
No new commit, staging, push, or publication was performed.
