// Main App — routing, cart state, tweaks
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#D97757",
  "darkHeader": false,
  "showMarquee": true,
  "serif": "Instrument Serif"
}/*EDITMODE-END*/;

function App() {
  const [route, setRoute] = React.useState("home");
  const [cart, setCart] = React.useState({});
  const [user, setUser] = React.useState(null);
  const [method, setMethod] = React.useState("delivery");
  const [toast, setToast] = React.useState(null);

  const [tweaks, setTweak] = (typeof useTweaks === "function")
    ? useTweaks(TWEAK_DEFAULTS)
    : [TWEAK_DEFAULTS, () => {}];

  // expose for cross-component use
  window.__app_setRoute = setRoute;

  // apply tweak side-effects via CSS variables
  React.useEffect(() => {
    document.documentElement.style.setProperty("--ember", tweaks.accent);
    const family = tweaks.serif === "Instrument Serif"
      ? '"Instrument Serif", Georgia, serif'
      : tweaks.serif === "Cormorant"
      ? '"Cormorant Garamond", Georgia, serif'
      : tweaks.serif === "DM Serif Display"
      ? '"DM Serif Display", Georgia, serif'
      : '"Playfair Display", Georgia, serif';
    document.documentElement.style.setProperty("--serif", family);
  }, [tweaks.accent, tweaks.serif]);

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [route]);

  const cartCount = Object.values(cart).reduce((s, v) => s + v, 0);

  const addToCart = (id) => {
    setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
    const item = window.MENU_ITEMS.find(m => m.id === id);
    setToast(`Added ${item.name} to basket`);
    setTimeout(() => setToast(null), 2000);
  };
  const removeFromCart = (id) => {
    setCart(c => { const n = {...c}; delete n[id]; return n; });
  };
  const setQty = (id, q) => {
    if (q <= 0) removeFromCart(id);
    else setCart(c => ({ ...c, [id]: q }));
  };

  const onLogin = (u) => {
    setUser(u);
    setRoute("home");
    setToast(`Welcome, ${u.firstName}`);
    setTimeout(() => setToast(null), 2200);
  };

  return (
    <React.Fragment>
      <Header route={route} setRoute={setRoute} cartCount={cartCount} user={user} />

      <main>
        {route === "home" && (
          <HomePage setRoute={setRoute} addToCart={addToCart} cart={cart} />
        )}
        {route === "menu" && (
          <MenuPage
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            setQty={setQty}
            setRoute={setRoute}
            method={method}
            setMethod={setMethod}
          />
        )}
        {route === "login" && (
          <LoginPage setRoute={setRoute} onLogin={onLogin} />
        )}
        {route === "register" && (
          <RegisterPage setRoute={setRoute} onLogin={onLogin} />
        )}
      </main>

      {route !== "home" && <Footer setRoute={setRoute} />}
      {route === "home" && (
        <footer className="site-footer" style={{ marginTop: 0, borderRadius: "32px 32px 0 0" }}>
          <div className="container">
            <div className="grid">
              <div className="col">
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom: 20 }}>
                  <span style={{ width:32, height:32, borderRadius:"50%", background:"var(--ember)", color:"var(--cream)", display:"inline-flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--mono)", fontSize:14 }}>e</span>
                  <span style={{ fontFamily:"var(--serif)", fontSize:24 }}>Ember &amp; Salt</span>
                </div>
                <p style={{ maxWidth: "32ch" }}>A wood-fired bistro and wine room in the warehouse district. Open hearth, slow food, no pretense.</p>
              </div>
              <div className="col">
                <h4>Pages</h4>
                <a href="#" onClick={(e)=>{e.preventDefault();setRoute("home");}}>Home</a>
                <a href="#" onClick={(e)=>{e.preventDefault();setRoute("menu");}}>Menu &amp; Order</a>
                <a href="#" onClick={(e)=>{e.preventDefault();setRoute("login");}}>Log in</a>
                <a href="#" onClick={(e)=>{e.preventDefault();setRoute("register");}}>Sign up</a>
              </div>
              <div className="col">
                <h4>Press</h4>
                <a href="#" onClick={(e)=>e.preventDefault()}>Manchester Evening</a>
                <a href="#" onClick={(e)=>e.preventDefault()}>The Infatuation</a>
                <a href="#" onClick={(e)=>e.preventDefault()}>Eater UK</a>
              </div>
              <div className="col">
                <h4>Newsletter</h4>
                <p style={{ marginBottom: 12 }}>Wednesday's chalkboard, in your inbox.</p>
                <div style={{ display: "flex", gap: 6 }}>
                  <input placeholder="you@email.com" style={{ flex: 1, padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(246,244,239,0.18)", background: "rgba(246,244,239,0.05)", color: "var(--cream)" }}/>
                  <button className="btn btn--primary" style={{ padding: "10px 16px", fontSize: 13 }}>Join</button>
                </div>
              </div>
            </div>
            <div className="legal">
              <span>© 2026 Ember &amp; Salt Ltd. All rights reserved.</span>
              <span>v 4.2.0 · Built warm.</span>
            </div>
          </div>
        </footer>
      )}

      {toast && (
        <div className="success-toast">
          <span className="dot" />
          <span>{toast}</span>
        </div>
      )}

      {/* Tweaks panel */}
      {typeof TweaksPanel !== "undefined" && (
        <TweaksPanel title="Tweaks">
          <TweakSection title="Brand">
            <TweakColor
              label="Accent"
              value={tweaks.accent}
              options={["#D97757", "#B65A3F", "#5A6B3A", "#6B3A52", "#3A5A6B"]}
              onChange={(v) => setTweak("accent", v)}
            />
            <TweakSelect
              label="Display serif"
              value={tweaks.serif}
              options={["Instrument Serif", "Cormorant", "DM Serif Display", "Playfair Display"]}
              onChange={(v) => setTweak("serif", v)}
            />
          </TweakSection>
        </TweaksPanel>
      )}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
