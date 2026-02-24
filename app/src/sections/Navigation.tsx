import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Search, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, getTotalItems } = useCartStore();
  const { isAuthenticated, userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const cartItemCount = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Coleção', href: '#products' },
    { name: 'Sobre', href: '#about' },
    { name: 'Avaliações', href: '#testimonials' },
    { name: 'Blog', href: '#blog' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#1c1c1c]/90 backdrop-blur-lg border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/logo.png" 
                alt="M² Verse" 
                className="h-10 lg:h-12"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-white/70 hover:text-[#f2fe6f] transition-colors font-accent text-sm tracking-wide"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <Search className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative text-white/70 hover:text-white hover:bg-white/10"
                onClick={toggleCart}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#f2fe6f] text-black text-xs font-bold rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>

              {/* Auth buttons */}
              {isAuthenticated ? (
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-white/70 text-sm font-accent hidden xl:block">
                    Olá, {userProfile?.name?.split(' ')[0] || 'Colecionador'}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    className="text-white/70 hover:text-red-400 hover:bg-white/10"
                  >
                    <LogOut className="w-5 h-5" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="hidden sm:flex text-white/70 hover:text-[#f2fe6f] hover:bg-white/10 font-accent"
                >
                  <User className="w-5 h-5 mr-2" />
                  Entrar
                </Button>
              )}

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-16 left-0 right-0 bg-[#1c1c1c] border-b border-white/10 transition-transform duration-500 ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="container mx-auto px-4 py-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="block py-3 text-white/70 hover:text-[#f2fe6f] transition-colors font-accent text-lg"
              >
                {link.name}
              </a>
            ))}
            
            {/* Mobile auth buttons */}
            <div className="border-t border-white/10 mt-4 pt-4">
              {isAuthenticated ? (
                <div className="flex items-center justify-between">
                  <span className="text-white/70">
                    Olá, {userProfile?.name?.split(' ')[0] || 'Colecionador'}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-red-400 flex items-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    Sair
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-[#f2fe6f]"
                >
                  <User className="w-5 h-5" />
                  Entrar / Criar conta
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
