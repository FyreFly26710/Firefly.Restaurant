import { afterEach, describe, expect, it, vi } from "vitest";
import { testMenuCategories } from "@/test/menu-test-data";
import { getMenuPageData } from "./get-menu-page-data";
import { mockMenuCategories } from "./mock-menu-categories";

describe("getMenuPageData", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("returns mock menu categories when no menu API base URL is configured", async () => {
    vi.stubEnv("FIREFLY_MENU_API_BASE_URL", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(getMenuPageData()).resolves.toEqual({
      categories: mockMenuCategories,
      updatedLabel: "Mock menu, API unavailable",
    });

    expect(fetchMock).not.toHaveBeenCalled();
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
      signal: expect.any(AbortSignal),
    });
  });

  it("falls back to mock menu categories when the configured menu API returns an error", async () => {
    vi.stubEnv("FIREFLY_MENU_API_BASE_URL", "http://localhost:5122");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("Nope", { status: 503, statusText: "Unavailable" })),
    );

    await expect(getMenuPageData()).resolves.toEqual({
      categories: mockMenuCategories,
      updatedLabel: "Mock menu, API unavailable",
    });
  });
});
