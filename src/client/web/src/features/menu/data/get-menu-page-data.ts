import type { MenuCategoryResponse, MenuPageData } from "../types";
import { mockMenuCategories } from "./mock-menu-categories";

const menuRequestTimeoutMs = 8_000;
const mockMenuUpdatedLabel = "Mock menu, API unavailable";

export async function getMenuPageData(): Promise<MenuPageData> {
  const menuApiBaseUrl = process.env.FIREFLY_MENU_API_BASE_URL?.trim();

  if (!menuApiBaseUrl) {
    return {
      categories: mockMenuCategories,
      updatedLabel: mockMenuUpdatedLabel,
    };
  }

  const categories = await fetchMenuCategoriesWithFallback(menuApiBaseUrl);

  return {
    categories,
    updatedLabel:
      categories === mockMenuCategories
        ? mockMenuUpdatedLabel
        : "Live menu, refreshed by deployment",
  };
}

async function fetchMenuCategoriesWithFallback(
  menuApiBaseUrl: string,
): Promise<MenuCategoryResponse[]> {
  try {
    return await fetchMenuCategories(menuApiBaseUrl);
  } catch {
    return mockMenuCategories;
  }
}

async function fetchMenuCategories(menuApiBaseUrl: string): Promise<MenuCategoryResponse[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), menuRequestTimeoutMs);

  try {
    const response = await fetch(buildMenuCategoriesUrl(menuApiBaseUrl), {
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(
        `Menu API request failed with ${response.status} ${response.statusText}`,
      );
    }

    return response.json() as Promise<MenuCategoryResponse[]>;
  } finally {
    clearTimeout(timeout);
  }
}

function buildMenuCategoriesUrl(menuApiBaseUrl: string) {
  return new URL("/api/menu/categories", ensureTrailingSlash(menuApiBaseUrl)).toString();
}

function ensureTrailingSlash(value: string) {
  return value.endsWith("/") ? value : `${value}/`;
}
