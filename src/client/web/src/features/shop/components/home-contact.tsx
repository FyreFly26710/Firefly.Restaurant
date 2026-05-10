import type { ShopContact } from "../types";

type HomeContactProps = {
  contact: ShopContact;
};

export function HomeContact({ contact }: HomeContactProps) {
  return (
    <section className="home-contact-section" id="contact" aria-labelledby="home-contact-title">
      <div className="container">
        <p className="mono-label">Find us</p>
        <h2 id="home-contact-title" className="display">
          Come by for the glow.
        </h2>

        <div className="home-contact-grid">
          <div className="home-contact-block">
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

          <div className="home-contact-block">
            <h3>Hours</h3>
            <table className="home-hours-table">
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

          <div className="home-map-panel" aria-label="Firefly Restaurant local area map">
            <span className="home-map-pin" aria-hidden="true" />
            <span className="home-map-label">Firefly Restaurant</span>
          </div>
        </div>
      </div>
    </section>
  );
}
