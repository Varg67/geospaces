# Spatial network correction

Date: 2026-11-17 (America/Sao_Paulo).
State: implementation in progress following final frontend review.

## Requirement and accepted distinction

The user identified that the urban example communicates a sequential circuit
rather than a spatial neighborhood: a character at A needs context about nearby
B, C, D and other places. The user explicitly confirmed that proximity and
access are separate relationships. Two places can be nearby while a wall or
an entrance arrangement prevents direct passage between them.

Warm Glass, Companion, District Network, territorial regions, existing icons,
and hierarchical exploration remain accepted. Metro-inspired strokes are a
visual language, not a requirement to arrange the world as one itinerary.

## Diagnosis

The initial urban fixture creates each access connection from place index N to
N+1. Its 15 places and 14 links form a path with no branching. The authored
geometry follows that same sequence; district views slice the route array by
index. The domain records traversable connections and durations, but has no
explicit proximity relation. Passing the previous technical checks did not
establish the intended spatial semantics. Final user acceptance was pending.

## Bounded frontend correction

1. Retain traversable access connections and their known/unknown travel
   durations. Add separate, explicit undirected proximity observations, with
   unknown metadata distinguishable from a defined empty neighborhood. Neither
   relation is inferred from screen coordinates, line length, district
   membership, or the other relation.
2. Replace index-generated urban access topology with an authored branching
   network containing cycles and multiple meaningful junctions. Define a
   neighborhood with at least four explicit neighbors around Café, including
   a near pair without direct access and an access pair without a proximity
   assertion. Preserve the Home–Café journey identifier and truthful fixture
   timestamps. Add an interior example of nearby rooms without a direct door.
3. Keep authored schematic geometry and territorial polygons. Derive district
   and level edges from their declared endpoints, not array order. Both layers
   must respect ancestor availability and actual level scope.
4. Make Nearby the initial map layer and offer Access separately. Selection
   highlights the selected point's incident neighborhood, without computing or
   implying an ordered journey. Preserve selection/camera across layer changes.
   The equivalent place list and details remain usable without the drawing.
5. Separate Nearby places from Direct access in place details. Add textual
   neighborhood context anchored to the character's confirmed place, distinct
   from whichever place the user is inspecting. Proximity has no invented travel
   time or metric distance.
6. Recorded journeys use access geometry only. In Nearby mode, show honest
   recorded-transit text and an explicit action to view its access connection;
   do not place a transit estimate on an unrelated proximity stroke. Browsing
   changes no character state, simulated time, events, or canonical snapshot.

This extends only the read-only frontend observation model and fictional data.
It does not choose engine, database, geospatial coordinates, routing algorithm,
distance thresholds, automatic graph layout, or Kindroid integration contracts.
No dependencies, original icon edits, commits, or publication are required.

## Team and verification

The existing implementation agent remains the sole frontend/configuration/test
writer. Independent test, structure, and rendered UX reviewers inspect frozen
changes; the coordinator maintains project documents and presents the result.

Acceptance evidence must distinguish:

- Declared near without direct access; direct access without declared near;
  and a pair with both relations.
- A real branching/cyclic fixture, not a redrawn linear chain.
- Semantic neighborhoods unchanged when only drawing coordinates change.
- Unknown proximity versus known none, without making up distance values.
- Declared and visible endpoints only; no inferred junction at line crossings.
- Selected neighborhood versus confirmed character neighborhood.
- Preserved character/location/time/events during selection, layer changes and
  interior/ancestor exploration.
- Truthful transit and unavailable/missing-layout/list states.
- Keyboard operation, readable labels, reflow and long content in both layers.

Run source gates and meaningful domain/fixture regressions, then Chromium and
the pinned corrected Firefox suite. Inspect representative actual renders and
repeat affected text-enlargement/reflow tasks. Record executed results and their
limitations below; do not turn intended checks into claims of success.

## Execution and evidence

Implementation and independent review preparation are in progress. The previous
checkpoint remains technical evidence for its original fixture, not approval
of the spatial relationship model identified in this correction.
