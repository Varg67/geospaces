# GeoSpace Design Blueprint

Status: accepted Warm Glass visual direction, light palette, Companion desktop
layout, District Network map approach, and hierarchical interior exploration.
Approved: 2026-11-16 (America/Sao_Paulo), by the user in the frontend design
discussion. The user accepted the revised Warm Glass study and requested that
the choice be recorded, validated, and committed.
The user subsequently selected the Companion layout for the Weak desktop
experience on the same date and requested that the choice be validated.
The user then selected District Network for Weak, emphasizing the relationship
between networks, polygonal regions, and territorial belonging.
The user subsequently approved the demonstrated Home-to-interior navigation
on the same date, after exploring the interactive study.

## Intent and scope

GeoSpace should feel visually compatible with Kindroid while preserving a clear
identity for spatial observation. Compatibility with Kindroid's palette and
surface language is an explicit user requirement.

This decision governs art direction, the initial light palette, and material
usage, plus the desktop composition described below. It does not select a
framework, component library, database, application architecture, complete
navigation model, or integration contract. The GeoSpace simulation
core remains independent of Kindroid-specific behavior.

The user subsequently approved the
[frontend implementation plan](plans/frontend-implementation.md), selecting
React, TypeScript, Vite, CSS, and authored SVG presentation for a local-browser
interface. That separate decision governs implementation and review checkpoints;
it does not select the engine, database, or Kindroid integration architecture.

## Accepted direction: Warm Glass

Use warm neutral backgrounds, coral/terracotta actions, dark neutral text, and
restrained frosted-glass overlays. Keep mineral green as a secondary spatial
accent. This evolves the previously explored Field Notes direction toward the
Kindroid reference. Atlas Mineral and Observatory remain unselected alternatives.

The signature is a softly frosted control layer over a quiet spatial canvas.
Depth communicates overlap and hierarchy. It must not compete with places,
connections, timestamps, or readable content.

## Reference evidence and provenance

The following observations were made on 2026-11-16:

- [Kindroid's public login](https://kindroid.ai/login/) was inspected visually
  and through computed styles. Its social-login buttons used translucent white,
  a 25px backdrop blur, and light borders. The primary button used the RGB base
  corresponding to GeoSpace's primary token at 92% opacity; heading text used
  the RGB value corresponding to GeoSpace's primary text token. Rounded pill
  controls and warm neutrals were visible.
- [Kindroid's appearance documentation](https://kindroid.ai/v2/docs/chat-features-and-tools/#appearance)
  described Coral as the default accent, alternative/custom accent colors, and
  Light, System, and Dark appearance modes.

These are dated public references, not an official Kindroid token specification.
Authenticated V2 screens were not inspected. The use of the term glassmorphism
is our interpretation of the observed translucent and blurred surfaces, not a
claim about an officially named design system.

No Kindroid images, logos, proprietary fonts, or application code were copied.
The selected colors adapt the reference for GeoSpace. Visual compatibility does
not establish automatic inheritance of the host's theme or user preferences.

## Accepted desktop layout: Companion

The primary Weak experience is a separate, resizable PC window centered on
observing a character within the world. The selected composition has a persistent
character panel on the left, a larger spatial canvas on the right, and details
of the selected place beneath that canvas. Recent character events expand within
the left panel. The overall shell remains horizontal.

This selection follows comparison with Workspace, Immersive, Chronicle,
Panorama, and Nested Atlas. Companion was chosen by the user; the other layouts
are not concurrent requirements or additional modes to implement.

### Regions and sizing rationale

Use 1440 by 900 logical pixels of content area as a design reference, excluding
browser and operating-system chrome. This is not a fixed aspect ratio or a
minimum supported resolution. Dimensions below are starting targets for
refinement, not a claim of measured usability.

| Region | Starting target | Purpose and rationale |
| --- | --- | --- |
| Header | 56 px high | App identity and current world/context with limited vertical overhead |
| Character panel | About 360 px wide | Persistent identity, confirmed location, recorded activity, state timestamp, and recent events |
| Right workspace | Remaining width, about 1080 px | Gives spatial relationships most of the available horizontal space |
| Character identification | About 64 px | Recognizable identity without making the portrait dominate the information |
| Selected-place strip | About 96 px high within the right workspace | Keeps inspected place details separate from the character's actual state |
| Panel padding | 16–24 px | Separates groups and maintains readable text near panel edges |
| State footer | About 24 px high, allowed to grow | Brief freshness/source information without forcing important text to clip |

The conversation preview used an illustrative 30/70 split and a 64 px header;
the accompanying desktop proposal used approximately 25/75 and 56 px.
Approval establishes the composition, not pixel-perfect equivalence between
the scaled preview and those target dimensions. Resolve the final widths with
real content in the implementation prototype.

### Interaction and information rules

- Keep the observed character's confirmed location separate from the selected
  place. Selecting Home must not move a character who is recorded at the cafe.
- Show an explicit unknown or not-recorded state for missing activity or
  location information. Do not invent narrative details to fill the panel.
- Display the timestamp of the represented simulation state. Do not imply that
  a wall-clock display proves the simulation is current.
- Keep recent events next to the character context; expanding them must preserve
  access to location and timestamp. Detailed history navigation remains open.
- Use an abstract place graph in Weak. Its node placement is a presentation
  choice, not geographic distance or proof of travel duration.
- Preserve visibility rules for character information and events. A desktop
  detail view does not imply access to hidden or private state.
- Use opaque surfaces for the character text and place details. Reserve Warm
  Glass for appropriate floating controls and overlays; the layout does not
  require making every region translucent.

### Resizing, future phases, and integration

Additional desktop width should primarily expand the world canvas. Keep text
columns within readable bounds rather than stretching them in proportion to an
ultrawide monitor. For smaller windows, refine panel collapse/reflow and keyboard
access without scaling text down. Minimum dimensions and breakpoints remain open.
Phone layouts are outside the current layout task.

Preserve the distinction between character context, spatial presentation, and
selected-place details as Mid and Strong requirements become available. The
layout leaves room for a richer spatial view, but does not approve geometry,
multi-agent features, new controls, or those phases' architecture in advance.

A compact Kindroid companion view is a candidate secondary surface. Its layout,
communication, synchronization, and external-window opening behavior remain
unapproved and unverified. The desktop layout does not depend on those capabilities.

### Decision validation

On 2026-11-16, the accepted composition was checked against the Warm Glass
surface rules and Weak's separation of confirmed state, observation, unknown
information, and spatial hierarchy/connectivity. Documentation consistency,
local links, and whitespace were checked after recording this decision.

The conversation study contains fictional data and presentation-only selection
and event-expansion handlers. No simulation or authenticated integration runs
behind it. Browser-rendered usability, exact sizing, keyboard interaction,
overflow, zoom/reflow, and accessibility of the implemented Companion interface
remain to be tested; this record validates the design decision, not a finished UI.

## Accepted map approach: District Network

Approved by the user on 2026-11-16 for the first version. Within Companion's
spatial canvas, combine a metro-inspired topological network with softly shaded,
labeled district regions. Warm Glass remains the overall visual direction.

The user's rationale is that spatial networks relate to territories, expressed
visually as polygons. For Weak, interpret these as schematic territorial regions
showing belonging. Territoriality motivates the design; a polygon alone does
not establish ownership, access rights, social control, or a model of those
relationships. Those semantics would require separate definitions.

During final frontend review on 2026-11-17, the user clarified that spatial
proximity and traversable access are independent. A place can be near several
others even when there is no direct passage. The initial sequential urban
fixture failed to communicate that neighborhood. The accepted correction keeps
the metro visual language while making the relationships explicit and distinct;
see the [spatial network correction](plans/spatial-network-correction.md).

### Three complementary representations

| Representation | Meaning in Weak | Visual treatment |
| --- | --- | --- |
| Region / polygon | Parent district or other explicitly defined spatial grouping | Subtle fill, readable label, unobtrusive boundary |
| Station / node | A place at the displayed level | Legible named marker; distinguish selection from character presence |
| Line / edge | An explicitly defined relationship in the displayed layer: spatial proximity or traversable access | Organized horizontal, vertical, or 45-degree segments, with softened bends; clear layer identity |

Containment, proximity and traversable access remain separate: two places in
the same district are not automatically nearby or connected, and adjacent
districts do not automatically permit passage. An explicit relation may cross
a region boundary. Nearby places may lack direct access, and a traversable
connection alone does not assert proximity. Crossing strokes only connect at
an explicit place/junction marker.

Region shape and size are schematic, not surveyed boundaries, real area, or
distance. Similarly, line length does not encode travel time. Display durations
from defined connection data when inspecting a place or connection; unknown
durations remain unknown. Do not infer them from the drawing.
Proximity observations do not carry inferred travel durations or metric
distances. Neither proximity nor access is derived from screen coordinates.

The selected study used rounded region containers as a visual stand-in for
territories. Exact polygon contours, boundary styling, and region-layout rules
remain to be refined. No real cartography, GPS, or geometry engine is approved.

### Appearance and interaction boundaries

- Keep region fills subordinate to station names and connections. Name each
  district so its identity does not rely on color alone.
- Use the approved mineral-green spatial accent for connections and coral for
  selection emphasis. Multiple colored metro lines need explicit meanings
  before they are introduced; arbitrary route colors are not approved.
- Place the character marker at its confirmed place, or represent a confirmed
  journey on its connection. Selecting another station must not move it.
- Show neighborhoods with branching relationships, rather than imposing a
  sequence of stops. Nearby is the initial relationship layer; Access exposes
  traversable connections separately. Selected-place neighbors and the
  character's confirmed-place neighbors have distinct context labels. Recorded
  transit uses access geometry only, through an explicit view action when the
  Nearby layer is displayed.
- Preserve the selected-place details beneath the canvas and character context
  at the left, as specified by Companion.
- Nested places such as buildings and rooms retain their actual hierarchy;
  selection, interior exploration, and ancestor navigation follow the accepted
  interaction below.
- Journey Focus remains an explored alternative. Route preview, route planning,
  and automatic route highlighting are not implied by selecting District Network.

### Validation and remaining work

The decision was checked for consistency with Companion, Warm Glass, and Weak's
separation of hierarchy, traversable connections, and confirmed state. Local
document links and whitespace were checked when recording it. The example data
are fictional; map interaction, polygon containment, collision avoidance,
readability with a larger network, keyboard access, and rendering in the actual
application have not been validated. No layout algorithm or graph library has
been selected.

## Accepted interaction: hierarchical interior exploration

Approved by the user on 2026-11-16 after the Home interior demonstration.
The same Companion canvas shows the currently explored spatial level, preserving
the character panel and selected-place details.

| User action | Visible result | Simulation effect |
| --- | --- | --- |
| Select Home in the district network | Highlight Home and show its details plus Explore interior when available | None |
| Activate Explore interior | Replace the district view with Home's defined interior network | None |
| Select an interior place | Highlight it and show its defined passages and parent context | None |
| Activate an ancestor in the breadcrumb | Return to that level; returning to the district reselects Home | None |

Use an explicit exploration action after selection, rather than requiring a
double-click or making an ordinary selection unexpectedly change levels.
Provide the same actions through keyboard-accessible controls.

### Spatial meaning and information continuity

- At district level, the containing region represents the district and stations
  represent its places. Inside Home, the region represents the house and stations
  represent defined interior places, including rooms and circulation spaces.
- Internal lines represent actual defined passages. Shared parentage alone does
  not establish a direct passage between two rooms. The drawing remains
  schematic rather than an architectural floor plan.
- Show the explored hierarchy through a breadcrumb, for example Example world
  / North district / Home. Ancestors are navigation targets; the current level
  is identified as such. Ancestor navigation uses the actual stored hierarchy.
- Preserve the observed character, confirmed location, activity, and state
  timestamp while exploring. If Ana is at the cafe, exploring Home does not
  display her in any room or record a journey, arrival, visit, or time advance.
- If only Home is known as the character's location, show that the room is
  unknown rather than selecting an arbitrary interior position.
- Offer interior exploration only when an authorized, defined interior is
  available. Otherwise state that the interior is undefined or unavailable,
  without inventing rooms or revealing restricted contents.
- The demonstration's rooms, names, and passage network are fictional examples,
  not a mandatory house template. A place without children remains selectable.

### Validation boundary

The approved flow was reviewed for consistency with Companion, District Network,
observation-only selection, hierarchy, connectivity, unknown state, and visibility
rules. Local links, Markdown anchors, whitespace, and consistency of decision
status were checked when recording this approval.

The conversation demonstration implements presentation-only district/interior
switching, room selection, and return navigation. Full breadcrumb behavior at
additional levels, persistence of the view, long hierarchies, empty or restricted
interiors, keyboard/focus behavior, and rendered accessibility in the application
still require implementation and testing. Approval establishes the interaction
design; it does not establish engine or platform verification.

## Canonical color and material values

[design-tokens.css](design-tokens.css) is the canonical source of literal values.
It is a portable CSS reference, not a functioning application or a stack choice.
The scoped theme class must not overwrite Kindroid's global styles.

| Token | Role and usage |
| --- | --- |
| `--gs-canvas` | Warm neutral background for the main workspace |
| `--gs-surface` | Opaque surface for text, detail panels, and dense content |
| `--gs-text` | Primary text, including text on approved glass surfaces |
| `--gs-text-secondary` | Supporting text on opaque canvas or surface only |
| `--gs-primary` | Coral/terracotta actions and selection emphasis |
| `--gs-on-primary` | Labels on solid primary fills |
| `--gs-spatial-accent` | Secondary spatial emphasis; not a generic success color |
| `--gs-border-decorative` | Decorative separation only |
| `--gs-border-interactive` | Boundary when needed to identify a control |
| `--gs-focus` | Visible keyboard-focus indicator on the light palette |
| `--gs-glass-surface` | Starting frosted overlay fill; validate its actual backdrop |
| `--gs-glass-border` | Decorative highlight on glass, not a control identifier |
| `--gs-glass-blur` | Starting blur from the approved visual study |

## Surface and component grammar

- Use glass selectively for floating controls, toolbars, and overlays.
- Use opaque surfaces for dense text, forms, histories, and detail views.
- Use solid primary fills for primary actions so label contrast is predictable.
- Prefer soft corners, thin borders, and discreet shadows. Pill shapes suit
  compact controls; they are not a requirement for every panel.
- Use the primary-text token on glass. Do not place secondary text directly on
  a translucent surface without measuring the composed background.
- Decorative borders and shadows must not be the only means of identifying an
  actionable element. Use the interactive border or another contrasting cue.
- Pair spatial colors with labels, shapes, or other visible identifiers. Do not
  rely on color alone for presence, selection, or status.
- Cover hover, focus, pressed, selected, disabled, loading, empty, error, and
  success states when real components are implemented. State palettes and
  destructive-action colors remain to be designed.

## Typography, layout, assets, and motion

The study used system sans-serif typography. The Weak implementation retains a
local sans-serif fallback stack, tabular timestamps, and centralized spacing and
control rules in `frontend/src/styles/foundations.css`. Executable type sizes,
spacing, radii and responsive rules belong in those styles rather than a second
table here. No external font is downloaded.
Keep body text legible and reserve tabular numerals for comparable timestamps
and durations. Do not introduce a licensed brand font without a separate choice.

Keep the spatial content visually dominant. Layout should reflow as the window
narrows and as text grows. Do not shrink the entire desktop canvas to make labels
fit. Companion establishes the desktop region layout; detailed navigation,
editing workflows, and information architecture beyond those regions remain open.

The approved frontend plan resolves canonical custom SVGs first, then available
Lucide bindings, with Phosphor alternatives only when needed. The current
catalog is covered by the custom assets and Lucide alone. Preserve the 24×24
source grid, rounded two-pixel stroke language, `currentColor`, and visible place
names. Station, panel/list and detail symbols use the catalog's 16/20/24px roles;
metro junction rings, selection and presence remain separate cues. Decorative
assets must not imply real places or simulated events that have not been
established. Attribution and distribution notices live in `frontend/NOTICE.md`.

Motion should communicate state or position changes, remain interruptible, and
respect reduced-motion preferences. Continuous shimmer, pulsing, and moving
glass backgrounds are outside the chosen direction.

## Accessibility and validation

Target WCAG 2.2 AA during component implementation. Apply the W3C guidance on
[text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
Normal text needs at least 4.5:1; essential non-text cues need at least 3:1
against adjacent colors. Compare unrounded results to the threshold.

Validation performed on 2026-11-16: sRGB relative-luminance calculations for the
canonical opaque colors, inspection of local documentation links, token
references, whitespace, and the change scope. Displayed ratios are rounded.

| Pair | Contrast | Scope |
| --- | --- | --- |
| Primary text / canvas | 12.47:1 | Normal text |
| Primary text / opaque surface | 13.94:1 | Normal text |
| Secondary text / canvas | 4.56:1 | Normal text; limited margin |
| Secondary text / opaque surface | 5.10:1 | Normal text |
| Primary-action label / solid primary fill | 5.04:1 | Normal text |
| Primary fill / canvas | 4.44:1 | Essential non-text cue |
| Spatial accent / canvas | 5.47:1 | Normal text and meaningful graphics |
| Spatial accent / opaque surface | 6.11:1 | Normal text and meaningful graphics |

The decorative border is below 3:1 against both opaque backgrounds. It is
deliberately restricted to decorative separation; the interactive-border token
uses the stronger secondary-text color instead. Coral is not approved for small
text directly on the canvas because that pairing is below 4.5:1.

These checks validate the listed opaque pairs, not the accessibility of a full
interface. Actual translucent composites, images, zoom/reflow, keyboard behavior,
assistive technology, and responsive components require rendered checks when an
application exists. No browser-rendered application, authenticated Kindroid
integration, or complete WCAG conformance is claimed by this decision record.

## Open decisions and acceptance checks

- Design a corresponding dark palette; do not infer its values by inversion.
- Determine whether the integration exposes supported theme information before
  attempting to follow Kindroid's appearance settings automatically.
- Keep typography, icons, spacing, radii, and states aligned with the implemented
  components and canonical tokens, preserving this direction.
- Validate actual glass backgrounds and provide opaque fallbacks when blur is
  unsupported or reduced transparency is required.
- Use the frontend checkpoint reports for executed keyboard, focus,
  color-independent meaning, text/reflow, target-size, long-content and
  reduced-motion evidence. Native browser zoom, assistive technology and actual
  glass composites need separate validation; do not infer conformance from
  automated checks alone.

Future visual changes should update this blueprint and the canonical tokens
together. A materially different palette or material language requires a new
user decision.
