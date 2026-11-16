# GeoSpace Design Blueprint

Status: accepted visual direction and light palette.
Approved: 2026-11-16 (America/Sao_Paulo), by the user in the frontend design
discussion. The user accepted the revised Warm Glass study and requested that
the choice be recorded, validated, and committed.

## Intent and scope

GeoSpace should feel visually compatible with Kindroid while preserving a clear
identity for spatial observation. Compatibility with Kindroid's palette and
surface language is an explicit user requirement.

This decision governs art direction, the initial light palette, and material
usage. It does not select a framework, component library, database, application
architecture, navigation model, or integration contract. The GeoSpace simulation
core remains independent of Kindroid-specific behavior.

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

The study used system sans-serif typography. A final typeface, type scale,
spacing scale, icon library, and component dimensions have not been selected.
Keep body text legible and reserve tabular numerals for comparable timestamps
and durations. Do not introduce a licensed brand font without a separate choice.

Keep the spatial content visually dominant. Layout should reflow as the window
narrows and as text grows. Do not shrink the entire desktop canvas to make labels
fit. Navigation and information architecture remain open.

Use one consistent icon style once a library is selected. Decorative assets must
not imply real places or simulated events that have not been established.

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
- Select typography, icons, spacing, radii, and state colors with representative
  components, preserving this direction.
- Validate actual glass backgrounds and provide opaque fallbacks when blur is
  unsupported or reduced transparency is required.
- Check keyboard focus, color-independent meaning, zoom, touch targets, long
  content, reduced motion, and narrow viewports in the future application.

Future visual changes should update this blueprint and the canonical tokens
together. A materially different palette or material language requires a new
user decision.
