# GeoSpace Spatial Taxonomy & Semiotic Icon Catalog — QA & Semiotic Audit Report (`QA_REPORT.md`)

**Auditors:** Agent 2 (Quality Control & Semiotic Auditor) & Agent 3 (Semiotic SVG Icon Designer & Builder)  
**Date:** 2026-11-16 (America/Sao_Paulo)  
**Status:** Verified — All 589 Taxonomy Entries & All 48 Custom Semiotic SVG Files Created and Validated on Disk

> [!NOTE]
> **Verification Boundary:** This report records static quality-control checks, 1-to-1 schema and ID cross-referencing, English translation and roleplay semantics auditing, standard icon library identifier validation, and 24x24 geometric specification refinement for the temporary `icons/` catalog. It does not select an implementation framework or claim browser-rendered UI testing.

---

## 1. Executive Summary

| Audit Dimension | Scope Checked | Issues Found & Corrected | Final Status |
| :--- | :--- | :--- | :--- |
| **1. Completeness & 1-to-1 Integrity** | `341` urban places (`type_id`) + `248` interior rooms (`room_type_id`) = `589` total types across `catalog.json`, `urban-places-taxonomy.md`, `interior-rooms-taxonomy.md`, and the two original PT-BR source catalogs. | `0` missing, `0` duplicated, `0` reordered, and `0` corrupted IDs. | **PASS (589 / 589)** |
| **2. English Translation & Roleplay Semantics** | `name_en`, `roleplay_semantics_en`, and `semiotic_cue` across all `589` entries and `48` custom SVG manifest items. | `6` entries had `semiotic_cue` descriptions that drifted from their assigned `icon_id` or `custom_svg_manifest` geometry; all `6` were harmonized. | **PASS (589 / 589)** |
| **3. Standard Icon Library Bindings (`phosphor-lucide`)** | `icon_id`, `fallback_icons.phosphor`, and `fallback_icons.lucide` across all `589` entries (`314` unique standard `icon_id`s, `311` Phosphor icons, `271` Lucide icons). | Fixed `5` uppercase typos, `14` non-existent library icon names (`9` distinct invalid slugs), and `7` `icon_id` vs. `fallback_icons` mismatches (`26` total binding corrections). | **PASS (100% kebab-case & valid)** |
| **4. Custom Semiotic SVG Manifest & Files (`custom-svg`)** | `48` custom SVG definitions (`custom/*`) and on-disk `.svg` files in `icons/custom/` serving `98` total taxonomy bindings (`60` urban places + `38` interior rooms). | Refined all `48` `design_notes_24px` specifications in `catalog.json` and authored all `48` SVG files (`339` total vector primitives, `100%` within `[2..22]` safe coordinate zone). | **PASS (48 / 48 SVGs created & verified on disk)** |

---

## 2. Completeness & 1-to-1 Integrity Audit

Automated and line-by-line verification was performed comparing:
- Source Urban Places Catalog (`point_place_types_catalog.md` — 341 types) $\leftrightarrow$ [urban-places-taxonomy.md](urban-places-taxonomy.md) $\leftrightarrow$ `catalog.json["urban_places"]`
- Source Interior Rooms Catalog (`interior_rooms_catalog.md` — 248 types) $\leftrightarrow$ [interior-rooms-taxonomy.md](interior-rooms-taxonomy.md) $\leftrightarrow$ `catalog.json["interior_rooms"]`

### Verified Category & Group Counts

| Registry | Category / Group ID | Name | Expected | Verified |
| :--- | :--- | :--- | :--- | :--- |
| `PlaceTypeRegistry` | `1. residential_lodging` | Residential & Lodging | 28 | 28 |
| `PlaceTypeRegistry` | `2. food_cafe_nightlife` | Food, Cafe & Nightlife | 38 | 38 |
| `PlaceTypeRegistry` | `3. health_medical_wellness` | Health, Medical & Wellness | 33 | 33 |
| `PlaceTypeRegistry` | `4. commerce_services_mobility` | Everyday Commerce, Services & Mobility | 63 | 63 |
| `PlaceTypeRegistry` | `5. education_research_work` | Education, Research & Work | 46 | 46 |
| `PlaceTypeRegistry` | `6. culture_leisure_sports` | Culture, Leisure, Sports & Entertainment | 32 | 32 |
| `PlaceTypeRegistry` | `7. nature_open_spaces_points` | Nature & Open Spaces (Strict Point Nodes) | 25 | 25 |
| `PlaceTypeRegistry` | `8. religion_spirituality` | Religion & Spirituality | 24 | 24 |
| `PlaceTypeRegistry` | `9. security_justice_civic_underworld` | Security, Justice, Civic & Underworld | 52 | 52 |
| **Subtotal** | **`urban_places`** | **Point-Level Urban Places** | **341** | **341** |
| `InteriorRoomRegistry` | `Group A: residential_rooms` | Residential Rooms (Common, Working-Class & High-End) | 39 | 39 |
| `InteriorRoomRegistry` | `Group B: building_common_lodging_transit_cabins` | Building Commons, Hotels, Motels & Transit Cabins | 31 | 31 |
| `InteriorRoomRegistry` | `Group C: hospitality_nightlife_adult_interiors` | Dining, Bars, Nightclubs & Adult Venue Interiors | 31 | 31 |
| `InteriorRoomRegistry` | `Group D: healthcare_clinical_wellness_interiors` | Hospitals, Clinics, Wellness & Personal Care Interiors | 37 | 37 |
| `InteriorRoomRegistry` | `Group E: education_office_retail_industrial_interiors` | Education, Offices, Retail & Industrial Interiors | 41 | 41 |
| `InteriorRoomRegistry` | `Group F: religious_cultural_sports_event_interiors` | Religious, Cultural, Sports & Event Venue Interiors | 29 | 29 |
| `InteriorRoomRegistry` | `Group G: security_justice_prison_underworld_interiors` | Security, Justice, Prison & Underworld Interiors | 40 | 40 |
| **Subtotal** | **`interior_rooms`** | **Interior Rooms & Micro-Spaces** | **248** | **248** |
| **Grand Total** | **`total_taxonomy_types`** | **Combined GeoSpace Spatial Taxonomy** | **589** | **589** |

- **Uniqueness & Disjointness:** Zero duplicate `type_id` values, zero duplicate `room_type_id` values, and zero identifier collision between `urban_places` and `interior_rooms`.
- **Manifest Bidirectionality:** Every `used_by_urban_places` (`60` bindings) and `used_by_interior_rooms` (`38` bindings) array in `custom_svg_manifest` matches the exact set of entries with `icon_source: "custom-svg"`.

---

## 3. English Translation & Semiotic Cue Audit

All `589` entries were audited for natural English phrasing, roleplay nuance preservation, and absence of untranslated Portuguese outside of intentional cultural loanwords in parentheses — e.g., *(Barraco)*, *(Laje)*, *(Portaria)*, *(República)*, *(Boteco / Pé-Sujo)*, *(Fluxo / Paredão)*, *(Terreiro)*, *(Biqueira / Boca de Fumo)*, *(Mocó)*, *(Desmanche)*, *(Cativeiro)*, *(Tribunal do Crime)*.

### Semiotic Cue Corrections Applied (6 Entries)

| Registry & Index | Identifier | Issue Identified | Corrected `semiotic_cue` |
| :--- | :--- | :--- | :--- |
| `urban_places` #281 | `ayahuasca_shamanic_temple` | Minor phrasing drift relative to `custom/benzedeira-herb-branch`. | `Sacred botanical herb sprig with ritual water droplets` |
| `urban_places` #282 | `folk_healer_benzedeira_house` | Mentioned a hand silhouette not present in the `24x24` `custom/benzedeira-herb-branch` stroke design. | `Ritual rue herb sprig (ramo de arruda) with blessing water droplets` |
| `urban_places` #328 | `clandestine_medical_clinic` | Claimed a composite `"Medical cross combined with hazard skull cue"` while bound to standard `skull`. | `Hazard skull emblem denoting illicit off-the-books clinic` |
| `urban_places` #331 | `gang_syndicate_hideout` | Claimed `"Cranium emblem over crossed reticles"` while bound to standard `skull`. | `Stark skull emblem denoting syndicate stronghold` |
| `urban_places` #334 | `smuggler_dock_clandestine_airstrip` | Claimed `"Stealth anchor and low-flight wing cue"` while bound to standard `anchor`. | `Heavy maritime anchor marking covert landing point` |
| `urban_places` #336 & `interior_rooms` #206 | `underground_fight_ring`, `combat_ring_octagon_cage` | Bound to `custom/dojo-torii-belt`, but cues described `"Octagon cage mesh with crossed combat fists"` / `"combat ring corner"`. Harmonized with the `custom/dojo-torii-belt` design (lintel beam + tied black belt). | `Tied martial arts black belt beneath a minimalist dojo/ring beam` |

---

## 4. Standard Icon Library (`phosphor-lucide`) Audit & Fixes

All `icon_id`, `fallback_icons.phosphor`, and `fallback_icons.lucide` values were audited against **Phosphor Icons (v2)** and **Lucide Icons** naming conventions (`lowercase` `kebab-case`).

### 4.1. Case-Sensitivity Fixes (`5` Entries)

| Registry & Index | Identifier | Field | Previous Value | Corrected Value |
| :--- | :--- | :--- | :--- | :--- |
| `urban_places` #118 | `jewelry_watch_store` | `fallback_icons.phosphor` | `Sketch-logo` | `sketch-logo` |
| `urban_places` #157 | `intercity_bus_station_rodoviaria` | `fallback_icons.phosphor` | `Suitcase-rolling` | `suitcase-rolling` |
| `urban_places` #252 | `hang_gliding_paragliding_ramp` | `fallback_icons.phosphor` | `Parachute` | `parachute` |
| `urban_places` #295 | `federal_police_immigration_hq` | `fallback_icons.phosphor` | `Identification-badge` | `identification-badge` |
| `interior_rooms` #105 | `public_er_stretcher_corridor` | `fallback_icons.phosphor` | `First-aid` | `first-aid` |

### 4.2. Invalid / Non-Existent Library Icon Replacements (`14` Entries)

| Invalid Name | Reason Invalid | Affected Entries | Corrected `icon_id` & `fallback_icons` |
| :--- | :--- | :--- | :--- |
| `bunk-bed` | Does not exist in Phosphor or Lucide (`bed` / `bed-double` exist). | `workers_dormitory_alojamento` (#17), `shared_bunk_bedroom` (Room #10), `hostel_shared_dorm_room` (Room #62) | #17: `icon_id: "bed-double"` (`P: bed`, `L: bed-double`); Rooms #10 & #62: `icon_id: "bed"` (`P: bed`, `L: bed`) |
| `heart-fire` | Does not exist in Phosphor or Lucide (`flame` exists in both). | `adult_sex_shop` (#132) | `icon_id: "flame"` (`P: flame`, `L: flame`) |
| `monument` | FontAwesome slug; not in Phosphor or Lucide (`landmark` in Lucide, `columns` in Phosphor). | `historic_monument_memorial` (#218) | `icon_id: "landmark"` (`P: columns`, `L: landmark`) |
| `lockers` | Plural form does not exist in Phosphor v2 or Lucide; Phosphor v2 uses singular `locker`. | `self_storage_locker_facility` (#140), `school_hallway_lockers` (Room #149) | `icon_id: "locker"` (`P: locker`, `L: package` / `columns-3`) |
| `scalpel` | Does not exist in Phosphor or Lucide. | `operating_theater` (Room #116), `underground_surgery_operating_room` (Room #245) | Room #116: `icon_id: "activity"` (`P: pulse`, `L: activity`); Room #245: `icon_id: "scissors"` (`P: scissors`, `L: scissors`) |
| `stadium` | Does not exist in Phosphor (`trophy` / `medal` exist). | `stadium_bleachers_gate` (#240) | `icon_id: "medal"` (`P: trophy`, `L: medal`) |
| `teacup` | Does not exist in Phosphor (`coffee` exists). | `tea_house_boba_cafe` (#31) | `icon_id: "cup-soda"` (`P: coffee`, `L: cup-soda`) |
| `concierge-bell` (in Phosphor) | Valid in Lucide (`concierge-bell`), but Phosphor's icon is `call-bell`. | `building_lobby` (Room #41) | `icon_id: "concierge-bell"` (`P: call-bell`, `L: concierge-bell`) |
| `chain` (in Phosphor) | Phosphor's icon is `link`, not `chain`. | `captivity_hostage_room` (Room #246) | `icon_id: "custom/captivity-padlock-chain"` (`P: link`, `L: lock`) |

### 4.3. Deterministic `icon_id` $\leftrightarrow$ `fallback_icons` Alignment (`7` Entries)

For every entry with `icon_source: "phosphor-lucide"`, `icon_id` was verified to match either `fallback_icons.phosphor` or `fallback_icons.lucide`:
- `fast_food_drive_thru` (#33): aligned `fallback_icons.lucide` to `"sandwich"` (matching `icon_id: "sandwich"`).
- `crossfit_functional_box` (#91): aligned `fallback_icons.phosphor` to `"barbell"` (matching `icon_id: "barbell"`).
- `municipal_market_hall` (#105): aligned `fallback_icons.phosphor` to `"storefront"` (matching `icon_id: "storefront"`).
- `airport_passenger_terminal` (#161): aligned `fallback_icons.lucide` to `"plane-takeoff"` (matching `icon_id: "plane-takeoff"`).
- `school_aviation_flight` (#177): aligned `fallback_icons.lucide` to `"plane"` (matching `icon_id: "plane"`).
- `public_defender_office` (#302): aligned `fallback_icons.phosphor` to `"scales"` (matching `icon_id: "scales"`).
- `bathroom_full` (Room #15): aligned `fallback_icons.lucide` to `"shower-head"` (matching `icon_id: "shower-head"`).

---

## 5. Verified Custom Semiotic SVG Specification Handoff for Agent 3 (`48` Icons)

### Global SVG Authoring Contract (Warm Glass Compliance)
Every SVG created by **Agent 3 (Semiotic SVG Icon Designer)** in [`icons/custom/<slug>.svg`](custom/README.md) obeys:
1. **Root Attributes:** `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`
2. **Safe Coordinate Canvas:** Keep primary geometry within `x, y ∈ [2..22]` (`2px` outer padding) so `2px` rounded strokes never clip at `16px`, `20px`, or `24px`.
3. **Stroke Separation & Silhouette Legibility:** Maintain at least `2px` clearance between parallel strokes where possible so icons remain crisp at `16px` station markers on the District Network canvas. Use `fill="none"` (pure monochrome `currentColor` stroke paths).

### Complete 48-Icon Geometric Specification Table

| # | `icon_id` | Target File Path | Bound Urban Places (`60`) | Bound Interior Rooms (`38`) | Verified `24x24` Geometric Specification (`design_notes_24px`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `custom/shack-favela-roof` | [`custom/shack-favela-roof.svg`](custom/shack-favela-roof.svg) | `shack_tenement` | `rooftop_slab_laje` | Flat cantilevered concrete roof slab line at `y=10` (`x=3..21`), low pitched corrugated roof segment above left (`x=4..14`, peak `y=5`), and rectangular masonry dwelling box below (`x=4..20, y=10..21`) with off-center door (`x=7..11, y=14..21`), small window (`x=14..18, y=13..16`), and brick course tick at `y=17`. |
| 2 | `custom/gatehouse-barrier` | [`custom/gatehouse-barrier.svg`](custom/gatehouse-barrier.svg) | `condo_gatehouse_portaria` | `gatehouse_concierge`, `truck_weighbridge_gatehouse` | Compact sentry booth on left (`x=2..10, y=9..21`) with roof overhang (`x=2..11, y=9`) and glazed window pane (`x=4..8, y=12..16`). Pivot post at `(10,15)` with diagonal boom barrier arm rising from `(10,15)` to `(22,6)` marked by two short perpendicular stripe ticks. |
| 3 | `custom/squat-occupied-banner` | [`custom/squat-occupied-banner.svg`](custom/squat-occupied-banner.svg) | `squat_occupied_building` | — | Vertical multi-story building shell (`x=4..18, y=3..21`) with two upper window muntins (`y=7`) and ground doorway (`x=8..12, y=16..21`). From mid-facade `(12,10)`, drape an angled protest banner extending outside right wall to `(21,15)` with notched swallowtail tip. |
| 4 | `custom/safe-house-blind` | [`custom/safe-house-blind.svg`](custom/safe-house-blind.svg) | `safe_house_hideout_apartment` | `panic_room`, `secret_room_hidden_passage` | Reinforced square window frame (`x=3..21, y=3..21, rx=2`). Upper half has three horizontal venetian blind slats at `y=7, 10, 13` with vertical pull cord on right (`x=18, y=3..15`). Open lower half centers a keyhole silhouette (circle `r=1.5` at `(12,16.5)` tapering to `y=19.5`). |
| 5 | `custom/street-kiosk-parasol` | [`custom/street-kiosk-parasol.svg`](custom/street-kiosk-parasol.svg) | `boardwalk_kiosk_calcadao`, `beach_kiosk_barraca` | — | Wide parasol canopy dome (`x=3..21, y=9`, apex `(12,3)`) with two interior rib arcs from `(12,3)` to `(8,9)` and `(16,9)`. Central pole (`x=12, y=9..15`) supports a trapezoidal kiosk counter (`top x=5..19 at y=15`, `base x=6..18 at y=21`). |
| 6 | `custom/boteco-billiard-beer` | [`custom/boteco-billiard-beer.svg`](custom/boteco-billiard-beer.svg) | `dive_bar_boteco`, `billiards_snooker_hall` | `bar_pool_arcade_corner` | Left: tapered fluted tumbler (*copo americano*, `top x=3..10 at y=6`, `bottom x=4..9 at y=20`) with foam rim at `y=9` and two vertical flute lines (`y=11..18`). Right: billiard ball circle (`cx=16.5, cy=15.5, r=5.5`) with inner number badge circle (`r=2`). |
| 7 | `custom/hookah-narghile` | [`custom/hookah-narghile.svg`](custom/hookah-narghile.svg) | `hookah_lounge` | `smoking_area_fumodromo` | Flared bell water base (`x=5..15, y=15..21`), vertical stem (`x=10, y=6..15`) with tray (`x=7..13, y=9`) and top bowl (`x=8..12, y=6`). Flexible hose curves from `(10,12)` down to `(16,18)` and up to mouthpiece (`x=19, y=11..15`), plus S-curve smoke wisp (`x=13..18, y=3..7`). |
| 8 | `custom/samba-surdo-drum` | [`custom/samba-surdo-drum.svg`](custom/samba-surdo-drum.svg) | `samba_school_quadra`, `carnival_sambadrome_sector` | — | Tall cylindrical surdo drum body (`x=5..19, y=8..21`) with top/bottom rim bands (`y=10, 19`) and three vertical/diagonal tuning rods. Above top head, diagonal drumstick mallet from `(7,3)` to `(16,7)` with round felt beater head at `(17,7)`. |
| 9 | `custom/sound-wall-baile` | [`custom/sound-wall-baile.svg`](custom/sound-wall-baile.svg) | `baile_sound_wall_stage` | — | Central *paredão* speaker cabinet (`x=5..19, y=7..21, rx=1.5`) with 2x2 grid of four circular subwoofer cones (`centers (9,11.5), (15,11.5), (9,17.5), (15,17.5), r=2`), topped by two flared horn tweeters (`y=3..7`) and side acoustic wave arcs (`x=2..3, 21..22`). |
| 10 | `custom/love-motel-neon` | [`custom/love-motel-neon.svg`](custom/love-motel-neon.svg) | `love_motel`, `brothel_prostitution_house` | `motel_private_garage`, `motel_suite_hydro` | Lower half: rounded drive-in garage portal arch (`x=4..20, y=13..21`) with roll-up door slats at `y=16, 19`. Upper half (`y=3..11`): bold floating heart contour (`cx=12, peak y=4, tip y=11`) flanked by neon glow ticks at `(5,5)` and `(19,5)`. |
| 11 | `custom/swing-interlocked-masks` | [`custom/swing-interlocked-masks.svg`](custom/swing-interlocked-masks.svg) | `swing_club_liberal` | `swing_club_couples_suite` | Two horizontal Venetian/domino eye masks overlapping at center: left mask (`x=2..14, y=9..17`) and right mask (`x=10..22, y=11..19`) with eye cutouts, crowned by a compact teardrop flame (`x=12, y=3..8`). |
| 12 | `custom/strip-stage-pole` | [`custom/strip-stage-pole.svg`](custom/strip-stage-pole.svg) | `strip_club_adult_venue` | `strip_club_stage`, `lap_dance_private_booth` | Central vertical brass pole (`x=12, y=2..18`) anchored on a rounded stage plinth (`x=4..20, y=18..21`), framed by two diagonal spotlight rays converging from `(4,3)->(9,15)` and `(20,3)->(15,15)`. |
| 13 | `custom/darkroom-blindfold-mask` | [`custom/darkroom-blindfold-mask.svg`](custom/darkroom-blindfold-mask.svg) | `cruising_bar_sauna` | `cruising_darkroom_maze`, `adult_peep_show_video_booth` | Wide contoured domino blindfold mask (`x=2..22, y=6..18`) with curved nose bridge notch (`x=10..14, y=16`), closed slit eye line on left (`x=5..9, y=12`), and vertical keyhole aperture on right (`cx=16.5, cy=11` tapering to `y=15`). |
| 14 | `custom/bdsm-crossed-cuffs` | [`custom/bdsm-crossed-cuffs.svg`](custom/bdsm-crossed-cuffs.svg) | — | `motel_themed_fetish_suite`, `bdsm_dungeon_fetish_room` | Two circular wrist shackles: left cuff (`cx=7, cy=14, r=4.5`) and right cuff (`cx=17, cy=14, r=4.5`) with top locking tabs, joined across upper center by a horizontal oval chain link (`x=9.5..14.5, y=6..9`). |
| 15 | `custom/caps-mental-care` | [`custom/caps-mental-care.svg`](custom/caps-mental-care.svg) | `caps_mental_health_center`, `psychiatric_hospital_ward` | `psychiatric_padded_room` | Side-profile human head and neck contour facing right (`x=4..19, y=3..21`) enclosing a three-petal lotus / balanced wave curve inside the cranial vault (`x=7..15, y=6..13`). |
| 16 | `custom/support-circle-chairs` | [`custom/support-circle-chairs.svg`](custom/support-circle-chairs.svg) | `support_group_room_aa` | — | Four simplified participant/chair nodes at cardinal points (`(12,4), (20,12), (12,20), (4,12), r=2`) linked by a segmented fellowship circle (`r=8`) around a central supportive heart/speech emblem at `(12,12)`. |
| 17 | `custom/dojo-torii-belt` | [`custom/dojo-torii-belt.svg`](custom/dojo-torii-belt.svg) | `martial_arts_dojo`, `underground_fight_ring` | `dojo_tatami_training_mat`, `combat_ring_octagon_cage` | Upper third: minimalist curved dojo/torii lintel beam (`x=3..21, y=5`) with two short vertical posts at `x=7, 17` (`y=5..9`). Lower two-thirds: horizontal martial arts belt (`x=3..21, y=13`) tied in a central square knot (`x=10..14, y=11..15`) with diagonal tails to `(7,21)` and `(17,21)`. |
| 18 | `custom/tattoo-coil-machine` | [`custom/tattoo-coil-machine.svg`](custom/tattoo-coil-machine.svg) | `tattoo_piercing_studio` | `tattoo_piercing_chair_booth` | 45-degree diagonal orientation: C-shaped tattoo frame (`x=9..20, y=3..14`) housing dual parallel coils, knurled grip tube (`x=6..11, y=13..18`), and needle tip extending to `(4,20)` with tiny ink droplet at `(4,22)`. |
| 19 | `custom/acupuncture-needles` | [`custom/acupuncture-needles.svg`](custom/acupuncture-needles.svg) | `holistic_acupuncture_clinic` | — | Smooth S-curved body meridian contour across bottom third (`(2,18)` to `(22,16)`), with two slender angled acupuncture needles poised into the curve at `(9,17)` and `(15,17)`, topped by coiled handle loops (`y=4..7`). |
| 20 | `custom/open-air-market-stall` | [`custom/open-air-market-stall.svg`](custom/open-air-market-stall.svg) | `open_air_market_central_stall` | — | Scalloped/striped market awning (`x=2..22, y=3..9`) on two side poles (`x=4, 20, y=9..21`) over a tilted produce display counter (`x=3..21, y=14..21`) divided into two crates with round fruit contours. |
| 21 | `custom/headshop-hemp-pipe` | [`custom/headshop-hemp-pipe.svg`](custom/headshop-hemp-pipe.svg) | `headshop_tobacco_vape_store` | — | Lower half: curved sherlock/hand pipe profile (`bowl x=15..21, y=13..20`; curved stem to mouthpiece at `(3,16)`). Upper center (`x=6..14, y=3..12`): stylized 3-lobed botanical leaf silhouette. |
| 22 | `custom/pawn-three-spheres` | [`custom/pawn-three-spheres.svg`](custom/pawn-three-spheres.svg) | `gold_buyer_pawn_store`, `pawn_shop_fence` | — | Top horizontal mounting bar (`x=4..20, y=4`) with scroll bracket suspending three pawnbroker spheres (`r=3.2` each) in a triangle: top sphere at `(12,11)` and lower spheres at `(7,18)` and `(17,18)`. |
| 23 | `custom/tire-borracharia` | [`custom/tire-borracharia.svg`](custom/tire-borracharia.svg) | `tire_repair_borracharia` | — | Automotive tire (`outer cx=11, cy=13, r=8`; `inner rim r=3.5`) with six radial tread notches, overlapped at upper right by a pressure gauge dial (`cx=18.5, cy=6.5, r=3`) with indicator needle and valve hose. |
| 24 | `custom/courier-helmet-bag` | [`custom/courier-helmet-bag.svg`](custom/courier-helmet-bag.svg) | `dark_kitchen_delivery_hub`, `delivery_courier_rest_point` | — | Left: full-face motorcycle helmet in profile (`x=2..12, y=9..20`) with visor cutout. Right: boxy insulated delivery backpack (`x=12..22, y=6..20, rx=1.5`) with top flap at `y=10` and strap detail. |
| 25 | `custom/helipad-circle-h` | [`custom/helipad-circle-h.svg`](custom/helipad-circle-h.svg) | `heliport_helipad` | — | Outer circular landing pad perimeter (`cx=12, cy=12, r=9.5`) with four inward cardinal ticks, enclosing a bold central capital `H` (`legs x=8.5, 15.5, y=7.5..16.5`; `crossbar y=12`). |
| 26 | `custom/driving-school-cone` | [`custom/driving-school-cone.svg`](custom/driving-school-cone.svg) | `school_driving` | — | Upper-left circular steering wheel (`cx=10, cy=10, r=7`) with center hub and three spokes, overlapped on lower-right by a triangular traffic cone (`apex (17,9)`, `base x=12..22 at y=21`) with stripe at `y=15`. |
| 27 | `custom/garment-sewing-machine` | [`custom/garment-sewing-machine.svg`](custom/garment-sewing-machine.svg) | `tailor_seamstress_atelier`, `garment_sweatshop_oficina` | — | Flat sewing bed (`x=3..21, y=19..21`), right pillar (`x=16..20, y=8..19`) curving into C-shaped upper arm to left head (`x=6..9, y=8..14`), vertical needle/presser foot to `y=19`, handwheel at `(21,12)`, and top thread spool at `(15,5..8)`. |
| 28 | `custom/escape-room-keyhole-clock` | [`custom/escape-room-keyhole-clock.svg`](custom/escape-room-keyhole-clock.svg) | `escape_room_venue` | — | Upper circular clock face (`cx=12, cy=9.5, r=6.5`) whose bottom arc opens into a flared trapezoidal keyhole base (`x=8..16, y=21`), with clock hands and cardinal ticks inside the circle. |
| 29 | `custom/shooting-range-earmuffs` | [`custom/shooting-range-earmuffs.svg`](custom/shooting-range-earmuffs.svg) | `shooting_range_gun_club` | — | Arched acoustic headband (`x=4..20, y=3..11`) with vertical oval ear-defender cups (`left x=2..6, right x=18..22, y=11..19`) framing a central concentric bullseye target (`cx=12, cy=15, r=4.5`). |
| 30 | `custom/varzea-dirt-goalpost` | [`custom/varzea-dirt-goalpost.svg`](custom/varzea-dirt-goalpost.svg) | `amateur_soccer_field_varzea` | — | Perspective wooden goalpost frame (`left post x=4, y=5..17; right post x=20, y=6..17; crossbar (4,5)->(20,6)`) over a broken dirt ground line (`y=17..18`) with foreground soccer ball (`cx=12, cy=18, r=3.5`). |
| 31 | `custom/plaza-gazebo-coreto` | [`custom/plaza-gazebo-coreto.svg`](custom/plaza-gazebo-coreto.svg) | `plaza_gazebo_coreto` | — | Finial spire `(12,2..4)` and octagonal dome roof (`x=3..21, y=4..9`) over four slender columns (`x=5, 10, 14, 19, y=9..17`), waist railing at `y=14`, and two-stepped masonry base (`x=3..21, y=17..21`). |
| 32 | `custom/waterfall-pool-cascade` | [`custom/waterfall-pool-cascade.svg`](custom/waterfall-pool-cascade.svg) | `waterfall_pool`, `natural_spring_bica_dagua` | — | Upper cliff ledges (`x=2..8, 16..22 at y=4`), three vertical cascading water streams (`x=9..15, y=3..16`), and two rippling plunge-pool wave arcs across the bottom (`x=3..21, y=17, 21`). |
| 33 | `custom/orthodox-three-bar-cross` | [`custom/orthodox-three-bar-cross.svg`](custom/orthodox-three-bar-cross.svg) | `orthodox_christian_church` | — | Central vertical shaft (`x=12, y=2..22`) crossed by upper short titulus (`x=9..15, y=6`), main crossbar (`x=5..19, y=10.5`), and slanted lower footrest bar (`(8,16)` to `(16,18)`). |
| 34 | `custom/spiritist-halo-book` | [`custom/spiritist-halo-book.svg`](custom/spiritist-halo-book.svg) | `spiritist_center_kardecist` | `spiritist_passe_room` | Open book in lower half (`x=3..21, y=13..21`, spine dip at `x=12`) beneath a rising semi-circular sun disk (`cx=12, cy=13, r=4`) radiating five upward light rays to `y=3`. |
| 35 | `custom/terreiro-atabaque-altar` | [`custom/terreiro-atabaque-altar.svg`](custom/terreiro-atabaque-altar.svg) | `umbanda_candomble_terreiro` | `terreiro_barracao`, `terreiro_ronco_camarinha` | Tapered conical atabaque drum (`top x=7..17 at y=5`, `bottom x=9..15 at y=18`) on a footed ring stand (`x=7..17, y=21`), with crossed tuning ropes (`y=7..12`) and ritual feather/bead loop accent. |
| 36 | `custom/divination-cowrie-shells` | [`custom/divination-cowrie-shells.svg`](custom/divination-cowrie-shells.svg) | `esoteric_mystic_space` | `divination_buzios_tarot_room` | Four oval cowrie shells (*búzios*, each `~5x7px`) arranged in a diamond cast (`(12,5.5), (12,18.5), (5.5,12), (18.5,12)`), each with a central longitudinal cleft and transverse ticks. |
| 37 | `custom/benzedeira-herb-branch` | [`custom/benzedeira-herb-branch.svg`](custom/benzedeira-herb-branch.svg) | `ayahuasca_shamanic_temple`, `folk_healer_benzedeira_house` | — | Botanical rue stem curving from `(4,20)` to `(17,5)` with five rounded leaflets along both sides, accompanied by two blessing water droplets at `(19,11)` and `(20,17)`. |
| 38 | `custom/masonic-square-compass` | [`custom/masonic-square-compass.svg`](custom/masonic-square-compass.svg) | `masonic_lodge_fraternity`, `occult_hermetic_sanctum` | — | A-frame drafting compass (`hinge (12,3.5)`, `legs to (4,19) and (20,19)`) interlocked with an upward 90-degree square (`vertex (12,21)`, `arms to (4,13) and (20,13)`) and central point at `(12,12)`. |
| 39 | `custom/crossroads-offering-candle` | [`custom/crossroads-offering-candle.svg`](custom/crossroads-offering-candle.svg) | `sacred_crossroads_offering_point` | — | Perspective X-shaped crossroads on lower plane (`(3,14)->(21,21)` and `(21,14)->(3,21)`) with a vertical votive candle (`x=10..14, y=8..17`) and teardrop flame (`y=3..7`) at the center. |
| 40 | `custom/iml-forensic-tag` | [`custom/iml-forensic-tag.svg`](custom/iml-forensic-tag.svg) | `forensic_morgue_iml` | `autopsy_room_iml`, `morgue_body_viewing_window` | Chamfered rectangular forensic toe-tag card (`x=6..18, y=6..21`) with top grommet hole `(12,9)`, curved twine loop to `(8,3)`, central medical cross `(12,14)`, and ID line at `y=18`. |
| 41 | `custom/prison-bars-window` | [`custom/prison-bars-window.svg`](custom/prison-bars-window.svg) | `public_jail_cdp`, `prison_visitation_gate` | `holding_cell_xadrez`, `courthouse_holding_cell`, `prison_tier_catwalk_corridor`, `prison_cell_block`, `solitary_confinement_cell` | Outer square cell frame (`x=3..21, y=3..21, rx=1.5`) with three vertical bars (`x=8, 12, 16`), horizontal transom bar (`y=12`), and central lock-box plate (`x=10..14, y=10..14`). |
| 42 | `custom/biqueira-drop-hand` | [`custom/biqueira-drop-hand.svg`](custom/biqueira-drop-hand.svg) | `drug_dealing_spot_biqueira` | `drug_cutting_packaging_room` | Upper hand (`x=2..11, y=5..9`) dropping a small diamond packet centered at `(12,12)` into an upward-cupped receiving palm (`x=13..22, y=15..19`). |
| 43 | `custom/crack-pipe-smoke` | [`custom/crack-pipe-smoke.svg`](custom/crack-pipe-smoke.svg) | `crack_den_drug_house` | — | Horizontal glass stem tube (`x=3..15, y=16..19`) ending in a right bulb bowl (`cx=18, cy=17, r=3.5`) with crack tick, and two rising curling smoke plumes above (`y=3..12`). |
| 44 | `custom/clandestine-lab-mask` | [`custom/clandestine-lab-mask.svg`](custom/clandestine-lab-mask.svg) | `clandestine_drug_lab_refinery` | `clandestine_chem_synthesis_lab` | Left: conical Erlenmeyer flask (`neck x=6..8, y=5..9; base x=3..11, y=19`) with vapor bubbles. Right: half-face respirator mask (`x=13..22, y=10..20`) with dual circular filter cartridges. |
| 45 | `custom/grow-house-uv-leaf` | [`custom/grow-house-uv-leaf.svg`](custom/grow-house-uv-leaf.svg) | `indoor_cannabis_grow_house` | `indoor_grow_tent_room` | Suspended trapezoidal UV lamp hood (`top x=7..17 at y=4, bottom x=4..20 at y=8`) with downward light ticks (`y=10`) above a symmetrical 5-pointed botanical leaf (`y=12..21`). |
| 46 | `custom/chop-shop-car-saw` | [`custom/chop-shop-car-saw.svg`](custom/chop-shop-car-saw.svg) | `chop_shop_desmanche` | — | Front half of car profile on left (`x=2..13, y=9..19`, wheel `cx=7, cy=18, r=2.5`) bisected by vertical dashed cut line at `x=13` and overlapped on right by circular saw blade (`cx=17, cy=14, r=4.5`). |
| 47 | `custom/weapons-crate-ammo` | [`custom/weapons-crate-ammo.svg`](custom/weapons-crate-ammo.svg) | `illegal_weapons_cache_paiol` | `police_armory_vault`, `weapons_stash_bunker` | Slatted wooden munitions crate (`x=3..21, y=13..21`) with diagonal brace, topped by two upright pointed rifle cartridges side-by-side at `x=9` and `x=15` (`y=3..13`). |
| 48 | `custom/captivity-padlock-chain` | [`custom/captivity-padlock-chain.svg`](custom/captivity-padlock-chain.svg) | `kidnapping_captivity_cativeiro` | `captivity_hostage_room`, `torture_kangaroo_court_room` | Central closed padlock (`body x=8..16, y=11..20, rx=1.5; shackle x=9.5..14.5, y=6..11`) with keyhole, crossed diagonally by heavy linked chain ovals from `(3,4)` and `(21,4)`. |

---

## 6. Agent 3 On-Disk SVG Verification Results (`48 / 48` Custom SVGs)

All `48` custom semiotic SVG files listed in `catalog.json["custom_svg_manifest"]` were authored in [`icons/custom/`](custom/README.md) and validated via an automated Python + `xml.etree.ElementTree` verification suite:

| Verification Check | Requirement | Measured Result | Status |
| :--- | :--- | :--- | :--- |
| **1. File Existence & Non-Empty Size** | Every `file_path` (`custom/<slug>.svg`) in `custom_svg_manifest` exists under `icons/` and has size `> 0` bytes. | `48 / 48` files present on disk (`361`–`687` bytes each). | **PASS (48 / 48)** |
| **2. XML Well-Formedness** | Parses cleanly with `xml.etree.ElementTree.parse` with root `<svg>` element. | `48 / 48` valid XML documents. | **PASS (48 / 48)** |
| **3. Warm Glass Root Attributes** | `xmlns="http://www.w3.org/2000/svg"`, `width="24"`, `height="24"`, `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `stroke-width="2"`, `stroke-linecap="round"`, `stroke-linejoin="round"`. | `48 / 48` exact attribute match. | **PASS (48 / 48)** |
| **4. Semiotic Vector Complexity** | At least `2` distinct vector child primitives (`path`, `circle`, `rect`, `line`, `polyline`, `polygon`, `ellipse`) per icon; no generic placeholder boxes. | `3` to `11` vector primitives per icon (`339` total primitives across `48` icons; average `7.1` primitives/icon). | **PASS (48 / 48)** |
| **5. `24x24` Safe Coordinate Bounds** | All primitive vertices, circle/ellipse extents, and parsed SVG path control/end points lie within the `0..24` viewBox and `[2.0..22.0]` safe stroke zone. | `100%` of coordinates within `[2.0..22.0]`. | **PASS (48 / 48)** |
