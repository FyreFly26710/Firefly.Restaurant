import type { ShopStory } from "../types";

type HomeStoryProps = {
  story: ShopStory;
};

export function HomeStory({ story }: HomeStoryProps) {
  return (
    <section className="container home-story" aria-labelledby="home-story-title">
      <div>
        <p className="mono-label text-ember-deep">{story.eyebrow}</p>
        <h2 id="home-story-title" className="display">
          {story.title}
        </h2>
      </div>
      <div className="home-story-copy">
        {story.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="home-signature">
          {story.signature}
          <span>{story.signatureLabel}</span>
        </p>
      </div>
    </section>
  );
}
