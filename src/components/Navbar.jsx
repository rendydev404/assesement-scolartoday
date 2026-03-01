import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: "var(--nav-bg)",
        backdropFilter: "blur(40px) saturate(180%)",
        WebkitBackdropFilter: "blur(40px) saturate(180%)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-12 sm:h-14">
          <Link to="/" className="flex items-center gap-2">
            <span
              className="text-sm font-bold tracking-tight"
              style={{ color: "var(--text-1)" }}
            >
              PostExplorer
            </span>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              to="/"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium rounded-full transition-all duration-150"
              style={{
                background: isHome ? "var(--violet-soft)" : "transparent",
                color: isHome ? "var(--violet)" : "var(--text-3)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Home
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
