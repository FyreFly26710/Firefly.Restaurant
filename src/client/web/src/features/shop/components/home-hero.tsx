import Link from "next/link";
import styles from "./home-hero.module.css";
import type { ShopHero } from "../types";

type HomeHeroProps = {
  hero: ShopHero;
};

export function HomeHero({ hero }: HomeHeroProps) {
  return (
    <section className={`${styles.container} ${styles["home-hero"]}`} aria-labelledby="home-title">
      <div className={styles["home-hero-grid"]}>
        <div>
          <div className={styles["home-eyebrow-row"]}>
            <span className={styles["home-live-dot"]} aria-hidden="true" />
            <p className={styles["mono-label"]}>{hero.eyebrow}</p>
          </div>
          <h1 id="home-title" className={styles.display}>
            {hero.headline}
          </h1>
          <p className={styles["home-tagline"]}>{hero.tagline}</p>
          <p className={styles["home-lede"]}>{hero.lead}</p>
          <div className={styles["home-actions"]} aria-label="Home page actions">
            <Link
              className={`${styles["button-link"]} ${styles["button-link-primary"]}`}
              href={hero.primaryAction.href}
            >
              {hero.primaryAction.label}
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <a
              className={`${styles["button-link"]} ${styles["button-link-secondary"]}`}
              href={hero.secondaryAction.href}
            >
              {hero.secondaryAction.label}
            </a>
          </div>
        </div>

        <aside className={styles["home-fact-list"]} aria-label="Restaurant highlights">
          {hero.facts.map((fact) => (
            <div className={styles["home-fact-row"]} key={fact.label}>
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
            </div>
          ))}
        </aside>
      </div>

      <div
        className={styles["home-hero-visual"]}
        role="img"
        aria-label="A warm dining room impression with the Firefly kitchen glow"
      >
        <span
          className={`${styles["home-visual-line"]} ${styles["home-visual-line-one"]}`}
          aria-hidden="true"
        />
        <span
          className={`${styles["home-visual-line"]} ${styles["home-visual-line-two"]}`}
          aria-hidden="true"
        />
        <span className={styles["home-visual-counter"]} aria-hidden="true" />
        <span className={styles["home-visual-heat"]} aria-hidden="true" />
      </div>
    </section>
  );
}
