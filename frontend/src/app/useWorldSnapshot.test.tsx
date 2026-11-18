import { act, renderHook, waitFor } from "@testing-library/react";
import { expect, it } from "vitest";
import type { WorldReader, WorldSnapshot } from "../domain/world";
import { exampleWorld } from "../data/exampleWorld";
import { useWorldSnapshot } from "./useWorldSnapshot";

it("returns to loading on retry and ignores a cancelled response", async () => {
  const requests: {
    resolve: (snapshot: WorldSnapshot) => void;
    reject: (reason: Error) => void;
    signal?: AbortSignal;
  }[] = [];
  const reader: WorldReader = {
    loadSnapshot(signal) {
      return new Promise((resolve, reject) =>
        requests.push({ resolve, reject, ...(signal ? { signal } : {}) }),
      );
    },
  };
  const { result, rerender } = renderHook(
    ({ attempt }) => useWorldSnapshot(reader, attempt),
    { initialProps: { attempt: 0 } },
  );
  await act(async () => requests[0]!.reject(new Error("Unavailable")));
  expect(result.current.status).toBe("error");
  rerender({ attempt: 1 });
  expect(result.current.status).toBe("loading");
  rerender({ attempt: 2 });
  expect(requests[1]!.signal?.aborted).toBe(true);
  await act(async () => requests[2]!.resolve(exampleWorld));
  await waitFor(() =>
    expect(result.current).toEqual({ status: "ready", snapshot: exampleWorld }),
  );
  await act(async () =>
    requests[1]!.resolve({ ...exampleWorld, name: "Old response" }),
  );
  expect(result.current).toEqual({ status: "ready", snapshot: exampleWorld });
});
