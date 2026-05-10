import type { CSSProperties } from "react";
import Link from "next/link";
import type { ShopOffering } from "../types";

type HomeFeaturedProps = {
  offerings: ShopOffering[];
};

const priceFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export function HomeFeatured({ offerings }: HomeFeaturedProps) {
  return (
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
        {offerings.map((offering) => (
          <OfferingCard key={offering.name} offering={offering} />
        ))}
      </div>
    </section>
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
