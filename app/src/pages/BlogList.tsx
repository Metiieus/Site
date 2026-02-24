import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowUpRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getBlogArticles, type BlogArticle } from '@/lib/firebase';

export default function BlogList() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<BlogArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await getBlogArticles();
        setArticles(data);
        setFilteredArticles(data);
      } catch (err) {
        console.error('Erro ao carregar artigos:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  useEffect(() => {
    let filtered = articles;

    // Filter by category
    if (selectedCategory !== 'Todas') {
      filtered = filtered.filter((article) => article.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  }, [searchQuery, selectedCategory, articles]);

  const categories = ['Todas', ...Array.from(new Set(articles.map((a) => a.category)))];

  return (
    <div className="min-h-screen bg-[#1c1c1c]">
      {/* Header */}
      <header className="bg-[#1c1c1c]/90 backdrop-blur-lg border-b border-white/5 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="M² Verse" className="h-10" />
            </Link>
            <Link to="/" className="text-white/70 hover:text-[#f2fe6f] transition-colors font-accent">
              Voltar para a loja
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#252525] to-[#1c1c1c] py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#f2fe6f] font-accent text-sm tracking-[0.3em] uppercase mb-4">
            Blog M² Verse
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
            NOTÍCIAS E ATUALIZAÇÕES
          </h1>
          <p className="text-[#777777] text-lg max-w-2xl mx-auto">
            Fique por dentro das últimas novidades, lançamentos e histórias do mundo dos colecionáveis.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#777777]" />
            <Input
              type="text"
              placeholder="Buscar artigos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 bg-[#252525] border-white/10 text-white placeholder:text-[#777777]"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-accent text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[#f2fe6f] text-black'
                    : 'bg-[#252525] text-white/70 hover:bg-[#333] hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f2fe6f]"></div>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white text-xl mb-2">Nenhum artigo encontrado</p>
            <p className="text-[#777777]">Tente ajustar seus filtros</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                to={`/blog/${article.id}`}
                className="group bg-[#252525] rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-[#f2fe6f]/30"
              >
                {/* Image */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#252525] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#f2fe6f] text-black text-xs font-bold rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-[#777777] text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    <span className="font-accent">{article.date}</span>
                  </div>
                  <h3 className="font-display text-xl text-white mb-3 group-hover:text-[#f2fe6f] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-[#777777] text-sm font-body line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center text-[#f2fe6f] text-sm font-accent">
                    Ler mais
                    <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-white/5 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <img src="/logo.png" alt="M² Verse" className="h-8" />
            <p className="text-[#777777] text-sm">
              © 2024 M² Verse. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
