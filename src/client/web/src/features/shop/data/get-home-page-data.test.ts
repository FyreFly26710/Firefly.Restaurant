import { afterEach, describe, expect, it, vi } from "vitest";
import { testShopProfile } from "@/test/shop-test-data";
import { getHomePageData } from "./get-home-page-data";

describe("getHomePageData", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("returns typed mock shop data when no menu API base URL is configured", async () => {
    vi.stubEnv("FIREFLY_MENU_API_BASE_URL", "");
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

  it("fetches shop profile data from the configured API during static generation", async () => {
    vi.stubEnv("FIREFLY_MENU_API_BASE_URL", "http://localhost:5122");
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(testShopProfile), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(getHomePageData()).resolves.toMatchObject({
      hero: {
        headline: "Firefly Restaurant",
        tagline: "Fresh Chinese takeaway, cooked to order.",
        lead: testShopProfile.homeDescription,
      },
      story: {
        paragraphs: [testShopProfile.homeDescription, testShopProfile.contactIntro],
      },
      contact: {
        addressLines: ["10 Firefly Lane", "London", "SE1 1AA", "United Kingdom"],
        phoneLabel: "020 7946 0100",
        phoneHref: "tel:02079460100",
        hours: [
          { day: "Mon", hours: "Closed" },
          { day: "Tue", hours: "16:30 - 22:00" },
          { day: "Wed", hours: "16:30 - 22:00" },
          { day: "Thu", hours: "16:30 - 22:00" },
          { day: "Fri", hours: "16:30 - 22:30" },
          { day: "Sat", hours: "12:00 - 22:30" },
          { day: "Sun", hours: "12:00 - 21:30" },
        ],
      },
    });

    expect(fetchMock).toHaveBeenCalledWith("http://localhost:5122/api/menu/shop", {
      headers: {
        Accept: "application/json",
      },
      signal: expect.any(AbortSignal),
    });
  });

  it("falls back to mock shop data when the configured shop API returns an error", async () => {
    vi.stubEnv("FIREFLY_MENU_API_BASE_URL", "http://localhost:5122");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("Nope", { status: 503, statusText: "Unavailable" })),
    );

    await expect(getHomePageData()).resolves.toMatchObject({
      hero: {
        headline: "Firefly Restaurant",
        tagline: "Wok-fired comfort with a steady glow.",
      },
      contact: {
        email: "hello@firefly.restaurant",
        phoneHref: "tel:01615550148",
      },
    });
  });

  it("includes the major home page sections needed by the shop view", async () => {
    vi.stubEnv("FIREFLY_MENU_API_BASE_URL", "");

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
