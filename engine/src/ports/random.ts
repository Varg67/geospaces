/**
 * Deterministic random source. Every draw that affects canonical state must be
 * reproducible from a recorded seed (rule D8).
 */
export interface RandomSource {
  readonly seed: number;
  /** Uniform float in [0, 1). */
  next(): number;
}
