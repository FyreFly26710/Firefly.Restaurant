import type { ShopContactPageData } from "../types";
import { mockShopContact } from "./mock-shop-contact";

const mockContactPageData = {
  hero: {
    eyebrow: "Contact, hours, and directions",
    title: "Visit Firefly Restaurant.",
    lead: "Find the dining room, call ahead for collection, or check when the kitchen is open before you make the trip.",
    facts: [
      { label: "Kitchen", value: "Tue-Sun service" },
      { label: "Collection", value: "Call ahead" },
      { label: "Area", value: "Central Manchester" },
    ],
  },
  contact: mockShopContact,
  location: {
    label: "Location",
    neighborhood: "Central Manchester",
    mapLabel: "Illustrated local map for Firefly Restaurant",
    summary:
      "Firefly Restaurant sits on Lantern Lane, a short walk from central tram stops and the evening footfall around Piccadilly Gardens.",
    notes: [
      {
        label: "Collection counter",
        body: "Use the front door on Lantern Lane and follow the service counter signs when collecting an order.",
      },
      {
        label: "Nearby landmarks",
        body: "Look for the amber shopfront between the Northern Quarter edge and the Piccadilly Gardens approach.",
      },
      {
        label: "Arrival window",
        body: "Weekend dinner service is busiest after 19:00, so collection orders are easiest when placed ahead by phone.",
      },
    ],
  },
} satisfies ShopContactPageData;

export async function getContactPageData(): Promise<ShopContactPageData> {
  return mockContactPageData;
}
