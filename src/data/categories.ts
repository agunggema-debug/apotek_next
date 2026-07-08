export interface Category {
  key: string;
  title: string;
  description: string;
  icon: string;
  colorClass: string;
}

export const categories: Category[] = [
  {
    key: "vitamin",
    title: "Vitamin & Suplemen",
    description: "Menjaga daya tahan tubuh tetap prima",
    icon: "capsules",
    colorClass: "color-1",
  },
  {
    key: "obat-bebas",
    title: "Obat Bebas & Resep",
    description: "Pereda nyeri, flu, batuk, dan obat rutin",
    icon: "pills",
    colorClass: "color-2",
  },
  {
    key: "alkes",
    title: "Alat Kesehatan",
    description: "Termometer, tensimeter, dan alat medis",
    icon: "heart-pulse",
    colorClass: "color-3",
  },
  {
    key: "herbal",
    title: "Herbal & Organik",
    description: "Madu murni, jamu tradisional, dan suplemen alami",
    icon: "leaf",
    colorClass: "color-4",
  },
];