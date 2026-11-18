# GeoSpace Custom Semiotic SVG Icons (`icons/custom/`)

> [!NOTE]
> **Temporary Asset Directory:** These 48 bespoke SVG icons are part of the temporary GeoSpace spatial taxonomy and semiotic icon catalog (`icons/`). They follow the accepted **Warm Glass** visual direction ([docs/DESIGN.md](../../docs/DESIGN.md)) and [docs/design-tokens.css](../../docs/design-tokens.css) without selecting or approving a frontend framework, bundler, or application architecture.

---

## 1. Semiotic Design Principles & Warm Glass Vector Contract

Standard UI icon libraries (such as Phosphor Icons and Lucide) cover general commercial, civic, and residential archetypes, but lack culturally specific, vernacular, religious, subcultural, forensic, and underworld spatial signifiers essential to rich urban roleplay. The **48 custom semiotic SVGs** in this directory fill those gaps across **60 urban places** and **38 interior rooms** (**98 total taxonomy bindings**).

### Technical & Visual Specification

| Attribute / Rule | Specification | Semiotic & Rendering Rationale |
| :--- | :--- | :--- |
| **Root `<svg>` Attributes** | `xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"` | Ensures uniform 2px monoline weight, rounded terminals, and softened joins compatible with Warm Glass pill controls and District Network connection bends. |
| **Safe Coordinate Zone** | `x, y ∈ [2..22]` (`2px` outer margin) | Prevents stroke clipping at `16px` (compact station markers), `20px` (character/event panels), and `24px` (selected-place detail strip). |
| **Silhouette-First Semiotics** | `3` to `11` vector primitives per icon (`7.1` avg) | Pairs culturally recognizable primary contours (e.g., *copo americano* + 8-ball, *atabaque* drum, *paredão* speaker stack, venetian blind + keyhole) with open negative space so icons remain legible without relying on color alone (WCAG 2.2 AA). |
| **Dynamic Theme Inheritance** | `stroke="currentColor"`, `fill="none"` | Inherits `--gs-text`, `--gs-primary` (coral selection emphasis), `--gs-on-primary`, or `--gs-spatial-accent` (mineral green) dynamically via CSS. |

---

## 2. Complete Custom Semiotic SVG Inventory (48 Icons)

| # | `icon_id` | SVG File | Semiotic Metaphor (`semiotic_cue`) | Used by `urban_places` (60) | Used by `interior_rooms` (38) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `custom/shack-favela-roof` | [shack-favela-roof.svg](shack-favela-roof.svg) | Layered corrugated gable roof over stacked hillside brickwork and flat slab | `shack_tenement` | `rooftop_slab_laje` |
| 2 | `custom/gatehouse-barrier` | [gatehouse-barrier.svg](gatehouse-barrier.svg) | Security booth window with raised striped boom barrier | `condo_gatehouse_portaria` | `gatehouse_concierge`, `truck_weighbridge_gatehouse` |
| 3 | `custom/squat-occupied-banner` | [squat-occupied-banner.svg](squat-occupied-banner.svg) | Multi-story building facade with draped protest banner | `squat_occupied_building` | — |
| 4 | `custom/safe-house-blind` | [safe-house-blind.svg](safe-house-blind.svg) | Window with half-drawn venetian blinds and keyhole silhouette | `safe_house_hideout_apartment` | `panic_room`, `secret_room_hidden_passage` |
| 5 | `custom/street-kiosk-parasol` | [street-kiosk-parasol.svg](street-kiosk-parasol.svg) | Hexagonal kiosk counter under a striped parasol canopy | `boardwalk_kiosk_calcadao`, `beach_kiosk_barraca` | — |
| 6 | `custom/boteco-billiard-beer` | [boteco-billiard-beer.svg](boteco-billiard-beer.svg) | Faceted glass tumbler beside an 8-ball billiard sphere | `dive_bar_boteco`, `billiards_snooker_hall` | `bar_pool_arcade_corner` |
| 7 | `custom/hookah-narghile` | [hookah-narghile.svg](hookah-narghile.svg) | Traditional tall waterpipe with hose and rising smoke curl | `hookah_lounge` | `smoking_area_fumodromo` |
| 8 | `custom/samba-surdo-drum` | [samba-surdo-drum.svg](samba-surdo-drum.svg) | Deep surdo percussion drum with crossed mallets | `samba_school_quadra`, `carnival_sambadrome_sector` | — |
| 9 | `custom/sound-wall-baile` | [sound-wall-baile.svg](sound-wall-baile.svg) | Stacked wall of subwoofers and horn tweeters radiating sound waves | `baile_sound_wall_stage` | — |
| 10 | `custom/love-motel-neon` | [love-motel-neon.svg](love-motel-neon.svg) | Discreet garage arch topped with a glowing heart neon sign | `love_motel`, `brothel_prostitution_house` | `motel_private_garage`, `motel_suite_hydro` |
| 11 | `custom/swing-interlocked-masks` | [swing-interlocked-masks.svg](swing-interlocked-masks.svg) | Two overlapping Venetian masks with a discreet flame motif | `swing_club_liberal` | `swing_club_couples_suite` |
| 12 | `custom/strip-stage-pole` | [strip-stage-pole.svg](strip-stage-pole.svg) | Vertical floor-to-ceiling stage pole framed by spotlight beams | `strip_club_adult_venue` | `strip_club_stage`, `lap_dance_private_booth` |
| 13 | `custom/darkroom-blindfold-mask` | [darkroom-blindfold-mask.svg](darkroom-blindfold-mask.svg) | Half-shadowed domino mask with a keyhole aperture | `cruising_bar_sauna` | `cruising_darkroom_maze`, `adult_peep_show_video_booth` |
| 14 | `custom/bdsm-crossed-cuffs` | [bdsm-crossed-cuffs.svg](bdsm-crossed-cuffs.svg) | Crossed padded restraints linked by a short chain ring | — | `motel_themed_fetish_suite`, `bdsm_dungeon_fetish_room` |
| 15 | `custom/caps-mental-care` | [caps-mental-care.svg](caps-mental-care.svg) | Human profile silhouette cradling a balanced lotus/wave mind symbol | `caps_mental_health_center`, `psychiatric_hospital_ward` | `psychiatric_padded_room` |
| 16 | `custom/support-circle-chairs` | [support-circle-chairs.svg](support-circle-chairs.svg) | Circle of inward-facing chairs around a shared speaking emblem | `support_group_room_aa` | — |
| 17 | `custom/dojo-torii-belt` | [dojo-torii-belt.svg](dojo-torii-belt.svg) | Tied martial arts black belt beneath a minimalist dojo/ring beam | `martial_arts_dojo`, `underground_fight_ring` | `dojo_tatami_training_mat`, `combat_ring_octagon_cage` |
| 18 | `custom/tattoo-coil-machine` | [tattoo-coil-machine.svg](tattoo-coil-machine.svg) | Rotary/coil tattoo machine angled with needle tip and ink drop | `tattoo_piercing_studio` | `tattoo_piercing_chair_booth` |
| 19 | `custom/acupuncture-needles` | [acupuncture-needles.svg](acupuncture-needles.svg) | Fine needles poised along a curved meridian wave line | `holistic_acupuncture_clinic` | — |
| 20 | `custom/open-air-market-stall` | [open-air-market-stall.svg](open-air-market-stall.svg) | Striped canvas market awning over crates of fresh produce | `open_air_market_central_stall` | — |
| 21 | `custom/headshop-hemp-pipe` | [headshop-hemp-pipe.svg](headshop-hemp-pipe.svg) | Stylized smoking pipe with a botanical leaf emblem | `headshop_tobacco_vape_store` | — |
| 22 | `custom/pawn-three-spheres` | [pawn-three-spheres.svg](pawn-three-spheres.svg) | Classic three-orb pawnbroker emblem suspended from a bracket | `gold_buyer_pawn_store`, `pawn_shop_fence` | — |
| 23 | `custom/tire-borracharia` | [tire-borracharia.svg](tire-borracharia.svg) | Treaded rubber tire with a vulcanizing pressure gauge | `tire_repair_borracharia` | — |
| 24 | `custom/courier-helmet-bag` | [courier-helmet-bag.svg](courier-helmet-bag.svg) | Full-face motorcycle helmet beside an insulated delivery backpack | `dark_kitchen_delivery_hub`, `delivery_courier_rest_point` | — |
| 25 | `custom/helipad-circle-h` | [helipad-circle-h.svg](helipad-circle-h.svg) | Bold capital H enclosed in a dashed circular landing pad | `heliport_helipad` | — |
| 26 | `custom/driving-school-cone` | [driving-school-cone.svg](driving-school-cone.svg) | Steering wheel overlapped with a striped traffic training cone | `school_driving` | — |
| 27 | `custom/garment-sewing-machine` | [garment-sewing-machine.svg](garment-sewing-machine.svg) | Classic sewing machine profile with thread spool | `tailor_seamstress_atelier`, `garment_sweatshop_oficina` | — |
| 28 | `custom/escape-room-keyhole-clock` | [escape-room-keyhole-clock.svg](escape-room-keyhole-clock.svg) | Ornate keyhole integrated with countdown clock hands | `escape_room_venue` | — |
| 29 | `custom/shooting-range-earmuffs` | [shooting-range-earmuffs.svg](shooting-range-earmuffs.svg) | Bullseye target silhouette framed by protective shooting earmuffs | `shooting_range_gun_club` | — |
| 30 | `custom/varzea-dirt-goalpost` | [varzea-dirt-goalpost.svg](varzea-dirt-goalpost.svg) | Wooden soccer goalpost with a ball on rough ground | `amateur_soccer_field_varzea` | — |
| 31 | `custom/plaza-gazebo-coreto` | [plaza-gazebo-coreto.svg](plaza-gazebo-coreto.svg) | Octagonal bandstand dome roof supported by slender columns over steps | `plaza_gazebo_coreto` | — |
| 32 | `custom/waterfall-pool-cascade` | [waterfall-pool-cascade.svg](waterfall-pool-cascade.svg) | Vertical cascading water streams falling into a natural basin | `waterfall_pool`, `natural_spring_bica_dagua` | — |
| 33 | `custom/orthodox-three-bar-cross` | [orthodox-three-bar-cross.svg](orthodox-three-bar-cross.svg) | Traditional Eastern Orthodox three-bar cross with angled footbar | `orthodox_christian_church` | — |
| 34 | `custom/spiritist-halo-book` | [spiritist-halo-book.svg](spiritist-halo-book.svg) | Open book beneath a rising radiant sun horizon | `spiritist_center_kardecist` | `spiritist_passe_room` |
| 35 | `custom/terreiro-atabaque-altar` | [terreiro-atabaque-altar.svg](terreiro-atabaque-altar.svg) | Sacred ritual atabaque drum flanked by crossed axé feathers and beads | `umbanda_candomble_terreiro` | `terreiro_barracao`, `terreiro_ronco_camarinha` |
| 36 | `custom/divination-cowrie-shells` | [divination-cowrie-shells.svg](divination-cowrie-shells.svg) | Four open cowrie shells (búzios) arranged in a divination cast | `esoteric_mystic_space` | `divination_buzios_tarot_room` |
| 37 | `custom/benzedeira-herb-branch` | [benzedeira-herb-branch.svg](benzedeira-herb-branch.svg) | Ritual rue herb sprig (ramo de arruda) with blessing water droplets | `ayahuasca_shamanic_temple`, `folk_healer_benzedeira_house` | — |
| 38 | `custom/masonic-square-compass` | [masonic-square-compass.svg](masonic-square-compass.svg) | Interlocked carpenter's square and compasses enclosing a central point | `masonic_lodge_fraternity`, `occult_hermetic_sanctum` | — |
| 39 | `custom/crossroads-offering-candle` | [crossroads-offering-candle.svg](crossroads-offering-candle.svg) | Lit ritual candle set at an X-shaped crossroads intersection | `sacred_crossroads_offering_point` | — |
| 40 | `custom/iml-forensic-tag` | [iml-forensic-tag.svg](iml-forensic-tag.svg) | Forensic toe-tag card with a cadaverous cross-hair marker | `forensic_morgue_iml` | `autopsy_room_iml`, `morgue_body_viewing_window` |
| 41 | `custom/prison-bars-window` | [prison-bars-window.svg](prison-bars-window.svg) | Heavy vertical iron cell bars crossed by a locked horizontal transom | `public_jail_cdp`, `prison_visitation_gate` | `holding_cell_xadrez`, `courthouse_holding_cell`, `prison_tier_catwalk_corridor`, `prison_cell_block`, `solitary_confinement_cell` |
| 42 | `custom/biqueira-drop-hand` | [biqueira-drop-hand.svg](biqueira-drop-hand.svg) | Stealth hand-to-hand exchange of a small packet and folded bill | `drug_dealing_spot_biqueira` | `drug_cutting_packaging_room` |
| 43 | `custom/crack-pipe-smoke` | [crack-pipe-smoke.svg](crack-pipe-smoke.svg) | Cracked glass pipe silhouette with a hazard smoke plume | `crack_den_drug_house` | — |
| 44 | `custom/clandestine-lab-mask` | [clandestine-lab-mask.svg](clandestine-lab-mask.svg) | Conical boiling flask paired with a twin-filter respirator mask | `clandestine_drug_lab_refinery` | `clandestine_chem_synthesis_lab` |
| 45 | `custom/grow-house-uv-leaf` | [grow-house-uv-leaf.svg](grow-house-uv-leaf.svg) | Serrated botanical leaf beneath a hooded UV grow lamp reflector | `indoor_cannabis_grow_house` | `indoor_grow_tent_room` |
| 46 | `custom/chop-shop-car-saw` | [chop-shop-car-saw.svg](chop-shop-car-saw.svg) | Half-sectioned car chassis crossed by a circular cutting blade | `chop_shop_desmanche` | — |
| 47 | `custom/weapons-crate-ammo` | [weapons-crate-ammo.svg](weapons-crate-ammo.svg) | Stenciled wooden munitions crate with two upright rifle cartridges | `illegal_weapons_cache_paiol` | `police_armory_vault`, `weapons_stash_bunker` |
| 48 | `custom/captivity-padlock-chain` | [captivity-padlock-chain.svg](captivity-padlock-chain.svg) | Heavy diagonal iron chain secured by a closed shackle padlock | `kidnapping_captivity_cativeiro` | `captivity_hostage_room`, `torture_kangaroo_court_room` |

---

## 3. Related Catalog Documents

- [Catalog Overview (`icons/README.md`)](../README.md)
- [Machine-Readable Registry (`icons/catalog.json`)](../catalog.json)
- [Urban Places Taxonomy (`icons/urban-places-taxonomy.md`)](../urban-places-taxonomy.md)
- [Interior Rooms Taxonomy (`icons/interior-rooms-taxonomy.md`)](../interior-rooms-taxonomy.md)
- [QA & Semiotic Audit Report (`icons/QA_REPORT.md`)](../QA_REPORT.md)
