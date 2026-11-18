import { useEffect, useMemo, useReducer, type ReactNode } from "react";
import type { WorldSnapshot } from "../../domain/world";
import { ViewContext } from "./ViewContext";
import { initialViewState, reconcileViewState, viewReducer } from "./viewState";
export function WorldViewProvider({
  snapshot,
  children,
}: {
  snapshot: WorldSnapshot;
  children: ReactNode;
}) {
  const [stored, dispatch] = useReducer(
    viewReducer,
    snapshot,
    initialViewState,
  );
  useEffect(() => dispatch({ type: "reconcile", snapshot }), [snapshot]);
  const state = reconcileViewState(stored, snapshot);
  const value = useMemo(
    () => ({ snapshot, state, dispatch }),
    [snapshot, state],
  );
  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>;
}
