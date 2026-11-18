import type { Instant, Result } from "../kernel/index.ts";

export interface NewEvent<Type extends string = string, Payload = unknown> {
  readonly type: Type;
  readonly at: Instant;
  readonly payload: Payload;
}

export interface RecordedEvent<Type extends string = string, Payload = unknown>
  extends NewEvent<Type, Payload> {
  /** Monotonic position in the log; breaks ties between events at the same instant. */
  readonly sequence: number;
}

export type AppendError = {
  readonly kind: "retroactive";
  readonly at: Instant;
  readonly latest: Instant;
};

/**
 * Append-only log of confirmed facts. The past is never rewritten (rule D3):
 * an event dated before the latest recorded event is rejected.
 * Concurrency control and idempotency are open (engine rules, item 6).
 */
export interface EventLog {
  append(event: NewEvent): Result<RecordedEvent, AppendError>;
  /** Events in log order, optionally only those at or after `from`. */
  read(from?: Instant): readonly RecordedEvent[];
}
