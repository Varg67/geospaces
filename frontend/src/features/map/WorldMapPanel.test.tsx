import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { WorldViewProvider } from "../../app/view/WorldViewProvider";
import { createFixtureReader } from "../../data/fixtureReader";
import { WorldMapPanel } from "./WorldMapPanel";
it("map and list share selection without modifying observation data", async () => {
  const user = userEvent.setup(),
    snapshot = await createFixtureReader("ready", 0).loadSnapshot(),
    before = JSON.stringify(snapshot);
  render(
    <WorldViewProvider snapshot={snapshot}>
      <WorldMapPanel />
    </WorldViewProvider>,
  );
  await user.click(screen.getByRole("button", { name: "Home" }));
  expect(screen.getByRole("button", { name: "Home" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await user.click(screen.getByRole("button", { name: "Place list" }));
  expect(screen.getByRole("button", { name: "Home" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await user.click(screen.getByRole("button", { name: "Library" }));
  await user.click(screen.getByRole("button", { name: "Map" }));
  expect(screen.getByRole("button", { name: "Library" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect(JSON.stringify(snapshot)).toBe(before);
});
it("keeps the place list available when the layout is absent", async () => {
  const user = userEvent.setup(),
    snapshot = await createFixtureReader("ready", 0).loadSnapshot();
  render(
    <WorldViewProvider snapshot={{ ...snapshot, layouts: [] }}>
      <WorldMapPanel />
    </WorldViewProvider>,
  );
  expect(screen.getByText("Map unavailable")).toBeVisible();
  await user.click(screen.getByRole("button", { name: "Place list" }));
  expect(screen.getByRole("button", { name: "Home" })).toBeVisible();
});
it("changes relationship layers without changing selection, camera or snapshot", async () => {
  const user = userEvent.setup(),
    snapshot = await createFixtureReader("ready", 0).loadSnapshot(),
    before = JSON.stringify(snapshot);
  const { container } = render(
    <WorldViewProvider snapshot={snapshot}>
      <WorldMapPanel />
    </WorldViewProvider>,
  );
  expect(screen.getByRole("button", { name: "Nearby" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await user.click(screen.getByRole("button", { name: "Café" }));
  expect(
    container.querySelectorAll('[data-proximity][data-incident="true"]'),
  ).toHaveLength(4);
  const position = screen
    .getByRole("button", { name: "Café" })
    .getAttribute("style");
  await user.click(screen.getByRole("button", { name: "Access" }));
  expect(container.querySelectorAll("[data-proximity]")).toHaveLength(0);
  expect(container.querySelector('[data-connection="walk-1"]')).toBeNull();
  expect(
    container.querySelectorAll('[data-connection][data-incident="true"]'),
  ).toHaveLength(3);
  expect(screen.getByRole("button", { name: "Café" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  // Nearby is a web layout and Access a schematic one, so positions differ
  // between layers; returning to Nearby must reproduce the same web.
  await user.click(screen.getByRole("button", { name: "Nearby" }));
  expect(
    screen.getByRole("button", { name: "Café" }).getAttribute("style"),
  ).toBe(position);
  expect(JSON.stringify(snapshot)).toBe(before);
});
it("renders transit only on the explicitly requested Access geometry", async () => {
  const user = userEvent.setup(),
    snapshot = await createFixtureReader("transit", 0).loadSnapshot();
  const { container } = render(
    <WorldViewProvider snapshot={snapshot}>
      <WorldMapPanel />
    </WorldViewProvider>,
  );
  expect(container.querySelector(".map-presence--journey")).toBeNull();
  await user.click(
    screen.getByRole("button", { name: "Show recorded journey" }),
  );
  expect(screen.getByRole("button", { name: "Access" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  expect(container.querySelector(".map-presence--journey")).toBeInTheDocument();
});
