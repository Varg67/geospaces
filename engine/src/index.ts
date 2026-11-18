/** Public API of the GeoSpace engine. Mechanics are exported as their stages land. */
export const ENGINE_NAME = "geospace-engine";

export * from "./kernel/index.ts";
export * from "./ports/index.ts";
export type * from "./mechanics/world/index.ts";
export type * from "./mechanics/travel/index.ts";
export type * from "./mechanics/journey/index.ts";
export type * from "./mechanics/commitments/index.ts";
export type * from "./mechanics/presence/index.ts";
