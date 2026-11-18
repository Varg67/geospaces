# GeoSpace engine

TypeScript core of the GeoSpace Weak simulation engine. Behavior follows the
[Weak engine rules](../docs/architecture/engine-weak-rules.md). The package is a
scaffold: it holds the module boundaries, shared primitives, ports and the
accepted contracts. **No mechanic logic is implemented yet.**

## Requirements

- Node.js 22 (`.nvmrc`). The package supports `>=22.12 <25` so it can also run
  beside the Node 24 frontend.
- npm 11 or later. npm 10.9 bundled with Node 22 fails on this dependency tree
  (`Cannot read properties of null (reading 'edgesOut')`); use
  `npx -y npm@11 ci` instead of `npm ci`.

## Commands

```sh
npx -y npm@11 ci
npm run check
```

`npm run check` runs, in order: `typecheck`, `lint`, `test`, `build` and
`smoke`. Run `npx vitest run src/mechanics/<stage>` to test one stage.

## Delivery artifact

`npm run build` bundles the engine into a single ES module,
`dist/geospace-engine.mjs`, targeting Node 22 with no runtime dependencies.
`npm run smoke` loads that file on the running Node and exercises its exports.
The bundle format follows a statement from Kindroid's Workshop agent that
external JavaScript is accepted; running it on the platform has **not** been
tested.

## Organization

```text
src/
  kernel/      Branded ids, Instant/Seconds (whole seconds), Result, travel modes
  ports/       Clock, RandomSource, EventLog interfaces
    memory/    ManualClock, SeededRandom, InMemoryEventLog for tests and experiments
  mechanics/   One folder per mechanic, each a separately testable stage
    world/        Stage 1: places, hierarchy, access edges, validation, shortest paths
    travel/       Stage 2: per-mode durations, district profiles, waits, transit lines
    journey/      Stage 3: itinerary planning, position from the clock, interruption
    commitments/  Stage 4: latest departure time, late/missed/declined outcomes
    presence/     Stage 5: user avatar, co-presence regimes, observable facts
  index.ts     Public API
test/
  architecture.test.ts   Enforces the module boundaries below
scripts/
  smoke.mjs              Loads the built bundle
```

Later stages (autopilot, period summaries, provisional places and merge) get
their own folders once their rules are accepted.

## Module boundaries

- `kernel` imports nothing outside itself.
- `ports` imports only `kernel`.
- A mechanic imports `kernel`, `ports` and only the mechanics it is allowed to
  depend on, always through their `index.ts`:

  | Mechanic | May depend on |
  | --- | --- |
  | `world` | — |
  | `travel` | `world` |
  | `journey` | `world`, `travel` |
  | `commitments` | `world`, `travel`, `journey` |
  | `presence` | `world`, `journey` |

- Source files under `src/` perform no I/O; ESLint rejects Node built-in
  imports there. Storage, platform calls and the real clock belong behind ports.
- A new mechanic folder must be registered in `test/architecture.test.ts`,
  which also rejects dependency cycles.
