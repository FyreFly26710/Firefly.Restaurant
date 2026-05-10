import { DishRow } from "./dish-row";
import type { MenuCategoryResponse } from "../types";

type MenuCategorySectionProps = {
  category: MenuCategoryResponse;
  sectionId: string;
};

export function MenuCategorySection({ category, sectionId }: MenuCategorySectionProps) {
  return (
    <section
      className="category-section"
      id={sectionId}
      aria-labelledby={`${sectionId}-title`}
    >
      <div className="category-heading">
        <h2 className="display" id={`${sectionId}-title`}>
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
  );
}
