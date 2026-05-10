import type { MenuCategoryResponse } from "../types";

export function filterMenuCategories(
  categories: MenuCategoryResponse[],
  searchTerm: string,
): MenuCategoryResponse[] {
  const term = normalize(searchTerm);

  if (!term) {
    return categories;
  }

  return categories
    .map((category) => {
      const categoryMatches = [
        category.slug,
        category.displayName,
        category.description,
      ].some((value) => normalize(value).includes(term));

      if (categoryMatches) {
        return category;
      }

      const items = category.items.filter((item) =>
        [
          item.slug,
          item.name,
          item.description,
          ...item.tags.map((tag) => tag.value),
        ].some((value) => normalize(value).includes(term)),
      );

      return {
        ...category,
        items,
      };
    })
    .filter((category) => category.items.length > 0);
}

export function getMenuCategoryCounts(categories: MenuCategoryResponse[]) {
  return new Map(categories.map((category) => [category.slug, category.items.length]));
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}
