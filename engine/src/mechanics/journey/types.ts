import type {
  CharacterId,
  Instant,
  JourneyId,
  LineId,
  PlaceId,
  TravelMode,
  VehicleId,
} from "../../kernel/index.ts";

/** One segment of an itinerary, fixed at departure (rule D11). */
export interface Leg {
  readonly kind: "walk" | "run" | "wait" | "ride";
  readonly from: PlaceId;
  /** Equal to `from` for a "wait" leg. */
  readonly to: PlaceId;
  readonly departAt: Instant;
  readonly arriveAt: Instant;
  readonly lineId?: LineId;
}

/** Multi-leg journey; the current position derives from the clock (rule D11). */
export interface Journey {
  readonly id: JourneyId;
  readonly mode: TravelMode;
  readonly status: "active" | "completed" | "cancelled";
  readonly participants: readonly CharacterId[];
  readonly vehicleId?: VehicleId;
  readonly origin: PlaceId;
  readonly destination: PlaceId;
  readonly legs: readonly Leg[];
}
