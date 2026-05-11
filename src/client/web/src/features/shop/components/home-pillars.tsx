import styles from "./home-pillars.module.css";
import type { ShopPillar } from "../types";

type HomePillarsProps = {
  pillars: ShopPillar[];
};

export function HomePillars({ pillars }: HomePillarsProps) {
  return (
    <section className={`${styles.container} ${styles["home-pillars"]}`} aria-label="Firefly service pillars">
      {pillars.map((pillar) => (
        <article className={styles["home-pillar"]} key={pillar.kicker}>
          <p className={styles["mono-label"]}>{pillar.kicker}</p>
          <h3>{pillar.title}</h3>
          <p>{pillar.body}</p>
        </article>
      ))}
    </section>
  );
}
