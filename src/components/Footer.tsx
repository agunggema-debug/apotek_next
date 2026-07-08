import Icon from "@/components/Icon";

const legalItems = [
  { icon: "shield-check" as const, text: "Terdaftar BPOM" },
  { icon: "user-tie" as const, text: "Apoteker Berizin" },
  { icon: "clock" as const, text: "Siaga Layanan Online" },
];

const socialLinks = ["facebook-f", "instagram", "twitter", "whatsapp"] as const;

export default function Footer() {
  return (
    <footer className="main-footer" style={{
      backgroundColor: "#0f172a", color: "#94a3b8",
      padding: "80px 0 30px 0", borderTop: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div className="footer-grid" style={{
        display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1.2fr", gap: "48px", marginBottom: "56px"
      }}>
        {/* Brand */}
        <div className="footer-brand">
          <a href="#" className="logo footer-logo" style={{ display: "flex", alignItems: "center", gap: "10px" }}
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            <div className="logo-icon" style={{
              width: "44px", height: "44px",
              background: "linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)",
              borderRadius: "var(--border-radius-sm)", display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--bg-white)", fontSize: "1.25rem",
            }}>
              <Icon name="prescription-bottle-medical" size={20} color="white" />
            </div>
            <span className="logo-text" style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--bg-white)" }}>
              Raja <span style={{ color: "var(--primary-color)" }}>Farma</span>
            </span>
          </a>
          <p className="footer-desc" style={{
            fontSize: "0.875rem", marginTop: "20px", marginBottom: "24px", lineHeight: "1.7",
          }}>
            Menyediakan layanan kefarmasian berkualitas dengan standar pelayanan ramah, tepercaya, dan cepat demi menunjang tingkat kesehatan masyarakat yang lebih baik.
          </p>
          <div className="social-links" style={{ display: "flex", gap: "12px" }}>
            {socialLinks.map((s) => (
              <a key={s} href="#" aria-label={`${s} Raja Farma`} style={{
                width: "38px", height: "38px", borderRadius: "var(--border-radius-sm)",
                backgroundColor: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center",
                justifyContent: "center", color: "var(--bg-white)", fontSize: "0.9375rem",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}>
                <Icon name={s} size={15} color="var(--bg-white)" />
              </a>
            ))}
          </div>
        </div>

        {/* Nav Links */}
        <FooterLinks title="Navigasi" items={[
          { label: "Beranda", href: "#beranda" },
          { label: "Layanan", href: "#layanan" },
          { label: "Kategori Obat", href: "#kategori" },
          { label: "Produk Populer", href: "#produk" },
          { label: "Kontak", href: "#kontak" },
        ]} />

        {/* Category Links */}
        <FooterLinks title="Kategori Populer" items={[
          { label: "Vitamin & Suplemen", href: "#produk" },
          { label: "Obat Flu & Batuk", href: "#produk" },
          { label: "Pengukur Suhu Tubuh", href: "#produk" },
          { label: "Perawatan Bayi & Anak", href: "#produk" },
        ]} />

        {/* Legal */}
        <div className="footer-links">
          <h4 style={{ color: "var(--bg-white)", fontSize: "1.0625rem", marginBottom: "24px", position: "relative", paddingBottom: "8px" }}>
            Keamanan & Legalitas
            <span style={{
              content: "''", position: "absolute", bottom: 0, left: 0,
              width: "30px", height: "2px", backgroundColor: "var(--primary-color)",
            }} />
          </h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none" }}>
            {legalItems.map((item, i) => (
              <li key={i} style={{ fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "8px" }}>
                <Icon name={item.icon} size={14} color="var(--primary-color)" />
                {" "}{item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom text-center" style={{
        paddingTop: "30px", borderTop: "1px solid rgba(255,255,255,0.05)", fontSize: "0.8125rem",
      }}>
        <p>&copy; 2026 Apotek Raja Farma. Seluruh Hak Cipta Dilindungi. Dibuat dengan cinta demi kesehatan Indonesia.</p>
      </div>
    </footer>
  );
}

function FooterLinks({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="footer-links">
      <h4 style={{ color: "var(--bg-white)", fontSize: "1.0625rem", marginBottom: "24px", position: "relative", paddingBottom: "8px" }}>
        {title}
        <span style={{
          content: "''", position: "absolute", bottom: 0, left: 0,
          width: "30px", height: "2px", backgroundColor: "var(--primary-color)",
        }} />
      </h4>
      <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none" }}>
        {items.map((item, i) => (
          <li key={i}>
            <button
              onClick={() => scrollTo(item.href)}
              style={{
                fontSize: "0.9rem", color: "var(--primary-color)", background: "none",
                border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0,
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}