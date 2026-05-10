import type { CSSProperties } from "react";
import type { ItemTagResponse, MenuItemResponse } from "../types";

type DishRowProps = {
  item: MenuItemResponse;
};

const priceFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export function DishRow({ item }: DishRowProps) {
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
