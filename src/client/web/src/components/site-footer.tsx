import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles["site-footer"]}>
      <div className={`${styles.container} ${styles["site-footer-row"]}`}>
        <div>
          <p className={`${styles["mono-label"]} text-ember-soft`}>Firefly Restaurant</p>
          <p>Warm plates, careful timing, and a menu made for browsing.</p>
        </div>
        <p className={styles["mono-label"]}>Open kitchen</p>
      </div>
    </footer>
  );
}
