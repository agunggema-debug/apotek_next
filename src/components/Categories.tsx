"use client";

import { categories } from "@/data/categories";
import Icon from "@/components/Icon";

const colorMap: Record<string, { bg: string; color: string }> = {
  "color-1": { bg: "#e0f2fe", color: "#0284c7" },
  "color-2": { bg: "#fee2e2", color: "#dc2626" },
  "color-3": { bg: "#f3e8ff", color: "#9333ea" },
  "color-4": { bg: "#dcfce7", color: "#16a34a" },
};

export default function Categories() {
  const scrollToProducts = () => {
    const el = document.getElementById("produk");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="kategori" className="categories-section" style={{ padding: "100px 0" }}>
      <div className="container">
        <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <span className="section-subtitle">Kategori Pilihan</span>
            <h2 className="section-title">Telusuri Kategori Obat</h2>
          </div>
          <p className="section-desc" style={{ margin: 0, maxWidth: "480px" }}>
            Temukan obat dan alat kesehatan yang Anda butuhkan berdasarkan kategori khusus yang telah kami siapkan.
          </p>
        </div>
        <div className="categories-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "28px" }}>
          {categories.map((cat) => {
            const colors = colorMap[cat.colorClass] || colorMap["color-1"];
            return (
              <button
                key={cat.key}
                onClick={scrollToProducts}
                className="category-card"
                style={{
                  display: "block", textAlign: "left", width: "100%",
                  backgroundColor: "var(--bg-light)", borderRadius: "var(--border-radius-md)",
                  padding: "32px", border: "1px solid rgba(0,0,0,0.03)", cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  fontFamily: "inherit", fontSize: "inherit",
                }}
              >
                <div className="category-icon" style={{
                  width: "56px", height: "56px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.5rem", marginBottom: "20px",
                  backgroundColor: colors.bg, color: colors.color,
                }}>
                  <Icon name={cat.icon as any} size={24} color={colors.color} />
                </div>
                <h3 style={{ fontSize: "1.125rem", marginBottom: "8px" }}>{cat.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "20px" }}>{cat.description}</p>
                <span className="category-link" style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  fontSize: "0.875rem", fontWeight: 600, color: "var(--primary-color)",
                }}>
                  Lihat Produk <Icon name="arrow-right" size={12} color="var(--primary-color)" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}