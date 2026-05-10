import Link from "next/link";
import type { ShopHero } from "../types";

type HomeHeroProps = {
  hero: ShopHero;
};

export function HomeHero({ hero }: HomeHeroProps) {
  return (
    <section className="container home-hero" aria-labelledby="home-title">
      <div className="home-hero-grid">
        <div>
          <div className="home-eyebrow-row">
            <span className="home-live-dot" aria-hidden="true" />
            <p className="mono-label">{hero.eyebrow}</p>
          </div>
          <h1 id="home-title" className="display">
            {hero.headline}
          </h1>
          <p className="home-tagline">{hero.tagline}</p>
          <p className="home-lede">{hero.lead}</p>
          <div className="home-actions" aria-label="Home page actions">
            <Link className="button-link button-link-primary" href={hero.primaryAction.href}>
              {hero.primaryAction.label}
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <a className="button-link button-link-secondary" href={hero.secondaryAction.href}>
              {hero.secondaryAction.label}
            </a>
          </div>
        </div>

        <aside className="home-fact-list" aria-label="Restaurant highlights">
          {hero.facts.map((fact) => (
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
  );
}
