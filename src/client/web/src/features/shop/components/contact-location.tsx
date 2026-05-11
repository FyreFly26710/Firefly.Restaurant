import styles from "./contact-location.module.css";
import type { ShopContactLocation } from "../types";

type ContactLocationProps = {
  location: ShopContactLocation;
};

export function ContactLocation({ location }: ContactLocationProps) {
  return (
    <section className={styles["contact-location-section"]} aria-labelledby="contact-location-title">
      <div className={`${styles.container} ${styles["contact-location-grid"]}`}>
        <div className={styles["contact-map-panel"]} role="img" aria-label={location.mapLabel}>
          <span
            className={`${styles["contact-map-street"]} ${styles["contact-map-street-one"]}`}
            aria-hidden="true"
          />
          <span
            className={`${styles["contact-map-street"]} ${styles["contact-map-street-two"]}`}
            aria-hidden="true"
          />
          <span className={styles["contact-map-pin"]} aria-hidden="true" />
          <span className={styles["contact-map-label"]}>Firefly Restaurant</span>
        </div>

        <div className={styles["contact-location-copy"]}>
          <p className={styles["mono-label"]}>{location.label}</p>
          <h2 id="contact-location-title" className={styles.display}>
            Where to find us
          </h2>
          <p className={styles["contact-location-summary"]}>{location.summary}</p>
          <p className={styles["contact-neighborhood"]}>{location.neighborhood}</p>

          <div className={styles["contact-note-list"]}>
            {location.notes.map((note) => (
              <article className={styles["contact-note"]} key={note.label}>
                <h3>{note.label}</h3>
                <p>{note.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
