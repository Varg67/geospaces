import { addSeconds, type Instant, type Seconds } from "../../kernel/index.ts";
import type { Clock } from "../clock.ts";

/** Test clock that only moves when told to. */
export class ManualClock implements Clock {
  #now: Instant;

  constructor(start: Instant) {
    this.#now = start;
  }

  now(): Instant {
    return this.#now;
  }

  advance(span: Seconds): Instant {
    this.#now = addSeconds(this.#now, span);
    return this.#now;
  }

  set(at: Instant): void {
    if (at < this.#now) throw new RangeError("ManualClock cannot move backwards");
    this.#now = at;
  }
}
