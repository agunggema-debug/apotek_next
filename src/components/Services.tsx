"use client";

import Icon from "@/components/Icon";

const services = [
  { icon: "shield-check" as const, title: "Obat 100% Asli", desc: "Semua produk didatangkan langsung dari distributor resmi bersertifikat BPOM." },
  { icon: "user-doctor" as const, title: "Konsultasi Apoteker", desc: "Tanyakan dosis, efek samping, dan petunjuk obat langsung kepada apoteker kami gratis." },
  { icon: "shipping-fast" as const, title: "Layanan Antar Cepat", desc: "Pesan kebutuhan obat Anda dan kurir kami akan segera mengantarkannya dengan aman." },
  { icon: "wallet" as const, title: "Harga Kompetitif", desc: "Dapatkan harga bersahabat dengan berbagai promo dan diskon khusus setiap bulan." },
];

export default function Services() {
  return (
    <section id="layanan" className="services-section" style={{ padding: "100px 0", backgroundColor: "var(--bg-light)" }}>
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">Mengapa Memilih Kami</span>
          <h2 className="section-title">Layanan Terbaik Untuk Anda</h2>
          <p className="section-desc">Kami berkomitmen memberikan pelayanan kefarmasian terbaik dengan mengutamakan kenyamanan dan keselamatan pasien.</p>
        </div>
        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "28px" }}>
          {services.map((s, i) => (
            <div key={i} className="service-card" style={{
              backgroundColor: "var(--bg-white)", borderRadius: "var(--border-radius-md)",
              padding: "40px 30px", boxShadow: "var(--box-shadow-sm)", position: "relative", overflow: "hidden", zIndex: 1,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, width: "100%", height: "4px",
                background: "linear-gradient(90deg, var(--primary-color), var(--accent-color))"
              }} />
              <div className="service-icon" style={{
                width: "64px", height: "64px", backgroundColor: "var(--primary-light)",
                borderRadius: "var(--border-radius-sm)", display: "flex", alignItems: "center",
                justifyContent: "center", color: "var(--primary-color)", fontSize: "1.75rem", marginBottom: "24px"
              }}>
                <Icon name={s.icon} size={28} color="var(--primary-color)" />
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "12px" }}>{s.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}