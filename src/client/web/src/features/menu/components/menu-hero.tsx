type MenuHeroProps = {
  updatedLabel: string;
};

export function MenuHero({ updatedLabel }: MenuHeroProps) {
  return (
    <section className="menu-hero" aria-labelledby="menu-title">
      <div>
        <p className="mono-label text-ember-deep">Current menu</p>
        <h1 id="menu-title" className="display">
          The menu.
        </h1>
        <p className="menu-hero-copy">
          Crisp appetisers, fragrant soups, wok-fired favourites, rice, noodles,
          and warm sides for the table. The board is built for an easy evening:
          quick to scan, generous in choice, and clear on the details.
        </p>
      </div>
      <aside className="menu-note" aria-label="Menu details">
        <p className="mono-label text-plum">{updatedLabel}</p>
        <p>
          Seasonal availability may shift through service. Ask the team about
          heat, allergens, and the dishes they are most excited to send out
          tonight.
        </p>
      </aside>
    </section>
  );
}
