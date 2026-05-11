import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { HomeContact } from "../components/home-contact";
import { HomeFeatured } from "../components/home-featured";
import { HomeHero } from "../components/home-hero";
import { HomeHighlightStrip } from "../components/home-highlight-strip";
import { HomePillars } from "../components/home-pillars";
import { HomeStory } from "../components/home-story";
import styles from "./home-page-view.module.css";
import type { ShopHomePageData } from "../types";

type HomePageViewProps = {
  page: ShopHomePageData;
};

export function HomePageView({ page }: HomePageViewProps) {
  return (
    <div className={styles["site-shell"]}>
      <SiteHeader currentPage="home" />

      <main className={styles["home-page"]}>
        <HomeHero hero={page.hero} />
        <HomeHighlightStrip />
        <HomeStory story={page.story} />
        <HomePillars pillars={page.pillars} />
        <HomeFeatured offerings={page.featuredOfferings} />
        <HomeContact contact={page.contact} />
      </main>

      <SiteFooter />
    </div>
  );
}
