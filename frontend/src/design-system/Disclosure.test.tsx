import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { Disclosure } from "./Disclosure";
it("opens and closes through keyboard with a stable named control", async () => {
  const user = userEvent.setup();
  render(
    <Disclosure label="About this preview">
      <p>Local example data</p>
    </Disclosure>,
  );
  const button = screen.getByRole("button", { name: "About this preview" });
  expect(button).toHaveAttribute("aria-expanded", "false");
  expect(screen.getByText("Local example data")).not.toBeVisible();
  await user.tab();
  expect(button).toHaveFocus();
  await user.keyboard("{Enter}");
  expect(button).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByText("Local example data")).toBeVisible();
  await user.keyboard(" ");
  expect(button).toHaveAttribute("aria-expanded", "false");
});
