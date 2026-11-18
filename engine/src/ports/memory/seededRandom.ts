import type { RandomSource } from "../random.ts";

/** Mulberry32: small, fast, deterministic PRNG. Not for security use. */
export class SeededRandom implements RandomSource {
  readonly seed: number;
  #state: number;

  constructor(seed: number) {
    if (!Number.isSafeInteger(seed)) throw new RangeError("Seed must be a safe integer");
    this.seed = seed;
    this.#state = seed >>> 0;
  }

  next(): number {
    this.#state = (this.#state + 0x6d2b79f5) >>> 0;
    let t = this.#state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296;
  }
}
