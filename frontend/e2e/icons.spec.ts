import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("custom and generic symbols retain visible names, keyboard operation and metro structure", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/?scenario=icon-examples");
  const map = page.getByRole("group", { name: "Places on the map" });
  const market = map.getByRole("button", {
    name: "Open-air market",
    exact: true,
  });
  await expect(market.locator('[data-icon-source="custom"]')).toHaveCount(1);
  const mask = market.locator(".place-icon__custom");
  await expect(mask).toHaveCSS("background-color", "rgb(82, 102, 83)");
  expect(
    await mask.evaluate((element) => getComputedStyle(element).maskImage),
  ).toContain("open-air-market-stall");
  await expect(market.locator(".place-icon")).toHaveCSS("width", "16px");
  await market.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: "Open-air market", exact: true }),
  ).toBeVisible();
  await expect(
    page.locator('#place-details [data-icon-source="custom"]'),
  ).toHaveCSS("width", "24px");
  await expect(page.getByTestId("confirmed-location")).toHaveText("Café");
  await expect(
    map
      .getByRole("button", { name: "Flower shop", exact: true })
      .locator('[data-icon-source="fallback"]'),
  ).toHaveAttribute("data-icon-id", "generic/place");
  await page.getByRole("button", { name: "Place list", exact: true }).click();
  await expect(
    page
      .getByRole("button", { name: "Sewing atelier", exact: true })
      .locator('[data-icon-source="custom"]'),
  ).toHaveCSS("width", "20px");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  expect(errors).toEqual([]);
});
test("reduced motion keeps keyboard exploration and visible focus without animation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Home", exact: true }).focus();
  await page.keyboard.press("Enter");
  await page
    .getByRole("button", { name: "Explore interior", exact: true })
    .focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#world-heading")).toBeFocused();
  await expect(page.locator("#world-heading")).toBeInViewport();
  const bedroom = page.getByRole("button", { name: "Bedroom", exact: true });
  await bedroom.focus();
  await expect(bedroom).toHaveCSS("outline-style", "solid");
  await expect(bedroom).toHaveCSS("outline-width", "3px");
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: "Bedroom", exact: true }),
  ).toBeVisible();
  const motion = await bedroom.evaluate((element) => ({
    animation: getComputedStyle(element).animationName,
    transition: getComputedStyle(element).transitionDuration,
  }));
  expect(motion).toEqual({ animation: "none", transition: "0s" });
  await page
    .getByRole("navigation", { name: "Place hierarchy" })
    .getByRole("button", { name: "Alder Grove", exact: true })
    .focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "Home", exact: true }),
  ).toBeFocused();
  await expect(page.getByTestId("confirmed-location")).toHaveText("Café");
});
