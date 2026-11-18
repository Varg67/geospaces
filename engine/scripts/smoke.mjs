// Loads the single-file bundle on the running Node.js and exercises its runtime exports.
import assert from "node:assert/strict";

const engine = await import(new URL("../dist/geospace-engine.mjs", import.meta.url).href);

assert.equal(engine.ENGINE_NAME, "geospace-engine");

const a = new engine.SeededRandom(7);
const b = new engine.SeededRandom(7);
assert.equal(a.next(), b.next());

const log = new engine.InMemoryEventLog();
assert.equal(log.append({ type: "probe", at: engine.instant(10), payload: null }).ok, true);
assert.equal(log.append({ type: "probe", at: engine.instant(5), payload: null }).ok, false);

const built = engine.createWorld({
  places: [
    { id: "w", name: "World", parentId: null, kind: "world" },
    { id: "d", name: "District", parentId: "w", kind: "district", profile: "centre" },
    { id: "a", name: "A", parentId: "d", kind: "urban" },
    { id: "b", name: "B", parentId: "d", kind: "urban" },
  ],
  edges: [{ id: "e", from: "a", to: "b", lengthM: 120, allowedModes: ["walk"] }],
});
assert.equal(built.ok, true);
assert.equal(engine.shortestPath(built.value.world, "b", "a", ["walk"]).lengthM, 120);

console.log(`smoke ok: bundle loads on Node ${process.versions.node}`);
