import { describe, expect, it } from "vitest";
import { testMenuCategories } from "@/test/menu-test-data";
import { filterMenuCategories, getMenuCategoryCounts } from "./filter-menu";

describe("filterMenuCategories", () => {
  it("returns every category when the search term is empty", () => {
    expect(filterMenuCategories(testMenuCategories, "")).toHaveLength(testMenuCategories.length);
  });

  it("filters categories to matching dishes and tags", () => {
    const filtered = filterMenuCategories(testMenuCategories, "mapo");

    expect(filtered).toHaveLength(1);
    expect(filtered[0].displayName).toBe("Vegetarian and Tofu");
    expect(filtered[0].items.map((item) => item.name)).toEqual(["Vegetable Mapo Tofu"]);
  });

  it("keeps all items when a category itself matches", () => {
    const [rice] = filterMenuCategories(testMenuCategories, "rice");

    expect(rice.displayName).toBe("Rice");
    expect(rice.items).toHaveLength(2);
  });
});

describe("getMenuCategoryCounts", () => {
  it("counts dishes by category slug", () => {
    const counts = getMenuCategoryCounts(testMenuCategories);

    expect(counts.get("APP")).toBe(2);
    expect(counts.get("RICE")).toBe(2);
  });
});
