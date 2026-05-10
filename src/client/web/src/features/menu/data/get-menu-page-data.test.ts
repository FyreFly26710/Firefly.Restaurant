import { afterEach, describe, expect, it, vi } from "vitest";
import { menuFixture } from "./menu-fixture";
import { getMenuPageData } from "./get-menu-page-data";

describe("getMenuPageData", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("uses the typed fixture when no menu API base URL is configured", async () => {
    vi.stubEnv("FIREFLY_MENU_API_BASE_URL", "");

    await expect(getMenuPageData()).resolves.toEqual({
      categories: menuFixture,
      updatedLabel: "Local fixture, refreshed hourly",
    });
  });

  it("fetches menu categories from the configured API using ISR cache options", async () => {
    vi.stubEnv("FIREFLY_MENU_API_BASE_URL", "http://localhost:5122");
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(menuFixture), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(getMenuPageData()).resolves.toEqual({
      categories: menuFixture,
      updatedLabel: "Live menu, refreshed hourly",
    });

    expect(fetchMock).toHaveBeenCalledWith("http://localhost:5122/api/menu/categories", {
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 3600,
        tags: ["menu"],
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
