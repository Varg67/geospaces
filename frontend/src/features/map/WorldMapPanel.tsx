import { useState } from "react";
import { useWorldView } from "../../app/view/ViewContext";
import { Button } from "../../design-system/Button";
import { PlaceDirectory } from "../places/PlaceDirectory";
import { useViewport } from "./useViewport";
import { DistrictNetwork } from "./DistrictNetwork";
import type { NetworkLayer } from "./mapModel";
import "./map.css";
export function WorldMapPanel() {
  const [choice, setView] = useState<"map" | "list" | null>(null);
  const [layer, setLayer] = useState<NetworkLayer>("nearby");
  const { snapshot, state } = useWorldView();
  const character = snapshot.characters.find(
    (character) => character.id === state.characterId,
  );
  const { ref, size } = useViewport();
  const view = choice ?? (size.width > 0 && size.width < 480 ? "list" : "map");
  return (
    <div className="world-map-panel" ref={ref}>
      <div
        className="map-view-controls"
        role="group"
        aria-label="World presentation"
      >
        <Button aria-pressed={view === "map"} onClick={() => setView("map")}>
          Map
        </Button>
        <Button aria-pressed={view === "list"} onClick={() => setView("list")}>
          Place list
        </Button>
      </div>
      {view === "map" ? (
        <>
          <div
            className="relation-layer-controls"
            role="group"
            aria-label="Relationship layer"
          >
            <Button
              aria-pressed={layer === "nearby"}
              onClick={() => setLayer("nearby")}
            >
              Nearby
            </Button>
            <Button
              aria-pressed={layer === "access"}
              onClick={() => setLayer("access")}
            >
              Access
            </Button>
          </div>
          <p className="relationship-explanation">
            {layer === "nearby"
              ? "Nearby places · nearness does not grant access. Select a place to highlight all its nearby links."
              : "Direct access · recorded passages and travel durations. Select a place to highlight its access links."}
          </p>
          {layer === "nearby" && !snapshot.proximity ? (
            <p className="relationship-note">
              Nearby relationships are not recorded.
            </p>
          ) : null}
          {layer === "nearby" && character?.location.kind === "journey" ? (
            <div className="journey-layer-note">
              <p>
                {character.name} is in transit on a recorded access route. The
                Nearby layer does not show travel.
              </p>
              <Button onClick={() => setLayer("access")}>
                Show recorded journey
              </Button>
            </div>
          ) : null}
          <p className="map-narrow-hint">
            For full place names in a smaller map, use Place list.
          </p>
          <DistrictNetwork layer={layer} />
        </>
      ) : (
        <PlaceDirectory />
      )}
      {view === "map" ? (
        <div className="map-legend">
          <span>
            <i
              className={`legend-line${layer === "nearby" ? " legend-line--nearby" : ""}`}
              aria-hidden="true"
            />
            {layer === "nearby" ? "Recorded nearness" : "Direct access"}
          </span>
          <span>
            <i className="legend-station" aria-hidden="true" />
            Place · larger ring = 3+ links in this layer
          </span>
          <span>
            <i className="legend-presence" aria-hidden="true" />
            Observed character
          </span>
          <span>Coral = selection and incident links</span>
        </div>
      ) : null}
      <p className="map-scale-note">
        Schematic layout · not to scale · crossings add no links · only Access
        defines passages and durations
      </p>
    </div>
  );
}
