import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getBlogArticle, type BlogArticle } from '@/lib/firebase';

export default function BlogArticlePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadArticle = async () => {
      if (!id) return;
      
      try {
        const data = await getBlogArticle(id);
        if (data) {
          setArticle(data);
        } else {
          setError('Artigo não encontrado');
        }
      } catch (err) {
        setError('Erro ao carregar o artigo');
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = article?.title || '';
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1c1c1c] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f2fe6f]"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-[#1c1c1c] flex flex-col items-center justify-center p-4">
        <h1 className="font-display text-4xl text-white mb-4">{error || 'Artigo não encontrado'}</h1>
        <Link to="/blog">
          <Button className="bg-[#f2fe6f] text-black hover:bg-[#e5f160]">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar para o Blog
          </Button>
        </Link>
      </div>
    );
  }

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

      {/* Article Content */}
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#777777] hover:text-[#f2fe6f] transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>

        {/* Category */}
        <span className="inline-block px-4 py-1 bg-[#f2fe6f] text-black text-sm font-bold rounded-full mb-6">
          {article.category}
        </span>

        {/* Title */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
          {article.title}
        </h1>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-6 text-[#777777] mb-8">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <span className="font-accent">{article.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span className="font-accent">{article.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span className="font-accent">{article.readTime} min de leitura</span>
          </div>
        </div>

        {/* Share buttons */}
        <div className="flex items-center gap-3 mb-10">
          <span className="text-[#777777] text-sm">Compartilhar:</span>
          <button
            onClick={() => handleShare('facebook')}
            className="w-10 h-10 bg-[#252525] rounded-full flex items-center justify-center text-[#777777] hover:bg-blue-600 hover:text-white transition-colors"
          >
            <Facebook className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleShare('twitter')}
            className="w-10 h-10 bg-[#252525] rounded-full flex items-center justify-center text-[#777777] hover:bg-sky-500 hover:text-white transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleShare('linkedin')}
            className="w-10 h-10 bg-[#252525] rounded-full flex items-center justify-center text-[#777777] hover:bg-blue-700 hover:text-white transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </button>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-12">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="max-w-3xl mx-auto">
          <div 
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto mt-16 p-8 bg-[#252525] rounded-2xl border border-white/5 text-center">
          <h3 className="font-display text-2xl text-white mb-4">
            Gostou do artigo?
          </h3>
          <p className="text-[#777777] mb-6">
            Explore nossa coleção de figuras de ação premium e encontre a próxima peça para sua coleção.
          </p>
          <Link to="/#products">
            <Button className="bg-[#f2fe6f] text-black hover:bg-[#e5f160] font-semibold px-8">
              Ver Coleção
            </Button>
          </Link>
        </div>
      </article>

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
