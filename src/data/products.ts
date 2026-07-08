export interface Product {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  badgeDiscount?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "RajaVit Gold Multivitamin",
    category: "vitamin",
    categoryLabel: "Vitamin & Suplemen",
    image: "/assets/product_vitamin.png",
    price: 125000,
    rating: 4.9,
    reviewCount: 120,
    badge: "Terlaris",
  },
  {
    id: "2",
    name: "Termometer Digital Infrared",
    category: "alkes",
    categoryLabel: "Alat Kesehatan",
    image: "/assets/product_thermometer.png",
    price: 189000,
    rating: 4.7,
    reviewCount: 85,
  },
  {
    id: "3",
    name: "Masker Medis KN95 Premium (10 Pcs)",
    category: "obat-bebas",
    categoryLabel: "Obat Bebas & Sanitasi",
    image: "/assets/product_mask.png",
    price: 45000,
    rating: 4.8,
    reviewCount: 200,
  },
  {
    id: "4",
    name: "Madu Herbal Murni Raja Farma 250ml",
    category: "herbal",
    categoryLabel: "Herbal & Organik",
    image: "/assets/product_honey.png",
    price: 95000,
    originalPrice: 105000,
    rating: 5.0,
    reviewCount: 95,
    badgeDiscount: true,
    badge: "Hemat 10%",
  },
];