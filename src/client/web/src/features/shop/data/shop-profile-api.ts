import type { ShopProfileResponse } from "../types";

const shopRequestTimeoutMs = 8_000;

export async function fetchShopProfileWithFallback(): Promise<ShopProfileResponse | null> {
  const menuApiBaseUrl = process.env.FIREFLY_MENU_API_BASE_URL?.trim();

  if (!menuApiBaseUrl) {
    return null;
  }

  try {
    return await fetchShopProfile(menuApiBaseUrl);
  } catch {
    return null;
  }
}

async function fetchShopProfile(menuApiBaseUrl: string): Promise<ShopProfileResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), shopRequestTimeoutMs);

  try {
    const response = await fetch(buildShopProfileUrl(menuApiBaseUrl), {
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(
        `Shop API request failed with ${response.status} ${response.statusText}`,
      );
    }

    return response.json() as Promise<ShopProfileResponse>;
  } finally {
    clearTimeout(timeout);
  }
}

function buildShopProfileUrl(menuApiBaseUrl: string) {
  return new URL("/api/menu/shop", ensureTrailingSlash(menuApiBaseUrl)).toString();
}

function ensureTrailingSlash(value: string) {
  return value.endsWith("/") ? value : `${value}/`;
}
