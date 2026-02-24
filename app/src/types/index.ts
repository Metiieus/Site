export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  badge?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  text: string;
  rating: number;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}
