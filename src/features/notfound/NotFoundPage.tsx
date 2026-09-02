import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Compass, 
  Search, 
  ArrowRight, 
  Sparkles, 
  Home, 
  ShoppingBag, 
  Sparkle, 
  ShieldCheck, 
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { PRODUCTS_DATA } from '../../lib/api/products';
import ProductCard from '../products/components/ProductCard';

interface NotFoundPageProps {
  onAddToCart?: (product: any, openCartAfter?: boolean) => void;
}

export default function NotFoundPage({ onAddToCart }: NotFoundPageProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
    } else {
      navigate('/products');
    }
  };

  // Curate 3-4 top recommended products for the 404 fallback recommendations
  const recommendedProducts = PRODUCTS_DATA.filter(
    (p) => p.badge === 'Best Seller' || p.badge === 'Award Winner' || p.rating >= 4.8
  ).slice(0, 4);

  const QUICK_LINKS = [
    { label: 'Sanctuary Home', to: '/', icon: Home },
    { label: 'Skin Care Collection', to: '/skincare', icon: Sparkles },
    { label: 'Men’s Trichology', to: '/haircare', icon: ShieldCheck },
    { label: 'Best Sellers', to: '/bestsellers', icon: Sparkle },
    { label: 'Browse All Products', to: '/products', icon: ShoppingBag },
    { label: 'Contact Concierge', to: '/contact', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] selection:bg-[#13442C] selection:text-[#D8EFE3] overflow-hidden">
      
      {/* ── PART 1: HERO 404 EXPERIENCE ── */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#EDE4D8]/80">
        
        {/* Subtle Ambient Glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-160 h-100 pointer-events-none opacity-40 blur-3xl"
          style={{
            background: 'radial-gradient(ellipse, rgba(197,155,39,0.18) 0%, rgba(19,68,44,0.08) 40%, transparent 75%)'
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          
          {/* Botanical Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#EDE4D8] shadow-2xs mb-6 backdrop-blur-xs">
            <Compass className="w-3.5 h-3.5 text-[#C59B27] animate-spin" style={{ animationDuration: '18s' }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] font-mono text-[#786C5E]">
              404 • Botanical Route Uncharted
            </span>
          </div>

          {/* Large Stylized 404 Title */}
          <div className="relative mb-4">
            <h1 className="font-serif text-7xl sm:text-9xl font-bold tracking-tight text-[#13442C]/10 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#1C1917] font-normal leading-tight">
                This Pathway Does{' '}
                <span 
                  className="italic"
                  style={{
                    background: 'linear-gradient(135deg, #13442C 0%, #3B7A57 50%, #C59B27 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Not Exist
                </span>
              </h2>
            </div>
          </div>

          {/* Narrative description */}
          <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto mb-10">
            The botanical formulation or ritual page you are seeking may have been renamed, archived in our laboratory, or temporarily relocated.
          </p>

          {/* Direct Search Bar */}
          <form 
            onSubmit={handleSearchSubmit}
            className="max-w-md mx-auto mb-10 relative"
          >
            <div className="relative flex items-center shadow-lg rounded-full overflow-hidden bg-white border border-[#EDE4D8] focus-within:border-[#13442C] transition-all">
              <Search className="w-4 h-4 text-stone-400 ml-4.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search formulas, concerns, or ingredients..."
                className="w-full px-3 py-3.5 text-xs sm:text-sm text-[#1C1917] placeholder-stone-400 bg-transparent focus:outline-none"
              />
              <button
                type="submit"
                className="mr-1.5 px-5 py-2.5 rounded-full bg-[#13442C] text-[#D8EFE3] hover:bg-[#1B6A45] hover:text-white transition-all text-xs font-bold uppercase tracking-wider cursor-pointer shrink-0"
              >
                Search
              </button>
            </div>
          </form>

          {/* Curated Quick Navigation Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-2xl mx-auto">
            {QUICK_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#EDE4D8] text-xs font-semibold text-[#44403C] hover:text-[#13442C] hover:border-[#13442C]/40 hover:bg-[#F3EFEA] transition-all duration-200 shadow-2xs group cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5 text-[#C59B27] group-hover:scale-110 transition-transform" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── PART 2: RECOMMENDED BOTANICAL DISCOVERIES ── */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase font-mono tracking-[0.25em] text-[#C59B27] block mb-1">
              Curated Apothecary Essentials
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1917] font-bold">
              Explore Our Signature Formulations
            </h3>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#13442C] hover:text-[#1B6A45] group cursor-pointer"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart || (() => {})}
            />
          ))}
        </div>
      </section>

      {/* ── PART 3: CONCIERGE ASSISTANCE STRIP ── */}
      <section className="py-12 bg-white border-t border-[#EDE4D8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F4EFEA] border border-[#EDE4D8] flex items-center justify-center text-[#13442C] shrink-0">
              <MessageSquare className="w-5 h-5 text-[#C59B27]" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-[#1C1917]">
                Looking for a specific prescription or recommendation?
              </h4>
              <p className="text-xs text-stone-500 font-light">
                Our clinical botanical concierge is available to guide your skincare and trichology journey.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-full bg-[#1C1917] text-white hover:bg-[#C59B27] transition-all text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer"
            >
              Contact Us
            </Link>
            <Link
              to="/whatsapp-support"
              className="px-5 py-2.5 rounded-full bg-white border border-[#EDE4D8] text-[#1C1917] hover:border-[#13442C] transition-all text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              WhatsApp
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
