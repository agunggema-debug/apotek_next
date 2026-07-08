"use client";

import { useState, useEffect, useRef } from "react";
import { useToast } from "@/lib/toast";
import Icon from "@/components/Icon";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const { showToast } = useToast();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) onClose();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("login-email") as HTMLInputElement).value;
    showToast(`Selamat datang kembali, ${email}! Login berhasil.`);
    onClose();
    form.reset();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("reg-name") as HTMLInputElement).value;
    showToast(`Registrasi sukses! Selamat bergabung, ${name}. Silakan cek email Anda.`);
    onClose();
    form.reset();
  };

  return (
    <div
      ref={modalRef}
      onClick={handleOverlayClick}
      style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        backgroundColor: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 200, opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "all" : "none",
        transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div style={{
        background: "var(--glass-bg)", backdropFilter: "var(--glass-blur)",
        border: "1px solid var(--glass-border)", width: "100%", maxWidth: "480px",
        borderRadius: "var(--border-radius-lg)", boxShadow: "var(--box-shadow-lg)",
        padding: "40px", position: "relative",
        transform: isOpen ? "scale(1)" : "scale(0.9)",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        maxHeight: "90vh", overflowY: "auto",
      }}>
        {/* Close Button */}
        <button onClick={onClose} aria-label="Tutup Modal" style={{
          position: "absolute", top: "24px", right: "24px", width: "36px", height: "36px",
          borderRadius: "50%", backgroundColor: "var(--bg-light)", color: "var(--text-color)",
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          border: "none", transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)", fontSize: "1rem",
        }}>
          <Icon name="times" size={16} color="var(--text-color)" />
        </button>

        {/* Tabs */}
        <div style={{
          display: "flex", borderBottom: "2px solid rgba(0,0,0,0.06)", marginBottom: "30px",
        }}>
          {(["login", "register"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1, textAlign: "center", paddingBottom: "12px", fontSize: "1.125rem",
                fontWeight: 600, color: tab === t ? "var(--primary-color)" : "var(--text-muted)",
                cursor: "pointer", background: "none", border: "none", position: "relative",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {t === "login" ? "Masuk" : "Daftar"}
              {tab === t && (
                <span style={{
                  position: "absolute", bottom: "-2px", left: 0, width: "100%",
                  height: "2px", backgroundColor: "var(--primary-color)",
                }} />
              )}
            </button>
          ))}
        </div>

        {/* Login Form */}
        {tab === "login" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "6px" }}>Selamat Datang Kembali</h3>
            <p className="form-subtitle" style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "28px" }}>
              Silakan masuk ke akun Anda untuk bertransaksi lebih cepat
            </p>
            <form onSubmit={handleLogin}>
              <FormGroupWithIcon icon="fa-envelope" label="Email atau No. Handphone">
                <input type="text" name="login-email" placeholder="nama@email.com atau 0812..." required autoComplete="username"
                  style={inputStyle} />
              </FormGroupWithIcon>
              <FormGroupWithIcon icon="fa-lock" label="Kata Sandi">
                <input type="password" name="login-password" placeholder="Masukkan kata sandi" required autoComplete="current-password"
                  style={inputStyle} />
              </FormGroupWithIcon>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "-8px", marginBottom: "24px", fontSize: "0.875rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", color: "var(--text-muted)" }}>
                  <input type="checkbox" style={{ width: "16px", height: "16px", accentColor: "var(--primary-color)" }} />
                  Ingat Saya
                </label>
                <a href="#" style={{ color: "var(--primary-color)", fontWeight: 500, fontSize: "0.875rem" }}>Lupa Sandi?</a>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Masuk Ke Akun <Icon name="sign-in-alt" size={14} color="white" />
              </button>
            </form>
            <div style={{ textAlign: "center", margin: "24px 0", position: "relative" }}>
              <div style={{ position: "absolute", left: 0, top: "50%", width: "100%", height: "1px", backgroundColor: "rgba(0,0,0,0.06)" }} />
              <span style={{ backgroundColor: "var(--bg-white)", padding: "0 16px", position: "relative", zIndex: 2, fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>
                Atau Masuk dengan
              </span>
            </div>
            <div style={{ display: "flex", gap: "16px" }}>
              <button type="button" style={{
                flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center",
                gap: "8px", padding: "12px", border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: "var(--border-radius-md)", cursor: "pointer", fontWeight: 600,
                backgroundColor: "var(--bg-white)", fontFamily: "'Poppins', sans-serif",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" style={{ width: "18px", height: "18px" }} />
                Google
              </button>
            </div>
          </div>
        )}

        {/* Register Form */}
        {tab === "register" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "6px" }}>Buat Akun Sehat</h3>
            <p className="form-subtitle" style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "28px" }}>
              Daftarkan diri Anda untuk mendapatkan kemudahan konsultasi dan poin kesehatan
            </p>
            <form onSubmit={handleRegister}>
              <FormGroupWithIcon icon="fa-user" label="Nama Lengkap">
                <input type="text" name="reg-name" placeholder="Nama lengkap Anda sesuai KTP" required autoComplete="name" style={inputStyle} />
              </FormGroupWithIcon>
              <FormGroupWithIcon icon="fa-envelope" label="Alamat Email">
                <input type="email" name="reg-email" placeholder="nama@email.com" required autoComplete="email" style={inputStyle} />
              </FormGroupWithIcon>
              <FormGroupWithIcon icon="fa-phone" label="Nomor WhatsApp">
                <input type="tel" name="reg-phone" placeholder="081234567890" required autoComplete="tel" style={inputStyle} />
              </FormGroupWithIcon>
              <FormGroupWithIcon icon="fa-lock" label="Kata Sandi Baru">
                <input type="password" name="reg-password" placeholder="Minimal 8 karakter" required autoComplete="new-password" style={inputStyle} />
              </FormGroupWithIcon>
              <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px", cursor: "pointer", color: "var(--text-muted)", fontSize: "0.875rem" }}>
                <input type="checkbox" required style={{ width: "16px", height: "16px", accentColor: "var(--primary-color)" }} />
                Saya menyetujui Syarat & Ketentuan Apotek Raja Farma
              </label>
              <button type="submit" className="btn btn-primary btn-block">
                Daftar Sekarang <Icon name="user-plus" size={14} color="white" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

const formIcons: Record<string, "envelope-open-text" | "lock" | "user" | "phone"> = {
  "fa-envelope": "envelope-open-text",
  "fa-lock": "lock",
  "fa-user": "user",
  "fa-phone": "phone",
};

function FormGroupWithIcon({ icon, label, children }: { icon: string; label: string; children: React.ReactNode }) {
  const iconName = formIcons[icon] || "user";
  return (
    <div className="form-group" style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "8px", color: "var(--text-color)" }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <div style={{
          position: "absolute", left: "16px", top: "50%",
          transform: "translateY(-50%)", color: "var(--text-muted)",
          display: "flex", alignItems: "center",
        }}>
          <Icon name={iconName} size={16} color="var(--text-muted)" />
        </div>
        {children}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "14px 20px 14px 44px",
  border: "1px solid rgba(0,0,0,0.08)", borderRadius: "var(--border-radius-md)",
  backgroundColor: "var(--bg-white)", color: "var(--text-color)",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  fontFamily: "'Poppins', sans-serif", fontSize: "1rem",
  boxSizing: "border-box",
};