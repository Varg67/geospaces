import { Breadcrumb } from "../features/navigation/Breadcrumb";
import { CharacterPanel } from "../features/character/CharacterPanel";
import { WorldMapPanel } from "../features/map/WorldMapPanel";
import { PlaceDetails } from "../features/places/PlaceDetails";
import { useWorldView } from "./view/ViewContext";
export function CompanionShell() {
  const { snapshot, state } = useWorldView();
  return (
    <div className="companion-shell">
      <header className="app-header">
        <div className="wordmark">
          <span>Geo</span>Space<span className="wordmark__edition">Weak</span>
        </div>
        <div className="header-context">
          <span className="status-dot" />
          Observation preview
        </div>
        <span className="sample-label">Fictional world</span>
      </header>
      <div className="companion-body">
        <CharacterPanel />
        <main id="workspace" className="workspace" tabIndex={-1}>
          <section className="world-region" aria-labelledby="world-heading">
            <div className="workspace-heading">
              <div>
                <p className="eyebrow">World workspace</p>
                <h2 id="world-heading" tabIndex={-1}>
                  {snapshot.places.find((place) => place.id === state.levelId)
                    ?.name ?? snapshot.name}
                </h2>
              </div>
              <span className="phase-label">Read-only</span>
            </div>
            <Breadcrumb />
            <WorldMapPanel />
            <div className="workspace-caption">
              <span>District Network</span>
              <span>Browse places without moving a character</span>
            </div>
          </section>
          <PlaceDetails />
        </main>
      </div>
      <footer className="app-footer">
        <span>Local example data · no simulation running</span>
        <span>Warm Glass / Companion</span>
      </footer>
    </div>
  );
}
