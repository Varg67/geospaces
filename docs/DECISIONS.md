# GeoSpace decisions

## Accepted

| Decision | Rationale and consequences | Evidence |
| --- | --- | --- |
| Keep the simulation core independent of Kindroid | Core state and rules can be checked independently of a platform. Platform behavior belongs behind an integration boundary. | [Agent guidance](../AGENTS.md), [engine status](architecture/backend-and-engine-status.md) |
| Start the Weak frontend with React, TypeScript, Vite and authored SVG | The first delivery is a local desktop observation surface with deterministic fictional examples. Simulation and platform architecture remain open. | [Approved frontend plan](plans/frontend-implementation.md) |
| Use Warm Glass and the Companion layout | The standalone observer uses a warm palette and places character context beside the map and place details. | [Design Blueprint](DESIGN.md) |
| Use District Network with explicit hierarchical exploration | Schematic regions express territorial belonging. Selecting a place inspects it and entering its available interior is explicit. Breadcrumbs follow its actual ancestry. | [Map and interaction decisions](DESIGN.md#accepted-map-approach-district-network) |
| Model declared proximity independently of traversable access | A nearby place may lack a direct passage. A direct passage need not have a nearness assertion. Keep the two layers and observation states distinct. | [Spatial network correction](plans/spatial-network-correction.md) |
| Build the simulation engine in TypeScript on Node.js | Contracts can be shared with the strict TypeScript frontend. The supplied, unverified research lists Node.js among platform program runtimes. Persistence and deployment stay open. | User decision, 2026-11-18; [engine rules](architecture/engine-weak-rules.md#0-scope-and-principles--accepted) |
| Deliver the engine as a single Node 22 JavaScript bundle | Kindroid's Workshop agent stated that external HTML, CSS, JavaScript, JSON and Python are accepted. A dependency-free ES module needs no compiler or package install on the host. Platform execution is untested. | User decision, 2026-11-18; [engine package](../engine/README.md#delivery-artifact) |
| Split the engine into staged mechanic modules | Each mechanic (world, travel, journey, commitments, presence) is a separate module with declared dependencies, tested on its own. A test and a lint rule enforce boundaries and a core without I/O. | User decision, 2026-11-18; [engine package](../engine/README.md#module-boundaries) |
| Treat Weak as a self-sufficient test bed for Mid | Weak derives distances from curated graph edge lengths. Mid later computes them from geography with the same duration rules. Other apps attach through extension points. | [Engine rules §0, §2](architecture/engine-weak-rules.md) |
| Run simulated time 1:1 with real time | The world continues while the user is away. A deterministic autopilot covers absent decisions. Asynchronous queries ask only about the future; the past is never rewritten. On-demand advancement remains the execution hypothesis. | [Engine rules §1](architecture/engine-weak-rules.md#1-time-asynchronous-mode-and-economy-mode--accepted) |
| Track commitments with explicit outcomes | Commitments distinguish late, missed and declined. The engine projects a latest departure time. Only future commitments can change. | [Engine rules §1.4](architecture/engine-weak-rules.md#14-commitments) |
| Generate absence summaries from the event log | Daily and weekly summaries are produced by code. Routine collapses and exceptions are promoted. | [Engine rules §1.5](architecture/engine-weak-rules.md#15-period-summaries) |
| Compute durations per travel mode in seconds | Durations depend on the chosen mode, edge length, district profile and waits. Every edge duration is positive. Random waits are drawn once at departure with a recorded seed. A mobility profile replaces money. | [Engine rules §2](architecture/engine-weak-rules.md#2-durations-and-travel-modes--accepted) |
| Represent journeys as fixed multi-leg itineraries | Walk, run, wait and ride legs are fixed at departure. Position derives from the clock. Passing through a place is not a visit. | [Engine rules §3](architecture/engine-weak-rules.md#3-multi-leg-journeys--accepted) |
| Treat the user marker as a simulated avatar | The avatar is authoritative, does not expire and moves only through simulated journeys. The character learns its position only through observation. An offline user's avatar yields `CO_PRESENT_IDLE`. | [Engine rules §4](architecture/engine-weak-rules.md#4-user-avatar--accepted) |

## Open

| Topic | Current status |
| --- | --- |
| Time advancement and recovery | The time policy is accepted. On-demand chronological advancement is the execution hypothesis. Event ordering, interruptions and checkpoints need experiments. |
| Engine persistence and deployment | The language is accepted. Persistence and deployment are undecided. Earlier SQLite and JSON mentions are options from the original proposal. |
| Engine and platform contracts | Authority, request/response schemas, idempotency, and character adherence need explicit contracts and separate verification. |
| Provisional places and merge | Proposals D19–D24 await approval. See [engine rules §5](architecture/engine-weak-rules.md#5-provisional-places-and-merge--proposed). |
| Remaining engine rules | Concurrency, narration before validation, remaining co-presence cases, time-dependent access and scores are listed in [engine rules §6–10](architecture/engine-weak-rules.md#610-open-items). |
| Frontend contract changes | Multi-leg journeys, the avatar and merge decisions change the snapshot and make some frontend actions writes. This needs its own decision. |
| Mid and Strong | Original plans are unavailable. The source inventory records the gap. |

The [engine rules](architecture/engine-weak-rules.md), [engine status](architecture/backend-and-engine-status.md),
[phase inventory](plans/README.md) and [current status](STATUS.md) hold the underlying proposals and evidence.
