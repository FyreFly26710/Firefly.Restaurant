import { menuFixture } from "./menu-fixture";
import type { MenuPageData } from "../types";

export async function getMenuPageData(): Promise<MenuPageData> {
  return {
    categories: menuFixture,
    updatedLabel: "Refreshed hourly",
  };
}
