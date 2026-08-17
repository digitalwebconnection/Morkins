import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import navbarLogo from "../assets/logo.png"
import { useLanguage } from '../context/LanguageContext'

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Auto-close popover after 4 seconds
  useEffect(() => {
    if (showCartPopover && onCloseCartPopover) {
      const timer = setTimeout(() => {
        onCloseCartPopover();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showCartPopover, onCloseCartPopover]);

  const isAboutActive = location.pathname === '/about';
  const isProductsActive = location.pathname === '/products';
  const isBestsellersActive = location.pathname === '/' && location.hash === '#bestsellers';
  const isNewArrivalsActive = location.pathname === '/' && location.hash === '#new-arrivals';

  return (
    <header className="sticky top-0 z-40 bg-brand-cream backdrop-blur-md border-b border-brand-dark/10 transition-shadow duration-300 hover:shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 h-20 flex items-center justify-between relative">

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
          <Link to="/" className="flex items-center group">
            <img
              src={navbarLogo}
              alt="Morkins Logo"
              className="h-20  w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* CENTER SECTION: Nav Titles / Links */}
        <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center font-serif text-lg lg:text-xl font-semibold tracking-wide h-full absolute left-1/2 -translate-x-1/2 z-10">
          <Link
            to="/products"
            className={`hover:text-brand-light transition-colors py-4 flex items-center cursor-pointer relative group ${isProductsActive ? 'text-brand-light font-bold' : 'text-black'
              }`}
          >
            {t('nav_products')}
            <span
              className={`absolute bottom-4 left-0 w-full h-0.5 bg-brand-light transition-transform duration-300 origin-left ${isProductsActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
            />
          </Link>
          <Link
            to="/#bestsellers"
            className={`hover:text-brand-light transition-colors py-4 flex items-center cursor-pointer relative group ${isBestsellersActive ? 'text-brand-light font-bold' : 'text-black'
              }`}
          >
            {t('nav_bestsellers')}
            <span
              className={`absolute bottom-4 left-0 w-full h-0.5 bg-brand-light transition-transform duration-300 origin-left ${isBestsellersActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
            />
          </Link>
          <Link
            to="/#new-arrivals"
            className={`hover:text-brand-light transition-colors py-4 flex items-center cursor-pointer relative group ${isNewArrivalsActive ? 'text-brand-light font-bold' : 'text-black'
              }`}
          >
            {t('nav_newarrivals')}
            <span
              className={`absolute bottom-4 left-0 w-full h-0.5 bg-brand-light transition-transform duration-300 origin-left ${isNewArrivalsActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
            />
          </Link>
          <Link
            to="/about"
            className={`hover:text-brand-light transition-colors py-4 flex items-center cursor-pointer relative group ${isAboutActive ? 'text-brand-light font-bold' : 'text-black'
              }`}
          >
            {t('nav_about')}
            <span
              className={`absolute bottom-4 left-0 w-full h-0.5 bg-brand-light transition-transform duration-300 origin-left ${isAboutActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
            />
          </Link>
        </nav>

        {/* RIGHT SECTION: Search, User Icon, Shopping Bag */}
        <div className="flex items-center space-x-6 z-10">

          {/* Search Line (Sleek Bottom Border) */}
          <div className="relative hidden lg:flex items-center group">
            <input
              type="text"
              placeholder={t('nav_search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 bg-transparent border-b border-brand-dark/30 focus:border-brand-dark focus:outline-none text-[11px] uppercase tracking-wider text-brand-dark pb-1 transition-all duration-500 placeholder-brand-dark/40"
            />
            <svg
              className="w-3.5 h-3.5 text-black absolute right-0 bottom-1.5 opacity-60 pointer-events-none  transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* User Profile Icon */}
          <button onClick={onUserClick} className="relative flex items-center text-black hover:text-brand-light transition-colors duration-300 cursor-pointer group" aria-label="User Account">
            <div className="relative flex items-center justify-center transition-transform duration-300  ">
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
              className="relative flex items-center text-black hover:text-brand-light transition-colors duration-300 cursor-pointer group border-none bg-transparent p-0 outline-none"
              aria-label="Shopping Bag"
            >
              <div className="relative flex items-center justify-center transition-transform duration-300 ">
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
                  <span className="absolute -top-1.5 -right-1.5 bg-[#184433] text-white text-[9px] font-sans font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-scale-up">
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
                  className="w-full mt-4 bg-brand-cream hover:bg-brand-cream-dark border border-[#184433] text-[#184433] text-[10px] font-bold uppercase tracking-widest py-2.5 rounded-xl transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md text-center active:scale-98 flex items-center justify-center gap-1.5"
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
        <div className="md:hidden bg-brand-cream border-t border-brand-dark/10 py-4 px-6 space-y-4 shadow-xl animate-slide-down">
          <div className="relative flex items-center mb-3">
            <input
              type="text"
              placeholder={t('nav_search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pr-10 rounded-full border border-brand-dark/30 focus:outline-none text-sm bg-transparent text-brand-dark placeholder-brand-dark/40"
            />
            <svg className="w-4 h-4 text-brand-dark absolute right-3 pointer-events-none opacity-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <nav className="flex flex-col space-y-3 font-semibold text-[15px] text-brand-dark">
            <Link
              to="/products"
              className={`py-1 border-b border-brand-dark/10 hover:text-brand-light transition-colors ${isProductsActive ? 'text-brand-light font-bold' : ''
                }`}
            >
              {t('nav_products')}
            </Link>
            <Link
              to="/#bestsellers"
              className={`py-1 border-b border-brand-dark/10 hover:text-brand-light transition-colors ${isBestsellersActive ? 'text-brand-light font-bold' : ''
                }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav_bestsellers')}
            </Link>
            <Link
              to="/#new-arrivals"
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
