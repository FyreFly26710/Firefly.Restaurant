import Link from "next/link";

type SiteHeaderProps = {
  currentPage: "home" | "menu";
};

const navItems = [
  { href: "/", label: "Home", page: "home" },
  { href: "/menu", label: "Menu", page: "menu" },
] as const;

export function SiteHeader({ currentPage }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="container site-header-row">
        <Link className="brand" href="/" aria-label="Firefly Restaurant home">
          <span className="brand-mark" aria-hidden="true">
            F
          </span>
          <span>Firefly Restaurant</span>
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              className="nav-link"
              href={item.href}
              key={item.page}
              aria-current={currentPage === item.page ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
