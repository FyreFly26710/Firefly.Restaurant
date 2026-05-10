const kitchenHighlights = ["Wok-fired", "Crisp starters", "Fragrant rice", "Vegetable plates"];

export function HomeHighlightStrip() {
  return (
    <div className="home-highlight-strip" aria-label="Kitchen highlights">
      <div className="home-highlight-track">
        {[...kitchenHighlights, ...kitchenHighlights].map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
