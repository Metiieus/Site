import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { testimonials } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, rotateY: 30 },
        {
          opacity: 1,
          rotateY: 0,
          duration: 1.2,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff = ((diff + testimonials.length) % testimonials.length);
    const adjustedDiff = normalizedDiff > testimonials.length / 2 
      ? normalizedDiff - testimonials.length 
      : normalizedDiff;

    if (adjustedDiff === 0) {
      return {
        transform: 'translateX(0) scale(1) rotateY(0deg)',
        opacity: 1,
        zIndex: 10,
      };
    } else if (adjustedDiff === 1 || adjustedDiff === -testimonials.length + 1) {
      return {
        transform: 'translateX(80%) scale(0.85) rotateY(-25deg)',
        opacity: 0.5,
        zIndex: 5,
      };
    } else if (adjustedDiff === -1 || adjustedDiff === testimonials.length - 1) {
      return {
        transform: 'translateX(-80%) scale(0.85) rotateY(25deg)',
        opacity: 0.5,
        zIndex: 5,
      };
    }
    return {
      transform: 'translateX(0) scale(0.7)',
      opacity: 0,
      zIndex: 0,
    };
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-20 lg:py-32 bg-[#1c1c1c] grain-overlay overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f2fe6f]/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-[#f2fe6f] font-accent text-sm tracking-[0.3em] uppercase mb-4">
            Depoimentos
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white">
            O QUE DIZEM OS COLECIONADORES
          </h2>
        </div>

        <div
          ref={carouselRef}
          className="relative max-w-4xl mx-auto perspective-1000"
        >
          <div className="relative h-[400px] sm:h-[350px] flex items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="absolute w-full max-w-lg transition-all duration-500 ease-out preserve-3d cursor-pointer"
                style={getCardStyle(index)}
                onClick={() => setActiveIndex(index)}
              >
                <div className="bg-[#252525] rounded-2xl p-6 sm:p-8 border border-white/5">
                  <Quote className="w-10 h-10 text-[#f2fe6f]/30 mb-4" />

                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? 'text-[#f2fe6f] fill-[#f2fe6f]'
                            : 'text-[#777777]'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-white/90 text-base sm:text-lg font-body mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#f2fe6f]"
                    />
                    <div>
                      <p className="text-white font-accent font-semibold">
                        {testimonial.name}
                      </p>
                      <p className="text-[#777777] text-sm">Colecionador M² Verse</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="border-white/20 text-white hover:bg-white/10 hover:border-[#f2fe6f]"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="border-white/20 text-white hover:bg-white/10 hover:border-[#f2fe6f]"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-8 bg-[#f2fe6f]'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
