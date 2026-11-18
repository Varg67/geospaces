# GeoSpace Point-Level Urban Places Taxonomy (`PlaceTypeRegistry`)

> [!IMPORTANT]
> **Scope of this catalog:** Exclusively **point-level urban places (nodes / stations)** in the GeoSpace spatial graph.
> - **Out of scope (Polygons / Regions):** Entire neighborhoods, districts, cities, full parks, open university campuses, entire penitentiary complexes, or shopping centers treated as areal polygons. When a large complex interacts with the urban network, it is anchored at its **focal access or gathering node** (e.g., gatehouse, atrium, wake chapel, sound-wall stage, or security checkpoint).
> - **Interior rooms (`Place` → `interior_room`):** Cataloged separately in [interior-rooms-taxonomy.md](interior-rooms-taxonomy.md).

## Overview & Category Breakdown

| # | Category ID | Category Name | Point Types |
| :--- | :--- | :--- | :--- |
| 1 | `residential_lodging` | Residential & Lodging | 28 |
| 2 | `food_cafe_nightlife` | Food, Cafe & Nightlife | 38 |
| 3 | `health_medical_wellness` | Health, Medical & Wellness | 33 |
| 4 | `commerce_services_mobility` | Everyday Commerce, Services & Mobility | 63 |
| 5 | `education_research_work` | Education, Research & Work | 46 |
| 6 | `culture_leisure_sports` | Culture, Leisure, Sports & Entertainment | 32 |
| 7 | `nature_open_spaces_points` | Nature & Open Spaces (Strict Point Nodes) | 25 |
| 8 | `religion_spirituality` | Religion & Spirituality | 24 |
| 9 | `security_justice_civic_underworld` | Security, Justice, Civic & Underworld | 52 |
| **Total** | **`urban_places`** | **Consolidated Point-Level Place Types** | **341** |

---

## 1. Residential & Lodging (`residential_lodging` — 28 types)

Permanent dwellings, collective living spaces, institutional shelters, and temporary hospitality nodes.

| # | `type_id` | `name_en` | `roleplay_semantics_en` | `icon_source` | `icon_id` | `semiotic_cue` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `house_detached` | Detached House / Two-Story Home | Single-family or character residence with direct street access and domestic privacy. | `phosphor-lucide` | `house` | Pitched roof house with front door |
| 2 | `apartment_building` | Residential Apartment Building | Multi-family vertical building with lobby, neighbors, and condominium rules. | `phosphor-lucide` | `building-apartment` | Multi-story tower with grid of windows |
| 3 | `studio_kitnet` | Studio / Micro-Apartment Building (Kitnet) | Compact, low-cost housing for students, singles, or characters starting over. | `phosphor-lucide` | `door-open` | Single apartment doorway slightly ajar |
| 4 | `flat_aparthotel` | Serviced Flat / Apart-Hotel | Temporary residence for executives, recent divorcees, or discreet meetings with hotel service. | `phosphor-lucide` | `buildings` | Paired modern residential towers |
| 5 | `penthouse_rooftop_residence` | Luxury Penthouse Residence | Top-floor luxury residence for elite parties, blackmail plots, or high-society drama. | `phosphor-lucide` | `crown` | Three-pointed crown denoting top-floor luxury |
| 6 | `student_housing` | Institutional Student Dormitory | Official student residence hall linked to a university or educational institution. | `phosphor-lucide` | `student` | Academic mortarboard cap over profile |
| 7 | `student_fraternity_republica` | Student Cooperative House (República) | Self-managed youth house or shared flat with house parties, split bills, and collective routines. | `phosphor-lucide` | `users-three` | Three overlapping peer silhouettes |
| 8 | `boarding_house` | Boarding House / Tenement (Pensão / Cortiço) | Low-cost rented rooms with forced cohabitation, shared facilities, and hallway gossip. | `phosphor-lucide` | `bed` | Simple single bed frame in profile |
| 9 | `mansion_villa` | Luxury Mansion / High-End Villa | Isolated high-standard estate with tall perimeter walls and private security. | `phosphor-lucide` | `castle-turret` | Fortified turret crown suggesting walled estate |
| 10 | `shack_tenement` | Self-Built Alley Shack / Shanty (Barraco) | Self-built low-income dwelling in a dense informal settlement or hillside alley. | `custom-svg` | `custom/shack-favela-roof` | Layered corrugated gable roof over stacked hillside brickwork |
| 11 | `townhouse_gated_unit` | Gated Townhouse / Village Home | Residential unit inside a horizontal gated community or cul-de-sac village. | `phosphor-lucide` | `house-line` | Row house profile on a ground line |
| 12 | `condo_gatehouse_portaria` | Condominium Gatehouse / Security Booth | Access-control barrier node for visitor identification, deliveries, and entry logs. | `custom-svg` | `custom/gatehouse-barrier` | Security booth window with raised striped boom barrier |
| 13 | `social_housing_conjunto_block` | Public Housing Block (Conjunto Habitacional) | Peripheral low-income housing block with tight-knit community life on the stairwells. | `phosphor-lucide` | `building-2` | Utilitarian twin residential blocks |
| 14 | `country_house_main_lodge` | Country House / Peri-Urban Ranch Lodge (Chácara) | Main lodge of a peri-urban estate used for weekend retreats, parties, or hideouts. | `phosphor-lucide` | `barn` | Gabled country lodge roof with double doors |
| 15 | `beach_vacation_house` | Beach House / Coastal Vacation Home | Seasonal coastal property for weekend getaways, romantic escapes, or beach parties. | `phosphor-lucide` | `palmtree` | Coastal palm frond over water wave |
| 16 | `trailer_rv_park_pad` | Parked Trailer / Motorhome Pad | Home on wheels in a fixed pad; refuge for nomads, drifters, or reclusive characters. | `phosphor-lucide` | `caravan` | Towed camper trailer with side window |
| 17 | `workers_dormitory_alojamento` | Collective Workers' Dormitory | Shared bunkhouse for construction crews, migrants, or shift workers. | `phosphor-lucide` | `bed-double` | Two-tier stacked bunk bed frame |
| 18 | `squat_occupied_building` | Urban Squat / Occupied Building (Ocupação) | Abandoned building reclaimed by housing movements or marginalized urban groups. | `custom-svg` | `custom/squat-occupied-banner` | Multi-story building facade with draped protest banner |
| 19 | `homeless_shelter` | Municipal Homeless Shelter | Temporary institutional overnight shelter with strict curfew and intake rules. | `phosphor-lucide` | `hand-heart` | Open palm cradling a protective heart |
| 20 | `womens_shelter_casa_abrigo` | Confidential Domestic Violence Shelter | Protected secret residence for survivors of severe domestic abuse. | `phosphor-lucide` | `shield-plus` | Protective shield marked with a care cross |
| 21 | `nursing_home` | Assisted Living / Nursing Home | Long-term assisted residence for elderly care, family visits, and quiet routines. | `phosphor-lucide` | `person-simple-walk` | Figure walking with cane support |
| 22 | `orphanage_group_home` | Institutional Youth Group Home / Orphanage | State-supervised collective residence for minors under protective custody. | `phosphor-lucide` | `baby` | Swaddled child face inside protective outline |
| 23 | `convent_seminary_residence` | Cloistered Convent / Religious Seminary | Strict collective residence for nuns, monks, or seminarians. | `phosphor-lucide` | `cross` | Latin cross above cloister arch |
| 24 | `safe_house_hideout_apartment` | Safe House / Covert Hideout Apartment | Apartment rented under a false identity for witness protection or fugitives. | `custom-svg` | `custom/safe-house-blind` | Window with half-drawn venetian blinds and keyhole silhouette |
| 25 | `hotel` | Urban Hotel | Formal temporary hospitality for travelers, business stays, or discreet encounters. | `phosphor-lucide` | `concierge-bell` | Reception service call bell on base |
| 26 | `luxury_resort_boutique_hotel` | Five-Star Boutique Hotel / Urban Resort | Ultra-luxury hospitality for celebrities, diplomats, and black-tie gala events. | `phosphor-lucide` | `sparkle` | Four-point luxury star cluster |
| 27 | `hostel` | Youth Hostel / Backpackers' Lodge | Low-cost shared lodging geared toward backpackers, travelers, and easy socializing. | `phosphor-lucide` | `backpack` | Traveler backpack with front pocket |
| 28 | `roadside_inn_pousada` | Roadside Inn / Guesthouse (Pousada) | Simple transit lodging ideal for highway stopovers, layovers, or laying low. | `phosphor-lucide` | `signpost` | Directional highway signpost at crossroads |

---

## 2. Food, Cafe & Nightlife (`food_cafe_nightlife` — 38 types)

Daytime dining, bakeries, cafes, bars, live music venues, nightclubs, and adult nightlife.

| # | `type_id` | `name_en` | `roleplay_semantics_en` | `icon_source` | `icon_id` | `semiotic_cue` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 29 | `bakery` | Neighborhood Bakery (Padaria) | Everyday morning hub for quick espresso, warm bread, and neighborhood encounters. | `phosphor-lucide` | `bread` | Sliced loaf of warm bread |
| 30 | `coffee_shop` | Coffee Shop / Cafe | Quiet venue for intimate conversations, reading, remote work, or casual dates. | `phosphor-lucide` | `coffee` | Steaming ceramic coffee cup on saucer |
| 31 | `tea_house_boba_cafe` | Tea House / Boba Cafe / Patisserie | Daytime spot for youth meetups or afternoon tea in artisanal pastry shops. | `phosphor-lucide` | `cup-soda` | Tall cup with domed lid and wide straw |
| 32 | `diner_lanchonete` | Counter Diner / Snack Bar (Lanchonete) | Fast, affordable counter meals and fried pastries at any hour of the day. | `phosphor-lucide` | `hamburger` | Layered burger bun with filling |
| 33 | `fast_food_drive_thru` | 24-Hour Fast-Food with Drive-Thru | Late-night oasis for post-club snacks, rideshare drivers, and teenagers. | `phosphor-lucide` | `sandwich` | Fast-food sandwich with drive-thru motion cue |
| 34 | `street_food_stall` | Street Food Cart / Food Truck (Podrão) | Late-night curb food, post-party burgers, and informal sidewalk conversations. | `phosphor-lucide` | `truck` | Compact food-service van with side window |
| 35 | `food_truck_park_pod` | Food Truck Park / Container Village | Fenced open-air lot with shipping-container kitchens and communal picnic tables. | `phosphor-lucide` | `storefront` | Awning storefront over open counter |
| 36 | `boardwalk_kiosk_calcadao` | Urban Promenade Kiosk (Quiosque de Calçadão) | Fixed pedestrian-mall kiosk serving sugarcane juice, coconut water, and snacks. | `custom-svg` | `custom/street-kiosk-parasol` | Hexagonal kiosk counter under a striped parasol |
| 37 | `mall_food_court` | Shopping Mall Food Court | Noisy, neutral indoor dining node for quick meals and public meetings. | `phosphor-lucide` | `utensils-crossed` | Crossed fork and knife emblem |
| 38 | `restaurant_casual` | Casual Restaurant / Buffet by Weight (Self-Service) | Everyday worker lunch spot or uncomplicated family dinner table. | `phosphor-lucide` | `fork-knife` | Parallel fork and table knife |
| 39 | `popular_soup_kitchen_bom_prato` | Subsidized Public Cafeteria / Soup Kitchen | Ultra-low-cost public dining hall serving precarious workers and vulnerable citizens. | `phosphor-lucide` | `bowl-food` | Steaming soup bowl with spoon |
| 40 | `university_cafeteria_bandejao` | University Dining Hall (Bandejão) | Central student socialization hub with long queues, campus flyers, and tray meals. | `phosphor-lucide` | `tray` | Compartmentalized cafeteria meal tray |
| 41 | `restaurant_fine_dining` | Fine Dining Restaurant | Upscale reservation-only dining room for romantic dates or high-stakes business. | `phosphor-lucide` | `chef-hat` | Pleated tall toque blanche chef hat |
| 42 | `sushi_asian_izakaya` | Japanese Restaurant / Izakaya | Sushi bar or intimate nighttime izakaya counter for sake and quiet talks. | `phosphor-lucide` | `fish-simple` | Minimalist sleek fish silhouette |
| 43 | `pizzeria` | Pizzeria | Classic evening gathering spot for friend groups, families, or couples. | `phosphor-lucide` | `pizza` | Triangular pizza slice with toppings |
| 44 | `steakhouse_churrascaria` | Brazilian Steakhouse / Skewer Grill (Churrascaria) | Group celebrations, long lunches, or cold beer with charcoal skewers on the curb. | `phosphor-lucide` | `flame` | Rising charcoal grill flame |
| 45 | `ice_cream_acai_shop` | Ice Cream Parlor / Açaí Shop | Daytime and afternoon refreshment stop for casual strolls and light dates. | `phosphor-lucide` | `ice-cream` | Swirled scoop on a waffle cone |
| 46 | `dark_kitchen_delivery_hub` | Dark Kitchen (Delivery-Only Ghost Kitchen) | Closed production kitchen with couriers waiting outside and high-pressure prep inside. | `custom-svg` | `custom/courier-helmet-bag` | Full-face motorcycle helmet beside an insulated delivery backpack |
| 47 | `dive_bar_boteco` | Corner Dive Bar (Boteco / Pé-Sujo) | Cheap cold beer, counter stools, pool table, neighborhood gossip, and regulars. | `custom-svg` | `custom/boteco-billiard-beer` | Faceted glass tumbler beside an 8-ball billiard sphere |
| 48 | `pub_gastrobar` | Pub / Craft Gastrobar | Modern bar for after-work happy hour, flirting, live acoustic sets, and drinks. | `phosphor-lucide` | `beer-bottle` | Long-neck beer bottle and mug |
| 49 | `craft_brewery_taproom` | Craft Brewery Taproom | Warehouse with stainless fermentation tanks; creative meetup and tasting hub. | `phosphor-lucide` | `barrel` | Bound wooden brewing barrel |
| 50 | `wine_bar_enoteca` | Wine Bar / Enoteca | Curated wine tasting and intimate upper-middle-class conversations. | `phosphor-lucide` | `wine` | Long-stemmed wine glass with pour level |
| 51 | `cocktail_lounge` | Cocktail Lounge / Speakeasy | Dimly lit intimate lounge for signature mixology and seduction. | `phosphor-lucide` | `martini` | Conical martini glass with olive pick |
| 52 | `rooftop_lounge_bar` | Rooftop Lounge Bar | Panoramic sky bar atop a hotel or tower; pricey cocktails, sunset views, and status. | `phosphor-lucide` | `martini` | Martini silhouette elevated over skyline line |
| 53 | `hookah_lounge` | Hookah Lounge / Shisha Bar (Tabacaria Lounge) | Youth nightlife spot with loud beats, flavored smoke clouds, and late-night hanging out. | `custom-svg` | `custom/hookah-narghile` | Traditional tall waterpipe with hose and rising smoke curl |
| 54 | `karaoke_bar_box` | Karaoke Bar & Private Singing Boxes | Late-night singing, post-shift unwinding, and playful group outings. | `phosphor-lucide` | `mic-vocal` | Handheld dynamic stage microphone |
| 55 | `comedy_club` | Stand-Up Comedy Club | Nighttime comedy sets, tight cabaret tables near the stage, and comic backstage life. | `phosphor-lucide` | `laugh` | Winking/laughing expressive face |
| 56 | `live_music_venue` | Live Music Venue / Rock Bar / Jazz Club | Stage-centered venue dedicated to live bands, gigs, and subcultural scenes. | `phosphor-lucide` | `microphone-stage` | Microphone mounted on a floor stand |
| 57 | `forro_sertanejo_dance_hall` | Partner Dance Hall (Forró / Gafieira / Sertanejo) | Packed dance hall for partner dancing, regional live music, and intense flirting. | `phosphor-lucide` | `music-notes` | Beamed eighth notes in motion |
| 58 | `samba_school_quadra` | Samba School Rehearsal Hall (Quadra de Samba) | Percussion rehearsals, community feijoadas, samba dancers, and local patrons. | `custom-svg` | `custom/samba-surdo-drum` | Deep surdo percussion drum with crossed mallets |
| 59 | `nightclub` | Nightclub / Dance Club (Balada / Boate) | Enclosed dance club with DJ booth, VIP bottle service, door line, and bouncers. | `phosphor-lucide` | `disco-ball` | Mirrored sphere suspended from ceiling |
| 60 | `rave_venue` | Electronic Rave Venue (Warehouse or Open-Air) | Extended electronic music gathering, underground rave culture, and sensory immersion. | `phosphor-lucide` | `waveform` | High-energy audio frequency waveform |
| 61 | `baile_sound_wall_stage` | Street Funk Sound-Wall Stage (Fluxo / Paredão) | Focal point of the street party: towering automotive sound wall, crowd, and police tension. | `custom-svg` | `custom/sound-wall-baile` | Stacked wall of subwoofers and horn tweeters radiating sound waves |
| 62 | `after_hours_club` | After-Hours Underground Club (Inferninho) | Opens at dawn when regular clubs close, mixing night owls, artists, and the underworld. | `phosphor-lucide` | `moon-stars` | Crescent moon accompanied by night stars |
| 63 | `love_motel` | Adult Drive-In Love Motel (Motel Rotativo) | Suites with discreet private garage entry for romantic trysts, affairs, or hiding out. | `custom-svg` | `custom/love-motel-neon` | Discreet garage arch topped with a glowing heart neon sign |
| 64 | `swing_club_liberal` | Swingers' Club / Lifestyle Lounge (Casa de Swing) | Private adult club for couples, consensual exploration, secrecy, and hidden blackmail risks. | `custom-svg` | `custom/swing-interlocked-masks` | Two overlapping Venetian masks with a discreet flame motif |
| 65 | `strip_club_adult_venue` | Adult Cabaret / Strip Club | Adult stage entertainment, pole dancing, private booths, and backroom negotiations. | `custom-svg` | `custom/strip-stage-pole` | Vertical floor-to-ceiling stage pole framed by spotlight beams |
| 66 | `cruising_bar_sauna` | Adult Cruising Bar / Bathhouse / Fetish Club | Adult venue geared toward consensual anonymous encounters and fetish subcultures. | `custom-svg` | `custom/darkroom-blindfold-mask` | Half-shadowed domino mask with a keyhole aperture |

---

## 3. Health, Medical & Wellness (`health_medical_wellness` — 33 types)

Hospitals, emergency care, specialized clinics, mental health, pharmacies, fitness, and personal care.

| # | `type_id` | `name_en` | `roleplay_semantics_en` | `icon_source` | `icon_id` | `semiotic_cue` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 67 | `general_hospital` | General Hospital & Emergency Room | Major medical care, inpatient wards, surgeries, and life-or-death emergencies. | `phosphor-lucide` | `hospital` | Hospital facade marked with a medical cross |
| 68 | `urgent_care_upa` | 24-Hour Urgent Care Center (UPA) | Everyday acute emergencies, tense waiting rooms, stitches, and late-night incidents. | `phosphor-lucide` | `first-aid` | Bold medical emergency cross emblem |
| 69 | `ambulance_samu_base` | EMS / Ambulance Dispatch Base (SAMU) | Standby station and dispatch hub for pre-hospital emergency medical rescue crews. | `phosphor-lucide` | `ambulance` | Emergency rescue van with roof beacon |
| 70 | `maternity_hospital_birth_center` | Maternity Hospital / Birth Center | Childbirths, obstetric emergencies, paternity tests, and emotional family milestones. | `phosphor-lucide` | `baby` | Newborn infant face icon |
| 71 | `community_health_clinic` | Primary Care / Neighborhood Health Clinic (UBS) | Neighborhood primary care, prenatal checkups, routine consultations, and free pharmacy. | `phosphor-lucide` | `first-aid-kit` | Medical kit briefcase with cross |
| 72 | `vaccination_sanitary_post` | Vaccination & Sanitary Surveillance Post | Public immunization clinic and base for health inspectors who shut down irregular venues. | `phosphor-lucide` | `syringe` | Hypodermic needle and graduated barrel |
| 73 | `medical_clinic_office` | Private Medical Office / Specialist Clinic | Scheduled specialist medical appointments in a quiet private suite. | `phosphor-lucide` | `stethoscope` | Curved acoustic medical stethoscope |
| 74 | `hemodialysis_oncology_center` | Hemodialysis & Oncology Treatment Center | Severe chronic care facility (chemotherapy/dialysis) imposing strict recurring schedules. | `phosphor-lucide` | `heart-pulse` | Heart outline crossed by ECG pulse line |
| 75 | `fertility_reproductive_clinic` | Fertility & Human Genetics Clinic | In-vitro fertilization, egg freezing, and confidential DNA paternity testing. | `phosphor-lucide` | `dna` | Twisted double-helix DNA strand |
| 76 | `plastic_surgery_clinic` | Plastic & Reconstructive Surgery Clinic | Elective cosmetic surgery, post-op recovery, or clandestine facial alteration. | `phosphor-lucide` | `sparkles` | Clean aesthetic symmetry stars |
| 77 | `dental_clinic` | Dental Clinic / Orthodontist Office | Dental treatments, acute toothache emergencies, and cosmetic smile work. | `phosphor-lucide` | `tooth` | Clean molar crown and root contour |
| 78 | `psychotherapy_office` | Psychotherapy & Psychiatry Office | Confidential therapy sessions, psychological evaluations, and controlled prescriptions. | `phosphor-lucide` | `brain` | Twin cerebral hemispheres viewed from above |
| 79 | `caps_mental_health_center` | Community Psychosocial Care Center (CAPS) | Open-door community mental health service and daytime crisis support. | `custom-svg` | `custom/caps-mental-care` | Human profile silhouette cradling a balanced lotus/wave mind symbol |
| 80 | `psychiatric_hospital_ward` | Inpatient Psychiatric Hospital | Locked psychiatric facility for acute crisis containment and supervised visitation. | `custom-svg` | `custom/caps-mental-care` | Human profile silhouette cradling a balanced lotus/wave mind symbol |
| 81 | `rehab_clinic` | Addiction Rehab Clinic / Therapeutic Community | Voluntary or court-ordered inpatient facility for substance recovery and detox. | `phosphor-lucide` | `lifebuoy` | Segmented rescue lifebuoy ring |
| 82 | `support_group_room_aa` | Mutual-Aid Support Group Hall (AA / NA) | Anonymous circle meetings focused on sobriety, relapses, grief, and recovery. | `custom-svg` | `custom/support-circle-chairs` | Circle of inward-facing chairs around a shared speaking emblem |
| 83 | `diagnostic_lab` | Diagnostic Lab & Medical Imaging Center | Blood draws, toxicology screenings, pregnancy tests, and MRI/CT scans. | `phosphor-lucide` | `test-tube` | Angled glass laboratory test tube |
| 84 | `blood_bank` | Blood Bank / Donation Center (Hemocentro) | Voluntary blood donation center or urgent drives for hospitalized characters. | `phosphor-lucide` | `droplet` | Single symmetrical blood drop |
| 85 | `pharmacy` | Retail Pharmacy / 24h Drugstore | Over-the-counter and prescription medicine, rapid tests, bandages, and late-night runs. | `phosphor-lucide` | `pill` | Two-tone medicinal capsule |
| 86 | `compounding_pharmacy` | Compounding Pharmacy & Herbal Apothecary | Custom-compounded formulas, herbal tinctures, and bespoke prescriptions. | `phosphor-lucide` | `flask-round` | Round-bottom apothecary flask |
| 87 | `nutrition_supplement_store` | Sports Nutrition & Supplement Store | Whey protein, creatine, vitamins, and performance gear for gym regulars. | `phosphor-lucide` | `pill-bottle` | Wide-mouth supplement canister |
| 88 | `veterinary_clinic` | Veterinary Clinic / Pet Hospital | Medical and surgical care for companion animals and injured strays. | `phosphor-lucide` | `paw-print` | Four-toe animal paw pad print |
| 89 | `animal_shelter_zoonoses` | Animal Control & Adoption Shelter (CCZ) | Rescue of stray animals, pet adoptions, and municipal sanitary control. | `phosphor-lucide` | `dog` | Friendly canine head profile |
| 90 | `gym_fitness_center` | Bodybuilding & Fitness Gym | Daily workout routine, body conditioning, and fitness-scene socializing. | `phosphor-lucide` | `dumbbell` | Balanced hand dumbbell weight |
| 91 | `crossfit_functional_box` | CrossFit Box / Functional Training Warehouse | High-intensity group workout warehouse with strong tribal camaraderie. | `phosphor-lucide` | `barbell` | Heavy Olympic barbell with plates |
| 92 | `martial_arts_dojo` | Martial Arts Dojo / Boxing & MMA Gym | Self-defense training, combat sports, sparring ring, and physical discipline. | `custom-svg` | `custom/dojo-torii-belt` | Tied martial arts black belt beneath a minimalist dojo beam |
| 93 | `yoga_pilates_studio` | Yoga & Pilates Studio | Mindful movement, postural rehabilitation, breathing, and meditation practice. | `phosphor-lucide` | `flower-2` | Balanced lotus posture blossom |
| 94 | `beauty_salon` | Hair & Beauty Salon | Visual makeovers, party preparation, hair coloring, and neighborhood gossip. | `phosphor-lucide` | `scissors` | Open hairdressing shears |
| 95 | `tanning_nail_lash_studio` | Nail Bar, Lash & Tanning Studio | Quick cosmetic touch-ups, rooftop/artificial tanning, and lively local chatter. | `phosphor-lucide` | `sun` | Radiant sun disk with eight rays |
| 96 | `barbershop` | Barbershop | Men's haircuts, straight-razor shaves, and relaxed neighborhood banter. | `phosphor-lucide` | `mustache` | Curled handlebar mustache silhouette |
| 97 | `tattoo_piercing_studio` | Tattoo & Body Piercing Studio | Body modification, custom skin art, and alternative urban subculture. | `custom-svg` | `custom/tattoo-coil-machine` | Rotary/coil tattoo machine angled with needle tip and ink drop |
| 98 | `spa_esthetic_clinic` | Day Spa & Dermatological Esthetic Clinic | Massages, dermatological treatments, and upscale self-care. | `phosphor-lucide` | `flower-lotus` | Open multi-petal lotus flower |
| 99 | `holistic_acupuncture_clinic` | Acupuncture, Chiropractic & Holistic Clinic | Integrative therapies for chronic pain relief, alignment, and stress recovery. | `custom-svg` | `custom/acupuncture-needles` | Fine needles poised along a curved meridian wave line |

---

## 4. Everyday Commerce, Services & Mobility (`commerce_services_mobility` — 63 types)

Retail stores, markets, financial branches, repair shops, automotive services, and transit stations.

| # | `type_id` | `name_en` | `roleplay_semantics_en` | `icon_source` | `icon_id` | `semiotic_cue` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 100 | `supermarket` | Supermarket / Hypermarket | Full monthly grocery runs and unexpected encounters in the aisles. | `phosphor-lucide` | `shopping-cart` | Wheeled wire grocery shopping cart |
| 101 | `wholesale_cash_carry_atacarejo` | Wholesale Cash-and-Carry Store (Atacarejo) | Bulk crate purchases supplying small businesses, parties, or large households. | `phosphor-lucide` | `boxes` | Stacked wholesale cardboard cases |
| 102 | `corner_grocery_mercadinho` | Corner Grocery / Bodega (Mercadinho) | Last-minute staples, informal store-credit tab (fiado), and neighborhood ties. | `phosphor-lucide` | `shopping-basket` | Two-handled market hand basket |
| 103 | `convenience_store` | 24-Hour Convenience Store | Late-night beer, ice, cigarettes, and quick snacks beside gas stations or avenues. | `phosphor-lucide` | `store` | Compact 24h awning storefront |
| 104 | `open_air_market_central_stall` | Open-Air Street Market Stall (Feira Livre) | Focal stall of the morning street market with fresh produce, fried pastel, and bustle. | `custom-svg` | `custom/open-air-market-stall` | Striped canvas market awning over crates of fresh produce |
| 105 | `municipal_market_hall` | Covered Municipal Market Hall (Mercadão) | Historic indoor food hall housing traditional spice, cheese, meat, and dining stalls. | `phosphor-lucide` | `storefront` | Arched market hall portal |
| 106 | `greengrocer_hortifruti` | Greengrocer / Produce Market (Sacolão / Hortifrúti) | Daily neighborhood trade in fresh fruits, leafy greens, and vegetables. | `phosphor-lucide` | `apple` | Crisp whole fruit with leaf stem |
| 107 | `butcher_shop_acougue` | Butcher Shop (Açougue) | Purchase of everyday cuts of meat or weekend barbecue supplies. | `phosphor-lucide` | `beef` | Butcher cleaver / prime meat cut |
| 108 | `fish_market_peixaria` | Fishmonger / Seafood Market (Peixaria) | Fresh fish, shrimp, ice chests, and coastal seafood trade. | `phosphor-lucide` | `fish` | Detailed fish profile with fin |
| 109 | `liquor_store_adega` | Beverage Distributor / Neighborhood Liquor Store (Adega) | Stocking up on beer crates, spirits, ice, and charcoal before parties. | `phosphor-lucide` | `wine` | Bottle and glass beverage pair |
| 110 | `headshop_tobacco_vape_store` | Tobacco, Vape & Headshop / Growshop | Cigars, vapes, rolling papers, and indoor cultivation gear; counterculture hangout. | `custom-svg` | `custom/headshop-hemp-pipe` | Stylized smoking pipe with a botanical leaf emblem |
| 111 | `mall_atrium_concourse` | Shopping Mall Central Atrium & Concourse | Primary indoor circulation hub, escalators, and meeting point inside a mall. | `phosphor-lucide` | `shopping-bag` | Retail shopping bag with loop handles |
| 112 | `department_store_magazine` | Department Store / Retail Anchor | Multi-department retail anchor selling apparel, housewares, and small appliances. | `phosphor-lucide` | `tag` | Retail price tag with eyelet |
| 113 | `clothing_boutique` | Clothing Store / Fashion Boutique | Shopping for date outfits, work attire, or wardrobe makeovers. | `phosphor-lucide` | `shirt` | Short-sleeve garment silhouette |
| 114 | `bridal_party_rental_store` | Bridal & Formal Wear Rental Shop | Fittings for wedding gowns, black-tie tuxedos, and graduation dresses. | `phosphor-lucide` | `dress` | Fitted formal gown silhouette |
| 115 | `thrift_secondhand_store` | Thrift Store / Secondhand Bazaar (Brechó) | Vintage clothing, bargain racks, and hunting for garments with a past. | `phosphor-lucide` | `coat-hanger` | Wire clothes hanger hook and triangle |
| 116 | `shoe_sneaker_store` | Shoe & Sneaker Store | Shopping for dress shoes, work boots, or collectible streetwear sneakers. | `phosphor-lucide` | `footprints` | Pair of stepped shoe sole prints |
| 117 | `optical_shop_otica` | Optical Shop / Eyewear Store (Ótica) | Vision tests, prescription eyeglass frames, sunglasses, and contact lenses. | `phosphor-lucide` | `glasses` | Bridge-connected eyeglass lenses |
| 118 | `jewelry_watch_store` | Jewelry & Watch Store | Wedding bands, luxury gems, watch repair, and high-value heist target. | `phosphor-lucide` | `gem` | Faceted cut diamond profile |
| 119 | `bookstore` | Bookstore | New book releases, author signings, quiet browsing, and reading armchairs. | `phosphor-lucide` | `book-open` | Open hardcover book pages |
| 120 | `used_bookstore_sebo` | Used Bookstore & Antiquarian Shop (Sebo) | Rare out-of-print editions, vintage comics, vinyl records, and archive trading. | `phosphor-lucide` | `library` | Row of upright leaning book spines |
| 121 | `stationery_office_supply` | Stationery & Art Supply Store | Notebooks, drafting tools, gift wrap, and school/office supplies. | `phosphor-lucide` | `pen-tool` | Fountain pen nib and line |
| 122 | `newsstand_banca` | Sidewalk Newsstand (Banca de Jornal) | Street-corner kiosk selling newspapers, comics, transit top-ups, and quick info. | `phosphor-lucide` | `newspaper` | Folded daily newspaper with headline |
| 123 | `print_copy_sign_shop` | Quick Print & Copy Shop (Gráfica Rápida / Xerox) | Urgent printing of resumes, course packs, banners, and spiral binding. | `phosphor-lucide` | `printer` | Desktop sheet printer with paper tray |
| 124 | `musical_instrument_store` | Musical Instrument & Luthier Shop | Guitars, keyboards, strings, PA gear, and meeting point for local musicians. | `phosphor-lucide` | `guitar` | Acoustic/electric guitar body and neck |
| 125 | `record_vinyl_collector_store` | Vinyl Record & Collectibles Shop | Crate-digging for LPs, retro music culture, and DJ hangout. | `phosphor-lucide` | `disc-3` | Grooved vinyl LP record disk |
| 126 | `electronics_repair_shop` | Electronics & Phone Repair Shop | Cracked screen repairs, computer parts, and sensitive data recovery. | `phosphor-lucide` | `smartphone` | Vertical mobile handset outline |
| 127 | `furniture_appliance_store` | Furniture & Home Appliance Store | Buying sofas, white-goods appliances, installment plans, and setting up a new home. | `phosphor-lucide` | `sofa` | Upholstered armchair/sofa silhouette |
| 128 | `hardware_building_store` | Hardware & Building Supply Store | Tools, paint cans, padlocks, rope, and materials for renovations or schemes. | `phosphor-lucide` | `hammer` | Claw hammer angled for work |
| 129 | `gun_hunting_fishing_store` | Licensed Gun, Hunting & Fishing Outfitters | Regulated sale of firearms, ammunition, cutlery, flashlights, and angling gear. | `phosphor-lucide` | `crosshair` | Circular reticle with four crosshairs |
| 130 | `pet_shop` | Pet Shop & Grooming Parlor | Pet food, leashes, toys, and dog bathing/grooming services. | `phosphor-lucide` | `bone` | Classic dog chew bone |
| 131 | `flower_shop` | Florist / Flower Shop | Romantic bouquets, apology arrangements, and funeral wreaths. | `phosphor-lucide` | `flower` | Blossoming flower head with petals |
| 132 | `adult_sex_shop` | Adult Boutique / Sex Shop | Erotic novelties, lingerie, costumes, and intimate accessories. | `phosphor-lucide` | `flame` | Flickering sensual flame silhouette |
| 133 | `bank_branch` | Bank Branch & 24h ATM Vestibule | Cash withdrawals, account management, loans, and robbery/ambush tension. | `phosphor-lucide` | `bank` | Classical pediment over bank columns |
| 134 | `currency_exchange_cambio` | Licensed Currency Exchange Brokerage | Buying and selling foreign currency, travel cards, and international wire transfers. | `phosphor-lucide` | `banknote` | Currency bill with central emblem |
| 135 | `gold_buyer_pawn_store` | Gold Buyer & Official Pawn Shop (Compro Ouro) | Quick downtown sale of family heirlooms, rings, and gold for immediate cash. | `custom-svg` | `custom/pawn-three-spheres` | Classic three-orb pawnbroker emblem suspended from a bracket |
| 136 | `lottery_betting_agent` | Lottery & Bill-Payment Agency (Casa Lotérica) | Paying utility bills, placing official lottery bets, and withdrawing social benefits. | `phosphor-lucide` | `ticket` | Notched paper lottery ticket |
| 137 | `real_estate_agency_imobiliaria` | Real Estate Agency (Imobiliária) | Lease agreements, picking up keys, property inspections, and home sales. | `phosphor-lucide` | `house-line` | House outline with contract baseline |
| 138 | `insurance_vehicle_dispatcher` | Vehicle Document Expediter & Insurance Broker | Vehicle registration transfers, license plates, and insurance claim filings. | `phosphor-lucide` | `file-check` | Document sheet with verification check |
| 139 | `post_office` | Post Office & Courier Branch | Sending and picking up parcels, registered letters, and held packages. | `phosphor-lucide` | `mail` | Sealed postal envelope |
| 140 | `self_storage_locker_facility` | Self-Storage & Locker Facility (Guarda-Móveis) | Padlocked roll-up storage units used for household moves or hidden stashes. | `phosphor-lucide` | `locker` | Grid of numbered metal locker doors |
| 141 | `funeral_home_parlor` | Funeral Home & Private Wake Parlor | Contracting funerary services, caskets, and urban wakes outside cemeteries. | `phosphor-lucide` | `flower-2` | Solemn memorial lily stem |
| 142 | `laundromat` | Self-Service Laundromat | Waiting while clothes wash and dry; reading, quiet reflection, and chance meetings. | `phosphor-lucide` | `washing-machine` | Front-loading washer with round porthole |
| 143 | `tailor_seamstress_atelier` | Tailor & Seamstress Atelier | Clothing alterations, hemming, bespoke suits, and neighborhood fittings. | `custom-svg` | `custom/garment-sewing-machine` | Classic sewing machine profile with thread spool |
| 144 | `cobbler_shoe_repair` | Cobbler & Luggage Repair Shop | Artisanal repair of shoes, boots, leather bags, and belts. | `phosphor-lucide` | `boot` | Stitched ankle boot profile |
| 145 | `key_maker_locksmith` | 24-Hour Locksmith & Key Kiosk (Chaveiro) | Key duplication and emergency lockout rescues for homes or cars. | `phosphor-lucide` | `key-round` | Round-bow mechanical door key |
| 146 | `car_dealership_used_cars` | Car Dealership / Used Car Lot | Buying, selling, and trading vehicles, test drives, and financing negotiations. | `phosphor-lucide` | `car-front` | Front-facing passenger car silhouette |
| 147 | `gas_station` | Gas Station & Forecourt | Refueling, tire air checks, and late-night roadside rendezvous. | `phosphor-lucide` | `fuel` | Fuel dispenser pump with hose nozzle |
| 148 | `auto_repair_mechanic` | Auto Repair & Body Shop (Oficina Mecânica) | Engine overhauls, bodywork, parts quotes, and grease-stained shop work. | `phosphor-lucide` | `wrench` | Open-end mechanic spanner wrench |
| 149 | `tire_repair_borracharia` | Roadside Tire Repair Shop (Borracharia) | Quick flat-tire patching and vulcanization along busy avenues. | `custom-svg` | `custom/tire-borracharia` | Treaded rubber tire with a vulcanizing pressure gauge |
| 150 | `car_wash` | Car Wash (Lava-Rápido) | Washing cars and motorcycles with a brief waiting area. | `phosphor-lucide` | `droplets` | Three water spray droplets over vehicle |
| 151 | `auto_detailing_tuning_shop` | Car Audio, Window Tinting & Tuning Shop | Custom car builds, lowered suspensions, armor plating, and heavy trunk audio. | `phosphor-lucide` | `speaker-high` | Loudspeaker cone projecting sound waves |
| 152 | `parking_lot_garage` | Parking Lot / Multi-Story Parking Garage | Vehicle storage or discreet setting for private conversations inside a parked car. | `phosphor-lucide` | `square-parking` | Bold capital P inside rounded square |
| 153 | `delivery_courier_rest_point` | Delivery Couriers' Rest Hub (Ponto de Motoboys) | Gathering spot for app couriers to charge phones, rest, and await orders. | `custom-svg` | `custom/courier-helmet-bag` | Full-face motorcycle helmet beside an insulated delivery backpack |
| 154 | `taxi_rideshare_stand` | Taxi & Moto-Taxi Stand | Immediate passenger pickup for local rides or steep hillside community climbs. | `phosphor-lucide` | `car-taxi-front` | Cab with roof taxi light beacon |
| 155 | `bus_stop_shelter` | Sidewalk Bus Stop Shelter | Simple street-side transit stop for municipal bus lines; exposed late at night. | `phosphor-lucide` | `bus` | Side/front city bus silhouette |
| 156 | `urban_bus_terminal` | Urban Bus Integration Terminal | Covered municipal bus platform with turnstiles, transfers, and street vendors. | `phosphor-lucide` | `bus-front` | Wide transit bus front with destination board |
| 157 | `intercity_bus_station_rodoviaria` | Intercity Coach Terminal (Rodoviária) | Long-distance bus departures, arrivals in town, tearful goodbyes, and runaways. | `phosphor-lucide` | `suitcase-rolling` | Wheeled travel suitcase with extended handle |
| 158 | `subway_metro_station` | Subway / Metro Station | High-capacity underground or elevated rail station with ticket gates and rush crowds. | `phosphor-lucide` | `train-front` | Metro rail car front inside tunnel arch |
| 159 | `train_rail_station` | Commuter Train / Railway Station | Metropolitan or regional rail platform linking outer suburbs and industrial zones. | `phosphor-lucide` | `tram-front` | Commuter rail locomotive on tracks |
| 160 | `ferry_boat_terminal_balsa` | Ferry Terminal / Water Taxi Pier (Estação de Barcas) | Waterborne passenger and vehicle crossing between bays, riverbanks, or islands. | `phosphor-lucide` | `ship` | Passenger ferry vessel bow over waves |
| 161 | `airport_passenger_terminal` | Airport Passenger Terminal | Check-in counters, domestic/international flights, customs, and dramatic reunions. | `phosphor-lucide` | `plane-takeoff` | Commercial jetliner ascending from runway |
| 162 | `heliport_helipad` | Helipad / Executive Helicopter Hangar | Rooftop landing pad or hangar for VIP executive air transfers. | `custom-svg` | `custom/helipad-circle-h` | Bold capital H enclosed in a dashed circular landing pad |

---

## 5. Education, Research & Work (`education_research_work` — 46 types)

Schools by tier and specialty, university nodes, research labs, corporate offices, media studios, and industrial plants.

| # | `type_id` | `name_en` | `roleplay_semantics_en` | `icon_source` | `icon_id` | `semiotic_cue` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 163 | `school_daycare_nursery` | Daycare Center / Infant Nursery (Creche) | Daytime care for babies and toddlers; daily drop-off and pickup routine for working parents. | `phosphor-lucide` | `baby-carriage` | Side profile of a baby pram/stroller |
| 164 | `school_kindergarten` | Kindergarten / Preschool | Early childhood socialization, school fairs, and parent conversations at the gate. | `phosphor-lucide` | `puzzle-piece` | Interlocking jigsaw puzzle piece |
| 165 | `school_elementary` | Elementary & Middle School (Grades 1–9) | Basic education for children and pre-teens, parent-teacher meetings, and teaching life. | `phosphor-lucide` | `school` | Schoolhouse with pitched roof and flag/bell |
| 166 | `school_high_school` | High School (Public or Private) | Teenage drama, friendships, school sports, student council, and college exam prep. | `phosphor-lucide` | `graduation-cap` | Academic mortarboard cap with tassel |
| 167 | `school_military_college` | Military High School / Naval Cadet School | Secondary education under strict military hierarchy, uniforms, and parade drills. | `phosphor-lucide` | `medal-military` | Star medal suspended from striped ribbon |
| 168 | `school_religious_boarding` | Confessional / Religious Boarding School | Traditional faith-based school or boarding academy with strict moral codes. | `phosphor-lucide` | `book-marked` | Hardcover book with ribbon bookmark |
| 169 | `school_bilingual_international` | Elite Bilingual / International School | High-tuition school with foreign curriculum and reinforced private security. | `phosphor-lucide` | `globe` | Terrestrial globe with latitude/longitude lines |
| 170 | `school_technical_vocational` | Technical & Vocational School (SENAI / ETEC) | Hands-on training in industrial trades, mechanics, electronics, and technical labs. | `phosphor-lucide` | `gear-six` | Six-tooth mechanical gear wheel |
| 171 | `school_prep_course` | University Entrance & Civil-Service Cram School (Cursinho) | High-pressure exam preparation, weekend mock tests, and packed evening classes. | `phosphor-lucide` | `book-check` | Exam sheet / open book with checkmark |
| 172 | `school_adult_education` | Adult Night School / GED Program (EJA / Supletivo) | Evening classes where working adults and older youth return to finish school. | `phosphor-lucide` | `book-open-check` | Open study notebook with completion check |
| 173 | `school_special_education` | Special & Inclusive Education Center | Specialized pedagogical and therapeutic schooling for neurodivergent or disabled students. | `phosphor-lucide` | `heart-handshake` | Clasped hands forming a supportive heart |
| 174 | `school_language` | Language School | Foreign language classes, conversation clubs, and exchange-program preparation. | `phosphor-lucide` | `languages` | Dual script translation glyph |
| 175 | `school_it_coding_robotics` | Coding, IT & Robotics Academy | Programming bootcamps, PC assembly, game design, and digital literacy courses. | `phosphor-lucide` | `terminal` | Command-line prompt bracket and underscore |
| 176 | `school_driving` | Driving School (Autoescola / CFC) | Traffic law classes and behind-the-wheel instruction to earn a driver's license. | `custom-svg` | `custom/driving-school-cone` | Steering wheel overlapped with a striped traffic training cone |
| 177 | `school_aviation_flight` | Civil Aviation School / Flying Club (Aeroclube) | Ground school, flight simulators, and logged flight hours for pilots and crew. | `phosphor-lucide` | `plane` | Light propeller aircraft silhouette |
| 178 | `security_police_academy` | Police Academy / Private Security Training Center | Tactical drills, firearms qualification, self-defense, and security officer certification. | `phosphor-lucide` | `shield-chevron` | Heraldic shield with tactical chevron |
| 179 | `school_sports_youth_academy` | Youth Soccer Academy / Athletic Training Center | Youth athlete training, competitive tryouts (peneiras), talent scouts, and drills. | `phosphor-lucide` | `trophy` | Two-handled championship trophy cup |
| 180 | `school_music_conservatory` | Music Conservatory & Instrument School | Instrument lessons, vocal training, music theory, and ensemble rehearsals. | `phosphor-lucide` | `music` | Double beamed musical note |
| 181 | `school_arts_dance_drama` | Fine Arts, Dance & Drama School | Workshops in painting, sculpture, ballet, street dance, and theatrical acting. | `phosphor-lucide` | `palette` | Artist thumbhole paint palette |
| 182 | `school_culinary_workshops` | Culinary & Pastry Arts School | Hands-on professional kitchen classes, baking workshops, and gastronomy courses. | `phosphor-lucide` | `cooking-pot` | Two-handled stockpot with lid |
| 183 | `isolated_college_building` | Standalone Urban College Building (Faculdade Isolada) | Single-building urban college (e.g., Law or Business school) outside an open campus. | `phosphor-lucide` | `landmark` | Classical academic columned facade |
| 184 | `university_rectory_admin` | University Rectory & Central Registrar | Central administrative hub on a university campus for enrollment, scholarships, and councils. | `phosphor-lucide` | `graduation-cap` | Academic cap over institutional plinth |
| 185 | `university_student_union_ca` | Student Union / Academic Directory (CA / DCE) | Hub for student politics, assemblies, campus parties, and between-class lounging. | `phosphor-lucide` | `megaphone` | Handheld acoustic bullhorn megaphone |
| 186 | `academic_auditorium_amphitheater` | Academic Auditorium & Convention Amphitheater | Thesis defenses, symposia, keynote lectures, and graduation ceremonies. | `phosphor-lucide` | `presentation` | Pull-down projection screen on easel |
| 187 | `research_laboratory` | Scientific Research Laboratory & Institute | Technical facility for chemical, biological, forensic, or engineering experiments. | `phosphor-lucide` | `microscope` | Compound optical laboratory microscope |
| 188 | `public_library` | Public Library & Reading Hall | Quiet study tables, archival research, study carrels, and public-access computers. | `phosphor-lucide` | `books` | Three upright/leaning book volumes |
| 189 | `corporate_office_building` | Commercial Office Tower / Corporate Headquarters | White-collar office work, boardroom meetings, sales targets, and corporate intrigue. | `phosphor-lucide` | `briefcase` | Structured executive briefcase with handle |
| 190 | `coworking_space` | Coworking Space & Startup Hub | Shared hot-desks, glass meeting booths, freelancers, digital nomads, and startups. | `phosphor-lucide` | `laptop` | Open portable laptop computer |
| 191 | `law_firm_office` | Law Firm Office | Private legal counsel, criminal defense strategy, contracts, and family litigation. | `phosphor-lucide` | `scale` | Balanced beam scales of justice |
| 192 | `accounting_tax_office` | Accounting & Tax Advisory Firm | Corporate bookkeeping, tax filings, payroll management, and financial auditing. | `phosphor-lucide` | `calculator` | Keypad financial calculator |
| 193 | `architecture_engineering_firm` | Architecture & Civil Engineering Firm | Building blueprints, urban development plans, structural inspections, and contractors. | `phosphor-lucide` | `compass` | Drafting divider compass tool |
| 194 | `advertising_design_agency` | Advertising, Design & Influencer Agency | Creative ad campaigns, political/digital marketing, and public image management. | `phosphor-lucide` | `wand-sparkles` | Creative magic wand with four-point sparks |
| 195 | `private_detective_security_agency` | Private Detective & Executive Security Agency | Private investigations, infidelity or missing-person tracking, and bodyguard services. | `phosphor-lucide` | `detective` | Fedora hat and eyeglasses sleuth silhouette |
| 196 | `tech_datacenter_server_farm` | Data Center & Telecom Switching Facility | Critical server infrastructure, biometric security gates, and high-stakes IT ops. | `phosphor-lucide` | `server` | Stacked rack-mounted server blades |
| 197 | `call_center` | Call Center / Telemarketing Floor | High-density telephone support floor with strict quotas, 6-hour shifts, and entry-level jobs. | `phosphor-lucide` | `headset` | Over-ear headset with boom microphone |
| 198 | `media_newsroom_studio` | Newsroom / Radio & TV Broadcast Studio | Investigative journalism, breaking news scoops, live broadcasts, and podcasts. | `phosphor-lucide` | `radio` | Broadcast antenna emitting radio waves |
| 199 | `art_photo_studio` | Art Atelier / Photography & Recording Studio | Photo shoots, band recording sessions, or visual arts production. | `phosphor-lucide` | `camera` | SLR camera body with central lens |
| 200 | `labor_union_headquarters` | Labor Union Headquarters (Sindicato) | Worker assemblies, strike organization, collective bargaining, and labor legal aid. | `phosphor-lucide` | `hand-fist` | Raised solidarity fist silhouette |
| 201 | `employment_agency_sine` | Public Employment Agency & Job Center (SINE) | Job listings, HR screening interviews, unemployment benefits, and career placement. | `phosphor-lucide` | `user-plus` | Person silhouette with addition plus sign |
| 202 | `factory_floor_gate` | Industrial Factory Gate & Plant | Assembly lines, blue-collar shift changes, factory whistle, and heavy production. | `phosphor-lucide` | `factory` | Sawtooth factory roof with smokestack |
| 203 | `garment_sweatshop_oficina` | Garment Workshop / Textile Sweatshop (Oficina de Costura) | Intensive apparel production in a small or medium urban sewing workshop. | `custom-svg` | `custom/garment-sewing-machine` | Industrial sewing machine profile with thread spool |
| 204 | `slaughterhouse_meatpacking_frigorifico` | Meatpacking Plant & Cold-Storage Facility (Frigorífico) | Heavy labor in sub-zero cold chambers, industrial cutting lines, and refrigerated dispatch. | `phosphor-lucide` | `snowflake` | Six-branch crystalline ice snowflake |
| 205 | `logistics_warehouse` | Logistics Warehouse & Distribution Center | Truck loading docks, forklifts, inventory racks, and freight dispatch. | `phosphor-lucide` | `warehouse` | Wide gabled warehouse with roll-up bay |
| 206 | `port_container_terminal_yard` | Port Container Terminal & Bonded Yard | Gantry cranes, stacked shipping containers, longshoremen, and customs inspections. | `phosphor-lucide` | `anchor` | Heavy maritime ship anchor |
| 207 | `construction_site_container` | Construction Site & Engineering Container Office | Active building site by day; skeletal concrete frame and night watchman after dark. | `phosphor-lucide` | `hard-hat` | Ribbed safety construction helmet |
| 208 | `recycling_scrap_cooperative` | Recycling Cooperative & Scrap Metal Yard (Ferro-Velho) | Sorting recyclables, scrap metal balers, waste pickers, and copper/iron trading. | `phosphor-lucide` | `recycle` | Triangular three-arrow Mobius loop |

---

## 6. Culture, Leisure, Sports & Entertainment (`culture_leisure_sports` — 32 types)

Cinemas, theaters, museums, cultural centers, gaming venues, sports courts, and recreational clubs.

| # | `type_id` | `name_en` | `roleplay_semantics_en` | `icon_source` | `icon_id` | `semiotic_cue` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 209 | `movie_theater` | Movie Theater / Cinema | Mainstream or arthouse film screenings, popcorn lobby, and dates in the dark. | `phosphor-lucide` | `clapperboard` | Hinged film director clapperboard |
| 210 | `theater_opera_house` | Theater / Opera House | Stage plays, symphony concerts, backstage dressing rooms, and opening-night galas. | `phosphor-lucide` | `drama` | Paired comedy and tragedy stage masks |
| 211 | `museum` | Museum | Historical, scientific, or art exhibitions, quiet galleries, and guided tours. | `phosphor-lucide` | `columns` | Neoclassical portico columns and entablature |
| 212 | `planetarium_observatory` | Planetarium & Astronomical Observatory | Star-projection dome, optical telescopes, and contemplative nighttime dates. | `phosphor-lucide` | `telescope` | Tripod-mounted astronomical telescope |
| 213 | `aquarium_oceanarium` | Municipal Aquarium / Oceanarium | Illuminated underwater viewing tanks; family outings or atmospheric dates. | `phosphor-lucide` | `waves` | Layered ocean wave crests with fish |
| 214 | `zoo_enclosure_pavilion` | Zoo Main Pavilion & Animal Enclosures | Focal visitor pavilion or veterinary backstage of an urban zoological park. | `phosphor-lucide` | `paw-print` | Wild animal paw print emblem |
| 215 | `botanical_greenhouse_orquidario` | Botanical Glasshouse / Orchidarium | Climate-controlled glass conservatory inside a botanical garden; quiet refuge. | `phosphor-lucide` | `sprout` | Young two-leaf plant shoot |
| 216 | `art_gallery` | Contemporary Art Gallery | Opening-night vernissages, art auctions, cocktail mingling with artists and collectors. | `phosphor-lucide` | `frame` | Corner-molded picture frame outline |
| 217 | `cultural_community_center` | Cultural & Community Center (SESC / Centro Cultural) | Free arts workshops, black-box theater, exhibitions, and diverse public life. | `phosphor-lucide` | `users` | Group of community silhouettes |
| 218 | `historic_monument_memorial` | Historic Monument / Obelisk / City Zero Milestone | Iconic civic landmark used as a classic meeting point or rally gathering spot. | `phosphor-lucide` | `landmark` | Tapered stone obelisk on stepped base |
| 219 | `event_convention_hall_buffet` | Banquet Hall / Catering Venue / Convention Center | Weddings, quinceañeras, proms, trade expos, and large formal receptions. | `phosphor-lucide` | `party-popper` | Cone popper bursting with confetti streamers |
| 220 | `carnival_sambadrome_sector` | Sambadrome Parade Sector & Grandstands (Sambódromo) | Grand Carnival parades, float staging areas, and VIP hospitality boxes. | `custom-svg` | `custom/samba-surdo-drum` | Deep surdo percussion drum with crossed mallets |
| 221 | `circus_big_top` | Circus Big Top Tent (Lona de Circo) | Touring circus ring, acrobatic shows, and nomadic performers' backstage camp. | `phosphor-lucide` | `tent` | Peaked circus tent with pennant top |
| 222 | `amusement_park_main_ride` | Amusement Park Ferris Wheel & Midway Gate | Mechanical rides, neon lights, cotton candy, and youthful or romantic outings. | `phosphor-lucide` | `ferris-wheel` | Spoked observation wheel with gondolas |
| 223 | `arcade_game_arena` | Video Arcade & Esports Arena | Arcade cabinets, racing simulators, and LAN esports tournaments. | `phosphor-lucide` | `gamepad-2` | Two-hand gaming controller with D-pad |
| 224 | `lan_house_cybercafe` | Neighborhood LAN House / Cybercafe | Hourly rental PCs, quick document printing, and local digital hangout. | `phosphor-lucide` | `monitor` | Widescreen desktop computer monitor |
| 225 | `board_game_rpg_store` | Board Game Cafe & Tabletop RPG Shop (Luderia) | Shared gaming tables, tabletop RPG campaigns, and trading-card tournaments. | `phosphor-lucide` | `dices` | Pair of tumbled six-sided dice |
| 226 | `escape_room_venue` | Escape Room Puzzle Venue | Cooperative live-action puzzle rooms where teams solve mysteries against the clock. | `custom-svg` | `custom/escape-room-keyhole-clock` | Ornate keyhole integrated with countdown clock hands |
| 227 | `bowling_alley` | Bowling Alley | Casual competitive group leisure, neon lanes, birthday outings, and relaxed dates. | `phosphor-lucide` | `bowling-ball` | Three-hole bowling ball and pin |
| 228 | `billiards_snooker_hall` | Billiards & Snooker Hall (Salão de Sinuca) | Green-felt pool tables, informal cash wagers, cold beer, and bohemian grit. | `custom-svg` | `custom/boteco-billiard-beer` | Faceted glass tumbler beside an 8-ball billiard sphere |
| 229 | `paintball_airsoft_arena` | Paintball & Tactical Airsoft Arena | Staged obstacle field for team tactical skirmishes and adrenaline games. | `phosphor-lucide` | `crosshair-simple` | Minimalist tactical aiming ring |
| 230 | `shooting_range_gun_club` | Shooting Range & Gun Club (Clube de Tiro) | Soundproofed firing lanes for sport shooters, off-duty police, and collectors. | `custom-svg` | `custom/shooting-range-earmuffs` | Bullseye target silhouette framed by protective shooting earmuffs |
| 231 | `kart_racing_track_paddock` | Karting Track & Motorsport Paddock | Go-kart races, mechanical pit boxes, lap timers, and high-speed competition. | `phosphor-lucide` | `flag-checkered` | Waving checkered racing flag |
| 232 | `sports_court_quadra` | Neighborhood Multi-Sport Court (Quadra Poliesportiva) | Street basketball, evening futsal, volleyball, and open neighborhood recreation. | `phosphor-lucide` | `basketball` | Seamed basketball sphere |
| 233 | `amateur_soccer_field_varzea` | Neighborhood Dirt Soccer Pitch (Campo de Várzea / Terrão) | Sunday amateur soccer, chain-link sidelines, neighborhood cheering, and post-match barbecue. | `custom-svg` | `custom/varzea-dirt-goalpost` | Tilted wooden soccer goalpost with a ball on rough ground |
| 234 | `skate_park` | Skate Park & Concrete Bowl | Skateboard and BMX tricks, graffiti walls, street culture, and urban beats. | `phosphor-lucide` | `person-simple-skate` | Skater figure balanced on deck |
| 235 | `tennis_padel_beach_tennis_club` | Tennis, Padel & Beach Tennis Club | Racket and sand courts serving as an upper-middle-class social networking hub. | `phosphor-lucide` | `tennis-ball` | Curved-seam tennis ball |
| 236 | `club_swimming_pool_deck` | Recreational Club Pool & Water Park Deck | Sunbathing, lap swimming, deck lounge chairs, and summer family leisure. | `phosphor-lucide` | `swimming-pool` | Pool ladder rising from water waves |
| 237 | `golf_country_clubhouse` | Golf & Country Club Clubhouse | Exclusive members-only clubhouse for golf rounds and discreet elite deal-making. | `phosphor-lucide` | `flag-pennant` | Putting green pin with triangular pennant |
| 238 | `equestrian_center_haras` | Equestrian Center / Riding Club & Stud Farm (Hípica / Haras) | Show-jumping horses, stables, riding lessons, and high-society rural events. | `phosphor-lucide` | `horse` | Arched equine head and mane profile |
| 239 | `yacht_club_marina_house` | Yacht Club & Nautical Marina | Mooring slips for motor yachts and sailboats, regattas, and boat parties. | `phosphor-lucide` | `sailboat` | Double-sail yacht hull on water |
| 240 | `stadium_bleachers_gate` | Stadium / Arena Main Gate & Turnstiles | Match-day crowds, organized fan clubs, street vendors, and stadium concerts. | `phosphor-lucide` | `medal` | Tiered arena bowl / championship medal |

---

## 7. Nature & Open Spaces (Strict Point Nodes) (`nature_open_spaces_points` — 25 types)

Focal point nodes within parks, plazas, waterfronts, and nature trails where characters meet and interact.

| # | `type_id` | `name_en` | `roleplay_semantics_en` | `icon_source` | `icon_id` | `semiotic_cue` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 241 | `plaza_gazebo_coreto` | Public Square Gazebo / Bandstand (Coreto da Praça) | Exact focal landmark in a town square for meetups, chess games, or open-air music. | `custom-svg` | `custom/plaza-gazebo-coreto` | Octagonal bandstand roof supported by slender columns over steps |
| 242 | `fountain_water_mirror_point` | Plaza Fountain & Reflecting Pool | Classic central landmark and meeting point in the heart of squares and parks. | `phosphor-lucide` | `sparkles` | Arcing water jets over basin |
| 243 | `children_playground_parquinho` | Public Park Children's Playground (Parquinho) | Swings and seesaws; parents and kids by day, quiet teen hangouts after dark. | `phosphor-lucide` | `smile` | Playful smiling face / swing seat |
| 244 | `outdoor_fitness_calisthenics` | Outdoor Calisthenics & Park Gym Bars | Public pull-up bars and outdoor exercise stations along parks or beachfronts. | `phosphor-lucide` | `person-simple-run` | Dynamic running figure silhouette |
| 245 | `dog_run_point` | Fenced Dog Park (Parcão) | Enclosed park area where dog owners unleash pets and chat daily. | `phosphor-lucide` | `dog` | Canine silhouette in motion |
| 246 | `picnic_bbq_kiosk` | Park Picnic Pavilion & Grill Gazebo | Covered park table for birthday gatherings and weekend family barbecues. | `phosphor-lucide` | `campfire` | Crossed logs beneath a warm flame |
| 247 | `park_boathouse_pedalinho` | Park Lake Boathouse & Swan-Boat Dock (Pedalinhos) | Pedal-boat and kayak rental dock on the edge of an urban park lake. | `phosphor-lucide` | `ship-wheel` | Eight-spoke nautical helm wheel |
| 248 | `community_garden_shed` | Community Urban Garden & Plant Nursery | Collective cultivation of organic greens, tool shed, and neighborhood stewardship. | `phosphor-lucide` | `potted-plant` | Leafy plant growing in terracotta pot |
| 249 | `ancient_tree_natural_landmark` | Centennial Landmark Tree | Monumental shade tree serving as a landmark for promises, shelter, and rendezvous. | `phosphor-lucide` | `tree-deciduous` | Broad leafy crown over sturdy trunk |
| 250 | `urban_river_bridge_overlook` | Pedestrian Bridge Overlook / Viaduct Walkway | Elevated crossing over a river or highway; contemplation, photos, or tense encounters. | `phosphor-lucide` | `bridge` | Suspension bridge towers and deck span |
| 251 | `scenic_viewpoint_mirante` | Panoramic Scenic Viewpoint (Mirante) | High overlook with city or ocean views; sunsets, romance, and candid talks. | `phosphor-lucide` | `binoculars` | Twin-barrel field binoculars |
| 252 | `hang_gliding_paragliding_ramp` | Hang-Gliding & Paragliding Launch Ramp | Hilltop wooden takeoff ramp; strong wind, extreme sports, and sweeping views. | `phosphor-lucide` | `wind` | Curving wind gusts beside canopy |
| 253 | `beach_kiosk_barraca` | Beachfront Kiosk & Sand Stand (Barraca de Praia) | Beach gathering spot with plastic chairs, umbrellas, cold beer, and fried seafood. | `custom-svg` | `custom/street-kiosk-parasol` | Hexagonal beach kiosk counter under a striped parasol |
| 254 | `lifeguard_post` | Beach Lifeguard Tower (Posto de Salva-Vidas) | Numbered coastal landmark tower and ocean rescue station along the boardwalk. | `phosphor-lucide` | `life-buoy` | Ring buoy with four perimeter bands |
| 255 | `surf_break_point_pico` | Surf Break & Rocky Headland (Pico de Surf) | Coastal point where surfers gather to wax boards, watch the swell, and paddle out. | `phosphor-lucide` | `waves` | Curling ocean wave crest |
| 256 | `campfire_bonfire_beach_spot` | Beach Bonfire & Night Luau Spot | Secluded cove or dune corner for night bonfires, acoustic guitar, and stargazing. | `phosphor-lucide` | `flame-kindling` | Bonfire flames rising over kindling sticks |
| 257 | `pier_dock_marina` | Fishing Pier / Wooden Jetty (Trapiche / Píer) | Timber or concrete deck extending over water for fishing, reflection, or boat boarding. | `phosphor-lucide` | `anchor` | Nautical anchor with crossbar |
| 258 | `fishing_spot_pesque_pague` | Riverbank Fishing Spot / Pay-to-Fish Pond (Pesque-Pague) | Quiet lakeside bank or stocked fishing pond for patient angling and unhurried talks. | `phosphor-lucide` | `fish` | Leaping fish over water line |
| 259 | `lighthouse_farol` | Coastal Lighthouse (Farol) | Maritime beacon tower on a windswept rocky point; solitude and dramatic horizon. | `phosphor-lucide` | `tower-control` | Tapered lighthouse tower with lantern beam |
| 260 | `trailhead` | Forest Trailhead & Ranger Gate | Marked starting gate of a nature trail with visitor logbook and map board. | `phosphor-lucide` | `footprints` | Walking boot tracks entering trail |
| 261 | `waterfall_pool` | Waterfall & Natural River Pool (Cachoeira) | Cascading waterfall and natural plunge pool for swimming after a forest hike. | `custom-svg` | `custom/waterfall-pool-cascade` | Vertical cascading water streams falling into a natural basin |
| 262 | `natural_spring_bica_dagua` | Natural Freshwater Spring / Spout (Bica d'Água) | Fresh mountain water spout where hikers and locals cool off and fill bottles. | `custom-svg` | `custom/waterfall-pool-cascade` | Fresh water stream pouring into a stone basin |
| 263 | `rock_climbing_crag_boulder` | Rock Climbing Crag & Abseiling Cliff | Steep rock face base where climbers belay, chalk up, and ascend routes. | `phosphor-lucide` | `mountain-snow` | Steep twin mountain crag peaks |
| 264 | `campsite_campfire` | Forest Campsite Clearing | Wilderness tent clearing with a central fire ring for overnight camping and isolation. | `phosphor-lucide` | `tent-tree` | Pitched camp tent beside a pine tree |
| 265 | `cave_rock_shelter` | Natural Cave / Rock Shelter (Gruta / Caverna) | Subterranean rock cavern for exploration, mystery, ritual, or hiding from storms. | `phosphor-lucide` | `mountain` | Dark arched cavern mouth inside mountain peak |

---

## 8. Religion & Spirituality (`religion_spirituality` — 24 types)

Sacred temples, parish churches, Afro-diasporic terreiros, spiritist centers, esoteric spaces, and funerary nodes.

| # | `type_id` | `name_en` | `roleplay_semantics_en` | `icon_source` | `icon_id` | `semiotic_cue` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 266 | `cathedral_basilica_sanctuary` | Metropolitan Cathedral / Basilica / Pilgrimage Sanctuary | Grand mother church, pilgrimages, solemn weddings, heritage tourism, and bishop's seat. | `phosphor-lucide` | `church` | Twin-spired cathedral facade with cross |
| 267 | `catholic_church_parish` | Neighborhood Catholic Parish Church | Sunday masses, confessions, baptisms, parish festivals (quermesses), and community outreach. | `phosphor-lucide` | `church` | Gabled parish church with steeple cross |
| 268 | `chapel_wayside_shrine` | Wayside Chapel / Oratory / Hermitage | Small quiet sanctuary for solitary prayer, lighting votive candles, and vows. | `phosphor-lucide` | `cross` | Simple upright Christian cross |
| 269 | `monastery_abbey_cloister` | Monastery / Abbey Cloister | Monastic seclusion, Gregorian chant, spiritual retreats, and contemplative silence. | `phosphor-lucide` | `landmark` | Vaulted cloister arches and bell gable |
| 270 | `orthodox_christian_church` | Eastern Orthodox Christian Church | Solemn Eastern liturgy, Byzantine icons, incense, and immigrant heritage community. | `custom-svg` | `custom/orthodox-three-bar-cross` | Traditional Eastern Orthodox three-bar cross with angled footbar |
| 271 | `evangelical_protestant_church` | Mainline Protestant / Evangelical Church | Community worship services, Sunday Bible school, choir, and mutual-aid network. | `phosphor-lucide` | `book-open` | Open scripture book with cross bookmark |
| 272 | `pentecostal_neopentecostal_temple` | Pentecostal / Neo-Pentecostal Temple (Assembleia / Igreja Universal) | Fervent healing and deliverance services, all-night vigils, gospel bands, and fiery preaching. | `phosphor-lucide` | `hands-praying` | Upraised clasped praying hands with flame cue |
| 273 | `adventist_latter_day_saints_chapel` | Adventist Church / Latter-day Saints Chapel | Family-centered congregation focused on Sabbath observance or youth missionary work. | `phosphor-lucide` | `book-heart` | Closed scripture volume with heart emblem |
| 274 | `jehovahs_witness_kingdom_hall` | Jehovah's Witnesses Kingdom Hall | Structured Bible study, organized ministry, and close-knit congregation life. | `phosphor-lucide` | `book-open-text` | Open study book with ruled text lines |
| 275 | `spiritist_center_kardecist` | Kardecist Spiritist Center (Centro Espírita) | Public moral lectures, magnetic energy healing (passe), magnetized water, and charity. | `custom-svg` | `custom/spiritist-halo-book` | Open book beneath a rising radiant sun horizon |
| 276 | `umbanda_candomble_terreiro` | Umbanda / Candomblé Terreiro (Ilê / Roça) | Ritual drum ceremonies (giras), consultations with spiritual guides, cowrie divination, and axé. | `custom-svg` | `custom/terreiro-atabaque-altar` | Sacred ritual atabaque drum flanked by crossed axé feathers and beads |
| 277 | `synagogue` | Synagogue | Jewish Shabbat services, Torah study, lifecycle ceremonies, and community gathering. | `phosphor-lucide` | `star-of-david` | Six-pointed hexagram Star of David |
| 278 | `mosque_islamic_center` | Mosque & Islamic Cultural Center | Five daily prayers facing Mecca, Friday sermons (Jumu'ah), and Muslim community life. | `phosphor-lucide` | `moon-star` | Crescent moon cradling a five-pointed star |
| 279 | `buddhist_temple_zendoo` | Buddhist Temple & Zen Center | Silent seated meditation (zazen), incense, contemplative gardens, and Dharma talks. | `phosphor-lucide` | `flower-lotus` | Symmetrical blooming lotus flower |
| 280 | `eastern_hindu_shinto_temple` | Hindu / Shinto / Eastern Temple | Devotional offerings, sacred mantras, shrine gates, and traditional festivals. | `phosphor-lucide` | `sun-dim` | Radiant eastern solar mandala emblem |
| 281 | `ayahuasca_shamanic_temple` | Shamanic Center / Ayahuasca Sanctuary (Santo Daime) | All-night consciousness-expansion ceremonies, forest sacred medicines, and hymns. | `custom-svg` | `custom/benzedeira-herb-branch` | Sacred botanical herb sprig with ritual water droplets |
| 282 | `folk_healer_benzedeira_house` | Folk Healer's House / Herbalist (Casa de Benzedeira / Raizeiro) | Popular folk spirituality: prayers with rue branches (arruda), evil-eye healing, and herbal tonics. | `custom-svg` | `custom/benzedeira-herb-branch` | Ritual rue herb sprig (ramo de arruda) with blessing water droplets |
| 283 | `esoteric_mystic_space` | Esoteric & Oracle Consultation Space (Tarot & Astrology) | Tarot card readings, natal chart astrology, numerology, crystals, and mystic therapies. | `custom-svg` | `custom/divination-cowrie-shells` | Four open cowrie shells (búzios) arranged in a divination cast |
| 284 | `religious_articles_flora_store` | Religious Articles & Ritual Herb Shop (Flora / Casa de Umbanda) | Sale of seven-day candles, ritual herbs, saint statues, rosaries, Bibles, and bead necklaces. | `phosphor-lucide` | `flame` | Lit votive candle flame on holder |
| 285 | `masonic_lodge_fraternity` | Masonic Lodge / Initiatic Fraternity (Loja Maçônica / Rosa-Cruz) | Closed meetings for initiates, discreet philanthropy, and elite influence networks. | `custom-svg` | `custom/masonic-square-compass` | Interlocked carpenter's square and compasses enclosing a central point |
| 286 | `occult_hermetic_sanctum` | Occult Sanctum / Hermetic Order / Coven | Closed ceremonies of ritual magic, modern witchcraft, or esoteric study. | `custom-svg` | `custom/masonic-square-compass` | Hermetic square, compass, and esoteric star symbol |
| 287 | `sacred_crossroads_offering_point` | Wayside Cross & Crossroads Offering Point (Cruzeiro) | Outdoor folk-faith node where candles, ribbons, petitions, and ritual offerings are left. | `custom-svg` | `custom/crossroads-offering-candle` | Lit ritual candle set at an X-shaped crossroads intersection |
| 288 | `cemetery_gate_velorio` | Cemetery Main Gate & Municipal Wake Chapels | Necropolis entrance, wake chapels, burials, flower stalls, and All Souls' Day visits. | `phosphor-lucide` | `cross` | Memorial cross framed by iron gate arch |
| 289 | `crematorium_columbarium` | Crematorium & Urn Columbarium | Cremation farewell ceremonies and quiet indoor galleries of memorial niches. | `phosphor-lucide` | `flame` | Solemn eternal flame over urn profile |

---

## 9. Security, Justice, Civic & Underworld (`security_justice_civic_underworld` — 52 types)

Police precincts, courts, civic agencies, prisons, illicit markets, organized crime bases, and clandestine urban nodes.

| # | `type_id` | `name_en` | `roleplay_semantics_en` | `icon_source` | `icon_id` | `semiotic_cue` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 290 | `police_station_precinct` | Civil Police Precinct (Delegacia de Polícia / DP) | Filing police reports (B.O.), criminal investigations, witness statements, bail, and lockup. | `phosphor-lucide` | `shield-star` | Police badge shield with central star |
| 291 | `specialized_police_station` | Specialized Police Division (Women's Protection / Homicide / Narcotics) | Major crime investigations, domestic violence protection (DDM), and tactical warrants. | `phosphor-lucide` | `shield-check` | Verified protective law-enforcement shield |
| 292 | `police_outpost_base` | Military Police Outpost / Patrol Base | Street-level uniformed patrol base, immediate emergency help, and squad cars. | `phosphor-lucide` | `siren` | Flashing emergency police beacon dome |
| 293 | `municipal_guard_civil_defense` | Municipal Guard & Civil Defense Operations Center | City-wide CCTV monitoring wall (COI), public property security, and storm/crisis alerts. | `phosphor-lucide` | `cctv` | Wall-mounted surveillance camera housing |
| 294 | `highway_police_checkpoint` | Highway Patrol Post & Fiscal Checkpoint | City-exit roadblock, breathalyzer checkpoints, cargo inspections, and fugitive interception. | `phosphor-lucide` | `traffic-cone` | Striped highway safety cone |
| 295 | `federal_police_immigration_hq` | Federal Police Headquarters & Immigration Division | Passport issuance, airport/maritime policing, federal anti-corruption probes, and immigration. | `phosphor-lucide` | `badge-check` | Official notched federal authority badge |
| 296 | `military_barracks_tiro_guerra` | Army Barracks / Conscription Post (Quartel / Tiro de Guerra) | Military installation, mandatory draft registration, official armory, and armed perimeter. | `phosphor-lucide` | `shield` | Solid military garrison shield |
| 297 | `fire_station` | Fire Department Station (Corpo de Bombeiros) | 24/7 readiness for fire engines, high-angle rescues, and disaster response. | `phosphor-lucide` | `fire-truck` | Ladder fire engine profile |
| 298 | `forensic_morgue_iml` | Forensic Medical Examiner's Institute (IML) | Forensic trauma exams, ballistics/pathology reports, autopsies, and body identification. | `custom-svg` | `custom/iml-forensic-tag` | Forensic toe-tag card with a cadaverous cross-hair marker |
| 299 | `vehicle_impound_lot_patio` | Municipal Vehicle Impound Lot (Pátio do Detran) | Fenced yard of cars towed at checkpoints, bureaucratic release fees, and auctions. | `phosphor-lucide` | `car-simple` | Locked/impounded passenger car profile |
| 300 | `courthouse_forum` | Courthouse / Palace of Justice (Fórum) | Custody hearings, jury trials, family/criminal courts, and judicial sentences. | `phosphor-lucide` | `gavel` | Wooden judge's gavel and sound block |
| 301 | `small_claims_labor_court` | Small Claims, Labor Court & Consumer Agency (JEC / PROCON) | Fast civil conciliations, labor-rights lawsuits, and consumer disputes. | `phosphor-lucide` | `scale` | Equilibrium justice scale |
| 302 | `public_defender_office` | Public Defender's Office (Defensoria Pública) | Free legal defense for low-income defendants, prisoners' families, and civil rights. | `phosphor-lucide` | `scales` | Balanced scales with supportive hand |
| 303 | `prosecutor_office_mp` | Public Prosecutor's Office (Ministério Público) | Criminal prosecution, organized-crime task forces, and public oversight. | `phosphor-lucide` | `landmark` | Classical justice pediment with scales |
| 304 | `child_protective_council_tutelar` | Child Protective Services Council (Conselho Tutelar) | Direct intervention in reports involving neglected, abused, or at-risk minors. | `phosphor-lucide` | `shield` | Child silhouette inside protective shield |
| 305 | `social_assistance_cras_creas` | Social Assistance Reference Center (CRAS / CREAS) | Welfare support for vulnerable families, emergency aid benefits, and social workers. | `phosphor-lucide` | `heart-handshake` | Supportive hands forming a heart |
| 306 | `notary_registry_office` | Civil Registry & Notary Public Office (Cartório) | Civil weddings, birth/death certificates, property deeds, powers of attorney, and wills. | `phosphor-lucide` | `stamp` | Wooden hand-held notary ink stamp |
| 307 | `electoral_court_cartorio` | Electoral Registry & Voting Court | Voter registration, biometric enrollment, and candidacy filings. | `phosphor-lucide` | `vote` | Ballot slip dropping into ballot box |
| 308 | `city_hall_civic_agency` | City Hall (Prefeitura Municipal) | Mayor's office, municipal departments, business permits, property taxes, and street protests. | `phosphor-lucide` | `bank` | Civic hall facade with flag |
| 309 | `citizen_service_poupatempo_detran` | One-Stop Citizen Service Hall (Poupatempo / Detran / INSS) | Issuance of ID cards, driver's licenses, work permits, and disability pension exams. | `phosphor-lucide` | `id-card` | Horizontal photo identification card |
| 310 | `city_council_camara_municipal` | City Council Chamber (Câmara Municipal) | Voting on urban zoning laws, parliamentary inquiries, councilors' offices, and public galleries. | `phosphor-lucide` | `microphone-stage` | Podium microphone in council chamber |
| 311 | `political_party_campaign_hq` | Political Party Directorate & Campaign HQ | Electoral strategy, grassroots activism, backroom alliances, and campaign war room. | `phosphor-lucide` | `flag` | Waving political banner flag on pole |
| 312 | `consulate_embassy_office` | Foreign Consulate / Diplomatic Mission | Visa interviews, assistance to foreign nationals, and diplomatic immunity. | `phosphor-lucide` | `globe` | World globe emblem with diplomatic crest |
| 313 | `ngo_human_rights_center` | NGO Headquarters / Neighborhood Residents' Association | Community organizing, grassroots leadership, legal advocacy, and neighborhood projects. | `phosphor-lucide` | `hand-helping` | Outstretched helping hand silhouette |
| 314 | `public_jail_cdp` | Pre-Trial Detention Center / Public Jail (CDP) | Remand custody for defendants awaiting trial, care-package drop-offs (jumbo), and lawyer visits. | `custom-svg` | `custom/prison-bars-window` | Heavy vertical iron cell bars crossed by a locked horizontal transom |
| 315 | `prison_visitation_gate` | Penitentiary Main Gate & Visitation Checkpoint | Perimeter control, invasive strip-searches, family/conjugal visits, and sentence serving. | `custom-svg` | `custom/prison-bars-window` | Heavy vertical iron cell bars crossed by a locked horizontal transom |
| 316 | `juvenile_detention_center` | Juvenile Detention & Socio-Educational Center | Custody of adolescent offenders, judicial review hearings, and family visitation. | `phosphor-lucide` | `lock` | Closed security padlock |
| 317 | `drug_dealing_spot_biqueira` | Street-Level Drug Dealing Point (Biqueira / Boca de Fumo) | Retail narcotics corner with lookouts, two-way radios, and constant risk of police raids. | `custom-svg` | `custom/biqueira-drop-hand` | Stealth hand-to-hand exchange of a small packet and folded bill |
| 318 | `crack_den_drug_house` | Crack Den / Illicit Drug House (Mocó) | Degraded drug-consumption squat marked by debt, desperation, and extreme vulnerability. | `custom-svg` | `custom/crack-pipe-smoke` | Cracked glass pipe silhouette with a hazard smoke plume |
| 319 | `clandestine_drug_lab_refinery` | Clandestine Drug Lab & Cutting Refinery | Wholesale processing, chemical synthesis, and bulk packaging of narcotics for distribution. | `custom-svg` | `custom/clandestine-lab-mask` | Conical boiling flask paired with a twin-filter respirator mask |
| 320 | `indoor_cannabis_grow_house` | Secret Indoor Grow House (Estufa Clandestina) | Concealed indoor cultivation inside a residential or commercial property under UV lamps. | `custom-svg` | `custom/grow-house-uv-leaf` | Serrated botanical leaf beneath a hooded UV grow lamp reflector |
| 321 | `illegal_gambling_den` | Underground Casino / Illegal Gambling Den (Cassino Clandestino / Jogo do Bicho) | Slot machines, high-stakes backroom poker, numbers rackets, and debt enforcement. | `phosphor-lucide` | `poker-chip` | Notched casino gambling chip |
| 322 | `pawn_shop_fence` | Stolen-Goods Fence & Contraband Shop (Receptador) | Underworld buying and selling of stolen phones, jewelry, and hijacked cargo with no receipts. | `custom-svg` | `custom/pawn-three-spheres` | Classic three-orb pawnbroker emblem suspended from a bracket |
| 323 | `chop_shop_desmanche` | Clandestine Vehicle Chop Shop (Desmanche) | Rapid stripping of stolen cars and motorcycles, VIN cloning, and cold parts trade. | `custom-svg` | `custom/chop-shop-car-saw` | Half-sectioned car chassis crossed by a circular cutting blade |
| 324 | `loan_shark_office` | Loan Shark Office / Front Finance Co. (Escritório de Agiota) | Unsecured cash loans at predatory interest rates backed by threats and enforcers. | `phosphor-lucide` | `banknote` | Stack of cash bills in hand |
| 325 | `black_market_exchange_doleiro` | Black-Market Money Launderer's Office (Doleiro) | Bulk cash laundering, capital flight, shell companies, and untraceable crypto swaps. | `phosphor-lucide` | `briefcase` | Locked cash-stuffed attaché case |
| 326 | `scam_call_center_estelionato` | Scam Boiler Room / Fraud Call Center (Central do Golpe) | Hidden room running bank-impersonation phone scams, phishing, and social engineering. | `phosphor-lucide` | `phone-off` | Crossed-out telephone handset |
| 327 | `fake_id_forger_shop` | Document Forger & Clandestine Print Shop | Forging ID cards, passports, driver's licenses, diplomas, and medical prescriptions. | `phosphor-lucide` | `id-card` | Altered identity card with fingerprint |
| 328 | `clandestine_medical_clinic` | Underground / Unlicensed Medical Clinic | Off-the-books surgeries or illegal trauma care for gunshot wounds away from police reports. | `phosphor-lucide` | `skull` | Hazard skull emblem denoting illicit off-the-books clinic |
| 329 | `smuggling_contraband_depot` | Smuggling & Contraband Warehouse | Hidden depot storing smuggled cigarettes, counterfeit liquor, electronics, or hijacked freight. | `phosphor-lucide` | `package-x` | Sealed cargo crate marked with an X |
| 330 | `illegal_weapons_cache_paiol` | Clandestine Armory & Black-Market Gun Dealer (Paiol Ilegal) | Hidden cache and illicit trade in filed-serial firearms, rifles, ammo, and body armor. | `custom-svg` | `custom/weapons-crate-ammo` | Stenciled wooden munitions crate with two upright rifle cartridges |
| 331 | `gang_syndicate_hideout` | Crime Syndicate HQ / Faction Stronghold (QG de Facção) | Criminal command bunker for boss summits, kangaroo courts, and territorial logistics. | `phosphor-lucide` | `skull` | Stark skull emblem denoting syndicate stronghold |
| 332 | `militia_extortion_hq` | Paramilitary Militia Extortion Office (Escritório da Milícia) | Extortion of protection rackets, illegal utility monopolies, and coercive territorial control. | `phosphor-lucide` | `shield-off` | Diagonal slash across a security shield |
| 333 | `kidnapping_captivity_cativeiro` | Kidnapping Captivity House (Cativeiro) | Isolated property used to hold hostages during ransom kidnappings or extortion plots. | `custom-svg` | `custom/captivity-padlock-chain` | Heavy diagonal iron chain secured by a closed shackle padlock |
| 334 | `smuggler_dock_clandestine_airstrip` | Smuggler's Pier / Unregistered Dirt Airstrip | Remote waterfront or bush airstrip for covert movement of contraband or fugitives. | `phosphor-lucide` | `anchor` | Heavy maritime anchor marking covert landing point |
| 335 | `illegal_street_race_meetup` | Illegal Street-Racing Meetup Point (Ponto de Racha) | Late-night gathering of tuned cars, high-stakes cash bets, and police pursuits. | `phosphor-lucide` | `gauge` | Redlined analog tachometer dial |
| 336 | `underground_fight_ring` | Underground No-Rules Fight Pit | Unsanctioned bare-knuckle bouts with heavy betting in basements or warehouses. | `custom-svg` | `custom/dojo-torii-belt` | Tied martial arts black belt beneath a minimalist dojo/ring beam |
| 337 | `brothel_prostitution_house` | Brothel / Escort House (Casa de Prostituição / Privê) | Indoor venue for agency sex work, rotating private rooms, and late-night secrecy. | `custom-svg` | `custom/love-motel-neon` | Discreet doorway topped with a glowing heart neon sign |
| 338 | `street_prostitution_corner` | Red-Light Street Corner (Ponto de Pista) | Nighttime curb spot where street sex workers approach passing cars under streetlights. | `phosphor-lucide` | `lamp-pendant` | Hanging streetlamp cone of light |
| 339 | `abandoned_building_ruin` | Abandoned Building / Industrial Ruin | Derelict structure for secret meetings, urban exploration, ambushes, or temporary shelter. | `phosphor-lucide` | `brick-wall` | Cracked exposed masonry brick wall |
| 340 | `dead_end_alley_underpass` | Dark Dead-End Alley / Highway Underpass | Isolated urban blind spot prone to muggings, clandestine deals, graffiti, or hiding. | `phosphor-lucide` | `road-horizon` | Narrowing perspective alley vanishing point |
| 341 | `dead_drop_secret_meeting_spot` | Surveillance Blind-Spot / Dead Drop | Camera-free corner used for passing envelopes, meeting police informants, and blackmail. | `phosphor-lucide` | `eye-off` | Slashed eye symbol denoting camera blind spot |
