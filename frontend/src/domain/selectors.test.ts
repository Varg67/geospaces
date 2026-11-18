import { expect, it } from "vitest";
import { exampleWorld } from "../data/exampleWorld";
import { characterEvents, formatStateTime } from "./selectors";
it("orders events chronologically with stable equal timestamps and character filtering", () => {
  const base = exampleWorld.events[0]!;
  const snapshot = {
    ...exampleWorld,
    events: [
      { ...base, id: "later", at: "2026-11-16T08:25:00-03:00" },
      { ...base, id: "equal-first" },
      { ...base, id: "other", characterId: "leo" },
      { ...base, id: "equal-second" },
    ],
  };
  expect(characterEvents(snapshot, "ana").map((e) => e.id)).toEqual([
    "equal-first",
    "equal-second",
    "later",
  ]);
});
it("formats observation time in the stated timezone and preserves unknown time", () => {
  expect(formatStateTime("2026-11-16T11:30:00Z", "America/Sao_Paulo")).toBe(
    "16 Nov 2026, 08:30",
  );
  expect(formatStateTime(null, "America/Sao_Paulo")).toBe("State time unknown");
});
