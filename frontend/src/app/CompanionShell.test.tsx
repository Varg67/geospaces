import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CompanionShell } from "./CompanionShell";
import { WorldViewProvider } from "./view/WorldViewProvider";
import { createFixtureReader } from "../data/fixtureReader";
import { exampleWorld } from "../data/exampleWorld";
import type { WorldReader, WorldSnapshot } from "../domain/world";
import { App } from "./App";

describe("observation interface", () => {
  it("changes character and selection independently without modifying the snapshot", async () => {
    const user = userEvent.setup(),
      snapshot = await createFixtureReader("ready", 0).loadSnapshot(),
      before = JSON.stringify(snapshot);
    render(
      <WorldViewProvider snapshot={snapshot}>
        <CompanionShell />
      </WorldViewProvider>,
    );
    expect(screen.getByTestId("confirmed-location")).toHaveTextContent("Café");
    await user.click(screen.getByRole("button", { name: "Home" }));
    expect(screen.getByRole("heading", { name: "Home" })).toBeVisible();
    expect(screen.getByTestId("confirmed-location")).toHaveTextContent("Café");
    expect(screen.getByText("North district · Defined interior")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Recent events" }));
    expect(screen.getByText("Arrived at Café")).toBeVisible();
    await user.selectOptions(
      screen.getByLabelText("Observed character"),
      "leo",
    );
    expect(screen.getByTestId("confirmed-location")).toHaveTextContent(
      "Station",
    );
    expect(
      screen.getByText("No recorded events for this character."),
    ).toBeVisible();
    expect(screen.queryByText("Arrived at Café")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Home" })).toBeVisible();
    expect(JSON.stringify(snapshot)).toBe(before);
  });
  it("clears removed selections and reconciles a removed observed character", async () => {
    const user = userEvent.setup(),
      snapshot = await createFixtureReader("ready", 0).loadSnapshot();
    const { rerender } = render(
      <WorldViewProvider snapshot={snapshot}>
        <CompanionShell />
      </WorldViewProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Bookshop" }));
    await user.selectOptions(
      screen.getByLabelText("Observed character"),
      "leo",
    );
    rerender(
      <WorldViewProvider
        snapshot={{
          ...snapshot,
          places: snapshot.places.filter((p) => p.id !== "place-7"),
          characters: snapshot.characters.filter((c) => c.id !== "leo"),
        }}
      >
        <CompanionShell />
      </WorldViewProvider>,
    );
    expect(
      screen.getByRole("heading", { name: "Nothing selected yet" }),
    ).toBeVisible();
    expect(screen.getByLabelText("Observed character")).toHaveValue("ana");
  });
  it("represents unknown timestamps, locations, durations and unavailable interiors honestly", async () => {
    const user = userEvent.setup(),
      snapshot = await createFixtureReader("unknown", 0).loadSnapshot();
    render(
      <WorldViewProvider snapshot={snapshot}>
        <CompanionShell />
      </WorldViewProvider>,
    );
    expect(screen.getByTestId("confirmed-location")).toHaveTextContent(
      "Unknown location",
    );
    expect(screen.getByText("State time unknown")).toBeVisible();
    expect(screen.getByText("Not recorded")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Bookshop" }));
    expect(screen.getAllByText("Duration unknown")).toHaveLength(3);
    await user.click(screen.getByRole("button", { name: "Clinic" }));
    expect(
      screen.getByText("North district · Interior unavailable"),
    ).toBeVisible();
    expect(
      screen.queryByRole("button", { name: /explore interior/i }),
    ).not.toBeInTheDocument();
  });
  it("represents a recorded journey without advancing it", async () => {
    render(<App reader={createFixtureReader("transit", 0)} />);
    expect(await screen.findByTestId("confirmed-location")).toHaveTextContent(
      "In transit: Home → Café",
    );
    expect(screen.getByText("Earliest arrival")).toBeVisible();
  });
  it("loads, reports failure, and recovers after retry", async () => {
    const user = userEvent.setup();
    const requests: {
      resolve: (snapshot: WorldSnapshot) => void;
      reject: (reason: Error) => void;
    }[] = [];
    const reader: WorldReader = {
      loadSnapshot() {
        return new Promise((resolve, reject) =>
          requests.push({ resolve, reject }),
        );
      },
    };
    render(<App reader={reader} />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading");
    await act(async () =>
      requests[0]!.reject(new Error("Example data is unavailable")),
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Example data is unavailable",
    );
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(screen.getByRole("status")).toHaveTextContent("Loading");
    await act(async () => requests[1]!.resolve(exampleWorld));
    expect(screen.getByRole("heading", { name: "Alder Grove" })).toBeVisible();
  });
  it("shows the empty state and keeps its workspace target available", async () => {
    render(<App reader={createFixtureReader("empty", 0)} />);
    expect(
      await screen.findByRole("heading", { name: "No world to observe" }),
    ).toBeVisible();
    expect(screen.getByRole("main")).toHaveAttribute("id", "workspace");
    expect(
      within(screen.getByRole("main")).queryByLabelText("Observed character"),
    ).not.toBeInTheDocument();
  });
});
