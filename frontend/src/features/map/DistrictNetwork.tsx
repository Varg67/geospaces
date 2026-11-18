import type { NetworkLayer } from "./mapModel";
import { visiblePlaces } from "../../domain/navigation";
import { useWorldView } from "../../app/view/ViewContext";
import { CameraControls } from "./CameraControls";
import { cameraTransform } from "./camera";
import { usePointerPan } from "./usePointerPan";
import { fitTransform } from "./geometry";
import { useViewport } from "./useViewport";
import { RegionLayer } from "./RegionLayer";
import { RouteLayer } from "./RouteLayer";
import { StationLayer } from "./StationLayer";
import { PresenceLayer } from "./PresenceLayer";
export function DistrictNetwork({ layer }: { layer: NetworkLayer }) {
  const { snapshot, state, dispatch } = useWorldView();
  const sourceLayout = snapshot.layouts.find(
    (item) => item.levelId === state.levelId,
  );
  const visible = new Set(
    visiblePlaces(snapshot, state.levelId).map((place) => place.id),
  );
  const layout = sourceLayout
    ? {
        ...sourceLayout,
        stations: sourceLayout.stations.filter((station) =>
          visible.has(station.placeId),
        ),
        regions: sourceLayout.regions.filter(
          (region) =>
            region.placeId === state.levelId ||
            snapshot.places.some(
              (p) =>
                p.id === region.placeId &&
                p.parentId === state.levelId &&
                p.interior === "available",
            ),
        ),
      }
    : undefined;
  const { ref, size } = useViewport();
  const transform = layout
    ? cameraTransform(fitTransform(layout.bounds, size), size, state.camera)
    : null;
  const pan = usePointerPan(state.camera, size, (camera) =>
    dispatch({ type: "camera", camera }),
  );
  return (
    <>
      {layout && layout.stations.length ? (
        <CameraControls viewport={size} />
      ) : null}
      <div
        className="district-network"
        ref={ref}
        {...pan}
        role="group"
        aria-label="District Network schematic"
      >
        {layout && layout.stations.length && transform ? (
          <>
            <svg
              className="district-network__geometry"
              width={size.width}
              height={size.height}
              aria-hidden="true"
            >
              <RegionLayer
                snapshot={snapshot}
                layout={layout}
                transform={transform}
              />
              <RouteLayer
                snapshot={snapshot}
                layout={layout}
                transform={transform}
                layer={layer}
                selectedPlaceId={state.selectedPlaceId}
              />
            </svg>
            {size.width > 0 ? (
              <>
                <StationLayer
                  layout={layout}
                  transform={transform}
                  layer={layer}
                />
                <PresenceLayer
                  layout={layout}
                  transform={transform}
                  showJourney={layer === "access"}
                />
              </>
            ) : null}
          </>
        ) : (
          <div className="map-unavailable">
            <h3>{layout ? "This interior is empty" : "Map unavailable"}</h3>
            <p>
              {layout
                ? "No defined places at this level."
                : "No defined layout is available at this level. Use Place list to browse."}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
