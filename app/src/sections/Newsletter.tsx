import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = '5511999999999';
const WHATSAPP_MESSAGE = 'Olá! Gostaria de fazer um pedido/orçamento.';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export default function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-[#ffde59] scanlines overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={contentRef} className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-black mb-4">
            PRONTO PARA PEDIR?
          </h2>
          <p className="text-black/70 text-base sm:text-lg font-body mb-10">
            Entre em contato pelo WhatsApp para fazer seu pedido, solicitar um orçamento personalizado ou tirar dúvidas. Respondemos rapidamente!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-black text-[#ffde59] hover:bg-[#1c1c1c] px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-6 h-6" />
              Falar no WhatsApp
            </a>
            <a
              href="tel:+5511999999999"
              className="flex items-center gap-3 border-2 border-black text-black hover:bg-black hover:text-[#ffde59] px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
            >
              <Phone className="w-6 h-6" />
              Ligar Agora
            </a>
          </div>

          <p className="text-black/50 text-sm font-accent mt-8">
            Atendimento rápido e personalizado. Faça seu pedido com facilidade!
          </p>
        </div>
      </div>
    </section>
  );
}
