import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Products from './sections/Products';
import About from './sections/About';
import Testimonials from './sections/Testimonials';
import Blog from './sections/Blog';
import Newsletter from './sections/Newsletter';
import Footer from './sections/Footer';
import CartDrawer from './sections/CartDrawer';
import QuickViewModal from './sections/QuickViewModal';
import Login from './pages/Login';
import Register from './pages/Register';
import BlogList from './pages/BlogList';
import BlogArticle from './pages/BlogArticle';
import type { Product } from './types';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  useEffect(() => {
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setTimeout(() => setQuickViewProduct(null), 300);
  };

  return (
    <>
      <Navigation />
      <main>
        <section id="home">
          <Hero />
        </section>
        <Products onQuickView={handleQuickView} />
        <About />
        <Testimonials />
        <Blog />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer />
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
      />
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-[#1c1c1c] grain-overlay">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogArticle />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
