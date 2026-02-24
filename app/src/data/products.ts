import type { Product, Testimonial, BlogPost } from '@/types';

export const products: Product[] = [
  {
    id: 1,
    name: "Guardiã Supernova",
    price: 89.99,
    originalPrice: 119.99,
    image: "/product-1.jpg",
    category: "Superhero",
    description: "Uma poderosa heroína com força incrível e capacidades de voo. Possui articulação premium e escultura detalhada.",
    rating: 4.9,
    reviews: 128,
    inStock: true,
    badge: "Mais Vendido"
  },
  {
    id: 2,
    name: "Elite das Sombras",
    price: 79.99,
    image: "/product-2.png",
    category: "Military",
    description: "Soldado furtivo com armadura tática avançada e detalhes em neon brilhante. Perfeito para colecionadores de sci-fi.",
    rating: 4.8,
    reviews: 96,
    inStock: true,
    badge: "Novo"
  },
  {
    id: 3,
    name: "Ciber Ninja",
    price: 69.99,
    originalPrice: 89.99,
    image: "/product-3.png",
    category: "Ninja",
    description: "Ninja aprimorado com cybernética, empunhando uma katana de energia com detalhes LED na armadura.",
    rating: 4.7,
    reviews: 84,
    inStock: true
  },
  {
    id: 4,
    name: "Mecha Titã X-7",
    price: 149.99,
    image: "/product-4.png",
    category: "Mecha",
    description: "Mecha humanoide massivo com detalhes mecânicos intrincados e efeitos de dano de batalha.",
    rating: 5.0,
    reviews: 156,
    inStock: true,
    badge: "Limitado"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Rodriguez",
    avatar: "/testimonial-1.jpg",
    text: "O detalhe dessas figuras é absolutamente incrível. A melhor adição à minha coleção! O trabalho de pintura e articulação são de primeira qualidade.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    avatar: "/testimonial-2.jpg",
    text: "Envio rápido e a embalagem era premium. Cada figura chegou em perfeitas condições. Altamente recomendado!",
    rating: 5
  },
  {
    id: 3,
    name: "Mike Thompson",
    avatar: "/testimonial-3.jpg",
    text: "Finalmente, figuras de ação que parecem ter saltado direto dos filmes. A escultura 3D é incrível!",
    rating: 5
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Top 10 Figuras de 2024",
    excerpt: "Descubra as figuras de ação mais cobiçadas deste ano, desde edições limitadas até favoritos dos fãs.",
    image: "/blog-1.jpg",
    date: "15 Dez, 2024",
    category: "Coleções"
  },
  {
    id: 2,
    title: "Nos Bastidores: Processo de Escultura",
    excerpt: "Dê uma olhada em nosso estúdio e veja como damos vida a esses personagens incríveis.",
    image: "/blog-2.jpg",
    date: "10 Dez, 2024",
    category: "Bastidores"
  },
  {
    id: 3,
    title: "Destaque do Colecionador: Edição Tóquio",
    excerpt: "Conheça colecionadores apaixonados de todo o mundo e veja suas exibições incríveis.",
    image: "/blog-3.jpg",
    date: "05 Dez, 2024",
    category: "Comunidade"
  }
];

export const categories = [
  { name: "Todas", count: 48 },
  { name: "Superhero", count: 16 },
  { name: "Military", count: 12 },
  { name: "Ninja", count: 8 },
  { name: "Mecha", count: 12 }
];
