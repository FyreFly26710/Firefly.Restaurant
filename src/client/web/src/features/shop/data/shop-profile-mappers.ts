import type {
  ShopContact,
  ShopContactDetailsResponse,
  ShopHoursRow,
  ShopOpeningHourResponse,
  ShopProfileResponse,
} from "../types";
import { mockShopContact } from "./mock-shop-contact";

const dayOrder = new Map([
  ["monday", 0],
  ["tuesday", 1],
  ["wednesday", 2],
  ["thursday", 3],
  ["friday", 4],
  ["saturday", 5],
  ["sunday", 6],
]);

const shortDayNames = new Map([
  ["monday", "Mon"],
  ["tuesday", "Tue"],
  ["wednesday", "Wed"],
  ["thursday", "Thu"],
  ["friday", "Fri"],
  ["saturday", "Sat"],
  ["sunday", "Sun"],
]);

export function mapShopProfileContact(profile: ShopProfileResponse): ShopContact {
  return {
    addressLines: mapAddressLines(profile.contactDetails),
    phoneLabel: profile.contactDetails.phoneNumber,
    phoneHref: mapPhoneHref(profile.contactDetails.phoneNumber),
    email: mockShopContact.email,
    hours: mapOpeningHours(profile.openingHours),
  };
}

export function getOpenDaysSummary(hours: ShopHoursRow[]) {
  const openDays = hours
    .filter((row) => row.hours !== "Closed")
    .map((row) => row.day);

  if (openDays.length === 0) {
    return "Closed";
  }

  if (openDays.length === 1) {
    return `${openDays[0]} service`;
  }

  return `${openDays[0]}-${openDays[openDays.length - 1]} service`;
}

function mapAddressLines(contactDetails: ShopContactDetailsResponse) {
  return [
    contactDetails.addressLine1,
    contactDetails.addressLine2,
    contactDetails.city,
    contactDetails.region,
    contactDetails.postalCode,
    contactDetails.country,
  ]
    .map((line) => line?.trim())
    .filter((line): line is string => Boolean(line));
}

function mapPhoneHref(phoneNumber: string) {
  const normalizedPhoneNumber = phoneNumber.replace(/[^\d+]/g, "");

  return normalizedPhoneNumber ? `tel:${normalizedPhoneNumber}` : mockShopContact.phoneHref;
}

function mapOpeningHours(openingHours: ShopOpeningHourResponse[]) {
  return [...openingHours]
    .sort((left, right) => getDayOrder(left.dayOfWeek) - getDayOrder(right.dayOfWeek))
    .map((openingHour) => ({
      day: mapDayName(openingHour.dayOfWeek),
      hours: mapHours(openingHour),
    }));
}

function getDayOrder(dayOfWeek: string) {
  return dayOrder.get(dayOfWeek.toLowerCase()) ?? Number.MAX_SAFE_INTEGER;
}

function mapDayName(dayOfWeek: string) {
  return shortDayNames.get(dayOfWeek.toLowerCase()) ?? dayOfWeek.slice(0, 3);
}

function mapHours(openingHour: ShopOpeningHourResponse) {
  if (openingHour.isClosed) {
    return openingHour.note ?? "Closed";
  }

  if (!openingHour.opensAt || !openingHour.closesAt) {
    return openingHour.note ?? "Hours TBC";
  }

  const timeRange = `${mapTime(openingHour.opensAt)} - ${mapTime(openingHour.closesAt)}`;

  return openingHour.note ? `${timeRange} (${openingHour.note})` : timeRange;
}

function mapTime(value: string) {
  const [hours = "00", minutes = "00"] = value.split(":");

  return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
}
