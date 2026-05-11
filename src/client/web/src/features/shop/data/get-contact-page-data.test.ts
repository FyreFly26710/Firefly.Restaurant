import { afterEach, describe, expect, it, vi } from "vitest";
import { testShopProfile } from "@/test/shop-test-data";
import { getContactPageData } from "./get-contact-page-data";

describe("getContactPageData", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("returns typed mock contact page data when no menu API base URL is configured", async () => {
    vi.stubEnv("FIREFLY_MENU_API_BASE_URL", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(getContactPageData()).resolves.toMatchObject({
      hero: {
        title: "Visit Firefly Restaurant.",
      },
      contact: {
        email: "hello@firefly.restaurant",
        phoneHref: "tel:01615550148",
      },
      location: {
        neighborhood: "Central Manchester",
      },
    });

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("fetches shop profile contact data from the configured API during static generation", async () => {
    vi.stubEnv("FIREFLY_MENU_API_BASE_URL", "http://localhost:5122");
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(testShopProfile), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(getContactPageData()).resolves.toMatchObject({
      hero: {
        title: "Visit Firefly Restaurant.",
        lead: testShopProfile.contactIntro,
        facts: [
          { label: "Kitchen", value: "Tue-Sun service" },
          { label: "Collection", value: "Call ahead" },
          { label: "Area", value: "London" },
        ],
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
      location: {
        neighborhood: "London",
        mapLabel: "Map for Firefly Restaurant",
      },
    });

    expect(fetchMock).toHaveBeenCalledWith("http://localhost:5122/api/menu/shop", {
      headers: {
        Accept: "application/json",
      },
      signal: expect.any(AbortSignal),
    });
  });

  it("falls back to mock contact page data when the configured shop API returns an error", async () => {
    vi.stubEnv("FIREFLY_MENU_API_BASE_URL", "http://localhost:5122");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("Nope", { status: 503, statusText: "Unavailable" })),
    );

    await expect(getContactPageData()).resolves.toMatchObject({
      hero: {
        title: "Visit Firefly Restaurant.",
      },
      contact: {
        email: "hello@firefly.restaurant",
        phoneHref: "tel:01615550148",
      },
      location: {
        neighborhood: "Central Manchester",
      },
    });
  });

  it("includes the guest contact details, weekly hours, and location notes", async () => {
    vi.stubEnv("FIREFLY_MENU_API_BASE_URL", "");

    const page = await getContactPageData();

    expect(page.contact.addressLines).toEqual([
      "32 Lantern Lane",
      "Central Manchester",
      "M1 4FF",
    ]);
    expect(page.contact.hours).toHaveLength(7);
    expect(page.hero.facts.map((fact) => fact.label)).toEqual(["Kitchen", "Collection", "Area"]);
    expect(page.location.notes.map((note) => note.label)).toEqual([
      "Collection counter",
      "Nearby landmarks",
      "Arrival window",
    ]);
  });
});
