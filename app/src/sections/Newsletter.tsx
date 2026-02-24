import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-[#f2fe6f] scanlines overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(0,0,0,0.1) 10px,
              rgba(0,0,0,0.1) 20px
            )`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={contentRef} className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-black mb-4">
            ENTRE PARA O M² VERSE
          </h2>
          <p className="text-black/70 text-base sm:text-lg font-body mb-8">
            Receba lançamentos exclusivos, conteúdo dos bastidores e acesso antecipado a
            edições limitadas.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1 relative">
              <Input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 px-6 bg-black text-white border-0 rounded-full font-accent placeholder:text-white/50 focus:ring-2 focus:ring-black"
                disabled={isSubmitted}
              />
            </div>
            <Button
              type="submit"
              className={`h-14 px-8 rounded-full font-semibold transition-all duration-300 ${
                isSubmitted
                  ? 'bg-green-500 text-white'
                  : 'bg-black text-[#f2fe6f] hover:bg-[#1c1c1c]'
              }`}
              disabled={isSubmitted}
            >
              {isSubmitted ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Inscrito!
                </>
              ) : (
                <>
                  Inscrever
                  <Send className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          <p className="text-black/50 text-sm font-accent mt-4">
            Sem spam, cancele quando quiser. Junte-se a mais de 10.000 colecionadores.
          </p>
        </div>
      </div>
    </section>
  );
}
