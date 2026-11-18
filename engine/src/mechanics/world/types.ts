import type { PlaceId, TravelMode } from "../../kernel/index.ts";

/**
 * A traversable access edge (rules D6, D9 and "allowed modes").
 * Weak curates `lengthM`; Mid will compute it from geography.
 * Direction semantics (one-way passages) are not decided yet.
 */
export interface AccessEdge {
  readonly id: string;
  readonly from: PlaceId;
  readonly to: PlaceId;
  /** Positive length in metres. */
  readonly lengthM: number;
  readonly allowedModes: readonly TravelMode[];
}
