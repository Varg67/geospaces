import { describe, expect, it } from "vitest";
import { instant, minutes } from "../../kernel/index.ts";
import { InMemoryEventLog } from "./inMemoryEventLog.ts";
import { ManualClock } from "./manualClock.ts";
import { SeededRandom } from "./seededRandom.ts";

describe("SeededRandom", () => {
  it("reproduces the same sequence from the same seed", () => {
    const a = new SeededRandom(42);
    const b = new SeededRandom(42);
    const drawsA = Array.from({ length: 5 }, () => a.next());
    const drawsB = Array.from({ length: 5 }, () => b.next());
    expect(drawsA).toEqual(drawsB);
    expect(new SeededRandom(43).next()).not.toBe(drawsA[0]);
    for (const value of drawsA) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});

describe("ManualClock", () => {
  it("advances but never moves backwards", () => {
    const clock = new ManualClock(instant(0));
    expect(clock.advance(minutes(10))).toBe(600);
    expect(() => clock.set(instant(10))).toThrow(RangeError);
  });
});

describe("InMemoryEventLog", () => {
  it("keeps order, allows simultaneous events, and rejects retroactive ones", () => {
    const log = new InMemoryEventLog();
    expect(log.append({ type: "a", at: instant(100), payload: null }).ok).toBe(true);
    expect(log.append({ type: "b", at: instant(100), payload: null }).ok).toBe(true);
    const late = log.append({ type: "c", at: instant(50), payload: null });
    expect(late).toEqual({ ok: false, error: { kind: "retroactive", at: 50, latest: 100 } });
    expect(log.read().map((e) => [e.type, e.sequence])).toEqual([["a", 0], ["b", 1]]);
    expect(log.read(instant(101))).toEqual([]);
  });
});
