import { expect, test } from "@playwright/test";

test("guest can open the storefront root", async ({ page }) => {
  const apiRequests: string[] = [];

  page.on("request", (request) => {
    if (request.url().includes("/api/")) {
      apiRequests.push(request.url());
    }
  });

  await page.goto("/");

  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Firefly Restaurant" })).toBeVisible();
  await expect(page.getByRole("link", { name: "View the menu" })).toBeVisible();
  await expect(page.getByText("Salt and Pepper Chicken Wings")).toBeVisible();
  expect(apiRequests).toEqual([]);
});

test("guest can open the menu page", async ({ page }) => {
  await page.goto("/menu");

  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("heading", { name: "The menu." })).toBeVisible();
  await expect(page.getByRole("button", { name: "Appetisers, 8 dishes" })).toBeVisible();
  await expect(page.getByText("Salt and Pepper Chicken Wings")).toBeVisible();
});

test("guest can search the static menu without a browser API dependency", async ({ page }) => {
  const apiRequests: string[] = [];

  page.on("request", (request) => {
    if (request.url().includes("/api/")) {
      apiRequests.push(request.url());
    }
  });

  await page.goto("/menu");
  await page.getByLabel("Search menu").fill("mapo");

  await expect(page.getByText("Vegetable Mapo Tofu")).toBeVisible();
  await expect(page.getByText("Lemon Chicken")).toHaveCount(0);
  expect(apiRequests).toEqual([]);
});

test("guest can open the contact page without a browser API dependency", async ({ page }) => {
  const apiRequests: string[] = [];

  page.on("request", (request) => {
    if (request.url().includes("/api/")) {
      apiRequests.push(request.url());
    }
  });

  await page.goto("/contact");

  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("link", { name: "Contact" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(page.getByRole("heading", { name: "Visit Firefly Restaurant." })).toBeVisible();
  await expect(page.getByRole("link", { name: "0161 555 0148" })).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Contact details" }).getByText("Central Manchester"),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Where to find us" })).toBeVisible();
  expect(apiRequests).toEqual([]);
});
