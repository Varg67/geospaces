import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const size of [
  { width: 1920, height: 1080 },
  { width: 1440, height: 900 },
  { width: 1280, height: 720 },
  { width: 1024, height: 640 },
]) {
  test(`metro map remains aligned and readable at ${size.width}`, async ({
    page,
  }) => {
    await page.setViewportSize(size);
    await page.goto("/");
    const map = page.getByRole("group", { name: "Places on the map" });
    await expect(map.getByRole("button")).toHaveCount(15);
    await expect(page.locator("[data-proximity]")).toHaveCount(19);
    await expect(page.locator("[data-connection]")).toHaveCount(0);
    const boxes = await page
      .locator(".map-station__label")
      .evaluateAll((labels) =>
        labels.map((label) => {
          const b = label.getBoundingClientRect();
          return {
            x: b.x,
            y: b.y,
            right: b.right,
            bottom: b.bottom,
            font: parseFloat(getComputedStyle(label).fontSize),
          };
        }),
      );
    expect(boxes.every((b) => b.font >= 12)).toBe(true);
    for (let a = 0; a < boxes.length; a++)
      for (let b = a + 1; b < boxes.length; b++) {
        const x = boxes[a]!,
          y = boxes[b]!;
        expect(
          x.right <= y.x ||
            y.right <= x.x ||
            x.bottom <= y.y ||
            y.bottom <= x.y,
        ).toBe(true);
      }
    await map.getByRole("button", { name: "Home", exact: true }).focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("heading", { name: "Home", exact: true }),
    ).toBeVisible();
    await expect(page.getByTestId("confirmed-location")).toHaveText("Café");
    await page.getByRole("button", { name: "Place list", exact: true }).click();
    await expect(
      page.getByRole("button", { name: "Home", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await page.getByRole("button", { name: "Map", exact: true }).click();
    await expect(
      map.getByRole("button", { name: "Home", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  });
}
test("presence follows the observed character independently of selected place", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Home", exact: true }).click();
  await expect(page.locator(".map-presence__label")).toHaveText("Ana");
  await page.getByLabel("Observed character").selectOption("leo");
  await expect(page.locator(".map-presence__label")).toHaveText("Leo");
  await expect(
    page.getByRole("heading", { name: "Home", exact: true }),
  ).toBeVisible();
});
test("unknown and transit observations never invent a place marker or arrival", async ({
  page,
}) => {
  await page.goto("/?scenario=unknown");
  await expect(page.getByTestId("confirmed-location")).toHaveText(
    "Unknown location",
  );
  await expect(page.locator(".map-presence")).toHaveCount(0);
  await page.goto("/?scenario=transit");
  await expect(page.locator(".map-presence--journey")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Show recorded journey", exact: true })
    .click();
  await expect(page.locator(".map-presence--journey")).toBeVisible();
  const before = await page.locator(".map-presence--journey").boundingBox();
  await page.waitForTimeout(300);
  expect(await page.locator(".map-presence--journey").boundingBox()).toEqual(
    before,
  );
  await expect(page.getByTestId("confirmed-location")).toHaveText(
    "In transit: Home → Café",
  );
});

test("narrow view starts with full names and preserves an explicit map choice", async ({
  page,
}) => {
  await page.setViewportSize({ width: 640, height: 450 });
  await page.goto("/?scenario=long-content");
  const hint = page.getByText(
    "For full place names in a smaller map, use Place list.",
  );
  await expect(
    page.getByRole("button", { name: "Place list", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  const fullName = "Home — extended example name for layout evaluation";
  await expect(
    page.getByRole("button", { name: fullName, exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: fullName, exact: true }).click();
  await expect(
    page.getByRole("heading", { name: fullName, exact: true }),
  ).toBeVisible();
  await expect(page.getByTestId("confirmed-location")).toHaveText(
    "Café — extended example name for layout evaluation",
  );
  await page.getByRole("button", { name: "Map", exact: true }).click();
  await expect(hint).toBeVisible();
  await expect(
    page.getByRole("button", { name: fullName, exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(hint).not.toBeVisible();
});
