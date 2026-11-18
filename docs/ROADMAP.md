# GeoSpace roadmap

## Implemented and checked

- The Weak observer includes a read-only Companion layout, character and place
  consultation, a schematic District Network, interior browsing and camera
  controls. Review and verification for the 26-part frontend are recorded in
  the [frontend checkpoints](README.md#frontend-reviews).
- The canonical place catalog is integrated into the build. Tests and browser
  coverage at the original checkpoint are documented in the
  [Block 5 review](reviews/frontend/frontend-block-5-review.md).

## In progress

- The [spatial network correction](plans/spatial-network-correction.md) adds a
  branching access fixture and explicit proximity observations. Review the
  corrected fixture and map layers with the user before closing the frontend
  acceptance checkpoint. See [current status](STATUS.md) for verification
  evidence and limitations.

## Next work

1. Define engine communication contracts for observation, action requests,
   validation, revisions and repeated requests.
2. Define local tests for chronological advancement over 24 hours, seven days
   and 30 days, and for checkpoint recovery.
3. Define minimal Kindroid experiments for state projection, action lookup and
   narrative adherence. Account use and private data require separate
   authorization.
4. Obtain the original Mid and Strong plan files for import. See the
   [phase inventory](plans/README.md).

## Proposals under evaluation

On-demand chronological advancement, persistence, deployment and platform
communication remain open. Consult the [decision log](DECISIONS.md) and
[engine status](architecture/backend-and-engine-status.md) before deriving
implementation work from a research proposal.
