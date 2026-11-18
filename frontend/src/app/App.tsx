import { useState } from "react";
import {
  createFixtureReader,
  fixtureScenarioFromSearch,
} from "../data/fixtureReader";
import type { WorldReader } from "../domain/world";
import {
  ErrorState,
  LoadingState,
  EmptyState,
} from "../design-system/Feedback";
import { CompanionShell } from "./CompanionShell";
import { WorldViewProvider } from "./view/WorldViewProvider";
import { useWorldSnapshot } from "./useWorldSnapshot";
import { ReadStateScreen } from "./ReadStateScreen";
const defaultReader = createFixtureReader(
  fixtureScenarioFromSearch(window.location.search),
);
export function App({ reader = defaultReader }: { reader?: WorldReader }) {
  const [attempt, setAttempt] = useState(0);
  const state = useWorldSnapshot(reader, attempt);
  const hasWorld =
    state.status === "ready" &&
    state.snapshot.places.some((place) => place.kind === "world") &&
    state.snapshot.characters.length > 0;
  return (
    <div className="geospace-theme">
      <a className="skip-link" href="#workspace">
        Skip to workspace
      </a>
      {state.status === "loading" ? (
        <ReadStateScreen>
          <LoadingState />
        </ReadStateScreen>
      ) : state.status === "error" ? (
        <ReadStateScreen>
          <ErrorState onRetry={() => setAttempt((value) => value + 1)} />
        </ReadStateScreen>
      ) : !hasWorld ? (
        <ReadStateScreen>
          <EmptyState
            title="No world to observe"
            description="This example has no places or characters available."
          />
        </ReadStateScreen>
      ) : (
        <WorldViewProvider snapshot={state.snapshot}>
          <CompanionShell />
        </WorldViewProvider>
      )}
    </div>
  );
}
