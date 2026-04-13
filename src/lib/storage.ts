import { Product } from "../types";

const PRODUCTS_KEY = "luxestore_products";

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    description: "Experience studio-quality sound with our flagship wireless headphones. Features active noise cancellation and 40-hour battery life.",
  },
  {
    id: "2",
    name: "Minimalist Watch",
    price: 150,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    description: "A timeless design for the modern individual. Crafted with premium stainless steel and sapphire glass.",
  },
  {
    id: "3",
    name: "Smart Speaker",
    price: 199,
    image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&q=80",
    description: "Control your home with your voice. Crystal clear audio and seamless integration with all your devices.",
  },
];

export const getProducts = (): Product[] => {
  const stored = localStorage.getItem(PRODUCTS_KEY);
  if (!stored) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  }
  return JSON.parse(stored);
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};
