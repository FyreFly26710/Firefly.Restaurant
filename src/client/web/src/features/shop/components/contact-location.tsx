import type { ShopContactLocation } from "../types";

type ContactLocationProps = {
  location: ShopContactLocation;
};

export function ContactLocation({ location }: ContactLocationProps) {
  return (
    <section className="contact-location-section" aria-labelledby="contact-location-title">
      <div className="container contact-location-grid">
        <div className="contact-map-panel" role="img" aria-label={location.mapLabel}>
          <span className="contact-map-street contact-map-street-one" aria-hidden="true" />
          <span className="contact-map-street contact-map-street-two" aria-hidden="true" />
          <span className="contact-map-pin" aria-hidden="true" />
          <span className="contact-map-label">Firefly Restaurant</span>
        </div>

        <div className="contact-location-copy">
          <p className="mono-label">{location.label}</p>
          <h2 id="contact-location-title" className="display">
            Where to find us
          </h2>
          <p className="contact-location-summary">{location.summary}</p>
          <p className="contact-neighborhood">{location.neighborhood}</p>

          <div className="contact-note-list">
            {location.notes.map((note) => (
              <article className="contact-note" key={note.label}>
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
