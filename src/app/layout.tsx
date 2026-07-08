import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/lib/toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apotek Raja Farma | Solusi Kesehatan Tepercaya & Elegan",
  description:
    "Apotek Raja Farma - Solusi kesehatan tepercaya Anda. Menyediakan obat asli, konsultasi apoteker gratis, dan layanan antar cepat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${poppins.variable} ${montserrat.variable}`}>
      <body className={`${poppins.className}`}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}