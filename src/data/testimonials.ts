export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  avatarIcon: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Budi Santoso",
    role: "Kepala Keluarga, Jakarta",
    text: "\"Pelayanan sangat cepat! Saya memesan obat demam untuk anak saya lewat chat, dan kurang dari 30 menit obat sudah sampai di rumah. Apotekernya juga sangat ramah saat konsultasi obat.\"",
    avatarIcon: "fa-user-astronaut",
    rating: 5,
  },
  {
    id: "2",
    name: "Siti Rahma",
    role: "Ibu Rumah Tangga, Tangerang",
    text: "\"Sangat terbantu dengan fitur chatbot dan konsultasi online. Saya bisa menanyakan efek samping obat resep yang saya minum tanpa harus keluar rumah. Sangat praktis dan informatif.\"",
    avatarIcon: "fa-user-ninja",
    rating: 5,
  },
];