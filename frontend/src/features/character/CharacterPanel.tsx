import { canObserve } from "../../domain/navigation";
import { NearbyPlaces } from "../places/NearbyPlaces";
import { PlaceIcon } from "../../icons/PlaceIcon";
import { useWorldView } from "../../app/view/ViewContext";
import { describeLocation, formatStateTime } from "../../domain/selectors";
import { RecentEvents } from "../events/RecentEvents";
export function CharacterPanel() {
  const { snapshot, state, dispatch } = useWorldView();
  const character = snapshot.characters.find(
    (item) => item.id === state.characterId,
  );
  const locationId =
    character?.location.kind === "place" ? character.location.placeId : null;
  const locationPlace = snapshot.places.find(
    (place) => place.id === locationId && canObserve(snapshot, place.id),
  );
  return (
    <aside className="character-panel" aria-labelledby="character-heading">
      <div>
        <p className="eyebrow">Your perspective</p>
        <h1 id="character-heading">Companion</h1>
        <p className="panel-intro">Follow a character. Explore their world.</p>
      </div>
      <div className="character-observation">
        <label className="field-label" htmlFor="observed-character">
          Observed character
        </label>
        <select
          id="observed-character"
          value={state.characterId ?? ""}
          onChange={(event) =>
            dispatch({ type: "observe", characterId: event.target.value })
          }
        >
          {snapshot.characters.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        {character ? (
          <section
            aria-label="Confirmed character state"
            className="confirmed-state"
          >
            <div className="character-identity">
              <span className="character-initial" aria-hidden="true">
                {character.name.slice(0, 1)}
              </span>
              <div>
                <h2>{character.name}</h2>
                <p className="muted-text">Fictional character</p>
              </div>
            </div>
            <dl className="state-facts">
              <div>
                <dt>Confirmed location</dt>
                <dd data-testid="confirmed-location">
                  <span className="location-value">
                    <PlaceIcon
                      catalogType={locationPlace?.catalogType}
                      size={20}
                    />
                    <span>{describeLocation(snapshot, character)}</span>
                  </span>
                  {character.location.kind === "place" &&
                  character.location.placeId === state.levelId &&
                  snapshot.places.some(
                    (place) =>
                      place.parentId === state.levelId &&
                      place.kind === "interior",
                  ) ? (
                    <span className="time-zone">Room not recorded</span>
                  ) : null}
                </dd>
              </div>
              <div>
                <dt>Activity</dt>
                <dd>{character.activity ?? "Not recorded"}</dd>
              </div>
              <div>
                <dt>State timestamp</dt>
                <dd>
                  {snapshot.asOf ? (
                    <time dateTime={snapshot.asOf}>
                      {formatStateTime(snapshot.asOf, snapshot.timeZone)}
                    </time>
                  ) : (
                    <span>State time unknown</span>
                  )}
                  <span className="time-zone">{snapshot.timeZone}</span>
                </dd>
              </div>
              {character.location.kind === "journey" ? (
                <div>
                  <dt>Earliest arrival</dt>
                  <dd>
                    <time dateTime={character.location.earliestArrivalAt}>
                      {formatStateTime(
                        character.location.earliestArrivalAt,
                        snapshot.timeZone,
                      )}
                    </time>
                  </dd>
                </div>
              ) : null}
            </dl>
            <section
              className="character-nearby"
              aria-label="Nearby the confirmed location"
            >
              <h3>
                {locationPlace
                  ? `Near ${locationPlace.name}`
                  : "Nearby context"}
              </h3>
              {locationPlace ? (
                <NearbyPlaces snapshot={snapshot} placeId={locationPlace.id} />
              ) : (
                <p>
                  {character.location.kind === "journey"
                    ? "Nearby context unavailable while in transit."
                    : "Nearby context unknown."}
                </p>
              )}
            </section>
          </section>
        ) : (
          <p>No character to observe.</p>
        )}
      </div>
      <div className="panel-bottom">
        <RecentEvents />
        <div className="panel-note">
          <span className="small-rule" />
          <p>
            Browsing a place remains separate from the character’s confirmed
            location.
          </p>
        </div>
      </div>
    </aside>
  );
}
