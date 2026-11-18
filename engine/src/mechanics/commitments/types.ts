import type { CommitmentId, Instant, PlaceId } from "../../kernel/index.ts";

export type CommitmentStatus =
  | "scheduled"
  | "en_route"
  | "attended"
  | "late"
  | "missed"
  | "declined";

/** Calendar commitment with an explicit outcome (engine rules §1.4). */
export interface Commitment {
  readonly id: CommitmentId;
  readonly placeId: PlaceId;
  readonly startsAt: Instant;
  readonly endsAt: Instant;
  readonly source: "platform_calendar" | "companion" | "user";
  readonly status: CommitmentStatus;
}
