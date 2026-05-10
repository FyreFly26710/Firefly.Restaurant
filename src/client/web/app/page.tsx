import type { Metadata } from "next";
import { getHomePageData } from "@/features/shop/data/get-home-page-data";
import { HomePageView } from "@/features/shop/views/home-page-view";

export const metadata: Metadata = {
  description: "Visit Firefly Restaurant for wok-fired favourites, hours, location, and the current menu.",
};

export default async function HomePage() {
  const page = await getHomePageData();

  return <HomePageView page={page} />;
}
