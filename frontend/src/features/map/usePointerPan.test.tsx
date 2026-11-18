import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { usePointerPan } from "./usePointerPan";
import { fitCamera } from "../../app/view/viewState";
function Surface() {
  const [camera, setCamera] = useState(fitCamera);
  const pan = usePointerPan(camera, { width: 600, height: 400 }, setCamera);
  return (
    <div {...pan} data-testid="surface" onClick={vi.fn()}>
      <output>{camera.x}</output>
    </div>
  );
}
describe("pointer camera lifecycle", () => {
  it("abandons cancelled or lost captures and requires the drag threshold", () => {
    render(<Surface />);
    const surface = screen.getByTestId("surface");
    surface.setPointerCapture = vi.fn();
    surface.hasPointerCapture = () => true;
    surface.releasePointerCapture = vi.fn();
    fireEvent.pointerDown(surface, {
      button: 0,
      clientX: 0,
      clientY: 0,
      pointerId: 1,
    });
    fireEvent.pointerMove(surface, { clientX: 3, clientY: 0, pointerId: 1 });
    expect(screen.getByRole("status")).toHaveTextContent("0");
    fireEvent.pointerMove(surface, { clientX: 20, clientY: 0, pointerId: 1 });
    expect(screen.getByRole("status")).toHaveTextContent("20");
    fireEvent.lostPointerCapture(surface, { pointerId: 1 });
    fireEvent.pointerMove(surface, { clientX: 80, clientY: 0, pointerId: 1 });
    expect(screen.getByRole("status")).toHaveTextContent("20");
    fireEvent.pointerDown(surface, {
      button: 0,
      clientX: 0,
      clientY: 0,
      pointerId: 2,
    });
    fireEvent.pointerCancel(surface, { pointerId: 2 });
    fireEvent.pointerMove(surface, { clientX: 100, clientY: 0, pointerId: 2 });
    expect(screen.getByRole("status")).toHaveTextContent("20");
  });
});
