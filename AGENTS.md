# Working on GeoSpace

- Read `README.md`, `docs/STATUS.md`, and relevant documents before working.
- Distinguish requirements, hypotheses, accepted decisions, implementation, and
  verification. Original plans and research are proposals, not architecture approval.
- Keep the GeoSpace core independent of Kindroid-specific behavior.
- Preserve pre-existing changes and limit work to the requested scope.
- Organize code by responsibility as concrete needs arise. The frontend uses the
  approved React/TypeScript/Vite plan in `docs/plans/frontend-implementation.md`.
  Engine language, database, and platform integration architecture remain open.
- Keep documentation consistent with effective changes and maintain one canonical
  location per document.
- Record checks actually performed and their limitations; never imply unexecuted
  experiments or authenticated tests succeeded.
- Write new project content in English. Preserve imported original references
  verbatim, including their supplied language and filenames.
- Never commit credentials, private conversations, or personal runtime data.
- Make coherent, selective commits when authorized; inspect staged contents and
  preserve any pre-existing staging. Use the configured Git identity.
- Do not rewrite history or perform destructive operations without specific
  authorization. Publishing, pushing, and remote creation are outside this task.
