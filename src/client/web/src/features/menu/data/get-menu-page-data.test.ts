import { afterEach, describe, expect, it, vi } from "vitest";
import { testMenuCategories } from "@/test/menu-test-data";
import { getMenuPageData } from "./get-menu-page-data";

describe("getMenuPageData", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("fails loudly when no menu API base URL is configured", async () => {
    vi.stubEnv("FIREFLY_MENU_API_BASE_URL", "");

    await expect(getMenuPageData()).rejects.toThrow(
      "FIREFLY_MENU_API_BASE_URL is required to load menu data.",
    );
  });

  it("fetches menu categories from the configured API during static generation", async () => {
    vi.stubEnv("FIREFLY_MENU_API_BASE_URL", "http://localhost:5122");
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(testMenuCategories), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(getMenuPageData()).resolves.toEqual({
      categories: testMenuCategories,
      updatedLabel: "Live menu, refreshed by deployment",
    });

    expect(fetchMock).toHaveBeenCalledWith("http://localhost:5122/api/menu/categories", {
      headers: {
        Accept: "application/json",
      },
    });
  });

  it("fails loudly when the configured menu API returns an error", async () => {
    vi.stubEnv("FIREFLY_MENU_API_BASE_URL", "http://localhost:5122");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("Nope", { status: 503, statusText: "Unavailable" })),
    );

    await expect(getMenuPageData()).rejects.toThrow(
      "Menu API request failed with 503 Unavailable",
    );
  });
});
