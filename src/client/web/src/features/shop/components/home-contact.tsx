import styles from "./home-contact.module.css";
import type { ShopContact } from "../types";

type HomeContactProps = {
  contact: ShopContact;
};

export function HomeContact({ contact }: HomeContactProps) {
  return (
    <section className={styles["home-contact-section"]} id="contact" aria-labelledby="home-contact-title">
      <div className={styles.container}>
        <p className={styles["mono-label"]}>Find us</p>
        <h2 id="home-contact-title" className={styles.display}>
          Come by for the glow.
        </h2>

        <div className={styles["home-contact-grid"]}>
          <div className={styles["home-contact-block"]}>
            <h3>Address</h3>
            <address>
              {contact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>

            <h3>Reach us</h3>
            <p>
              <a href={contact.phoneHref}>{contact.phoneLabel}</a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          </div>

          <div className={styles["home-contact-block"]}>
            <h3>Hours</h3>
            <table className={styles["home-hours-table"]}>
              <tbody>
                {contact.hours.map((row) => (
                  <tr key={row.day}>
                    <th scope="row">{row.day}</th>
                    <td>{row.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles["home-map-panel"]} aria-label="Firefly Restaurant local area map">
            <span className={styles["home-map-pin"]} aria-hidden="true" />
            <span className={styles["home-map-label"]}>Firefly Restaurant</span>
          </div>
        </div>
      </div>
    </section>
  );
}
