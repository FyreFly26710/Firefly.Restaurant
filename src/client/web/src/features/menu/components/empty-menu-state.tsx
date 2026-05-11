import styles from "./empty-menu-state.module.css";

export function EmptyMenuState() {
  return (
    <div className={styles["empty-state"]} role="status">
      <h2>No matching dishes.</h2>
      <p>Try another ingredient, dish name, or menu tag.</p>
    </div>
  );
}
