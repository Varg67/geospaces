# GeoSpace

GeoSpace explores persistent spatial, temporal, and behavioral coherence for
LLM-based characters. Places, connections, travel time, routines, and spatial
memory should constrain what a character can do and what the simulation records.
The GeoSpace core must remain independent of Kindroid-specific behavior.

## Current stage

The initial focus is **GeoSpace Weak**. The user approved a 26-part frontend plan
using React, TypeScript, Vite, and authored SVG presentation in a local desktop
browser. The first review block (parts 1–5) was reviewed by the user; the
consultation block (parts 6–10) and the reported brand-click scroll fix are
implemented and accepted by the user. The District Network rendering block
(parts 11–16) is implemented and accepted. The exploration/camera block
(parts 17–21) is implemented, verified, and accepted by the user. The final block
(parts 22–26: icons, accessibility, regression, and handoff) is implemented and
verified technically. During final review, the user identified that the urban
example is a sequential circuit and confirmed that proximity and access must
be separate. The [spatial network correction](docs/plans/spatial-network-correction.md)
is in progress; final acceptance remains pending. See the
[final checkpoint evidence](docs/reviews/frontend/frontend-block-5-review.md). Engine language,
database, deployment, and integration architecture remain undecided.
Engine implementation and Kindroid integration are deferred.

The supplied research reports no authenticated Kindroid integration or real
Kindroid tests. Proposed platform capabilities and experiments are not verified
runtime behavior. Read [current status](docs/STATUS.md) before starting work.

## Start here

1. Read this file and [current status](docs/STATUS.md).
2. Follow [agent guidance](AGENTS.md).
3. Use the [documentation index](docs/README.md) to locate source material.

## Organization and responsibilities

| Path | Responsibility |
| --- | --- |
| `README.md` | Project purpose, entry point, and repository organization |
| `AGENTS.md` | Working rules for future contributors and agents |
| `docs/README.md` | Canonical document index and evidence conventions |
| `docs/STATUS.md` | Current state, open work, and next step |
| `docs/architecture/` | Technical guides for the frontend and engine boundaries |
| `docs/context/` | Supplied research and its provenance |
| `docs/plans/` | Original phase plans, implementation plans, and pending sources |
| `docs/reviews/frontend/` | Frontend review reports and verification evidence |
| `frontend/` | Approved Weak frontend implementation, built in reviewed blocks |
| `icons/` | Temporary English taxonomy and semiotic icon catalog (`urban_places`, `interior_rooms`, and custom SVGs) |
| `.gitignore` | Exclusions for secrets, caches, temporary files, and local data |
| `.editorconfig` | Basic text formatting conventions |

Write new documentation, code, identifiers, comments, and commit messages in
English. Imported original references retain their supplied filenames, language,
and exact contents to preserve provenance; they are explicitly identified in the
documentation index. Maintain one canonical location per document and use Git for
revisions rather than filenames such as `final2`.

## Code and tests

Frontend code and checks are introduced through the
[approved implementation plan](docs/plans/frontend-implementation.md).
See [frontend instructions](frontend/README.md) for running the foundation and
its checks with Node 24.
Organize code by actual responsibility as needs emerge. Future work must distinguish the
independent simulation core from platform-specific adapters; this boundary does
not select engine storage technology or platform integration architecture.

## Next step

Complete and review the spatial network correction with the user.
Core communication contracts and minimum experiments remain
separate open work. See [current progress](docs/STATUS.md).
