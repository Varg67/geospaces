import { describe, expect, it } from "vitest";
import { addSeconds, diffSeconds, instant, instantFromIso, instantToIso, minutes, seconds } from "./time.ts";

describe("kernel time", () => {
  it("round-trips ISO timestamps at second precision", () => {
    const at = instantFromIso("2026-11-18T14:20:00Z");
    expect(instantToIso(at)).toBe("2026-11-18T14:20:00.000Z");
  });

  it("adds and subtracts whole seconds", () => {
    const start = instant(1_000);
    const end = addSeconds(start, minutes(40));
    expect(end).toBe(3_400);
    expect(diffSeconds(end, start)).toBe(2_400);
    expect(diffSeconds(start, end)).toBe(-2_400);
  });

  it("rejects fractional or negative durations", () => {
    expect(() => seconds(-1)).toThrow(RangeError);
    expect(() => seconds(1.5)).toThrow(RangeError);
    expect(() => instant(Number.NaN)).toThrow(RangeError);
    expect(() => instantFromIso("not a date")).toThrow(RangeError);
  });
});
