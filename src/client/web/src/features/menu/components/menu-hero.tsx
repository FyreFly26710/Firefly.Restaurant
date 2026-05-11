import styles from "./menu-hero.module.css";

type MenuHeroProps = {
  updatedLabel: string;
};

export function MenuHero({ updatedLabel }: MenuHeroProps) {
  return (
    <section className={styles["menu-hero"]} aria-labelledby="menu-title">
      <div>
        <p className={`${styles["mono-label"]} text-ember-deep`}>Current menu</p>
        <h1 id="menu-title" className={styles.display}>
          The menu.
        </h1>
        <p className={styles["menu-hero-copy"]}>
          Crisp appetisers, fragrant soups, wok-fired favourites, rice, noodles,
          and warm sides for the table. The board is built for an easy evening:
          quick to scan, generous in choice, and clear on the details.
        </p>
      </div>
      <aside className={styles["menu-note"]} aria-label="Menu details">
        <p className={`${styles["mono-label"]} text-plum`}>{updatedLabel}</p>
        <p>
          Seasonal availability may shift through service. Ask the team about
          heat, allergens, and the dishes they are most excited to send out
          tonight.
        </p>
      </aside>
    </section>
  );
}
