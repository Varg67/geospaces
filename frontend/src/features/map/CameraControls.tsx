import { useWorldView } from "../../app/view/ViewContext";
import { fitCamera } from "../../app/view/viewState";
import { Button } from "../../design-system/Button";
import { boundedCamera, MIN_ZOOM, MAX_ZOOM } from "./camera";
export function CameraControls({
  viewport,
}: {
  viewport: { width: number; height: number };
}) {
  const { state, dispatch } = useWorldView();
  const apply = (x: number, y: number, zoom = state.camera.zoom) =>
    dispatch({
      type: "camera",
      camera: boundedCamera({ x, y, zoom }, viewport),
    });
  const pan = (x: number, y: number) =>
    apply(state.camera.x + x, state.camera.y + y);
  return (
    <div
      className="camera-controls"
      role="group"
      aria-label="Map camera"
      onKeyDown={(event) => {
        if (event.ctrlKey || event.metaKey || event.altKey) return;
        const directions: Record<string, [number, number]> = {
          ArrowLeft: [40, 0],
          ArrowRight: [-40, 0],
          ArrowUp: [0, 40],
          ArrowDown: [0, -40],
        };
        const direction = directions[event.key];
        if (direction) {
          event.preventDefault();
          pan(...direction);
        }
      }}
    >
      <Button
        aria-label="Zoom out"
        disabled={state.camera.zoom <= MIN_ZOOM}
        onClick={() =>
          apply(state.camera.x, state.camera.y, state.camera.zoom - 0.25)
        }
      >
        −
      </Button>
      <output aria-label="Map zoom">
        {Math.round(state.camera.zoom * 100)}%
      </output>
      <Button
        aria-label="Zoom in"
        disabled={state.camera.zoom >= MAX_ZOOM}
        onClick={() =>
          apply(state.camera.x, state.camera.y, state.camera.zoom + 0.25)
        }
      >
        +
      </Button>
      <Button onClick={() => dispatch({ type: "camera", camera: fitCamera })}>
        Fit map
      </Button>
      <div className="pan-controls" role="group" aria-label="Pan map">
        <Button aria-label="Pan left" onClick={() => pan(40, 0)}>
          Left
        </Button>
        <Button aria-label="Pan right" onClick={() => pan(-40, 0)}>
          Right
        </Button>
        <Button aria-label="Pan up" onClick={() => pan(0, 40)}>
          Up
        </Button>
        <Button aria-label="Pan down" onClick={() => pan(0, -40)}>
          Down
        </Button>
      </div>
    </div>
  );
}
