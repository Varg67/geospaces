# Changelog

This file records the documented baseline and unreleased changes. A future
release entry should include its date, Git tag and verification scope.

## Unreleased

- Add the `engine/` TypeScript scaffold: kernel primitives, ports with in-memory
  implementations, staged mechanic modules with the accepted contracts, an
  architecture boundary test, and a single-file Node 22 bundle with a smoke test.

- Record the accepted Weak engine rules (time policy, travel modes, multi-leg
  journeys, user avatar) and the TypeScript/Node.js engine decision, with
  provisional-place proposals and remaining open items.

- Add the local Weak observer and canonical icon catalog. The current snapshot
  includes the Nearby and Access correction pending user review. Checkpoint
  evidence and limits are in [project status](docs/STATUS.md).
- Document local setup, architecture, decisions, roadmap and contribution
  practices for the publication candidate.
- Make the observer retry test deterministic by controlling the reader's
  first failure and retry response.

## 2026-11-16 · Repository foundation

- Commit `91ac2b6` established the project overview, research and plan
  inventories, original Weak and Kindroid research documents, agent guidance,
  and the Warm Glass design direction and tokens. See
  [the documentation index](docs/README.md).
