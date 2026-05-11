import type { ShopContactPageData, ShopHomePageData } from "@/features/shop/types";

const testShopContact = {
  addressLines: ["1 Test Lantern Lane", "Fixture Quarter", "T1 2ST"],
  phoneLabel: "07000 000000",
  phoneHref: "tel:07000000000",
  email: "fixtures@firefly.restaurant",
  hours: [
    { day: "Mon", hours: "Closed" },
    { day: "Tue", hours: "17:00 - 22:00" },
  ],
};

export const testHomePageData = {
  hero: {
    eyebrow: "Fixture service",
    headline: "Fixture Firefly",
    tagline: "Fixture home tagline.",
    lead: "Fixture home lead for the public storefront.",
    primaryAction: { label: "View fixture menu", href: "/menu" },
    secondaryAction: { label: "Fixture hours", href: "/contact" },
    facts: [{ label: "Fixture fact", value: "Stable value" }],
  },
  story: {
    eyebrow: "Fixture story",
    title: "Fixture kitchen story.",
    paragraphs: ["Fixture story paragraph one.", "Fixture story paragraph two."],
    signature: "Fixture team",
    signatureLabel: "Fixture restaurant",
  },
  pillars: [
    {
      kicker: "01 / Fixture",
      title: "Fixture pillar",
      body: "Fixture pillar body.",
    },
  ],
  featuredOfferings: [
    {
      name: "Fixture noodles",
      description: "Fixture dish description.",
      price: 9.5,
      accentColor: "#7c3f2c",
    },
  ],
  contact: testShopContact,
} satisfies ShopHomePageData;

export const testContactPageData = {
  hero: {
    eyebrow: "Fixture contact",
    title: "Visit Fixture Firefly.",
    lead: "Fixture contact lead.",
    facts: [{ label: "Fixture area", value: "Fixture Quarter" }],
  },
  contact: testShopContact,
  location: {
    label: "Fixture location",
    neighborhood: "Fixture Quarter",
    mapLabel: "Fixture map for Firefly Restaurant",
    summary: "Fixture location summary.",
    notes: [
      {
        label: "Fixture collection",
        body: "Fixture collection note.",
      },
    ],
  },
} satisfies ShopContactPageData;
