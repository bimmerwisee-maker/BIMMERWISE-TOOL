import Link from "next/link";

export function AppShell({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: "home" | "book" | "track" | "admin";
}) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link href="/" className="brand" aria-label="BimmerWise home">
          <span className="brand-mark" aria-hidden />
          <span className="brand-text">
            Bimmer<span>Wise</span>
          </span>
        </Link>
        <nav className="topnav" aria-label="Primary">
          <Link href="/book" className={active === "book" ? "active" : undefined}>
            Book
          </Link>
          <Link href="/track" className={active === "track" ? "active" : undefined}>
            Track
          </Link>
          <Link href="/admin" className={active === "admin" ? "active" : undefined}>
            Shop
          </Link>
        </nav>
      </header>
      <main className="page-main">{children}</main>
    </div>
  );
}
