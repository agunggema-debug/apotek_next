"use client";

import { useScroll, useActiveSection } from "@/hooks/useScroll";
import { useState } from "react";
import Icon from "@/components/Icon";

interface HeaderProps {
  onLoginClick: () => void;
}

const NAV_ITEMS = [
  { id: "beranda", label: "Beranda" },
  { id: "layanan", label: "Layanan" },
  { id: "kategori", label: "Kategori" },
  { id: "produk", label: "Produk" },
  { id: "kontak", label: "Kontak" },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export default function Header({ onLoginClick }: HeaderProps) {
  const { scrolled } = useScroll(50);
  const activeSection = useActiveSection(SECTION_IDS, 120);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`main-header ${scrolled ? "scrolled" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        padding: scrolled ? "12px 0" : "20px 0",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        background: scrolled ? "var(--glass-bg)" : "transparent",
        backdropFilter: scrolled ? "var(--glass-blur)" : "none",
        borderBottom: scrolled ? "1px solid var(--glass-border)" : "none",
        boxShadow: scrolled ? "var(--box-shadow-sm)" : "none",
      }}
    >
      <div className="container header-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#" className="logo" style={{ display: "flex", alignItems: "center", gap: "10px" }}
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          <div className="logo-icon" style={{
            width: "44px", height: "44px",
            background: "linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)",
            borderRadius: "var(--border-radius-sm)", display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--bg-white)", fontSize: "1.25rem", boxShadow: "0 4px 10px rgba(13, 148, 136, 0.3)"
          }}>
            <Icon name="prescription-bottle-medical" size={22} color="white" />
          </div>
          <span className="logo-text" style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-color)" }}>
            Raja <span style={{ color: "var(--primary-color)" }}>Farma</span>
          </span>
        </a>

        <nav className={`nav-menu ${mobileOpen ? "active" : ""}`} id="nav-menu"
          style={mobileOpen ? {
            position: "absolute", top: "100%", left: 0, width: "100%",
            backgroundColor: "var(--bg-white)", borderBottom: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "var(--box-shadow-md)", display: "block", padding: "24px", zIndex: 99
          } : {}}
        >
          <ul style={{ display: "flex", gap: "32px", listStyle: "none", flexDirection: mobileOpen ? "column" : "row" }}>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                  style={{
                    fontWeight: 500, color: "var(--text-color)", background: "none", border: "none",
                    cursor: "pointer", padding: "8px 0", position: "relative", fontSize: "1rem",
                    ...(activeSection === item.id ? { color: "var(--primary-color)" } : {}),
                  }}
                >
                  {item.label}
                  <span style={{
                    content: "''", position: "absolute", bottom: 0, left: 0,
                    width: activeSection === item.id ? "100%" : "0%",
                    height: "2px", backgroundColor: "var(--primary-color)",
                    transition: "0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                  }} />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={onLoginClick}
            className="btn-login"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "10px 22px", backgroundColor: "transparent", color: "var(--primary-color)",
              border: "2px solid var(--primary-color)", borderRadius: "var(--border-radius-md)",
              fontWeight: 600, cursor: "pointer", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              fontSize: "1rem", fontFamily: "'Poppins', sans-serif"
            }}
          >
            <Icon name="user-circle" size={20} color="var(--primary-color)" />
            <span className="login-text" style={{ display: "inline" }}>Masuk / Daftar</span>
          </button>
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
            style={{
              display: "none", fontSize: "1.5rem", color: "var(--text-color)",
              cursor: "pointer", background: "none", border: "none",
            }}
          >
            {mobileOpen ? <Icon name="times" size={24} color="var(--text-color)" /> : <Icon name="bars" size={24} color="var(--text-color)" />}
          </button>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-toggle { display: block !important; }
          .nav-menu:not(.active) { display: none; }
          .nav-menu.active { display: block; }
          .nav-menu ul { flex-direction: column; gap: 16px; }
          .login-text { display: none; }
          .btn-login { padding: 10px; }
        }
      `}</style>
    </header>
  );
}