import Link from "next/link";
import styles from "./contact-hero.module.css";
import type { ShopContact, ShopContactPageHero } from "../types";

type ContactHeroProps = {
  contact: ShopContact;
  hero: ShopContactPageHero;
};

export function ContactHero({ contact, hero }: ContactHeroProps) {
  return (
    <section className={styles["contact-hero"]} aria-labelledby="contact-hero-title">
      <div className={`${styles.container} ${styles["contact-hero-grid"]}`}>
        <div>
          <p className={`${styles["mono-label"]} ${styles["contact-eyebrow"]}`}>{hero.eyebrow}</p>
          <h1 id="contact-hero-title" className={styles.display}>
            {hero.title}
          </h1>
          <p className={styles["contact-lede"]}>{hero.lead}</p>

          <div className={styles["contact-actions"]} aria-label="Contact actions">
            <a className={`${styles["button-link"]} ${styles["button-link-primary"]}`} href={contact.phoneHref}>
              Call the restaurant
            </a>
            <Link className={`${styles["button-link"]} ${styles["button-link-secondary"]}`} href="/menu">
              View the menu
            </Link>
          </div>
        </div>

        <dl className={styles["contact-fact-panel"]} aria-label="Contact highlights">
          {hero.facts.map((fact) => (
            <div className={styles["contact-fact-row"]} key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
