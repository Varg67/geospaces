import { useRef, type PointerEvent, type MouseEvent } from "react";
import type { Camera } from "../../app/view/viewState";
import { boundedCamera } from "./camera";
export function usePointerPan(
  camera: Camera,
  viewport: { width: number; height: number },
  onChange: (camera: Camera) => void,
) {
  const origin = useRef<{ x: number; y: number; camera: Camera } | null>(null),
    dragged = useRef(false);
  return {
    onPointerDown(event: PointerEvent<HTMLDivElement>) {
      dragged.current = false;
      if (event.button !== 0 || (event.target as Element).closest("button,a"))
        return;
      origin.current = { x: event.clientX, y: event.clientY, camera };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    onPointerMove(event: PointerEvent<HTMLDivElement>) {
      const start = origin.current;
      if (!start) return;
      const x = event.clientX - start.x,
        y = event.clientY - start.y;
      if (Math.hypot(x, y) >= 6) dragged.current = true;
      if (dragged.current) {
        event.preventDefault();
        onChange(
          boundedCamera(
            { ...start.camera, x: start.camera.x + x, y: start.camera.y + y },
            viewport,
          ),
        );
      }
    },
    onPointerUp(event: PointerEvent<HTMLDivElement>) {
      if (!origin.current) return;
      origin.current = null;
      if (event.currentTarget.hasPointerCapture(event.pointerId))
        event.currentTarget.releasePointerCapture(event.pointerId);
    },
    onLostPointerCapture() {
      if (origin.current) dragged.current = false;
      origin.current = null;
    },
    onPointerCancel() {
      origin.current = null;
      dragged.current = false;
    },
    onClickCapture(event: MouseEvent<HTMLDivElement>) {
      if (dragged.current) {
        event.preventDefault();
        event.stopPropagation();
        dragged.current = false;
      }
    },
  };
}
