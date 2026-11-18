import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const map = (page: Page) =>
  page.getByRole("group", { name: "Places on the map" });
const hierarchy = (page: Page) =>
  page.getByRole("navigation", { name: "Place hierarchy" });
async function relativeStation(page: Page, name: string) {
  const surface = await page.locator(".district-network").boundingBox();
  const station = await map(page)
    .getByRole("button", { name, exact: true })
    .boundingBox();
  return {
    x: station!.x - surface!.x,
    y: station!.y - surface!.y,
    width: station!.width,
    height: station!.height,
  };
}
async function enterHome(page: Page, scenario = "ready") {
  await page.goto(`/?scenario=${scenario}`);
  await map(page).getByRole("button", { name: "Home", exact: true }).click();
  await expect(map(page).getByRole("button")).toHaveCount(15);
  await page
    .getByRole("button", { name: "Explore interior", exact: true })
    .click();
  await expect(page.locator("#world-heading")).toHaveText("Home");
}
test("explicit Home exploration restores parent selection, camera, focus and observed state", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Zoom in", exact: true }).click();
  await page.getByRole("button", { name: "Pan left", exact: true }).click();
  const before = await relativeStation(page, "Home");
  await map(page).getByRole("button", { name: "Home", exact: true }).click();
  await page
    .getByRole("button", { name: "Explore interior", exact: true })
    .click();
  await expect(map(page).getByRole("button")).toHaveCount(6);
  await expect(page.locator("#world-heading")).toBeFocused();
  await expect(hierarchy(page)).toHaveText("Alder Grove›North district›Home");
  await expect(page.getByTestId("confirmed-location")).toHaveText("Café");
  await expect(page.locator(".map-presence")).toHaveCount(0);
  await map(page).getByRole("button", { name: "Bedroom", exact: true }).click();
  await page.getByRole("button", { name: "Zoom in", exact: true }).click();
  await page.getByRole("button", { name: "Zoom in", exact: true }).click();
  await hierarchy(page)
    .getByRole("button", { name: "Alder Grove", exact: true })
    .click();
  await expect(
    map(page).getByRole("button", { name: "Home", exact: true }),
  ).toBeFocused();
  await expect(
    map(page).getByRole("button", { name: "Home", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  expect(await relativeStation(page, "Home")).toEqual(before);
  await expect(
    map(page).getByRole("button", { name: "Home", exact: true }),
  ).toBeInViewport();
  await expect(page.getByLabel("Map zoom")).toHaveText("125%");
  await page
    .getByRole("button", { name: "Explore interior", exact: true })
    .click();
  await expect(page.getByLabel("Map zoom")).toHaveText("150%");
  await expect(
    map(page).getByRole("button", { name: "Bedroom", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await hierarchy(page)
    .getByRole("button", { name: "North district", exact: true })
    .click();
  await expect(map(page).getByRole("button")).toHaveCount(8);
  await expect(
    map(page).getByRole("button", { name: "Home", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test("nested interiors use the real hierarchy and preserve the character location", async ({
  page,
}) => {
  await enterHome(page, "nested");
  await map(page).getByRole("button", { name: "Bedroom", exact: true }).click();
  await page
    .getByRole("button", { name: "Explore interior", exact: true })
    .click();
  await expect(hierarchy(page)).toHaveText(
    "Alder Grove›North district›Home›Bedroom",
  );
  await expect(map(page).getByRole("button")).toHaveCount(1);
  await map(page)
    .getByRole("button", { name: "Reading corner", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Reading corner", exact: true }),
  ).toBeVisible();
  await hierarchy(page)
    .getByRole("button", { name: "Home", exact: true })
    .click();
  await expect(
    map(page).getByRole("button", { name: "Bedroom", exact: true }),
  ).toBeFocused();
  await expect(page.getByTestId("confirmed-location")).toHaveText("Café");
});
for (const scenario of ["restricted", "undefined-interior"] as const)
  test(`${scenario} never exposes rooms or an exploration action`, async ({
    page,
  }) => {
    await page.goto(`/?scenario=${scenario}`);
    await map(page).getByRole("button", { name: "Home", exact: true }).click();
    await expect(
      page.getByRole("button", { name: "Explore interior", exact: true }),
    ).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: "Bedroom", exact: true }),
    ).toHaveCount(0);
  });
for (const scenario of ["empty-interior", "missing-layout"] as const)
  test(`${scenario} has an honest fallback and usable hierarchy/list`, async ({
    page,
  }) => {
    await enterHome(page, scenario);
    await expect(
      page.getByRole("heading", {
        name:
          scenario === "empty-interior"
            ? "This interior is empty"
            : "Map unavailable",
        exact: true,
      }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Place list", exact: true }).click();
    if (scenario === "missing-layout") {
      await page.getByRole("button", { name: "Bedroom", exact: true }).click();
      await expect(
        page.getByRole("heading", { name: "Bedroom", exact: true }),
      ).toBeVisible();
    } else
      await expect(
        page.getByText("No defined places at this level."),
      ).toBeVisible();
    await hierarchy(page)
      .getByRole("button", { name: "Alder Grove", exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: "Home", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
  });
test("Home-level confirmed location stays Home with room unknown", async ({
  page,
}) => {
  await enterHome(page, "at-home");
  await expect(page.getByTestId("confirmed-location")).toHaveText(
    "HomeRoom not recorded",
  );
  await expect(page.locator(".map-presence")).toHaveCount(0);
  await map(page).getByRole("button", { name: "Bedroom", exact: true }).click();
  await expect(page.getByTestId("confirmed-location")).toHaveText(
    "HomeRoom not recorded",
  );
});
test("camera limits, fit, keyboard and background drag preserve selection and browser controls", async ({
  page,
}) => {
  await page.goto("/");
  const home = map(page).getByRole("button", { name: "Home", exact: true });
  await home.click();
  for (let i = 0; i < 9; i++)
    if (
      await page
        .getByRole("button", { name: "Zoom in", exact: true })
        .isEnabled()
    )
      await page.getByRole("button", { name: "Zoom in", exact: true }).click();
  await expect(page.getByLabel("Map zoom")).toHaveText("300%");
  await expect(
    page.getByRole("button", { name: "Zoom in", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Fit map", exact: true }).click();
  const before = await home.boundingBox();
  await page.getByRole("button", { name: "Pan left", exact: true }).focus();
  await page.keyboard.press("ArrowLeft");
  expect((await home.boundingBox())!.x).toBeCloseTo(before!.x + 40, 1);
  const beforeCtrl = await home.boundingBox();
  await page.keyboard.press("Control+ArrowLeft");
  expect(await home.boundingBox()).toEqual(beforeCtrl);
  await page.getByRole("button", { name: "Fit map", exact: true }).click();
  const canvas = await page.locator(".district-network").boundingBox();
  const x = canvas!.x + canvas!.width / 2,
    y = canvas!.y + 20;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 3, y);
  await page.mouse.up();
  expect(await home.boundingBox()).toEqual(before);
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 55, y + 20, { steps: 4 });
  await page.mouse.up();
  expect((await home.boundingBox())!.x).toBeCloseTo(before!.x + 55, 1);
  await expect(home).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Fit map", exact: true }).click();
  expect(await home.boundingBox()).toEqual(before);
  for (let i = 0; i < 2; i++)
    await page.getByRole("button", { name: "Zoom out", exact: true }).click();
  await expect(page.getByLabel("Map zoom")).toHaveText("50%");
  await expect(
    page.getByRole("button", { name: "Zoom out", exact: true }),
  ).toBeDisabled();
});
test("narrow long names start as a list with selected details directly reachable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 640, height: 450 });
  await page.goto("/?scenario=long-content");
  await expect(
    page.getByRole("button", { name: "Place list", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  const full = "Flower shop — extended example name for layout evaluation";
  await page.getByRole("button", { name: full, exact: true }).click();
  await page
    .getByRole("link", { name: "View selected place details", exact: true })
    .last()
    .click();
  await expect(page.locator("#place-details")).toBeInViewport();
  await expect(
    page.getByRole("heading", { name: full, exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Map", exact: true }).click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(
    page.getByRole("button", { name: "Map", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
});

for (const size of [
  { width: 1024, height: 640 },
  { width: 640, height: 450 },
]) {
  test(`entering a level reveals its focused heading at ${size.width}`, async ({
    page,
  }) => {
    await page.setViewportSize(size);
    await page.goto("/");
    // Narrow containers intentionally start with the complete place list.
    const presentation = page.getByRole("button", {
      name: "Place list",
      exact: true,
    });
    await presentation.click();
    await page.getByRole("button", { name: "Home", exact: true }).click();
    await page
      .getByRole("link", { name: "View selected place details", exact: true })
      .last()
      .click();
    await page
      .getByRole("button", { name: "Explore interior", exact: true })
      .click();
    await expect(page.locator("#world-heading")).toHaveText("Home");
    await expect(page.locator("#world-heading")).toBeFocused();
    await expect(page.locator("#world-heading")).toBeInViewport({ ratio: 1 });
    await expect(
      page.getByRole("button", { name: "Bedroom", exact: true }),
    ).toBeVisible();
    await hierarchy(page)
      .getByRole("button", { name: "Alder Grove", exact: true })
      .click();
    await expect(
      page.getByRole("button", { name: "Home", exact: true }),
    ).toBeFocused();
    await expect(
      page.getByRole("button", { name: "Home", exact: true }),
    ).toBeInViewport({ ratio: 1 });
  });
}
