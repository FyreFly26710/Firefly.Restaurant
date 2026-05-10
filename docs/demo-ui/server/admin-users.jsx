// Admin: User management
const SAMPLE_USERS = [
  { id: "u1", name: "Mira Okafor",        email: "mira@emberandsalt.co",   role: "admin",  status: "active",   joined: "Mar 2021", lastOrder: "Yesterday",  orders: 142, spent: 4280, phone: "+44 7700 900118" },
  { id: "u2", name: "Jonas Whitford",     email: "jonas@emberandsalt.co",  role: "admin",  status: "active",   joined: "Mar 2021", lastOrder: "Tonight",    orders: 88,  spent: 2640, phone: "+44 7700 900119" },
  { id: "u3", name: "Idris Hadid",        email: "idris.h@example.com",    role: "staff",  status: "active",   joined: "Aug 2024", lastOrder: "—",          orders: 0,   spent: 0,    phone: "+44 7700 900201" },
  { id: "u4", name: "Saoirse Brennan",    email: "saoirse@example.com",    role: "guest",  status: "active",   joined: "Feb 2025", lastOrder: "2d ago",     orders: 14,  spent: 482,  phone: "+44 7700 900215" },
  { id: "u5", name: "Hugo Tremaine",      email: "h.tremaine@example.com", role: "guest",  status: "active",   joined: "Jan 2025", lastOrder: "1w ago",     orders: 9,   spent: 312,  phone: "+44 7700 900288" },
  { id: "u6", name: "Asa Morgenthau",     email: "asa.m@example.com",      role: "guest",  status: "vip",      joined: "Nov 2023", lastOrder: "Yesterday",  orders: 64,  spent: 2912, phone: "+44 7700 900377" },
  { id: "u7", name: "Lin Park",           email: "lin@example.com",        role: "guest",  status: "active",   joined: "Apr 2025", lastOrder: "3d ago",     orders: 6,   spent: 198,  phone: "+44 7700 900404" },
  { id: "u8", name: "Beatrix Vorne",      email: "beatrix@example.com",    role: "guest",  status: "active",   joined: "Sep 2024", lastOrder: "5d ago",     orders: 22,  spent: 760,  phone: "+44 7700 900512" },
  { id: "u9", name: "Caleb Stenhouse",    email: "caleb.s@example.com",    role: "guest",  status: "inactive", joined: "Jun 2024", lastOrder: "3mo ago",    orders: 3,   spent: 92,   phone: "+44 7700 900533" },
  { id: "u10", name: "Penelope Adesina",  email: "penny@example.com",      role: "staff",  status: "active",   joined: "Oct 2024", lastOrder: "1d ago",     orders: 11,  spent: 320,  phone: "+44 7700 900621" },
  { id: "u11", name: "Otis Larkspur",     email: "otis@example.com",       role: "guest",  status: "vip",      joined: "Jul 2023", lastOrder: "Yesterday",  orders: 78,  spent: 3104, phone: "+44 7700 900717" },
  { id: "u12", name: "Yusuf Kahale",      email: "yusuf.k@example.com",    role: "guest",  status: "active",   joined: "Mar 2025", lastOrder: "2d ago",     orders: 7,   spent: 254,  phone: "+44 7700 900822" },
];

function UsersAdmin() {
  const [users, setUsers] = React.useState(SAMPLE_USERS);
  const [filterRole, setFilterRole] = React.useState("all");
  const [editing, setEditing] = React.useState(null);
  const [inviteOpen, setInviteOpen] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const showToast = (m) => { setToast(m); setTimeout(() => setToast(null), 1800); };

  const filtered = React.useMemo(() => {
    return users.filter(u => filterRole === "all" || u.role === filterRole || (filterRole === "vip" && u.status === "vip"));
  }, [users, filterRole]);

  const roleCount = (r) => users.filter(u => u.role === r).length;
  const vipCount = users.filter(u => u.status === "vip").length;

  const updateUser = (u) => {
    setUsers(prev => prev.map(p => p.id === u.id ? u : p));
    showToast(`Updated ${u.name}`);
    setEditing(null);
  };
  const removeUser = (id) => {
    const u = users.find(x => x.id === id);
    setUsers(prev => prev.filter(p => p.id !== id));
    showToast(`Removed ${u.name}`);
    setEditing(null);
  };
  const addUser = (u) => {
    const id = "u" + Math.random().toString(36).slice(2, 6);
    setUsers(prev => [{ ...u, id, joined: "Just now", lastOrder: "—", orders: 0, spent: 0, status: "active" }, ...prev]);
    showToast(`Invited ${u.name}`);
    setInviteOpen(false);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <span className="eyebrow">— People · {users.length} accounts</span>
          <h2>Users.</h2>
          <p className="lede">
            Guests who've ordered, staff with kitchen access, and admins who can change
            the menu. Click a row to see history and adjust permissions.
          </p>
        </div>
        <div className="actions">
          <button className="btn-sm">Export CSV</button>
          <button className="btn-sm primary" onClick={() => setInviteOpen(true)}>
            <Icon.plus /> Invite user
          </button>
        </div>
      </div>

      <div className="toolbar">
        <div className="left">
          <div className="pill-group">
            <button className={filterRole==="all"?"active":""} onClick={()=>setFilterRole("all")}>All <span className="num">{users.length}</span></button>
            <button className={filterRole==="admin"?"active":""} onClick={()=>setFilterRole("admin")}>Admins <span className="num">{roleCount("admin")}</span></button>
            <button className={filterRole==="staff"?"active":""} onClick={()=>setFilterRole("staff")}>Staff <span className="num">{roleCount("staff")}</span></button>
            <button className={filterRole==="guest"?"active":""} onClick={()=>setFilterRole("guest")}>Guests <span className="num">{roleCount("guest")}</span></button>
            <button className={filterRole==="vip"?"active":""} onClick={()=>setFilterRole("vip")}>VIPs <span className="num">{vipCount}</span></button>
          </div>
        </div>
      </div>

      <div className="card">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <span className="ico">∅</span>
            <span className="ttl">No users match.</span>
            <span className="body">Try a different role filter, or clear the search.</span>
          </div>
        ) : (
          <table className="tbl">
            <thead>
              <tr>
                <th>Person</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Last order</th>
                <th className="right">Orders</th>
                <th className="right">Lifetime</th>
                <th className="right" style={{ width: 120 }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} onClick={()=>setEditing(u)}>
                  <td>
                    <div className="dish-cell">
                      <Avatar name={u.name} size={40} />
                      <div className="meta">
                        <span className="name" style={{ fontFamily: "var(--sans)", fontSize: 14, fontWeight: 500 }}>{u.name}</span>
                        <span className="desc" style={{ fontFamily: "var(--mono)", fontSize: 11 }}>{u.email}</span>
                      </div>
                    </div>
                  </td>
                  <td><span className={`pill ${u.role}`}>{u.role}</span></td>
                  <td>
                    <span className={`pill ${u.status === "vip" ? "gold" : u.status === "active" ? "live" : "off"}`}>
                      <span className="dot" />
                      {u.status}
                    </span>
                  </td>
                  <td className="tight"><span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{u.joined}</span></td>
                  <td className="tight"><span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{u.lastOrder}</span></td>
                  <td className="right price-mono">{u.orders}</td>
                  <td className="right price-mono">£{u.spent.toLocaleString()}</td>
                  <td className="right" onClick={(e)=>e.stopPropagation()}>
                    <div className="actions">
                      <button title="Edit" onClick={()=>setEditing(u)}><AdminIcon.edit /></button>
                      <button className="danger" title="Remove" onClick={()=>removeUser(u.id)}><AdminIcon.trash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editing && <UserDrawer user={editing} onClose={()=>setEditing(null)} onSave={updateUser} onDelete={()=>removeUser(editing.id)} />}
      {inviteOpen && <InviteDrawer onClose={()=>setInviteOpen(false)} onSave={addUser} />}

      {toast && (
        <div className="success-toast">
          <span className="dot" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

function UserDrawer({ user, onClose, onSave, onDelete }) {
  const [form, setForm] = React.useState(user);
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const activity = [
    { when: "Tonight",   what: <React.Fragment>Ordered <em>Lamb Shoulder</em> + 2 sides</React.Fragment>, amt: "£52.50" },
    { when: "Yesterday", what: <React.Fragment>Reordered <em>Pici al Ragù</em></React.Fragment>,           amt: "£28.00" },
    { when: "1w ago",    what: <React.Fragment>Joined <em>Wednesday list</em></React.Fragment>,            amt: "—" },
    { when: "2w ago",    what: <React.Fragment>Booked table for 4</React.Fragment>,                        amt: "Hold" },
    { when: "3w ago",    what: <React.Fragment>Ordered <em>Whole Branzino</em></React.Fragment>,           amt: "£44.20" },
  ];

  return (
    <Drawer
      open={true}
      onClose={onClose}
      title=""
      footer={
        <React.Fragment>
          <div className="left">
            <button className="btn-sm danger" onClick={onDelete}><AdminIcon.trash /> Remove</button>
          </div>
          <div style={{ display:"flex", gap: 10 }}>
            <button className="btn-sm" onClick={onClose}>Cancel</button>
            <button className="btn-sm primary" onClick={()=>onSave(form)}>Save changes</button>
          </div>
        </React.Fragment>
      }
    >
      <div className="user-detail-head" style={{ margin: "-22px -28px 0", padding: "8px 28px 22px" }}>
        <Avatar name={form.name} size={64} />
        <div className="info">
          <h3>{form.name}</h3>
          <span className="e">{form.email}</span>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          <span className={`pill ${form.role}`}>{form.role}</span>
          <span className={`pill ${form.status === "vip" ? "gold" : form.status === "active" ? "live" : "off"}`}><span className="dot" />{form.status}</span>
        </div>
      </div>

      <div className="user-stats" style={{ margin: "0 -28px" }}>
        <div className="stat"><div className="lbl">Lifetime spend</div><div className="v">£{form.spent.toLocaleString()}</div></div>
        <div className="stat"><div className="lbl">Orders</div><div className="v">{form.orders}</div></div>
        <div className="stat"><div className="lbl">Joined</div><div className="v" style={{ fontSize: 18 }}>{form.joined}</div></div>
      </div>

      <div className="field-group" style={{ marginTop: 22 }}>
        <div className="head">Profile</div>
        <div className="form-grid">
          <div className="field">
            <label>Full name</label>
            <input value={form.name} onChange={e=>upd("name", e.target.value)} />
          </div>
          <div className="field">
            <label>Email</label>
            <input value={form.email} onChange={e=>upd("email", e.target.value)} />
          </div>
          <div className="field">
            <label>Phone</label>
            <input value={form.phone} onChange={e=>upd("phone", e.target.value)} />
          </div>
          <div className="field">
            <label>Status</label>
            <select value={form.status} onChange={e=>upd("status", e.target.value)}>
              <option value="active">Active</option>
              <option value="vip">VIP</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field-group">
        <div className="head">Permissions</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { id: "guest", label: "Guest", body: "Can place orders, save addresses, see their own history." },
            { id: "staff", label: "Staff", body: "Can mark items unavailable and see today's tickets." },
            { id: "admin", label: "Admin", body: "Full access — menu, shop details, users, billing." },
          ].map(r => (
            <label key={r.id} style={{
              display: "flex", gap: 12, padding: "12px 14px",
              border: `1.5px solid ${form.role === r.id ? "var(--ember)" : "var(--rule)"}`,
              borderRadius: 10, cursor: "pointer",
              background: form.role === r.id ? "rgba(217,119,87,0.05)" : "#fff",
            }}>
              <input type="radio" name="role" checked={form.role === r.id} onChange={()=>upd("role", r.id)} style={{ marginTop: 3, accentColor: "var(--ember)" }}/>
              <div>
                <div style={{ fontSize: 14, color: "var(--ink)" }}>{r.label}</div>
                <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{r.body}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="field-group">
        <div className="head">Recent activity</div>
        <div className="activity-list">
          {activity.map((a, i) => (
            <div key={i} className="activity-row">
              <span className="when">{a.when}</span>
              <span className="what">{a.what}</span>
              <span className="amt">{a.amt}</span>
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
}

function InviteDrawer({ onClose, onSave }) {
  const [form, setForm] = React.useState({ name: "", email: "", phone: "", role: "guest" });
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const valid = form.name.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  return (
    <Drawer
      open={true}
      onClose={onClose}
      eyebrow="— Invite"
      title="Add a new user."
      footer={
        <React.Fragment>
          <div className="left" />
          <div style={{ display:"flex", gap: 10 }}>
            <button className="btn-sm" onClick={onClose}>Cancel</button>
            <button className="btn-sm primary" disabled={!valid} onClick={()=>onSave(form)} style={!valid?{opacity:0.5,cursor:"not-allowed"}:undefined}>
              Send invite
            </button>
          </div>
        </React.Fragment>
      }
    >
      <p style={{ color: "var(--ink-3)", fontSize: 14, marginTop: 0, marginBottom: 24 }}>
        We'll email them a one-tap link to set a password. Staff and admins can log in immediately;
        guests are welcome to skip the invite and just order.
      </p>

      <div className="form-grid">
        <div className="field full">
          <label>Full name</label>
          <input value={form.name} onChange={e=>upd("name", e.target.value)} placeholder="e.g. Mira Okafor" />
        </div>
        <div className="field full">
          <label>Email</label>
          <input value={form.email} onChange={e=>upd("email", e.target.value)} placeholder="name@example.com" />
        </div>
        <div className="field full">
          <label>Phone (optional)</label>
          <input value={form.phone} onChange={e=>upd("phone", e.target.value)} placeholder="+44 7700 900000" />
        </div>
      </div>

      <div className="field-group" style={{ marginTop: 8 }}>
        <div className="head">Role</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { id: "guest", label: "Guest" },
            { id: "staff", label: "Staff" },
            { id: "admin", label: "Admin" },
          ].map(r => (
            <label key={r.id} style={{
              display: "flex", gap: 12, padding: "12px 14px",
              border: `1.5px solid ${form.role === r.id ? "var(--ember)" : "var(--rule)"}`,
              borderRadius: 10, cursor: "pointer",
              background: form.role === r.id ? "rgba(217,119,87,0.05)" : "#fff",
            }}>
              <input type="radio" name="role" checked={form.role === r.id} onChange={()=>upd("role", r.id)} style={{ accentColor: "var(--ember)" }}/>
              <span style={{ fontSize: 14 }}>{r.label}</span>
            </label>
          ))}
        </div>
      </div>
    </Drawer>
  );
}

window.UsersAdmin = UsersAdmin;
