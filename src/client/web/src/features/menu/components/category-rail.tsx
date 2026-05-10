import type { MenuCategoryResponse } from "../types";

type CategoryRailProps = {
  categories: MenuCategoryResponse[];
  categoryCounts: Map<string, number>;
  activeCategory: string;
  onCategorySelect: (slug: string) => void;
};

export function CategoryRail({
  categories,
  categoryCounts,
  activeCategory,
  onCategorySelect,
}: CategoryRailProps) {
  return (
    <aside className="category-rail" aria-label="Menu categories">
      <p className="category-rail-title mono-label">Categories</p>
      {categories.map((category) => {
        const count = categoryCounts.get(category.slug) ?? 0;
        const isActive = activeCategory === category.slug;

        return (
          <button
            className={`category-button ${isActive ? "active" : ""}`}
            key={category.slug}
            type="button"
            onClick={() => onCategorySelect(category.slug)}
            aria-label={`${category.displayName}, ${count} dishes`}
            aria-current={isActive ? "true" : undefined}
          >
            <span>{category.displayName}</span>
            <span className="category-button-count">{count}</span>
          </button>
        );
      })}
    </aside>
  );
}
