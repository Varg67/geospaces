# CLAUDE.md — GeoSpace Onboarding for Claude

Welcome to **GeoSpace**. Multiple AI assistants (Gemini, Codex, and Claude) collaborate on this repository. Read this file first, then inspect [README.md](README.md), [AGENTS.md](AGENTS.md), and [docs/STATUS.md](docs/STATUS.md) before making changes.

## 1. What GeoSpace Is

GeoSpace explores **persistent spatial, temporal, and behavioral coherence** for LLM-based characters (companions). Instead of letting a character invent locations and travel outcomes on every chat turn, GeoSpace provides a persistent world model where places, connectivity, travel durations, routines, and spatial memory constrain what a character can do and what the simulation records.

The project is planned in three stages, with **GeoSpace Weak** as the current focus:
- **GeoSpace Weak (current focus):** Abstract place hierarchy and network graphs, travel durations, simulated time running 1:1 with real time (on-demand advancement as the execution hypothesis), spatial memory, and a read-only observation interface.
- **GeoSpace Mid / Strong (future, original plan files not yet in repo):** Urban/geometric enrichment (Mid) and multi-agent social simulation (Strong).

## 2. Hard Rules (Must Always Follow)

These rules come from [AGENTS.md](AGENTS.md) and [README.md](README.md):

1. **Core independence:** Keep the GeoSpace simulation core independent of Kindroid-specific behavior. Platform integrations must live behind replaceable adapters.
2. **Evidence discipline:** Always distinguish **requirements**, **hypotheses/proposals**, **accepted decisions**, **implementation**, and **verification**. Original plans (`docs/plans/01_GeoSpace_Weak.md`) and research (`docs/context/Kindroid_Apps_GeoSpace_Contexto_Codex.md`) are proposals, not approved architecture.
3. **Never fabricate verification:** Record only checks you actually ran in your session and state their exact scope and limitations. Never claim authenticated Kindroid tests or unexecuted experiments passed.
4. **English for new content:** Write all new documentation, code, identifiers, comments, and commit messages in English. Preserve imported Portuguese reference files verbatim.
5. **One canonical location per document:** Update existing canonical docs rather than creating duplicate/versioned files (`final2`, etc.).
6. **Protect privacy and pre-existing work:** Never commit credentials, private conversations, or personal runtime data. Preserve pre-existing uncommitted changes in the working tree. Do not push, create remotes, or rewrite history without explicit authorization.

## 3. Current Project State (Snapshot)

- **Frontend (`frontend/`):** The approved 26-part read-only **GeoSpace Weak** frontend (React 19, strict TypeScript, Vite, authored SVG) is implemented.
  - **Accepted design choices:** **Warm Glass** palette/surfaces ([docs/DESIGN.md](docs/DESIGN.md), [docs/design-tokens.css](docs/design-tokens.css)), **Companion** desktop layout, **District Network** schematic map, and **hierarchical interior exploration** with breadcrumbs and per-level camera memory.
  - **Active work in progress:** During final Block 5 review, the user identified that the initial urban fixture was a sequential circuit and confirmed that **proximity (`Nearby`) and traversable access (`Access`) are separate relationships**. The bounded [spatial network correction](docs/plans/spatial-network-correction.md) is in progress; final user acceptance is pending.
  - **Icon catalog (`icons/`):** 589 spatial taxonomy types (341 urban places, 248 interior rooms) backed by 48 custom Warm Glass SVGs and Lucide icons via a build-time Vite plugin. All 54 files in `icons/` must remain unmodified unless explicitly requested.
- **Backend / Simulation Engine:** **Not yet implemented.** The engine language is TypeScript on Node.js, and the accepted behavior is in [docs/architecture/engine-weak-rules.md](docs/architecture/engine-weak-rules.md). Database/storage, deployment model, and communication contracts remain open decisions.
- **Kindroid Integration:** **Not implemented and not runtime-tested.** Only static documentation and `kin.mjs` CLI reading exist in `docs/context/Kindroid_Apps_GeoSpace_Contexto_Codex.md`.

## 4. Technical Documentation Map

Read the two dedicated architecture guides created for full technical onboarding:
- **Frontend architecture & implementation:** [docs/architecture/frontend-technical-guide.md](docs/architecture/frontend-technical-guide.md)
- **Backend, engine & Kindroid integration status:** [docs/architecture/backend-and-engine-status.md](docs/architecture/backend-and-engine-status.md)
- **Weak engine rules (accepted and proposed):** [docs/architecture/engine-weak-rules.md](docs/architecture/engine-weak-rules.md)
- **Canonical document index:** [docs/README.md](docs/README.md)

## 5. Quick Commands (Frontend)

Run from `frontend/` using Node 24 LTS (`.nvmrc`):

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
```

See [frontend/README.md](frontend/README.md) for scenario URL parameters (`?scenario=...`) and the pinned Firefox test binary setup (`npm run browsers:firefox`).
