# Documentation index

## Canonical locations

| Document | Role and authority |
| --- | --- |
| [Project overview](../README.md) | Purpose, organization, and entry point |
| [Agent guidance](../AGENTS.md) | Contribution rules |
| [Current status](STATUS.md) | Updatable summary of current work and pending decisions |
| [Design Blueprint](DESIGN.md) | Accepted Warm Glass art direction, evidence, validation, and open visual decisions |
| [Design tokens](design-tokens.css) | Canonical approved light palette and initial material values; no application implementation |
| [Context inventory](context/README.md) | Research provenance and interpretation limits |
| [Kindroid Apps research context](context/Kindroid_Apps_GeoSpace_Contexto_Codex.md) | Original supplied research; not a specification or runtime verification |
| [Plan inventory](plans/README.md) | Available originals and missing phase plans |
| [GeoSpace Weak original plan](plans/01_GeoSpace_Weak.md) | Original proposal v0.1; not an approved implementation architecture |

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
Future accepted decisions should be recorded when they exist. Do not infer stack
approval from Python, SQLite, or other options mentioned in imported proposals.
