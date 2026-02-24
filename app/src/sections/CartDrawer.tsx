import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { X, Plus, Minus, ShoppingBag, Trash2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(drawerRef.current, {
        x: 0,
        duration: 0.4,
        ease: 'power3.out',
      });
    } else {
      document.body.style.overflow = '';
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(drawerRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in',
      });
    }
  }, [isOpen]);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setCartOpen(false);
      navigate('/login');
      return;
    }
    alert('Funcionalidade de checkout em breve!');
  };

  return (
    <>
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setCartOpen(false)}
      />

      <div
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#1c1c1c] z-50 shadow-2xl transform translate-x-full flex flex-col"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-[#f2fe6f]" />
            <h2 className="font-display text-2xl text-white">SEU CARRINHO</h2>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-[#777777] mb-4" />
              <p className="text-white font-display text-xl mb-2">Seu carrinho está vazio</p>
              <p className="text-[#777777] text-sm font-accent">
                Adicione algumas figuras incríveis para começar!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-[#252525] rounded-xl p-4 border border-white/5"
                >
                  <div className="w-20 h-20 bg-[#1c1c1c] rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-display text-sm truncate">
                      {item.name}
                    </h4>
                    <p className="text-[#f2fe6f] font-accent text-sm mt-1">
                      R${item.price.toFixed(2)}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white font-accent text-sm w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#777777] hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-white/5 bg-[#1c1c1c]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#777777] font-accent">Subtotal</span>
              <span className="text-white font-display text-xl">
                R${getTotalPrice().toFixed(2)}
              </span>
            </div>

            <p className="text-[#777777] text-xs font-accent mb-4">
              Frete e impostos calculados no checkout.
            </p>

            {!isAuthenticated && (
              <div className="mb-4 p-3 bg-[#f2fe6f]/10 border border-[#f2fe6f]/30 rounded-lg">
                <p className="text-[#f2fe6f] text-sm flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Faça login para finalizar sua compra
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={handleCheckout}
                className="w-full bg-[#f2fe6f] text-black hover:bg-[#e5f160] font-semibold py-6"
              >
                {isAuthenticated ? 'Finalizar Compra' : 'Entrar para Comprar'}
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setCartOpen(false)}
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  Continuar Comprando
                </Button>
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
