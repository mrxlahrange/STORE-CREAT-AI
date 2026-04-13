export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderDetails {
  name: string;
  phone: string;
  address: string;
}
