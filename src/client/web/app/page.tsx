import type { Metadata } from "next";
import { getMenuPageData } from "@/features/menu/data/get-menu-page-data";
import { MenuPageView } from "@/features/menu/views/menu-page-view";

export const metadata: Metadata = {
  description: "Browse the current Firefly Restaurant menu.",
};

export default async function HomePage() {
  const menu = await getMenuPageData();

  return <MenuPageView menu={menu} />;
}
