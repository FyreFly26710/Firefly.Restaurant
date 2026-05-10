// Shared components: Header, Footer, brand mark, icons
const { useState, useEffect, useRef, useMemo } = React;

// Tiny inline SVG icons (no emoji, no AI-slop linework)
const Icon = {
  arrow: (props) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  plus: (props) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...props}>
      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  minus: (props) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...props}>
      <path d="M1 6h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  search: (props) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="m11 11 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  bag: (props) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <path d="M3 4h8l-.7 8.2a1 1 0 0 1-1 .8H4.7a1 1 0 0 1-1-.8L3 4Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M5 4V3a2 2 0 0 1 4 0v1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  truck: (props) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <rect x="1" y="4" width="9" height="6" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M10 6h3l2 2v2h-5V6Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      <circle cx="4" cy="11.5" r="1.3" stroke="currentColor" strokeWidth="1.3"/>
      <circle cx="12" cy="11.5" r="1.3" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  ),
  store: (props) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M2 3h12l-1 3H3L2 3Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M3 6v7h10V6" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M6 13V9h4v4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  ),
};

function Brand({ size = 28 }) {
  return (
    <span className="brand">
      <span className="mark" style={{ width: size, height: size, fontSize: size * 0.42 }}>e</span>
      <span>Ember &amp; Salt</span>
    </span>
  );
}

function Header({ route, setRoute, cartCount, user }) {
  const navLinks = [
    { id: "home",     label: "Home" },
    { id: "menu",     label: "Menu" },
    { id: "contact",  label: "Contact" },
  ];
  return (
    <header className="site-header">
      <div className="container row">
        <a href="#" onClick={(e) => { e.preventDefault(); setRoute("home"); }}>
          <Brand />
        </a>
        <nav className="nav">
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={route === l.id ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                if (l.id === "contact") { setRoute("home"); setTimeout(() => { document.getElementById("contact")?.scrollIntoView({behavior:"smooth"}); }, 60); }
                else setRoute(l.id);
              }}
            >
              {l.label}
            </a>
          ))}
          <span className="sep" />
          {user ? (
            <React.Fragment>
              <span className="label-md" style={{ fontSize: 13, color: "var(--ink-3)", padding: "0 8px" }}>
                Hi, {user.firstName}
              </span>
              <button onClick={() => setRoute("home")}>Log out</button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <a href="#login"    className={route === "login"    ? "active" : ""} onClick={(e)=>{e.preventDefault();setRoute("login");}}>Log in</a>
              <a href="#register" className={route === "register" ? "active" : ""} onClick={(e)=>{e.preventDefault();setRoute("register");}}>Sign up</a>
            </React.Fragment>
          )}
          {cartCount > 0 && (
            <a className="cart-pill" href="#menu" onClick={(e)=>{e.preventDefault();setRoute("menu");}}>
              <span className="dot" />
              <span><Icon.bag /></span>
              <span>{cartCount}</span>
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}

function Footer({ setRoute }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="grid">
          <div className="col">
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom: 20 }}>
              <span className="mark" style={{
                width:32, height:32, borderRadius:"50%",
                background:"var(--ember)", color:"var(--cream)",
                display:"inline-flex", alignItems:"center", justifyContent:"center",
                fontFamily:"var(--mono)", fontSize:14
              }}>e</span>
              <span style={{ fontFamily:"var(--serif)", fontSize:24 }}>Ember &amp; Salt</span>
            </div>
            <p style={{ maxWidth: "32ch" }}>
              A wood-fired bistro and wine room in the warehouse district.
              Open hearth, slow food, no pretense.
            </p>
          </div>
          <div className="col">
            <h4>Visit</h4>
            <p>118 Kiln Lane<br/>Warehouse District<br/>Manchester, M3 4LZ</p>
          </div>
          <div className="col">
            <h4>Pages</h4>
            <a href="#" onClick={(e)=>{e.preventDefault();setRoute("home");}}>Home</a>
            <a href="#" onClick={(e)=>{e.preventDefault();setRoute("menu");}}>Menu &amp; Order</a>
            <a href="#" onClick={(e)=>{e.preventDefault();setRoute("login");}}>Log in</a>
            <a href="#" onClick={(e)=>{e.preventDefault();setRoute("register");}}>Sign up</a>
          </div>
          <div className="col">
            <h4>Contact</h4>
            <a href="tel:01612310118">0161 231 0118</a>
            <a href="mailto:hello@emberandsalt.co">hello@emberandsalt.co</a>
            <p style={{ marginTop: 16, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Tue – Sun · 17:00 – 23:00
            </p>
          </div>
        </div>
        <div className="legal">
          <span>© 2026 Ember &amp; Salt Ltd. All rights reserved.</span>
          <span>v 4.2.0 · Built warm.</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Brand, Header, Footer, Icon });
