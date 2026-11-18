# GeoSpace architecture

## Implemented Weak observer

The frontend is a React and strict TypeScript application served by Vite. The
entry page is `frontend/index.html` and the entry module is
`frontend/src/main.tsx`. See the [frontend technical guide](docs/architecture/frontend-technical-guide.md)
for types, invariants and rendering details.

| Path | Responsibility |
| --- | --- |
| `frontend/src/domain/` | Read-only world contracts, reference validation, and selectors for hierarchy, access and proximity |
| `frontend/src/data/` | Fictional snapshots, authored layouts and an asynchronous, cancellable reader |
| `frontend/src/app/` | Loading lifecycle, Companion shell and observation state |
| `frontend/src/features/` | Character, events, map, navigation and place inspection |
| `frontend/src/design-system/`, `frontend/src/styles/` | Shared controls, feedback and presentation |
| `frontend/src/icons/`, `frontend/build/`, `icons/` | Icon rendering, build-time catalog mapping and canonical source assets |
| `frontend/src/**/*.test.*`, `frontend/e2e/` | Colocated tests and browser regression tests |
| `frontend/scripts/`, `frontend/testing/` | Pinned Firefox installer and browser test support |

A `WorldReader` returns an immutable `WorldSnapshot` with recorded character
state, places, events and topology. The frontend validates fictional snapshots
and derives the visible places for the current level. The view reducer tracks
selection, observed character, current level and camera. Those controls update
the view while preserving the snapshot. Selecting a place inspects it. Exploring
an available interior opens its own view.

Hierarchy expresses containment. Access connections describe traversable
passages and can carry travel durations. Proximity describes declared nearness
with separate coverage for unknown neighborhoods. Authored layout coordinates
determine drawing geometry. The recorded character journey refers to an access
connection. The canonical tokens in `docs/design-tokens.css` and the icon
catalog in `icons/` are build inputs outside the frontend package.

## Simulation core and adapters

The [`engine/`](engine/README.md) package is the TypeScript core scaffold. It
separates a kernel (ids, time in seconds, results), ports (clock, random source,
event log) and one module per mechanic (world, travel, journey, commitments,
presence) with enforced dependency boundaries and no I/O. It builds into a
single Node 22 JavaScript bundle. Stage 1, the world graph, is implemented.

Weak's [original proposal](docs/plans/01_GeoSpace_Weak.md) describes a persistent
world and character state, temporal validation, spatial memory and on-demand
chronological advancement. The proposed flow takes explicit observations or
action requests, validates them against simulated time and world constraints,
and returns confirmed state or rejected actions. Only confirmed simulation
events would update canonical location or visit history. This engine flow
remains a hypothesis for implementation and testing.

The core must remain independent of Kindroid behavior. A future platform
adapter would translate between platform messages and core contracts, enforce
visibility before exposing snapshots, and project confirmed state back to the
platform. The frontend's visibility rules govern browsing. Engine authority
and the character's adherence to confirmed state need separate experiments.
The accepted engine behavior is recorded in the
[Weak engine rules](docs/architecture/engine-weak-rules.md); the engine will be
written in TypeScript on Node.js. See the
[engine and integration status](docs/architecture/backend-and-engine-status.md)
and the [decision log](docs/DECISIONS.md) for unresolved contracts, storage
and deployment choices.

## Later phases

Mid and Strong are later conceptual stages. Their original plans are pending
import, and their module boundaries and implementation choices remain open.
Keep any later platform adapter or experimental engine work scoped to its own
reviewed change. The [phase plan inventory](docs/plans/README.md) records the
available originals.
