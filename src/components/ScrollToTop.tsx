"use client";

import { useScroll } from "@/hooks/useScroll";
import Icon from "@/components/Icon";

export default function ScrollToTop() {
  const { scrolled } = useScroll(300);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollTop}
      aria-label="Kembali ke Atas"
      style={{
        position: "fixed", bottom: "32px", left: "32px", zIndex: 150,
        width: "52px", height: "52px",
        background: "linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)",
        borderRadius: "50%", color: "var(--bg-white)", display: "flex",
        alignItems: "center", justifyContent: "center", fontSize: "1.25rem",
        cursor: "pointer", boxShadow: "0 6px 20px rgba(13, 148, 136, 0.35)",
        border: "none", outline: "none",
        opacity: scrolled ? 1 : 0,
        transform: scrolled ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)",
        pointerEvents: scrolled ? "all" : "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Icon name="chevron-up" size={20} color="white" />
    </button>
  );
}