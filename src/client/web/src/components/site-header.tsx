import Link from "next/link";
import styles from "./site-header.module.css";

type SiteHeaderProps = {
  currentPage: "home" | "menu" | "contact";
};

const navItems = [
  { href: "/", label: "Home", page: "home" },
  { href: "/menu", label: "Menu", page: "menu" },
  { href: "/contact", label: "Contact", page: "contact" },
] as const;

export function SiteHeader({ currentPage }: SiteHeaderProps) {
  return (
    <header className={styles["site-header"]}>
      <div className={`${styles.container} ${styles["site-header-row"]}`}>
        <Link className={styles.brand} href="/" aria-label="Firefly Restaurant home">
          <span className={styles["brand-mark"]} aria-hidden="true">
            F
          </span>
          <span>Firefly Restaurant</span>
        </Link>
        <nav className={styles["site-nav"]} aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              className={styles["nav-link"]}
              href={item.href}
              key={item.page}
              aria-current={currentPage === item.page ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
