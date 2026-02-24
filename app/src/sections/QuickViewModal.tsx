import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { X, Star, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCartStore();

  useEffect(() => {
    if (isOpen && product) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: 'back.out(1.2)',
        }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 50,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [isOpen, product]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      onClose();
    }
  };

  if (!product) return null;

  return (
    <>
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      <div
        ref={modalRef}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          ref={contentRef}
          className="relative w-full max-w-4xl bg-[#1c1c1c] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white/70 hover:bg-black/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid md:grid-cols-2">
            <div className="relative aspect-square bg-gradient-to-b from-[#2a2a2a] to-[#1c1c1c]">
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      product.badge === 'Mais Vendido'
                        ? 'bg-[#f2fe6f] text-black'
                        : product.badge === 'Novo'
                        ? 'bg-blue-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
            </div>

            <div className="p-6 md:p-8 flex flex-col">
              <p className="text-[#f2fe6f] font-accent text-sm uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
                {product.name}
              </h2>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-[#f2fe6f] fill-[#f2fe6f]'
                          : 'text-[#777777]'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[#777777] text-sm">
                  {product.rating} ({product.reviews} avaliações)
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="font-display text-3xl text-[#f2fe6f]">
                  R${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-[#777777] line-through text-xl">
                    R${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-[#777777] font-body mb-6 flex-1">
                {product.description}
              </p>

              <div className="flex items-center gap-2 mb-6">
                <div
                  className={`w-3 h-3 rounded-full ${
                    product.inStock ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <span
                  className={`text-sm font-accent ${
                    product.inStock ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {product.inStock ? 'Em Estoque' : 'Fora de Estoque'}
                </span>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-[#f2fe6f] text-black hover:bg-[#e5f160] font-semibold py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Adicionar ao Carrinho
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Check className="w-5 h-5 mr-2" />
                  Lista de Desejos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
