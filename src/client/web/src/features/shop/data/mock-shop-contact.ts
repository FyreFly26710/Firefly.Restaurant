import type { ShopContact } from "../types";

export const mockShopContact = {
  addressLines: ["32 Lantern Lane", "Central Manchester", "M1 4FF"],
  phoneLabel: "0161 555 0148",
  phoneHref: "tel:01615550148",
  email: "hello@firefly.restaurant",
  hours: [
    { day: "Mon", hours: "Closed" },
    { day: "Tue", hours: "17:00 - 22:00" },
    { day: "Wed", hours: "17:00 - 22:00" },
    { day: "Thu", hours: "17:00 - 22:00" },
    { day: "Fri", hours: "17:00 - 23:00" },
    { day: "Sat", hours: "12:00 - 23:00" },
    { day: "Sun", hours: "12:00 - 21:30" },
  ],
} satisfies ShopContact;
