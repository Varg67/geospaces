import type { Place, WorldSnapshot } from "../domain/world";
import {
  urbanAccess,
  interiorAccess,
  exampleProximity,
} from "./exampleRelations";
import { exampleLayouts } from "./exampleLayouts";
const urbanNames = [
  "Home",
  "Café",
  "Library",
  "Bakery",
  "Clinic",
  "Market",
  "School",
  "Bookshop",
  "Station",
  "Gallery",
  "Gym",
  "Workshop",
  "Pharmacy",
  "Cinema",
  "Flower shop",
];
const urbanTypes = [
  "house_detached",
  "coffee_shop",
  "public_library",
  "bakery",
  "medical_clinic_office",
  "supermarket",
  "school_elementary",
  "bookstore",
  "subway_metro_station",
  "art_gallery",
  "gym_fitness_center",
  undefined,
  "pharmacy",
  "movie_theater",
  "flower_shop",
];
const roomTypes = [
  "entry_foyer",
  "living_room",
  "hallway_corridor",
  "single_bedroom",
  "kitchen_residential",
  "bathroom_full",
];
const urbanPlaces: Place[] = urbanNames.map((name, index) => ({
  id: `place-${index}`,
  name,
  parentId: index < 8 ? "north" : "south",
  kind: "urban",
  ...(urbanTypes[index] ? { catalogType: urbanTypes[index] } : {}),
  interior:
    index === 0 ? "available" : index === 4 ? "restricted" : "undefined",
}));
const rooms: Place[] = [
  "Entry",
  "Living room",
  "Hallway",
  "Bedroom",
  "Kitchen",
  "Bathroom",
].map((name, index) => ({
  id: `room-${index}`,
  name,
  parentId: "place-0",
  kind: "interior",
  catalogType: roomTypes[index]!,
  interior: "undefined",
}));
export const exampleWorld: WorldSnapshot = {
  id: "example-world",
  name: "Alder Grove",
  asOf: "2026-11-16T08:30:00-03:00",
  timeZone: "America/Sao_Paulo",
  places: [
    {
      id: "world",
      name: "Alder Grove",
      parentId: null,
      kind: "world",
      interior: "available",
    },
    {
      id: "north",
      name: "North district",
      parentId: "world",
      kind: "district",
      interior: "available",
    },
    {
      id: "south",
      name: "South district",
      parentId: "world",
      kind: "district",
      interior: "available",
    },
    ...urbanPlaces,
    ...rooms,
  ],
  connections: [...urbanAccess, ...interiorAccess],
  proximity: exampleProximity,
  characters: [
    {
      id: "ana",
      name: "Ana",
      location: { kind: "place", placeId: "place-1" },
      activity: null,
    },
    {
      id: "leo",
      name: "Leo",
      location: { kind: "place", placeId: "place-8" },
      activity: "Waiting",
    },
  ],
  events: [
    {
      id: "event-1",
      characterId: "ana",
      at: "2026-11-16T08:10:00-03:00",
      summary: "Departed from Home",
      placeId: "place-0",
    },
    {
      id: "event-2",
      characterId: "ana",
      at: "2026-11-16T08:22:00-03:00",
      summary: "Arrived at Café",
      placeId: "place-1",
    },
  ],
  layouts: exampleLayouts,
};
