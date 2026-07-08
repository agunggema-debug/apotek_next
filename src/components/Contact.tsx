"use client";

import { useToast } from "@/lib/toast";
import { FormEvent, useRef } from "react";
import Icon from "@/components/Icon";

const contactItems = [
  { icon: "map-location-dot" as const, title: "Alamat Apotek", desc: "Jl. Raya Rajamandala, Rajamandala Kulon, Kec. Cipatat, Kabupaten Bandung Barat, Jawa Barat 40554" },
  { icon: "phone-volume" as const, title: "Telepon & WhatsApp", desc: "+62 857-2224-4783" },
  { icon: "envelope-open-text" as const, title: "Email Dukungan", desc: "support@rajafarma.com" },
  { icon: "clock" as const, title: "Jam Operasional", desc: "Setiap Hari: 07.00 - 23.00 WIB (Layanan Antar 24 Jam)" },
];

export default function Contact() {
  const { showToast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    showToast(`✉️ Terima kasih ${nameInput.value}, pesan Anda telah terkirim! Tim kami akan segera membalas.`);
    formRef.current?.reset();
  };

  return (
    <section id="kontak" className="contact-section" style={{ padding: "100px 0", backgroundColor: "var(--bg-white)" }}>
      <div className="container">
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "start" }}>
          {/* Left Info */}
          <div className="contact-info-panel">
            <span className="section-subtitle">Hubungi Kami</span>
            <h2 className="section-title" style={{ marginBottom: "20px" }}>Mari Berkoneksi</h2>
            <p className="contact-intro" style={{ color: "var(--text-muted)", marginBottom: "40px" }}>
              Apakah Anda memiliki pertanyaan mengenai obat, resep dokter, atau layanan kami? Tim kami selalu siap melayani Anda.
            </p>
            <div className="contact-details" style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {contactItems.map((item, i) => (
                <ContactItem key={i} icon={item.icon} title={item.title} desc={item.desc} />
              ))}
            </div>
          </div>

          {/* Right Form */}
          <div className="contact-form-panel" style={{
            backgroundColor: "var(--bg-light)", padding: "48px",
            borderRadius: "var(--border-radius-lg)", boxShadow: "var(--box-shadow-sm)",
          }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "28px" }}>Kirim Pesan Cepat</h3>
            <form ref={formRef} id="contact-form" onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label htmlFor="form-name" style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "8px", color: "var(--text-color)" }}>
                  Nama Lengkap
                </label>
                <input type="text" id="form-name" name="name" placeholder="Masukkan nama Anda" required autoComplete="name"
                  style={{
                    width: "100%", padding: "14px 20px", border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: "var(--border-radius-md)", backgroundColor: "var(--bg-white)",
                    color: "var(--text-color)", transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    fontFamily: "'Poppins', sans-serif", fontSize: "1rem",
                  }}
                />
              </div>
              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label htmlFor="form-email" style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "8px", color: "var(--text-color)" }}>
                  Alamat Email
                </label>
                <input type="email" id="form-email" name="email" placeholder="nama@email.com" required autoComplete="email"
                  style={{
                    width: "100%", padding: "14px 20px", border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: "var(--border-radius-md)", backgroundColor: "var(--bg-white)",
                    color: "var(--text-color)", transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    fontFamily: "'Poppins', sans-serif", fontSize: "1rem",
                  }}
                />
              </div>
              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label htmlFor="form-message" style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, marginBottom: "8px", color: "var(--text-color)" }}>
                  Pesan Anda
                </label>
                <textarea id="form-message" name="message" rows={4} placeholder="Tuliskan pertanyaan atau kebutuhan obat Anda..." required
                  style={{
                    width: "100%", padding: "14px 20px", border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: "var(--border-radius-md)", backgroundColor: "var(--bg-white)",
                    color: "var(--text-color)", transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    fontFamily: "'Poppins', sans-serif", fontSize: "1rem", resize: "vertical",
                  }}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Kirim Pesan <Icon name="paper-plane" size={14} color="white" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, title, desc }: { icon: "map-location-dot" | "phone-volume" | "envelope-open-text" | "clock"; title: string; desc: string }) {
  return (
    <div className="contact-item" style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
      <div className="icon-box" style={{
        width: "48px", height: "48px", backgroundColor: "var(--primary-light)",
        borderRadius: "var(--border-radius-sm)", display: "flex", alignItems: "center",
        justifyContent: "center", color: "var(--primary-color)", fontSize: "1.25rem", flexShrink: 0,
      }}>
        <Icon name={icon} size={20} color="var(--primary-color)" />
      </div>
      <div>
        <h4 style={{ fontSize: "1rem", marginBottom: "4px" }}>{title}</h4>
        <p style={{ fontSize: "0.9375rem", color: "var(--text-muted)" }}>{desc}</p>
      </div>
    </div>
  );
}