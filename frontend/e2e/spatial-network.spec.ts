import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("Café shows its whole declared neighborhood separately from direct access", async ({
  page,
}) => {
  await page.goto("/");
  const map = page.getByRole("group", { name: "Places on the map" });
  await expect(
    page.getByRole("button", { name: "Nearby", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  const context = page.getByRole("region", {
    name: "Nearby the confirmed location",
    exact: true,
  });
  await expect(
    context.getByRole("heading", { name: "Near Café", exact: true }),
  ).toBeVisible();
  await expect(context.getByRole("listitem")).toHaveText([
    "Home",
    "Library",
    "Bakery",
    "Market",
  ]);
  await map.getByRole("button", { name: "Café", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(
    page.locator('[data-proximity][data-incident="true"]'),
  ).toHaveCount(4);
  const nearby = page.getByRole("region", {
    name: "Nearby places",
    exact: true,
  });
  await expect(nearby.getByRole("listitem")).toHaveText([
    "Home",
    "Library",
    "Bakery",
    "Market",
  ]);
  await expect(nearby.getByText(/min|Duration unknown/)).toHaveCount(0);
  const direct = page.getByRole("region", {
    name: "Direct access",
    exact: true,
  });
  await expect(direct.getByRole("listitem")).toHaveCount(3);
  await expect(direct.getByText("Library", { exact: true })).toHaveCount(0);
  await expect(direct.getByText("Clinic", { exact: true })).toBeVisible();
  const camera = await map
    .getByRole("button", { name: "Café", exact: true })
    .evaluate((element) => element.getAttribute("style"));
  await page.getByRole("button", { name: "Access", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("[data-proximity]")).toHaveCount(0);
  await expect(page.locator("[data-connection]")).toHaveCount(19);
  await expect(
    page.locator('[data-connection][data-incident="true"]'),
  ).toHaveCount(3);
  // Nearby is a web layout and Access a schematic one, so positions differ
  // between layers; returning to Nearby must reproduce the same web.
  await page.getByRole("button", { name: "Nearby", exact: true }).click();
  expect(
    await map
      .getByRole("button", { name: "Café", exact: true })
      .getAttribute("style"),
  ).toBe(camera);
  await page.getByRole("button", { name: "Access", exact: true }).click();
  await expect(page.getByTestId("confirmed-location")).toHaveText("Café");
  await map.getByRole("button", { name: "Home", exact: true }).click();
  await expect(
    context.getByRole("heading", { name: "Near Café", exact: true }),
  ).toBeVisible();
  await expect(context.getByRole("listitem")).toHaveText([
    "Home",
    "Library",
    "Bakery",
    "Market",
  ]);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test("nearby bedroom and bathroom do not gain a direct door when browsing Home", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Home", exact: true }).click();
  await page
    .getByRole("button", { name: "Explore interior", exact: true })
    .click();
  await page.getByRole("button", { name: "Bedroom", exact: true }).click();
  const nearby = page.getByRole("region", {
      name: "Nearby places",
      exact: true,
    }),
    direct = page.getByRole("region", { name: "Direct access", exact: true });
  await expect(nearby.getByRole("listitem")).toHaveText(["Bathroom"]);
  await expect(direct.getByText("Bathroom", { exact: true })).toHaveCount(0);
  await expect(direct.getByText("Hallway", { exact: true })).toBeVisible();
  await expect(
    page.locator(
      '[data-proximity="near-bedroom-bathroom"][data-incident="true"]',
    ),
  ).toHaveCount(1);
  await page.getByRole("button", { name: "Access", exact: true }).click();
  await expect(page.locator("[data-proximity]")).toHaveCount(0);
  await expect(page.locator("[data-connection]")).toHaveCount(5);
  await expect(page.getByTestId("confirmed-location")).toHaveText("Café");
  await page
    .getByRole("navigation", { name: "Place hierarchy" })
    .getByRole("button", { name: "Alder Grove", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Home", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
});
for (const scenario of ["nearby-unknown", "nearby-empty"] as const)
  test(`${scenario} is explicit without inventing links`, async ({ page }) => {
    await page.goto(`/?scenario=${scenario}`);
    await page.getByRole("button", { name: "Café", exact: true }).click();
    await expect(page.locator("[data-proximity]")).toHaveCount(0);
    const nearby = page.getByRole("region", {
      name: "Nearby places",
      exact: true,
    });
    await expect(
      nearby.getByText(
        scenario === "nearby-unknown"
          ? "Nearby places unknown."
          : "No nearby places recorded in this view.",
        { exact: true },
      ),
    ).toBeVisible();
    await page.getByRole("button", { name: "Access", exact: true }).click();
    await expect(page.locator("[data-connection]")).toHaveCount(19);
  });
