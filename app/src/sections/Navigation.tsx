import { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const WHATSAPP_NUMBER = '5511999999999'; // Substitua pelo número real
const WHATSAPP_MESSAGE = 'Olá! Gostaria de fazer um pedido/orçamento.';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Catálogo', href: '#products' },
    { name: 'Sobre', href: '#about' },
    { name: 'Avaliações', href: '#testimonials' },
    { name: 'Contato', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
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
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="M² Personalizados"
                className="h-16 lg:h-20 w-auto drop-shadow-[0_0_12px_rgba(255,222,89,0.4)]"
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
                  className="text-white/70 hover:text-[#ffde59] transition-colors font-accent text-sm tracking-wide"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA WhatsApp */}
            <div className="flex items-center gap-2 lg:gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 bg-[#ffde59] text-black font-semibold px-5 py-2.5 rounded-full hover:bg-[#f5d44e] transition-all duration-300 text-sm font-accent shadow-lg hover:shadow-[#ffde59]/30"
              >
                <MessageCircle className="w-4 h-4" />
                Pedir Orçamento
              </a>

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
          className={`absolute top-20 left-0 right-0 bg-[#1c1c1c] border-b border-white/10 transition-transform duration-500 ${
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
                className="block py-3 text-white/70 hover:text-[#ffde59] transition-colors font-accent text-lg"
              >
                {link.name}
              </a>
            ))}

            <div className="border-t border-white/10 mt-4 pt-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#ffde59] text-black font-semibold px-6 py-3 rounded-full w-full justify-center"
              >
                <MessageCircle className="w-5 h-5" />
                Pedir Orçamento via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
