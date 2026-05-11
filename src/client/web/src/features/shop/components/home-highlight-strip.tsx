import styles from "./home-highlight-strip.module.css";

const kitchenHighlights = ["Wok-fired", "Crisp starters", "Fragrant rice", "Vegetable plates"];

export function HomeHighlightStrip() {
  return (
    <div className={styles["home-highlight-strip"]} aria-label="Kitchen highlights">
      <div className={styles["home-highlight-track"]}>
        {[...kitchenHighlights, ...kitchenHighlights].map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
