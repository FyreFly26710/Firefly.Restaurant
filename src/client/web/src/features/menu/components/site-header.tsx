export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header-row">
        <a className="brand" href="/menu" aria-label="Firefly Restaurant menu">
          <span className="brand-mark" aria-hidden="true">
            F
          </span>
          <span>Firefly Restaurant</span>
        </a>
        <nav aria-label="Primary navigation">
          <a className="nav-link" href="/menu" aria-current="page">
            Menu
          </a>
        </nav>
      </div>
    </header>
  );
}
