import type { Metadata } from "next";
import { getMenuPageData } from "@/features/menu/data/get-menu-page-data";
import { MenuPageView } from "@/features/menu/views/menu-page-view";

// The menu route is intentionally static-first. True runtime ISR is not
// supported by static export, so Cloudflare Pages vs Workers/OpenNext remains
// the deployment validation point documented in Issue #3.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Menu",
  description: "Browse the current Firefly Restaurant menu.",
};

export default async function MenuPage() {
  const menu = await getMenuPageData();

  return <MenuPageView menu={menu} />;
}
