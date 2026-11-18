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

console.log(`smoke ok: bundle loads on Node ${process.versions.node}`);
