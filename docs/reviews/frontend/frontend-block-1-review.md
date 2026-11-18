# Frontend Block 1 review

Date: 2026-11-16 (America/Sao_Paulo).
Scope: parts 1–5 of the [approved plan](../../plans/frontend-implementation.md).
User review: the user accepted progression to Block 2 and reported that clicking
the brand scrolls the page. That regression is assigned to Block 2.
Parts 6–26 had not been implemented at this checkpoint.

## Delivered

- React/strict TypeScript/Vite project with exact dependency pins and npm lockfile.
- Canonical Warm Glass token import, system-font foundations, Button, Disclosure,
  and loading/error/empty feedback primitives.
- Read-only presentation contracts, authored layout data separate from world
  relationships, cancelable asynchronous fixture reader, deterministic scenarios.
- Fictional fixture: two districts, 15 urban places, six Home interior spaces,
  and two characters. Ready, empty, unknown, transit, long-content, error, and
  pending scenarios are available to component work.
- Companion shell: header, left context region, main spatial workspace,
  selected-place strip, footer, and a working preview disclosure.

The visible interface is a foundation preview. Character observation, the actual
District Network renderer, interior exploration, and icon integration follow in
later blocks. The placeholder outline is decorative, not a running map.

## Review roles and findings

The implementation agent authored application code and permanent tests. Separate
test, UX, and structural agents reviewed it without changing the source. The
coordinator maintained project documentation and inspected saved screenshots.

Findings corrected before handoff:

1. Authored station coordinates initially crossed their parent district regions;
   positions were regrouped by district.
2. Retry/loading state could retain the previous error. Request identity and
   abort handling now prevent stale completions and expose pending state.
3. Browser axe checks identified a heading-level jump and a wordmark accessible
   name missing visible text. Both semantics were corrected.
4. Independent QA reproduced acceptance of NaN/Infinity layout dimensions.
   Finite positive width/height validation and regression cases were added.

Static structure review found no remaining blocking module-boundary issue.
Application composition, lifecycle, domain contracts, data, controls, and styles
are separated. No Kindroid calls, engine commands, or icon imports were added.

## Executed verification

Runtime: isolated Node 24.22.3, outside the system installation. The current
verification runtime is `/tmp/geospace-node24/node_modules/node/bin/node`.
It is temporary; use Node 24 through a version manager for subsequent sessions,
as described in [frontend instructions](../../../frontend/README.md).

After the final source correction, independent QA executed and passed:

- `npm run lint`.
- `npm run typecheck`.
- `npm test`: four test files, nine tests.
- `npm run build`.

The implementation agent additionally executed
`npm ci --offline --cache /tmp/geospace-npm-cache --no-audit --no-fund`:
installation passed, with the lockfile SHA-256 unchanged. Post-install types,
lint, nine unit tests, and production build passed again. npm's offline cache
and the verification runtime are temporary local tooling, not project assets.

Browser checks use Chromium. The independent corrected run passed all four
Playwright tests, including keyboard disclosure, axe, and viewport/reflow checks.
After the final source correction and offline installation, the implementation
agent reran all four browser tests successfully. axe reported zero violations in
the tested shell state. The final local server remains available at
`http://127.0.0.1:5173/` for the user checkpoint.

Additional independent checks confirmed recursive snapshot freezing, two-district
fixture cardinalities, timed cancellation with abort-listener removal, and exact
manifest/lockfile dependency parity. The coordinator checked local documentation
links and whitespace and confirmed hashes of all 54 existing icon/catalog files
were preserved. Imported original research was not edited.

## Rendered UX evaluation

The UX agent inspected the live local application at 1440×900, 1280×720,
1024×640, and 640×360 (a viewport approximation of 200% reflow).

- No blocking overlap or horizontal overflow was observed.
- Disclosure opens with Enter and closes with Space; focus and expansion state
  are visible. Skip to workspace moves focus to the main region.
- No console errors or warnings were observed in this browser evaluation.
- Short desktop windows use ordinary vertical scrolling because the main region
  has a 660px minimum height; controls remained reachable.
- Preview and fictional-data labels distinguish the shell from runtime behavior.

Accepted screenshots were saved and visually inspected:

- `/tmp/geospace-block1-desktop.jpg`: desktop view with disclosure expanded and
  workspace focus visible after using the skip link.
- `/tmp/geospace-block1-reflow.jpg`: narrow viewport, partial scrolled view of
  the expanded disclosure with keyboard focus.

A faulty full-page capture with blank extension was rejected. The accepted
evidence uses actual viewport captures. Screenshot files are local review
artifacts outside the repository and may not persist across sessions.

## Limitations and next checkpoint

This is agent-led heuristic inspection, not testing with human participants.
No screen reader or native browser zoom was exercised. The narrow viewport is
an approximation of reflow, not proof of native 200% zoom behavior. Firefox and
the final complete-flow regression remain scheduled for later parts. Automated
axe results do not establish complete WCAG conformance.

The user must review the foundation before Block 2 begins. Block 2 adds actual
character consultation, observation state, place details, recent events, and
integrated asynchronous data states. No new commit or publication was requested
for this checkpoint.
