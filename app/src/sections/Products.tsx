import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products, categories } from '@/data/products';
import type { Product } from '@/types';

const WHATSAPP_NUMBER = '5511999999999';

const getWhatsAppURL = (productName: string) => {
  const msg = `Olá! Tenho interesse no produto: ${productName}. Poderia me passar mais informações e o orçamento?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};

gsap.registerPlugin(ScrollTrigger);

interface ProductCardProps {
  product: Product;
  index: number;
  onQuickView: (product: Product) => void;
}

function ProductCard({ product, index, onQuickView }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  // WhatsApp redirect

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    cardRef.current.style.setProperty('--rotateX', `${rotateX}deg`);
    cardRef.current.style.setProperty('--rotateY', `${rotateY}deg`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--rotateX', '0deg');
    cardRef.current.style.setProperty('--rotateY', '0deg');
  };

  return (
    <div
      ref={cardRef}
      className="group relative perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="card-3d relative bg-[#252525] rounded-2xl overflow-hidden border border-white/5 transition-all duration-300 hover:border-[#ffde59]/30 hover:shadow-lg hover:shadow-[#ffde59]/10">
        {product.badge && (
          <div className="absolute top-4 left-4 z-10">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                product.badge === 'Mais Vendido'
                  ? 'bg-[#ffde59] text-black'
                  : product.badge === 'Novo'
                  ? 'bg-blue-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}

        <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-[#2a2a2a] to-[#1c1c1c]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <a
              href={getWhatsAppURL(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-[#ffde59] text-black hover:bg-[#f5d44e] rounded-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <Button
              size="icon"
              variant="outline"
              className="border-white text-white hover:bg-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
              onClick={() => onQuickView(product)}
            >
              <Eye className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="p-5">
          <p className="text-[#777777] text-xs font-accent uppercase tracking-wider mb-2">
            {product.category}
          </p>
          <h3 className="font-display text-xl text-white mb-2 group-hover:text-[#ffde59] transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-[#ffde59] fill-[#ffde59]'
                      : 'text-[#777777]'
                  }`}
                />
              ))}
            </div>
            <span className="text-[#777777] text-sm">({product.reviews})</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-display text-2xl text-[#ffde59]">
              R${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-[#777777] line-through text-sm">
                R${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProductsProps {
  onQuickView: (product: Product) => void;
}

export default function Products({ onQuickView }: ProductsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('Todas');

  const filteredProducts =
    activeCategory === 'Todas'
      ? products
      : products.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const cards = gridRef.current?.querySelectorAll('.card-3d');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, rotateX: 45, y: 50 },
          {
            opacity: 1,
            rotateX: 0,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProducts]);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative py-20 lg:py-32 bg-[#1c1c1c] grain-overlay"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12 lg:mb-16">
          <p className="text-[#ffde59] font-accent text-sm tracking-[0.3em] uppercase mb-4">
            Catálogo de Produtos
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
            NOSSOS PRODUTOS
          </h2>
          <p className="text-[#777777] text-base sm:text-lg max-w-2xl mx-auto font-body">
            Explore nosso catálogo completo. Clique em qualquer produto para solicitar um orçamento direto pelo WhatsApp.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`px-5 py-2 rounded-full font-accent text-sm transition-all duration-300 ${
                activeCategory === category.name
                  ? 'bg-[#ffde59] text-black'
                  : 'bg-[#252525] text-white/70 hover:bg-[#333] hover:text-white'
              }`}
            >
              {category.name}
              <span className="ml-2 text-xs opacity-60">({category.count})</span>
            </button>
          ))}
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Gostaria de ver o catálogo completo de produtos.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#ffde59] text-[#ffde59] hover:bg-[#ffde59] hover:text-black px-8 py-4 font-accent rounded-md transition-all duration-300 font-semibold"
          >
            <MessageCircle className="w-5 h-5" />
            Solicitar Catálogo Completo
          </a>
        </div>
      </div>
    </section>
  );
}
