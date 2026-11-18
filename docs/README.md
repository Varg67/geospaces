# Documentation index

## Start here

| Document | Role and authority |
| --- | --- |
| [Project overview](../README.md) | Purpose, organization, and entry point |
| [Agent guidance](../AGENTS.md) | Contribution rules |
| [Contributing](../CONTRIBUTING.md) | Branches, commits, review, and verification |
| [Claude onboarding](../CLAUDE.md) | Project summary and collaboration rules for Claude |
| [Gemini onboarding](../GEMINI.md) | Entry point to shared project guidance |
| [Current status](STATUS.md) | Updatable summary of current work and pending decisions |
| [Roadmap](ROADMAP.md) | Checkpoints, current work, and proposed milestones |
| [Changelog](../CHANGELOG.md) | Documented baseline and unreleased changes |

## Architecture and design

| Document | Role and authority |
| --- | --- |
| [Architecture overview](../ARCHITECTURE.md) | Implemented components, observation flow, and proposed engine boundary |
| [Decision log](DECISIONS.md) | Accepted choices and open questions with links to their evidence |
| [Frontend technical guide](architecture/frontend-technical-guide.md) | Implemented React/TypeScript/Vite frontend architecture, contracts, and rendering pipeline |
| [Backend & engine status](architecture/backend-and-engine-status.md) | Engine boundaries, unapproved proposals, Kindroid research status, and open choices |
| [Weak engine rules](architecture/engine-weak-rules.md) | Accepted and proposed simulation rules for time, travel modes, journeys, the user avatar, and provisional places |
| [Design Blueprint](DESIGN.md) | Accepted Warm Glass art direction, evidence, validation, and open visual decisions |
| [Design tokens](design-tokens.css) | Canonical approved light palette and material values imported by the frontend |
| [Spatial taxonomy & icon catalog](../icons/README.md) | Temporary English catalog of 341 point-level urban places, 248 interior rooms, standard icon bindings, and 48 custom semiotic SVGs |

## Plans

| Document | Role and authority |
| --- | --- |
| [Frontend implementation plan](plans/frontend-implementation.md) | Approved 26-part plan, team responsibilities, checkpoint gates, and execution status |
| [Spatial network correction](plans/spatial-network-correction.md) | User-confirmed proximity/access distinction, network fixture correction, and acceptance evidence |
| [Plan inventory](plans/README.md) | Available originals and missing phase plans |
| [GeoSpace Weak original plan](plans/01_GeoSpace_Weak.md) | Original proposal v0.1 |

## Frontend reviews

| Document | Role and authority |
| --- | --- |
| [Frontend Block 1 review](reviews/frontend/frontend-block-1-review.md) | Executed checks, corrected findings, rendered evidence, limitations, and pending user checkpoint |
| [Frontend Block 2 review](reviews/frontend/frontend-block-2-review.md) | Character/place consultation, brand-scroll fix, asynchronous states, and executed review evidence |
| [Frontend Block 3 review](reviews/frontend/frontend-block-3-review.md) | District Network layers, authored geometry, presence, map/list equivalence, checks, and readability limits |
| [Frontend Block 4 review](reviews/frontend/frontend-block-4-review.md) | Explicit interior exploration, ancestor navigation, per-level camera state, edge cases, and executed checkpoint evidence |
| [Frontend Block 5 review](reviews/frontend/frontend-block-5-review.md) | Icon integration, accessibility review, cross-browser regression, and final frontend handoff evidence |

## Repository review

[GitHub preparation](reviews/repository-readiness.md) records the initial
inventory, publication checks, and current technical findings.

## Research context

| Document | Role and authority |
| --- | --- |
| [Context inventory](context/README.md) | Research provenance and interpretation limits |
| [Kindroid Apps research context](context/Kindroid_Apps_GeoSpace_Contexto_Codex.md) | Original supplied research and proposed experiments |

Each document has one canonical location. The supplied root-level references were
relocated into the directories above without changing their contents. Newly
authored project material is in English; the two imported references remain in
Portuguese to preserve the originals. Their inventories record provenance and
SHA-256 fingerprints.

## Evidence and decisions

- **Requirement:** an explicitly requested constraint or outcome.
- **Hypothesis:** a proposal awaiting evaluation, including design options in the
  original plan and research context.
- **Accepted decision:** an explicitly approved choice, identified as such with
  its rationale and source of approval.
- **Implementation:** behavior present in project artifacts; its existence alone
  does not establish correctness or platform availability.
- **Verification:** an executed check with conditions, results, and limitations.

For Kindroid claims, also distinguish what the supplied research describes as
documented, present in the client, hypothetical, or still to verify. It is a dated
snapshot of mutable sources. Revalidate relevant primary sources before relying
on them for implementation; this organization task does not refresh that research.

Use `STATUS.md` for current priorities rather than rewriting historical sources.
Future accepted decisions should be recorded when they exist. The engine language
(TypeScript on Node.js) is accepted; do not infer storage or deployment approval
from SQLite or other options mentioned in imported proposals.
