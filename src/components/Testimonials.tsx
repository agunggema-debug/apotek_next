import { testimonials } from "@/data/testimonials";
import Icon from "@/components/Icon";

export default function Testimonials() {
  return (
    <section className="testimonial-section" style={{ padding: "100px 0" }}>
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">Ulasan Pelanggan</span>
          <h2 className="section-title">Apa Kata Mereka Tentang Kami</h2>
        </div>
        <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "32px" }}>
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card" style={{
              backgroundColor: "var(--bg-light)", borderRadius: "var(--border-radius-md)",
              padding: "40px", border: "1px solid rgba(0,0,0,0.02)", boxShadow: "var(--box-shadow-sm)",
            }}>
              <div className="testi-rating" style={{ color: "#eab308", fontSize: "0.875rem", marginBottom: "20px" }}>
                {Array.from({ length: t.rating }, (_, i) => (
                  <Icon key={i} name="star" size={12} color="#eab308" />
                ))}
              </div>
              <p className="testi-text" style={{
                fontStyle: "italic", color: "var(--text-color)", marginBottom: "28px", fontSize: "1.0625rem",
              }}>
                {t.text}
              </p>
              <div className="testi-user" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div className="user-avatar" style={{
                  width: "52px", height: "52px",
                  background: "linear-gradient(135deg, var(--primary-light) 0%, #ccfbf1 100%)",
                  borderRadius: "50%", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "1.5rem", color: "var(--primary-color)",
                }}>
                  <i className={`fas ${t.avatarIcon}`}></i>
                </div>
                <div>
                  <h4 style={{ fontSize: "1rem", fontWeight: 700 }}>{t.name}</h4>
                  <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}