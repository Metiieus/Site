import { Facebook, Instagram, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const WHATSAPP_NUMBER = '5511999999999';
const WHATSAPP_MESSAGE = 'Olá! Gostaria de fazer um pedido/orçamento.';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const footerLinks = {
  catalog: [
    { name: 'Ver Catálogo', href: '/#products' },
    { name: 'Novidades', href: '/#products' },
    { name: 'Mais Pedidos', href: '/#products' },
  ],
  contact: [
    { name: 'Pedir Orçamento', href: WHATSAPP_URL, external: true },
    { name: 'Falar no WhatsApp', href: WHATSAPP_URL, external: true },
    { name: 'Perguntas Frequentes', href: '#' },
  ],
  company: [
    { name: 'Sobre Nós', href: '/#about' },
    { name: 'Avaliações', href: '/#testimonials' },
  ],
  legal: [
    { name: 'Política de Privacidade', href: '#' },
    { name: 'Termos de Serviço', href: '#' },
  ],
};

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'WhatsApp', icon: MessageCircle, href: WHATSAPP_URL },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img src="/logo.png" alt="M² Personalizados" className="h-20 w-auto" />
            </Link>
            <p className="text-[#777777] text-sm font-body mb-6 max-w-xs">
              Produtos personalizados de alta qualidade. Faça seu pedido ou solicite um orçamento pelo WhatsApp.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[#777777] text-sm">
                <Mail className="w-4 h-4 text-[#ffde59]" />
                <span>contato@m2personalizados.com</span>
              </div>
              <div className="flex items-center gap-3 text-[#777777] text-sm">
                <Phone className="w-4 h-4 text-[#ffde59]" />
                <span>+55 (11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-3 text-[#777777] text-sm">
                <MapPin className="w-4 h-4 text-[#ffde59]" />
                <span>São Paulo, SP - Brasil</span>
              </div>
            </div>
          </div>

          {/* Catálogo links */}
          <div>
            <h4 className="font-display text-lg text-white mb-4">CATÁLOGO</h4>
            <ul className="space-y-3">
              {footerLinks.catalog.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-[#777777] text-sm hover:text-[#ffde59] transition-colors font-accent"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato links */}
          <div>
            <h4 className="font-display text-lg text-white mb-4">CONTATO</h4>
            <ul className="space-y-3">
              {footerLinks.contact.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-[#777777] text-sm hover:text-[#ffde59] transition-colors font-accent"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa links */}
          <div>
            <h4 className="font-display text-lg text-white mb-4">EMPRESA</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-[#777777] text-sm hover:text-[#ffde59] transition-colors font-accent"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="font-display text-lg text-white mb-4">LEGAL</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-[#777777] text-sm hover:text-[#ffde59] transition-colors font-accent"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#777777] text-sm font-accent">
            © 2025 M² Personalizados. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="w-10 h-10 bg-[#1c1c1c] rounded-full flex items-center justify-center text-[#777777] hover:bg-[#ffde59] hover:text-black transition-all duration-300"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
