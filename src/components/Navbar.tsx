import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import navbarLogo from "../assets/morkins_logo-removebg-preview.png"

interface NavbarProps {
  onCartClick: () => void;
  cartCount: number;
}

export default function Navbar({ onCartClick, cartCount }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const isAboutActive = location.pathname === '/about';
  const isProductsActive = location.pathname === '/' && location.hash === '#products';
  const isBestsellersActive = location.pathname === '/' && location.hash === '#bestsellers';
  const isNewArrivalsActive = location.pathname === '/' && location.hash === '#new-arrivals';

  return (
    <header className="sticky top-0 z-40 bg-brand-cream backdrop-blur-md border-b border-brand-dark/10 transition-shadow duration-300 hover:shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 h-20 flex items-center justify-between relative">

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

        {/* LEFT SECTION: Nav Links */}
        <nav className="hidden md:flex space-x-4 items-center font-serif text-xl font-semibold tracking-wide h-full">
          <Link
            to="/#products"
            className={`hover:text-brand-light transition-colors py-4 flex items-center cursor-pointer relative group ${
              isProductsActive ? 'text-brand-light font-bold' : 'text-black'
            }`}
          >
            Product
            <span
              className={`absolute bottom-4 left-0 w-full h-[2px] bg-brand-light transition-transform duration-300 origin-left ${
                isProductsActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}
            />
          </Link>
          <Link
            to="/#bestsellers"
            className={`hover:text-brand-light transition-colors py-4 flex items-center cursor-pointer relative group ${
              isBestsellersActive ? 'text-brand-light font-bold' : 'text-black'
            }`}
          >
            Best sellers
            <span
              className={`absolute bottom-4 left-0 w-full h-[2px] bg-brand-light transition-transform duration-300 origin-left ${
                isBestsellersActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}
            />
          </Link>
          <Link
            to="/#new-arrivals"
            className={`hover:text-brand-light transition-colors py-4 flex items-center cursor-pointer relative group ${
              isNewArrivalsActive ? 'text-brand-light font-bold' : 'text-black'
            }`}
          >
            New Arrivals
            <span
              className={`absolute bottom-4 left-0 w-full h-[2px] bg-brand-light transition-transform duration-300 origin-left ${
                isNewArrivalsActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}
            />
          </Link>
          <Link
            to="/about"
            className={`hover:text-brand-light transition-colors py-4 flex items-center cursor-pointer relative group ${
              isAboutActive ? 'text-brand-light font-bold' : 'text-black'
            }`}
          >
           About
            <span
              className={`absolute bottom-4 left-0 w-full h-[2px] bg-brand-light transition-transform duration-300 origin-left ${
                isAboutActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}
            />
          </Link>
        </nav>

        {/* CENTER SECTION: Logo (absolutely centered) */}
        <div className="absolute left-1/2 -translate-x-1/2 z-10">
          <Link to="/" className="flex items-center group">
            <img
              src={navbarLogo}
              alt="Morkins Logo"
              className="h-10 w-auto object-contain transition-transform duration-300 "
            />
          </Link>
        </div>

        {/* RIGHT SECTION: Search, User Icon, Shopping Bag */}
        <div className="flex items-center space-x-6 z-10">

          {/* Search Line (Sleek Bottom Border) */}
          <div className="relative hidden lg:flex items-center group">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-32 focus:w-48 bg-transparent border-b border-brand-dark/30 focus:border-brand-dark focus:outline-none text-[11px] uppercase tracking-wider text-brand-dark pb-1 transition-all duration-500 placeholder-brand-dark/40"
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
          <a href="#login" className="relative flex items-center text-black hover:text-brand-light transition-colors duration-300 cursor-pointer group" aria-label="User Account">
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
          </a>

          {/* Shopping Bag Icon */}
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
                <span className="absolute -top-1.5 -right-1.5 bg-[#17335A] text-white text-[9px] font-sans font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-scale-up">
                  {cartCount}
                </span>
              )}
            </div>
          </button>

        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-cream border-t border-brand-dark/10 py-4 px-6 space-y-4 shadow-xl animate-slide-down">
          <div className="relative flex items-center mb-3">
            <input
              type="text"
              placeholder="Search Skincare..."
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
              to="/#products"
              className={`py-1 border-b border-brand-dark/10 hover:text-brand-light transition-colors ${
                isProductsActive ? 'text-brand-light font-bold' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Product Grid
            </Link>
            <Link
              to="/#bestsellers"
              className={`py-1 border-b border-brand-dark/10 hover:text-brand-light transition-colors ${
                isBestsellersActive ? 'text-brand-light font-bold' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Best Sellers
            </Link>
            <Link
              to="/#new-arrivals"
              className={`py-1 border-b border-brand-dark/10 hover:text-brand-light transition-colors ${
                isNewArrivalsActive ? 'text-brand-light font-bold' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              New Arrivals
            </Link>
            <Link
              to="/about"
              className={`py-1 hover:text-brand-light transition-colors ${
                isAboutActive ? 'text-brand-light font-bold' : ''
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
