import styles from "./home-story.module.css";
import type { ShopStory } from "../types";

type HomeStoryProps = {
  story: ShopStory;
};

export function HomeStory({ story }: HomeStoryProps) {
  return (
    <section className={`${styles.container} ${styles["home-story"]}`} aria-labelledby="home-story-title">
      <div>
        <p className={`${styles["mono-label"]} text-ember-deep`}>{story.eyebrow}</p>
        <h2 id="home-story-title" className={styles.display}>
          {story.title}
        </h2>
      </div>
      <div className={styles["home-story-copy"]}>
        {story.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className={styles["home-signature"]}>
          {story.signature}
          <span>{story.signatureLabel}</span>
        </p>
      </div>
    </section>
  );
}
