import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current, subtitleRef.current, descRef.current, ctaRef.current], {
        opacity: 0,
        y: 60,
      });
      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 0.8,
        rotateY: -30,
      });

      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power4.out',
      })
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power4.out',
          },
          '-=0.4'
        )
        .to(
          imageRef.current,
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1.2,
            ease: 'expo.out',
          },
          '-=0.6'
        )
        .to(
          descRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power4.out',
          },
          '-=0.8'
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power4.out',
          },
          '-=0.4'
        );

      gsap.to(imageRef.current, {
        y: -15,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rotateX = ((e.clientY - centerY) / rect.height) * -10;
      const rotateY = ((e.clientX - centerX) / rect.width) * 10;

      gsap.to(imageRef.current, {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      if (!imageRef.current) return;
      gsap.to(imageRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#1c1c1c] grain-overlay"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1c] via-[#0a0a0a] to-[#1c1c1c]" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#f2fe6f]/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-[#f2fe6f]/5 rounded-full blur-[150px] animate-pulse delay-1000" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <h2 className="font-display text-[20vw] text-stroke-white opacity-10 whitespace-nowrap select-none">
          M² VERSE
        </h2>
      </div>

      <div
        ref={containerRef}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full py-20">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <p
              ref={subtitleRef}
              className="text-[#f2fe6f] font-accent text-sm tracking-[0.3em] uppercase mb-4"
            >
              Bem-vindo ao M² Verse
            </p>

            <h1
              ref={titleRef}
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-none mb-6"
            >
              FIGURAS
              <span className="block text-[#f2fe6f]">3D PREMIUM</span>
            </h1>

            <p
              ref={descRef}
              className="text-[#777777] text-base sm:text-lg max-w-md mx-auto lg:mx-0 mb-8 font-body"
            >
              Descubra o universo dos colecionáveis de alta fidelidade. 
              Modelos exclusivos, edições limitadas e a melhor qualidade para sua coleção.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={scrollToProducts}
                className="bg-[#f2fe6f] text-black hover:bg-[#e5f160] font-semibold px-8 py-6 text-base magnetic-button group"
              >
                Explorar Coleção
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-base magnetic-button"
              >
                <Play className="mr-2 w-5 h-5" />
                Assistir Trailer
              </Button>
            </div>

            <div className="flex gap-8 mt-12 justify-center lg:justify-start">
              <div className="text-center">
                <p className="font-display text-3xl sm:text-4xl text-[#f2fe6f]">50+</p>
                <p className="text-[#777777] text-sm font-accent">Designs Únicos</p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl sm:text-4xl text-[#f2fe6f]">10K+</p>
                <p className="text-[#777777] text-sm font-accent">Colecionadores</p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl sm:text-4xl text-[#f2fe6f]">100%</p>
                <p className="text-[#777777] text-sm font-accent">Premium</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center perspective-1000">
            <div
              ref={imageRef}
              className="relative preserve-3d"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-[#f2fe6f]/20 blur-[100px] rounded-full scale-75" />
              <img
                src="/hero-figure.jpg"
                alt="Figura de Ação 3D"
                className="relative z-10 w-full max-w-lg lg:max-w-xl xl:max-w-2xl drop-shadow-2xl"
              />
              <div className="absolute -right-4 top-1/4 bg-[#f2fe6f] text-black px-4 py-2 rounded-full font-accent text-sm font-bold animate-bounce">
                NOVO
              </div>
              <div className="absolute -left-4 bottom-1/4 bg-white text-black px-4 py-2 rounded-full font-accent text-sm font-bold animate-bounce delay-500">
                3D
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1c1c1c] to-transparent" />
    </section>
  );
}
