import type { TravelMode, VehicleId } from "../../kernel/index.ts";

/** Replaces money for mode choice until a money app exists (rule D10). */
export interface MobilityProfile {
  readonly modes: readonly TravelMode[];
  readonly ownedVehicleId: VehicleId | null;
  /** Relative preference weights; also weights the typical travel time (rule D5). */
  readonly preference: Partial<Readonly<Record<TravelMode, number>>>;
}
