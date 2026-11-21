import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenus = () => {
    setMenuOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? "nav-link-active" : ""}`;

  return (
    <header className="site-header">
      <div className="nav-shell">
        <NavLink
          to="/"
          className="brand"
          aria-label="Easy Agrotech home"
          onClick={closeMenus}
        >
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M16 26V13m0 6c-5 0-8-3-8-8 5 0 8 3 8 8Zm0-3c0-5 3-8 8-8 0 5-3 8-8 8Z" />
              <path d="M7 27h18" />
            </svg>
          </span>
          <span>Easy <b>Agrotech</b></span>
        </NavLink>
        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          className={`main-nav ${menuOpen ? "main-nav-open" : ""}`}
          aria-label="Main navigation"
        >
          <NavLink to="/" end className={linkClass} onClick={closeMenus}>Home</NavLink>
          <NavLink to="/about" className={linkClass} onClick={closeMenus}>About</NavLink>
          <NavLink to="/products" className={linkClass} onClick={closeMenus}>Products</NavLink>
          <NavLink to="/controller" className={linkClass} onClick={closeMenus}>Our Controller</NavLink>
          <NavLink
            to="/quotation"
            className={({ isActive }) => `nav-link quotation-link ${isActive ? "nav-link-active" : ""}`}
            onClick={closeMenus}
          >
            Get Your Quotation
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
