// Admin: Menu items management
const SWATCHES = ["#C8704A", "#D9B68A", "#E8DCC8", "#A8C29B", "#C9B0A8", "#E0CDB0", "#B89B7E", "#A8763E"];
function swatchFor(id) {
  let h = 0; for (const c of id || "") h = (h * 31 + c.charCodeAt(0)) | 0;
  return SWATCHES[Math.abs(h) % SWATCHES.length];
}

function MenuAdmin() {
  const cats = window.MENU_CATEGORIES;
  const [items, setItems] = React.useState(() =>
    window.MENU_ITEMS.map(i => ({ ...i, available: true, updated: "2d ago" }))
  );
  const [search, setSearch] = React.useState("");
  const [filterCat, setFilterCat] = React.useState("all");
  const [selected, setSelected] = React.useState(new Set());
  const [editing, setEditing] = React.useState(null); // item or "new"
  const [toast, setToast] = React.useState(null);

  const showToast = (m) => { setToast(m); setTimeout(() => setToast(null), 1800); };

  const filtered = React.useMemo(() => {
    const t = search.trim().toLowerCase();
    return items.filter(i =>
      (filterCat === "all" || i.cat === filterCat) &&
      (!t || i.name.toLowerCase().includes(t) || i.desc.toLowerCase().includes(t))
    );
  }, [items, search, filterCat]);

  const allSelected = filtered.length > 0 && filtered.every(i => selected.has(i.id));
  const toggleAll = () => {
    const n = new Set(selected);
    if (allSelected) filtered.forEach(i => n.delete(i.id));
    else filtered.forEach(i => n.add(i.id));
    setSelected(n);
  };
  const toggleOne = (id) => {
    const n = new Set(selected);
    n.has(id) ? n.delete(id) : n.add(id);
    setSelected(n);
  };

  const saveItem = (it) => {
    if (it.id) {
      setItems(prev => prev.map(p => p.id === it.id ? { ...it, updated: "Just now" } : p));
      showToast(`Saved "${it.name}"`);
    } else {
      const id = "x" + Math.random().toString(36).slice(2, 6);
      setItems(prev => [{ ...it, id, updated: "Just now" }, ...prev]);
      showToast(`Added "${it.name}"`);
    }
    setEditing(null);
  };
  const removeItem = (id) => {
    const it = items.find(i => i.id === id);
    setItems(prev => prev.filter(p => p.id !== id));
    setSelected(s => { const n = new Set(s); n.delete(id); return n; });
    showToast(`Removed "${it.name}"`);
  };
  const duplicateItem = (id) => {
    const src = items.find(i => i.id === id);
    const copy = { ...src, id: "x" + Math.random().toString(36).slice(2, 6), name: src.name + " (copy)", updated: "Just now" };
    setItems(prev => [copy, ...prev]);
    showToast(`Duplicated "${src.name}"`);
  };
  const toggleAvail = (id) => {
    setItems(prev => prev.map(p => p.id === id ? { ...p, available: !p.available, updated: "Just now" } : p));
  };
  const bulkRemove = () => {
    setItems(prev => prev.filter(p => !selected.has(p.id)));
    showToast(`Removed ${selected.size} items`);
    setSelected(new Set());
  };
  const bulkAvail = (on) => {
    setItems(prev => prev.map(p => selected.has(p.id) ? { ...p, available: on, updated: "Just now" } : p));
    showToast(`Marked ${selected.size} as ${on ? "available" : "unavailable"}`);
  };

  const counts = React.useMemo(() => {
    const c = { all: items.length };
    cats.forEach(cat => c[cat.id] = items.filter(i => i.cat === cat.id).length);
    return c;
  }, [items]);

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <span className="eyebrow">— Catalogue · Updated each Wednesday</span>
          <h2>Menu items.</h2>
          <p className="lede">
            Add, edit and pull dishes from the chalkboard. Changes here go live to the
            menu page and the home feature strip immediately.
          </p>
        </div>
        <div className="actions">
          <button className="btn-sm">Import CSV</button>
          <button className="btn-sm primary" onClick={() => setEditing("new")}>
            <Icon.plus /> New item
          </button>
        </div>
      </div>

      <div className="toolbar">
        <div className="left">
          <div className="pill-group">
            <button className={filterCat==="all"?"active":""} onClick={()=>setFilterCat("all")}>
              All <span className="num">{counts.all}</span>
            </button>
            {cats.map(cat => (
              <button key={cat.id} className={filterCat===cat.id?"active":""} onClick={()=>setFilterCat(cat.id)}>
                {cat.label} <span className="num">{counts[cat.id]}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="right">
          <button className="btn-sm" onClick={()=>setCatsEditing(true)}><AdminIcon.edit /> Edit categories</button>
          <button className="btn-sm">Sort: A–Z</button>
        </div>
      </div>

      <div className="card">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <span className="ico">∅</span>
            <span className="ttl">Nothing on the chalkboard.</span>
            <span className="body">Try a different category, or add a new item to begin.</span>
            <button className="btn-sm primary" style={{ marginTop: 12 }} onClick={() => setEditing("new")}>
              <Icon.plus /> New item
            </button>
          </div>
        ) : (
          <table className="tbl">
            <thead>
              <tr>
                <th style={{ width: 36 }}>
                  <span className={`checkbox ${allSelected?"checked":""}`} onClick={(e)=>{e.stopPropagation();toggleAll();}}>
                    {allSelected && <AdminIcon.check />}
                  </span>
                </th>
                <th>Dish</th>
                <th>Category</th>
                <th>Tags</th>
                <th className="right">Price</th>
                <th>Available</th>
                <th>Updated</th>
                <th className="right" style={{ width: 120 }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(it => {
                const cat = cats.find(c => c.id === it.cat);
                const isSel = selected.has(it.id);
                return (
                  <tr key={it.id} className={isSel ? "selected" : ""} onClick={() => setEditing(it)}>
                    <td onClick={(e)=>e.stopPropagation()}>
                      <span className={`checkbox ${isSel?"checked":""}`} onClick={()=>toggleOne(it.id)}>
                        {isSel && <AdminIcon.check />}
                      </span>
                    </td>
                    <td>
                      <div className="dish-cell">
                        <div className="swatch" style={{ "--swatch": swatchFor(it.id) }} />
                        <div className="meta">
                          <span className="name">{it.name}</span>
                          <span className="desc">{it.desc}</span>
                        </div>
                      </div>
                    </td>
                    <td><span className="pill">{cat?.label || it.cat}</span></td>
                    <td>
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {(it.tags || []).map(t => (
                          <span key={t} className={`tag ${t}`}>{t === "v" ? "Veg" : t === "gf" ? "GF" : t}</span>
                        ))}
                        {!(it.tags||[]).length && <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)" }}>—</span>}
                      </div>
                    </td>
                    <td className="right price-mono">£{it.price.toFixed(2)}</td>
                    <td onClick={(e)=>e.stopPropagation()}>
                      <Switch on={it.available} onChange={()=>toggleAvail(it.id)} />
                    </td>
                    <td className="tight">
                      <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.08em" }}>{it.updated}</span>
                    </td>
                    <td className="right" onClick={(e)=>e.stopPropagation()}>
                      <div className="actions">
                        <button title="Edit" onClick={()=>setEditing(it)}><AdminIcon.edit /></button>
                        <button title="Duplicate" onClick={()=>duplicateItem(it.id)}><AdminIcon.copy /></button>
                        <button className="danger" title="Delete" onClick={()=>removeItem(it.id)}><AdminIcon.trash /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {selected.size > 0 && (
        <div className="bulk-bar">
          <span className="count">{selected.size} selected</span>
          <span className="sep" />
          <button onClick={()=>bulkAvail(true)}>Mark available</button>
          <button onClick={()=>bulkAvail(false)}>Mark unavailable</button>
          <button className="danger" onClick={bulkRemove}>Delete</button>
          <button onClick={()=>setSelected(new Set())} style={{ background: "transparent" }}>Clear</button>
        </div>
      )}

      <ItemDrawer
        open={!!editing}
        item={editing === "new" ? null : editing}
        onClose={() => setEditing(null)}
        onSave={saveItem}
        onDelete={editing && editing !== "new" ? () => { removeItem(editing.id); setEditing(null); } : null}
      />

      {toast && (
        <div className="success-toast">
          <span className="dot" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

function ItemDrawer({ open, item, cats, existingIds = [], onClose, onSave, onDelete }) {
  const isNew = !item;
  const blank = () => ({ id: "", name: "", cat: cats[0]?.id || "", desc: "", price: 0, tags: [], available: true });
  const [form, setForm] = React.useState(() => item ? { ...item } : blank());
  const [originalId] = [item?.id];
  React.useEffect(() => {
    setForm(item ? { ...item } : blank());
  }, [item, open]);

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleTag = (t) => upd("tags", (form.tags||[]).includes(t)
    ? form.tags.filter(x => x !== t)
    : [...(form.tags||[]), t]);

  const slug = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const idCollision = !!form.id && form.id !== originalId && existingIds.includes(form.id);
  const idValid = !!form.id && /^[a-z0-9-]+$/.test(form.id) && !idCollision;
  const valid = form.name.trim().length > 1 && form.price > 0 && idValid;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      eyebrow={isNew ? "— New dish" : "— Edit dish"}
      title={isNew ? "Add to the chalkboard." : form.name || "—"}
      footer={
        <React.Fragment>
          <div className="left">
            {onDelete && <button className="btn-sm danger" onClick={onDelete}><AdminIcon.trash /> Delete</button>}
          </div>
          <div style={{ display:"flex", gap: 10 }}>
            <button className="btn-sm" onClick={onClose}>Cancel</button>
            <button className="btn-sm primary" disabled={!valid} onClick={() => onSave(form, originalId)} style={!valid?{opacity:0.5,cursor:"not-allowed"}:undefined}>
              {isNew ? "Add dish" : "Save changes"}
            </button>
          </div>
        </React.Fragment>
      }
    >
      <div className="field-group">
        <div className="head">Photo</div>
        <div className="dropzone" style={item ? { background: `repeating-linear-gradient(45deg, rgba(31,27,22,0.06) 0 1px, transparent 1px 12px), ${swatchFor(item.id)}`, minHeight: 140 } : undefined}>
          {item ? (
            <div style={{ alignSelf: "flex-end", justifySelf: "flex-end", marginTop: "auto" }}>
              <span className="pill" style={{ background: "rgba(31,27,22,0.7)", color: "var(--cream)" }}>Replace photo</span>
            </div>
          ) : (
            <React.Fragment>
              <span className="ico">+</span>
              <span className="label">Drop a photo here, or click to upload</span>
              <span className="hint">Best at 1600×1200 · jpg or webp</span>
            </React.Fragment>
          )}
        </div>
      </div>

      <div className="field-group">
        <div className="head">Details</div>
        <div className="form-grid">
          <div className="field full">
            <label>Dish name</label>
            <input value={form.name} onChange={e=>{
              const next = e.target.value;
              setForm(f => ({ ...f, name: next, id: (!f.id || f.id === slug(f.name)) ? slug(next) : f.id }));
            }} placeholder="e.g. Lamb Shoulder" />
          </div>
          <div className="field full">
            <label>ID <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.08em", textTransform: "uppercase", marginLeft: 6 }}>slug · lowercase, dashes</span></label>
            <input value={form.id || ""} onChange={e=>upd("id", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))} placeholder="lamb-shoulder"
              style={{ fontFamily: "var(--mono)", borderColor: idCollision ? "#c0392b" : undefined }} />
            <span className="hint" style={idCollision ? { color: "#c0392b" } : undefined}>
              {idCollision ? "That ID is already in use." : "Used in URLs and integrations. Auto-fills from the dish name."}
            </span>
          </div>
          <div className="field full">
            <label>Description</label>
            <textarea className="tx" value={form.desc} onChange={e=>upd("desc", e.target.value)} placeholder="One short line that reads well on the chalkboard." />
            <span className="hint">{form.desc.length} / 140 characters</span>
          </div>
          <div className="field">
            <label>Category</label>
            <select value={form.cat} onChange={e=>upd("cat", e.target.value)}>
              {cats.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Price (£)</label>
            <input type="number" step="0.50" min="0" value={form.price} onChange={e=>upd("price", parseFloat(e.target.value)||0)} />
          </div>
        </div>
      </div>

      <div className="field-group">
        <div className="head">Dietary tags</div>
        <div className="tag-picker">
          {[
            { id: "v", label: "Vegetarian" },
            { id: "gf", label: "Gluten-free" },
            { id: "vg", label: "Vegan" },
            { id: "df", label: "Dairy-free" },
            { id: "n", label: "Contains nuts" },
            { id: "spicy", label: "Spicy" },
          ].map(t => {
            const on = (form.tags||[]).includes(t.id);
            return (
              <button key={t.id} className={`${on?"on":""} ${t.id}`} onClick={()=>toggleTag(t.id)}>
                {on && <AdminIcon.check />} {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="field-group">
        <div className="head">Availability</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "#fff", border: "1px solid var(--rule)", borderRadius: 10 }}>
          <div>
            <div style={{ fontSize: 14, color: "var(--ink)" }}>Live on the menu</div>
            <div style={{ fontSize: 12, color: "var(--ink-3)" }}>Toggle off if you've run out tonight.</div>
          </div>
          <Switch on={form.available} onChange={(v)=>upd("available", v)} />
        </div>
      </div>
    </Drawer>
  );
}

function CategoriesDrawer({ open, cats, items, onClose, onSave }) {
  const [rows, setRows] = React.useState(() => cats.map(c => ({ ...c, originalId: c.id })));
  React.useEffect(() => { setRows(cats.map(c => ({ ...c, originalId: c.id }))); }, [cats, open]);

  const slug = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const update = (i, k, v) => setRows(r => r.map((x, j) => j === i ? { ...x, [k]: v } : x));
  const remove = (i) => setRows(r => r.filter((_, j) => j !== i));
  const add = () => setRows(r => [...r, { id: "", label: "", originalId: null }]);

  const itemCount = (catId) => items.filter(it => it.cat === catId).length;
  const ids = rows.map(r => r.id);
  const dupes = ids.filter((x, i) => x && ids.indexOf(x) !== i);
  const valid = rows.every(r => r.id && r.label && /^[a-z0-9-]+$/.test(r.id)) && dupes.length === 0;

  const save = () => {
    const idMap = {};
    rows.forEach(r => { if (r.originalId && r.originalId !== r.id) idMap[r.originalId] = r.id; });
    onSave(rows.map(({ originalId, ...rest }) => rest), idMap);
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      eyebrow="— Catalogue"
      title="Edit categories."
      footer={
        <React.Fragment>
          <div className="left" />
          <div style={{ display:"flex", gap: 10 }}>
            <button className="btn-sm" onClick={onClose}>Cancel</button>
            <button className="btn-sm primary" disabled={!valid} onClick={save} style={!valid?{opacity:0.5,cursor:"not-allowed"}:undefined}>Save categories</button>
          </div>
        </React.Fragment>
      }
    >
      <p style={{ color: "var(--ink-3)", fontSize: 14, marginTop: 0, marginBottom: 20 }}>
        Rename a category and every dish keeps its place. Delete a category and you'll need to reassign its dishes first.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {rows.map((r, i) => {
          const count = r.originalId ? itemCount(r.originalId) : 0;
          const blocked = count > 0;
          return (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 90px 36px", gap: 10, alignItems: "center", padding: 10, background: "#fff", border: "1px solid var(--rule)", borderRadius: 10 }}>
              <div className="field" style={{ marginBottom: 0 }}>
                <input value={r.label} placeholder="Category label"
                  onChange={e=>{
                    const next = e.target.value;
                    setRows(rs => rs.map((x, j) => j === i ? { ...x, label: next, id: (!x.id || x.id === slug(x.label)) ? slug(next) : x.id } : x));
                  }} />
              </div>
              <div className="field" style={{ marginBottom: 0 }}>
                <input value={r.id} placeholder="slug-id" style={{ fontFamily: "var(--mono)" }}
                  onChange={e=>update(i, "id", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))} />
              </div>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.08em", textTransform: "uppercase", textAlign: "center" }}>
                {count} dish{count === 1 ? "" : "es"}
              </span>
              <button className="btn-sm icon-only danger" disabled={blocked} title={blocked ? "Reassign dishes first" : "Delete"}
                style={blocked ? { opacity: 0.4, cursor: "not-allowed" } : undefined}
                onClick={()=>!blocked && remove(i)}>
                <AdminIcon.trash />
              </button>
            </div>
          );
        })}
      </div>

      <button className="btn-sm" style={{ marginTop: 14 }} onClick={add}><Icon.plus /> Add category</button>

      {dupes.length > 0 && (
        <p style={{ color: "#c0392b", fontSize: 12, marginTop: 16 }}>Duplicate IDs: {[...new Set(dupes)].join(", ")}</p>
      )}
    </Drawer>
  );
}

window.MenuAdmin = MenuAdmin;
