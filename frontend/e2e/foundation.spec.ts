import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("observation, independent selection, character events and accessibility", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle("GeoSpace — Companion");
  await expect(
    page.getByRole("heading", { name: "Alder Grove" }),
  ).toBeVisible();
  await expect(page.getByTestId("confirmed-location")).toHaveText("Café");
  await page.getByRole("button", { name: "Home", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Home", exact: true }),
  ).toBeVisible();
  await expect(page.getByTestId("confirmed-location")).toHaveText("Café");
  const events = page.getByRole("button", { name: "Recent events" });
  await events.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText("Arrived at Café")).toBeVisible();
  await page.getByLabel("Observed character").selectOption("leo");
  await expect(page.getByTestId("confirmed-location")).toHaveText("Station");
  await expect(
    page.getByText("No recorded events for this character."),
  ).toBeVisible();
  expect(errors).toEqual([]);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test("static brand causes no scroll or hash change; explicit skip link still navigates", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 640 });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Alder Grove" }),
  ).toBeVisible();
  const position = () =>
    page.evaluate(() => ({
      scrollY,
      hash: location.hash,
      headerY: document.querySelector("header")!.getBoundingClientRect().y,
    }));
  const before = await position();
  await page.locator(".wordmark").click();
  expect(await position()).toEqual(before);
  await page.locator(".wordmark__edition").click();
  expect(await position()).toEqual(before);
  await expect(page.locator(".wordmark")).not.toHaveAttribute("href");
  await page.getByRole("link", { name: "Skip to workspace" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  await expect(page).toHaveURL(/#workspace$/);
});
for (const size of [
  { width: 1024, height: 640 },
  { width: 1920, height: 1080 },
  { width: 640, height: 450 },
]) {
  test(`observation reflows at ${size.width}×${size.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(size);
    await page.goto("/?scenario=long-content");
    await expect(
      page.getByRole("heading", { name: /Alder Grove/ }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.getByRole("button", { name: /^Home —/ }).click();
    await expect(page.getByRole("heading", { name: /^Home —/ })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}
for (const scenario of ["empty", "unknown", "transit", "error", "loading"]) {
  test(`${scenario} state is honest and accessible`, async ({ page }) => {
    await page.goto(`/?scenario=${scenario}`);
    if (scenario === "empty")
      await expect(
        page.getByRole("heading", { name: "No world to observe" }),
      ).toBeVisible();
    else if (scenario === "error") {
      await expect(page.getByRole("alert")).toBeVisible();
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
      await page.getByRole("button", { name: "Try again" }).click();
      await expect(
        page.getByRole("heading", { name: "Alder Grove" }),
      ).toBeVisible();
    } else if (scenario === "loading")
      await expect(page.getByRole("status")).toHaveText(
        "Loading example data…",
      );
    else if (scenario === "unknown") {
      await expect(page.getByTestId("confirmed-location")).toHaveText(
        "Unknown location",
      );
      await expect(page.getByText("State time unknown")).toBeVisible();
      await page.getByRole("button", { name: "Bookshop", exact: true }).click();
      await expect(
        page.getByText("Duration unknown", { exact: true }),
      ).toHaveCount(3);
    } else
      await expect(page.getByTestId("confirmed-location")).toHaveText(
        "In transit: Home → Café",
      );
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
}
