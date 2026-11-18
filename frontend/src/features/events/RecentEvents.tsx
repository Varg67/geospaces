import { characterEvents, formatStateTime } from "../../domain/selectors";
import { Disclosure } from "../../design-system/Disclosure";
import { useWorldView } from "../../app/view/ViewContext";
export function RecentEvents() {
  const { snapshot, state } = useWorldView();
  const events = state.characterId
    ? characterEvents(snapshot, state.characterId)
    : [];
  return (
    <Disclosure label="Recent events">
      {events.length ? (
        <ol className="event-list">
          {events.map((event) => (
            <li key={event.id}>
              <time dateTime={event.at}>
                {formatStateTime(event.at, snapshot.timeZone)}
              </time>
              <p>{event.summary}</p>
            </li>
          ))}
        </ol>
      ) : (
        <p>No recorded events for this character.</p>
      )}
    </Disclosure>
  );
}
