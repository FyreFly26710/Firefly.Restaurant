"use client";

import { useEffect, useMemo, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CategoryRail } from "../components/category-rail";
import { EmptyMenuState } from "../components/empty-menu-state";
import { MenuCategorySection } from "../components/menu-category-section";
import { MenuHero } from "../components/menu-hero";
import { MenuSearch } from "../components/menu-search";
import { filterMenuCategories, getMenuCategoryCounts } from "../lib/filter-menu";
import styles from "./menu-page-view.module.css";
import type { MenuPageData } from "../types";

type MenuPageViewProps = {
  menu: MenuPageData;
};

export function MenuPageView({ menu }: MenuPageViewProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(menu.categories[0]?.slug ?? "");
  const categoryCounts = useMemo(() => getMenuCategoryCounts(menu.categories), [menu.categories]);
  const filteredCategories = useMemo(
    () => filterMenuCategories(menu.categories, search),
    [menu.categories, search],
  );

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const sections = menu.categories
      .map((category) => document.getElementById(categoryAnchorId(category.slug)))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveCategory(visible[0].target.id.replace("category-", ""));
        }
      },
      { rootMargin: "-110px 0px -60% 0px", threshold: [0.1, 0.3, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [menu.categories]);

  const scrollToCategory = (slug: string) => {
    setActiveCategory(slug);
    document.getElementById(categoryAnchorId(slug))?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className={styles["site-shell"]}>
      <SiteHeader currentPage="menu" />

      <main className={`${styles.container} ${styles["menu-page"]}`}>
        <MenuHero updatedLabel={menu.updatedLabel} />

        <section className={styles["menu-layout"]} aria-label="Browse menu">
          <CategoryRail
            categories={menu.categories}
            categoryCounts={categoryCounts}
            activeCategory={activeCategory}
            onCategorySelect={scrollToCategory}
          />

          <div>
            <MenuSearch value={search} onChange={setSearch} />

            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <MenuCategorySection
                  category={category}
                  key={category.slug}
                  sectionId={categoryAnchorId(category.slug)}
                />
              ))
            ) : (
              <EmptyMenuState />
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function categoryAnchorId(slug: string) {
  return `category-${slug}`;
}
