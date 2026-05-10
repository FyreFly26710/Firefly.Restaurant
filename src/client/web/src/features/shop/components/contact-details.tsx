import type { ShopContact } from "../types";

type ContactDetailsProps = {
  contact: ShopContact;
};

export function ContactDetails({ contact }: ContactDetailsProps) {
  return (
    <section className="container contact-details" aria-labelledby="contact-details-title">
      <div>
        <p className="mono-label">Details</p>
        <h2 id="contact-details-title" className="display">
          Contact details
        </h2>
      </div>

      <div className="contact-details-grid">
        <div className="contact-info-panel">
          <h3>Address</h3>
          <address>
            {contact.addressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
        </div>

        <div className="contact-info-panel">
          <h3>Reach us</h3>
          <p>
            <a href={contact.phoneHref}>{contact.phoneLabel}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        </div>

        <div className="contact-hours-panel">
          <h3>Opening hours</h3>
          <table className="contact-hours-table">
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
