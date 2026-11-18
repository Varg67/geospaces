import { useEffect, useState } from "react";
import type { WorldReader, WorldSnapshot } from "../domain/world";

type LoadState =
  | { status: "loading" }
  | { status: "ready"; snapshot: WorldSnapshot }
  | { status: "error" };

type SettledRequest = {
  reader: WorldReader;
  attempt: number;
  result: LoadState;
};

export function useWorldSnapshot(
  reader: WorldReader,
  attempt: number,
): LoadState {
  const [settled, setSettled] = useState<SettledRequest | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    reader.loadSnapshot(controller.signal).then(
      (snapshot) => {
        if (!controller.signal.aborted) {
          setSettled({
            reader,
            attempt,
            result: { status: "ready", snapshot },
          });
        }
      },
      () => {
        if (!controller.signal.aborted) {
          setSettled({ reader, attempt, result: { status: "error" } });
        }
      },
    );
    return () => controller.abort();
  }, [reader, attempt]);

  // A new request is pending immediately, without briefly displaying old data.
  return settled?.reader === reader && settled.attempt === attempt
    ? settled.result
    : { status: "loading" };
}
