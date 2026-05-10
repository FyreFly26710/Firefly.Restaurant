import { describe, expect, it } from "vitest";
import { menuFixture } from "./menu-fixture";

describe("menuFixture", () => {
  it("matches the backend menu response shape expected by the storefront", () => {
    expect(menuFixture.length).toBeGreaterThan(0);

    for (const category of menuFixture) {
      expect(category).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          slug: expect.any(String),
          displayName: expect.any(String),
          description: expect.any(String),
          displayOrder: expect.any(Number),
          items: expect.any(Array),
        }),
      );

      expect(category.items.length).toBeGreaterThan(0);

      for (const item of category.items) {
        expect(item).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            slug: expect.any(String),
            name: expect.any(String),
            description: expect.any(String),
            price: expect.any(Number),
            available: expect.any(Boolean),
            displayOrder: expect.any(Number),
            imageUrl: null,
            tags: expect.any(Array),
          }),
        );

        for (const tag of item.tags) {
          expect(tag).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              value: expect.any(String),
              color: expect.stringMatching(/^#[0-9a-f]{6}$/i),
            }),
          );
        }
      }
    }
  });

  it("keeps categories and dishes in display order", () => {
    const categoryOrders = menuFixture.map((category) => category.displayOrder);

    expect(categoryOrders).toEqual([...categoryOrders].sort((a, b) => a - b));

    for (const category of menuFixture) {
      const itemOrders = category.items.map((item) => item.displayOrder);

      expect(itemOrders).toEqual([...itemOrders].sort((a, b) => a - b));
    }
  });
});
