# Contributing to GeoSpace

Start with the [README](README.md), [current status](docs/STATUS.md) and
[agent guidance](AGENTS.md). Check the [decision log](docs/DECISIONS.md)
before changing a contract, interaction or architectural boundary. Write new
project content and commit messages in English. Preserve imported references
byte-for-byte.

## Branches and commits

- Keep `main` for reviewed, integrated changes. Use `feature/<name>` for
  isolated features or `fix/<name>` for fixes. Agent work can use the
  `codex/` prefix in this workspace.
- Introduce `develop` only if parallel work needs a dedicated integration
  branch. Create branches for active work.
- Check the working tree and index before editing. Preserve existing edits and
  staging. Commit coherent changes with the configured identity and an
  action-oriented subject, such as `docs: document the observer data flow`.
- Inspect the staged paths and diff before each commit. Keep generated builds,
  browser downloads, caches, credentials, private transcripts and local state
  out of Git. Use fictional fixtures in shared tests.

## Working with coding agents

Codex, Gemini, Claude and human contributors follow the same [agent rules](AGENTS.md).
Read the current files and relevant review before working. In a handoff, record
what changed, which behavior was implemented, what remains in progress, and
which commands ran with their results. Update the canonical document as
decisions or evidence change. Record an open hypothesis as such until an explicit
decision is made.

## Review and integration

Use the [frontend checks](frontend/README.md#verify) for changes to its code,
fixtures, build inputs or tooling. For documentation, check paths, links and
imported-file integrity. Include the affected flows and verification
limitations in review. A commit records a snapshot. Testing and review
establish what can be integrated.

The owner controls publication and licensing. Before publishing, review the
intended branch history, repository visibility, and rights to project materials.
Preserve the [frontend's third-party notices](frontend/NOTICE.md).
