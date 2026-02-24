import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getBlogArticles, type BlogArticle } from '@/lib/firebase';

gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [articles, setArticles] = useState<BlogArticle[]>([]);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await getBlogArticles();
        setArticles(data.slice(0, 3)); // Show only 3 articles on home
      } catch (err) {
        console.error('Erro ao carregar artigos:', err);
      }
    };

    loadArticles();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.blog-card');
      if (cards) {
        cards.forEach((card) => {
          const randomRotation = (Math.random() - 0.5) * 10;
          gsap.set(card, {
            rotation: randomRotation,
            y: 30,
          });
        });

        gsap.to(cards, {
          rotation: 0,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [articles]);

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="relative py-20 lg:py-32 bg-[#1c1c1c] grain-overlay"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-[#f2fe6f] font-accent text-sm tracking-[0.3em] uppercase mb-4">
            Notícias e Atualizações
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white">
            ÚLTIMAS NOTÍCIAS
          </h2>
        </div>

        {/* Blog cards grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {articles.map((post, index) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="blog-card group relative bg-[#252525] rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 hover:-translate-y-5 hover:border-[#f2fe6f]/30 hover:shadow-xl hover:shadow-[#f2fe6f]/10"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#252525] via-transparent to-transparent" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#f2fe6f] text-black text-xs font-bold rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* Arrow icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Date */}
                <div className="flex items-center gap-2 text-[#777777] text-sm mb-3">
                  <Calendar className="w-4 h-4" />
                  <span className="font-accent">{post.date}</span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl text-white mb-3 group-hover:text-[#f2fe6f] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[#777777] text-sm font-body line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Read more link */}
                <div className="mt-4 pt-4 border-t border-white/5">
                  <span className="text-[#f2fe6f] text-sm font-accent flex items-center gap-2 group-hover:gap-3 transition-all">
                    Ler Mais
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[#f2fe6f] font-accent hover:gap-3 transition-all"
          >
            Ver Todos os Artigos
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
