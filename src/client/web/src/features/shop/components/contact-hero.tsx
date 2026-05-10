import Link from "next/link";
import type { ShopContact, ShopContactPageHero } from "../types";

type ContactHeroProps = {
  contact: ShopContact;
  hero: ShopContactPageHero;
};

export function ContactHero({ contact, hero }: ContactHeroProps) {
  return (
    <section className="contact-hero" aria-labelledby="contact-hero-title">
      <div className="container contact-hero-grid">
        <div>
          <p className="mono-label contact-eyebrow">{hero.eyebrow}</p>
          <h1 id="contact-hero-title" className="display">
            {hero.title}
          </h1>
          <p className="contact-lede">{hero.lead}</p>

          <div className="contact-actions" aria-label="Contact actions">
            <a className="button-link button-link-primary" href={contact.phoneHref}>
              Call the restaurant
            </a>
            <Link className="button-link button-link-secondary" href="/menu">
              View the menu
            </Link>
          </div>
        </div>

        <dl className="contact-fact-panel" aria-label="Contact highlights">
          {hero.facts.map((fact) => (
            <div className="contact-fact-row" key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
