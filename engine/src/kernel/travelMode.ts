/** Travel modes known to the engine (engine rules §2). */
export const TRAVEL_MODES = [
  "walk",
  "run",
  "bus",
  "metro",
  "taxi",
  "ride_hailing",
  "car",
  "motorcycle",
] as const;

export type TravelMode = (typeof TRAVEL_MODES)[number];
