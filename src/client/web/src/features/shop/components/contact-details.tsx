import styles from "./contact-details.module.css";
import type { ShopContact } from "../types";

type ContactDetailsProps = {
  contact: ShopContact;
};

export function ContactDetails({ contact }: ContactDetailsProps) {
  return (
    <section className={`${styles.container} ${styles["contact-details"]}`} aria-labelledby="contact-details-title">
      <div>
        <p className={styles["mono-label"]}>Details</p>
        <h2 id="contact-details-title" className={styles.display}>
          Contact details
        </h2>
      </div>

      <div className={styles["contact-details-grid"]}>
        <div className={styles["contact-info-panel"]}>
          <h3>Address</h3>
          <address>
            {contact.addressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
        </div>

        <div className={styles["contact-info-panel"]}>
          <h3>Reach us</h3>
          <p>
            <a href={contact.phoneHref}>{contact.phoneLabel}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        </div>

        <div className={styles["contact-hours-panel"]}>
          <h3>Opening hours</h3>
          <table className={styles["contact-hours-table"]}>
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
      </div>
    </section>
  );
}
