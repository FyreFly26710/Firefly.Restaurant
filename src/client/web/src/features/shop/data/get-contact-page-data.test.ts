import { afterEach, describe, expect, it, vi } from "vitest";
import { getContactPageData } from "./get-contact-page-data";

describe("getContactPageData", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns typed mock contact page data without a browser or runtime API dependency", async () => {
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

  it("includes the guest contact details, weekly hours, and location notes", async () => {
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
