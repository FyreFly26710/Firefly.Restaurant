// Home page
function Hero({ setRoute }) {
  return (
    <section className="hero container">
      <div className="hero-grid">
        <div>
          <div className="eyebrow-row">
            <span className="dot" />
            <span className="eyebrow">Open tonight · 17:00 – 23:00</span>
          </div>
          <h1 className="display">
            Slow food,<br/>
            <span className="ember">open hearth,</span><br/>
            no pretense.
          </h1>
          <p className="lede">
            Ember &amp; Salt is a wood-fired bistro in the warehouse district.
            We cook over live fire, source from a few good farms, and let the
            ingredients do the talking.
          </p>
          <div className="hero-actions">
            <button className="btn btn--primary btn--lg" onClick={() => setRoute("menu")}>
              Order tonight <span className="arrow"><Icon.arrow /></span>
            </button>
            <button className="btn btn--ghost btn--lg" onClick={() => document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}>
              Find the room
            </button>
          </div>
        </div>
        <div className="hero-meta">
          <div className="row"><span>Est.</span><strong>2021</strong></div>
          <div className="row"><span>Hearth temp</span><strong>740°F</strong></div>
          <div className="row"><span>Producers</span><strong>14 within 50mi</strong></div>
          <div className="row"><span>Tonight's special</span><strong>Lamb shoulder</strong></div>
          <div className="row"><span>Lead time</span><strong>~ 35 min</strong></div>
        </div>
      </div>
      <div className="hero-image">
        <div className="placeholder-num">01</div>
        <div className="placeholder-label">HERO IMAGE — wide-angle dining room, warm tungsten, hearth glow</div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Wood-fired", "★", "Slow-simmered", "★", "Hand-rolled", "★", "Open hearth", "★", "From the farm", "★"];
  const block = (
    <span>
      {items.map((it, i) =>
        it === "★"
          ? <span key={i} className="star"> ★ </span>
          : <span key={i}>{it}</span>
      )}
    </span>
  );
  return (
    <div className="marquee">
      <div className="track">
        {block}{block}{block}{block}
      </div>
    </div>
  );
}

function Story() {
  return (
    <section className="story container">
      <div className="left">
        <span className="eyebrow">— Our kitchen</span>
        <h2 className="display">A small room.<br/>A real fire.</h2>
      </div>
      <div className="right">
        <p>
          We started Ember &amp; Salt in 2021 with a single oak-fired oven
          and a stubborn idea: that food cooked slowly, over real flame,
          tastes more honestly. Four years on, the room is small, the menu
          is short, and the fire has not gone out once.
        </p>
        <p>
          The menu changes each Wednesday based on what arrives from the
          farms. Some weeks that means a whole lamb shoulder; some weeks
          it means an entire dinner built around heritage carrots. We
          write it on a chalkboard. Then we cook it.
        </p>
        <div className="signature">
          Mira &amp; Jonas
          <small>— Owners &amp; Chefs</small>
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  const items = [
    { num: "01 / Sourced", title: "Fourteen farms within fifty miles", body: "We work directly with growers, butchers, and a single dayboat. Less of everything, more of what's good." },
    { num: "02 / Cooked",  title: "An oak-fired hearth, lit at noon",   body: "Every plate touches live flame. The oven runs at 740°F at peak service and goes cold around midnight." },
    { num: "03 / Served",  title: "An eight-course tasting, or à la carte", body: "Stay for one course or stay for the night. The wine list is short, mostly natural, and chosen to hold up to fire." },
  ];
  return (
    <section className="container pillars">
      {items.map((p, i) => (
        <article key={i} className="pillar">
          <span className="num">{p.num}</span>
          <h3>{p.title}</h3>
          <p>{p.body}</p>
        </article>
      ))}
    </section>
  );
}

function Featured({ setRoute, addToCart, cart }) {
  const featuredIds = ["w3", "p2", "d1"];
  const items = featuredIds.map(id => window.MENU_ITEMS.find(m => m.id === id));
  const swatches = ["#C8704A", "#D9B68A", "#E8DCC8"];
  return (
    <section className="container featured">
      <div className="head">
        <div>
          <span className="eyebrow">— On the menu this week</span>
          <h2 className="section serif" style={{ marginTop: 14, fontSize: "clamp(36px, 5vw, 64px)" }}>From the chalkboard.</h2>
        </div>
        <button className="btn btn--ghost" onClick={() => setRoute("menu")}>
          Full menu <span className="arrow"><Icon.arrow /></span>
        </button>
      </div>
      <div className="featured-grid">
        {items.map((it, i) => (
          <article key={it.id} className="dish-card">
            <div className="img" style={{ "--swatch": swatches[i] }}>
              <span className="lbl">DISH PHOTO — {it.name.toLowerCase()}</span>
            </div>
            <div className="body">
              <h4>{it.name}</h4>
              <span className="desc">{it.desc}</span>
              <div className="row">
                <span className="price">£{it.price.toFixed(2)}</span>
                <button
                  className={`add-btn ${cart[it.id] ? "in-cart" : ""}`}
                  onClick={() => addToCart(it.id)}
                >
                  {cart[it.id] ? <React.Fragment>In basket <span className="qty">{cart[it.id]}</span></React.Fragment> : <React.Fragment><Icon.plus /> Add</React.Fragment>}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const today = new Date().getDay();
  const hours = [
    { day: "Mon", h: "Closed", idx: 1 },
    { day: "Tue", h: "17:00 — 23:00", idx: 2 },
    { day: "Wed", h: "17:00 — 23:00", idx: 3 },
    { day: "Thu", h: "17:00 — 23:00", idx: 4 },
    { day: "Fri", h: "17:00 — 24:00", idx: 5 },
    { day: "Sat", h: "12:00 — 24:00", idx: 6 },
    { day: "Sun", h: "12:00 — 22:00", idx: 0 },
  ];
  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <span className="eyebrow" style={{ color: "rgba(246,244,239,0.55)" }}>— Find us</span>
        <h2 className="display" style={{ marginTop: 14 }}>
          Come for the fire.<br/>
          <span className="ember">Stay for the wine.</span>
        </h2>
        <div className="contact-grid">
          <div className="contact-block">
            <h4>Address</h4>
            <div className="lines">
              118 Kiln Lane<br/>
              Warehouse District<br/>
              Manchester, M3 4LZ
            </div>
            <h4 style={{ marginTop: 28 }}>Reach us</h4>
            <div className="lines">
              <a href="tel:01612310118">0161 231 0118</a><br/>
              <a href="mailto:hello@emberandsalt.co">hello@emberandsalt.co</a>
            </div>
          </div>
          <div className="contact-block">
            <h4>Hours</h4>
            <table className="hours-table">
              <tbody>
                {hours.map((r) => (
                  <tr key={r.day} className={r.idx === today ? "today" : ""}>
                    <td>{r.day}</td>
                    <td>{r.h}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="map-card">
            <span className="pin" />
            <span className="label">Ember &amp; Salt</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage({ setRoute, addToCart, cart }) {
  return (
    <React.Fragment>
      <Hero setRoute={setRoute} />
      <Marquee />
      <Story />
      <Pillars />
      <Featured setRoute={setRoute} addToCart={addToCart} cart={cart} />
      <Contact />
    </React.Fragment>
  );
}

window.HomePage = HomePage;
