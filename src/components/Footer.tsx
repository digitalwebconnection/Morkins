import { useState } from 'react'
import navbar from '../assets/morkins_logo-removebg-preview.png'

const topFeatures = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Cash on Delivery',
    desc: 'Pay when you receive',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'All-India Delivery',
    desc: 'We deliver pan-India',
  },

  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: '100% Authentic',
    desc: 'Genuine products only',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 2 2 2-2 2 2 2-2 4 2z" />
      </svg>
    ),
    title: 'Easy Returns',
    desc: '7-day hassle-free returns',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: 'Secure Payments',
    desc: 'UPI, Cards & Net Banking',
  },
]

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#17335A] text-white relative overflow-hidden">

      {/* TOP FEATURES BAR */}
      <div className="bg-[#112744] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-0 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {topFeatures.map((f) => (
              <div key={f.title} className="flex items-start gap-3 group">
                <div className="text-[#C1D3DF] shrink-0 mt-0.5 group-hover:text-white transition-colors duration-200">
                  {f.icon}
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-white leading-tight">{f.title}</p>
                  <p className="text-[11px] text-white/90 mt-0.5 leading-snug">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN FOOTER BODY */}
      <div className="max-w-7xl mx-auto px-6 lg:px-0 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-32">

          {/* LEFT: Logo + Newsletter + Socials */}
          <div className="flex flex-col gap-6">
            <a href="/">
              <img src={navbar} alt="Morkins" className="h-9 w-auto object-contain brightness-0 invert" />
            </a>
            <p className="text-white/90 text-sm leading-relaxed max-w-[240px]">
              Premium skincare crafted for every skin type. Science-backed, nature-inspired.
            </p>

            {/* Email Signup */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/35 mb-2">Stay Updated</p>
              <form onSubmit={handleSubscribe} className="flex border border-white/20 rounded-sm overflow-hidden">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-transparent text-white text-sm px-3 py-2.5 placeholder-white/30 focus:outline-none min-w-0"
                />
                <button
                  type="submit"
                  className="bg-white text-[#17335A] text-[11px] font-bold uppercase tracking-widest px-3 py-2.5 hover:bg-[#C1D3DF] transition-colors duration-200 cursor-pointer shrink-0"
                >
                  Subscribe
                </button>
              </form>
              {subscribed && (
                <p className="text-[#C1D3DF] text-xs mt-2">✓ Thank you for subscribing!</p>
              )}
            </div>

            {/* Social Icons */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/35 mb-3">Follow Us</p>
              <div className="flex items-center gap-4">
                {[
                  { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                  { label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                  { label: 'Twitter / X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                  { label: 'YouTube', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
                ].map(({ label, path }) => (
                  <a key={label} href="#" aria-label={label}
                    className="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center text-white/90 hover:text-white hover:border-white/40 transition-all duration-200">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Three Link Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3  gap-8">

            {/* Our Products */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/90 mb-4">Our Products</h4>
              <ul className="space-y-2.5">
                {[
                  'Cleansers & Face Wash',
                  'Toners & Mists',
                  'Serums & Treatments',
                  'Moisturizers & Creams',
                  'Sunscreens & SPF',
                  'Eye Care',
                  'Face Masks & Scrubs',
                  'Lip Care',
                
                ].map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm text-white/65 hover:text-white transition-colors duration-200 leading-snug block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Support */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/90 mb-4">Customer Support</h4>
              <ul className="space-y-2.5">
                {[
                  'FAQs',
                  'Return & Refund Policy',
                  'Privacy Policy',
                  'Terms & Conditions',
                  'Shipping Policy',
                  'Track My Order',
                  'Contact Us',
                  'WhatsApp Support',
                
                ].map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm text-white/65 hover:text-white transition-colors duration-200 leading-snug block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Company */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/90 mb-4">Our Company</h4>
              <ul className="space-y-2.5">
                {[
                  'About Morkins',
                  'Our Story',
                  'Our Mission & Values',
                  'Ingredients We Use',
                  'Dermatologist Approved',
                  'Sustainability',
                  'Cruelty Free Promise',
                  
                  'Blog',
                ].map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm text-white/65 hover:text-white transition-colors duration-200 leading-snug block">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-0 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/90 text-xs">
            © {new Date().getFullYear()} Morkins. All Rights Reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-white/90 hover:text-white/60 text-xs transition-colors">Terms & Conditions</a>
            <a href="#" className="text-white/90 hover:text-white/60 text-xs transition-colors">Privacy Policy</a>
            <span className="text-white/90 text-xs">|</span>
            <span className="text-white/90 text-xs">Developed by <span className="text-[#C1D3DF]/70 font-semibold">DWC</span></span>
          </div>
        </div>
      </div>

    </footer>
  )
}
