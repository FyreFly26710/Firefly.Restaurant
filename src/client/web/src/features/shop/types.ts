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

export type ShopContactPageHero = {
  eyebrow: string;
  title: string;
  lead: string;
  facts: ShopFact[];
};

export type ShopContactLocationNote = {
  label: string;
  body: string;
};

export type ShopContactLocation = {
  label: string;
  neighborhood: string;
  mapLabel: string;
  summary: string;
  notes: ShopContactLocationNote[];
};

export type ShopContactPageData = {
  hero: ShopContactPageHero;
  contact: ShopContact;
  location: ShopContactLocation;
};

export type ShopProfileResponse = {
  id: number;
  slug: string;
  displayName: string;
  homeHeadline: string;
  homeDescription: string;
  contactIntro: string;
  logoImageUrl: string;
  heroImageUrl: string;
  contactDetails: ShopContactDetailsResponse;
  openingHours: ShopOpeningHourResponse[];
};

export type ShopContactDetailsResponse = {
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  region: string | null;
  postalCode: string;
  country: string;
  mapUrl: string | null;
};

export type ShopOpeningHourResponse = {
  id: number;
  dayOfWeek: string;
  opensAt: string | null;
  closesAt: string | null;
  isClosed: boolean;
  note: string | null;
};
