import type { ShopHomePageData } from "../types";
import { mockShopContact } from "./mock-shop-contact";

const mockHomePageData = {
  hero: {
    eyebrow: "Dinner, collection, and the current menu",
    headline: "Firefly Restaurant",
    tagline: "Wok-fired comfort with a steady glow.",
    lead: "A neighbourhood kitchen for crisp appetisers, fragrant sauces, generous rice boxes, and easy evenings around the table.",
    primaryAction: { label: "View the menu", href: "/menu" },
    secondaryAction: { label: "Hours and location", href: "/contact" },
    facts: [
      { label: "Kitchen rhythm", value: "Cooked to order" },
      { label: "Collection lead", value: "About 25 min" },
      { label: "Menu focus", value: "Chinese favourites" },
      { label: "Service", value: "Lunch and dinner" },
    ],
  },
  story: {
    eyebrow: "Our kitchen",
    title: "Built for bright heat and relaxed tables.",
    paragraphs: [
      "Firefly Restaurant keeps the public storefront simple: guests can find the room, scan the menu, and decide what sounds good without waiting on a live origin API.",
      "The food direction is direct and generous. Expect crisp starters, wok-tossed mains, fragrant rice, noodles, and vegetable dishes that hold up well for a quick table meal or collection order.",
    ],
    signature: "The Firefly team",
    signatureLabel: "Restaurant and kitchen",
  },
  pillars: [
    {
      kicker: "01 / Wok",
      title: "High heat, short waits",
      body: "The menu is shaped around fast service, clear choices, and dishes that arrive with texture intact.",
    },
    {
      kicker: "02 / Table",
      title: "Built for sharing",
      body: "Small plates, mains, rice, and sides are presented so guests can build an easy meal without decoding the board.",
    },
    {
      kicker: "03 / Static",
      title: "Fast storefront browsing",
      body: "Home content is served from a typed shop read model now, ready to swap from mock data to API-backed reads later.",
    },
  ],
  featuredOfferings: [
    {
      name: "Salt and Pepper Chicken Wings",
      description: "Crisp wings tossed with chilli, garlic, spring onion, and toasted salt.",
      price: 6.8,
      accentColor: "#d97757",
    },
    {
      name: "Vegetable Mapo Tofu",
      description: "Soft tofu and vegetables in a warm Szechuan bean sauce with a clean finish.",
      price: 7.4,
      accentColor: "#5a6b3a",
    },
    {
      name: "Special Fried Rice",
      description: "Wok-fried rice with chicken, roast pork, prawns, egg, peas, and spring onion.",
      price: 7.8,
      accentColor: "#6b3a52",
    },
  ],
  contact: mockShopContact,
} satisfies ShopHomePageData;

export async function getHomePageData(): Promise<ShopHomePageData> {
  return mockHomePageData;
}
