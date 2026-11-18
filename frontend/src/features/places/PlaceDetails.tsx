import { NearbyPlaces } from "./NearbyPlaces";
import { PlaceIcon } from "../../icons/PlaceIcon";
import { useWorldView } from "../../app/view/ViewContext";
import { focusLevelHeading } from "../navigation/focusNavigation";
import { Button } from "../../design-system/Button";
import { canExplore, canObserve } from "../../domain/navigation";
import { placeName } from "../../domain/selectors";
const interiorLabels = {
  available: "Defined interior",
  undefined: "Interior not defined",
  restricted: "Interior unavailable",
};
export function PlaceDetails() {
  const { snapshot, state, dispatch } = useWorldView();
  const place = snapshot.places.find(
    (item) => item.id === state.selectedPlaceId,
  );
  const connections = place
    ? snapshot.connections.filter(
        (edge) =>
          (edge.from === place.id || edge.to === place.id) &&
          canObserve(snapshot, edge.from) &&
          canObserve(snapshot, edge.to),
      )
    : [];
  return (
    <section
      id="place-details"
      tabIndex={-1}
      className="place-strip"
      aria-labelledby="place-heading"
    >
      <div className="place-strip__title">
        {place ? (
          <span className="selected-place-icon">
            <PlaceIcon catalogType={place.catalogType} size={24} />
          </span>
        ) : (
          <span className="selection-indicator" aria-hidden="true" />
        )}
        <div>
          <p className="eyebrow">Selected place</p>
          <h2 id="place-heading">{place?.name ?? "Nothing selected yet"}</h2>
          {place ? (
            <p className="muted-text">
              {placeName(snapshot, place.parentId)} ·{" "}
              {interiorLabels[place.interior]}
            </p>
          ) : null}
          {place && canExplore(snapshot, place.id) ? (
            <Button
              variant="primary"
              onClick={() => {
                dispatch({ type: "navigate", snapshot, levelId: place.id });
                requestAnimationFrame(focusLevelHeading);
              }}
            >
              Explore interior
            </Button>
          ) : null}
        </div>
      </div>
      {place ? (
        <div className="place-relations">
          <section className="nearby-details" aria-labelledby="nearby-heading">
            <h3 id="nearby-heading">Nearby places</h3>
            <NearbyPlaces snapshot={snapshot} placeId={place.id} />
            <p className="relation-note">
              Nearness does not grant direct access.
            </p>
          </section>
          <section
            className="connection-details"
            aria-labelledby="access-heading"
          >
            <h3 id="access-heading">Direct access</h3>
            {connections.length ? (
              <ul>
                {connections.map((edge) => (
                  <li key={edge.id}>
                    <span>
                      {placeName(
                        snapshot,
                        edge.from === place.id ? edge.to : edge.from,
                      )}
                    </span>
                    <span>
                      {edge.durationMinutes === null
                        ? "Duration unknown"
                        : `${edge.durationMinutes} min`}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No direct access recorded.</p>
            )}
          </section>
        </div>
      ) : (
        <p>Select a place from the directory to see its context.</p>
      )}
    </section>
  );
}
