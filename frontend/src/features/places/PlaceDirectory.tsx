import { PlaceIcon } from "../../icons/PlaceIcon";
import { useWorldView } from "../../app/view/ViewContext";
import { visiblePlaces } from "../../domain/navigation";
export function PlaceDirectory() {
  const { snapshot, state, dispatch } = useWorldView();
  const places = visiblePlaces(snapshot, state.levelId);
  const parentIds = [...new Set(places.map((p) => p.parentId))];
  return (
    <div className="place-directory">
      <div className="directory-heading">
        <h3>Explore places</h3>
        <p className="muted-text">Select a place to inspect its details.</p>
        {state.selectedPlaceId ? (
          <a className="details-jump" href="#place-details">
            View selected place details
          </a>
        ) : null}
      </div>
      {places.length ? (
        parentIds.map((id) => (
          <section
            className="district-list"
            key={id}
            aria-label={
              snapshot.places.find((p) => p.id === id)?.name ?? "Places"
            }
          >
            <h4>
              {snapshot.places.find((p) => p.id === id)?.name ?? "Places"}
            </h4>
            <ul>
              {places
                .filter((p) => p.parentId === id)
                .map((place) => (
                  <li key={place.id}>
                    <button
                      type="button"
                      aria-pressed={state.selectedPlaceId === place.id}
                      onClick={() =>
                        dispatch({ type: "select-place", placeId: place.id })
                      }
                    >
                      <PlaceIcon catalogType={place.catalogType} size={20} />
                      {place.name}
                    </button>
                  </li>
                ))}
            </ul>
          </section>
        ))
      ) : (
        <p>No defined places at this level.</p>
      )}
      {state.selectedPlaceId ? (
        <a className="details-jump details-jump--end" href="#place-details">
          View selected place details
        </a>
      ) : null}
    </div>
  );
}
