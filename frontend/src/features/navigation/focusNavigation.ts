/** Explicit level changes reveal their destination without changing map camera. */
export function focusLevelHeading() {
  const heading = document.getElementById("world-heading");
  heading?.focus({ preventScroll: true });
  heading?.scrollIntoView({ block: "start" });
}
export function focusReturnedSelection() {
  const selected = document.querySelector<HTMLButtonElement>(
    '.map-station[aria-pressed="true"],.district-list button[aria-pressed="true"]',
  );
  const canvas = selected?.closest<HTMLElement>(".district-network");
  if (selected && canvas) {
    // Scrolling an overflow-hidden canvas would silently change its projection.
    // Reveal the surface instead, and focus only a station inside its camera.
    const station = selected.getBoundingClientRect();
    const surface = canvas.getBoundingClientRect();
    if (
      station.left < surface.left ||
      station.right > surface.right ||
      station.top < surface.top ||
      station.bottom > surface.bottom
    ) {
      focusLevelHeading();
      return;
    }
    canvas.scrollIntoView({ block: "center" });
    selected.focus({ preventScroll: true });
  } else if (selected) {
    selected.focus({ preventScroll: true });
    selected.scrollIntoView({ block: "center" });
  } else focusLevelHeading();
}
