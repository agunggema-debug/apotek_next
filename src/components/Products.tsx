"use client";

import { products } from "@/data/products";
import { useToast } from "@/lib/toast";
import Icon from "@/components/Icon";

function formatPrice(price: number): string {
  return `Rp ${price.toLocaleString("id-ID")}`;
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  return (
    <div className="product-rating" style={{ display: "flex", alignItems: "center", gap: "4px", color: "#eab308", fontSize: "0.8125rem", marginBottom: "16px" }}>
      {Array.from({ length: 5 }, (_, i) => {
        if (i < fullStars) return <Icon key={i} name="star" size={13} color="#eab308" />;
        if (i === fullStars && halfStar) return <Icon key={i} name="star-half-alt" size={13} color="#eab308" />;
        return <Icon key={i} name="star-regular" size={13} color="#eab308" />;
      })}
      <span style={{ color: "var(--text-muted)", marginLeft: "4px" }}>({rating})</span>
    </div>
  );
}

export default function Products() {
  const { showToast } = useToast();

  const handleBuy = (name: string) => {
    showToast(`🛒 ${name} berhasil ditambahkan ke keranjang belanja Anda!`);
  };

  return (
    <section id="produk" className="products-section" style={{ padding: "100px 0", backgroundColor: "var(--bg-light)" }}>
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">Katalog Terlaris</span>
          <h2 className="section-title">Produk Kesehatan Populer</h2>
          <p className="section-desc">Pilihan terbaik produk kesehatan terlaris dengan ulasan luar biasa dari pelanggan kami.</p>
        </div>
        <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "28px" }}>
          {products.map((product) => (
            <div key={product.id} className="product-card" data-category={product.category} style={{
              backgroundColor: "var(--bg-white)", borderRadius: "var(--border-radius-md)",
              overflow: "hidden", boxShadow: "var(--box-shadow-sm)", position: "relative",
              border: "1px solid rgba(0,0,0,0.02)", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}>
              {product.badge && (
                <div className="product-badge" style={{
                  position: "absolute", top: "16px", left: "16px", zIndex: 10,
                  backgroundColor: product.badgeDiscount ? "var(--accent-color)" : "var(--primary-color)",
                  color: "var(--bg-white)", padding: "4px 12px", borderRadius: "50px",
                  fontSize: "0.75rem", fontWeight: 600,
                }}>
                  {product.badge}
                </div>
              )}
              <div className="product-image" style={{
                position: "relative", paddingTop: "100%", backgroundColor: "#f8fafc", overflow: "hidden",
              }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)", width: "80%", height: "80%",
                    objectFit: "contain", transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              </div>
              <div className="product-info" style={{ padding: "24px" }}>
                <span className="product-cat" style={{
                  fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)",
                  fontWeight: 600, letterSpacing: "1px", display: "block", marginBottom: "6px",
                }}>
                  {product.categoryLabel}
                </span>
                <h3 className="product-name" style={{
                  fontSize: "1rem", fontWeight: 700, marginBottom: "10px",
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                  overflow: "hidden", height: "2.6rem",
                }}>
                  {product.name}
                </h3>
                <StarRating rating={product.rating} />
                <div className="product-footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="product-price" style={{
                    fontFamily: "'Montserrat', sans-serif", fontSize: "1.125rem",
                    fontWeight: 700, color: "var(--text-color)",
                  }}>
                    {product.originalPrice && (
                      <span className="price-old" style={{
                        fontSize: "0.8125rem", textDecoration: "line-through",
                        color: "var(--text-muted)", marginRight: "4px", fontWeight: 400,
                      }}>
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                    {formatPrice(product.price)}
                  </span>
                  <button
                    onClick={() => handleBuy(product.name)}
                    className="btn-buy"
                    aria-label={`Beli ${product.name}`}
                    style={{
                      width: "40px", height: "40px", backgroundColor: "var(--primary-light)",
                      color: "var(--primary-color)", borderRadius: "50%", display: "flex",
                      alignItems: "center", justifyContent: "center", cursor: "pointer",
                      fontSize: "1rem", border: "none",
                      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <Icon name="shopping-cart" size={16} color="var(--primary-color)" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}