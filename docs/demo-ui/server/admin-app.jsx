// Admin app shell — routing + state
const ADMIN_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#D97757",
  "serif": "Instrument Serif",
  "density": "regular"
}/*EDITMODE-END*/;

function AdminApp() {
  const [route, setRoute] = React.useState("menu");
  const [search, setSearch] = React.useState("");

  const [tweaks, setTweak] = (typeof useTweaks === "function")
    ? useTweaks(ADMIN_TWEAK_DEFAULTS)
    : [ADMIN_TWEAK_DEFAULTS, () => {}];

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

  React.useEffect(() => { window.scrollTo({ top: 0 }); }, [route]);

  const user = { name: "Mira Okafor", email: "mira@emberandsalt.co", initials: "M" };

  const counts = { menu: window.MENU_ITEMS.length, users: 12 };

  const titleByRoute = {
    dashboard: "Overview",
    menu:      "Menu items",
    shop:      "Shop details",
    users:     "Users",
    orders:    "Orders",
    settings:  "Settings",
  };
  const crumbs = ["Admin", titleByRoute[route] || ""];

  return (
    <div className="admin-shell">
      <Sidebar route={route} setRoute={setRoute} counts={counts} user={user} />

      <div className="admin-main">
        <Topbar
          crumbs={crumbs}
          title={titleByRoute[route]}
          search={search} setSearch={setSearch}
          right={
            <React.Fragment>
              <button className="btn-sm">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5v3M7 9.5v3M3 5.5l-1.5-1.5M11 5.5l1.5-1.5M3 8.5l-1.5 1.5M11 8.5l1.5 1.5M.5 7h3M10.5 7h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.3"/></svg>
                Help
              </button>
              <span style={{ width: 1, height: 24, background: "var(--rule)" }} />
              <span className="avatar" style={{ width: 34, height: 34, fontSize: 14, background: avatarColor(user.name) }}>{user.initials}</span>
            </React.Fragment>
          }
        />

        {route === "menu"      && <MenuAdmin />}
        {route === "shop"      && <ShopAdmin />}
        {route === "users"     && <UsersAdmin />}
        {route === "dashboard" && <DashboardPlaceholder />}
        {route === "orders"    && <ComingSoon what="Orders" hint="Live tickets, today's revenue, kitchen view." />}
        {route === "settings"  && <ComingSoon what="Settings" hint="Billing, integrations, notifications, danger zone." />}
      </div>

      {typeof TweaksPanel !== "undefined" && (
        <TweaksPanel title="Tweaks">
          <TweakSection label="Brand">
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
    </div>
  );
}

function DashboardPlaceholder() {
  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <span className="eyebrow">— Tonight · Wed 11 Mar</span>
          <h2>Good evening, Mira.</h2>
          <p className="lede">Service starts in 42 minutes. Three reservations early, no shorts in the kitchen, fire is at temp.</p>
        </div>
      </div>
      <div className="kpi-row">
        <div className="kpi"><span className="label">Tonight's covers</span><span className="val">38</span><span className="delta up">↗ 6 vs. last Wed</span></div>
        <div className="kpi"><span className="label">Open tickets</span><span className="val">3</span><span className="delta">avg 8 min</span></div>
        <div className="kpi"><span className="label">Tonight's take</span><span className="val">£412</span><span className="delta up">↗ projected £1,820</span></div>
        <div className="kpi"><span className="label">Stock alerts</span><span className="val">2</span><span className="delta dn">Branzino, Dark Chocolate Tart</span></div>
      </div>
      <div className="card">
        <div className="card-head">
          <div><h3>Quick actions</h3><span className="sub">The things you'll touch most often.</span></div>
        </div>
        <div className="card-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            { t: "Edit tonight's menu", s: "Mark items unavailable, push specials.", to: "menu" },
            { t: "Update shop hours",   s: "Open later, close early — both fine.",   to: "shop" },
            { t: "Invite a new staff",  s: "Send a one-tap link to set a password.", to: "users" },
          ].map(q => (
            <div key={q.t} onClick={() => window.__admin_setRoute && window.__admin_setRoute(q.to)}
              style={{ padding: 18, border: "1px solid var(--rule)", borderRadius: 12, cursor: "pointer", background: "var(--cream)" }}>
              <div style={{ fontFamily: "var(--serif)", fontSize: 22, marginBottom: 6 }}>{q.t}</div>
              <div style={{ fontSize: 13, color: "var(--ink-3)" }}>{q.s}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ComingSoon({ what, hint }) {
  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <span className="eyebrow">— Roadmap</span>
          <h2>{what}.</h2>
          <p className="lede">{hint}</p>
        </div>
      </div>
      <div className="card">
        <div className="empty-state">
          <span className="ico">∅</span>
          <span className="ttl">Not yet wired up.</span>
          <span className="body">This module is on the roadmap. Reach out if you'd like to prioritise it.</span>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<AdminApp />);
