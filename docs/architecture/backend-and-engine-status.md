# GeoSpace Backend, Simulation Engine & Integration Status

This document summarizes the **current state, architectural boundaries, unapproved proposals, and open decisions** for the GeoSpace backend, simulation engine, persistence layer, and Kindroid Apps integration.

> **Critical distinction:** **No backend, simulation engine, database, or Kindroid adapter is implemented in this repository.** Everything in this area exists only as requirements, invariants, proposals ([`01_GeoSpace_Weak.md`](../plans/01_GeoSpace_Weak.md)), and static platform research ([`Kindroid_Apps_GeoSpace_Contexto_Codex.md`](../context/Kindroid_Apps_GeoSpace_Contexto_Codex.md)).

## 1. Architectural Invariants (Accepted Constraints)

1. **Kindroid-independent core:** The GeoSpace simulation core must remain completely independent of Kindroid-specific behavior. Any integration with Kindroid, a local LLM, or a test harness must sit behind a replaceable adapter/port.
2. **Authoritative engine vs. LLM narrative:** A character's narrative claim (e.g., *"I arrived at the café"*) must **never** automatically mutate canonical spatial state. The intended boundary is:
   `Intention / Request -> Chronological Update -> Physical & Temporal Validation -> Confirmed Event / State -> Context Delivered to LLM`.
3. **Read-only observation boundary:** The existing frontend expects only a `WorldReader.loadSnapshot(signal?)` contract returning an immutable `WorldSnapshot` (see [frontend-technical-guide.md](frontend-technical-guide.md)). Any future backend must enforce visibility/privacy filtering **before** emitting snapshots to the client.
4. **Separation of spatial relationships:** Hierarchy (`parentId`), traversable access (`Connection` with `durationMinutes`), and declared nearness (`ProximityKnowledge`) are distinct concepts and must not be conflated.

## 2. Open Architectural Choices (Undecided)

Per [docs/STATUS.md](../STATUS.md), none of the following have been selected yet:
- **Engine language & runtime** (Python + in-memory graph was mentioned as an early proposal in `01_GeoSpace_Weak.md`, not an approved stack).
- **Database / persistence technology** (SQLite or JSON were early prototype suggestions, not approved).
- **Deployment model** (local process, container, serverless/Kindroid App container, etc.).
- **Time policy** (real wall-clock tracking vs. paused vs. accelerated fictional time).
- **Decision authority** (whether the LLM selects among validated eligible destinations or a heuristic chooses and the LLM narrates).
- **Communication contracts** (exact wire payloads for queries, proposed actions, validation rejections, state revisions, idempotency keys, and checkpoints).

## 3. Proposed Simulation Engine Design (Weak Hypothesis)

From `01_GeoSpace_Weak.md` and `Kindroid_Apps_GeoSpace_Contexto_Codex.md`, the working hypothesis for **GeoSpace Weak** includes:

### 3.1 World & Character Model
- **World graph:** Hierarchical `Place` nodes (world -> district -> building -> room) plus separate `Connection` edges (origin, destination, direction, modality, minimum/estimated duration, accessibility/opening rules, provenance) and explicit `ProximityRelation` edges.
- **Canonical character state:** Either at a single `current_place_id` or inside an active `journey` (`depart_at`, `earliest_arrival_at`, `arrived_at`), plus `updated_at`, world timezone, routines/obligations/goals, and visibility levels (public, character-known, private/hidden).
- **Spatial memory (non-scalar):** Separate dimensions per character-place pair so ambivalence is preserved (e.g., a frequent, familiar, yet unpleasant workplace):
  - `visits` (only incremented on confirmed simulation visits — mentioning a place in chat never increments visits)
  - `familiarity`
  - `positive_affinity` and `aversion` (independent, can coexist)
  - `salience` (memory retrieval prominence)
  - `episodes` (referencable autobiographical events)

### 3.2 On-Demand Chronological Advancement (Working Hypothesis)
Instead of running a continuous minute-by-minute tick loop with constant LLM calls, the preferred hypothesis is **on-demand chronological advancement**:
- When a message or query arrives after hours of inactivity, the engine advances simulated state from the last `updated_at` checkpoint up to the target timestamp, resolving pending transitions and scheduled events in causal order.
- **Target causal properties (to verify):**
  1. Equivalent state whether a 24h, 7d, or 30d interval is advanced in one jump or multiple smaller steps (given identical external inputs and seeded choices).
  2. Deterministic ordering of simultaneous events and reproducible stochastic choices.
  3. No retroactive leakage of future state into earlier simulated instants.
  4. Checkpoint recovery without duplicating or losing events if execution interrupts mid-update.

### 3.3 Proposed Core Regression Scenarios (`W01–W10` in `01_GeoSpace_Weak.md`)
Before expanding to Mid/Strong, the original plan proposes testing 10 baseline behaviors (such as closed bakery at 02:00 `W01`, mid-transit at 14:20 of a 40-min trip `W02`, repeated user mentions not inflating `visits` `W03`, LLM claiming impossible location `W06`, 9-hour inactivity catch-up `W07`, shared topology with separate character memories `W08`, unknown access/hours `W09`, and idempotent event reprocessing `W10`).

### 3.4 Proposed Interaction Cycle and Sleep (Proposal, User-Discussed, Not Accepted)
Status: proposal from the 2026-11-19 design discussion. Nothing here is implemented or verified, and it is not recorded in [DECISIONS.md](../DECISIONS.md). The goal is character agency: the companion behaves as a simulated life, not as an avatar the user steers.

**Cycle (character awake).** At a periodic interval (about 30 minutes, with random jitter) the engine asks the character where it is and what it wants to do. The request carries the validated current place and the places reachable from it with travel times from the graph. The character replies `go` (with a destination), or `stay`, plus a short activity. The engine validates the destination against the graph, records the departure or the unchanged state, and computes the arrival. An invalid destination leaves the character where it is. While a journey is in progress the engine reports "in transit" with the remaining time and offers no new destinations. The engine knows only "character" and "decision"; the delivery channel (for example Kindroid) lives in a replaceable adapter.

Illustrative request (shape not final):
```json
{
  "character": "Isa",
  "now": "2026-11-19T14:10:00",
  "current": { "place": "Pharmacy", "activity": "buying medicine" },
  "options": [
    { "place": "Bakery", "travel": "7 min", "mode": "walk" },
    { "place": "Isa's home", "travel": "30 min", "mode": "walk" },
    { "place": "Hospital", "travel": "15 min", "mode": "bus" }
  ],
  "instruction": "Reply with a destination to go, or stay and update your current activity."
}
```
Illustrative replies: `{ "decision": "go", "destination": "Bakery", "activity": "going to buy bread" }` or `{ "decision": "stay", "activity": "talking to the pharmacist" }`.

**Sleep as a pause state.**
- The character declares it is going to sleep. The engine pauses the periodic cycle and stores an absolute `wake_at`, drawn at random from about 6 to 8 hours and possibly shaped by when sleep began. The engine owns the clock; the character does not choose the wake time.
- At `wake_at` the engine resumes the cycle and first asks for a short summary of the last dream. The dream is stored as narrative memory only. It does not change the world state or the character position.
- Sleep is allowed only at places typed as sleepable (for example bedroom, bed, hotel). The graph validates this. Short naps in other places (15 to 30 minutes) do not trigger the dream prompt.
- The engine supplies only the time of day when the character decides to sleep. It deliberately does not report how long the character has been awake, because that would pressure the character to rush to bed.
- User messages during sleep: during the night, the message waits and the character answers on waking. Outside normal sleep hours, or if the user insists, the engine may wake the character early and the character answers groggy.
- The same pause mechanism may later serve other long activities (a long meeting, a work shift).

**Open questions for this proposal.** Whether the engine or the adapter schedules the periodic asks. What "no response" means when the character does not answer (the working assumption is that it stays where it is). The exact thresholds for waking the character early. Whether wake time depends on bedtime. Whether the cycle is subject to the open decisions on authority and contracts in section 2 and DECISIONS.md.

## 4. Kindroid Apps Integration Surface (Research Only)

`docs/context/Kindroid_Apps_GeoSpace_Contexto_Codex.md` records a static inspection (dated 2026-11-16) of Kindroid's public `GUIDE.md` and `kin.mjs` CLI. **No authenticated calls or runtime tests have been executed.** Treat every item below according to its evidence category:

| Mechanism | Status in Research | Hypothetical GeoSpace Role | What Remains Unverified |
| --- | --- | --- | --- |
| Git programs (`kin.json`, Node 22 / Python 3 containers) | Documented in `GUIDE.md` | Host a Kindroid adapter or lightweight runtime | Actual container limits, startup latency, permissions in user's alpha |
| Actions | Documented | Expose `get_location` / `request_move` to the Kin | When the Kin invokes actions and exact schema/context returned |
| Schedules & Webhooks | Documented | Trigger periodic catch-up or external updates | Delays, retry/duplicate delivery, failure behavior |
| `kin files` (persistent files) | Documented | Store snapshots/checkpoints between runs | Multi-file atomicity, concurrency with static panel writes |
| Static panels | Documented | Host read-only UI observation panel | Communication bridge to engine and refresh mechanism |
| `kin ask` | Documented / in `kin.mjs` | Query Kin for structured intent/choices | Context scope received compared to main chat |
| `kin tell --key / --ttl / --reach-out` | Flags seen in `kin.mjs` | Push keyed replaceable state projection (e.g., `geospace_estado_atual`) | Whether Kin overrides old memory, honors TTL, or triggers outreach |
| `kin chat --days` | Seen in `kin.mjs` | Read recent chat messages (`chat:read:<days>`) | Whether permission is granted in alpha; privacy constraints |
| Development key (`kk_`) | Seen in `kin.mjs` | Local dev/code/file operations (blocks `tell`/`ask`/`chat` outside runtime) | Exact runtime vs dev permission boundaries |

### The Central Integration Risk: Authority in Conversation
Even if the GeoSpace engine is 100% causally consistent, **that does not guarantee the Kin will consult the engine before replying or obey a rejected move in its narrative**. The research explicitly separates:
1. **Engine correctness** (validates transitions, rejects impossible teleports).
2. **Character adherence** (whether the LLM checks state and respects engine rejections).

## 5. Planned Next Steps Before Choosing Architecture

From [docs/STATUS.md](../STATUS.md), the next backend/integration steps are:
1. **Define communication contracts:** Requests, observations, proposed actions, validation results, confirmed state, authority, simulated timestamps, revision IDs, idempotency for repeated requests, and query vs. intervention separation.
2. **Design & authorize minimum platform experiments:**
   - Replace a keyed spatial fact (`kin tell --key`) and observe if/when the character adopts it vs. recalls stale facts.
   - Expose a location-query action and observe spontaneous usage.
   - Reject an impossible movement and compare technical rejection vs. narrative response.
   - Compare `kin ask` context against normal conversation.
3. **Design local causal & recovery experiments:** Test 24h, 7d, and 30d single-step vs. multi-step equivalence and interrupted-checkpoint recovery before committing to a database or execution runtime.
