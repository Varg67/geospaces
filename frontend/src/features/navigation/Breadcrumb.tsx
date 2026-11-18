import { useWorldView } from "../../app/view/ViewContext";
import { focusReturnedSelection } from "./focusNavigation";
import { ancestors, returnSelection } from "../../domain/navigation";
export function Breadcrumb() {
  const { snapshot, state, dispatch } = useWorldView();
  return (
    <nav className="place-breadcrumb" aria-label="Place hierarchy">
      <ol>
        {ancestors(snapshot, state.levelId).map((place, index, array) => (
          <li key={place.id}>
            {index > 0 ? <span aria-hidden="true">›</span> : null}
            {index === array.length - 1 ? (
              <span aria-current="location">{place.name}</span>
            ) : (
              <button
                type="button"
                onClick={() => {
                  dispatch({
                    type: "navigate",
                    snapshot,
                    levelId: place.id,
                    returnPlaceId: returnSelection(
                      snapshot,
                      state.levelId,
                      place.id,
                    ),
                  });
                  requestAnimationFrame(focusReturnedSelection);
                }}
              >
                {place.name}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
