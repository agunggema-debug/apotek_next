"use client";

import Icon from "@/components/Icon";

export default function Hero() {
  const scrollToProducts = () => {
    const el = document.getElementById("produk");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const openChatConsult = () => {
    const toggle = document.getElementById("btn-chat-toggle");
    if (toggle) toggle.click();
  };

  return (
    <section id="beranda" className="hero-section" style={{
      position: "relative",
      background: "linear-gradient(135deg, #f0fdfa 0%, #ffffff 50%, #fef3c7 100%)",
      overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(13,148,136,0.1) 0%, rgba(255,255,255,0) 70%)",
        top: "-100px", right: "-100px", pointerEvents: "none"
      }} />

      <div className="container hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <span className="badge-premium" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            backgroundColor: "var(--primary-light)", color: "var(--primary-color)",
            padding: "8px 16px", borderRadius: "50px", fontSize: "0.875rem",
            fontWeight: 600, border: "1px solid rgba(13, 148, 136, 0.15)", marginBottom: "24px"
          }}>
            <Icon name="award" size={14} color="var(--primary-color)" /> Apotek Mitra Keluarga Tepercaya
          </span>
          <h1 className="hero-title">
            Kesehatan Anda Adalah <span className="gradient-text">Prioritas Utama</span> Kami
          </h1>
          <p className="hero-desc" style={{
            fontSize: "1.125rem", color: "var(--text-muted)", marginBottom: "36px", maxWidth: "540px"
          }}>
            Menyediakan obat-obatan 100% asli, konsultasi kesehatan dengan apoteker berpengalaman secara gratis, serta layanan pengiriman cepat langsung ke rumah Anda.
          </p>
          <div className="hero-actions">
            <button onClick={scrollToProducts} className="btn btn-primary">
              Cari Obat <Icon name="chevron-right" size={14} color="white" />
            </button>
            <button onClick={openChatConsult} className="btn btn-secondary">
              <Icon name="comment-medical" size={16} color="var(--primary-color)" /> Konsultasi Apoteker
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">15K+</span>
              <span className="stat-label">Pelanggan Puas</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">100%</span>
              <span className="stat-label">Keaslian Obat</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">24/7</span>
              <span className="stat-label">Layanan Siaga</span>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="hero-image-container" style={{ position: "relative", display: "flex", justifyContent: "center" }}>
          <div className="hero-image-wrapper" style={{ position: "relative", borderRadius: "var(--border-radius-lg)", overflow: "visible" }}>
            <img
              src="/assets/hero_pharmacy.png"
              alt="Apotek Raja Farma Modern"
              className="hero-img"
            />

            {/* Floating Badge 1 */}
            <div className="floating-badge badge-1">
              <Icon name="shield-halved" size={28} color="var(--primary-color)" />
              <div>
                <h4 style={{ fontSize: "0.9rem", fontWeight: 700 }}>Tersertifikasi BPOM</h4>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Aman & Tepercaya</p>
              </div>
            </div>

            {/* Floating Badge 2 */}
            <div className="floating-badge badge-2">
              <Icon name="truck-fast" size={28} color="var(--primary-color)" />
              <div>
                <h4 style={{ fontSize: "0.9rem", fontWeight: 700 }}>Pengiriman Cepat</h4>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Kurang dari 1 Jam</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}