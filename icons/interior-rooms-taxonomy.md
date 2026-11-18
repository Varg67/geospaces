# GeoSpace Interior Rooms & Micro-Spaces Taxonomy (`InteriorRoomRegistry`)

> [!IMPORTANT]
> **Role in the GeoSpace Hierarchy (`Place` → `interior_room`):**
> Each `room_type_id` represents an **interior sub-node** contained inside a point-level urban place ([urban-places-taxonomy.md](urban-places-taxonomy.md)).
> This enables the simulation core to govern **privacy, acoustic reach, event visibility, and door locks/access** within the same building (e.g., a character in `living_room` does not witness events inside `bathroom_full`; someone on the `dance_floor` cannot overhear negotiations inside `backroom_poker_lounge`).

## Overview & Group Breakdown

| Group | Group ID | Group Name | Room Types |
| :--- | :--- | :--- | :--- |
| **Group A** | `residential_rooms` | Residential Rooms (Common, Working-Class & High-End) | 39 |
| **Group B** | `building_common_lodging_transit_cabins` | Building Commons, Hotels, Motels & Transit Cabins | 31 |
| **Group C** | `hospitality_nightlife_adult_interiors` | Dining, Bars, Nightclubs & Adult Venue Interiors | 31 |
| **Group D** | `healthcare_clinical_wellness_interiors` | Hospitals, Clinics, Wellness & Personal Care Interiors | 37 |
| **Group E** | `education_office_retail_industrial_interiors` | Education, Offices, Retail & Industrial Interiors | 41 |
| **Group F** | `religious_cultural_sports_event_interiors` | Religious, Cultural, Sports & Event Venue Interiors | 29 |
| **Group G** | `security_justice_prison_underworld_interiors` | Security, Justice, Prison & Underworld Interiors | 40 |
| **Total** | **`interior_rooms`** | **Consolidated Interior Room Types** | **248** |

---

## Group A: Residential Rooms (Common, Working-Class & High-End) (`residential_rooms` — 39 types)

Domestic interior spaces across houses, apartments, tenements, and luxury mansions.

| # | `room_type_id` | `name_en` | `roleplay_semantics_en` | `icon_source` | `icon_id` | `semiotic_cue` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `front_porch_stoop` | Front Porch / Stoop / Sidewalk Threshold | Transition zone between house and street; late-afternoon chairs and chatting with neighbors. | `phosphor-lucide` | `rocking-chair` | Side profile of a porch rocking chair |
| 2 | `entry_foyer` | Entry Foyer / Residential Vestibule | Receiving guests, dropping keys and coats, and brief doorway conversations. | `phosphor-lucide` | `door-open` | Open front entrance door with frame |
| 3 | `living_room` | Living Room / Parlor | Family gathering, hosting visitors, and everyday conversations on the sofa. | `phosphor-lucide` | `sofa` | Two-cushion upholstered living room sofa |
| 4 | `home_theater_media_room` | TV Den / Home Theater / Intimate Lounge | Enclosed room with reclining couch and wide screen for movies and cozy downtime. | `phosphor-lucide` | `tv` | Widescreen television display on stand |
| 5 | `dining_room` | Dining Room | Family meals, formal dinners, or serious household discussions around the table. | `phosphor-lucide` | `utensils` | Dining table place setting with fork and knife |
| 6 | `kitchen_residential` | Residential Kitchen | Preparing meals, morning coffee, and candid conversations while cooking. | `phosphor-lucide` | `cooking-pot` | Simmering kitchen pot with lid |
| 7 | `pantry_larder` | Food Pantry / Larder | Shelved storage for dry goods and drinks, or a cramped improvised hiding spot. | `phosphor-lucide` | `archive` | Stacked pantry storage box on shelf |
| 8 | `master_bedroom` | Master Bedroom / Couple's Suite | Rest, marital intimacy, pillow talk, and full domestic privacy. | `phosphor-lucide` | `bed-double` | Double bed headboard with two pillows |
| 9 | `single_bedroom` | Single Bedroom / Personal Room | Personal sanctuary for youth or adults; study, solitude, and personal secrets. | `phosphor-lucide` | `bed-single` | Single bed frame with one pillow |
| 10 | `shared_bunk_bedroom` | Shared Bedroom / Bunk Room | Close cohabitation among siblings, student housemates, or boarding-house tenants. | `phosphor-lucide` | `bed` | Stacked two-tier bunk bed |
| 11 | `nursery_baby_room` | Baby Nursery / Child's Bedroom | Caring for infants, late-night parental vigils, cribs, and scattered toys. | `phosphor-lucide` | `baby` | Infant face and crib rail cue |
| 12 | `guest_bedroom` | Guest Bedroom | Temporary accommodation for visiting relatives, friends, or someone needing shelter. | `phosphor-lucide` | `luggage` | Standing travel suitcase with handle |
| 13 | `maid_quarters` | Service Bedroom / Staff Quarters | Small back-of-house room for live-in domestic workers or overflow storage. | `phosphor-lucide` | `door` | Simple interior room door |
| 14 | `walk_in_closet` | Walk-In Closet / Dressing Room | Selecting outfits, storing jewelry or a wall safe, and hushed private phone calls. | `phosphor-lucide` | `coat-hanger` | Clothes hanger suspended from closet rod |
| 15 | `bathroom_full` | Full Bathroom | Daily hygiene, showers, staring into the mirror in crisis, or locking oneself in. | `phosphor-lucide` | `shower-head` | Overhead shower nozzle spraying water drops |
| 16 | `master_ensuite_hydro_bath` | Master En-Suite Bathroom with Whirlpool Tub | Spacious bathroom attached to the master suite featuring a double hydro-massage tub. | `phosphor-lucide` | `bath` | Clawfoot/jacuzzi bathtub with faucet |
| 17 | `half_bath_powder_room` | Powder Room / Guest Half-Bath (Lavabo) | Small guest washroom used during house parties to fix makeup or make secret calls. | `phosphor-lucide` | `droplet` | Clean water droplet over hand basin |
| 18 | `maid_bathroom_wc` | Service WC / Back Utility Washroom | Compact washroom off the laundry area or backyard. | `phosphor-lucide` | `toilet` | Porcelain toilet bowl and tank profile |
| 19 | `home_office_study` | Home Office / Private Study & Library | Remote work, quiet study, hidden wall safe, and confidential behind-closed-doors talks. | `phosphor-lucide` | `lamp-desk` | Articulated desk reading lamp |
| 20 | `residential_game_billiards_room` | Residential Game & Billiards Room | Mansion or large-home entertainment room with pool table, card table, and home bar. | `phosphor-lucide` | `dices` | Pair of gaming dice |
| 21 | `home_music_recording_studio` | Home Music Room / Recording Studio | Acoustically treated spare room with instruments and mics for rehearsals or livestreams. | `phosphor-lucide` | `headphones` | Studio monitoring over-ear headphones |
| 22 | `prayer_oratory_niche` | Domestic Prayer Room / Family Oratory | Devotional corner or small room with lit candles, statues, or a family altar. | `phosphor-lucide` | `hands-praying` | Folded praying hands |
| 23 | `winter_garden_conservatory` | Indoor Winter Garden / Sunroom Conservatory | Glass-enclosed or skylight-lit indoor garden nook filled with houseplants. | `phosphor-lucide` | `plant` | Leafy indoor botanical stem |
| 24 | `laundry_service_area` | Laundry Room / Utility Service Area | Washbasin, washing machine, cleaning supplies, and back service door. | `phosphor-lucide` | `washing-machine` | Front-load laundry appliance |
| 25 | `storage_utility_junk_room` | Storage Box Room / Clutter Closet (Quartinho da Bagunça) | Cramped room stacked with old boxes, suitcases, tools, and forgotten keepsakes. | `phosphor-lucide` | `package` | Taped cardboard storage box |
| 26 | `hallway_corridor` | Interior Hallway & House Staircase | Circulation passage between bedrooms, late-night crossings, and eavesdropping at doors. | `phosphor-lucide` | `footprints` | Footsteps along an interior passage |
| 27 | `balcony_veranda` | Apartment Balcony / Veranda | Stepping out to smoke, watch the street below, get fresh air, or talk privately during a party. | `phosphor-lucide` | `sun-horizon` | Balcony railing overlooking horizon sun |
| 28 | `rooftop_slab_laje` | Rooftop Concrete Slab (Laje) | Iconic working-class rooftop space for weekend barbecues, clotheslines, sunbathing, and neighborhood views. | `custom-svg` | `custom/shack-favela-roof` | Flat concrete rooftop slab over hillside brickwork |
| 29 | `backyard_patio` | Backyard / Rear Patio (Quintal) | Open rear yard with plants, clothesline, pets, and unhurried household conversations. | `phosphor-lucide` | `trees` | Pair of backyard shade trees |
| 30 | `shared_tenement_courtyard` | Shared Tenement / Village Courtyard (Pátio de Cortiço) | Communal courtyard with washbasins, clotheslines, and intense neighbor-to-neighbor proximity. | `phosphor-lucide` | `users-three` | Neighbors gathered in shared courtyard |
| 31 | `domestic_kennel_pet_run` | Backyard Dog Kennel / Pet Run | Fenced backyard enclosure for guard dogs or household pets. | `phosphor-lucide` | `dog` | Watchdog silhouette in enclosure |
| 32 | `gourmet_bbq_area` | Backyard Barbecue & Gourmet Patio (Edícula / Churrasqueira) | Weekend cookouts, cold beer, music, and lively family or friend gatherings at home. | `phosphor-lucide` | `flame` | Open grill fire flame |
| 33 | `private_pool_deck` | Private Residential Pool & Sun Deck | Private leisure in houses and mansions, poolside parties, and late-night swims. | `phosphor-lucide` | `waves` | Rippling swimming pool water lines |
| 34 | `residential_garage` | Residential Garage | Parking vehicles, discreet arrivals/departures, or garage band rehearsals. | `phosphor-lucide` | `car` | Parked passenger car under garage frame |
| 35 | `garage_workshop_tool_shed` | Garage Workshop & Tool Bench | Mechanical tinkering, woodworking, heavy hand tools, and secret backyard projects. | `phosphor-lucide` | `wrench` | Heavy workbench spanner wrench |
| 36 | `basement_cellar` | Underground Basement / Cellar | Dark or damp subterranean room housing the boiler, hidden secrets, or suspense. | `phosphor-lucide` | `stairs` | Descending cellar staircase steps |
| 37 | `wine_cellar` | Residential Underground Wine Cellar | Tasting rare vintage bottles and holding confidential talks in luxury estates. | `phosphor-lucide` | `wine` | Stemmed wine glass in vaulted cellar |
| 38 | `attic_loft` | Attic / Under-Roof Loft (Sótão) | Sloped-ceiling room under the rafters with dusty trunks, old letters, or a hideaway. | `phosphor-lucide` | `triangle` | Pitched roof gable triangle |
| 39 | `panic_room` | Armored Panic Room / Safe Room | Maximum-security steel-door refuge with dedicated comms inside a mansion. | `custom-svg` | `custom/safe-house-blind` | Reinforced steel viewport with half-drawn blind and keyhole |

---

## Group B: Building Commons, Hotels, Motels & Transit Cabins (`building_common_lodging_transit_cabins` — 31 types)

Shared residential building areas, hotel/motel/hostel interiors, airport lounges, and vehicle cabins.

| # | `room_type_id` | `name_en` | `roleplay_semantics_en` | `icon_source` | `icon_id` | `semiotic_cue` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 40 | `gatehouse_concierge` | Interior Doorman Booth / Concierge Desk (Guarita Interna) | Intercom switchboard, visitor logs, package sorting, and chatting with the building doorman. | `custom-svg` | `custom/gatehouse-barrier` | Security booth window with access control barrier |
| 41 | `building_lobby` | Building Entrance Hall / Hotel Reception Lobby | Waiting sofas, check-in/check-out desk, and residents or guests crossing paths. | `phosphor-lucide` | `concierge-bell` | Front-desk reception bell |
| 42 | `mail_package_room` | Mailroom & Smart Package Lockers | Pigeonhole mailboxes, anonymous letters, bills, and parcel pickups. | `phosphor-lucide` | `mailbox` | Postbox slot with raised signal flag |
| 43 | `elevator_cab` | Elevator Cab | Confined vertical transit box for unavoidable awkward encounters, quick flirting, or getting stuck. | `phosphor-lucide` | `arrow-up-down` | Vertical bidirectional elevator arrows |
| 44 | `building_corridor` | Upper-Floor Corridor (Apartment / Hotel / Boarding House) | Hallway linking unit doors; doormat confrontations and overheard footsteps. | `phosphor-lucide` | `columns-3` | Perspective corridor of repeating doors |
| 45 | `fire_stairwell` | Fire Escape Stairwell | Emergency exit route, sneaking a smoke, or camera-free secret conversations between floors. | `phosphor-lucide` | `stairs` | Stepped concrete stairwell flight |
| 46 | `underground_parking` | Underground Building Parking Garage | Arriving/leaving by car, concrete pillars, dimly lit corners, and surprise confrontations. | `phosphor-lucide` | `car-front` | Car silhouette beneath subterranean beam |
| 47 | `condo_party_room` | Condominium Party Room & Assembly Hall | Birthday parties, receptions, and heated homeowners' association meetings. | `phosphor-lucide` | `party-popper` | Celebration confetti popper |
| 48 | `condo_fitness_room` | Condominium / Hotel Fitness Room | Resident- or guest-only workout room for daily exercise and casual encounters. | `phosphor-lucide` | `dumbbell` | Compact fitness hand weight |
| 49 | `condo_kids_playroom` | Building Kids' Playroom & Youth Lounge (Brinquedoteca) | Indoor playroom where parents watch toddlers or building teens hang out. | `phosphor-lucide` | `blocks` | Stacked toy building blocks |
| 50 | `shared_laundry_facility` | Communal Building Laundry Room | Row of coin/card washers and dryers offering natural downtime to strike up conversation. | `phosphor-lucide` | `washing-machine` | Shared front-loading laundry machine |
| 51 | `rooftop_terrace` | Building Rooftop Terrace | High-altitude city view, strong wind, leaning on the parapet in thought, or rooftop drinks. | `phosphor-lucide` | `building-2` | Tower crown and open observation deck |
| 52 | `garbage_utility_room` | Floor Trash Chute & Janitor Closet | Taking out trash—or disposing of compromising evidence—in a quiet service nook. | `phosphor-lucide` | `trash-2` | Ribbed waste bin with lid |
| 53 | `building_machine_boiler_room` | Elevator Machine Room / Generator & Boiler Sub-Basement | High-voltage breaker panels, water pumps, and elevator motors (maintenance or sabotage). | `phosphor-lucide` | `cog` | Toothed mechanical machine gear |
| 54 | `hotel_standard_room` | Standard / Executive Hotel Room | Temporary stay, travel rest, room service, or discreet meetings away from home. | `phosphor-lucide` | `bed-double` | Neat hotel double bed with headboard |
| 55 | `hotel_presidential_suite` | Hotel Presidential Suite | Ultra-luxury top-floor suite with private parlor, jacuzzi, and VIP gatherings. | `phosphor-lucide` | `crown` | Royal crown denoting presidential suite |
| 56 | `hotel_breakfast_buffet_hall` | Hotel Breakfast Buffet Hall | Morning dining room where guests cross paths over coffee before heading into the city. | `phosphor-lucide` | `coffee` | Morning coffee cup on saucer |
| 57 | `hotel_pool_spa_deck` | Hotel Pool Deck & Poolside Bar | Sun loungers, poolside cocktails, travelers, and resort-style socializing. | `phosphor-lucide` | `waves` | Pool water waves beneath sun |
| 58 | `hotel_housekeeping_linen_room` | Housekeeping Linen Room & Staff Closet | Housekeeping carts, master keycards, fresh towels, and staff uniforms. | `phosphor-lucide` | `sparkles` | Freshly laundered linen sparkle |
| 59 | `motel_private_garage` | Love Motel Private Drive-In Garage Box | Enclosed single-car stall with automatic curtain/door to hide a couple's license plate. | `custom-svg` | `custom/love-motel-neon` | Discreet garage arch topped with a glowing heart neon sign |
| 60 | `motel_suite_hydro` | Love Motel Suite (with Whirlpool & Ceiling Mirror) | Intimate encounters, secret affairs, neon lighting, minibar, and acoustic isolation. | `custom-svg` | `custom/love-motel-neon` | Glowing heart neon emblem over whirlpool waves |
| 61 | `motel_themed_fetish_suite` | Themed / S&M Fetish Motel Suite | Specialty motel room outfitted with pole dance stage, restraints, and erotic lighting. | `custom-svg` | `custom/bdsm-crossed-cuffs` | Crossed padded restraints linked by a short chain ring |
| 62 | `hostel_shared_dorm_room` | Hostel Shared Dormitory Room | Numbered bunk beds and padlocked lockers shared with strangers and travelers. | `phosphor-lucide` | `bed` | Multi-tier dormitory bunk bed |
| 63 | `hostel_communal_kitchen_lounge` | Hostel / Boarding-House Communal Kitchen & Lounge | Shared fridge with labeled food, communal stove, and socializing among residents. | `phosphor-lucide` | `cooking-pot` | Shared cooking pot and utensils |
| 64 | `boarding_shared_bathroom` | Shared Hallway Bathroom (Boarding House / Tenement) | Morning line for the shower, impatient knocks on the door, and zero privacy. | `phosphor-lucide` | `shower-head` | Single hallway shower head |
| 65 | `departure_boarding_lounge` | Airport / Coach Departure Boarding Lounge | Post-security gate seating area for final waits and last-minute boarding calls. | `phosphor-lucide` | `plane-takeoff` | Departing aircraft ascending from line |
| 66 | `vip_airport_lounge` | Executive VIP Airport Lounge | Quiet soundproofed lounge with open bar, buffet, and leather armchairs for elite flyers. | `phosphor-lucide` | `star` | Five-pointed VIP star emblem |
| 67 | `baggage_claim_customs_hall` | Baggage Claim Carousel & Customs Inspection Hall | Arrival hall, waiting for suitcases, and tense customs/border inspections. | `phosphor-lucide` | `luggage` | Wheeled suitcase on carousel line |
| 68 | `subway_train_platform` | Subway / Train Boarding Platform | Standing behind the yellow line by the tracks, PA announcements, and commuter crowds. | `phosphor-lucide` | `train-front` | Rail car approaching platform edge |
| 69 | `passenger_cabin_aircraft` | Commercial Aircraft / Private Jet Passenger Cabin | Pressurized seat rows and narrow aisle during flight; confined conversations at altitude. | `phosphor-lucide` | `plane` | Top-down/side aircraft fuselage cabin |
| 70 | `transit_vehicle_cabin_interior` | In-Transit Vehicle or Railcar Interior (Car, Taxi, Bus, Subway) | Enclosed cabin of a moving vehicle during urban commutes and private road talks. | `phosphor-lucide` | `car` | Passenger cabin silhouette in motion |

---

## Group C: Dining, Bars, Nightclubs & Adult Venue Interiors (`hospitality_nightlife_adult_interiors` — 31 types)

Front-of-house tables, bar counters, commercial kitchens, dance floors, backstage rooms, and adult booths.

| # | `room_type_id` | `name_en` | `roleplay_semantics_en` | `icon_source` | `icon_id` | `semiotic_cue` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 71 | `main_dining_floor` | Main Dining Floor (Restaurant / Bar / Cafe) | Open table seating, group meals, circulating servers, and people-watching. | `phosphor-lucide` | `utensils` | Table fork and knife pair |
| 72 | `sidewalk_terrace_tables` | Sidewalk Cafe Tables / Outdoor Bar Deck | Drinking outdoors while watching street traffic, evening breeze, and casual flirting. | `phosphor-lucide` | `umbrella` | Patio table parasol umbrella |
| 73 | `bar_counter` | Bar Counter & Stools | Drinking solo, confiding in the bartender, or meeting whoever sits on the next stool. | `phosphor-lucide` | `martini` | Cocktail glass resting on bar top |
| 74 | `private_dining_booth` | Private Corner Booth / Reserved Alcove | High-backed booth seating for confidential talks, discreet dates, or quiet deals. | `phosphor-lucide` | `message-square` | Secluded conversation bubble over booth |
| 75 | `bar_pool_arcade_corner` | Back Pool Table & Darts Corner of the Bar | Side alcove with a coin-op pool table, jukebox, dartboard, and bar bets. | `custom-svg` | `custom/boteco-billiard-beer` | Faceted glass tumbler beside an 8-ball billiard sphere |
| 76 | `restaurant_wine_cellar_vault` | Climate-Controlled Restaurant Wine Vault | Glass-walled or subterranean rare-vintage cellar used for private tastings and secret dinners. | `phosphor-lucide` | `wine` | Wine bottle and stemmed glass |
| 77 | `commercial_kitchen` | Commercial Kitchen (Restaurant / Bakery) | Stainless prep tables, roaring burners, shouted order tickets, and intense brigade pressure. | `phosphor-lucide` | `chef-hat` | Chef toque hat over flame |
| 78 | `restaurant_dishwashing_scullery` | Dishwashing Pit / Scullery (Copa Suja) | Steam-filled back sink area for heavy manual labor, off-the-books shifts, and backdoor breaks. | `phosphor-lucide` | `droplets` | Spraying water droplets over sink |
| 79 | `walk_in_freezer` | Walk-In Freezer / Commercial Cold Room | Sub-zero insulated storage room; used to cool off during a shift or lock someone inside. | `phosphor-lucide` | `snowflake` | Sharp six-point frost crystal |
| 80 | `bartender_stock_keg_room` | Liquor Stockroom & Keg Cooler | Locked back storage room stacked with cases of spirits, CO2 tanks, and beer kegs. | `phosphor-lucide` | `package` | Stacked beverage crates |
| 81 | `club_entrance_queue` | Nightclub Door Line, Velvet Rope & Security Pat-Down | Hostess with VIP clipboard, bouncer pat-downs, ID checks, and street-side anticipation. | `phosphor-lucide` | `ticket` | VIP admission wristband/ticket |
| 82 | `cloakroom_chapelaria` | Coat Check Counter (Chapelaria) | Numbered token counter for checking coats, bags, motorcycle helmets, or parcels. | `phosphor-lucide` | `tag` | Numbered coat-check claim tag |
| 83 | `dance_floor` | Main Dance Floor (Pista de Dança) | Thumping sub-bass, strobe lights, packed crowd dancing, sweat, and kisses in the dark. | `phosphor-lucide` | `music-4` | Pulsing musical notes under strobe |
| 84 | `dj_booth` | DJ Booth & Sound Console | Elevated decks and mixer console commanding the room's energy and sightlines. | `phosphor-lucide` | `disc-3` | Spinning turntable platter and headphones |
| 85 | `live_stage_bandstand` | Live Performance Stage / Bandstand | Spotlit raised platform where bands, singers, or stand-up comics perform. | `phosphor-lucide` | `mic` | Stage vocal microphone on stand |
| 86 | `private_karaoke_box` | Private Soundproof Karaoke Box | Closed acoustic booth for a small group to sing, drink, and talk freely. | `phosphor-lucide` | `music-2` | Handheld mic with musical note |
| 87 | `vip_lounge_camarote` | Nightclub VIP Mezzanine Box (Camarote VIP) | Wristband-only elevated balcony with plush sofas, bottle sparklers, and status display. | `phosphor-lucide` | `crown` | VIP crown over champagne flute |
| 88 | `smoking_area_fumodromo` | Nightclub Smoking Patio / Open-Air Deck (Fumódromo) | Ventilated patio where the music is muffled and real conversations happen over a cigarette. | `custom-svg` | `custom/hookah-narghile` | Rising smoke curl over lounge mouthpiece |
| 89 | `nightclub_restroom` | Nightclub / Bar Restroom | Mirror touch-ups, long lines, drunken confessions, or locked bathroom stalls. | `phosphor-lucide` | `users` | Restroom mirror and dual figure emblem |
| 90 | `green_room_backstage` | Artist Green Room / Backstage Dressing Room | Lit vanity mirrors, rider drinks, sofas, and restricted post-show hangouts. | `phosphor-lucide` | `sparkles` | Backstage dressing-door star |
| 91 | `bouncer_security_back_office` | Nightclub Security & Manager's Back Office | Back room where bouncers detain brawlers, gatecrashers, or caught dealers. | `phosphor-lucide` | `shield-alert` | Security shield with exclamation mark |
| 92 | `backroom_poker_lounge` | Backroom Poker Lounge & Bosses' Table | Smoke-filled private room behind the bar for high-stakes card games or mob meetings. | `phosphor-lucide` | `spade` | Ace of spades card suit pip |
| 93 | `strip_club_stage` | Pole Dance Stage & Adult Runway | Spotlit cabaret runway with vertical brass pole, music, and stage-side tipping. | `custom-svg` | `custom/strip-stage-pole` | Vertical floor-to-ceiling stage pole framed by spotlight beams |
| 94 | `strip_club_dressing_room` | Dancers' Backstage Dressing Room (Adult Club) | Backstage lockers, makeup mirrors, costume racks, and personal alliances or rivalries. | `phosphor-lucide` | `sparkle` | Vanity mirror star sparkle |
| 95 | `lap_dance_private_booth` | Velvet-Curtain Private Lap Dance Booth | Secluded plush booth behind heavy curtains for one-on-one dances and whispered secrets. | `custom-svg` | `custom/strip-stage-pole` | Curtained private alcove with stage pole silhouette |
| 96 | `champagne_vip_room` | VIP Champagne Room (Adult Club Private Lounge) | High-spend private parlor in an adult club for extended bottle service and negotiations. | `phosphor-lucide` | `wine` | Tall fluted champagne glass |
| 97 | `brothel_trick_room` | Brothel Rotating Trick Room (Quarto de Programa) | Compact interior bedroom in a brothel with bed, neon lamp, and en-suite washroom. | `phosphor-lucide` | `key-round` | Private room key with heart tag |
| 98 | `cruising_darkroom_maze` | Darkroom & Cruising Maze | Pitch-black labyrinth inside an alternative club or bathhouse for anonymous encounters. | `custom-svg` | `custom/darkroom-blindfold-mask` | Half-shadowed domino mask with a keyhole aperture |
| 99 | `swing_club_couples_suite` | Swingers' Club Couples Suite & Viewing Cabin | Intimate cushioned room with viewing windows in the private wing of a lifestyle club. | `custom-svg` | `custom/swing-interlocked-masks` | Two overlapping Venetian masks with a discreet flame motif |
| 100 | `bdsm_dungeon_fetish_room` | BDSM Dungeon & Fetish Playroom | Soundproofed chamber equipped with St. Andrew's cross, suspension rigs, and restraints. | `custom-svg` | `custom/bdsm-crossed-cuffs` | Crossed padded restraints linked by a short chain ring |
| 101 | `adult_peep_show_video_booth` | Individual Adult Video / Peep-Show Booth | Small locked single-person viewing booth in the back corridor of an adult shop. | `custom-svg` | `custom/darkroom-blindfold-mask` | Shadowed peephole mask slot |

---

## Group D: Hospitals, Clinics, Wellness & Personal Care Interiors (`healthcare_clinical_wellness_interiors` — 37 types)

Emergency bays, operating theaters, inpatient wards, diagnostic rooms, gyms, dojos, and beauty/tattoo cabins.

| # | `room_type_id` | `name_en` | `roleplay_semantics_en` | `icon_source` | `icon_id` | `semiotic_cue` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 102 | `hospital_waiting_room` | General Hospital Waiting Room & Reception | Rows of plastic chairs, ticket-number screen, and anxious relatives awaiting updates. | `phosphor-lucide` | `clock` | Wall clock ticking during tense wait |
| 103 | `hospital_vip_family_lounge` | Private Family Consultation & Bad-News Lounge | Quiet enclosed parlor where physicians deliver delicate news to family members. | `phosphor-lucide` | `armchair` | Supportive cushioned armchair |
| 104 | `triage_room` | Emergency Triage Room | Vital-signs check and color-coded risk wristband assignment. | `phosphor-lucide` | `clipboard-plus` | Medical chart clipboard with plus cross |
| 105 | `public_er_stretcher_corridor` | Overcrowded ER Stretcher Corridor | Hospital overcrowding, patients on gurneys lining the hallway, and stretched staff. | `phosphor-lucide` | `activity` | Urgent ECG waveform spike |
| 106 | `er_trauma_bay` | ER Red Trauma Bay (Resuscitation Room) | Defibrillators, crash carts, and frantic stabilization of gunshot or crash victims. | `phosphor-lucide` | `heart-pulse` | Beating heart with resuscitation pulse |
| 107 | `medication_observation_room` | IV Drip & Nebulizer Observation Room | Recliner chairs where short-stay patients receive IV fluids, painkillers, or inhalation. | `phosphor-lucide` | `syringe` | IV drip / medical syringe |
| 108 | `orthopedic_cast_splint_room` | Orthopedic Cast & Suture Room | Setting fractures in plaster casts, stitching lacerations, and post-accident dressings. | `phosphor-lucide` | `bone` | Long bone shaft contour |
| 109 | `doctor_consultation_room` | Doctor's Consultation & Exam Office | Physician's desk and exam table behind a curtain for diagnoses and prescriptions. | `phosphor-lucide` | `stethoscope` | Diagnostic stethoscope chestpiece |
| 110 | `dental_chair_operatory` | Dental Operatory Chair Suite | Reclining dental chair, overhead lamp, local anesthesia, and oral procedures. | `phosphor-lucide` | `tooth` | Clean tooth crown silhouette |
| 111 | `therapy_couch_room` | Psychotherapy Office & Analyst's Couch | Warm, soundproofed room with armchair and couch for confession and emotional breakthroughs. | `phosphor-lucide` | `brain` | Mind/brain contour in calm setting |
| 112 | `imaging_xray_room` | X-Ray, CT, MRI & Ultrasound Suite | Lead-lined imaging room for discovering internal injuries or viewing pregnancy ultrasounds. | `phosphor-lucide` | `scan` | Four-corner diagnostic scan frame |
| 113 | `blood_draw_cubicle` | Phlebotomy & Sample Collection Cubicle | Partitioned booth for blood draws, toxicology tests, HIV/pregnancy panels, and DNA swabs. | `phosphor-lucide` | `test-tube` | Capped blood-sample vacutainer tube |
| 114 | `chemotherapy_dialysis_infusion_bay` | Chemotherapy & Hemodialysis Infusion Hall | Row of infusion recliners where chronic patients spend hours connected to pumps. | `phosphor-lucide` | `heart-pulse` | Steady infusion pulse monitor |
| 115 | `surgical_scrub_prep_room` | Surgical Scrub-In & Gowning Anteroom | Deep stainless scrub sinks with an observation window into the operating theater. | `phosphor-lucide` | `droplets` | Sterile water droplets from scrub tap |
| 116 | `operating_theater` | Operating Theater / Surgical Suite | Operating table under bright surgical lamps, general anesthesia, and decisive operations. | `phosphor-lucide` | `activity` | Surgical vital-signs monitor waveform under operating lamps |
| 117 | `post_anesthesia_recovery_pacu` | Post-Anesthesia Care Unit (PACU) | Monitored bay where patients wake up groggy and disoriented right after surgery. | `phosphor-lucide` | `bed-single` | Hospital recovery bed with rail |
| 118 | `icu_ward` | Intensive Care Unit (ICU) Bay | 24/7 vital monitors, intubated or comatose patients, and strictly timed brief visits. | `phosphor-lucide` | `monitor` | Bedside vital-signs monitor screen |
| 119 | `maternity_delivery_room` | Maternity Labor & Delivery Suite | Childbirth suite for natural delivery or C-section with intense emotional stakes. | `phosphor-lucide` | `heart` | Cradled newborn heart symbol |
| 120 | `neonatal_nursery` | Neonatal ICU & Glass Viewing Nursery | Incubators and glass viewing corridor where family members first see a newborn. | `phosphor-lucide` | `baby` | Newborn infant in bassinet |
| 121 | `private_hospital_room` | Private Inpatient Hospital Room | Single-bed room with visitor recliner, TV, flower vases, and closed-door privacy. | `phosphor-lucide` | `bed-double` | Private inpatient bed with headboard |
| 122 | `shared_hospital_ward` | Shared Multi-Bed Hospital Ward (Enfermaria) | Multi-patient room where beds are separated only by thin privacy curtains. | `phosphor-lucide` | `bed` | Ward bed with curtain divider cue |
| 123 | `psychiatric_padded_room` | Psychiatric Seclusion & Restraint Room | Padded ligature-free containment room for patients in acute psychotic crisis. | `custom-svg` | `custom/caps-mental-care` | Human profile silhouette cradling a balanced lotus/wave mind symbol |
| 124 | `physical_therapy_rehab_gym` | Physical Therapy & Motor Rehabilitation Gym | Parallel walking bars, balance balls, and mats where injured patients relearn mobility. | `phosphor-lucide` | `accessibility` | Human figure inside mobility circle |
| 125 | `nurses_station` | Central Ward Nurses' Station | Central counter of a hospital wing holding patient charts, call-bell boards, and med carts. | `phosphor-lucide` | `clipboard-list` | Patient chart clipboard with checklist |
| 126 | `hospital_internal_pharmacy_vault` | Hospital Controlled-Substances Pharmacy Vault | Restricted dispensary storing morphine, anesthetics, and high-security narcotics. | `phosphor-lucide` | `pill` | Locked capsule dispensary emblem |
| 127 | `sterilization_autoclave_room` | Central Sterile Supply & Autoclave Room (CME) | High-heat steam autoclaves for sterilizing surgical instruments. | `phosphor-lucide` | `thermometer-hot` | High-temperature mercury thermometer |
| 128 | `staff_on_call_sleeping_room` | On-Call Staff Sleeping Quarters (Conforto Médico) | Bunk room where exhausted doctors and nurses nap—or hook up—during 24-hour shifts. | `phosphor-lucide` | `moon` | Restful crescent night moon |
| 129 | `hospital_morgue` | Basement Hospital Morgue & Cold Drawers | Subterranean refrigerated holding room for deceased patients awaiting funeral transfer or autopsy. | `phosphor-lucide` | `snowflake` | Cold-chamber frost symbol |
| 130 | `vet_kennel_recovery_cages` | Veterinary Inpatient Kennel & Recovery Cages | Clinical holding room with stainless cages where post-op dogs and cats recover. | `phosphor-lucide` | `paw-print` | Animal paw pad inside clinical frame |
| 131 | `gym_weight_floor` | Free-Weights & Bodybuilding Gym Floor | Weight machines, dumbbell racks, wall-to-wall mirrors, and between-set socializing. | `phosphor-lucide` | `dumbbell` | Heavy hand dumbbell weight |
| 132 | `group_spin_aerobics_studio` | Spinning & Group Fitness Studio | Mirrored studio with loud music for indoor cycling, dance, or aerobics classes. | `phosphor-lucide` | `music` | High-tempo musical note |
| 133 | `dojo_tatami_training_mat` | Martial Arts Tatami Mat Floor | Padded mat area for Jiu-Jitsu rolling, judo throws, and sparring rounds. | `custom-svg` | `custom/dojo-torii-belt` | Tied martial arts black belt beneath a minimalist dojo beam |
| 134 | `sauna_steam_room` | Dry Sauna / Steam Room | Dense steam, cedar benches, intense heat, and hushed conversations in towels. | `phosphor-lucide` | `cloud` | Dense rising steam cloud |
| 135 | `massage_treatment_cabin` | Massage & Esthetic Treatment Cabin | Dimly lit private room with padded table, essential oils, and soothing ambiance. | `phosphor-lucide` | `sparkles` | Relaxation sparkle stars |
| 136 | `salon_hair_wash_chair_floor` | Salon Styling Stations & Shampoo Bowls | Mirrored styling chairs and washbasins where clients confide in their stylist or barber. | `phosphor-lucide` | `scissors` | Stylist shears and comb cue |
| 137 | `tanning_waxing_esthetic_cabin` | Tanning Bed & Waxing Cabin | Private enclosed booth for UV tanning, rooftop tape-tanning, or waxing treatments. | `phosphor-lucide` | `sun` | Bright UV sun emblem |
| 138 | `tattoo_piercing_chair_booth` | Tattoo & Piercing Artist Booth | Sterile reclining chair station where tattooists ink clients over hours of candid talk. | `custom-svg` | `custom/tattoo-coil-machine` | Rotary/coil tattoo machine angled with needle tip and ink drop |

---

## Group E: Education, Offices, Retail & Industrial Interiors (`education_office_retail_industrial_interiors` — 41 types)

Classrooms, academic labs, corporate boardrooms, media studios, retail floors, bank vaults, and factory bays.

| # | `room_type_id` | `name_en` | `roleplay_semantics_en` | `icon_source` | `icon_id` | `semiotic_cue` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 139 | `classroom` | Standard Classroom | Rows of desks, whiteboard, roll call, exams, whispered notes, and daily school life. | `phosphor-lucide` | `presentation` | Classroom whiteboard on wall |
| 140 | `university_lecture_amphitheater` | Tiered University Lecture Hall | Stepped amphitheater seating for large undergraduate courses and keynote lectures. | `phosphor-lucide` | `graduation-cap` | Academic mortarboard cap |
| 141 | `science_wet_lab` | Chemistry & Biology Wet Lab | Lab benches with reagent bottles, Bunsen burners, fume hoods, and microscopes. | `phosphor-lucide` | `flask-conical` | Erlenmeyer conical laboratory flask |
| 142 | `computer_it_lab` | Computer & IT Laboratory | Rows of desktop workstations for coding labs, research, or group assignments. | `phosphor-lucide` | `monitor` | Desktop workstation monitor |
| 143 | `cleanroom_biosafety_lab` | Biosafety Cleanroom & Airlock Lab | Pressurized sterile containment lab for pathogen research or microelectronics. | `phosphor-lucide` | `biohazard` | Three-crescent biohazard warning symbol |
| 144 | `school_secretary_desk` | School Registrar & Academic Secretary Counter | Front counter for transcripts, enrollment forms, tuition issues, and report cards. | `phosphor-lucide` | `clipboard-list` | Administrative folder and checklist |
| 145 | `guidance_counselor_office` | School Guidance Counselor's Office | Private office for mediating student conflicts, emotional support, and calling parents. | `phosphor-lucide` | `message-circle` | Rounded dialogue speech bubble |
| 146 | `principal_dean_office` | Principal's / Dean's Office | Closed administrative office for serious disciplinary hearings, suspensions, and school policy. | `phosphor-lucide` | `briefcase` | Executive authority briefcase |
| 147 | `teachers_lounge` | Teachers' Lounge & Faculty Room | Coffee between periods, grading stacks of exams, and off-the-record staff chatter. | `phosphor-lucide` | `coffee` | Faculty room coffee mug |
| 148 | `school_infirmary_nurse_room` | School Nurse's Infirmary | Cot bed and first-aid cabinet for sick students or resting away from class. | `phosphor-lucide` | `first-aid` | First-aid cross emblem |
| 149 | `school_hallway_lockers` | School Hallway & Student Lockers | Between-class rush, locker combinations, bulletin boards, and hallway drama. | `phosphor-lucide` | `locker` | Row of metal school lockers |
| 150 | `school_recess_courtyard` | School Recess Courtyard (Pátio de Recreio) | Break-time social cliques, bench flirting, loud bell, and schoolyard confrontations. | `phosphor-lucide` | `bell` | Ringing school recess bell |
| 151 | `school_cafeteria_canteen` | School Cafeteria & Snack Canteen | Lunch line, snack counter, and crowded communal student tables. | `phosphor-lucide` | `utensils` | Cafeteria fork and spoon |
| 152 | `school_covered_sports_gym` | Covered School Gymnasium | PE classes, inter-class tournaments, bleachers, and school assemblies. | `phosphor-lucide` | `trophy` | School athletics trophy cup |
| 153 | `library_reading_hall` | Library Main Reading Hall | Long quiet study tables, reference shelves, and hushed concentration. | `phosphor-lucide` | `book-open` | Open study book on reading desk |
| 154 | `library_individual_study_carrel` | Library Study Carrel / Group Study Room | Small glass-walled room or partitioned booth for group projects or intense focus. | `phosphor-lucide` | `book` | Closed hardcover study volume |
| 155 | `library_rare_archives_stack` | Basement Rare-Book Stacks & Newspaper Archive | Deep, isolated aisles of rolling shelves, microfilm, dusty bound newspapers, and silence. | `phosphor-lucide` | `library` | Tall archive bookshelf stacks |
| 156 | `corporate_reception_turnstiles` | Corporate Lobby & Badge Turnstiles | Front security desk, visitor webcam photo badges, optical turnstiles, and waiting sofas. | `phosphor-lucide` | `id-card` | Lanyard security access badge |
| 157 | `open_office_cubicles` | Open-Plan Office Cubicle Floor | Rows of workstations, ringing phones, KPI pressure, and everyday office politics. | `phosphor-lucide` | `laptop` | Open office workstation laptop |
| 158 | `boardroom_meeting_room` | Corporate Boardroom & Conference Room | Long conference table with projector for pitches, contract signings, and power clashes. | `phosphor-lucide` | `presentation` | Presentation chart screen |
| 159 | `executive_ceo_office` | Corner Executive / CEO Suite | High-floor private office with panoramic glass views for top-level decisions. | `phosphor-lucide` | `crown` | Executive crown emblem |
| 160 | `hr_interview_room` | HR Interview & Termination Room | Private room for job interviews, sensitive performance reviews, or layoffs. | `phosphor-lucide` | `user-check` | Candidate profile with checkmark |
| 161 | `office_breakroom_pantry` | Office Breakroom & Coffee Pantry (Copa) | Espresso machine, shared microwave, company fridge, and watercooler gossip. | `phosphor-lucide` | `cup-soda` | Breakroom takeaway cup / mug |
| 162 | `dead_archive_file_room` | Dead-File Archive Room (Arquivo Morto) | Windowless room of boxed paper records; ideal for digging up old dirt or hiding. | `phosphor-lucide` | `folder-archive` | Archived file folder with zipper/box |
| 163 | `press_briefing_media_room` | Press Briefing Room & Media Podium | Lectern clustered with network microphones for official statements and tough Q&As. | `phosphor-lucide` | `mic-vocal` | Clustered press briefing microphone |
| 164 | `acoustic_recording_vocal_booth` | Soundproof Radio / Podcast / Vocal Booth | Foam-lined acoustic booth with broadcast boom mics and glass control-room window. | `phosphor-lucide` | `radio` | On-air broadcast microphone waves |
| 165 | `tv_news_chroma_studio_floor` | TV Soundstage & News Anchor Set | Lit anchor desk or chroma-key studio floor with studio cameras and floor crew. | `phosphor-lucide` | `video` | Broadcast studio video camera |
| 166 | `server_it_room` | Server Room / Data Closet (CPD) | Chilled server racks behind a keycard door; target for physical hacking or IT maintenance. | `phosphor-lucide` | `server` | Stacked network server unit |
| 167 | `cctv_security_room` | CCTV Security Monitoring Room | Wall of live camera feeds watched by building security guards. | `phosphor-lucide` | `cctv` | Pan-tilt surveillance camera |
| 168 | `retail_sales_floor` | Retail Sales Floor & Store Aisles | Display shelves, clothing racks, shop windows, and browsing customers. | `phosphor-lucide` | `shopping-bag` | Retail carry bag |
| 169 | `fitting_room` | Clothing Store Fitting Room (Provador) | Curtained or locked mirror cubicle for trying on clothes in privacy. | `phosphor-lucide` | `shirt` | Garment on hanger in booth |
| 170 | `checkout_cashier_counter` | Checkout Counter & Cashier Queue | Barcode scanner, payment terminal, small talk, or till hold-ups. | `phosphor-lucide` | `credit-card` | Payment card with chip and stripe |
| 171 | `stockroom_back_storage` | Back-of-House Retail Stockroom (Almoxarifado) | Employee-only storage room stacked with inventory boxes behind the sales floor. | `phosphor-lucide` | `boxes` | Stacked inventory cartons |
| 172 | `atm_self_service_vestibule` | 24-Hour ATM Glass Vestibule | Glass-enclosed bank lobby accessible after hours for cash withdrawals and deposits. | `phosphor-lucide` | `credit-card` | ATM card insertion slot cue |
| 173 | `bank_vault_treasury` | Main Bank Vault & Treasury | Heavy circular steel vault door guarding bulk cash reserves and bullion. | `phosphor-lucide` | `vault` | Armored square vault with spoke wheel |
| 174 | `safe_deposit_box_vault` | Private Safe-Deposit Box Viewing Room | Discreet locked room where clients open dual-key safe-deposit boxes in private. | `phosphor-lucide` | `lock` | Dual-key security lock |
| 175 | `mechanic_inspection_pit_lift` | Hydraulic Car Lift & Mechanic Bay | Shop bay beneath a raised vehicle with pneumatic tools, oil pans, and grease. | `phosphor-lucide` | `wrench` | Mechanic wrench beneath vehicle |
| 176 | `factory_assembly_floor` | Factory Assembly Line Floor | Heavy industrial machinery, conveyor belts, ear-splitting noise, and hard hats. | `phosphor-lucide` | `factory` | Industrial gear and assembly line |
| 177 | `factory_workers_canteen_locker` | Workers' Locker Room & Plant Canteen | Metal lockers, punch-clock terminal, and shift workers' lunch tables. | `phosphor-lucide` | `hard-hat` | Worker safety hard hat |
| 178 | `loading_dock` | Rear Truck Loading Dock | Raised freight bay for backing in box trucks, unloading pallets, or covert exits. | `phosphor-lucide` | `truck` | Freight truck at loading bay |
| 179 | `truck_weighbridge_gatehouse` | Logistics Weighbridge & Freight Gatehouse | Checking bills of lading, cargo seals, and truck weights at the yard entrance. | `custom-svg` | `custom/gatehouse-barrier` | Security booth window with raised striped boom barrier |

---

## Group F: Religious, Cultural, Sports & Event Venue Interiors (`religious_cultural_sports_event_interiors` — 29 types)

Sanctuaries, confessionals, terreiro halls, theater stages, museum vaults, locker rooms, and stadium skyboxes.

| # | `room_type_id` | `name_en` | `roleplay_semantics_en` | `icon_source` | `icon_id` | `semiotic_cue` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 180 | `church_nave_sanctuary` | Church Nave & Worship Pews | Rows of wooden pews where worshippers pray, attend service, or sit in quiet thought. | `phosphor-lucide` | `church` | Vaulted church nave and steeple |
| 181 | `altar_pulpit` | Sanctuary Altar & Preaching Pulpit | Raised solemn chancel for sermons, wedding vows, liturgy, and sacred rituals. | `phosphor-lucide` | `cross` | Altar cross over steps |
| 182 | `confessional_booth` | Confessional Booth | Wooden lattice-screened booth for whispered confession of sins and secrets to a priest. | `phosphor-lucide` | `message-square` | Screen-divided whispered speech bubble |
| 183 | `church_sacristy` | Sacristy / Vestry | Side room off the altar storing chalices, vestments, parish registers, and sacramental wine. | `phosphor-lucide` | `key` | Ornate sacristy key and book |
| 184 | `pastoral_counseling_office` | Pastoral Office / Spiritual Counseling Study | Closed study for private spiritual guidance with a priest, pastor, rabbi, or sheikh. | `phosphor-lucide` | `heart-handshake` | Compassionate pastoral hands |
| 185 | `baptistery_immersion_pool` | Baptistery Font & Immersion Pool | Stone baptismal font or immersion tank for christenings and conversion rites. | `phosphor-lucide` | `droplet` | Sacred water droplet over basin |
| 186 | `bell_tower_choir_loft` | Bell Tower (Belfry) & Upper Choir Loft | Elevated organ gallery or steep belfry overlooking the sanctuary and neighborhood. | `phosphor-lucide` | `bell` | Swinging bronze church bell |
| 187 | `sunday_school_catechesis_room` | Catechesis & Sunday School Classroom | Side room used for youth groups, scripture study, or community prayer circles. | `phosphor-lucide` | `book-heart` | Scripture study book with heart |
| 188 | `temple_communal_kitchen_hall` | Parish Social Hall & Ritual Kitchen (Cozinha de Santo) | Communal hall and kitchen for charity meals, church bazaars, or preparing sacred offerings. | `phosphor-lucide` | `cooking-pot` | Large communal cauldron pot |
| 189 | `spiritist_passe_room` | Spiritist Energy-Healing & Mediumship Room (Sala de Passe) | Dimly lit silent room for laying-on-of-hands energy passes or mediumistic sessions. | `custom-svg` | `custom/spiritist-halo-book` | Open book beneath a rising radiant sun horizon |
| 190 | `terreiro_barracao` | Terreiro Main Ritual Hall (Barracão de Gira) | Central hall where atabaque drumming, sacred chants, dances, and spirit consultations take place. | `custom-svg` | `custom/terreiro-atabaque-altar` | Sacred ritual atabaque drum flanked by crossed axé feathers and beads |
| 191 | `terreiro_ronco_camarinha` | Sacred Initiation Cloister & Altar Room (Roncó / Camarinha / Peji) | Strictly restricted inner sanctum housing sacred Orisha shrines and initiation retreats. | `custom-svg` | `custom/terreiro-atabaque-altar` | Sacred altar drum and ritual bead necklace |
| 192 | `divination_buzios_tarot_room` | Cowrie-Shell Divination & Oracle Chamber (Sala de Jogo de Búzios) | Private table with woven mat, candle, and cowrie shells or tarot deck for personal readings. | `custom-svg` | `custom/divination-cowrie-shells` | Four open cowrie shells (búzios) arranged in a divination cast |
| 193 | `meditation_zendo_hall` | Silent Meditation Hall (Zendo) | Tatami-matted hall with zafu cushions and incense for silent mindfulness practice. | `phosphor-lucide` | `flower-lotus` | Calm lotus meditation blossom |
| 194 | `funeral_viewing_chapel` | Funeral Wake Viewing Chapel (Capela de Velório) | Solemn parlor where the open casket rests for overnight family vigils and final goodbyes. | `phosphor-lucide` | `flame` | Memorial vigil candle flame |
| 195 | `box_office_ticket_booth` | Venue Box Office & Ticket Window (Bilheteria) | Glass ticket booth at the venue entrance for buying admission or picking up press passes. | `phosphor-lucide` | `ticket` | Perforated admission ticket |
| 196 | `theater_cinema_foyer_lobby` | Theater Foyer & Cinema Concession Lobby | Pre-show gathering hall, popcorn/coffee counter, and post-screening discussions. | `phosphor-lucide` | `popcorn` | Striped tub of movie popcorn |
| 197 | `cinema_screening_room` | Cinema Screening Auditorium | Tiered plush seats in the dark facing a giant projection screen and surround sound. | `phosphor-lucide` | `film` | Perforated 35mm motion-picture filmstrip |
| 198 | `theater_auditorium_hall` | Theater Auditorium & Convention Seating | Velvet orchestra and balcony seats facing the stage for plays, operas, or graduations. | `phosphor-lucide` | `drama` | Stage masks over auditorium rows |
| 199 | `stage_wings_coxia` | Center Stage & Backstage Wings (Palco e Coxia) | The lit wooden stage boards and the shadowed side curtains where actors wait for cues. | `phosphor-lucide` | `sparkles` | Stage spotlight beam and curtain |
| 200 | `projection_control_booth` | Projection, Lighting & Sound Control Booth | Elevated rear technical booth overlooking the hall with mixing desks and spotlights. | `phosphor-lucide` | `sliders-horizontal` | Mixing console fader sliders |
| 201 | `rehearsal_mirror_dance_room` | Mirrored Dance & Theater Rehearsal Studio | Spring-floor studio with wall mirrors and ballet barres for dance, drama, or band rehearsals. | `phosphor-lucide` | `music` | Rehearsal rhythm note |
| 202 | `museum_exhibition_gallery_hall` | Museum Exhibition Gallery Hall | Climate-controlled gallery displaying framed masterpieces or glass-cased artifacts under guard. | `phosphor-lucide` | `frame` | Framed gallery artwork |
| 203 | `museum_restoration_vault` | Museum Technical Vault & Conservation Lab | Restricted basement vault where unexhibited relics are cataloged, authenticated, and restored. | `phosphor-lucide` | `paintbrush` | Fine conservation artist brush |
| 204 | `locker_changing_room` | Athletic Locker & Changing Room (Vestiário) | Benches, metal lockers, showers, pre-game pep talks, and post-match locker-room tensions. | `phosphor-lucide` | `shirt` | Team jersey shirt silhouette |
| 205 | `sports_medical_doping_room` | Stadium Medical Clinic & Anti-Doping Room | Tunnel-level sports medicine room for treating injured athletes and collecting doping samples. | `phosphor-lucide` | `first-aid-kit` | Sports medical kit with cross |
| 206 | `combat_ring_octagon_cage` | Boxing Ring / MMA Octagon Cage | Roped canvas ring or chain-link octagon at the center of combat bouts. | `custom-svg` | `custom/dojo-torii-belt` | Tied martial arts black belt beneath a minimalist dojo/ring beam |
| 207 | `stadium_bleachers_stands` | Stadium General Bleachers (Arquibancada) | Concrete terraces or stadium seats where roaring fans chant, wave banners, and watch the match. | `phosphor-lucide` | `megaphone` | Fan cheering megaphone |
| 208 | `stadium_luxury_skybox` | Stadium VIP Luxury Skybox (Camarote de Arena) | Glass-fronted private suite with catering, open bar, and prime pitch views for VIPs. | `phosphor-lucide` | `crown` | VIP skybox crown emblem |

---

## Group G: Security, Justice, Prison & Underworld Interiors (`security_justice_prison_underworld_interiors` — 40 types)

Police interrogation rooms, forensic labs, courtrooms, prison cellblocks, and clandestine criminal rooms.

| # | `room_type_id` | `name_en` | `roleplay_semantics_en` | `icon_source` | `icon_id` | `semiotic_cue` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 209 | `police_front_desk_plantao` | Police Precinct Front Desk (Balcão de Plantão) | 24/7 duty counter for filing incident reports (B.O.), distraught victims, and patrol handoffs. | `phosphor-lucide` | `shield-alert` | Police shield with duty alert mark |
| 210 | `detective_bullpen_cartorio` | Detectives' Bullpen & Clerks' Office (Cartório Policial) | Desks piled with case binders, witness depositions, and pinboard evidence maps. | `phosphor-lucide` | `folder-search` | Case dossier folder with magnifying glass |
| 211 | `police_chief_office` | Precinct Chief's Office (Gabinete do Delegado) | Closed office of the commanding police chief for bail rulings, press leaks, and sensitive cases. | `phosphor-lucide` | `award` | Chief's authority star badge |
| 212 | `wiretap_surveillance_intel_room` | Police Intelligence & Wiretap Room (Sala de Escuta / SI) | Headphones, court-authorized phone taps, GPS trackers, and covert ops screens. | `phosphor-lucide` | `ear` | Listening ear with audio wave cue |
| 213 | `interrogation_room` | Police Interrogation Room | Cold metal table, harsh overhead lamp, high-pressure questioning, and confessions. | `phosphor-lucide` | `lamp-pendant` | Single low-hanging interrogation lamp |
| 214 | `lineup_mirror_room` | One-Way Mirror Lineup Room (Sala de Reconhecimento) | Observation room behind Venetian glass where witnesses identify suspects unseen. | `phosphor-lucide` | `eye` | Observing eye behind vertical mirror line |
| 215 | `holding_cell_xadrez` | Precinct Holding Cell (Xadrez da Delegacia) | Barred temporary lockup where suspects caught in the act await custody hearings. | `custom-svg` | `custom/prison-bars-window` | Heavy vertical iron cell bars crossed by a locked horizontal transom |
| 216 | `police_armory_vault` | Police / Barracks Weapons Armory (Paiol / Reserva de Armas) | Caged vault where officers sign out rifles, sidearms, ammunition, and ballistic vests. | `custom-svg` | `custom/weapons-crate-ammo` | Stenciled munitions crate with two upright rifle cartridges |
| 217 | `evidence_locker_room` | Police Evidence & Seized Property Vault | High-security room storing tagged crime weapons, seized narcotics, and case exhibits. | `phosphor-lucide` | `package-search` | Sealed evidence box with inspection lens |
| 218 | `crime_lab_ballistics_forensics` | Forensic Science & Ballistics Laboratory | Scientific analysis of trace evidence, latent fingerprints, DNA profiles, and bullet striations. | `phosphor-lucide` | `microscope` | Forensic comparison microscope |
| 219 | `police_locker_briefing_room` | Police Locker & Tactical Briefing Room (Preleção) | Squad lockers and briefing room where commanders lay out raid targets before dawn. | `phosphor-lucide` | `users-four` | Tactical squad formation icon |
| 220 | `police_motor_pool_garage` | Tactical Motor Pool & Prisoner Transfer Garage | Basement sally-port garage where paddy wagons load/unload detainees out of sight of reporters. | `phosphor-lucide` | `siren` | Patrol vehicle roof siren beacon |
| 221 | `autopsy_room_iml` | Forensic Autopsy Suite (Sala de Necropsia / IML) | Stainless-steel dissection tables, scales, and cold drawers for medical-examiner autopsies. | `custom-svg` | `custom/iml-forensic-tag` | Forensic toe-tag card with a cadaverous cross-hair marker |
| 222 | `morgue_body_viewing_window` | Morgue Body-Identification Viewing Window | Somber anteroom with a glass partition where next of kin formally identify a body. | `custom-svg` | `custom/iml-forensic-tag` | Forensic identification tag behind viewing pane |
| 223 | `courtroom_hearing_hall` | Courtroom & Jury Trial Chamber (Sala de Audiências) | Bench for judge, prosecutor, defense counsel, defendant, and witness stand during trials. | `phosphor-lucide` | `gavel` | Judicial gavel over bench |
| 224 | `judge_chambers` | Judge's Private Chambers (Gabinete do Juiz) | Magistrate's private office for signing search warrants, wiretap orders, and sentences. | `phosphor-lucide` | `scale` | Balanced justice scales |
| 225 | `courthouse_lawyer_parlor_oab` | Courthouse Bar Lounge & Attorney-Client Parlor (Sala da OAB) | Lawyers-only lounge and private booth for confidential consultation with a detained client. | `phosphor-lucide` | `briefcase` | Legal counsel briefcase |
| 226 | `jury_deliberation_secret_room` | Sequestered Jury Deliberation & Protected Witness Room | Locked soundproof room for jury voting or shielding threatened witnesses before testimony. | `phosphor-lucide` | `lock-keyhole` | Closed padlock with central keyhole |
| 227 | `courthouse_holding_cell` | Courthouse Basement Holding Cell (Carceragem do Fórum) | Subterranean barred cell where handcuffed defendants wait to be called up to the courtroom. | `custom-svg` | `custom/prison-bars-window` | Heavy vertical iron cell bars crossed by a locked horizontal transom |
| 228 | `prison_intake_strip_search` | Prison Intake & Strip-Search Room (Sala de Revista) | Inmate admission processing (mugshots, uniforms) or invasive body-scanner searches for visitors. | `phosphor-lucide` | `scan` | Full-body security scanner frame |
| 229 | `prison_tier_catwalk_corridor` | Prison Cellblock Tier & Guards' Catwalk (Galeria / Raio) | Barred cellblock corridor beneath the elevated catwalk patrolled by correctional officers. | `custom-svg` | `custom/prison-bars-window` | Heavy vertical iron cell bars crossed by a locked horizontal transom |
| 230 | `prison_cell_block` | Shared Prison Cell (Cela Coletiva / Xadrez) | Locked concrete cell with slab bunks (jegas), inmate-enforced codes, and claustrophobic tension. | `custom-svg` | `custom/prison-bars-window` | Heavy vertical iron cell bars crossed by a locked horizontal transom |
| 231 | `solitary_confinement_cell` | Solitary Confinement Cell (Solitária / Castigo / RDD) | Windowless isolation cell for disciplinary punishment or protective custody. | `custom-svg` | `custom/prison-bars-window` | Isolated barred cell door with padlock |
| 232 | `prison_yard` | Prison Exercise Yard (Pátio de Banho de Sol) | High-walled concrete yard where inmates walk, play soccer, broker deals, or spark riots. | `phosphor-lucide` | `fence` | Barbed-wire prison perimeter fence under sun |
| 233 | `prison_mess_hall` | Prison Mess Hall / Inmate Cafeteria | Communal dining hall for inmates; high-tension hub for passing messages and gang fights. | `phosphor-lucide` | `utensils` | Metal mess-hall tray utensils |
| 234 | `prison_infirmary_ward` | Prison Infirmary Ward | In-prison medical bay for treating stab wounds, dispensing meds, or staging escape plots. | `phosphor-lucide` | `first-aid` | Medical cross inside barred ward |
| 235 | `prison_workshop_laundry` | Prison Work Shop & Industrial Laundry | Interior workshop where inmates work for sentence reduction and gain access to tools. | `phosphor-lucide` | `hammer` | Workshop hammer tool |
| 236 | `prison_visitation_parlor` | Prison Family Visitation Parlor & Glass Booths | Supervised visitation yard or glass-partitioned booths with handset intercoms. | `phosphor-lucide` | `phone` | Visitation booth handset phone |
| 237 | `conjugal_visitation_room` | Conjugal Visitation Room (Quarto de Visita Íntima) | Private room in the conjugal wing where inmates meet partners without direct guard eavesdropping. | `phosphor-lucide` | `heart` | Private conjugal heart emblem |
| 238 | `prison_wall_watchtower` | Prison Perimeter Wall Watchtower (Guarita da Muralha) | Elevated armed guard post overlooking the penitentiary walls and yard. | `phosphor-lucide` | `tower-control` | Elevated guard watchtower turret |
| 239 | `clandestine_chem_synthesis_lab` | Clandestine Chemical Synthesis Lab | Hidden room with glassware, toxic solvents, and exhaust fans for cooking synthetic drugs. | `custom-svg` | `custom/clandestine-lab-mask` | Conical boiling flask paired with a twin-filter respirator mask |
| 240 | `drug_cutting_packaging_room` | Drug Cutting & Packaging Room (Sala de Endolação) | Table lined with precision scales, hydraulic presses, and plastic capsules/baggies for street retail. | `custom-svg` | `custom/biqueira-drop-hand` | Precision packet handoff and portioning symbol |
| 241 | `indoor_grow_tent_room` | Indoor Hydroponic Grow Room | Foil-lined sealed room with high-wattage UV lamps, carbon filters, and illicit plants. | `custom-svg` | `custom/grow-house-uv-leaf` | Serrated botanical leaf beneath a hooded UV grow lamp reflector |
| 242 | `money_counting_laundering_room` | Cartel Cash-Counting & Safe Room | High-speed bill counters, off-the-books ledgers, vacuum-sealed cash bricks, and floor safes. | `phosphor-lucide` | `banknote` | Stacks of counted currency bills |
| 243 | `scam_cloning_server_room` | Card-Cloning, SIM-Farm & Forgery Workbench | Technical room packed with SIM-box racks, magnetic card skimmers, and ID card printers. | `phosphor-lucide` | `cpu` | Microchip / SIM array module |
| 244 | `weapons_stash_bunker` | Clandestine Weapons Bunker / False-Wall Armory | Hidden room or false wall storing crates of assault rifles, pistols, grenades, and tactical vests. | `custom-svg` | `custom/weapons-crate-ammo` | Stenciled wooden munitions crate with two upright rifle cartridges |
| 245 | `underground_surgery_operating_room` | Underground Back-Alley Operating Room | Improvised surgical room with gurney and lamps for extracting bullets off the books. | `phosphor-lucide` | `scissors` | Surgical clamp shears for off-the-books bullet extraction |
| 246 | `captivity_hostage_room` | Hostage Captivity Room (Quarto de Cativeiro) | Padlocked room with boarded-up windows where kidnap victims are held under guard. | `custom-svg` | `custom/captivity-padlock-chain` | Heavy diagonal iron chain secured by a closed shackle padlock |
| 247 | `torture_kangaroo_court_room` | Illegal Interrogation & Syndicate Kangaroo-Court Room (Tribunal do Crime) | Soundproofed or remote room used by gangs or militias for summary trials and debt coercion. | `custom-svg` | `custom/captivity-padlock-chain` | Heavy iron chain and padlock of unlawful coercion |
| 248 | `secret_room_hidden_passage` | Secret Room / False Wall / Escape Tunnel | Concealed compartment behind a bookcase, trapdoor, or false wall for hiding or escaping raids. | `custom-svg` | `custom/safe-house-blind` | Concealed viewport behind half-drawn slats and keyhole |
