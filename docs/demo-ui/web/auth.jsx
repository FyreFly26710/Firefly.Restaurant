// Auth pages: Login & Register
function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path fill="#4285F4" d="M15.7 8.18c0-.6-.05-1.18-.15-1.73H8v3.27h4.32c-.18 1-.75 1.86-1.6 2.43v2.02h2.6c1.5-1.4 2.38-3.45 2.38-5.99Z"/>
      <path fill="#34A853" d="M8 16c2.16 0 3.97-.72 5.3-1.94l-2.6-2.02c-.72.48-1.63.77-2.7.77-2.07 0-3.83-1.4-4.46-3.28H.86v2.07A8 8 0 0 0 8 16Z"/>
      <path fill="#FBBC05" d="M3.54 9.53A4.8 4.8 0 0 1 3.28 8c0-.53.1-1.05.26-1.53V4.4H.86A8 8 0 0 0 0 8c0 1.29.31 2.51.86 3.6l2.68-2.07Z"/>
      <path fill="#EA4335" d="M8 3.18c1.17 0 2.22.4 3.05 1.2l2.29-2.3A8 8 0 0 0 .86 4.4l2.68 2.07C4.17 4.58 5.93 3.18 8 3.18Z"/>
    </svg>
  );
}
function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M11.18 8.5c0-1.86 1.52-2.75 1.59-2.79-.87-1.27-2.22-1.45-2.7-1.46-1.15-.12-2.24.68-2.83.68-.6 0-1.5-.66-2.46-.65-1.27.02-2.44.74-3.1 1.86-1.32 2.3-.34 5.69.95 7.55.63.91 1.38 1.93 2.36 1.9.95-.04 1.31-.62 2.46-.62s1.47.62 2.47.6c1.02-.02 1.67-.94 2.3-1.85.71-1.06 1.01-2.1 1.03-2.16-.02 0-1.97-.76-2-3.06ZM9.34 3.04c.52-.63.87-1.51.78-2.39-.75.03-1.66.5-2.2 1.13-.49.55-.92 1.45-.8 2.32.84.07 1.7-.43 2.22-1.06Z"/>
    </svg>
  );
}

function AsideContent({ kind }) {
  if (kind === "register") {
    return (
      <React.Fragment>
        <div className="top">
          <a href="#" onClick={(e)=>{e.preventDefault();window.__app_setRoute("home");}}>
            <Brand />
          </a>
          <h2>Join the<br/><em>chalkboard</em><br/>list.</h2>
        </div>
        <div className="bottom">
          <div className="perks">
            <div className="perk"><span className="check">✓</span>Save your favourite orders for one-tap reorder.</div>
            <div className="perk"><span className="check">✓</span>First look at Wednesday's new menu.</div>
            <div className="perk"><span className="check">✓</span>Priority on Friday booking releases.</div>
            <div className="perk"><span className="check">✓</span>£5 off your first order over £30.</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <div className="top">
        <a href="#" onClick={(e)=>{e.preventDefault();window.__app_setRoute("home");}}>
          <Brand />
        </a>
        <h2>Welcome<br/>back to the<br/><em>warm room</em>.</h2>
      </div>
      <div className="bottom">
        <p className="quote">
          “Some places feed you. A few places remember what you ordered last time,
          and pour you the same wine without asking.”
          <span className="att">— Manchester Evening, 2025</span>
        </p>
      </div>
    </React.Fragment>
  );
}

function LoginPage({ setRoute, onLogin }) {
  const [email, setEmail] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [err, setErr] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Looks like that's not a valid email.";
    if (pw.length < 6) errs.pw = "Password must be at least 6 characters.";
    setErr(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    setTimeout(() => {
      onLogin({ firstName: email.split("@")[0].split(/[._]/)[0].replace(/^./, c=>c.toUpperCase()), email });
      setLoading(false);
    }, 700);
  };

  return (
    <div className="auth-page">
      <aside className="auth-aside">
        <AsideContent kind="login" />
      </aside>
      <div className="auth-form">
        <span className="eyebrow">— Returning guest</span>
        <h1>Log in.</h1>
        <p className="sub">Pick up where you left off — your past orders are saved.</p>

        <form onSubmit={submit} noValidate>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
            {err.email && <span className="err">{err.email}</span>}
          </div>
          <div className="field">
            <label htmlFor="pw">Password</label>
            <input id="pw" type="password" placeholder="••••••••" value={pw} onChange={(e)=>setPw(e.target.value)} />
            {err.pw && <span className="err">{err.pw}</span>}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <label className="checkbox" style={{ margin: 0 }}>
              <input type="checkbox" defaultChecked /> Keep me signed in
            </label>
            <a href="#" style={{ fontSize: 13, color: "var(--ember)" }} onClick={(e)=>e.preventDefault()}>Forgot password?</a>
          </div>
          <button type="submit" className="btn btn--ink btn--block btn--lg" disabled={loading}>
            {loading ? "Signing in…" : <React.Fragment>Log in <Icon.arrow /></React.Fragment>}
          </button>

          <div className="divider">or</div>
          <div className="social-row">
            <button type="button" className="social-btn"><GoogleIcon /> Google</button>
            <button type="button" className="social-btn"><AppleIcon /> Apple</button>
          </div>

          <div className="alt-link">
            New around here? <a href="#" onClick={(e)=>{e.preventDefault();setRoute("register");}}>Create an account</a>
          </div>
        </form>
      </div>
    </div>
  );
}

function RegisterPage({ setRoute, onLogin }) {
  const [form, setForm] = React.useState({ firstName: "", lastName: "", email: "", pw: "", phone: "" });
  const [err, setErr] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [agree, setAgree] = React.useState(false);

  const upd = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (form.firstName.trim().length < 2) errs.firstName = "Tell us your first name.";
    if (form.lastName.trim().length < 2)  errs.lastName  = "And your last name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Looks like that's not a valid email.";
    if (form.pw.length < 8) errs.pw = "Use at least 8 characters.";
    if (!/^[\d\s+()-]{7,}$/.test(form.phone)) errs.phone = "Use digits, spaces, +, -, ( or ).";
    if (!agree) errs.agree = "Please agree to continue.";
    setErr(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    setTimeout(() => {
      onLogin({ firstName: form.firstName, email: form.email });
      setLoading(false);
    }, 800);
  };

  // Password strength meter
  const pwStrength = React.useMemo(() => {
    const p = form.pw;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/\d/.test(p))    s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  }, [form.pw]);
  const strengthLabel = ["Weak", "Weak", "Fair", "Good", "Strong"][pwStrength];
  const strengthColor = ["var(--rule-strong)", "#C45A4A", "#D9A357", "#7BAA68", "var(--olive)"][pwStrength];

  return (
    <div className="auth-page">
      <aside className="auth-aside">
        <AsideContent kind="register" />
      </aside>
      <div className="auth-form">
        <span className="eyebrow">— New guest</span>
        <h1>Create an account.</h1>
        <p className="sub">A minute now, faster checkout next time. We'll never share your details.</p>

        <form onSubmit={submit} noValidate>
          <div className="row-2">
            <div className="field">
              <label htmlFor="fn">First name</label>
              <input id="fn" value={form.firstName} onChange={upd("firstName")} placeholder="Mira" />
              {err.firstName && <span className="err">{err.firstName}</span>}
            </div>
            <div className="field">
              <label htmlFor="ln">Last name</label>
              <input id="ln" value={form.lastName} onChange={upd("lastName")} placeholder="Okafor" />
              {err.lastName && <span className="err">{err.lastName}</span>}
            </div>
          </div>
          <div className="field">
            <label htmlFor="em">Email</label>
            <input id="em" type="email" value={form.email} onChange={upd("email")} placeholder="mira@example.com" />
            {err.email && <span className="err">{err.email}</span>}
          </div>
          <div className="field">
            <label htmlFor="ph">Phone</label>
            <input id="ph" type="tel" value={form.phone} onChange={upd("phone")} placeholder="+44 7700 900123" />
            <span className="hint">For delivery updates only.</span>
            {err.phone && <span className="err">{err.phone}</span>}
          </div>
          <div className="field">
            <label htmlFor="pw2">Password</label>
            <input id="pw2" type="password" value={form.pw} onChange={upd("pw")} placeholder="At least 8 characters" />
            {form.pw.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
                <div style={{ flex: 1, height: 4, background: "var(--cream-2)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ width: `${(pwStrength / 4) * 100}%`, height: "100%", background: strengthColor, transition: "width .2s ease, background .2s ease" }} />
                </div>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: strengthColor, letterSpacing: ".1em", textTransform: "uppercase" }}>{strengthLabel}</span>
              </div>
            )}
            {err.pw && <span className="err">{err.pw}</span>}
          </div>

          <label className="checkbox">
            <input type="checkbox" checked={agree} onChange={(e)=>setAgree(e.target.checked)} />
            I agree to the <a href="#" onClick={(e)=>e.preventDefault()} style={{ color: "var(--ember)", textDecoration: "underline", textUnderlineOffset: 3 }}>terms</a> &amp; <a href="#" onClick={(e)=>e.preventDefault()} style={{ color: "var(--ember)", textDecoration: "underline", textUnderlineOffset: 3 }}>privacy notice</a>.
          </label>
          {err.agree && <span className="err" style={{ display: "block", marginTop: -16, marginBottom: 16 }}>{err.agree}</span>}

          <button type="submit" className="btn btn--primary btn--block btn--lg" disabled={loading}>
            {loading ? "Creating account…" : <React.Fragment>Create account <Icon.arrow /></React.Fragment>}
          </button>

          <div className="alt-link">
            Already have an account? <a href="#" onClick={(e)=>{e.preventDefault();setRoute("login");}}>Log in</a>
          </div>
        </form>
      </div>
    </div>
  );
}

window.LoginPage = LoginPage;
window.RegisterPage = RegisterPage;
