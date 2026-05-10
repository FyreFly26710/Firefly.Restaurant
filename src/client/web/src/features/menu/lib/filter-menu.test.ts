import { describe, expect, it } from "vitest";
import { menuFixture } from "../data/menu-fixture";
import { filterMenuCategories, getMenuCategoryCounts } from "./filter-menu";

describe("filterMenuCategories", () => {
  it("returns every category when the search term is empty", () => {
    expect(filterMenuCategories(menuFixture, "")).toHaveLength(menuFixture.length);
  });

  it("filters categories to matching dishes and tags", () => {
    const filtered = filterMenuCategories(menuFixture, "mapo");

    expect(filtered).toHaveLength(1);
    expect(filtered[0].displayName).toBe("Vegetarian and Tofu");
    expect(filtered[0].items.map((item) => item.name)).toEqual(["Vegetable Mapo Tofu"]);
  });

  it("keeps all items when a category itself matches", () => {
    const [rice] = filterMenuCategories(menuFixture, "rice");

    expect(rice.displayName).toBe("Rice");
    expect(rice.items).toHaveLength(7);
  });
});

describe("getMenuCategoryCounts", () => {
  it("counts dishes by category slug", () => {
    const counts = getMenuCategoryCounts(menuFixture);

    expect(counts.get("APP")).toBe(8);
    expect(counts.get("EXT")).toBe(6);
  });
});
