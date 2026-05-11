import styles from "./menu-search.module.css";

type MenuSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function MenuSearch({ value, onChange }: MenuSearchProps) {
  return (
    <div className={styles["menu-search-row"]}>
      <label className="sr-only" htmlFor="menu-search">
        Search menu
      </label>
      <div className={styles["search-field"]}>
        <span className={styles["search-field-mark"]} aria-hidden="true">
          *
        </span>
        <input
          id="menu-search"
          name="menu-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search dishes, ingredients, or tags"
        />
      </div>
    </div>
  );
}
