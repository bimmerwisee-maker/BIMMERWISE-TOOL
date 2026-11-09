import Link from "next/link";
import { BrandLogo } from "./BrandLogo";

const tabs = [
  {
    id: "home" as const,
    href: "/",
    label: "Home",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
        <path
          fill="currentColor"
          d="M12 3.2 3.8 10v10.2h5.4v-6.2h5.6v6.2h5.4V10L12 3.2Z"
        />
      </svg>
    ),
  },
  {
    id: "book" as const,
    href: "/book",
    label: "Book",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
        <path
          fill="currentColor"
          d="M7 3h10a2 2 0 0 1 2 2v14l-7-3.2L5 19V5a2 2 0 0 1 2-2Zm0 2v11.1l5-2.3 5 2.3V5H7Z"
        />
      </svg>
    ),
  },
  {
    id: "profile" as const,
    href: "/profile",
    label: "Profile",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
        <path
          fill="currentColor"
          d="M12 12a4.2 4.2 0 1 0-4.2-4.2A4.2 4.2 0 0 0 12 12Zm0 2.2c-3.5 0-8 1.7-8 5.1V21h16v-1.7c0-3.4-4.5-5.1-8-5.1Z"
        />
      </svg>
    ),
  },
];

export function AppShell({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: "home" | "book" | "track" | "admin" | "profile" | "register";
}) {
  return (
    <div className="app-shell">
      <div className="m-stripe m-stripe-animated" aria-hidden />
      <header className="topbar">
        <BrandLogo size="nav" />
      </header>
      <main className="page-main">{children}</main>
      <nav className="bottom-nav" aria-label="Main">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            className={
              active === tab.id || (active === "register" && tab.id === "profile")
                ? "active"
                : undefined
            }
          >
            {tab.icon}
            <span>{tab.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
