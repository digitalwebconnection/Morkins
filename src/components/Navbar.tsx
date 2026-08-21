import { useState, useEffect, useRef, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import navbarLogo from "../assets/Morkins Final Logo.png"
import { useLanguage } from '../context/LanguageContext'
import { PRODUCTS_EXTENDED, type ProductExtended } from '../pages/products/data/products'

interface NavbarProps {
  onCartClick: () => void;
  onUserClick: () => void;
  cartCount: number;
  lastAddedItem?: { id: number; name: string; price: number; img: string; qty: number } | null;
  showCartPopover?: boolean;
  onCloseCartPopover?: () => void;
}

export default function Navbar({
  onCartClick,
  onUserClick,
  cartCount,
  lastAddedItem = null,
  showCartPopover = false,
  onCloseCartPopover
}: NavbarProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  // Sync scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside search popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-close popover after 4 seconds
  useEffect(() => {
    if (showCartPopover && onCloseCartPopover) {
      const timer = setTimeout(() => {
        onCloseCartPopover();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showCartPopover, onCloseCartPopover]);

  // Live filter matching products from catalog
  const matchingProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    return PRODUCTS_EXTENDED.filter((p: ProductExtended) =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    } else {
      navigate('/products');
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleProductSelect = (productId: number) => {
    navigate(`/products/${productId}`);
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const isAboutActive = location.pathname === '/about';
  const isProductsActive = location.pathname === '/products';
  const isBestsellersActive = location.pathname === '/bestsellers';
  const isNewArrivalsActive = location.pathname === '/new-arrivals';

  return (
    <header 
      className={`sticky top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#FCFBF8] shadow-md' 
          : 'bg-[#FCFBF8] border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 h-18 flex items-center justify-between relative">

        {/* LEFT SECTION: Logo & Mobile Toggle */}
        <div className="flex items-center gap-3 z-10">
          {/* Mobile Menu Toggle button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 -ml-2 text-brand-dark hover:opacity-75 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Brand Logo */}
          <Link 
            to="/" 
            className="flex items-center group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src={navbarLogo}
              alt="Morkins Logo"
              className="h-25 w-auto object-contain transition-transform duration-300"
            />
          </Link>
        </div>

        {/* CENTER SECTION: Nav Titles / Links */}
        <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center font-serif text-lg lg:text-xl font-semibold tracking-wide h-full absolute left-1/2 -translate-x-1/2 z-10">
          <Link
            to="/products"
            className={`hover:text-[#6F8C51] transition-colors py-4 flex items-center cursor-pointer relative group ${isProductsActive ? 'text-[#6F8C51] font-bold' : 'text-black'
              }`}
          >
            {t('nav_products')}
            <span
              className={`absolute bottom-4 left-0 w-full h-0.5 bg-[#6F8C51] transition-transform duration-300 origin-left ${isProductsActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
            />
          </Link>
          <Link
            to="/bestsellers"
            className={`hover:text-[#6F8C51] transition-colors py-4 flex items-center cursor-pointer relative group ${isBestsellersActive ? 'text-[#6F8C51] font-bold' : 'text-black'
              }`}
          >
            {t('nav_bestsellers')}
            <span
              className={`absolute bottom-4 left-0 w-full h-0.5 bg-[#6F8C51] transition-transform duration-300 origin-left ${isBestsellersActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
            />
          </Link>
          <Link
            to="/new-arrivals"
            className={`hover:text-[#6F8C51] transition-colors py-4 flex items-center cursor-pointer relative group ${isNewArrivalsActive ? 'text-[#6F8C51] font-bold' : 'text-black'
              }`}
          >
            {t('nav_newarrivals')}
            <span
              className={`absolute bottom-4 left-0 w-full h-0.5 bg-[#6F8C51] transition-transform duration-300 origin-left ${isNewArrivalsActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
            />
          </Link>
          <Link
            to="/about"
            className={`hover:text-[#6F8C51] transition-colors py-4 flex items-center cursor-pointer relative group ${isAboutActive ? 'text-[#6F8C51] font-bold' : 'text-black'
              }`}
          >
            {t('nav_about')}
            <span
              className={`absolute bottom-4 left-0 w-full h-0.5 bg-[#6F8C51] transition-transform duration-300 origin-left ${isAboutActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
            />
          </Link>
        </nav>

        {/* RIGHT SECTION: Search, User Icon, Shopping Bag */}
        <div className="flex items-center space-x-5 lg:space-x-6 z-10">

          {/* Desktop & Tablet Search Box with Instant Live Results Dropdown */}
          <div className="relative hidden md:flex items-center" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                placeholder={t('nav_search_placeholder')}
                value={searchQuery}
                onFocus={() => {
                  if (searchQuery.trim()) setIsSearchOpen(true);
                }}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setIsSearchOpen(false);
                }}
                className="w-36 lg:w-52 focus:w-48 lg:focus:w-64 bg-transparent border-b border-brand-dark/30 focus:border-[#6F8C51] focus:outline-none text-[11px] uppercase tracking-wider text-brand-dark pb-1 pr-12 transition-all duration-300 placeholder-brand-dark/40"
              />

              {/* Clear button if text entered */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-6 bottom-1.5 p-0.5 text-gray-400 hover:text-brand-dark transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              {/* Submit Search button */}
              <button
                type="submit"
                className="absolute right-0 bottom-1.5 p-0.5 text-black hover:text-[#6F8C51] transition-colors cursor-pointer"
                title="Search"
                aria-label="Submit search"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            {/* Live Search Results Dropdown */}
            {isSearchOpen && searchQuery.trim() && (
              <div className="absolute right-0 top-full mt-3 w-84 sm:w-96 bg-white/95 backdrop-blur-md border border-brand-dark/15 rounded-2xl shadow-2xl z-50 p-3 animate-popover-enter overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-brand-dark/10">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Matching Products ({matchingProducts.length})
                  </span>
                  <span className="text-[10px] text-gray-400">Press ↵ to view all</span>
                </div>

                {/* Product List */}
                {matchingProducts.length > 0 ? (
                  <div>
                    <div className="space-y-1.5 mb-2">
                      {matchingProducts.slice(0, 3).map((product: ProductExtended) => (
                        <div
                          key={product.id}
                          onClick={() => handleProductSelect(product.id)}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F7F6F2] transition-colors cursor-pointer group"
                        >
                          <div className="w-12 h-12 shrink-0 bg-[#F4F3EE] rounded-lg border border-brand-dark/10 overflow-hidden flex items-center justify-center p-1 group-hover:border-[#6F8C51]/40 transition-colors">
                            <img
                              src={product.img}
                              alt={product.name}
                              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[9px] font-semibold text-[#6F8C51] uppercase tracking-wider">
                                {product.category}
                              </span>
                              {product.badge && (
                                <span className="text-[8px] bg-brand-light/10 text-brand-dark font-medium px-1.5 py-0.2 rounded">
                                  {product.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-semibold text-brand-dark truncate group-hover:text-[#6F8C51] transition-colors">
                              {product.name}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs font-bold text-brand-dark font-mono">
                                ${(product.discountPrice || product.price).toFixed(2)}
                              </span>
                              {product.discountPrice && (
                                <span className="text-[10px] text-gray-400 line-through font-mono">
                                  ${product.price.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                          <svg className="w-4 h-4 text-gray-300 group-hover:text-[#6F8C51] group-hover:translate-x-0.5 transition-all shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      ))}
                    </div>

                    {/* View All Matches Button */}
                    <button
                      onClick={() => handleSearchSubmit()}
                      className="w-full py-2.5 px-3 bg-[#6F8C51] hover:bg-[#5C7543] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md active:scale-[0.99]"
                    >
                      <span>View All {matchingProducts.length} Results</span>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="py-6 px-4 text-center">
                    <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <p className="text-xs font-semibold text-brand-dark mb-1">
                      No products found
                    </p>
                    <p className="text-[11px] text-gray-500 mb-3">
                      We couldn't find matches for "{searchQuery}"
                    </p>
                    <button
                      onClick={() => {
                        navigate('/products');
                        setIsSearchOpen(false);
                      }}
                      className="text-xs text-[#6F8C51] font-semibold hover:underline cursor-pointer"
                    >
                      Browse all products →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Profile Icon */}
          <button onClick={onUserClick} className="relative flex items-center text-black hover:text-[#6F8C51] transition-colors duration-300 cursor-pointer group" aria-label="User Account">
            <div className="relative flex items-center justify-center transition-transform duration-300">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </button>

          {/* Shopping Bag Icon Container */}
          <div className="relative">
            <button
              onClick={onCartClick}
              className="relative flex items-center text-black hover:text-[#6F8C51] transition-colors duration-300 cursor-pointer group border-none bg-transparent p-0 outline-none"
              aria-label="Shopping Bag"
            >
              <div className="relative flex items-center justify-center transition-transform duration-300">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#A68A56] text-white text-[9px] font-sans font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-scale-up">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>

            {/* Added to Cart Popover */}
            {showCartPopover && lastAddedItem && (
              <div className="absolute -right-2 top-full mt-3 w-80 max-w-[calc(100vw-32px)] bg-white border border-brand-dark/15 rounded-2xl shadow-2xl z-50 p-4 animate-popover-enter">
                {/* Arrow pointing up */}
                <div className="absolute -top-2 right-4 w-3.5 h-3.5 bg-white border-t border-l border-brand-dark/15 rotate-45 z-10"></div>

                {/* Header: Added to Cart Checkmark & Close */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-brand-dark/5">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-semibold text-green-700 tracking-wide">
                      Added to Cart
                    </span>
                  </div>
                  <button
                    onClick={onCloseCartPopover}
                    className="text-gray-400 hover:text-brand-dark p-1 rounded-full hover:bg-brand-cream-dark/50 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Body: Thumbnail, Name, Qty, Price badge */}
                <div className="flex gap-3">
                  <div className="w-16 h-16 shrink-0 bg-brand-cream-dark/45 border border-brand-dark/10 rounded-xl overflow-hidden flex items-center justify-center p-1.5">
                    <img src={lastAddedItem.img} alt={lastAddedItem.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0 text-left flex flex-col justify-center">
                    <p className="text-[12px] font-semibold text-brand-dark leading-tight line-clamp-2">
                      {lastAddedItem.name}
                    </p>
                    <p className="text-[10px] text-gray-500 font-medium mt-1 uppercase tracking-wider">
                      Qty: {lastAddedItem.qty}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="bg-brand-light text-white text-[11px] font-bold font-mono px-2 py-0.5 rounded-md shadow-xs">
                        ${lastAddedItem.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer: Go to Cart CTA */}
                <button
                  onClick={() => {
                    if (onCloseCartPopover) onCloseCartPopover();
                    onCartClick();
                  }}
                  className="w-full mt-4 bg-[#D8D9D7] hover:bg-[#AFD971] border border-[#6F8C51] text-[#6F8C51] hover:text-[#6F8C51] text-[10px] font-bold uppercase tracking-widest py-2.5 rounded-xl transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md text-center active:scale-98 flex items-center justify-center gap-1.5"
                >
                  <span>Go to Cart</span>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FCFBF8] border-t border-brand-dark/10 py-4 px-6 space-y-4 shadow-xl animate-slide-down">
          {/* Mobile Search Form */}
          <div className="relative" ref={mobileSearchRef}>
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                placeholder={t('nav_search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 pr-16 rounded-full border border-brand-dark/30 focus:border-[#6F8C51] focus:outline-none text-sm bg-white/80 text-brand-dark placeholder-brand-dark/40 shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-9 p-1 text-gray-400 hover:text-brand-dark cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button
                type="submit"
                className="absolute right-3 p-1 text-brand-dark hover:text-[#6F8C51] transition-colors cursor-pointer"
                aria-label="Submit search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            {/* Mobile Quick Matches */}
            {searchQuery.trim() && (
              <div className="mt-2 bg-white rounded-xl border border-brand-dark/10 shadow-lg p-2 max-h-60 overflow-y-auto space-y-1">
                {matchingProducts.length > 0 ? (
                  <>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 py-1">
                      Results ({matchingProducts.length})
                    </div>
                    {matchingProducts.slice(0, 3).map((product: ProductExtended) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductSelect(product.id)}
                        className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
                      >
                        <img src={product.img} alt={product.name} className="w-9 h-9 object-contain bg-[#F4F3EE] rounded p-0.5 border border-brand-dark/10 shrink-0" />
                        <div className="flex-1 min-w-0 text-left">
                          <p className="text-xs font-semibold text-brand-dark truncate">{product.name}</p>
                          <p className="text-[11px] font-mono text-[#6F8C51] font-bold">${(product.discountPrice || product.price).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => handleSearchSubmit()}
                      className="w-full mt-1.5 py-2 text-center text-xs font-bold text-white bg-[#6F8C51] hover:bg-[#5C7543] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>View all {matchingProducts.length} results</span>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <div className="p-3 text-center text-xs text-gray-500">
                    No products found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          <nav className="flex flex-col space-y-3 font-semibold text-[15px] text-brand-dark pt-1">
            <Link
              to="/products"
              className={`py-1 border-b border-brand-dark/10 hover:text-brand-light transition-colors ${isProductsActive ? 'text-brand-light font-bold' : ''
                }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav_products')}
            </Link>
            <Link
              to="/bestsellers"
              className={`py-1 border-b border-brand-dark/10 hover:text-brand-light transition-colors ${isBestsellersActive ? 'text-brand-light font-bold' : ''
                }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav_bestsellers')}
            </Link>
            <Link
              to="/new-arrivals"
              className={`py-1 border-b border-brand-dark/10 hover:text-brand-light transition-colors ${isNewArrivalsActive ? 'text-brand-light font-bold' : ''
                }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav_newarrivals')}
            </Link>
            <Link
              to="/about"
              className={`py-1 hover:text-brand-light transition-colors ${isAboutActive ? 'text-brand-light font-bold' : ''
                }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav_about')}
            </Link>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onUserClick();
              }}
              className="w-full text-left py-1 hover:text-brand-light transition-colors border-t border-brand-dark/10 pt-2 cursor-pointer font-semibold text-[15px] text-brand-dark"
            >
              {t('nav_signin')}
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
