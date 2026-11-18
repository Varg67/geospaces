# GitHub preparation review

Reviewed on 2026-11-18 (America/Sao_Paulo).

## Initial inventory

The starting branch was `main`, with foundation commit `91ac2b6`, an empty
index diff, no remote and no release tags. The source inventory contained 157
tracked or non-ignored files, including pre-existing uncommitted frontend,
documentation and icon work. The installed dependency and browser caches,
local build output and test output were ignored.

| Path | Contents and entry points |
| --- | --- |
| `frontend/` | Node 24 package with React, TypeScript, Vite, CSS and SVG. `index.html` loads `src/main.tsx`. The lockfile pins runtime and development dependencies. |
| `frontend/src/` | Observation domains, fictional fixtures, application, feature modules, design system and colocated Vitest tests. |
| `frontend/e2e/` | Playwright tests for Chromium and Firefox, including axe checks. |
| `frontend/build/`, `scripts/`, `testing/` inside the package | Vite catalog plugin, pinned Firefox installer and its platform checks. |
| `icons/` | Canonical JSON catalog, taxonomies, SVG artwork and icon QA. |
| `docs/` | Status, design and tokens, technical guides, plans, research sources and review evidence. |

The frontend builds against the shared design tokens and icon catalog. Keeping
those paths preserves their imports, fixtures and attribution. The identical
React and React DOM license files are retained as separate package notices.
Both original references remain byte-for-byte intact. Their inventories
identify the missing Mid and Strong plans and explain the two unresolved
historical links.

## Publication hygiene

- Filename and content checks covered the candidate files and repository
  objects reachable from refs or reflogs. The patterns screened likely private
  keys, API tokens, credential assignments, authentication headers, credentials
  in URLs and suspect runtime paths. No likely secret or private runtime data
  was found within that scope. This was a local screening pass.
- The largest candidate file is the 359,817-byte source catalog. Local
  dependencies, the browser archive and extracted browser, build output,
  reports, SQLite files, environment files and local agent settings are
  excluded by scoped ignore rules. Current scripts require no credential
  configuration or environment template.
- The foundation on `main` uses GitHub noreply for author and committer. An
  earlier local reflog entry contains prior identity metadata. Publish an
  explicitly reviewed branch. A mirror or copy of `.git` can expose local
  metadata and tool checkpoint refs.
- License selection, publication rights and visibility belong to the owner.
  Third-party notices stay with the frontend.

## Local review branch

`codex/prepare-github` carries the existing Weak observer snapshot and
repository preparation for review. `main` remains at the foundation while
frontend acceptance is pending. The snapshot includes the existing proximity
and access correction. The [correction plan](../plans/spatial-network-correction.md)
records the user-confirmed semantics and acceptance evidence.

## Technical verification

Checks ran against a temporary copy on Debian 13 x64 with Node.js 24.22.3 and
npm 11.19.1. The lockfile installation succeeded with 233 packages. The first
offline attempt lacked a cached tarball. After fetching the locked dependencies
with lifecycle scripts disabled, a standard `npm ci --offline` completed
from that cache.

| Check | Result |
| --- | --- |
| `npm ls --all` and direct version comparison | Resolved dependency tree and direct versions matched the lockfile. |
| `npm run typecheck`, `npm run lint`, `npm run build` | Passed. The build included icon assets, the notice and the package licenses. |
| `npm test` | 45 of 45 passed after replacing a 10 ms timing assumption in the retry test with explicitly controlled reader responses. The initial run had 44 passes and one failed retry assertion. |
| `npm run browsers:firefox` | Verified the cached official revision 1575 archive and reused the matching install. |
| `CI=1 npm run test:e2e -- --workers=2 --reporter=dot` | 66 of 68 passed across Chromium and Firefox. Both failures exercised the same reflow case. All eight spatial-network cases passed. |
| `npm run preview` with Chromium | Loaded Alder Grove, switched to Access, retained the confirmed location, and served the notice. |
| Repository checks | Checked relative links and heading anchors, ignore rules and source integrity. Both imported originals and all 54 icon files matched their original bytes. Two known missing plan links remain in the preserved Weak source. |

The [reflow test](../../frontend/e2e/foundation.spec.ts) reproduces horizontal
overflow after selecting Home in the long-content fixture at 640 × 450, in
Chromium and Firefox. The application and its fixtures are the pre-existing
observer snapshot. Track the overflow with the spatial network review before
integration. Native browser zoom, screen readers, authenticated Kindroid
behavior and engine experiments remain outside this verification.
