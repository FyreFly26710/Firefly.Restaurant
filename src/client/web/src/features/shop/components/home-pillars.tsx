import type { ShopPillar } from "../types";

type HomePillarsProps = {
  pillars: ShopPillar[];
};

export function HomePillars({ pillars }: HomePillarsProps) {
  return (
    <section className="container home-pillars" aria-label="Firefly service pillars">
      {pillars.map((pillar) => (
        <article className="home-pillar" key={pillar.kicker}>
          <p className="mono-label">{pillar.kicker}</p>
          <h3>{pillar.title}</h3>
          <p>{pillar.body}</p>
        </article>
      ))}
    </section>
  );
}
