import { expect, type Page, test } from "@playwright/test";

test("guest can open the storefront root with fallback content", async ({ page }) => {
  const apiRequests = collectBrowserApiRequests(page);

  await page.goto("/");

  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Firefly Restaurant" })).toBeVisible();
  await expect(page.getByRole("link", { name: "View the menu" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "House favourites." })).toBeVisible();
  expect(apiRequests).toEqual([]);
});

test("guest can open the menu page with deterministic fallback data", async ({ page }) => {
  const apiRequests = collectBrowserApiRequests(page);

  await page.goto("/menu");

  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("heading", { name: "The menu." })).toBeVisible();
  await expect(
    page.getByLabel("Menu details").getByText("Mock menu, API unavailable"),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Appetisers, 8 dishes" })).toBeVisible();
  expect(apiRequests).toEqual([]);
});

test("guest can search the static menu without a browser API dependency", async ({ page }) => {
  const apiRequests = collectBrowserApiRequests(page);

  await page.goto("/menu");
  await page.getByLabel("Search menu").fill("mapo");

  await expect(page.getByText("Vegetable Mapo Tofu")).toBeVisible();
  await expect(page.getByText("Lemon Chicken")).toHaveCount(0);
  expect(apiRequests).toEqual([]);
});

test("guest can open the contact page without a browser API dependency", async ({ page }) => {
  const apiRequests = collectBrowserApiRequests(page);

  await page.goto("/contact");

  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("link", { name: "Contact" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(page.getByRole("heading", { name: "Visit Firefly Restaurant." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Call the restaurant" })).toHaveAttribute(
    "href",
    "tel:01615550148",
  );
  await expect(page.getByRole("heading", { name: "Where to find us" })).toBeVisible();
  expect(apiRequests).toEqual([]);
});

function collectBrowserApiRequests(page: Page) {
  const apiRequests: string[] = [];

  page.on("request", (request) => {
    if (new URL(request.url()).pathname.startsWith("/api/")) {
      apiRequests.push(request.url());
    }
  });

  return apiRequests;
}
