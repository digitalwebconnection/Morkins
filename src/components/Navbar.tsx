import { useState } from 'react'
import { Link } from 'react-router-dom'
import navbarLogo from "../assets/morkins_logo-removebg-preview.png"

interface NavbarProps {
  onCartClick: () => void;
  cartCount: number;
}

export default function Navbar({ onCartClick, cartCount }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-40 bg-brand-cream backdrop-blur-md border-b border-brand-dark/10 transition-shadow duration-300 hover:shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 h-20 flex items-center justify-between relative">

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
          <a href="#shop" className="text-black hover:text-brand-light transition-colors py-4 flex items-center cursor-pointer relative group">
            Shop
            <span className="absolute bottom-4 left-0 w-full h-[2px] bg-brand-light scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>
          <a href="#concerns" className="text-black hover:text-brand-light transition-colors py-4 flex items-center cursor-pointer relative group">
            Skin Concerns
            <span className="absolute bottom-4 left-0 w-full h-[2px] bg-brand-light scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>
          <a href="#discover" className="text-black hover:text-brand-light transition-colors py-4 flex items-center cursor-pointer relative group">
            Discover
            <span className="absolute bottom-4 left-0 w-full h-[2px] bg-brand-light scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>
          <a href="#blog" className="text-black hover:text-brand-light transition-colors py-4 flex items-center cursor-pointer relative group">
            Skincare Blog
            <span className="absolute bottom-4 left-0 w-full h-[2px] bg-brand-light scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </a>
        </nav>

        {/* CENTER SECTION: Logo (absolutely centered) */}
        <div className="absolute left-1/2 -translate-x-1/2 z-10">
          <Link to="/" className="flex items-center group">
            <img
              src={navbarLogo}
              alt="Morkins Logo"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
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
              className="w-3.5 h-3.5 text-black absolute right-0 bottom-1.5 opacity-60 pointer-events-none group-hover:scale-110 transition-transform duration-300"
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
            <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">
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
            <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">
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
                <span className="absolute -top-1.5 -right-1.5 bg-[#195641] text-white text-[9px] font-sans font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-scale-up">
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
            <a href="#shop" className="py-1 border-b border-brand-dark/10 hover:text-brand-light transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Shop All</a>
            <a href="#concerns" className="py-1 border-b border-brand-dark/10 hover:text-brand-light transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Skin Concerns</a>
            <a href="#discover" className="py-1 border-b border-brand-dark/10 hover:text-brand-light transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Discover</a>
            <a href="#blog" className="py-1 hover:text-brand-light transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Skincare Blog</a>
          </nav>
        </div>
      )}
    </header>
  )
}
