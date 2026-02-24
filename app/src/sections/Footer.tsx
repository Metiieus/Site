import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
  shop: [
    { name: 'Todos os Produtos', href: '/#products' },
    { name: 'Novidades', href: '#' },
    { name: 'Mais Vendidos', href: '#' },
    { name: 'Edições Limitadas', href: '#' },
    { name: 'Promoções', href: '#' },
  ],
  support: [
    { name: 'Fale Conosco', href: '#' },
    { name: 'Perguntas Frequentes', href: '#' },
    { name: 'Informações de Envio', href: '#' },
    { name: 'Devoluções', href: '#' },
    { name: 'Rastrear Pedido', href: '#' },
  ],
  company: [
    { name: 'Sobre Nós', href: '/#about' },
    { name: 'Carreiras', href: '#' },
    { name: 'Imprensa', href: '#' },
    { name: 'Blog', href: '/blog' },
    { name: 'Afiliados', href: '#' },
  ],
  legal: [
    { name: 'Política de Privacidade', href: '#' },
    { name: 'Termos de Serviço', href: '#' },
    { name: 'Política de Cookies', href: '#' },
  ],
};

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img src="/logo.png" alt="M² Verse" className="h-12" />
            </Link>
            <p className="text-[#777777] text-sm font-body mb-6 max-w-xs">
              O universo premium de figuras de ação 3D. Criadas com
              paixão, entregues com cuidado para colecionadores exigentes.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[#777777] text-sm">
                <Mail className="w-4 h-4 text-[#f2fe6f]" />
                <span>contato@m2verse.com</span>
              </div>
              <div className="flex items-center gap-3 text-[#777777] text-sm">
                <Phone className="w-4 h-4 text-[#f2fe6f]" />
                <span>+55 (11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-3 text-[#777777] text-sm">
                <MapPin className="w-4 h-4 text-[#f2fe6f]" />
                <span>São Paulo, SP - Brasil</span>
              </div>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="font-display text-lg text-white mb-4">LOJA</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-[#777777] text-sm hover:text-[#f2fe6f] transition-colors font-accent"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h4 className="font-display text-lg text-white mb-4">SUPORTE</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-[#777777] text-sm hover:text-[#f2fe6f] transition-colors font-accent"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-display text-lg text-white mb-4">EMPRESA</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-[#777777] text-sm hover:text-[#f2fe6f] transition-colors font-accent"
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
                    className="text-[#777777] text-sm hover:text-[#f2fe6f] transition-colors font-accent"
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
            © 2024 M² Verse. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="w-10 h-10 bg-[#1c1c1c] rounded-full flex items-center justify-center text-[#777777] hover:bg-[#f2fe6f] hover:text-black transition-all duration-300"
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
