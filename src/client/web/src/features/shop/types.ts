export type ShopAction = {
  label: string;
  href: string;
};

export type ShopFact = {
  label: string;
  value: string;
};

export type ShopHero = {
  eyebrow: string;
  headline: string;
  tagline: string;
  lead: string;
  primaryAction: ShopAction;
  secondaryAction: ShopAction;
  facts: ShopFact[];
};

export type ShopStory = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  signature: string;
  signatureLabel: string;
};

export type ShopPillar = {
  kicker: string;
  title: string;
  body: string;
};

export type ShopOffering = {
  name: string;
  description: string;
  price: number;
  accentColor: string;
};

export type ShopHoursRow = {
  day: string;
  hours: string;
};

export type ShopContact = {
  addressLines: string[];
  phoneLabel: string;
  phoneHref: string;
  email: string;
  hours: ShopHoursRow[];
};

export type ShopHomePageData = {
  hero: ShopHero;
  story: ShopStory;
  pillars: ShopPillar[];
  featuredOfferings: ShopOffering[];
  contact: ShopContact;
};
