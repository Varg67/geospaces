# GeoSpace

GeoSpace explores persistent spatial, temporal, and behavioral coherence for
LLM-based characters. Places, connections, travel time, routines, and spatial
memory should constrain what a character can do and what the simulation records.
The GeoSpace core must remain independent of Kindroid-specific behavior.

## Current stage

**GeoSpace Weak** is the current focus. The local, read-only frontend displays
fictional character locations, journeys and events. It supports map and list
inspection, explicit interior exploration, ancestor navigation and per-level
camera state. The current checkout includes separate Nearby and Access layers
as part of the [spatial network correction](docs/plans/spatial-network-correction.md),
which is pending final user review.

The simulation engine, persistence and Kindroid adapter are future work. The
engine will use TypeScript on Node.js and follows the accepted
[Weak engine rules](docs/architecture/engine-weak-rules.md). Storage and
deployment are open, and the supplied Kindroid research
contains no authenticated runtime tests. See [current status](docs/STATUS.md)
for the 26-part frontend checkpoint history, and [the roadmap](docs/ROADMAP.md)
for the next steps.

## Run locally

Use Node.js 24 and npm. With nvm, run `nvm install` and `nvm use` from
`frontend/` to select the version specified in its `.nvmrc`. The project
requires the full checkout because the frontend reads the shared design tokens
and icon catalog.

```sh
cd frontend
npm ci
npm run dev
```

Open the localhost address printed by Vite. No service credentials or database
are required for the fictional fixtures.

## Verify

From `frontend/`, run:

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

For the engine scaffold, run `npx -y npm@11 ci` and `npm run check` from
`engine/` with Node 22; see the [engine guide](engine/README.md).

See the [frontend guide](frontend/README.md#verify) for Chromium and pinned
Firefox setup, browser tests and example URLs. The Firefox installer supports
Debian 13 x64. Native browser zoom, screen-reader behavior and authenticated
Kindroid behavior remain outside the verified scope.

## Start here

1. Read this file and [current status](docs/STATUS.md).
2. Follow [contribution guidance](CONTRIBUTING.md) and [agent guidance](AGENTS.md).
3. Use the [documentation index](docs/README.md) to locate source material.

## Organization and responsibilities

| Path | Responsibility |
| --- | --- |
| `ARCHITECTURE.md` | Component boundaries and data flow |
| `CONTRIBUTING.md`, `AGENTS.md` | Shared contribution guidance and agent rules |
| `CHANGELOG.md` | Recorded baseline and unreleased changes |
| `docs/README.md` | Canonical document index and evidence conventions |
| `docs/STATUS.md` | Current state, open work, and next step |
| `docs/architecture/` | Technical guides for the frontend and engine boundaries |
| `docs/context/` | Supplied research and its provenance |
| `docs/plans/` | Original phase plans, implementation plans, and pending sources |
| `docs/reviews/frontend/` | Frontend review reports and verification evidence |
| `engine/` | Weak simulation engine scaffold: staged mechanic modules, ports and the Node 22 bundle |
| `frontend/` | Weak observer, build and test tooling, and fictional fixtures |
| `icons/` | Temporary English taxonomy and semiotic icon catalog (`urban_places`, `interior_rooms`, and custom SVGs) |
| `.gitignore` | Exclusions for secrets, caches, temporary files, and local data |
| `.editorconfig` | Basic text formatting conventions |

Write new documentation, code, identifiers, comments, and commit messages in
English. Imported original references retain their supplied filenames, language,
and exact contents to preserve provenance; they are explicitly identified in the
documentation index. Maintain one canonical location per document and use Git for
revisions rather than filenames such as `final2`.

## Next step

Review the spatial network correction with the user. Core communication
contracts and minimum experiments remain separate open work.
