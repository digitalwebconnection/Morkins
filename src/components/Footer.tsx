import { useState } from 'react'
import navbarLogo from '../assets/logo.png'
import { useLanguage } from '../context/LanguageContext'


export default function Footer() {
  const { t } = useLanguage();
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
    <footer className="bg-[#184433] text-white relative overflow-hidden">

      {/* MAIN FOOTER BODY */}
      <div className="max-w-7xl mx-auto px-6 lg:px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-32">

          {/* LEFT: Logo + Newsletter + Socials */}
          <div className="flex flex-col gap-6">
            <a href="/">
              <img src={navbarLogo} alt="Morkins Logo" className="h-20 w-auto object-contain brightness-0 invert" />
            </a>
            <p className="text-white/90 text-sm leading-relaxed max-w-60">
              {t('foot_mission')}
            </p>

            {/* Email Signup */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/35 mb-2">{t('foot_routine')}</p>
              <form onSubmit={handleSubscribe} className="flex border border-white/20 rounded-sm overflow-hidden">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('foot_placeholder_email')}
                  className="flex-1 bg-transparent text-white text-sm px-3 py-2.5 placeholder-white/30 focus:outline-none min-w-0"
                />
                <button
                  type="submit"
                  className="bg-white text-[#184433] text-[11px] font-bold uppercase tracking-widest px-3 py-2.5 hover:bg-brand-sage transition-colors duration-200 cursor-pointer shrink-0"
                >
                  {t('foot_sub_btn')}
                </button>
              </form>
              {subscribed && (
                <p className="text-brand-sage text-xs mt-2">{t('foot_subscribed')}</p>
              )}
            </div>

            {/* Social Icons */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/35 mb-3">{t('foot_follow_us')}</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

            {/* Our Products */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/90 mb-4">{t('foot_col_products')}</h4>
              <ul className="space-y-2.5">
                {[
                  { key: 'foot_prod_1' },
                  { key: 'foot_prod_2' },
                  { key: 'foot_prod_3' },
                  { key: 'foot_prod_4' },
                  { key: 'foot_prod_5' },
                  { key: 'foot_prod_6' },
                  { key: 'foot_prod_7' },
                  { key: 'foot_prod_8' },
                ].map(item => (
                  <li key={item.key}>
                    <a href="#" className="text-sm text-white/65 hover:text-white transition-colors duration-200 leading-snug block">
                      {t(item.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Support */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/90 mb-4">{t('foot_col_support')}</h4>
              <ul className="space-y-2.5">
                {[
                  { key: 'foot_supp_1' },
                  { key: 'foot_supp_2' },
                  { key: 'foot_supp_3' },
                  { key: 'foot_supp_4' },
                  { key: 'foot_supp_5' },
                  { key: 'foot_supp_6' },
                  { key: 'foot_supp_7' },
                  { key: 'foot_supp_8' },
                ].map(item => (
                  <li key={item.key}>
                    <a href="#" className="text-sm text-white/65 hover:text-white transition-colors duration-200 leading-snug block">
                      {t(item.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Company */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/90 mb-4">{t('foot_col_company')}</h4>
              <ul className="space-y-2.5">
                {[
                  { key: 'foot_comp_1' },
                  { key: 'foot_comp_2' },
                  { key: 'foot_comp_3' },
                  { key: 'foot_comp_4' },
                  { key: 'foot_comp_5' },
                  { key: 'foot_comp_6' },
                  { key: 'foot_comp_7' },
                  { key: 'foot_comp_8' },
                ].map(item => (
                  <li key={item.key}>
                    <a href="#" className="text-sm text-white/65 hover:text-white transition-colors duration-200 leading-snug block">
                      {t(item.key)}
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
        <div className="max-w-7xl mx-auto px-6 lg:px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/90 text-xs">
            © {new Date().getFullYear()} Morkins. All Rights Reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-white/90 hover:text-white/60 text-xs transition-colors">{t('foot_supp_4')}</a>
            <a href="#" className="text-white/90 hover:text-white/60 text-xs transition-colors">{t('foot_supp_3')}</a>
          </div>
        </div>
      </div>

    </footer>
  )
}
