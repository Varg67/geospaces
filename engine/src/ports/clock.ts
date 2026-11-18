import type { Instant } from "../kernel/index.ts";

/** Source of the current simulated instant. Time runs 1:1 with real time (rule D1). */
export interface Clock {
  now(): Instant;
}
