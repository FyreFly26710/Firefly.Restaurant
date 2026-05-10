import type { CSSProperties } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { ShopHomePageData, ShopOffering } from "../types";

type HomePageViewProps = {
  page: ShopHomePageData;
};

const priceFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

const kitchenHighlights = ["Wok-fired", "Crisp starters", "Fragrant rice", "Vegetable plates"];

export function HomePageView({ page }: HomePageViewProps) {
  return (
    <div className="site-shell">
      <SiteHeader currentPage="home" />

      <main className="home-page">
        <section className="container home-hero" aria-labelledby="home-title">
          <div className="home-hero-grid">
            <div>
              <div className="home-eyebrow-row">
                <span className="home-live-dot" aria-hidden="true" />
                <p className="mono-label">{page.hero.eyebrow}</p>
              </div>
              <h1 id="home-title" className="display">
                {page.hero.headline}
              </h1>
              <p className="home-tagline">{page.hero.tagline}</p>
              <p className="home-lede">{page.hero.lead}</p>
              <div className="home-actions" aria-label="Home page actions">
                <Link className="button-link button-link-primary" href={page.hero.primaryAction.href}>
                  {page.hero.primaryAction.label}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
                <a className="button-link button-link-secondary" href={page.hero.secondaryAction.href}>
                  {page.hero.secondaryAction.label}
                </a>
              </div>
            </div>

            <aside className="home-fact-list" aria-label="Restaurant highlights">
              {page.hero.facts.map((fact) => (
                <div className="home-fact-row" key={fact.label}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </div>
              ))}
            </aside>
          </div>

          <div
            className="home-hero-visual"
            role="img"
            aria-label="A warm dining room impression with the Firefly kitchen glow"
          >
            <span className="home-visual-line home-visual-line-one" aria-hidden="true" />
            <span className="home-visual-line home-visual-line-two" aria-hidden="true" />
            <span className="home-visual-counter" aria-hidden="true" />
            <span className="home-visual-heat" aria-hidden="true" />
          </div>
        </section>

        <div className="home-highlight-strip" aria-label="Kitchen highlights">
          <div className="home-highlight-track">
            {[...kitchenHighlights, ...kitchenHighlights].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>

        <section className="container home-story" aria-labelledby="home-story-title">
          <div>
            <p className="mono-label text-ember-deep">{page.story.eyebrow}</p>
            <h2 id="home-story-title" className="display">
              {page.story.title}
            </h2>
          </div>
          <div className="home-story-copy">
            {page.story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="home-signature">
              {page.story.signature}
              <span>{page.story.signatureLabel}</span>
            </p>
          </div>
        </section>

        <section className="container home-pillars" aria-label="Firefly service pillars">
          {page.pillars.map((pillar) => (
            <article className="home-pillar" key={pillar.kicker}>
              <p className="mono-label">{pillar.kicker}</p>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </article>
          ))}
        </section>

        <section className="container home-featured" aria-labelledby="home-featured-title">
          <div className="home-section-head">
            <div>
              <p className="mono-label text-ember-deep">On the menu</p>
              <h2 id="home-featured-title" className="display">
                House favourites.
              </h2>
            </div>
            <Link className="button-link button-link-secondary" href="/menu">
              Full menu
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <div className="home-offering-grid">
            {page.featuredOfferings.map((offering) => (
              <OfferingCard key={offering.name} offering={offering} />
            ))}
          </div>
        </section>

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
                  {page.contact.addressLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>

                <h3>Reach us</h3>
                <p>
                  <a href={page.contact.phoneHref}>{page.contact.phoneLabel}</a>
                  <a href={`mailto:${page.contact.email}`}>{page.contact.email}</a>
                </p>
              </div>

              <div className="home-contact-block">
                <h3>Hours</h3>
                <table className="home-hours-table">
                  <tbody>
                    {page.contact.hours.map((row) => (
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
      </main>

      <SiteFooter />
    </div>
  );
}

function OfferingCard({ offering }: { offering: ShopOffering }) {
  return (
    <article className="home-offering">
      <div
        className="home-offering-media"
        style={{ "--offering-accent": offering.accentColor } as CSSProperties}
        aria-hidden="true"
      >
        <span />
      </div>
      <div className="home-offering-body">
        <h3>{offering.name}</h3>
        <p>{offering.description}</p>
        <span>{priceFormatter.format(offering.price)}</span>
      </div>
    </article>
  );
}
