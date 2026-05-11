import type { CSSProperties } from "react";
import styles from "./dish-row.module.css";
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
    <article className={styles["dish-row"]}>
      <div className={styles["dish-main"]}>
        <div className={styles["dish-title-line"]}>
          <h3 className={styles["dish-name"]}>{item.name}</h3>
          {item.tags.map((tag) => (
            <DishTag key={`${item.slug}-${tag.value}`} tag={tag} />
          ))}
        </div>
        <p className={styles["dish-description"]}>{item.description}</p>
      </div>
      <p className={styles["dish-price"]}>{priceFormatter.format(item.price)}</p>
    </article>
  );
}

function DishTag({ tag }: { tag: ItemTagResponse }) {
  return (
    <span className={styles["dish-tag"]} style={{ "--tag-color": tag.color } as CSSProperties}>
      {tag.value}
    </span>
  );
}
