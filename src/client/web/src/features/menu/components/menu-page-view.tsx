"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { filterMenuCategories, getMenuCategoryCounts } from "../lib/filter-menu";
import type { ItemTagResponse, MenuItemResponse, MenuPageData } from "../types";

type MenuPageViewProps = {
  menu: MenuPageData;
};

const priceFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

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
    <div className="site-shell">
      <header className="site-header">
        <div className="container site-header-row">
          <a className="brand" href="/menu" aria-label="Firefly Restaurant menu">
            <span className="brand-mark" aria-hidden="true">
              F
            </span>
            <span>Firefly Restaurant</span>
          </a>
          <nav aria-label="Primary navigation">
            <a className="nav-link" href="/menu" aria-current="page">
              Menu
            </a>
          </nav>
        </div>
      </header>

      <main className="container menu-page">
        <section className="menu-hero" aria-labelledby="menu-title">
          <div>
            <p className="mono-label text-ember-deep">Current menu</p>
            <h1 id="menu-title" className="display">
              The menu.
            </h1>
            <p className="menu-hero-copy">
              Crisp appetisers, fragrant soups, wok-fired favourites, rice,
              noodles, and warm sides for the table. The board is built for an
              easy evening: quick to scan, generous in choice, and clear on the
              details.
            </p>
          </div>
          <aside className="menu-note" aria-label="Menu details">
            <p className="mono-label text-plum">{menu.updatedLabel}</p>
            <p>
              Seasonal availability may shift through service. Ask the team
              about heat, allergens, and the dishes they are most excited to
              send out tonight.
            </p>
          </aside>
        </section>

        <section className="menu-layout" aria-label="Browse menu">
          <aside className="category-rail" aria-label="Menu categories">
            <p className="category-rail-title mono-label">Categories</p>
            {menu.categories.map((category) => (
              <button
                className={`category-button ${activeCategory === category.slug ? "active" : ""}`}
                key={category.slug}
                type="button"
                onClick={() => scrollToCategory(category.slug)}
                aria-label={`${category.displayName}, ${categoryCounts.get(category.slug)} dishes`}
                aria-current={activeCategory === category.slug ? "true" : undefined}
              >
                <span>{category.displayName}</span>
                <span className="category-button-count">{categoryCounts.get(category.slug)}</span>
              </button>
            ))}
          </aside>

          <div>
            <div className="menu-search-row">
              <label className="sr-only" htmlFor="menu-search">
                Search menu
              </label>
              <div className="search-field">
                <span className="search-field-mark" aria-hidden="true">
                  *
                </span>
                <input
                  id="menu-search"
                  name="menu-search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search dishes, ingredients, or tags"
                />
              </div>
            </div>

            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <section
                  className="category-section"
                  id={categoryAnchorId(category.slug)}
                  key={category.slug}
                  aria-labelledby={`${categoryAnchorId(category.slug)}-title`}
                >
                  <div className="category-heading">
                    <h2 className="display" id={`${categoryAnchorId(category.slug)}-title`}>
                      {category.displayName}
                    </h2>
                    <p>{category.description}</p>
                  </div>
                  <div>
                    {category.items.map((item) => (
                      <DishRow item={item} key={item.slug} />
                    ))}
                  </div>
                </section>
              ))
            ) : (
              <div className="empty-state" role="status">
                <h2>No matching dishes.</h2>
                <p>Try another ingredient, dish name, or menu tag.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container site-footer-row">
          <div>
            <p className="mono-label text-ember-soft">Firefly Restaurant</p>
            <p>Warm plates, careful timing, and a menu made for browsing.</p>
          </div>
          <p className="mono-label">Open kitchen</p>
        </div>
      </footer>
    </div>
  );
}

function DishRow({ item }: { item: MenuItemResponse }) {
  return (
    <article className="dish-row">
      <div className="dish-main">
        <div className="dish-title-line">
          <h3 className="dish-name">{item.name}</h3>
          {item.tags.map((tag) => (
            <DishTag key={`${item.slug}-${tag.value}`} tag={tag} />
          ))}
        </div>
        <p className="dish-description">{item.description}</p>
      </div>
      <p className="dish-price">{priceFormatter.format(item.price)}</p>
    </article>
  );
}

function DishTag({ tag }: { tag: ItemTagResponse }) {
  return (
    <span className="dish-tag" style={{ "--tag-color": tag.color } as CSSProperties}>
      {tag.value}
    </span>
  );
}

function categoryAnchorId(slug: string) {
  return `category-${slug}`;
}
