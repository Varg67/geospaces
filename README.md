# GeoSpace

GeoSpace explores persistent spatial, temporal, and behavioral coherence for
LLM-based characters. Places, connections, travel time, routines, and spatial
memory should constrain what a character can do and what the simulation records.
The GeoSpace core must remain independent of Kindroid-specific behavior.

## Current stage

The project is organizing its foundation and investigating platform capabilities.
The initial focus is **GeoSpace Weak**. Architecture is still under discussion;
no language, framework, database, or deployment model has been approved.
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
| `docs/context/` | Supplied research and its provenance |
| `docs/plans/` | Available original phase plans and missing-source inventory |
| `.gitignore` | Exclusions for secrets, caches, temporary files, and local data |
| `.editorconfig` | Basic text formatting conventions |

Write new documentation, code, identifiers, comments, and commit messages in
English. Imported original references retain their supplied filenames, language,
and exact contents to preserve provenance; they are explicitly identified in the
documentation index. Maintain one canonical location per document and use Git for
revisions rather than filenames such as `final2`.

## Future code and tests

There is no implementation or test suite yet. Create source and test directories
only when concrete content or an accepted structure requires them. Organize code
by actual responsibility as needs emerge. Future work must distinguish the
independent simulation core from platform-specific adapters; this boundary does
not select a framework, storage technology, or module layout.

## Next step

Clarify communication contracts and define the minimum experiments needed to
evaluate GeoSpace Weak. Record proposals and evidence before treating architecture
or Kindroid behavior as accepted or verified. See [open work](docs/STATUS.md).
