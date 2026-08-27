import { useState } from "react";
import { Link } from "react-router-dom";
import footerLogo from "../../assets/images/logo/logo.png";
import { useLanguage } from "../../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-black text-brand-cream relative overflow-hidden">
      {/* ── PART 1: MAIN FOOTER BODY (BRAND, NEWSLETTER, QUICK LINKS) ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-32">
          {/* ── PART 1A: BRAND IDENTITY, NEWSLETTER & SOCIAL NETWORKS ── */}
          <div className="flex flex-col gap-2">
            <Link to="/">
              <img
                src={footerLogo}
                alt="Morkins Logo"
                className="h-15 w-auto object-contain"
              />
            </Link>
            <p className="text-white text-sm leading-relaxed max-w-90">
              {t("foot_mission")}
            </p>

            {/* Email Signup */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/65 mb-2">
                {t("foot_routine")}
              </p>
              <form
                onSubmit={handleSubscribe}
                className="flex border border-white/20 rounded-sm overflow-hidden"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("foot_placeholder_email")}
                  className="bg-white/10 text-brand-cream placeholder:text-brand-cream/70 text-sm px-4 py-3 outline-none focus:bg-white/20 transition-all duration-300 w-full"
                />
                <button
                  type="submit"
                  className="bg-brand-cream text-[#6F8C51] text-[11px] font-bold uppercase tracking-widest px-3 py-2.5 hover:bg-[#AFD971] hover:text-[#6F8C51] transition-colors duration-200 cursor-pointer shrink-0"
                >
                  {t("foot_sub_btn")}
                </button>
              </form>
              {subscribed && (
                <p className="text-brand-cream text-xs mt-2 font-medium">
                  {t("foot_subscribed")}
                </p>
              )}
            </div>

            {/* Social Icons */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/35 mb-3">
                {t("foot_follow_us")}
              </p>
              <div className="flex items-center gap-4">
                {[
                  {
                    label: "Instagram",
                    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                  },
                  {
                    label: "Facebook",
                    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                  },
                  {
                    label: "Twitter / X",
                    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                  },
                  {
                    label: "YouTube",
                    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
                  },
                ].map(({ label, path }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center text-white/90 hover:text-white hover:border-white/40 transition-all duration-200"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── PART 1B: NAVIGATION DIRECTORIES (PRODUCTS, SUPPORT, COMPANY) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Column 1: Our Products */}
            <div>
              <h4 className="text-[15px] font-bold  uppercase tracking-[0.15em] text-white/90 mb-4">
                {t("foot_col_products")}
              </h4>
              <ul className="space-y-2.5">
                {[
                  { key: "foot_prod_1", path: "/products" },
                  { key: "foot_prod_2", path: "/products" },
                  { key: "foot_prod_3", path: "/products" },
                  { key: "foot_prod_4", path: "/products" },
                  { key: "foot_prod_5", path: "/products" },
                  { key: "foot_prod_6", path: "/products" },
                  { key: "foot_prod_7", path: "/products" },
                  { key: "foot_prod_8", path: "/products" },
                ].map((item) => (
                  <li key={item.key}>
                    <Link
                      to={item.path}
                      className="text-sm text-white/95 hover:text-white transition-colors duration-200 leading-snug block"
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Customer Support & Policies */}
            <div>
              <h4 className="text-[15px] font-bold uppercase tracking-[0.15em] text-white/90 mb-4">
                {t("foot_col_support")}
              </h4>
              <ul className="space-y-2.5">
                {[
                  { key: "foot_supp_1", path: "/faqs" },
                  { key: "foot_supp_2", path: "/return-refund-policy" },
                  { key: "foot_supp_3", path: "/privacy-policy" },
                  { key: "foot_supp_4", path: "/terms-conditions" },
                  { key: "foot_supp_5", path: "/shipping-policy" },
                  { key: "foot_supp_6", path: "/track-order" },
                  { key: "foot_supp_7", path: "/contact" },
                  { key: "foot_supp_8", path: "/whatsapp-support" },
                ].map((item) => (
                  <li key={item.key}>
                    <Link
                      to={item.path}
                      className="text-sm text-white/95 hover:text-[#AFD971] transition-colors duration-200 leading-snug block"
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Our Company & Editorial */}
            <div>
              <h4 className="text-[15px] font-bold uppercase tracking-[0.15em] text-white/90 mb-4">
                {t("foot_col_company")}
              </h4>
              <ul className="space-y-2.5">
                {[
                  { key: "foot_comp_1", path: "/about" },
                  { key: "foot_comp_2", path: "/about#story" },
                  { key: "foot_comp_5", path: "/about#dermatologist" },
                  { key: "foot_comp_6", path: "/about#sustainability" },
                  { key: "foot_comp_8", path: "/blog" },
                ].map((item) => (
                  <li key={item.key}>
                    <Link
                      to={item.path}
                      className="text-sm text-white/95 hover:text-white transition-colors duration-200 leading-snug block"
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── PART 2: BOTTOM COPYRIGHT & LEGAL BAR ── */}
      {/* Copyright assertion, digital agency credits, and direct legal policy links */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-white/90 text-sm">
            © {new Date().getFullYear()} Morkins. All Rights Reserved.
          </p>

          <p className="text-white/90 text-sm flex items-center justify-center gap-1.5">
            <span>Digital Partner:</span>
            <a
              href="https://digitalwebconnection.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d8db05] hover:text-[#93c5fd] font-medium transition-colors hover:underline"
            >
              Digital Web Connection
            </a>
          </p>

          <div className="flex items-center gap-5">
            <Link
              to="/terms-conditions"
              className="text-white/90 hover:text-white/60 text-sm transition-colors"
            >
              {t("foot_supp_4")}
            </Link>
            <Link
              to="/privacy-policy"
              className="text-white/90 hover:text-white/60 text-sm transition-colors"
            >
              {t("foot_supp_3")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

