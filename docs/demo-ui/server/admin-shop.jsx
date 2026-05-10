// Admin: Shop details — manage home page content & contact info
const SHOP_DEFAULTS = {
  identity: {
    name: "Ember & Salt",
    tagline: "Wood-fired bistro & wine room",
    description: "A wood-fired bistro in the warehouse district. Open hearth, slow food, no pretense.",
  },
  hero: {
    eyebrow: "Open tonight · 17:00 – 23:00",
    headline_1: "Slow food,",
    headline_2: "open hearth,",
    headline_3: "no pretense.",
    lede: "Ember & Salt is a wood-fired bistro in the warehouse district. We cook over live fire, source from a few good farms, and let the ingredients do the talking.",
    cta_primary: "Order tonight",
    cta_secondary: "Find the room",
  },
  facts: [
    { label: "Est.", value: "2021" },
    { label: "Hearth temp", value: "740°F" },
    { label: "Producers", value: "14 within 50mi" },
    { label: "Tonight's special", value: "Lamb shoulder" },
    { label: "Lead time", value: "~ 35 min" },
  ],
  story: {
    eyebrow: "Our kitchen",
    headline_1: "A small room.",
    headline_2: "A real fire.",
    paragraph_1: "We started Ember & Salt in 2021 with a single oak-fired oven and a stubborn idea: that food cooked slowly, over real flame, tastes more honestly. Four years on, the room is small, the menu is short, and the fire has not gone out once.",
    paragraph_2: "The menu changes each Wednesday based on what arrives from the farms. Some weeks that means a whole lamb shoulder; some weeks it means an entire dinner built around heritage carrots. We write it on a chalkboard. Then we cook it.",
    signature: "Mira & Jonas",
    signature_role: "Owners & Chefs",
  },
  pillars: [
    { num: "01 / Sourced", title: "Fourteen farms within fifty miles", body: "We work directly with growers, butchers, and a single dayboat. Less of everything, more of what's good." },
    { num: "02 / Cooked",  title: "An oak-fired hearth, lit at noon",   body: "Every plate touches live flame. The oven runs at 740°F at peak service and goes cold around midnight." },
    { num: "03 / Served",  title: "An eight-course tasting, or à la carte", body: "Stay for one course or stay for the night. The wine list is short, mostly natural, and chosen to hold up to fire." },
  ],
  contact: {
    address_1: "118 Kiln Lane",
    address_2: "Warehouse District",
    address_3: "Manchester, M3 4LZ",
    phone: "0161 231 0118",
    email: "hello@emberandsalt.co",
  },
  hours: [
    { day: "Mon", open: "", close: "", closed: true },
    { day: "Tue", open: "17:00", close: "23:00", closed: false },
    { day: "Wed", open: "17:00", close: "23:00", closed: false },
    { day: "Thu", open: "17:00", close: "23:00", closed: false },
    { day: "Fri", open: "17:00", close: "24:00", closed: false },
    { day: "Sat", open: "12:00", close: "24:00", closed: false },
    { day: "Sun", open: "12:00", close: "22:00", closed: false },
  ],
  marquee: ["Wood-fired", "Slow-simmered", "Hand-rolled", "Open hearth", "From the farm"],
};

function ShopAdmin() {
  const [data, setData] = React.useState(SHOP_DEFAULTS);
  const [original] = React.useState(SHOP_DEFAULTS);
  const [savedAt, setSavedAt] = React.useState(null);
  const [activeSection, setActiveSection] = React.useState("identity");

  const dirty = JSON.stringify(data) !== JSON.stringify(original) && !savedAt;
  const upd = (path, val) => {
    setData(d => {
      const n = JSON.parse(JSON.stringify(d));
      const keys = path.split(".");
      let o = n; for (let i = 0; i < keys.length - 1; i++) o = o[keys[i]];
      o[keys[keys.length-1]] = val;
      return n;
    });
    setSavedAt(null);
  };
  const save = () => { setSavedAt(new Date()); };
  const revert = () => { setData(original); setSavedAt(null); };

  // Section refs for sticky nav
  const refs = {
    identity: React.useRef(), hero: React.useRef(), facts: React.useRef(),
    story: React.useRef(), pillars: React.useRef(), hours: React.useRef(),
    contact: React.useRef(), marquee: React.useRef(),
  };
  const scrollTo = (id) => {
    setActiveSection(id);
    const el = refs[id]?.current;
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" });
  };

  const sections = [
    { id: "identity", label: "Identity" },
    { id: "hero",     label: "Hero" },
    { id: "facts",    label: "Hero facts" },
    { id: "story",    label: "Our story" },
    { id: "pillars",  label: "Three pillars" },
    { id: "hours",    label: "Hours" },
    { id: "contact",  label: "Contact" },
    { id: "marquee",  label: "Marquee" },
  ];

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <span className="eyebrow">— Home page · Public-facing</span>
          <h2>Shop details.</h2>
          <p className="lede">
            All the words and numbers that appear on the front door. Save changes
            here and they update the home page within a minute.
          </p>
        </div>
        <div className="actions">
          <button className="btn-sm" onClick={() => window.alert("Open public site → home")}>
            <AdminIcon.ext /> Preview live
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 32, alignItems: "start" }}>
        <aside style={{ position: "sticky", top: 92, display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-3)", padding: "6px 12px", marginBottom: 8 }}>
            Sections
          </div>
          {sections.map(s => (
            <button key={s.id} onClick={() => scrollTo(s.id)}
              style={{
                textAlign: "left", padding: "9px 12px", borderRadius: 8,
                fontSize: 13, color: activeSection === s.id ? "var(--cream)" : "var(--ink-2)",
                background: activeSection === s.id ? "var(--ink)" : "transparent",
              }}>
              {s.label}
            </button>
          ))}
        </aside>

        <div className="shop-grid">
          {/* IDENTITY */}
          <div ref={refs.identity} className="card">
            <div className="card-head">
              <div>
                <h3>Identity</h3>
                <span className="sub">Name, tagline & meta description.</span>
              </div>
            </div>
            <div className="card-body">
              <div className="form-grid">
                <div className="field">
                  <label>Restaurant name</label>
                  <input value={data.identity.name} onChange={e=>upd("identity.name", e.target.value)} />
                </div>
                <div className="field">
                  <label>Tagline</label>
                  <input value={data.identity.tagline} onChange={e=>upd("identity.tagline", e.target.value)} />
                </div>
                <div className="field full">
                  <label>Meta description</label>
                  <textarea className="tx" value={data.identity.description} onChange={e=>upd("identity.description", e.target.value)} />
                  <span className="hint">Shows in search results and social cards.</span>
                </div>
              </div>
            </div>
          </div>

          {/* HERO */}
          <div ref={refs.hero} className="card">
            <div className="card-head">
              <div>
                <h3>Hero copy</h3>
                <span className="sub">The first thing people read. The big serif headline is broken into three lines — the middle one is set in italic ember.</span>
              </div>
            </div>
            <div className="card-body">
              <div className="form-grid">
                <div className="field full">
                  <label>Eyebrow line</label>
                  <input value={data.hero.eyebrow} onChange={e=>upd("hero.eyebrow", e.target.value)} />
                </div>
                <div className="field">
                  <label>Headline · line 1</label>
                  <input value={data.hero.headline_1} onChange={e=>upd("hero.headline_1", e.target.value)} />
                </div>
                <div className="field">
                  <label>Headline · line 2 (italic ember)</label>
                  <input value={data.hero.headline_2} onChange={e=>upd("hero.headline_2", e.target.value)} />
                </div>
                <div className="field full">
                  <label>Headline · line 3</label>
                  <input value={data.hero.headline_3} onChange={e=>upd("hero.headline_3", e.target.value)} />
                </div>
                <div className="field full">
                  <label>Lede paragraph</label>
                  <textarea className="tx" value={data.hero.lede} onChange={e=>upd("hero.lede", e.target.value)} />
                </div>
                <div className="field">
                  <label>Primary CTA</label>
                  <input value={data.hero.cta_primary} onChange={e=>upd("hero.cta_primary", e.target.value)} />
                </div>
                <div className="field">
                  <label>Secondary CTA</label>
                  <input value={data.hero.cta_secondary} onChange={e=>upd("hero.cta_secondary", e.target.value)} />
                </div>
              </div>

              <div className="field-group" style={{ marginTop: 24 }}>
                <div className="head">Hero image</div>
                <div className="dropzone">
                  <span className="ico">+</span>
                  <span className="label">Replace hero image</span>
                  <span className="hint">2400×1600 · wide-angle, hearth glow</span>
                </div>
              </div>
            </div>
          </div>

          {/* FACTS */}
          <div ref={refs.facts} className="card">
            <div className="card-head">
              <div>
                <h3>Hero facts</h3>
                <span className="sub">The five-line monospace strip beside the headline.</span>
              </div>
              <button className="btn-sm" onClick={()=>upd("facts", [...data.facts, { label: "New fact", value: "—" }])}>
                <Icon.plus /> Add fact
              </button>
            </div>
            <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {data.facts.map((f, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 36px", gap: 10, alignItems: "center" }}>
                  <input value={f.label} onChange={e=>{ const a=[...data.facts]; a[i]={...a[i],label:e.target.value}; upd("facts",a); }}
                    style={{ background:"#fff", border:"1px solid var(--rule-strong)", borderRadius:10, padding:"10px 14px", fontSize:14, fontFamily:"var(--mono)" }} />
                  <input value={f.value} onChange={e=>{ const a=[...data.facts]; a[i]={...a[i],value:e.target.value}; upd("facts",a); }}
                    style={{ background:"#fff", border:"1px solid var(--rule-strong)", borderRadius:10, padding:"10px 14px", fontSize:14 }} />
                  <button className="btn-sm icon-only danger" onClick={()=>upd("facts", data.facts.filter((_,j)=>j!==i))}>
                    <AdminIcon.trash />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* STORY */}
          <div ref={refs.story} className="card">
            <div className="card-head">
              <div>
                <h3>Our story</h3>
                <span className="sub">The narrative section beneath the marquee.</span>
              </div>
            </div>
            <div className="card-body">
              <div className="form-grid">
                <div className="field">
                  <label>Eyebrow</label>
                  <input value={data.story.eyebrow} onChange={e=>upd("story.eyebrow", e.target.value)} />
                </div>
                <div className="field"></div>
                <div className="field">
                  <label>Headline · line 1</label>
                  <input value={data.story.headline_1} onChange={e=>upd("story.headline_1", e.target.value)} />
                </div>
                <div className="field">
                  <label>Headline · line 2</label>
                  <input value={data.story.headline_2} onChange={e=>upd("story.headline_2", e.target.value)} />
                </div>
                <div className="field full">
                  <label>Paragraph 1</label>
                  <textarea className="tx" rows="4" value={data.story.paragraph_1} onChange={e=>upd("story.paragraph_1", e.target.value)} />
                </div>
                <div className="field full">
                  <label>Paragraph 2</label>
                  <textarea className="tx" rows="4" value={data.story.paragraph_2} onChange={e=>upd("story.paragraph_2", e.target.value)} />
                </div>
                <div className="field">
                  <label>Signature</label>
                  <input value={data.story.signature} onChange={e=>upd("story.signature", e.target.value)} />
                </div>
                <div className="field">
                  <label>Signature role</label>
                  <input value={data.story.signature_role} onChange={e=>upd("story.signature_role", e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          {/* PILLARS */}
          <div ref={refs.pillars} className="card">
            <div className="card-head">
              <div>
                <h3>Three pillars</h3>
                <span className="sub">Cards on the home page. Keep the bodies short — two lines max.</span>
              </div>
            </div>
            <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {data.pillars.map((p, i) => (
                <div key={i} style={{ padding: 18, background: "var(--cream)", border: "1px solid var(--rule)", borderRadius: 12 }}>
                  <div className="form-grid">
                    <div className="field">
                      <label>Number / label</label>
                      <input value={p.num} onChange={e=>{ const a=[...data.pillars]; a[i]={...a[i],num:e.target.value}; upd("pillars",a); }} />
                    </div>
                    <div className="field">
                      <label>Title</label>
                      <input value={p.title} onChange={e=>{ const a=[...data.pillars]; a[i]={...a[i],title:e.target.value}; upd("pillars",a); }} />
                    </div>
                    <div className="field full">
                      <label>Body</label>
                      <textarea className="tx" value={p.body} onChange={e=>{ const a=[...data.pillars]; a[i]={...a[i],body:e.target.value}; upd("pillars",a); }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HOURS */}
          <div ref={refs.hours} className="card">
            <div className="card-head">
              <div>
                <h3>Opening hours</h3>
                <span className="sub">Today's row gets highlighted automatically on the contact section.</span>
              </div>
            </div>
            <div className="card-body">
              {data.hours.map((h, i) => (
                <div key={h.day} className="hours-row">
                  <span className="day">{h.day}</span>
                  <input className="field-inline" disabled={h.closed} placeholder="17:00"
                    value={h.open} onChange={e=>{ const a=[...data.hours]; a[i]={...a[i],open:e.target.value}; upd("hours",a); }} />
                  <input className="field-inline" disabled={h.closed} placeholder="23:00"
                    value={h.close} onChange={e=>{ const a=[...data.hours]; a[i]={...a[i],close:e.target.value}; upd("hours",a); }} />
                  <label className="closed-toggle">
                    Closed
                    <Switch on={h.closed} onChange={(v)=>{ const a=[...data.hours]; a[i]={...a[i],closed:v}; upd("hours",a); }} />
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div ref={refs.contact} className="card">
            <div className="card-head">
              <div>
                <h3>Contact</h3>
                <span className="sub">Address, phone & email shown in the dark contact band.</span>
              </div>
            </div>
            <div className="card-body">
              <div className="form-grid">
                <div className="field full">
                  <label>Address — line 1</label>
                  <input value={data.contact.address_1} onChange={e=>upd("contact.address_1", e.target.value)} />
                </div>
                <div className="field">
                  <label>Address — line 2</label>
                  <input value={data.contact.address_2} onChange={e=>upd("contact.address_2", e.target.value)} />
                </div>
                <div className="field">
                  <label>Address — line 3</label>
                  <input value={data.contact.address_3} onChange={e=>upd("contact.address_3", e.target.value)} />
                </div>
                <div className="field">
                  <label>Phone</label>
                  <input value={data.contact.phone} onChange={e=>upd("contact.phone", e.target.value)} />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input value={data.contact.email} onChange={e=>upd("contact.email", e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          {/* MARQUEE */}
          <div ref={refs.marquee} className="card">
            <div className="card-head">
              <div>
                <h3>Scrolling marquee</h3>
                <span className="sub">Each phrase scrolls past, separated by ember stars.</span>
              </div>
              <button className="btn-sm" onClick={()=>upd("marquee", [...data.marquee, "New phrase"])}>
                <Icon.plus /> Add phrase
              </button>
            </div>
            <div className="card-body">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {data.marquee.map((m, i) => (
                  <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid var(--rule)", borderRadius: 999, padding: "6px 6px 6px 14px" }}>
                    <input value={m}
                      onChange={e=>{ const a=[...data.marquee]; a[i]=e.target.value; upd("marquee",a); }}
                      style={{ border: 0, outline: "none", background: "none", fontFamily: "var(--serif)", fontSize: 18, width: `${Math.max(8, m.length+1)}ch` }} />
                    <button onClick={()=>upd("marquee", data.marquee.filter((_,j)=>j!==i))}
                      style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--cream-2)", color: "var(--ink-3)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`save-bar ${dirty?"dirty":savedAt?"saved":""}`}>
            <div className="status">
              <span className="dot" />
              <span>
                {dirty ? "Unsaved changes" : savedAt ? `Saved at ${savedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "All changes saved"}
              </span>
            </div>
            <div className="actions">
              <button className="btn-sm" onClick={revert} disabled={!dirty}>Revert</button>
              <button className="btn-sm primary" onClick={save} disabled={!dirty}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.ShopAdmin = ShopAdmin;
