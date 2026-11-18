# GeoSpace decisions

## Accepted

| Decision | Rationale and consequences | Evidence |
| --- | --- | --- |
| Keep the simulation core independent of Kindroid | Core state and rules can be checked independently of a platform. Platform behavior belongs behind an integration boundary. | [Agent guidance](../AGENTS.md), [engine status](architecture/backend-and-engine-status.md) |
| Start the Weak frontend with React, TypeScript, Vite and authored SVG | The first delivery is a local desktop observation surface with deterministic fictional examples. Simulation and platform architecture remain open. | [Approved frontend plan](plans/frontend-implementation.md) |
| Use Warm Glass and the Companion layout | The standalone observer uses a warm palette and places character context beside the map and place details. | [Design Blueprint](DESIGN.md) |
| Use District Network with explicit hierarchical exploration | Schematic regions express territorial belonging. Selecting a place inspects it and entering its available interior is explicit. Breadcrumbs follow its actual ancestry. | [Map and interaction decisions](DESIGN.md#accepted-map-approach-district-network) |
| Model declared proximity independently of traversable access | A nearby place may lack a direct passage. A direct passage need not have a nearness assertion. Keep the two layers and observation states distinct. | [Spatial network correction](plans/spatial-network-correction.md) |

## Open

| Topic | Current status |
| --- | --- |
| Time progression and recovery | On-demand chronological advancement is a working hypothesis. Event ordering, interruptions and checkpoints need experiments. |
| Engine technology and deployment | Language, persistence and deployment are undecided. Earlier Python, SQLite and JSON mentions are options from the original proposal. |
| Engine and platform contracts | Authority, request/response schemas, idempotency, and character adherence need explicit contracts and separate verification. |
| Mid and Strong | Original plans are unavailable. The source inventory records the gap. |

The [engine status](architecture/backend-and-engine-status.md), [phase inventory](plans/README.md)
and [current status](STATUS.md) hold the underlying proposals and evidence.
