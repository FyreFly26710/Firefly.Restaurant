import type { MenuCategoryResponse, MenuPageData } from "../types";

export async function getMenuPageData(): Promise<MenuPageData> {
  const menuApiBaseUrl = process.env.FIREFLY_MENU_API_BASE_URL?.trim();

  if (!menuApiBaseUrl) {
    throw new Error("FIREFLY_MENU_API_BASE_URL is required to load menu data.");
  }

  return {
    categories: await fetchMenuCategories(menuApiBaseUrl),
    updatedLabel: "Live menu, refreshed by deployment",
  };
}

async function fetchMenuCategories(menuApiBaseUrl: string): Promise<MenuCategoryResponse[]> {
  const response = await fetch(buildMenuCategoriesUrl(menuApiBaseUrl), {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Menu API request failed with ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<MenuCategoryResponse[]>;
}

function buildMenuCategoriesUrl(menuApiBaseUrl: string) {
  return new URL("/api/menu/categories", ensureTrailingSlash(menuApiBaseUrl)).toString();
}

function ensureTrailingSlash(value: string) {
  return value.endsWith("/") ? value : `${value}/`;
}
