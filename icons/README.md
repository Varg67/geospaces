# GeoSpace Spatial Taxonomy & Semiotic Icon Catalog (`icons/`)

> [!NOTE]
> **Temporary Catalog & Asset Directory:** This `icons/` directory is a temporary reference catalog and asset registry created during GeoSpace foundation planning. It does not select or approve a frontend framework, bundler, database, or runtime architecture. Once an implementation structure is accepted in a later phase, these definitions and SVG assets will be migrated into the appropriate core and presentation modules.

## Purpose & Scope

GeoSpace models persistent spatial, temporal, and behavioral coherence for characters. While the **GeoSpace core** remains strictly independent of Kindroid-specific behavior, the **Warm Glass** visual direction and **District Network** map approach require clear, legible, and semiotically distinct iconography for two hierarchical levels of spatial nodes:

1. **Point-Level Urban Places (`PlaceTypeRegistry` — 341 types across 9 categories)**
   - Documented in [urban-places-taxonomy.md](urban-places-taxonomy.md).
   - Represents **stations / point nodes** on the District Network graph (buildings, establishments, transit stops, and focal meeting points within larger complexes).
   - Excludes areal polygons (districts, neighborhoods, entire parks, open university campuses, or full penitentiary complexes), which are represented as region polygons rather than point markers.

2. **Interior Rooms & Micro-Spaces (`InteriorRoomRegistry` — 248 types across 7 groups)**
   - Documented in [interior-rooms-taxonomy.md](interior-rooms-taxonomy.md).
   - Represents **sub-nodes (`Place` → `interior_room`)** nested inside a point-level urban place.
   - Enables fine-grained simulation of privacy boundaries, acoustic reach, line-of-sight witness rules, and locked/restricted access within the same building.

3. **Machine-Readable Registry (`catalog.json` — 589 total types + 48 custom SVG specs)**
   - Documented in [catalog.json](catalog.json).
   - Provides the single canonical JSON mapping of all 341 `urban_places`, 248 `interior_rooms`, category/group metadata, fallback icon names (`phosphor` and `lucide`), and the `custom_svg_manifest`.

---

## Warm Glass Visual & Semiotic Rules

All icons mapped or authored in this directory follow the accepted **Warm Glass** design blueprint ([docs/DESIGN.md](../docs/DESIGN.md)) and [docs/design-tokens.css](../docs/design-tokens.css):

| Parameter | Specification | Rationale |
| :--- | :--- | :--- |
| **ViewBox & Grid** | `0 0 24 24` (`24x24` logical grid) | Crisp alignment at `24px` (detail strips), `20px` (panels), and `16px` (compact station nodes). |
| **Stroke Width** | `2px` (`stroke-width="2"`) | Preserves non-text contrast and legibility over warm neutral surfaces (`--gs-canvas`, `--gs-surface`) and frosted glass (`--gs-glass-surface`). |
| **Caps & Joins** | `stroke-linecap="round"`, `stroke-linejoin="round"` | Matches the approachable, rounded pill and softened-bend geometry of Warm Glass and District Network lines. |
| **Color Binding** | `stroke="currentColor"`, `fill="none"` | Allows icons to inherit `--gs-text`, `--gs-primary` (coral selection emphasis), `--gs-on-primary`, or `--gs-spatial-accent` (mineral green) dynamically without hardcoded hex values. |
| **Color Independence** | Silhouette-first recognition | Per WCAG 2.2 AA and `docs/DESIGN.md`, spatial nodes never rely on color alone; each icon uses a distinct silhouette paired with visible text labels. |

---

## Standard Library Icons vs. Custom Semiotic SVGs

Each taxonomy entry in `urban-places-taxonomy.md`, `interior-rooms-taxonomy.md`, and `catalog.json` specifies two binding fields:

- **`icon_source`**:
  - `phosphor-lucide`: The place or room is cleanly represented by an existing open-source icon from **Lucide** or **Phosphor Icons** (with both `phosphor` and `lucide` identifiers recorded in `catalog.json` under `fallback_icons`).
  - `custom-svg`: Standard UI icon libraries lack a culturally accurate or semiotically distinct symbol for the space, so it binds to a bespoke GeoSpace SVG (`custom/<slug>`).
- **`icon_id`**:
  - Canonical identifier (e.g., `bread`, `hospital`, `gavel`, or `custom/terreiro-atabaque-altar`, `custom/sound-wall-baile`, `custom/biqueira-drop-hand`).

### Custom Semiotic SVG Manifest (48 Icons)

The `custom_svg_manifest` in [catalog.json](catalog.json) defines **48 custom semiotic SVGs** (`custom/*`) serving **98 taxonomy bindings** (60 urban places and 38 interior rooms) across culturally specific, religious, nightlife/adult, forensic/prison, and underworld spaces. All 48 SVG files are authored, verified on disk under [`icons/custom/`](custom/README.md), and adhere strictly to the `24x24` Warm Glass vector contract:

| Domain | Custom SVG Examples (`icon_id`) | Spaces Represented |
| :--- | :--- | :--- |
| **Brazilian Urban & Architectural** | `custom/shack-favela-roof`, `custom/gatehouse-barrier`, `custom/squat-occupied-banner`, `custom/street-kiosk-parasol`, `custom/plaza-gazebo-coreto`, `custom/varzea-dirt-goalpost` | Hillside shacks (`shack_tenement`), rooftop slabs (`rooftop_slab_laje`), condo gatehouses (`condo_gatehouse_portaria`), urban squats (`squat_occupied_building`), boardwalk/beach kiosks, square bandstands, and dirt soccer pitches. |
| **Nightlife, Hospitality & Adult** | `custom/boteco-billiard-beer`, `custom/hookah-narghile`, `custom/samba-surdo-drum`, `custom/sound-wall-baile`, `custom/love-motel-neon`, `custom/swing-interlocked-masks`, `custom/strip-stage-pole`, `custom/darkroom-blindfold-mask`, `custom/bdsm-crossed-cuffs` | Corner botecos, hookah lounges, samba school halls, street funk sound walls (`baile_sound_wall_stage`), drive-in love motels, swing clubs, strip stages, darkrooms, and fetish dungeons. |
| **Religion & Folk Spirituality** | `custom/orthodox-three-bar-cross`, `custom/spiritist-halo-book`, `custom/terreiro-atabaque-altar`, `custom/divination-cowrie-shells`, `custom/benzedeira-herb-branch`, `custom/masonic-square-compass`, `custom/crossroads-offering-candle` | Eastern Orthodox churches, Kardecist Spiritist centers & passe rooms, Umbanda/Candomblé terreiros (`terreiro_barracao`, `terreiro_ronco_camarinha`), cowrie-shell divination rooms (`divination_buzios_tarot_room`), folk healers (`folk_healer_benzedeira_house`), Masonic lodges, and crossroads offering points. |
| **Health, Wellness & Subculture** | `custom/caps-mental-care`, `custom/support-circle-chairs`, `custom/dojo-torii-belt`, `custom/tattoo-coil-machine`, `custom/acupuncture-needles` | Community psychosocial centers (`caps_mental_health_center`), psychiatric wards, AA/NA support circles, martial arts dojos/tatamis, tattoo studios/booths, and acupuncture clinics. |
| **Commerce, Work & Mobility** | `custom/open-air-market-stall`, `custom/headshop-hemp-pipe`, `custom/pawn-three-spheres`, `custom/tire-borracharia`, `custom/courier-helmet-bag`, `custom/helipad-circle-h`, `custom/driving-school-cone`, `custom/garment-sewing-machine`, `custom/escape-room-keyhole-clock`, `custom/shooting-range-earmuffs`, `custom/waterfall-pool-cascade` | Open-air street markets (`feira livre`), headshops, pawn shops & fences, tire repair (`borracharia`), courier rest hubs & dark kitchens, helipads, driving schools, sewing workshops, escape rooms, shooting ranges, and waterfalls/springs. |
| **Security, Forensics, Prison & Underworld** | `custom/safe-house-blind`, `custom/iml-forensic-tag`, `custom/prison-bars-window`, `custom/biqueira-drop-hand`, `custom/crack-pipe-smoke`, `custom/clandestine-lab-mask`, `custom/grow-house-uv-leaf`, `custom/chop-shop-car-saw`, `custom/weapons-crate-ammo`, `custom/captivity-padlock-chain` | Safe houses & secret passages, forensic morgues (`forensic_morgue_iml`, `autopsy_room_iml`), prison cellblocks & holding cells, street drug points (`drug_dealing_spot_biqueira`), crack dens, clandestine drug labs, indoor grow houses, vehicle chop shops (`chop_shop_desmanche`), illegal armories, and captivity/kangaroo-court rooms. |

---

## Directory Contents

| File | Description |
| :--- | :--- |
| [README.md](README.md) | Overview of the `icons/` catalog, Warm Glass visual rules, and icon resolution model. |
| [urban-places-taxonomy.md](urban-places-taxonomy.md) | Complete English taxonomy table of all **341 point-level urban places** across 9 categories. |
| [interior-rooms-taxonomy.md](interior-rooms-taxonomy.md) | Complete English taxonomy table of all **248 interior rooms** across 7 groups (A–G). |
| [catalog.json](catalog.json) | Canonical JSON registry containing all 589 spatial types, category/group schemas, fallback icons, and the 48-icon `custom_svg_manifest`. |
| [custom/README.md](custom/README.md) | Semiotic design principles and complete inventory linking all **48 custom SVG files** (`icons/custom/*.svg`) to their urban places and interior rooms. |
| [QA_REPORT.md](QA_REPORT.md) | Quality control & semiotic audit report recording 1-to-1 integrity checks, icon identifier fixes, `24x24` SVG specifications, and on-disk XML/geometry verification of all 48 custom SVGs. |
