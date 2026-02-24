import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Gem } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Award, value: 50, suffix: '+', label: 'Designs Únicos' },
  { icon: Users, value: 10, suffix: 'K+', label: 'Colecionadores Felizes' },
  { icon: Gem, value: 100, suffix: '%', label: 'Qualidade Premium' },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

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
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9, rotate: -5 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const statElements = statsRef.current?.querySelectorAll('.stat-value');
      statElements?.forEach((el, index) => {
        const targetValue = stats[index].value;
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: targetValue,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems && statItems.length > 0) {
        gsap.fromTo(
          statItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 lg:py-32 bg-[#1c1c1c] grain-overlay overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none overflow-hidden">
        <h2
          ref={titleRef}
          className="font-display text-[15vw] text-stroke opacity-5 whitespace-nowrap select-none"
        >
          SOBRE NÓS
        </h2>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div ref={contentRef}>
            <p className="text-[#f2fe6f] font-accent text-sm tracking-[0.3em] uppercase mb-4">
              Quem Somos
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              O UNIVERSO
              <span className="block text-[#f2fe6f]">M² VERSE</span>
            </h2>
            <div className="space-y-4 text-[#777777] font-body text-base sm:text-lg mb-8">
              <p>
                O M² Verse nasceu da paixão por colecionáveis de alta qualidade. 
                Somos uma equipe de artistas 3D e entusiastas dedicados a criar 
                figuras de ação que transcendem o comum.
              </p>
              <p>
                Cada peça em nossa coleção é cuidadosamente esculpida, pintada à mão 
                e produzida em edições limitadas. Não vendemos apenas figuras – 
                oferecemos portais para universos extraordinários.
              </p>
            </div>

            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-6"
            >
              {stats.map((stat, index) => (
                <div key={index} className="stat-item text-center lg:text-left">
                  <stat.icon className="w-8 h-8 text-[#f2fe6f] mb-3 mx-auto lg:mx-0" />
                  <p className="font-display text-3xl sm:text-4xl text-white mb-1">
                    <span className="stat-value">0</span>
                    {stat.suffix}
                  </p>
                  <p className="text-[#777777] text-sm font-accent">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div ref={imageRef} className="relative">
            <div className="relative">
              <div className="absolute inset-0 bg-[#f2fe6f]/10 blur-[80px] rounded-full" />
              <img
                src="/about-figure.jpg"
                alt="Figura Sobre Nós"
                className="relative z-10 w-full rounded-2xl"
              />
              <div className="absolute -top-6 -right-6 bg-[#f2fe6f] text-black p-4 rounded-xl shadow-lg animate-bounce">
                <Award className="w-8 h-8" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white text-black p-4 rounded-xl shadow-lg animate-bounce delay-500">
                <Gem className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
