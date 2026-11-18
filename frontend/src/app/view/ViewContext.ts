import { createContext, useContext, type Dispatch } from "react";
import type { WorldSnapshot } from "../../domain/world";
import type { ViewAction, ViewState } from "./viewState";
export const ViewContext = createContext<{
  snapshot: WorldSnapshot;
  state: ViewState;
  dispatch: Dispatch<ViewAction>;
} | null>(null);
export function useWorldView() {
  const context = useContext(ViewContext);
  if (!context) throw new Error("World view provider is missing");
  return context;
}
