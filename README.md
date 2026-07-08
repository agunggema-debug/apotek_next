# 💊 Apotek Raja Farma

Website landing page modern untuk **Apotek Raja Farma** — solusi kesehatan tepercaya. Dibangun menggunakan **Next.js 15** (App Router) dengan integrasi AI chatbot untuk konsultasi obat.

## ✨ Fitur

- **Landing Page Responsif** — Hero, layanan, kategori produk, testimonial, kontak, dan footer
- **AI Chatbot** — Chatbot interaktif bertenaga **Groq AI** (Llama 3) untuk konsultasi obat dan kesehatan
- **Login Modal** — Modal login untuk akses pengguna
- **Scroll to Top** — Tombol navigasi cepat ke atas halaman
- **Animasi Scroll** — Efek muncul saat scroll menggunakan custom hook
- **Toast Notification** — Notifikasi pop-up untuk feedback pengguna
- **Fully Responsive** — Tampilan optimal di desktop, tablet, dan mobile
- **Google Fonts** — Menggunakan font Poppins & Montserrat

## 🛠️ Tech Stack

| Teknologi | Keterangan |
|-----------|-----------|
| [Next.js 15](https://nextjs.org/) | React framework (App Router) |
| [React 19](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Bahasa pemrograman |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS framework |
| [AI SDK](https://sdk.vercel.ai/) | Library AI/chat (Vercel AI SDK) |
| [Groq](https://groq.com/) | Inference engine untuk AI chatbot |

## 📁 Struktur Project

```
apotek-next/
├── public/                  # Static assets
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts    # API endpoint untuk AI chatbot
│   │   ├── globals.css         # Global styles (Tailwind)
│   │   ├── layout.tsx          # Root layout (metadata, fonts)
│   │   └── page.tsx            # Halaman utama (landing page)
│   ├── components/
│   │   ├── Header.tsx          # Navigasi atas
│   │   ├── Hero.tsx            # Hero section
│   │   ├── Services.tsx        # Layanan apotek
│   │   ├── Categories.tsx      # Kategori produk
│   │   ├── Products.tsx        # Daftar produk
│   │   ├── Testimonials.tsx    # Testimonial pelanggan
│   │   ├── Contact.tsx         # Form kontak
│   │   ├── Footer.tsx          # Footer
│   │   ├── Chatbot.tsx         # AI chatbot
│   │   ├── LoginModal.tsx      # Modal login
│   │   ├── ScrollToTop.tsx     # Tombol scroll to top
│   │   └── Icon.tsx            # Komponen ikon reusable
│   ├── data/
│   │   ├── categories.ts       # Data kategori
│   │   ├── products.ts         # Data produk
│   │   └── testimonials.ts     # Data testimonial
│   ├── hooks/
│   │   └── useScroll.ts        # Custom hook scroll detection
│   └── lib/
│       └── toast.tsx           # Utility toast notification
├── .env.example                # Template environment variables
├── .gitignore
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── eslint.config.mjs
```

## 🚀 Cara Menjalankan

### Prasyarat

- Node.js 18+
- npm / yarn / pnpm

### Instalasi

```bash
# Clone repository
git clone https://github.com/username/apotek-next.git
cd apotek-next

# Install dependencies
npm install
# atau
yarn install
# atau
pnpm install
```

### Environment Variables

Buat file `.env.local` di root project:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Dapatkan API key gratis di [console.groq.com](https://console.groq.com).

### Jalankan Development Server

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build untuk Production

```bash
npm run build
npm start
```

## 🌐 Deploy ke Vercel

### Persiapan

1. Push project ke GitHub/GitLab/Bitbucket
2. Buka [vercel.com](https://vercel.com) dan login
3. Klik **"Add New..."** → **"Project"**
4. Pilih repository `apotek-next`
5. Vercel akan otomatis mendeteksi framework **Next.js**
6. Di bagian **Environment Variables**, tambahkan:
   - `GROQ_API_KEY` → isi dengan API key Groq Anda
7. Klik **"Deploy"**

Aplikasi akan live di URL: `https://apotek-next.vercel.app`

Setiap push ke branch `main` akan otomatis memicu redeploy.

### Custom Domain (Opsional)

Bisa menambahkan domain kustom di dashboard Vercel → Project → **Domains**.

## 📄 Lisensi

Private project.