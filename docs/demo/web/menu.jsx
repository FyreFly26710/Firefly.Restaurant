// Menu page with cart
function MenuPage({ cart, addToCart, removeFromCart, setQty, setRoute, method, setMethod }) {
  const [search, setSearch] = React.useState("");
  const [activeCat, setActiveCat] = React.useState("starters");

  const cats = window.MENU_CATEGORIES;
  const items = window.MENU_ITEMS;

  const counts = React.useMemo(() => {
    const c = {};
    cats.forEach(cat => c[cat.id] = items.filter(i => i.cat === cat.id).length);
    return c;
  }, []);

  const filteredByCat = React.useMemo(() => {
    const term = search.trim().toLowerCase();
    const result = {};
    cats.forEach(cat => {
      result[cat.id] = items.filter(i =>
        i.cat === cat.id &&
        (!term || i.name.toLowerCase().includes(term) || i.desc.toLowerCase().includes(term))
      );
    });
    return result;
  }, [search]);

  // intersection observer for active category
  React.useEffect(() => {
    const sections = cats.map(c => document.getElementById(`cat-${c.id}`)).filter(Boolean);
    if (!sections.length) return;
    const obs = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActiveCat(visible[0].target.id.replace("cat-", ""));
    }, { rootMargin: "-100px 0px -60% 0px", threshold: [0, 0.2, 0.5, 1] });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const cartItems = Object.entries(cart).map(([id, qty]) => ({
    item: items.find(i => i.id === id),
    qty,
  })).filter(x => x.item);
  const subtotal = cartItems.reduce((s, x) => s + x.item.price * x.qty, 0);
  const deliveryFee = method === "delivery" ? (subtotal >= 35 ? 0 : 3.50) : 0;
  const serviceCharge = subtotal * 0.10;
  const total = subtotal + deliveryFee + serviceCharge;
  const cartCount = cartItems.reduce((s, x) => s + x.qty, 0);

  const scrollToCat = (id) => {
    const el = document.getElementById(`cat-${id}`);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: "smooth" });
    }
  };

  return (
    <section className="menu-page container">
      <div className="menu-head">
        <div className="left">
          <span className="eyebrow">— Order online · Tonight</span>
          <h1 className="display" style={{ fontSize: "clamp(48px, 7vw, 96px)" }}>The menu.</h1>
          <p>
            Updated each Wednesday from the chalkboard. Add what you'd like and we'll
            have it ready for collection or send it warm. Lead time is roughly 35 minutes
            for delivery, 25 for collection.
          </p>
        </div>
        <div className="right">
          <div className="method-toggle" role="tablist">
            <button
              className={method === "delivery" ? "active" : ""}
              onClick={() => setMethod("delivery")}
            >
              <Icon.truck /> Delivery <span className="lead">~35m</span>
            </button>
            <button
              className={method === "collection" ? "active" : ""}
              onClick={() => setMethod("collection")}
            >
              <Icon.store /> Collection <span className="lead">~25m</span>
            </button>
          </div>
        </div>
      </div>

      <div className="menu-layout">
        <aside className="cat-rail">
          <div className="head">— Categories</div>
          {cats.map(cat => (
            <button
              key={cat.id}
              className={activeCat === cat.id ? "active" : ""}
              onClick={() => scrollToCat(cat.id)}
            >
              <span>{cat.label}</span>
              <span className="num">{counts[cat.id]}</span>
            </button>
          ))}
        </aside>

        <div className="menu-main">
          <div className="search-row">
            <div className="search-input">
              <span className="icon"><Icon.search /></span>
              <input
                placeholder="Search the menu — try ‘mushroom’ or ‘lamb’"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {cats.map(cat => {
            const list = filteredByCat[cat.id];
            if (!list.length) return null;
            return (
              <div key={cat.id} id={`cat-${cat.id}`} className="cat-section">
                <div className="cat-head">
                  <h2>{cat.label}</h2>
                  <span className="cat-blurb">{cat.blurb}</span>
                </div>
                <div className="dish-list">
                  {list.map(it => (
                    <div key={it.id} className="dish-row">
                      <div className="meta">
                        <div className="top">
                          <span className="name">{it.name}</span>
                          {(it.tags || []).map(t => (
                            <span key={t} className={`tag ${t}`}>{t === "v" ? "Veg" : t === "gf" ? "GF" : t}</span>
                          ))}
                        </div>
                        <span className="desc">{it.desc}</span>
                      </div>
                      <div className="right">
                        <span className="price">£{it.price.toFixed(2)}</span>
                        <button
                          className={`add-btn ${cart[it.id] ? "in-cart" : ""}`}
                          onClick={() => addToCart(it.id)}
                        >
                          {cart[it.id]
                            ? <React.Fragment>Added <span className="qty">{cart[it.id]}</span></React.Fragment>
                            : <React.Fragment><Icon.plus /> Add</React.Fragment>
                          }
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {Object.values(filteredByCat).every(list => !list.length) && (
            <div style={{ padding: "60px 0", textAlign: "center", color: "var(--ink-3)" }}>
              <div style={{ fontFamily: "var(--serif)", fontSize: 32, marginBottom: 8 }}>Nothing matches "{search}".</div>
              <div style={{ fontSize: 14 }}>Try another word, or clear the search.</div>
            </div>
          )}
        </div>

        <aside className="cart">
          <h3>
            Your basket
            <span className="count">{cartCount} {cartCount === 1 ? "item" : "items"}</span>
          </h3>

          {cartItems.length === 0 ? (
            <div className="empty">
              <span className="icon">∅</span>
              Add a few things to get started.
            </div>
          ) : (
            <React.Fragment>
              <div className="cart-items">
                {cartItems.map(({ item, qty }) => (
                  <div key={item.id} className="cart-item">
                    <div>
                      <div className="name">{item.name}</div>
                      <div className="price">£{(item.price * qty).toFixed(2)}</div>
                    </div>
                    <div className="qty-stepper">
                      <button onClick={() => setQty(item.id, qty - 1)} aria-label="Decrease"><Icon.minus /></button>
                      <span className="n">{qty}</span>
                      <button onClick={() => setQty(item.id, qty + 1)} aria-label="Increase"><Icon.plus /></button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-totals">
                <div className="row">
                  <span>Subtotal</span>
                  <span className="amt">£{subtotal.toFixed(2)}</span>
                </div>
                {method === "delivery" && (
                  <div className="row">
                    <span>Delivery {subtotal >= 35 ? "(free over £35)" : ""}</span>
                    <span className="amt">{deliveryFee === 0 ? "Free" : `£${deliveryFee.toFixed(2)}`}</span>
                  </div>
                )}
                <div className="row">
                  <span>Service (10%)</span>
                  <span className="amt">£{serviceCharge.toFixed(2)}</span>
                </div>
                <div className="row total">
                  <span>Total</span>
                  <span className="amt">£{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="lead-time">
                {method === "delivery" ? "Delivery in ~ 35 min" : "Ready for collection in ~ 25 min"}
              </div>

              <button
                className="btn btn--primary btn--block"
                onClick={() => alert("This is a prototype — checkout would go here.")}
              >
                Checkout · £{total.toFixed(2)} <Icon.arrow />
              </button>
            </React.Fragment>
          )}
        </aside>
      </div>
    </section>
  );
}

window.MenuPage = MenuPage;
