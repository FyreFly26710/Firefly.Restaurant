import { afterEach, describe, expect, it, vi } from "vitest";
import { getHomePageData } from "./get-home-page-data";

describe("getHomePageData", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns typed mock shop data without a browser or runtime API dependency", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(getHomePageData()).resolves.toMatchObject({
      hero: {
        headline: "Firefly Restaurant",
        primaryAction: { href: "/menu" },
      },
      contact: {
        email: "hello@firefly.restaurant",
      },
    });

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("includes the major home page sections needed by the shop view", async () => {
    const page = await getHomePageData();

    expect(page.story.paragraphs.length).toBeGreaterThan(1);
    expect(page.pillars).toHaveLength(3);
    expect(page.featuredOfferings.map((offering) => offering.name)).toEqual([
      "Salt and Pepper Chicken Wings",
      "Vegetable Mapo Tofu",
      "Special Fried Rice",
    ]);
    expect(page.contact.hours).toHaveLength(7);
  });
});
