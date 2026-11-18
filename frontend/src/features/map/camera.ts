import type { Camera } from "../../app/view/viewState";
import type { Transform } from "./geometry";
export const MIN_ZOOM = 0.5,
  MAX_ZOOM = 3;
export function boundedCamera(
  camera: Camera,
  viewport: { width: number; height: number },
): Camera {
  const zoom = Math.max(
    MIN_ZOOM,
    Math.min(MAX_ZOOM, Number.isFinite(camera.zoom) ? camera.zoom : 1),
  );
  const limitX = (viewport.width * zoom) / 2,
    limitY = (viewport.height * zoom) / 2;
  return {
    zoom,
    x: Math.max(
      -limitX,
      Math.min(limitX, Number.isFinite(camera.x) ? camera.x : 0),
    ),
    y: Math.max(
      -limitY,
      Math.min(limitY, Number.isFinite(camera.y) ? camera.y : 0),
    ),
  };
}
export function cameraTransform(
  base: Transform,
  viewport: { width: number; height: number },
  camera: Camera,
): Transform {
  return {
    scale: base.scale * camera.zoom,
    x:
      viewport.width / 2 +
      (base.x - viewport.width / 2) * camera.zoom +
      camera.x,
    y:
      viewport.height / 2 +
      (base.y - viewport.height / 2) * camera.zoom +
      camera.y,
  };
}
