// Admin shell — sidebar + topbar
const AdminIcon = {
  dashboard: () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/></svg>),
  menu:  () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 4h10M3 8h10M3 12h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>),
  shop:  () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 3h12l-1 3H3L2 3Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><path d="M3 6v7h10V6" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><path d="M6 13V9h4v4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>),
  users: () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="6" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M2 13c.6-2.2 2.2-3.5 4-3.5s3.4 1.3 4 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M11 6.5a2 2 0 1 0-1.5-3.5M14.5 13c-.4-1.6-1.4-2.7-2.7-3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>),
  orders: () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 5h10l-1 8H4L3 5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><path d="M5.5 5V4a2.5 2.5 0 0 1 5 0v1" stroke="currentColor" strokeWidth="1.3"/></svg>),
  settings: () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4"/><path d="M8 1v2M8 13v2M15 8h-2M3 8H1M12.95 3.05l-1.41 1.41M4.46 11.54l-1.41 1.41M12.95 12.95l-1.41-1.41M4.46 4.46 3.05 3.05" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>),
  edit: () => (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 10v2h2l7-7-2-2-7 7Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><path d="M9 3l2 2" stroke="currentColor" strokeWidth="1.3"/></svg>),
  trash: () => (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M5 4V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1M3.5 4l.7 8.1a1 1 0 0 0 1 .9h3.6a1 1 0 0 0 1-.9L10.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  copy: () => (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="3" y="3" width="8" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M5 3V2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1" stroke="currentColor" strokeWidth="1.3"/></svg>),
  more: () => (<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><circle cx="3" cy="7" r="1.2"/><circle cx="7" cy="7" r="1.2"/><circle cx="11" cy="7" r="1.2"/></svg>),
  check: () => (<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6.2 5 8.5 9.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  ext: () => (<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M5 2H2v8h8V7M7 2h3v3M5 7l5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>),
};

function Sidebar({ route, setRoute, counts, user }) {
  const items = [
    { id: "dashboard", label: "Overview",      ico: AdminIcon.dashboard },
    { id: "menu",      label: "Menu items",    ico: AdminIcon.menu, badge: counts.menu },
    { id: "shop",      label: "Shop details",  ico: AdminIcon.shop },
    { id: "users",     label: "Users",         ico: AdminIcon.users, badge: counts.users },
  ];
  const ops = [
    { id: "orders",   label: "Orders",   ico: AdminIcon.orders, badge: 12 },
    { id: "settings", label: "Settings", ico: AdminIcon.settings },
  ];
  return (
    <aside className="admin-sidebar">
      <div className="brand-row">
        <span className="mark">e</span>
        <div>
          <span className="name">Ember &amp; Salt</span>
          <span className="role">Admin · v4.2</span>
        </div>
      </div>

      <div className="group-label">Manage</div>
      {items.map(it => {
        const Ico = it.ico;
        return (
          <div key={it.id} className={`nav-link ${route === it.id ? "active" : ""}`} onClick={() => setRoute(it.id)}>
            <span className="ico"><Ico /></span>
            <span>{it.label}</span>
            {it.badge != null && <span className="badge">{it.badge}</span>}
          </div>
        );
      })}

      <div className="group-label">Operations</div>
      {ops.map(it => {
        const Ico = it.ico;
        return (
          <div key={it.id} className={`nav-link ${route === it.id ? "active" : ""}`} onClick={() => setRoute(it.id)}>
            <span className="ico"><Ico /></span>
            <span>{it.label}</span>
            {it.badge != null && <span className="badge">{it.badge}</span>}
          </div>
        );
      })}

      <div className="spacer" />

      <a className="nav-link" href="#" onClick={(e)=>e.preventDefault()} style={{ color: "rgba(246,244,239,0.6)" }}>
        <span className="ico"><AdminIcon.ext /></span>
        <span>View public site</span>
      </a>

      <div className="footer">
        <span className="avatar">{user.initials}</span>
        <div className="who">
          <span className="n">{user.name}</span>
          <span className="e">{user.email}</span>
        </div>
        <button className="icon-btn" title="Sign out">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 4V2H2v10h7v-2M5 7h7M10 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </aside>
  );
}

function Topbar({ crumbs, title, search, setSearch, right }) {
  return (
    <div className="admin-topbar">
      <div>
        <div className="crumbs">
          {crumbs.map((c, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="sep">/</span>}
              <span>{c}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="right">
        <div className="search-bar">
          <span style={{ color: "var(--ink-3)" }}><Icon.search /></span>
          <input placeholder="Search items, users, orders…" value={search} onChange={(e)=>setSearch(e.target.value)} />
          <span className="kbd">⌘K</span>
        </div>
        {right}
      </div>
    </div>
  );
}

// Generic drawer
function Drawer({ open, onClose, title, eyebrow, children, footer, width }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <React.Fragment>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer" style={width ? { width: `min(${width}px, 96vw)` } : undefined}>
        <div className="head">
          <div>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h3>{title}</h3>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div className="body">{children}</div>
        {footer && <div className="foot">{footer}</div>}
      </div>
    </React.Fragment>
  );
}

// Reusable switch
function Switch({ on, onChange }) {
  return <span className={`switch ${on ? "on" : ""}`} onClick={(e)=>{e.stopPropagation(); onChange(!on);}} role="switch" aria-checked={on} />;
}

// Avatar from name
function avatarColor(name) {
  const palette = [
    ["#D97757", "#B65A3F"],
    ["#5A6B3A", "#3F4D26"],
    ["#6B3A52", "#4D2839"],
    ["#3A5A6B", "#27414D"],
    ["#A8763E", "#7A5326"],
  ];
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) | 0;
  const [a, b] = palette[Math.abs(h) % palette.length];
  return `linear-gradient(135deg, ${a}, ${b})`;
}
function Avatar({ name, size = 36 }) {
  const initials = name.split(" ").map(s => s[0]).slice(0,2).join("").toUpperCase();
  return (
    <span className="avatar" style={{ width: size, height: size, fontSize: size * 0.42, background: avatarColor(name) }}>
      {initials}
    </span>
  );
}

Object.assign(window, { AdminIcon, Sidebar, Topbar, Drawer, Switch, Avatar, avatarColor });
