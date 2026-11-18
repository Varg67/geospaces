import { err, ok, type Instant, type Result } from "../../kernel/index.ts";
import type { AppendError, EventLog, NewEvent, RecordedEvent } from "../eventLog.ts";

export class InMemoryEventLog implements EventLog {
  readonly #events: RecordedEvent[] = [];

  append(event: NewEvent): Result<RecordedEvent, AppendError> {
    const latest = this.#events.at(-1);
    if (latest && event.at < latest.at) {
      return err({ kind: "retroactive", at: event.at, latest: latest.at });
    }
    const recorded: RecordedEvent = Object.freeze({ ...event, sequence: this.#events.length });
    this.#events.push(recorded);
    return ok(recorded);
  }

  read(from?: Instant): readonly RecordedEvent[] {
    return from === undefined ? [...this.#events] : this.#events.filter((e) => e.at >= from);
  }
}
