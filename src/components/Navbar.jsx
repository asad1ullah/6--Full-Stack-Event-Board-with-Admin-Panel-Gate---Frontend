import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";

function navLinkClass({ isActive }) {
  return `nav-link${isActive ? " active" : ""}`;
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="btn btn-sm eb-theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark eb-navbar mb-4">
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/" end>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
            <path d="M3 9.5h18" stroke="currentColor" strokeWidth="1.8" />
            <path d="M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Event Board
        </NavLink>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#eb-nav-collapse"
          aria-controls="eb-nav-collapse"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="eb-nav-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/" end>
                Events
              </NavLink>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <NavLink className={navLinkClass} to="/create-event">
                    Create Event
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={navLinkClass} to="/dashboard">
                    My Dashboard
                  </NavLink>
                </li>
              </>
            )}
            {isAdmin && (
              <li className="nav-item">
                <NavLink className={navLinkClass} to="/admin">
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav align-items-lg-center gap-lg-2">
            <li className="nav-item d-flex align-items-center">
              <ThemeToggle />
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link disabled d-flex align-items-center gap-2">
                    <span
                      className="d-inline-flex align-items-center justify-content-center rounded-circle"
                      style={{
                        width: 28,
                        height: 28,
                        backgroundColor: "var(--eb-primary)",
                        color: "#fff",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                      }}
                      aria-hidden="true"
                    >
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                    {user.name}
                  </span>
                </li>
                <li className="nav-item">
                  <button type="button" className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className={navLinkClass} to="/login">
                    Log in
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/register" className="btn btn-primary btn-sm">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
