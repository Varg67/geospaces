import type { Brand } from "./brand.ts";

/** Simulated instant in whole seconds since the Unix epoch (rule D9). */
export type Instant = Brand<number, "Instant">;
/** Non-negative span of simulated time in whole seconds (rule D9). */
export type Seconds = Brand<number, "Seconds">;

export function instant(epochSeconds: number): Instant {
  if (!Number.isSafeInteger(epochSeconds)) {
    throw new RangeError(`Instant must be a safe integer of seconds, got ${epochSeconds}`);
  }
  return epochSeconds as Instant;
}

export function seconds(value: number): Seconds {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new RangeError(`Duration must be a non-negative integer of seconds, got ${value}`);
  }
  return value as Seconds;
}

export const minutes = (value: number): Seconds => seconds(value * 60);

export const addSeconds = (at: Instant, span: Seconds): Instant => instant(at + span);

/** Signed difference `later - earlier`; negative when `later` precedes `earlier`. */
export const diffSeconds = (later: Instant, earlier: Instant): number => later - earlier;

export function instantFromIso(iso: string): Instant {
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) throw new RangeError(`Invalid ISO timestamp: ${iso}`);
  return instant(Math.floor(ms / 1000));
}

export const instantToIso = (at: Instant): string => new Date(at * 1000).toISOString();
